"use client";

import { motion } from "framer-motion";
import { 
  IndianRupee, 
  ShoppingCart, 
  Banknote, 
  QrCode, 
  TrendingUp, 
  Clock 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useAppStore } from "@/store/appStore";

const COLORS = ["#f26b21", "#5c3a21", "#22c55e"];

export default function DashboardHome() {
  const orders = useAppStore(state => state.orders);

  // Compute live data
  const today = new Date().toLocaleDateString();
  const todaysOrders = orders.filter(o => o.date.includes(today));
  
  const todaysSales = todaysOrders.reduce((sum, o) => sum + o.amount, 0);
  const cashCollection = todaysOrders.filter(o => o.method === "Cash").reduce((sum, o) => sum + o.amount, 0);
  const upiCollection = todaysOrders.filter(o => o.method.includes("QR") || o.method.includes("UPI")).reduce((sum, o) => sum + o.amount, 0);
  const avgBill = todaysOrders.length > 0 ? (todaysSales / todaysOrders.length) : 0;

  const kpiData = [
    { title: "Today's Sales", value: `₹${todaysSales.toFixed(2)}`, icon: IndianRupee, trend: "+0%", positive: true, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30", border: "hover:border-blue-500" },
    { title: "Today's Orders", value: todaysOrders.length.toString(), icon: ShoppingCart, trend: "+0%", positive: true, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30", border: "hover:border-green-500" },
    { title: "Cash Collection", value: `₹${cashCollection.toFixed(2)}`, icon: Banknote, trend: "+0%", positive: true, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30", border: "hover:border-amber-500" },
    { title: "QR/UPI Collection", value: `₹${upiCollection.toFixed(2)}`, icon: QrCode, trend: "+0%", positive: true, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", border: "hover:border-purple-500" },
    { title: "Average Bill Value", value: `₹${avgBill.toFixed(2)}`, icon: TrendingUp, trend: "+0%", positive: true, color: "text-rose-600", bg: "bg-rose-100 dark:bg-rose-900/30", border: "hover:border-rose-500" },
    { title: "Pending Orders", value: "0", icon: Clock, trend: "Normal", positive: true, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30", border: "hover:border-orange-500" },
  ];

  const paymentData = [
    { name: "UPI / QR", value: upiCollection > 0 ? upiCollection : 1 },
    { name: "Cash", value: cashCollection },
  ].filter(p => p.value > 0);

  const recentOrders = orders.slice(0, 5);

  const salesData = [
    { time: "08:00", sales: 0 },
    { time: "10:00", sales: 0 },
    { time: "12:00", sales: 0 },
    { time: "14:00", sales: 0 },
    { time: "16:00", sales: 0 },
    { time: "18:00", sales: 0 },
    { time: "20:00", sales: 0 },
    { time: "22:00", sales: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className={`${kpi.border} transition-all duration-300 h-full flex flex-col justify-between shadow-sm hover:shadow-md border-2`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs lg:text-sm font-bold text-[var(--color-foreground)] line-clamp-1">
                  {kpi.title}
                </CardTitle>
                <div className={`h-10 w-10 rounded-xl ${kpi.bg} flex items-center justify-center shrink-0`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-xl lg:text-2xl font-black truncate ${kpi.color}`}>{kpi.value}</div>
                <p className={`text-xs mt-1 font-bold ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.trend} from yesterday
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Sales Trend</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="var(--color-foreground)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    padding={{ left: 20, right: 20 }}
                    fontWeight="bold"
                  />
                  <YAxis 
                    stroke="var(--color-foreground)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${value}`} 
                    fontWeight="bold"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--color-foreground)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="var(--color-accent)" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: 'var(--color-accent)', strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: 'var(--color-primary)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--color-foreground)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-2 h-[20%]">
                {paymentData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 shrink-0" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-xs font-medium whitespace-nowrap">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-bold text-base text-[var(--color-primary)]">{order.id}</TableCell>
                  <TableCell className="font-black text-indigo-600 dark:text-indigo-400 text-base">{order.customer}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold text-purple-600">{order.method}</TableCell>
                  <TableCell className="text-[var(--color-muted-foreground)] font-medium">{order.date}</TableCell>
                  <TableCell className="text-right font-black text-[var(--color-primary)] text-base">₹{order.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
