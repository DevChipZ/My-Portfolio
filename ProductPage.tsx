"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Play,
  RotateCw,
  Truck,
  Banknote,
  ShieldCheck,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CartDrawer, { CartItem } from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";

// ---- Mock product data (swap with real CMS/API data later) ----
const PRODUCT = {
  id: "aero-01",
  name: "AeroGlide Wireless Charging Stand",
  price: 2499,
  compareAtPrice: 4199,
  rating: 4.9,
  reviewCount: 1284,
  colors: [
    { name: "Graphite", hex: "#1F2223" },
    { name: "Sandstone", hex: "#D8CFC1" },
    { name: "Sage", hex: "#8B9A8C" },
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=80",
      type: "image" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1591290619762-c9d3b9ee6a08?w=1200&q=80",
      type: "video" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80",
      type: "360" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1622957461294-42d97457fda7?w=1200&q=80",
      type: "image" as const,
    },
  ],
};

const money = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function ProductPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(PRODUCT.colors[0].name);
  const [qty, setQty] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const discountPct = Math.round(
    ((PRODUCT.compareAtPrice - PRODUCT.price) / PRODUCT.compareAtPrice) * 100
  );

  function addToCart(openCheckoutAfter = false) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === PRODUCT.id && i.color === color);
      if (existing) {
        return prev.map((i) =>
          i.id === PRODUCT.id && i.color === color ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          id: PRODUCT.id,
          name: PRODUCT.name,
          price: PRODUCT.price,
          color,
          qty,
          image: PRODUCT.images[0].src,
        },
      ];
    });
    if (openCheckoutAfter) {
      setCheckoutOpen(true);
    } else {
      setCartOpen(true);
    }
  }

  return (
    <div className="min-h-screen bg-white pb-28 sm:pb-0">
      {/* ---------------- Image Carousel (top 50% on mobile) ---------------- */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen lg:w-1/2 lg:fixed lg:left-0 lg:top-0 bg-neutral-100 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={PRODUCT.images[activeImage].src}
            alt={PRODUCT.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* media-type badge */}
        {PRODUCT.images[activeImage].type === "video" && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-3 py-1.5 text-white text-xs font-medium">
            <Play className="h-3.5 w-3.5 fill-white" /> Watch video
          </div>
        )}
        {PRODUCT.images[activeImage].type === "360" && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-3 py-1.5 text-white text-xs font-medium">
            <RotateCw className="h-3.5 w-3.5" /> 360° view
          </div>
        )}

        {/* discount badge */}
        <Badge className="absolute top-4 right-4 bg-emerald-600 hover:bg-emerald-600 text-white border-0">
          -{discountPct}%
        </Badge>

        {/* thumbnails */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
          {PRODUCT.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden ring-2 transition-all ${
                activeImage === idx ? "ring-emerald-600 scale-105" : "ring-white/70"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img src={img.src} className="h-full w-full object-cover" alt="" />
              {img.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="h-3.5 w-3.5 fill-white text-white" />
                </span>
              )}
              {img.type === "360" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <RotateCw className="h-3.5 w-3.5 text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Product Info ---------------- */}
      <div className="relative z-10 -mt-6 sm:mt-0 rounded-t-3xl sm:rounded-none bg-white px-5 sm:px-8 pt-6 lg:ml-[50%] lg:w-1/2 lg:px-16 lg:pt-24">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-neutral-900">
          {PRODUCT.name}
        </h1>

        {/* Social proof */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm text-neutral-600">
            {PRODUCT.rating}/5 ({PRODUCT.reviewCount.toLocaleString()} Reviews)
          </span>
        </div>

        {/* Price + urgency */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-3xl font-bold text-neutral-900">{money(PRODUCT.price)}</span>
          <span className="text-lg text-neutral-400 line-through">{money(PRODUCT.compareAtPrice)}</span>
          <motion.span
            animate={{ opacity: [1, 0.55, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="ml-auto sm:ml-0 inline-flex items-center gap-1 rounded-full bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1"
          >
            🔥 15 people are viewing this right now
          </motion.span>
        </div>

        {/* Color selector */}
        <div className="mt-6">
          <p className="text-sm font-medium text-neutral-800 mb-2">
            Color: <span className="font-normal text-neutral-500">{color}</span>
          </p>
          <div className="flex gap-2.5">
            {PRODUCT.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`h-9 w-9 rounded-full ring-2 ring-offset-2 transition-all ${
                  color === c.name ? "ring-neutral-900" : "ring-transparent"
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-6">
          <p className="text-sm font-medium text-neutral-800 mb-2">Quantity</p>
          <div className="inline-flex items-center rounded-full border border-neutral-200">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-10 w-10 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 rounded-full"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-10 w-10 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 rounded-full"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Desktop CTA row (hidden on mobile, mobile uses sticky bar) */}
        <div className="mt-8 hidden sm:flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button
              onClick={() => addToCart(false)}
              variant="outline"
              className="w-full h-13 py-3.5 rounded-full border-neutral-300 text-neutral-900 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            >
              <ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button
              onClick={() => addToCart(true)}
              className="w-full h-13 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.45)]"
            >
              Buy Now — Cash on Delivery
            </Button>
          </motion.div>
        </div>

        {/* Trust signals */}
        <div className="mt-8 mb-8 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-6">
          <TrustItem icon={<Truck className="h-5 w-5" />} label="Free Shipping" />
          <TrustItem icon={<Banknote className="h-5 w-5" />} label="Cash on Delivery" />
          <TrustItem icon={<ShieldCheck className="h-5 w-5" />} label="SSL Secure Checkout" />
        </div>

        {/* Description */}
        <div className="pb-10 lg:pb-24 text-sm leading-relaxed text-neutral-600 space-y-3 border-t border-neutral-100 pt-6">
          <p>
            Charge up to three devices at once with a magnetic 15W fast-charging stand built from
            aircraft-grade aluminum. Foldable, travel-ready, and engineered to keep your desk calm.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>15W MagSafe-compatible fast charging</li>
            <li>Foldable aluminum frame, fits in any bag</li>
            <li>Overcharge &amp; overheat protection</li>
            <li>12-month warranty</li>
          </ul>
        </div>
      </div>

      {/* ---------------- Sticky mobile CTA ---------------- */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur border-t border-neutral-200 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => addToCart(false)}
            className="h-12 w-12 shrink-0 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </motion.button>
          <motion.button
            animate={{ boxShadow: ["0 0 0 0 rgba(16,185,129,0.5)", "0 0 0 10px rgba(16,185,129,0)"] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            whileTap={{ scale: 0.97 }}
            onClick={() => addToCart(true)}
            className="flex-1 h-12 rounded-full bg-emerald-600 text-white font-semibold text-sm active:bg-emerald-700"
          >
            Buy Now – Cash on Delivery
          </motion.button>
        </div>
      </div>

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        items={cart.length ? cart : [{ id: PRODUCT.id, name: PRODUCT.name, price: PRODUCT.price, color, qty, image: PRODUCT.images[0].src }]}
      />
    </div>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-1.5">
      <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[11px] leading-tight text-neutral-500">{label}</span>
    </div>
  );
}
