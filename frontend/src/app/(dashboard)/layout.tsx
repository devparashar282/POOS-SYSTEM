"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Tags, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Coffee,
  Menu,
  X,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "POS Billing", href: "/pos", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Package },
  { name: "Orders", href: "/orders", icon: FileText },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex h-screen bg-[var(--color-secondary)]/30 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-[var(--color-card)] border-r border-[var(--color-border)] shadow-sm z-20">
        <div className="h-16 flex items-center justify-center px-6 border-b border-[var(--color-border)] py-2">
          <Image src="/logo.png" alt="The Owl Cafe Logo" width={100} height={40} className="object-contain h-full" />
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <div className={`flex items-center px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive 
                    ? "bg-[var(--color-primary)] text-white shadow-sm" 
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                }`}>
                  <link.icon className={`h-5 w-5 mr-3 ${isActive ? "text-white" : "text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)] transition-colors"}`} />
                  <span className="font-medium text-sm">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-[var(--color-border)]">
          <Link href="/login">
            <Button variant="ghost" className="w-full justify-start text-[var(--color-muted-foreground)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-card)] border-r border-[var(--color-border)] transform transition-transform duration-300 ease-in-out md:hidden ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--color-border)]">
          <div className="flex items-center h-full py-2">
            <Image src="/logo.png" alt="The Owl Cafe Logo" width={80} height={32} className="object-contain h-full" />
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} onClick={() => setIsMobileOpen(false)}>
                <div className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-[var(--color-primary)] text-white shadow-sm" 
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                }`}>
                  <link.icon className={`h-5 w-5 mr-3 ${isActive ? "text-white" : ""}`} />
                  <span className="font-medium text-sm">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[var(--color-card)] border-b border-[var(--color-border)] flex items-center justify-between px-4 md:px-6 shadow-sm z-10 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-2 mr-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] md:hidden rounded-md hover:bg-[var(--color-muted)]"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-semibold text-lg hidden sm:block">
              {sidebarLinks.find(link => link.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors rounded-full hover:bg-[var(--color-muted)]"
              >
                <Bell className="h-5 w-5" />
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[var(--color-border)] z-50 overflow-hidden">
                  <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-muted)]/30">
                    <h3 className="font-semibold text-[var(--color-primary)]">Notifications</h3>
                    <span className="text-xs bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-0.5 rounded-full">0 New</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    <div className="p-8 text-center text-[var(--color-muted-foreground)]">
                      <p className="text-sm">No new notifications</p>
                    </div>
                  </div>
                  <div className="p-2 text-center border-t border-[var(--color-border)] bg-[var(--color-muted)]/30">
                    <button className="text-xs font-medium text-[var(--color-primary)] hover:underline">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3 border-l border-[var(--color-border)] pl-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">Manager</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-transparent">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
