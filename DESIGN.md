# Design System: Al Ostoura Barber (صالون الأسطورة)

## 1. Visual Theme & Atmosphere

A premium dark-themed interface with masculine gravitas and gold-accented luxury. The atmosphere evokes a high-end gentlemen's barbershop at night — dark charcoal surfaces, warm beige text, deliberate gold highlights.

- **Density:** 4/10 — Gallery Balanced. Generous whitespace in hero sections, compact but readable service grids.
- **Variance:** 7/10 — Asymmetric Confident. Split layouts, offset compositions, but never chaotic.
- **Motion:** 6/10 — Fluid and Weighty. Purposeful animations only; no frivolous movement. Easing has gravity.

The visual language speaks in deep charcoal, warm parchment beige, and singular gold. Every button has presence. Every transition carries weight.

## 2. Color Palette & Roles

### Primary Colors
- **Brand Surface** (#131313) — Page background, base canvas. Deep charcoal, not pure black.
- **Brand Surface Container** (#201F1F) — Cards, elevated containers, nav background when scrolled
- **Brand Surface Container Low** (#1C1B1B) — Footer, subtle inset backgrounds
- **Brand Surface Container High** (#2A2A2A) — Table headers, elevated interactive surfaces

### Content Colors
- **Brand On Surface** (#E5E2E1) — Primary text, headlines, body copy. Warm off-white/parchment.
- **Brand On Surface Variant** (#D0C5AF) — Secondary text, descriptions, metadata. Muted warm beige.
- **Brand Outline** (#99907C) — Subtle borders, dividers, minimum-contrast lines
- **Brand Outline Variant** (#4D4635) — Card borders, low-contrast structural lines

### Accent Color (Only One)
- **Brand Primary** (#F2CA50) — GOLD. CTAs, active states, highlights, logo mark, price text. Single saturation-controlled accent.
- **Brand On Primary** (#3C2F00) — Text that sits on gold background. Dark brown/charcoal for maximum contrast.
- **Brand Primary Container** (#D4AF37) — Deeper gold variant for graduated surfaces

### Banned Colors & Patterns
- No pure black (#000000) — always use #131313 or darker variants
- No neon glows, no purple/blue AI aesthetic
- No multiple accent colors — gold only
- No saturation above 80% on any accent
- No warm/cool gray inconsistency — entire palette is warm-tinged charcoal

## 3. Typography Rules

### Primary Font Stack
```css
--font-sans: "Cairo", ui-sans-serif, system-ui, sans-serif;
```

### Font: Cairo (Arabic-first Excellence)
Selected specifically for exceptional Arabic character rendering and strong, confident Latin alphabet. Cairo is modern, clean, and carries authority.

### Hierarchy & Scale
- **Display/Headlines:** `font-black` (900 weight), `tracking-tighter`, scale-driven through `text-4xl md:text-6xl md:text-8xl`. Hierarchy through weight and color, not just size.
- **Body:** `font-medium` to `font-bold`, `leading-relaxed`, always in Brand On Surface or On Surface Variant.
- **CTAs:** Always `font-black` — buttons carry confidence through weight.

### Typographic Anti-Patterns
- **Banned fonts:** Inter, generic system defaults for premium contexts
- **Never:** Use light weights (300) for anything below 18px
- **Avoid:** Centered body text longer than 2 lines
- **No:** Gradient text on large display headlines

## 4. Component Stylings

### Buttons
- **Shape:** Sharp corners (`rounded-sm` or effectively square). No rounded-lg or pill buttons. Square = masculine confidence.
- **Primary:** `bg-brand-primary text-brand-on-primary font-black`. Tactile push feedback: `press-active` class with `scale(0.97)` on active.
- **Secondary/Outline:** `border border-brand-outline-variant hover:border-brand-primary hover:text-brand-primary`. Same `press-active` scale.
- **Behavior:** `group` for internal hover transforms (e.g., ArrowRight translation). No outer glow shadows.
- **Disabled:** `opacity-50 cursor-not-allowed`.

### Cards & Containers
- **Style:** Surface-based, not shadow-based. `bg-brand-surface-container` with `border border-brand-outline-variant`.
- **Hover:** `hover:border-brand-primary/50` — border lightens to gold, no scale unless interactive.
- **Interior spacing:** Generous padding (`p-8`, `p-10`), border-t dividers between sections inside.
- **Admin dashboard tables:** Subtle borders, `hover:bg-brand-surface` row highlight, minimal elevation.

### Inputs & Forms
- **Base:** `bg-brand-surface border-2 border-brand-outline-variant p-4`
- **Focus:** `focus:border-brand-primary outline-none` — ringless, border-only focus
- **Labels:** `text-sm font-bold text-brand-on-surface-variant uppercase tracking-wider` — label above input only
- **Pattern:** Icons inside inputs positioned absolutely (User icon, `+966` prefix). Icons use Brand Outline Variant.
- **Errors:** `bg-red-500/10 border border-red-500/30 text-red-500` — subtle, not screaming.

### Gallery & Imagery
- **Default state:** `grayscale` — images render black and white by default
- **Interaction:** `hover:grayscale-0 hover:scale-110` — color reveals on hover, subtle scale
- **Transitions:** `duration-700` — slow, luxurious fade from mono to color
- **Overlay:** Gradient overlays `from-black/80` with metadata positioned bottom-right

### Navigation
- **Desktop:** Fixed at top, `bg-transparent` when unscrolled, `bg-brand-surface-container/90 backdrop-blur-md shadow-lg` when scrolled.
- **Active nav link:** `text-brand-primary` + `motion.div` layoutId underline animating between items.
- **Mobile:** Hamburger (`Menu`/`X` icons) with motion-animated slide-down panel.

## 5. Layout Principles

### Grid & Containment
- **Max-width container:** `max-w-7xl mx-auto` on all section content. Pages don't bleed edge-to-edge on large screens.
- **Section padding:** `py-20 md:py-24 px-6` — generous vertical rhythm
- **CSS Grid preferred:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — clean responsive collapse without flexbox hacks
- **No `calc()` percentage math** — use native grid auto-placement

### Section Structure
- **Hero:** `min-h-[90vh] flex items-center justify-center` — full-viewport but not `h-screen` (avoids iOS Safari jump)
- **Background strategy:** Image + grayscale + opacity-30 + gradient overlay. Text never gets lost.
- **Split layouts:** 50/50 image+text sections with asymmetric gaps. Not 3 identical cards.

### Responsive Rules
- **Collapse:** All multi-column grids become `grid-cols-1` below 768px. No exceptions.
- **Typography scale:** `text-5xl md:text-8xl` pattern — headlines dramatically smaller on mobile.
- **Touch targets:** All buttons minimum `py-4` or equivalent. Icon buttons use `p-2` but sit in larger tap zones.
- **Nav:** Desktop horizontal nav collapses to hamburger menu. Mobile nav is full-width slide panel.

### RTL-Specific
- **Built-in RTL handling:** `rtl:rotate-180` for directional icons (ArrowRight/Chevron)
- **Grid auto-flip:** Native CSS Grid handles RTL column order automatically
- **Right-aligned by design:** Arabic text reads naturally right-aligned; tables are `text-right`

## 6. Motion & Interaction

### Easing Curves (Custom Physics)
```css
--ease-out-custom: cubic-bezier(0.23, 1, 0.32, 1);     /* exit, overshoot */
--ease-in-out-custom: cubic-bezier(0.77, 0, 0.175, 1);  /* entrance-exit */
```
Not generic ease. These have weight, like opening a heavy luxury door.

### Animation Library
- **Motion (Framer Motion):** Used for all orchestrated transitions
- **Patterns:** `initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}`
- **Staggered reveals:** `transition={{ delay: i * 0.05 }}` on mapped arrays — waterfall mount
- **Layout animations:** `layoutId` for shared element transitions (gallery lightbox, nav underline)

### Component-Level Micro-Interactions
- **Press-active:** `transition: transform 160ms cubic-bezier(...)` then `transform: scale(0.97)` on `:active`
- **Shine effect:** Buttons get absolute `bg-white/20` layer that slides `x: -100% → 100%` on hover
- **Perpetual motion:** Only the scroll indicator uses `animate={{ y: [0, 10, 0] }}` infinite loop

### Reduced Motion Safety
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
Total kill-switch at CSS level. Respects user system preference.

### What Never Animates
- Body text opacity on scroll
- Parallax backgrounds
- Bouncing CTAs
- Frivolous decorative elements

## 7. Anti-Patterns (Banned)

### Visual Clichés
- **No emojis anywhere** — brand voice is confident without decoration
- **No 3-column equal card layouts** — use zig-zag 2-col, asymmetric grid, or horizontal scroll
- **No pure black (#000000)** — #131313 is the darkest
- **No neon outer glow shadows** — subtle tinted borders only
- **No `Inter` font** — Cairo is brand-appointed and Arabic-excellent

### UX & Copy
- **No generic placeholder names:** No "John Doe" — use Arabic real names like "أحمد محمد"
- **No AI copy clichés:** No "Elevate", "Seamless", "Unleash", "Next-Gen". Use actual brand language: "كن الأسطورة في مظهرك"
- **No fake numbers:** Real stats only — "5k+", "15+", "4.9" from the actual codebase
- **No "Scroll to explore" filler:** The content should pull users in naturally

### Layout Crimes
- **No overlapping elements:** Every element occupies its own clean spatial zone. Text never sits on partially transparent image areas without a solid gradient buffer.
- **No `h-screen`:** Always use `min-h-[90vh]` or `min-h-[100dvh]` — iOS Safari has catastrophic viewport jump issues
- **No flexbox `calc()` hacks:** Use Grid
- **No broken Unsplash links:** The project uses real, tested Unsplash URLs — don't introduce broken ones

### Motion Frivolity
- **No custom mouse cursors**
- **No scroll-triggered text fade-in on every paragraph**
- **No bouncy entrance animations** — motion has weight and purpose
- **No spring physics on everything** — cubic-bezier gravity is the default feel
