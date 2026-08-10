# Setup — Product Page

## 1. New Next.js app (skip if you already have one)
```bash
npx create-next-app@latest my-store --typescript --tailwind --app
cd my-store
```

## 2. Install deps
```bash
npm install framer-motion lucide-react
```

## 3. Init shadcn/ui + add components used
```bash
npx shadcn@latest init
npx shadcn@latest add button badge sheet dialog input label textarea
```
(Accept defaults when prompted — style "New York" or "Default" both work fine.)

## 4. Drop in the files
Copy these into your project, keeping the paths:
```
components/ProductPage.tsx
components/CartDrawer.tsx
components/CheckoutModal.tsx
app/page.tsx        → replace your existing app/page.tsx
```

## 5. Run it
```bash
npm run dev
```
Open http://localhost:3000 — resize to mobile width (or use device toolbar in devtools) to see the sticky Buy Now bar and 50vh carousel.

## Notes
- Checkout submit only `console.log`s the JSON payload (open devtools console) — wire it to your real order API/Sheet/CRM when ready.
- Swap the Unsplash URLs in `PRODUCT.images` for your real product photos.
- Primary accent color is emerald (`emerald-600`) — change every `emerald-` class if you want a different brand color.
- Everything is one product (`PRODUCT` object at top of `ProductPage.tsx`) — turn it into a prop/fetch call to reuse across products.
