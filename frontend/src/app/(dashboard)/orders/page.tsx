"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAppStore, OrderRecord } from "@/store/appStore";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const orders = useAppStore(state => state.orders);

  const filteredOrders = orders.filter((o) => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const downloadTodaysOrders = () => {
    const today = new Date().toLocaleDateString();
    const todaysOrders = orders.filter(o => o.date.includes(today));

    if (todaysOrders.length === 0) {
      alert("No orders found for today!");
      return;
    }

    const headers = ["Order ID", "Date", "Customer", "Phone", "Items", "Payment Method", "Amount", "Status"];
    
    const csvContent = [
      headers.join(","),
      ...todaysOrders.map(o => 
        [
          o.id, 
          `"${o.date}"`, 
          `"${o.customer}"`, 
          o.phone || "N/A", 
          o.items, 
          o.method, 
          o.amount, 
          o.status
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `orders_${today.replace(/\//g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Orders</h1>
          <p className="text-[var(--color-muted-foreground)]">View and manage customer orders</p>
        </div>
      </div>

      <Card className="glass-panel border-none">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <Input
                placeholder="Search by Order ID or Customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white/50 border-[var(--color-border)] focus:ring-[var(--color-accent)]"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadTodaysOrders} className="bg-green-600 hover:bg-green-700 text-white">
                <Download className="mr-2 h-4 w-4" /> Download Today
              </Button>
              <Button variant="outline" className="border-[var(--color-border)]">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] overflow-hidden bg-white/50">
            <Table>
              <TableHeader className="bg-[var(--color-muted)]">
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-[var(--color-border)] hover:bg-white/80 transition-colors"
                      >
                        <TableCell className="font-bold text-base text-[var(--color-primary)]">{order.id}</TableCell>
                        <TableCell className="text-[var(--color-muted-foreground)] font-medium">{order.date}</TableCell>
                        <TableCell className="font-black text-indigo-600 dark:text-indigo-400 text-base">{order.customer}</TableCell>
                        <TableCell>
                          <span className="font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2.5 py-1 rounded-md">
                            {order.items}
                          </span>
                        </TableCell>
                        <TableCell className="font-black text-green-600 text-base">₹{order.amount.toFixed(2)}</TableCell>
                        <TableCell className="font-bold text-purple-600">{order.method}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Completed" ? "bg-green-100 text-green-700" :
                            order.status === "Pending" ? "bg-orange-100 text-orange-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center text-[var(--color-muted-foreground)]">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Date: {selectedOrder?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-[var(--color-muted-foreground)]">Customer</p>
              <p>{selectedOrder?.customer} {selectedOrder?.phone ? `(${selectedOrder.phone})` : ""}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-[var(--color-muted-foreground)] mb-2">Items</p>
              <div className="border border-[var(--color-border)] rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-[var(--color-muted)]">
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder?.cartItems?.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{item.price * item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border)]">
              <div>
                <p className="text-sm font-medium text-[var(--color-muted-foreground)]">Payment Method</p>
                <p className="font-semibold">{selectedOrder?.method}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--color-muted-foreground)]">Total Amount</p>
                <p className="text-2xl font-bold text-[var(--color-primary)]">₹{selectedOrder?.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
