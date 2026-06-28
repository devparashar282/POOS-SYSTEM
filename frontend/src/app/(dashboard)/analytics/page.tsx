"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { useAppStore } from "@/store/appStore";

const COLORS = ["#f26b21", "#5c3a21", "#e05c19", "#d4a373"];

export default function AnalyticsPage() {
  const orders = useAppStore(state => state.orders);
  const customers = useAppStore(state => state.customers);

  // Compute Monthly Revenue (Simplified to today for demo purposes since we don't have old data)
  const today = new Date().toLocaleDateString('default', { month: 'short' });
  const todaysSales = orders.reduce((sum, o) => sum + o.amount, 0);
  const monthlyRevenue = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: today, total: todaysSales },
  ];

  const customerGrowth = [
    { name: "Jan", users: 0 },
    { name: "Feb", users: 0 },
    { name: "Mar", users: 0 },
    { name: "Apr", users: 0 },
    { name: "May", users: 0 },
    { name: "Jun", users: 0 },
    { name: today, users: customers.length },
  ];

  // Compute Categories dynamically from cart items
  const categoryMap: Record<string, number> = {};
  orders.forEach(order => {
    order.cartItems?.forEach(item => {
      categoryMap[item.category] = (categoryMap[item.category] || 0) + (item.price * item.quantity);
    });
  });

  const topCategories = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  })).sort((a, b) => b.value - a.value).slice(0, 4);

  // Fallback for pie chart if empty
  if (topCategories.length === 0) {
    topCategories.push({ name: "No Sales", value: 1 });
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Analytics & Reports</h1>
        <p className="text-[var(--color-muted-foreground)]">Deep dive into your cafe's performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card className="glass-panel border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[var(--color-primary)]">Monthly Revenue (Last 7 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f26b21" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f26b21" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <RechartsTooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
                  <Area type="monotone" dataKey="total" stroke="#f26b21" fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories Pie Chart */}
        <Card className="glass-panel border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[var(--color-primary)]">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {topCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center text-sm text-[var(--color-muted-foreground)]">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {category.name} ({category.value}%)
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Growth Line Chart */}
        <Card className="glass-panel border-none shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[var(--color-primary)]">New Customer Growth (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="users" stroke="#5c3a21" strokeWidth={3} dot={{ r: 6, fill: "#5c3a21" }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
