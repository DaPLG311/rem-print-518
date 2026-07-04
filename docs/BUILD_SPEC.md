# REM DIGITAL PRINT & MAIL CENTER — BUILD SPEC (COPY DECK + FUNNEL MATRIX + VISUAL NOTES)

Authored by MEGAMIND. Reads with `docs/BRIEF.md` (locked source of truth) and the approved
Canva frames at
`/private/tmp/claude-501/-Users-daplg/f003fd2b-67c4-4c9a-9a99-755605f691c2/scratchpad/rem/png/`.
Business facts render ONLY from `lib/config.ts`. Verify-flagged claims are already listed in
`docs/VERIFY-BEFORE-LAUNCH.md`; add nothing new to them.

**Voice**: calm, confident, production-literate. Short declarative sentences. Customer
outcomes, never machine jargon for its own sake. Politically neutral everywhere. No
guaranteed-turnaround language anywhere near rush copy.

**Global copy rule from the frames**: the featured-work frame shows placeholder project
names ("District 14 Mailer Campaign", "Albany Academy Spirit Wear", "Capital Region
Financial Group", "Capital District Chamber Gala"). Those are ART-DIRECTION PLACEHOLDERS
ONLY. Do NOT ship named clients or named projects — they would be invented facts. Ship
category-labeled production compositions instead (labels below).

---

## 1. COPY DECK

### 1.1 GLOBAL CHROME

**Header nav**: Services · Apparel · Direct Mail · Promotional Products · Political
Printing · About · [REQUEST A QUOTE]
**Header utility**: UPLOAD ARTWORK · CALL REM · RUSH JOB
**Mobile bottom bar**: CALL · QUOTE · UPLOAD
**Footer strapline**: BRING REM THE JOB. THEY KNOW HOW TO GET IT DONE.
**Footer service-area line**: Serving Albany, the Capital Region, and the 518. *(render from
`business.serviceArea`)*
**Footer small print**: © {year} {business.name}. All rights reserved.
**RushPrompt band (shared, appears at decision points)**:
Kicker: `DEADLINE`
Line: **WORKING AGAINST A DEADLINE?**
Support: Call about a rush job. A real person will tell you what's possible.
CTAs: CALL REM (tel from config) · RUSH DETAILS → `/rush`

### 1.2 HOMEPAGE — TEN ACTS

**ACT I — HERO COLD OPEN** (`hero-composition.png`)
- Kicker (small, top of composition): `REM DIGITAL PRINT & MAIL CENTER — ALBANY, NY` *(name from config)*
- Headline (fragmented, staggered, one word per line): **PRINT. APPAREL. MAIL. PROMO.**
- Resolve statement (locks in after headline): **HANDLED IN-HOUSE. DONE FAST.**
- Support: "Albany businesses, campaigns, schools, organizations, and communities trust REM
  for fast-turnaround production backed by decades of local experience."
- CTAs: **START YOUR PROJECT** (primary → `/quote`) · **EXPLORE SERVICES** (ghost/dark →
  scroll to Act IV or `/#services`)
- Urgent utility line (below CTAs): WORKING AGAINST A DEADLINE? **CALL REM** (tel link)

**ACT II — CUSTOMER RECOGNITION** (`customer-need-navigation.png`)
- Heading: **WHAT ARE YOU TRYING TO GET DONE?**
- Six entry paths (card label / statement / destination):
  1. `PRINTING` — **I NEED SOMETHING PRINTED.** → `/printing-bindery`
  2. `APPAREL` — **I NEED SHIRTS OR APPAREL.** → `/apparel`
  3. `DIRECT MAIL` — **I NEED TO REACH PEOPLE BY MAIL.** → `/direct-mail`
  4. `PROMOTIONAL` — **I NEED BRANDED PROMOTIONAL ITEMS.** → `/promotional-products`
  5. `POLITICAL` — **I NEED POLITICAL MATERIALS FAST.** → `/political-printing`
  6. `NOT SURE` — **I'M NOT SURE WHAT I NEED.** → `/quote?service=not-sure`
- Card hover/active CTA: EXPLORE →

**ACT III — PROOF STRIP** (`trust-and-proof-strip.png`)
- Kicker: `PROOF OF PRODUCTION`
- Four metrics (render from `proof` in config, huge serif numerals):
  **1985** ESTABLISHED · **99%** IN-HOUSE PRODUCTION · **3–5** DAY DIGITAL TURNAROUND ·
  **24HR** RUSH OPTIONS AVAILABLE
- Ticket footer line (small, production-ticket style): `JOB NO. 001 / ALBANY, NY / RUN
  CONTINUOUS SINCE 1985` *(decorative ticket copy; year from config proof)*

**ACT IV — SERVICE SPECTACLE (the ONE pinned sequence)** (`scroll-pinned-services.png`)
- Kicker: `SERVICE REGISTER`
- Six panels, numbered, each: number + serif title + one-line promise + panel CTA
  (EXPLORE 0X →) linking to the lane page:
  - **01 PRINTING & BINDERY** — From file to finished piece — cut, folded, bound, and out the door.
  - **02 APPAREL** — Shirts, tanks, hoodies, and bags, screen printed for teams, events, and brands.
  - **03 MUGS & SUBLIMATION** — Full-color mugs and sublimated goods, one at a time or by the case.
  - **04 DIRECT MAIL** — From printed piece to mailbox — one partner, start to finish.
  - **05 PROMOTIONAL PRODUCTS** — Tell REM what you're promoting. REM narrows the field.
  - **06 POLITICAL PRINTING** — Campaign materials produced at campaign speed. Every side, every race.
- Progress dots + panel counter (`02 / 06`) as in frame.

**ACT V — IN-HOUSE ADVANTAGE** (`in-house-advantage.png`)
- Kicker: `ONE ROOF`
- Heading: **MORE OF THE JOB STAYS UNDER ONE ROOF.**
- Support: "When printing, finishing, and mailing live in one building, your job doesn't
  wait in someone else's queue. Fewer handoffs. Fewer surprises. Faster answers."
- Sequence (numbered stations, each with MediaMask slot):
  - **01 PRINT** — Your piece comes off the press here.
  - **02 FINISH** — Cut, folded, scored, bound — finished in the same building.
  - **03 PREP** — Addressed, sorted, boxed, and staged.
  - **04 MAIL OR OUTPUT** — Into the mail stream, or ready for pickup and delivery.

**ACT VI — FEATURED WORK / PRODUCTION WALL** (`featured-work-gallery.png`, `capability-wall.png`)
- Kicker: `FEATURED WORK`
- Heading: **WHAT COMES OFF THE FLOOR.**
- Support: "A moving wall of the kinds of jobs REM runs — printed, pressed, and mailed in
  Albany."
- Six category tiles (category label + generic non-claim caption; NO named clients):
  - `CAMPAIGN LAUNCH` — Postcards / Yard Signs / EDDM Mailing / Posters
  - `BUSINESS PRINTING` — Cards / Letterhead / Envelopes
  - `SCHOOL APPAREL` — Spirit Wear / Team Shirts
  - `DIRECT MAIL` — Variable Data / Tabbed / Sorted
  - `EVENT MATERIALS` — Programs / Signage / Banners
  - `BRANDED MERCHANDISE` — Mugs / Promo Items
- Capability wall banner (from `capability-wall.png`): **REM IS EQUIPPED.** with eight
  numbered capability cards: 01 DIGITAL PRINTING · 02 BINDERY · 03 LARGE FORMAT ·
  04 SCREEN PRINTING · 05 SUBLIMATION · 06 DIRECT MAIL · 07 PROMOTIONAL PRODUCTS ·
  08 POLITICAL PRODUCTION. *(Large format appears only as an equipment/capability label
  within approved lanes — do not spawn a new service page.)*

**ACT VII — POLITICAL TAKEOVER** (`political-takeover.png`)
- Kicker: `SERVICE 06 — POLITICAL`
- Heading: **CAMPAIGNS MOVE ON DEADLINES. SO DOES REM.**
- Support: "Postcards, literature, yard signs, banners, buttons, mailings — produced and
  moved at campaign speed. Every party, every race, printed with the same urgency."
- CTAs: **START A POLITICAL PROJECT** (→ `/quote?service=political`) ·
  CALL ABOUT A DEADLINE → (tel link, fires `rush_call_clicked`)

**ACT VIII — HUMAN TRUST** (`history-human-trust.png`)
- Kicker: `ABOUT REM`
- Heading: **FOUNDED HERE. BUILT OVER DECADES.**
- Support: "Founded by the Remmert family in 1985, REM has grown from a neighborhood print
  shop into a full-service production partner for businesses, campaigns, schools, and
  organizations across the Capital Region."
- Second statement: **ALL THIS CAPABILITY STILL HAS PEOPLE BEHIND IT.**
- CTA: **MEET REM** → `/about`
- Sub-line: Real people answer the phone. Real hands run the machines.

**ACT IX — PROJECT PROCESS** (`project-process.png`)
- Kicker: `PROJECT PROCESS`
- Heading: **FROM REQUEST TO RESULT.**
- Four steps (numbered cards, title + sublabel):
  - **01 TELL US WHAT YOU NEED** — Quote request or call
  - **02 SEND YOUR FILES** — Upload artwork or references
  - **03 REM HANDLES PRODUCTION** — Printed, finished, prepared
  - **04 THE JOB GETS THERE** — Mail, pickup, or delivery
- Closing line: ONE PARTNER. ONE PROCESS. ONE RELATIONSHIP.

**ACT X — CONVERSION**
- Heading: **WHAT ARE WE MAKING?**
- Support: "Tell REM about the job. You'll hear back from a real person with real answers."
- CTAs: **START YOUR PROJECT** (primary → `/quote`) · Prefer to talk it through? **CALL REM**
  (tel, fires `call_clicked`)
- RushPrompt band directly below.

### 1.3 SERVICE ROUTES (all use `ServicePageLayout`)

**/printing-bindery** (`printing-bindery.png`) — number `01`, kicker `SERVICE 01`
- Title: **PRINTING THAT MOVES WITH YOUR DEADLINE.**
- Intro: "Business cards, flyers, brochures, envelopes, posters, booklets. From file to
  finished piece — cut, folded, bound, and out the door."
- Capabilities → outcomes:
  - Digital printing — Short runs and fast reprints without plate setup delays.
  - Cutting & folding — Pieces arrive finished, not as flat sheets you have to deal with.
  - Scoring — Clean folds on heavy stock, no cracked ink lines.
  - Laminating & dry mounting — Pieces that survive handling, weather, and time.
  - Numbering & die cutting — Tickets, forms, and custom shapes done in-house.
  - Drilling — Ready for binders and posts the day you pick it up.
  - Saddle stitching & wire binding — Booklets and manuals bound and boxed, ready to hand out.
- Outcomes list: Finished, not just printed · One vendor from file to done · Rush options
  when the date is real
- CTAs: **START A PRINT PROJECT** (→ `/quote?service=printing`) · UPLOAD ARTWORK → `/upload`
- quoteService: `printing`

**/apparel** (`apparel-service.png`) — number `02`, kicker `SERVICE 02`
- Title: **YOUR BRAND. YOUR TEAM. YOUR RUN.**
- Intro: "T-shirts, tanks, hoodies, bags — screen printed for teams, events, brands, and
  campaigns. Fast turnaround."
- Capabilities → outcomes:
  - Screen printing — Color that holds up wash after wash.
  - T-shirts, tanks & hoodies — One order covers the whole roster, every size.
  - Bags & soft goods — The same print quality on totes and carry pieces.
  - Order guidance — REM helps you answer: what item, how many, where's the artwork, when
    is it needed.
- Sample project ticket (decorative spec-sheet moment, per frame): ITEM: T-Shirts · QTY: 250
  · ARTWORK: Ready to upload · NEEDED BY: {sample date} *(clearly a specimen ticket, not a claim)*
- CTAs: **START AN APPAREL PROJECT** (→ `/quote?service=apparel`) · UPLOAD ARTWORK → `/upload`
- quoteService: `apparel`

**/mugs-sublimation** — number `03`, kicker `SERVICE 03`
- Title: **ONE MUG OR A HUNDRED. SAME ANSWER: YES.**
- Intro: "Full-color sublimated mugs and goods. No minimums. No setup fees. No fading. No
  flaking." *(claims verify-flagged in VERIFY-BEFORE-LAUNCH.md — keep wording exactly, do
  not extend it)*
- Capabilities → outcomes:
  - No minimums — Order exactly what you need, even a single piece.
  - No setup fees — Small runs make sense here.
  - Full-color sublimation — Photographic color baked into the surface.
  - No fading, no flaking — The image is in the coating, not on top of it. *(verify-flagged)*
- Tone note: tactile, product-focused, the warmest lane of the six.
- CTA: **START A MUG PROJECT** (→ `/quote?service=mugs-sublimation`)
- quoteService: `mugs-sublimation`

**/direct-mail** (`direct-mail.png`) — number `04`, kicker `SERVICE 04`
- Title: **FROM PRINTED PIECE TO MAILBOX.**
- Intro: "REM prints it, preps it, and gets it into the mail stream. Variable data, folding,
  tabbing, sorting — one partner, start to finish."
- Capabilities → outcomes:
  - EDDM — Reach every door in the neighborhoods you choose.
  - Variable data — Every piece addressed to a real name, not "Resident."
  - Folding & sealing — Mail-ready pieces, done to postal spec.
  - Tabbing & sorting — Prepared the way the mail stream requires.
  - Campaign mailing — Timed drops that land when they're supposed to.
- CTA: **START A MAIL PROJECT** (→ `/quote?service=direct-mail`)
- quoteService: `direct-mail`

**/promotional-products** — number `05`, kicker `SERVICE 05`
- Title: **STOP SCROLLING CATALOGS. START WITH THE GOAL.**
- Intro: "There are a hundred thousand promo items. You don't need a catalog — you need an
  answer. Tell REM what you're promoting, who it's for, how many, the budget range, and the
  date. REM narrows the field."
- Discovery framing (NOT a catalog; guided list):
  - WHAT are you promoting?
  - WHO is it for?
  - HOW MANY do you need?
  - WHAT'S the budget range?
  - WHEN does it need to be in hand?
- CTA: **START A PROMO PROJECT** (→ `/quote?service=promotional-products`)
- quoteService: `promotional-products`

**/political-printing** — number `06`, kicker `SERVICE 06`
- Title: **CAMPAIGNS MOVE ON DEADLINES. SO DOES REM.**
- Intro: "Postcards, brochures, literature, mailings, posters, banners, yard signs, buttons,
  bumper stickers, magnets, and campaign items — with design support and mailing support
  under the same roof. Every party. Every race. Printed neutral, printed fast."
- Capabilities → outcomes:
  - Campaign literature & postcards — Walk pieces and mailers produced together, matched.
  - Yard signs, posters & banners — Visibility that goes up when the race heats up.
  - Buttons, stickers & magnets — Handout items ready for the next event.
  - Mailing support — Printed and into the mail stream without a second vendor.
  - Design support — Files fixed and finished when the clock is running.
- Deadline module: URGENT? CALL ABOUT A DEADLINE → (tel, fires `rush_call_clicked`)
- CTA: **START A POLITICAL PROJECT** (→ `/quote?service=political`)
- quoteService: `political`

### 1.4 /about (`history-human-trust.png` direction)
- Kicker: `ABOUT REM`
- Headline: **FOUNDED HERE. BUILT OVER DECADES.**
- Body 1: "Founded by the Remmert family in 1985, REM has grown from a neighborhood print
  shop into a full-service production partner for businesses, campaigns, schools, and
  organizations across the Capital Region."
- Section: **ALL THIS CAPABILITY STILL HAS PEOPLE BEHIND IT.** — "Machines don't answer
  questions. People do. When you call REM, you talk to someone who can walk out onto the
  floor and check your job."
- Pillars band (heritage/speed/capability/in-house/human, one line each):
  - ESTABLISHED 1985 — decades of Capital Region production.
  - SPEED — deadlines are a reason to call, not a problem.
  - CAPABILITY — print, apparel, mail, promo, political — one roof.
  - IN-HOUSE CONTROL — 99% of production stays in the building.
  - HUMAN SERVICE — real people behind the machines.
- Closing CTA: **START YOUR PROJECT** → `/quote` + RushPrompt.

### 1.5 /quote — WIZARD COPY (frames: `quote-experience-opening.png`, `quote-details.png`, `artwork-upload.png`, `quote-confirmation.png`, `mobile-quote-funnel.png`)

Progress label top-right: `STEP {n} OF 4`. Kicker above headline: `START YOUR PROJECT`.

**Step 1 — SERVICE**
- Headline: **WHAT ARE WE MAKING?**
- Options (cards): PRINTING · APPAREL · MUGS & SUBLIMATION · DIRECT MAIL · PROMOTIONAL
  PRODUCTS · POLITICAL · NOT SURE
- CTA: CONTINUE →
- Error (none selected): "Pick the closest fit — you can change it later."

**Step 2 — DETAILS** (dynamic; see field matrix, §2)
- Headline: **TELL US ABOUT THE JOB.**
- Sub: "Only what matters for this kind of project. Skip anything you're not sure about."
- Rush hint under needed-by field: "Tight date? You can also just call — REM will tell you
  what's possible." (link fires `rush_call_clicked`)
- CTA: CONTINUE →

**Step 3 — ARTWORK**
- Headline: **WHERE ARE YOU WITH THE ARTWORK?**
- Options: **I HAVE FINAL ARTWORK** · **I HAVE SOMETHING STARTED** · **I NEED HELP FIGURING
  IT OUT**
- Upload zone label: DROP FILES OR TAP TO UPLOAD — "Artwork, references, sketches, photos —
  anything that shows what you're after."
- Notes field label: ANYTHING ELSE REM SHOULD KNOW?
- CTA: CONTINUE →

**Step 4 — CONTACT**
- Headline: **WHO'S THIS FOR?**
- Fields: NAME* · COMPANY / ORGANIZATION · PHONE* · EMAIL* · PREFERRED CONTACT METHOD
  (Phone / Email / Either)
- Reassurance line: "No spam, no pressure. A real person reviews every request."
- CTA: **SEND IT TO REM →** (fires `quote_submitted`)

### 1.6 /quote/thank-you (`quote-confirmation.png`)
- Ticket kicker: `RECEIVED` (stamped/production-ticket treatment)
- Headline: **THE JOB IS IN REM'S HANDS.**
- What happens next: "A real person reviews your request and gets back to you with questions
  or a quote — usually within one business day." *(soft, non-guaranteed phrasing)*
- Project summary card: service, key details, artwork status (echoed from submission).
- Urgent line: "Can't wait? **CALL REM** — mention you just sent a quote request." (tel)
- Secondary CTA: START ANOTHER PROJECT → `/quote`

### 1.7 /rush
- Kicker: `RUSH`
- Headline: **WORKING AGAINST A DEADLINE? CALL ABOUT A RUSH JOB.**
- Body: "Rush work is a conversation, not a checkout. Call and REM will tell you — honestly —
  what can happen by your date." *(NO guaranteed turnaround language)*
- Primary CTA: giant tap-to-call **CALL REM (518) 000-0000** (from config; fires
  `rush_call_clicked`)
- Short form (fallback): NAME* · PHONE* · WHAT DO YOU NEED? · **NEEDED BY*** (date, required)
- Form CTA: SEND THE RUSH REQUEST →
- Sub: "Calling is faster. The form works after hours."

### 1.8 /upload
- Kicker: `ARTWORK`
- Headline: **SEND REM YOUR FILES.**
- Body: "Final artwork, a work in progress, or just references — upload it here and tell REM
  what job it belongs to."
- Fields: NAME* · EMAIL* · PHONE · WHAT JOB IS THIS FOR? · Upload zone (multiple files;
  fires `artwork_uploaded`)
- CTA: SEND FILES →
- Cross-link: "Starting from scratch? **REQUEST A QUOTE** instead." → `/quote`

---

## 2. QUOTE FUNNEL FIELD MATRIX

Universal mechanics
- URL param `?service=<slug>` preselects Step 1 (slugs: `printing`, `apparel`,
  `mugs-sublimation`, `direct-mail`, `promotional-products`, `political`, `not-sure`).
- Step gating: Step 1 requires a service; Step 2 per matrix; Step 3 requires an artwork
  status choice (uploads/notes optional); Step 4 requires name, phone, email.
- State survives back-navigation; switching service at Step 1 remaps Step 2 fields but keeps
  any values whose field still shows.

Field legend: ● required · ○ shown, optional · — hidden

| Field | PRINTING | APPAREL | MUGS & SUBLIMATION | DIRECT MAIL | PROMO PRODUCTS | POLITICAL | NOT SURE |
|---|---|---|---|---|---|---|---|
| Product type | ● | ● | ● | ● | ○ | ● | — |
| Quantity | ● | ● | ● | ● | ● | ● | — |
| Size | ○ | ○ (size mix) | — | ○ | — | ○ | — |
| Color requirements | ○ | ○ | ○ | ○ | ○ | ○ | — |
| Needed-by date | ○ | ○ | ○ | ○ | ○ | **●** | ○ |
| Mailing required | ○ | — | — | **● (default Yes)** | — | ○ | — |
| Finishing required | ○ | — | — | ○ | — | ○ | — |

Product-type option lists (selects, from approved offer set only)
- PRINTING: Business cards / Flyers / Brochures / Posters / Envelopes / Booklets / Other
- APPAREL: T-shirts / Tanks / Hoodies / Bags / Other
- MUGS & SUBLIMATION: Mugs / Other sublimated item
- DIRECT MAIL: Postcard / Letter / Self-mailer / EDDM piece / Other
- PROMO: free text — "What kind of item are you imagining?" (optional; discovery model)
- POLITICAL: Postcards / Literature / Mailing / Posters / Banners / Yard signs / Buttons /
  Bumper stickers / Magnets / Other campaign item
- NOT SURE: Step 2 shows only optional needed-by + statement "Not sure is a fine answer —
  describe it at the next step and REM will figure out the rest."

Validation rules
- Quantity: integer ≥ 1; inline error "Enter a quantity — a rough number is fine."
- Needed-by: valid date, today or later; error "Pick today or a future date." When needed-by
  is within 5 calendar days, show non-blocking rush notice: "That's a tight window — calling
  is the fastest way to confirm it." (link fires `rush_call_clicked`). On `/rush` form,
  needed-by is always REQUIRED.
- Product type: must be a listed option where the field is required.
- Mailing required / Finishing required: Yes/No toggles (frame `quote-details.png` shows the
  "MAILING NEEDED? Yes / No" input treatment). Direct Mail: mailing preset Yes, still
  editable, required.
- Contact step: name non-empty; email RFC-ish pattern; phone 10+ digits after stripping
  formatting; preferred contact defaults to "Either."
- Uploads: accept common artwork types (pdf, ai, eps, png, jpg, tif, svg, zip); per-file cap
  25MB; on rejection: "That file's too big — send what you have and note the rest."
- Errors render inline under the field, red `--rem-red` accent, `aria-describedby` wired,
  focus moves to first invalid field on submit attempt.

Analytics events (via `lib/track.ts`; silent no-ops when env IDs unset)
- `quote_started` — fired once when Step 1 is completed (service chosen + CONTINUE).
  Payload: `{ service }`.
- `quote_step_completed` — fired on each step's CONTINUE. Payload: `{ service, step: 1|2|3|4 }`.
- `quote_submitted` — fired on successful POST to `/api/quote`. Payload:
  `{ service, has_artwork: boolean, rush_window: boolean }`.
- `artwork_uploaded` — fired per successful file attach (quote Step 3 and `/upload`).
  Payload: `{ context: 'quote'|'upload', file_count }`.
- `rush_call_clicked` — fired on any rush-context tel link (`/rush`, rush hints, Act VII
  deadline CTA, RushPrompt). Payload: `{ location }`.
- `call_clicked` — fired on any non-rush tel link (header, footer, mobile bar, Act X).
  Payload: `{ location }`.

---

## 3. VISUAL NOTES PER SECTION (what each approved frame locks)

- **hero-composition.png** — Full-bleed crimson field (`--rem-red`), zero photography.
  Left-anchored stack of four oversized Playfair lines (PRINT. / APPAREL. / MAIL. / PROMO.)
  in soft-white, each word its own line, periods included. Support paragraph overlaps the
  last word's baseline (layered depth planes). Two CTAs sit low-left: light primary + dark
  ghost button. Utility deadline line beneath in muted red-tinted white. Nav floats
  top-right, transparent over crimson. Registration-mark detail bottom-right corner.
- **customer-need-navigation.png** — Light act on `--paper`. Centered serif heading. 3×2
  card grid: soft-white cards with hairline `--border-muted` borders, rounded corners,
  small uppercase Archivo category label top-left, big serif statement mid-card, arrow
  bottom-right. Active/hover card inverts to `--warm-black` with crimson border ring and a
  crimson EXPLORE → button. Two cards carry imagery (political signs, flat-lay stationery)
  — MediaMask slots.
- **trust-and-proof-strip.png** — Full-width `--warm-black` band. Small centered kicker with
  short crimson rule under it. Four enormous Playfair numerals in a row (1985 / 99% / 3–5 /
  24HR) with thin vertical hairline separators above and small uppercase steel labels below.
  Production-ticket micro-copy line bottom-left; registration corners. No cards, no boxes —
  numerals breathe on the dark field.
- **scroll-pinned-services.png** — The pinned Act IV. Crimson stage; large dark rounded
  panel center holds the active service (crimson serif number "02" top-left inside panel).
  Vertical serif service title runs along the right edge of the stage (MUGS & SUBLIMATION
  shown cropped, typography-as-image). Previous panel peels left (pink/red ghost card
  exiting). Progress dots bottom-center. One service dominates at a time; mechanical
  replace, registration lock feel.
- **in-house-advantage.png** — Near-black `--warm-black` act, sparse. Photography sits as a
  contained block right-of-center (roller/laminator machine feeding paper, warm tungsten
  light) with step number "04" beneath. Steps occupy the left field as large type (frame
  shows the composition mid-sequence). MediaMask ratio ~16:11. Registration corner marks
  top-left.
- **featured-work-gallery.png** — Dark act. Centered kicker + crimson rule. Masonry/editorial
  grid of production photography tiles at mixed sizes: business-card fan, folded tees, mugs,
  wide-format press, mail trays, yard signs. Each tile: small uppercase category label
  (crimson when featured) + serif title line. Featured tile gets crimson rounded border ring
  + slash-separated spec list + crimson VIEW PROJECT → button. Ship with category labels and
  generic captions only (see §1.2 Act VI) — frame's project names are placeholders.
- **capability-wall.png** — Full-width photographic header band (production floor, presses
  in rows) with giant serif overlay "REM IS EQUIPPED." Below, on black: 4×2 grid of dark
  rounded cards, each with big crimson serif number (01–08) and uppercase capability label
  bottom-left. Reads as equipment manifest, not feature cards.
- **political-takeover.png** — Full-bleed crimson takeover, mirrors hero. Big neutral
  campaign-material wall composition upper field (frame shows it abstracted). Lower-center:
  white START A POLITICAL PROJECT text-CTA beside small stacked material thumbnails; muted
  CALL ABOUT A DEADLINE → beneath. Aggressive but neutral — no party colors beyond REM
  crimson.
- **history-human-trust.png** — Light act on `--paper`/soft-white. Huge black serif
  three-line statement left (FOUNDED HERE. / BUILT OVER / DECADES.) with support paragraph
  overlapping its last line. Second serif statement (ALL THIS CAPABILITY STILL HAS PEOPLE
  BEHIND IT.) + solid warm-black MEET REM button. Right column: two stacked warm
  photographs — hands checking press sheets on the floor; hands holding a business card.
  Industrial→human transition, generous whitespace.
- **project-process.png** — Dark act. Centered kicker + crimson rule, then two-line centered
  serif headline FROM REQUEST TO RESULT. Four equal rounded outline cards in a row, crimson
  arrows between them. Each card: small photo chip top-left, crimson serif number, serif
  step title, steel sublabel at card bottom. Closing one-liner centered beneath.
- **quote-experience-opening.png** — Wizard Step 1. Near-black stage, kicker + STEP 1 OF 4
  in crimson top-right. Giant centered serif WHAT ARE WE MAKING? Two rows of dark rounded
  option cards (4 + 3); selected card = crimson border ring + subtle red-tinted fill +
  white label; unselected labels steel. Full-width-ish crimson CONTINUE → button centered
  below.
- **quote-details.png** — Wizard Step 2. Same dark stage. Fields are dark rounded input
  blocks with tiny uppercase steel label INSIDE the field frame (e.g. "MAILING NEEDED?" over
  value "Yes / No"). Left-aligned column, generous vertical rhythm, crimson CONTINUE →
  button under the stack. One-thing-at-a-time feel.
- **artwork-upload.png** — Step 3 renders as a crimson interlude (the funnel's color-shift
  beat): full crimson field, centered white CONTINUE → at the bottom. Artwork status cards +
  upload zone live on this crimson stage — the moment of handing REM your work feels
  branded, not clerical.
- **quote-confirmation.png** — `/quote/thank-you`. Calm `--graphite` field, nearly empty —
  deliberate exhale after the funnel. Centered content zone with ghost-outlined START
  ANOTHER PROJECT button lower-center. Registration corners top-left/bottom-right.
  Confirmation reads as a stamped production ticket on this quiet stage.
- **mobile-homepage.png** — Phone frame on dark. Top: flat-lay stationery photo block.
  Center: the four-line serif stack (PRINT. APPAREL. MAIL. PROMO.) with HANDLED IN-HOUSE.
  DONE FAST. overlapping. Full-width crimson START YOUR PROJECT button, then stacked
  outline need-cards (I NEED SOMETHING PRINTED / I NEED SHIRTS OR APPAREL …) — Act II
  becomes a vertical list on mobile. Fixed bottom bar CALL · QUOTE · UPLOAD in warm-black.
  Confirms: mobile is its own composition, not shrunken desktop.
- **printing-bindery.png** — Service-page template, dark. Left: four-line oversized serif
  headline (PRINTING / THAT MOVES / WITH YOUR / DEADLINE.), steel support copy, capability
  list beneath, crimson START A PRINT PROJECT button + ghost UPLOAD ARTWORK → link. Right:
  tall contained photograph — layered stack of cards/envelopes/stationery on dark felt,
  dramatic side light. Page number detail bottom-right. This is the `ServicePageLayout`
  hero pattern.
- **apparel-service.png** — Same template. Headline YOUR BRAND. / YOUR TEAM. / YOUR RUN.
  Left column adds the spec-ticket card (ITEM / QTY / ARTWORK / NEEDED BY rows, dark rounded
  panel) between copy and crimson CTA. Right: warm photo of folded printed tees + tote,
  tungsten mood. Ticket = decorative sample, real fields live in `/quote`.
- **direct-mail.png** — Same template. Headline FROM / PRINTED / PIECE / TO MAILBOX. (last
  line overlaps support copy). Capability list beneath, crimson START A MAIL PROJECT. Right:
  photo of mail trays stacked with sorted postcards in a machine — the mail-stream moment.

Light/dark rhythm across the homepage: I crimson → II paper → III warm-black → IV crimson
stage → V warm-black → VI warm-black (photographic) → VII crimson → VIII paper → IX
warm-black → X crimson-accented close. Never two identical stage colors adjacent except the
V–VI dark run, which the photography wall breaks.

---

## 4. SHARED COMPONENT CONTRACT (verbatim reference)

Shared component contract (Boris builds these exact files; consumers Read the source before importing):
- components/shared/Header.tsx — global nav per brief (Services, Apparel, Direct Mail, Promotional Products, Political Printing, About + REQUEST A QUOTE cta; utility: UPLOAD ARTWORK, CALL REM, RUSH JOB). Client component, solid/transparent state on scroll, accessible mobile menu.
- components/shared/Footer.tsx — full footer: nav, service lanes, contact from config, service-area line, small print.
- components/shared/MobileUtilityBar.tsx — fixed bottom bar (mobile only): CALL (tel: from config) · QUOTE (/quote) · UPLOAD (/upload).
- components/shared/MagneticCTA.tsx — props { href: string; children: React.ReactNode; variant?: 'primary'|'ghost'|'dark' } magnetic hover (desktop only), press feedback.
- components/shared/Reveal.tsx — props { children: React.ReactNode; delay?: number; y?: number; className?: string } scroll-reveal wrapper.
- components/shared/SectionHeading.tsx — props { kicker?: string; title: string; dark?: boolean; className?: string } oversized serif.
- components/shared/MediaMask.tsx — props { src?: string; alt?: string; label?: string; ratio?: string; className?: string }. No src => tactile CSS placeholder composition (paper/ink/registration graphics) with small label; masked reveal on scroll.
- components/shared/ProofMetric.tsx — props { value: string; label: string } huge serif numeral treatment.
- components/shared/RushPrompt.tsx — props { dark?: boolean } deadline band: WORKING AGAINST A DEADLINE? CALL ABOUT A RUSH JOB (tel + /rush link).
- components/shared/ServicePageLayout.tsx — reusable service-page architecture. Props { number: string; title: string; kicker?: string; intro: string; capabilities: { title: string; desc: string }[]; outcomes?: string[]; quoteService: string; children?: React.ReactNode }. Renders: cinematic service hero (giant number + serif title, crimson/dark treatment), intro, capabilities translated to customer outcomes, MediaMask slots, RushPrompt, closing conversion section linking to /quote?service=<quoteService>.
- components/shared/SmoothScroll.tsx — Lenis provider, disabled under reduced motion.
- lib/gsap.ts — 'use client' helper exporting registered gsap + ScrollTrigger.
- lib/config.ts — export const business = { name:'REM Digital Print & Mail Center', shortName:'REM', tagline, phone:'+15180000000', phoneDisplay:'(518) 000-0000', addressLine:'Albany, NY (address pending)', city:'Albany', region:'NY', serviceArea:'Albany · Capital Region · 518', email:'quotes@example.com', siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rem-print-mail.vercel.app' }; export const proof = [{value:'1985',label:'Established'},{value:'99%',label:'In-House Production'},{value:'3–5',label:'Day Digital Turnaround'},{value:'24HR',label:'Rush Options Available'}]; export const services = [six lanes: slug,number,title,short] (slugs: printing-bindery, apparel, mugs-sublimation, direct-mail, promotional-products, political-printing).
- lib/seo.ts — pageMetadata({title,description,path}): Metadata with canonical + OG; localBusinessJsonLd(); serviceJsonLd({name,description,path}); JsonLd React component rendering a script tag.
- lib/track.ts — track(event, data?) safe no-op unless env IDs present; components/shared/Analytics.tsx env-gated (GTM/GA4/Meta) rendering nothing when unset.
