# صالون الأسطورة — Al Ostoura Barber Platform

Premium Arabic barber shop booking platform built with React, Convex, Clerk Auth, and Tailwind v4.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Routing | React Router v7 |
| Auth | Clerk (email/password, Google) |
| Backend | Convex (realtime DB + serverless functions) |
| Styling | Tailwind CSS v4 + Cairo font |
| Animation | Framer Motion (Motion library) |
| Icons | Lucide React |

## Features

### Customer-facing
- **Home** — Hero section with scroll indicator, quick stats, about section, dynamic team display
- **Services** — Category-filtered service browsing (hair, beard, spa, packages)
- **Gallery** — Image grid with keyboard-accessible lightbox (focus trap, ESC dismiss, ARIA)
- **Booking** — Multi-step booking flow (service → date/time → confirm) with form validation
- **Contact** — Contact form with email/phone/social links

### Admin panel (`/admin`)
- **Dashboard** — Real-time booking stats, filterable bookings table, status management (confirm/cancel)
- **Services** — CRUD for services with category, price, duration
- **Gallery** — CRUD for gallery images with ordering
- **Messages** — Inbox for contact form submissions with read/delete
- **Content** — Editable site content stored in DB
- **Team** — CRUD for barbers with name, role, image, bio, sort order

## Design System

### Brand Tokens

| Token | Value |
|-------|-------|
| `--color-brand-surface` | `#131313` (dark background) |
| `--color-brand-primary` | `#f2ca50` (gold accent) |
| `--color-brand-on-surface` | `#e5e2e1` (text) |
| `--ease-out-custom` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| `--ease-in-out-custom` | `cubic-bezier(0.77, 0, 0.175, 1)` |

### Design Principles (Emil Kowalski)
- Only animate `transform` and `opacity` — no layout-triggering properties
- All buttons have `:active` scale response (`scale(0.97)`)
- Explicit custom easings on every animation
- CSS transitions over keyframes for interruptible UI
- No `scale(0)` — elements start from `scale(0.95)` with `opacity: 0`
- Asymmetric enter/exit timing (exit faster than enter)
- Stagger delays between 30–80ms for list entries

## Accessibility

- Skip-to-content link on all pages
- `role="dialog"` + `aria-modal="true"` on all modals/lightboxes
- Focus trapping with Tab/Shift+Tab cycling + Escape dismiss (Gallery + Admin)
- `htmlFor`/`id` association on all form labels
- `aria-label` on all icon-only buttons
- `aria-expanded` / `aria-controls` on hamburger menu
- `aria-current="page"` on active nav items
- `role="alert"` on form error messages
- `role="status"` on loading spinners
- `scroll-behavior: auto` restored behind modals
- `prefers-reduced-motion` respected via CSS
- Globe `*:focus-visible` ring indicators
- Keyboard-navigable gallery grid (`role="button"`, `tabIndex`, `onKeyDown`)

## Mobile Responsiveness

- All touch targets minimum 44x44px
- `env(safe-area-inset-*)` padding on navbar, footer, and modals
- `min-h-[100dvh]` used over `h-screen`
- CSS Grid with responsive breakpoints (`grid-cols-1 sm:grid-cols-*`)
- All tables wrapped in `overflow-x-auto`
- Forms use `w-full` inputs with adequate `p-4` padding
- Modal content scrollable on small screens (`max-h-[90vh] overflow-y-auto`)
- RTL-first layout (`dir="rtl"`, `lang="ar"`)

## Performance

- `React.lazy` + `Suspense` code splitting per page
- No `transition-all` — explicit `transition-[property]` everywhere
- GPU-composited animations (only `transform` + `opacity`)
- Image `width`/`height` attributes to prevent CLS
- `img { max-width: 100%; height: auto }` global fallback
- Shared `Spinner` component with `role="status"`

## Getting Started

```bash
npm install
```

Set environment variables in `.env.local`:

```
VITE_CONVEX_URL=your_convex_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

Run the dev server:

```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── ErrorBoundary.tsx    # Global error boundary
│   ├── Layout.tsx           # Navbar + Footer + SkipLink
│   ├── ProtectedRoute.tsx   # Auth guard + admin check
│   └── Spinner.tsx          # Reusable loading spinner
├── pages/
│   ├── Admin.tsx            # Admin panel (7 tabs + Modal)
│   ├── Booking.tsx          # Multi-step booking flow
│   ├── Contact.tsx          # Contact form + info
│   ├── Gallery.tsx          # Image gallery + lightbox
│   ├── Home.tsx             # Home page + TeamSection
│   ├── Services.tsx         # Services browsing
│   ├── SignIn.tsx           # Clerk sign-in
│   └── SignUp.tsx           # Clerk sign-up
├── lib/
│   ├── usePageTitle.ts      # Page title hook
│   └── utils.ts             # cn() utility
├── App.tsx                  # Root with routing
└── index.css                # Global styles + brand tokens
```

## Build

```bash
npm run build
```

Build outputs to `dist/`.
