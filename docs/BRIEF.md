# REM DIGITAL PRINT & MAIL CENTER — LOCKED BUILD BRIEF

This is the single source of truth. Every agent reads this before writing code.
Approved Canva frames (visual truth) live at:
`/private/tmp/claude-501/-Users-daplg/f003fd2b-67c4-4c9a-9a99-755605f691c2/scratchpad/rem/png/`

## MISSION

Transform REM's perception from "a local print shop" into **a high-trust, fast-turnaround
local production partner** for businesses, political campaigns, schools, organizations,
events, marketing pros, and local customers in Albany NY / Capital Region / 518.

Emotional operating idea: **BRING REM THE JOB. THEY KNOW HOW TO GET IT DONE.**

Positioning: *Albany's established in-house production partner for print, apparel, mail,
promotional products, and political campaign work.*

## GOVERNING RULES

1. **DO NOT INVENT SERVICES.** Preserve REM's exact real offer set.
2. Unverified business claims stay listed in `docs/VERIFY-BEFORE-LAUNCH.md`; do not add new
   unverified factual claims beyond those already approved for staging.
3. Politically neutral everywhere.
4. This is NOT ecommerce. V1 = **premium project acquisition, qualification, and intake system.**
5. Never hard-code secrets or tracking IDs — env vars only, fail safe when missing.

## BRAND PILLARS (every major page reinforces ≥2)

HERITAGE (est. 1985, family-founded by the Remmert family) · SPEED (deadlines are a buying
reason) · CAPABILITY (visible breadth) · IN-HOUSE CONTROL (one roof = coordination, speed,
control) · HUMAN SERVICE (real people behind the machines).

## SIX SERVICE LANES (exact, numbered 01–06)

- **01 PRINTING & BINDERY** — digital printing, business materials, flyers, brochures,
  posters, envelopes; finishing: cutting, folding, scoring, laminating, dry mounting,
  numbering, die cutting, drilling, saddle stitching, wire binding. Translate production
  jargon into customer outcomes.
- **02 APPAREL** — t-shirts, tanks, hoodies, bags, screen printing. Help answer: what item,
  how many, artwork status, when needed.
- **03 MUGS & SUBLIMATION** — no minimums, no setup fees, no fading, no flaking (verify).
  Tactile, product-focused feel.
- **04 DIRECT MAIL** — EDDM, variable data, folding, sealing, tabbing, sorting, campaign
  mailing. Story: **FROM PRINTED PIECE TO MAILBOX.**
- **05 PROMOTIONAL PRODUCTS** — NO catalog rebuild. Guided project discovery: what are you
  promoting, audience, quantity, budget range, date. REM narrows the field.
- **06 POLITICAL PRINTING** — first-class visibility. Postcards, brochures, literature,
  mailings, posters, banners, yard signs, buttons, bumper stickers, magnets, campaign items,
  design support, mailing support. UX reflects deadline urgency. Neutral.

## ROUTES (Per-View Search Identity: every route gets unique title/meta/canonical/OG/JSON-LD)

| Route | Page |
|---|---|
| `/` | Homepage (10-act cinematic progression) |
| `/printing-bindery` | Service 01 |
| `/apparel` | Service 02 |
| `/mugs-sublimation` | Service 03 |
| `/direct-mail` | Service 04 |
| `/promotional-products` | Service 05 |
| `/political-printing` | Service 06 |
| `/about` | Heritage + people |
| `/quote` | Multi-step quote wizard (core product) |
| `/quote/thank-you` | Conversion event page |
| `/rush` | Rush-job micro-flow (tap-to-call + short form) |
| `/upload` | Artwork upload path |

Primary nav: Services, Apparel, Direct Mail, Promotional Products, Political Printing,
About, Request a Quote. Persistent utility: **UPLOAD ARTWORK · CALL REM · RUSH JOB**.
Mobile: persistent bottom utility bar **CALL · QUOTE · UPLOAD**.

## VISUAL SYSTEM (locked, sampled from approved frames)

Concept: **PREMIUM INDUSTRIAL PRODUCTION STUDIO** — established craft meets modern
production. Sensory language: paper, ink, fabric, steel, heat, pressure, machinery,
registration, layers, stacks, output, deadlines, movement.

Palette (CSS custom properties in `styles/globals.css`):

- `--rem-red: #C8102E` (REM Crimson — sampled from approved hero frame; PMS 186 family)
- `--warm-black: #151515`
- `--graphite: #292929`
- `--paper: #F2EEE5` (warm paper / bone)
- `--soft-white: #FCFBF8`
- `--steel: #8A8A86`
- `--border-muted: #D2CEC4`

Typography (next/font, self-hosted): **Playfair Display** (display serif — heroes, section
statements, service titles, big numerals) + **Archivo** (interface sans — nav, buttons,
forms, labels). Typography operates as image: oversized headlines, cropped words, vertical
labels, rotated technical info, production numbering, registration-style alignment.
Controlled graphic details: crop marks, registration marks, job numbers, deadline labels,
measurement ticks — sparingly.

Dark and light moments alternate (warm-black/graphite sections ↔ paper/soft-white sections).
Full-bleed imagery, tactile texture, layered compositions, cinematic cropping, controlled
asymmetry. MUST NOT look like: generic print-shop template, cheap online printer, SaaS
startup, corporate blue, effect spam, random 3D.

## MOTION DOCTRINE

Cinematic and aggressive is allowed; every movement must guide attention, show hierarchy,
preserve context, confirm interaction, demonstrate transformation, communicate speed or
craftsmanship, or create narrative flow.

System: Lenis smooth scroll + GSAP/ScrollTrigger choreography. Reduced-motion fallback
mandatory (respect `prefers-reduced-motion`: content visible, no pinning, instant states).
Mobile gets its own reduced choreography — never desktop motion copied down.

**Guardrails (hard):** one major visual idea per section · one hero technical moment · ONE
primary pinned storytelling sequence (Act IV services) · max 1–2 selective WebGL moments
(default: ZERO — no Three.js unless it earns it) · no long intro · no hidden nav · no
animation blocking conversion · no fake loaders · no scroll hijack users fight · no heavy
effects on every card.

## HOMEPAGE — 10 ACTS (see frame PNGs by name)

- **ACT I — HERO COLD OPEN** (`hero-composition.png`): full crimson field. Fragmented
  oversized serif: PRINT. APPAREL. MAIL. PROMO. staggered split-type entrance, depth planes,
  resolves with supporting statement **HANDLED IN-HOUSE. DONE FAST.** Support copy: "Albany
  businesses, campaigns, schools, organizations, and communities trust REM for
  fast-turnaround production backed by decades of local experience." CTAs: START YOUR
  PROJECT (primary → /quote) · EXPLORE SERVICES. Urgent utility: WORKING AGAINST A DEADLINE?
  → CALL REM.
- **ACT II — CUSTOMER RECOGNITION** (`customer-need-navigation.png`): "WHAT ARE YOU TRYING
  TO GET DONE?" Immersive task-based entry paths (not an icon grid): I need something
  printed / shirts or apparel / reach people by mail / branded promo items / political
  materials fast / not sure what I need.
- **ACT III — PROOF** (`trust-and-proof-strip.png`): warm-black strip, huge serif numerals:
  **1985** ESTABLISHED · **99%** IN-HOUSE PRODUCTION · **3–5** DAY DIGITAL TURNAROUND ·
  **24HR** RUSH OPTIONS AVAILABLE. Production-ticket treatment, not SaaS stat cards.
- **ACT IV — SERVICE SPECTACLE** (`scroll-pinned-services.png`): THE pinned sequence.
  Numbered panels 01–06 mechanically replace each other (slide/peel/stack), typography
  locking into registration. Active service dominates; previous exits as next enters.
- **ACT V — IN-HOUSE ADVANTAGE** (`in-house-advantage.png`): "MORE OF THE JOB STAYS UNDER
  ONE ROOF." Sequence PRINT → FINISH → PREP → MAIL OR OUTPUT with practical value copy.
- **ACT VI — FEATURED WORK** (`featured-work-gallery.png`, `capability-wall.png`): moving
  production wall (not a portfolio grid). Categories: campaign launch, business printing,
  school apparel, direct mail, event materials, branded merchandise.
- **ACT VII — POLITICAL TAKEOVER** (`political-takeover.png`): "CAMPAIGNS MOVE ON DEADLINES.
  SO DOES REM." Dramatic neutral wall of campaign materials. CTAs: START A POLITICAL
  PROJECT · CALL ABOUT A DEADLINE.
- **ACT VIII — HUMAN TRUST** (`history-human-trust.png`): "FOUNDED HERE. BUILT OVER
  DECADES." Industrial → people/history/family transition. "All this capability still has
  people behind it."
- **ACT IX — PROJECT PROCESS** (`project-process.png`): 01 TELL US WHAT YOU NEED → 02 SEND
  YOUR FILES → 03 REM HANDLES PRODUCTION → 04 THE JOB GETS WHERE IT NEEDS TO GO.
- **ACT X — CONVERSION**: "WHAT ARE WE MAKING?" → premium intake entry into /quote.

## QUOTE FUNNEL (core product — see quote-*.png + mobile-quote-funnel.png)

Not a contact form. Multi-step wizard, form shell morphs by project type, dynamic fields
appear only when relevant, smooth progress, upload feedback, confirmation transformation.

1. **SERVICE**: Printing / Apparel / Mugs & Sublimation / Direct Mail / Promotional
   Products / Political / Not Sure.
2. **DYNAMIC DETAILS** (per service): product type, quantity, size, colors, needed-by date,
   mailing required, finishing required — only relevant fields.
3. **ARTWORK**: "WHERE ARE YOU WITH THE ARTWORK?" → I have final artwork / I have something
   started / I need help figuring it out. Uploads + reference images + notes.
4. **CONTACT**: name, company/organization, phone, email, preferred contact method.
5. **CONFIRMATION**: received, what happens next, urgent phone option, project summary.
   Measurable conversion event.

Validation per step; error states; needed-by date required on rush; analytics events fired
via the env-gated tracking layer (no-ops when IDs unset). V1 submission: POST to
`/api/quote` route which forwards to `QUOTE_WEBHOOK_URL` if set, else logs server-side and
still succeeds for the user.

## RUSH PATH

"WORKING AGAINST A DEADLINE? CALL ABOUT A RUSH JOB." Tap-to-call on mobile, visible phone
route, optional short rush form (needed-by date required), NO guaranteed turnaround language
before REM reviews. Appears at meaningful decision points without becoming annoying.

## MOBILE

Not a shrunken desktop. Persistent bottom bar CALL · QUOTE · UPLOAD. Large tap targets,
one-question-at-a-time quote steps where appropriate, camera/file upload, early trust proof,
reduced motion complexity, strong typography, clear rush access.

## V1 SCOPE — DO NOT BUILD

No ecommerce checkout, live pricing calculator, configurator, accounts, client portal,
proof approval, full promo catalog, inventory, job-status dashboard. Architecture must not
require rebuild to add these later (Never Rebuild Twice).

## TECH (locked)

Next.js 15 App Router + TypeScript + CSS Modules on a global custom-property token system
(NO Tailwind). GSAP + ScrollTrigger, Lenis, lucide-react. next/font for Playfair Display +
Archivo. Central business config `lib/config.ts` (name, phone placeholder, address
placeholder, hours placeholder, service area, URLs) — pages consume config, never inline
business facts. `lib/seo.ts` metadata + JSON-LD (LocalBusiness + Service schema) helpers.
sitemap.ts, robots.ts, canonical/OG per route. Analytics layer env-gated (GTM/GA4/Meta
stubs, silent when unset). Accessibility baseline: semantic landmarks, focus states, labels,
contrast AA on text, reduced-motion.

## PLACEHOLDER / ASSET POLICY

Real REM photography does not exist in this build yet. Use CSS-crafted tactile compositions
(paper stacks, ink fields, registration graphics, gradients, texture) — NOT fake stock
humans, NOT AI-looking imagery. Every spot designed to accept a real photo later gets a
clearly structured `<MediaMask>` slot. Phone number and street address use obvious
placeholders from `lib/config.ts` (e.g. "(518) 000-0000") flagged in VERIFY doc.
