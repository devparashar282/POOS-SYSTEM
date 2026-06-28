"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Coffee, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate login
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-secondary)] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card shadow-xl border-none">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                <Coffee className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold tracking-tight text-[var(--color-primary)]">The Owl Cafe</CardTitle>
              <CardDescription className="text-base">Sign in to the Management Dashboard</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-[var(--color-muted-foreground)]" />
                    <Input id="email" type="email" placeholder="admin@theowlcafe.com" required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-[var(--color-primary)] hover:underline font-medium">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-[var(--color-muted-foreground)]" />
                    <Input id="password" type="password" placeholder="••••••••" required className="pl-10" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                  <Label htmlFor="remember" className="font-normal cursor-pointer">Remember me for 30 days</Label>
                </div>
              </div>
              <Button type="submit" className="w-full h-11 text-base font-semibold shadow-md" disabled={isSubmitting}>
                {isSubmitting ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-[var(--color-border)] pt-6 mt-2">
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Secure POS & Billing System v2.0
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
