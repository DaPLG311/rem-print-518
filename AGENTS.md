# AGENTS.md — REM Digital Print & Mail Center

> **This file is the door.** If you're an AI coding agent (Codex, Claude, or otherwise)
> opening this repo, read this top-to-bottom first. It tells you what this project is, the
> rules you cannot break, how to run it, and where the real source of truth lives.

## What this is

A premium marketing + lead-generation site for **REM Digital Print & Mail Center** — an
established in-house production shop in Albany, NY (Capital Region / 518) that does printing,
apparel, mugs/sublimation, direct mail, promotional products, and political-campaign work.

**V1 is NOT ecommerce.** It is a premium **project acquisition, qualification, and intake
system**: attract → build trust → help the customer identify a service → capture project
details + artwork intent → route to a quote or a phone call. Aesthetic direction is
"premium industrial production studio" with deliberate **swagger** (oversized editorial
serif type, print-shop job-ticket details, crimson accent, cinematic motion).

## Source of truth — read these before writing code

1. **`docs/BRIEF.md`** — the LOCKED master brief. Positioning, six service lanes, the 10-act
   homepage, the 5-step quote funnel, visual system, motion doctrine and guardrails. This
   overrides everything, including your own instincts.
2. **`docs/BUILD_SPEC.md`** — final copy deck + quote-funnel field matrix + per-section visual
   notes, distilled from the brief and the approved design frames.
3. **`docs/VERIFY-BEFORE-LAUNCH.md`** — the honesty gate. Every unverified business claim,
   placeholder, and functional gap that must be owner-confirmed before this touches a real
   domain. **You may not remove items from this list to make the site look more finished.**

Approved visual design frames (PNG) live outside the repo in the build scratchpad; the brief
references them by name. Match the approved art direction — do not reinvent it.

## Non-negotiable rules

- **Do not invent business facts.** No services, testimonials, client names, equipment,
  turnaround guarantees, or stats beyond what `docs/BRIEF.md` approves. Any new factual claim
  must be added to `docs/VERIFY-BEFORE-LAUNCH.md` in the same change.
- **Business facts come only from `lib/config.ts`** (name, phone, address, service area,
  proof metrics). Never hard-code a phone number, address, or metric in a component.
- **Politically neutral** everywhere, especially the political-printing lane.
- **No secrets, ever.** All tracking/analytics IDs and the quote webhook come from env vars
  and must fail safe (inactive / no-op) when unset. See `.env.example`.
- **Stay in V1 scope.** Do NOT build: ecommerce checkout, live pricing calculator, product
  configurator, user accounts, client portal, proof approval, full promo catalog, inventory,
  or a job-status dashboard. Architecture should allow adding these later without a rebuild.
- **Motion guardrails are hard rules** (from the brief): exactly ONE pinned scroll sequence
  site-wide (homepage Act IV — service spectacle); one major visual idea per section; every
  GSAP/Lenis client component must respect `prefers-reduced-motion` (content fully visible,
  no pinning); mobile gets simplified choreography, never desktop motion copied down; nothing
  animated may block a conversion path (CTAs, tel: links, the quote wizard must be instantly
  usable). Kill ScrollTriggers on unmount.
- **Accessibility baseline**: semantic landmarks, real `<label>`s, visible focus states, AA
  text contrast, 44px+ tap targets. Note `--steel #8A8A86` is too low-contrast for body copy
  on light backgrounds — use it for labels/detail only.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict).
- Styling: **CSS Modules** (`*.module.css`) over a global design-token system in
  `styles/globals.css`. **No Tailwind.** Do not add it.
- Motion: **GSAP + ScrollTrigger** (client only, via `lib/gsap.ts`) and **Lenis** smooth
  scroll (`components/shared/SmoothScroll.tsx`, disabled under reduced motion).
- Icons: **lucide-react**. Fonts: **next/font** — Playfair Display (`--font-display`) +
  Archivo (`--font-ui`).
- **Do not add new dependencies** without a clear reason; keep the bundle lean.

### Design tokens (defined in `styles/globals.css`)

```
--rem-red: #C8102E   (REM Crimson — the accent; make it BREATHE, use it rarely)
--warm-black: #151515   --graphite: #292929
--paper: #F2EEE5   --soft-white: #FCFBF8
--steel: #8A8A86   --border-muted: #D2CEC4
```

## Repo map

```
app/
  layout.tsx            root: fonts, SmoothScroll, Header, Footer, MobileUtilityBar, JSON-LD
  page.tsx              homepage — imports the 10 acts from components/home/
  <service-slug>/       6 service pages (printing-bindery, apparel, mugs-sublimation,
                        direct-mail, promotional-products, political-printing)
  about/                heritage + people
  quote/                5-step wizard  •  quote/thank-you  (conversion event)
  rush/                 rush micro-flow (tap-to-call + short form)
  upload/               artwork-first entry
  api/quote/route.ts    POSTs to QUOTE_WEBHOOK_URL if set, else logs; always succeeds
  sitemap.ts robots.ts manifest.ts not-found.tsx
components/
  shared/               Header, Footer, MobileUtilityBar, MagneticCTA, Reveal,
                        SectionHeading, MediaMask, ProofMetric, RushPrompt,
                        ServicePageLayout, SmoothScroll, Analytics
  home/                 the 10 homepage act sections
  quote/                QuoteWizard + step forms, UploadZone, types.ts
lib/                    config.ts (business facts), seo.ts (metadata + JSON-LD), gsap.ts,
                        track.ts (env-gated analytics no-op)
docs/                   BRIEF.md  •  BUILD_SPEC.md  •  VERIFY-BEFORE-LAUNCH.md
```

Reusable service pages compose `components/shared/ServicePageLayout.tsx` — read its real
props before using it. `MediaMask` renders a tactile CSS placeholder when it has no `src`;
that is intentional (real REM photography does not exist yet). Do not swap placeholders for
fake stock humans or AI-looking imagery.

## How to run

```bash
npm install          # already done in this workspace
npm run dev          # local dev at http://localhost:3000
npm run build        # production build — MUST stay green before you hand off
npx tsc --noEmit     # type check — MUST stay clean
```

Copy `.env.example` to `.env.local` for local work; leaving the analytics/webhook vars empty
is correct and safe (everything degrades to inactive).

## Definition of done for any change

1. `npm run build` is green and `npx tsc --noEmit` is clean.
2. No new hard-coded business fact, secret, or tracking ID; anything unverified is reflected
   in `docs/VERIFY-BEFORE-LAUNCH.md`.
3. Motion guardrails and reduced-motion behavior hold; conversion paths stay instantly usable.
4. Mobile layout works (the persistent bottom utility bar must not overlap content).
5. You changed only what the task needs; you did not silently expand V1 scope.

## Current state

Full V1 structure is built: all 12 routes, the 10 homepage acts, the shared component
library, and the 5-step quote system exist. A multi-agent polish pass (motion + conversion
elevation, contrast/polish, final verification) may still be finishing. If you pick up work,
run the build first to see the true current state, then consult `docs/VERIFY-BEFORE-LAUNCH.md`
for what still blocks a real launch.
