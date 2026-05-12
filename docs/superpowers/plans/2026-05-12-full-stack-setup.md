# Full Stack Setup — AlOstoura Barber Platform

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate Clerk auth, Convex database, Node.js server/, and Vercel deployment into the existing Vite + React barber booking app.

**Architecture:** Frontend talks to Convex directly for real-time data (bookings, services). Clerk handles auth — customers log in to book, admin role gates the dashboard. Node.js server/ handles Clerk webhooks and any server-side operations. Vercel serves both frontend and server/ as a monorepo.

**Tech Stack:** @clerk/clerk-react, convex, Express, @clerk/backend, vercel

---

## File Map

### New Files
- `convex/schema.ts` — Convex DB schema: bookings, services tables
- `convex/bookings.ts` — Convex queries/mutations for bookings
- `convex/services.ts` — Convex queries for services
- `src/pages/SignIn.tsx` — Clerk hosted sign-in page
- `src/pages/SignUp.tsx` — Clerk hosted sign-up page
- `src/components/ProtectedRoute.tsx` — Clerk auth guard component
- `server/index.ts` — Express app entry
- `server/routes/webhooks.ts` — Clerk webhook handler (user sync to Convex)
- `server/routes/bookings.ts` — REST endpoints for bookings
- `server/middleware/auth.ts` — Clerk JWT verification middleware
- `server/package.json` — server dependencies
- `.env.local` — all env vars (Clerk, Convex)
- `vercel.json` — routes frontend + server

### Modified Files
- `src/App.tsx` — wrap with ClerkProvider + ConvexProvider, add sign-in/up routes
- `src/components/Layout.tsx` — add UserButton
- `src/pages/Booking.tsx` — replace fake setTimeout with real Convex mutation
- `src/pages/Admin.tsx` — replace hardcoded appointments with Convex query, gate with admin check
- `package.json` — add @clerk/clerk-react, convex

---

## Task 1: Install frontend dependencies

- [ ] Run install
```bash
npm install @clerk/clerk-react convex
```
- [ ] Verify package.json has both packages

---

## Task 2: Create .env.local

- [ ] Create `.env.local`
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_REPLACE_ME
CONVEX_DEPLOYMENT=REPLACE_ME
VITE_CONVEX_URL=https://REPLACE_ME.convex.cloud
```
> User must fill these in from Clerk dashboard and after `npx convex dev`

---

## Task 3: Set up Convex schema

- [ ] Create `convex/schema.ts`
```ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  services: defineTable({
    name: v.string(),
    price: v.number(),
    durationMinutes: v.number(),
  }),
  bookings: defineTable({
    serviceId: v.id("services"),
    serviceName: v.string(),
    date: v.string(),
    time: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    clerkUserId: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled")),
    price: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_date", ["date"]),
});
```

---

## Task 4: Create Convex services functions

- [ ] Create `convex/services.ts`
```ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("services").collect();
  },
});

export const seed = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("services").collect();
    if (existing.length > 0) return;
    const defaults = [
      { name: "قصة الأسطورة", price: 150, durationMinutes: 45 },
      { name: "قصة كلاسيكية", price: 100, durationMinutes: 30 },
      { name: "تحديد وتدريج اللحية", price: 80, durationMinutes: 20 },
      { name: "حلاقة ملكية", price: 120, durationMinutes: 30 },
      { name: "تنظيف بشرة ملكي", price: 200, durationMinutes: 60 },
    ];
    for (const s of defaults) await ctx.db.insert("services", s);
  },
});
```

---

## Task 5: Create Convex bookings functions

- [ ] Create `convex/bookings.ts`
```ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("bookings").order("desc").collect();
  },
});

export const listByDate = query({
  args: { date: v.string() },
  handler: async (ctx, { date }) => {
    return await ctx.db.query("bookings").withIndex("by_date", q => q.eq("date", date)).collect();
  },
});

export const create = mutation({
  args: {
    serviceId: v.string(),
    serviceName: v.string(),
    date: v.string(),
    time: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    clerkUserId: v.optional(v.string()),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookings", { ...args, serviceId: args.serviceId as any, status: "pending" });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled")),
  },
  handler: async (ctx, { id, status }) => {
    await ctx.db.patch(id, { status });
  },
});
```

---

## Task 6: Update App.tsx with providers and routes

- [ ] Replace `src/App.tsx`

---

## Task 7: Add SignIn and SignUp pages

- [ ] Create `src/pages/SignIn.tsx`
- [ ] Create `src/pages/SignUp.tsx`

---

## Task 8: Add ProtectedRoute component

- [ ] Create `src/components/ProtectedRoute.tsx`

---

## Task 9: Update Layout with UserButton

- [ ] Modify `src/components/Layout.tsx`

---

## Task 10: Connect Booking page to Convex

- [ ] Modify `src/pages/Booking.tsx` — replace fake services + setTimeout with real useMutation

---

## Task 11: Connect Admin page to Convex

- [ ] Modify `src/pages/Admin.tsx` — replace hardcoded data with useQuery

---

## Task 12: Set up server/

- [ ] Create `server/package.json`
- [ ] Create `server/middleware/auth.ts`
- [ ] Create `server/routes/webhooks.ts`
- [ ] Create `server/routes/bookings.ts`
- [ ] Create `server/index.ts`

---

## Task 13: Create vercel.json

- [ ] Create `vercel.json`

---
