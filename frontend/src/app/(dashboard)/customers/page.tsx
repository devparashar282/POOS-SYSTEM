"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, Phone, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAppStore, CustomerRecord } from "@/store/appStore";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const customers = useAppStore(state => state.customers);

  const filteredCustomers = customers.filter((c) => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Customers</h1>
          <p className="text-[var(--color-muted-foreground)]">Manage your customer relationships</p>
        </div>
      </div>

      <Card className="glass-panel border-none">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)]" />
              <Input
                placeholder="Search by Name or Phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white/50 border-[var(--color-border)] focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] overflow-hidden bg-white/50">
            <Table>
              <TableHeader className="bg-[var(--color-muted)]">
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-[var(--color-border)] hover:bg-white/80 transition-colors"
                      >
                        <TableCell className="font-black text-base text-indigo-600 dark:text-indigo-400">
                          {customer.name}
                          <div className="text-xs text-[var(--color-muted-foreground)] font-medium mt-0.5">{customer.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm font-bold text-teal-600 dark:text-teal-400 mb-1">
                            <Phone className="h-4 w-4 mr-2 text-teal-500" /> {customer.phone}
                          </div>
                          <div className="flex items-center text-sm font-bold text-rose-600 dark:text-rose-400">
                            <Mail className="h-4 w-4 mr-2 text-rose-500" /> {customer.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2.5 py-1 rounded-md">
                            {customer.orders}
                          </span>
                        </TableCell>
                        <TableCell className="font-black text-green-600 text-base">₹{customer.spent.toFixed(2)}</TableCell>
                        <TableCell className="text-[var(--color-muted-foreground)] font-medium">{customer.lastVisit}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--color-muted)]"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-[var(--color-muted-foreground)]">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
            <DialogDescription>
              {selectedCustomer?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center text-2xl font-bold">
                {selectedCustomer?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedCustomer?.name}</h3>
                <div className="text-sm text-[var(--color-muted-foreground)] mt-1 flex items-center">
                  <Phone className="h-3 w-3 mr-1" /> {selectedCustomer?.phone}
                </div>
                {selectedCustomer?.email && selectedCustomer.email !== "-" && (
                  <div className="text-sm text-[var(--color-muted-foreground)] flex items-center mt-1">
                    <Mail className="h-3 w-3 mr-1" /> {selectedCustomer.email}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--color-secondary)]/30 rounded-xl border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-muted-foreground)] mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-[var(--color-foreground)]">{selectedCustomer?.orders}</p>
              </div>
              <div className="p-4 bg-[var(--color-secondary)]/30 rounded-xl border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-muted-foreground)] mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-[var(--color-accent)]">₹{selectedCustomer?.spent?.toFixed(2)}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-muted-foreground)] text-center">
                Last visited on {selectedCustomer?.lastVisit}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
