"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  color: string;
  qty: number;
  image: string;
};

const money = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function CartDrawer({
  open,
  onOpenChange,
  items,
  onCheckout,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: CartItem[];
  onCheckout: () => void;
}) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({items.reduce((n, i) => n + i.qty, 0)})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-neutral-500 text-center mt-10">Your cart is empty.</p>
          )}
          {items.map((item, idx) => (
            <motion.div
              key={`${item.id}-${item.color}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex gap-3 items-center"
            >
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">{item.name}</p>
                <p className="text-xs text-neutral-500">
                  {item.color} · Qty {item.qty}
                </p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">{money(item.price * item.qty)}</p>
              </div>
              <button className="text-neutral-400 hover:text-red-500" aria-label="Remove item">
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <SheetFooter className="flex-col gap-3 border-t pt-4">
          <div className="flex justify-between w-full text-sm">
            <span className="text-neutral-500">Subtotal</span>
            <span className="font-semibold text-neutral-900">{money(total)}</span>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full">
            <Button
              disabled={items.length === 0}
              onClick={onCheckout}
              className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Checkout
            </Button>
          </motion.div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
