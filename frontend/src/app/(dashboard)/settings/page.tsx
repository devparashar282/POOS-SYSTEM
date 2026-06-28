"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Receipt, Users, Save, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("store");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Settings</h1>
        <p className="text-[var(--color-muted-foreground)]">Manage your cafe preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab("store")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
              activeTab === "store" 
                ? "bg-[var(--color-primary)] text-white shadow-md" 
                : "bg-white/50 text-[var(--color-muted-foreground)] hover:bg-white/80"
            }`}
          >
            <Store className="h-5 w-5 mr-3" />
            <span className="font-medium">Store Details</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("tax")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
              activeTab === "tax" 
                ? "bg-[var(--color-primary)] text-white shadow-md" 
                : "bg-white/50 text-[var(--color-muted-foreground)] hover:bg-white/80"
            }`}
          >
            <Receipt className="h-5 w-5 mr-3" />
            <span className="font-medium">Tax & Invoice</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("staff")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
              activeTab === "staff" 
                ? "bg-[var(--color-primary)] text-white shadow-md" 
                : "bg-white/50 text-[var(--color-muted-foreground)] hover:bg-white/80"
            }`}
          >
            <Users className="h-5 w-5 mr-3" />
            <span className="font-medium">Staff Management</span>
          </button>

          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
              activeTab === "security" 
                ? "bg-[var(--color-primary)] text-white shadow-md" 
                : "bg-white/50 text-[var(--color-muted-foreground)] hover:bg-white/80"
            }`}
          >
            <Shield className="h-5 w-5 mr-3" />
            <span className="font-medium">Security</span>
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === "store" && (
              <motion.div
                key="store"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="glass-panel border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-[var(--color-primary)]">Store Details</CardTitle>
                    <CardDescription>Update your cafe's public information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Cafe Name</Label>
                      <Input id="storeName" defaultValue="The Owl Cafe" className="bg-white/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input id="tagline" defaultValue="Where Every Sip Tells a Story." className="bg-white/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Coffee Street, Brew Town" className="bg-white/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+91 9876543210" className="bg-white/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue="hello@theowlcafe.com" className="bg-white/50" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button className="bg-[var(--color-accent)] hover:bg-[#e05c19] text-white">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "tax" && (
              <motion.div
                key="tax"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="glass-panel border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-[var(--color-primary)]">Invoicing</CardTitle>
                    <CardDescription>Configure invoice printing preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                      <Input id="invoicePrefix" defaultValue="OWL-" className="bg-white/50" />
                    </div>
                    <div className="pt-4">
                      <Button className="bg-[var(--color-accent)] hover:bg-[#e05c19] text-white">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "staff" && (
              <motion.div
                key="staff"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="glass-panel border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-[var(--color-primary)]">Staff Management</CardTitle>
                    <CardDescription>Manage staff roles and access levels.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                      You currently have 1 active staff member (Admin).
                    </p>
                    <Button variant="outline" className="border-[var(--color-border)]">
                      + Add New Staff
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="glass-panel border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-[var(--color-primary)]">Security</CardTitle>
                    <CardDescription>Update your password and secure your account.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPass">Current Password</Label>
                      <Input id="currentPass" type="password" className="bg-white/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPass">New Password</Label>
                      <Input id="newPass" type="password" className="bg-white/50" />
                    </div>
                    <div className="pt-4">
                      <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white">
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
