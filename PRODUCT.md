# Product

## Register

brand

## Users

Men in Saudi Arabia (primarily Riyadh), approximately ages 20-50, who value premium grooming experiences. They are:
- Professionals and businessmen who care about their appearance
- Younger professionals who appreciate the combination of traditional barber culture with modern convenience
- Users who prefer booking online via their phones rather than calling
- Regular customers who value consistency, quality, and a luxury atmosphere

Context: They're often on the go, booking between meetings or during breaks. They want efficiency without compromising on quality.

Job to be done: "I want to look my best for my lifestyle — book a premium grooming appointment easily, see what services are available, view the barbershop's work, and trust that I'll get consistent, legendary-level quality."

## Product Purpose

Al Ostoura Barber ("The Legend") is a premium men's barbershop platform that redefines the grooming experience in Saudi Arabia.

What it does:
- Showcases luxury grooming services (haircuts, beard styling, spa treatments, packages)
- Enables online booking with date/time selection
- Presents a portfolio gallery of the barbershop's best work
- Provides contact information and social presence
- Includes an admin dashboard for managing bookings and services

Why it exists: To elevate the barbershop experience from a quick errand to a ritual of self-care and confidence. To merge traditional barbering craft with modern digital convenience.

Success looks like: Fully booked appointment slots, 4.9+ customer satisfaction, high repeat booking rate, and customers who identify with the "legendary" brand persona.

## Brand Personality

Three words: **Premium, Confident, Legendary**

Voice & Tone:
- Assertive but not arrogant — speaks with established authority ("15+ years experience", "5k+ happy customers")
- Uses bold, masculine language without being aggressive
- Arabic-first communication with phrases like "كن الأسطورة" (Be the legend) and "أرقى فنون العناية بالرجل" (The finest arts of men's grooming)
- Every interaction reinforces that this is not an ordinary barbershop — it's a grooming destination

Emotional goals: Evoke confidence, pride in appearance, the satisfaction of investing in oneself, and the feeling of being valued as a premium customer.

## Anti-references

What this explicitly should NOT look or feel like:

- **Cheap chain barbershops**: No "$5 haircut" vibes, no sterile fluorescent lighting aesthetic, no rushed service energy
- **Colorful/playful salon designs**: No rainbow palettes, no bubbly typography, no cartoonish elements
- **Generic bootstrap templates**: No default button styles, no 3 identical cards in a row, no "Lorem ipsum" energy
- **App-clone UI**: No Figma/Linear dashboard envy when designing the booking flow — it serves the brand, not the other way around
- **Fast-food grooming**: No "in-and-out in 5 minutes" positioning — this is about craft, ritual, and quality
- **AI clichés**: No generic "Elevate your experience" — use actual brand language like "كن الأسطورة في مظهرك"

## Design Principles

1. **Luxury through restraint** — Premium isn't loud. The dark, minimal palette with singular gold accent communicates sophistication. Every visual element earns its place.

2. **Show, don't tell** — The gallery and imagery lead. Before describing a "royal fade," show a photo of it. Use grayscale-to-color hover effects to let the work speak.

3. **Confidence is quiet** — No flashy animations, no screaming CTAs, no bounce effects. Motion is purposeful, weighty, and measured (cubic-bezier with gravity).

4. **East-west fusion** — Traditional barbering values (craft, mastery, man-to-man service) meets modern digital convenience (online booking, dashboard management, portfolio gallery).

5. **Arabic-first design** — RTL is not an afterthought. Cairo font is chosen specifically for Arabic character excellence. Every layout is tested from right-to-left first.

6. **Motion with gravitas** — Only animate what matters. Staggered reveals for service cards, smooth transitions in booking flow, the perpetual scroll indicator. All other elements remain still.

## Accessibility & Inclusion

- **WCAG AA**: Color contrast between gold accent (#F2CA50) on dark surface meets or exceeds AA standards for interactive elements
- **RTL native**: Full RTL support built into every component with `rtl:` prefix utilities
- **Mobile-first**: All touch targets minimum 44px, layouts collapse to single column below 768px
- **Reduced motion**: Complete `prefers-reduced-motion` media query handling at the CSS layer — all animations instantly disabled when user preference indicates
- **Screen reader**: Semantic HTML, proper form labels, ARIA labels where icon-only buttons exist
- **Language**: Arabic primary interface with consideration for users who may prefer English in future iterations
