"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { CartItem } from "./CartDrawer";

const money = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function CheckoutModal({
  open,
  onOpenChange,
  items,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: CartItem[];
}) {
  const [form, setForm] = useState({ fullName: "", phone: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      customer: form,
      items: items.map((i) => ({ id: i.id, name: i.name, color: i.color, qty: i.qty, price: i.price })),
      total,
      paymentMethod: "COD",
      placedAt: new Date().toISOString(),
    };
    // Mock submission — replace with your real order API call
    console.log("ORDER_SUBMIT_PAYLOAD", JSON.stringify(payload, null, 2));
    setSubmitted(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(() => setSubmitted(false), 300);
      }}
    >
      <DialogContent className="sm:max-w-md rounded-2xl">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <DialogTitle>Confirm your order</DialogTitle>
              </DialogHeader>

              <div className="mt-2 mb-4 rounded-xl bg-neutral-50 p-3 text-sm flex justify-between">
                <span className="text-neutral-500">
                  {items.reduce((n, i) => n + i.qty, 0)} item(s)
                </span>
                <span className="font-semibold text-neutral-900">{money(total)}</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    required
                    placeholder="Aditi Sharma"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Textarea
                    id="address"
                    required
                    rows={3}
                    placeholder="House no, street, city, state, PIN code"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Place Order — Pay on Delivery
                  </Button>
                </motion.div>

                <p className="flex items-center justify-center gap-1.5 text-xs text-neutral-400">
                  <ShieldCheck className="h-3.5 w-3.5" /> No account needed. Your details stay private.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 flex flex-col items-center text-center gap-3"
            >
              <CheckCircle2 className="h-14 w-14 text-emerald-600" />
              <h3 className="text-lg font-semibold text-neutral-900">Order placed!</h3>
              <p className="text-sm text-neutral-500">
                We'll call {form.phone || "you"} to confirm before dispatch. Pay in cash when it arrives.
              </p>
              <Button variant="outline" className="rounded-full mt-2" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
