# VERIFY BEFORE LAUNCH — OWNER CONFIRMATION REQUIRED

Honesty gate. Nothing below goes to a real domain / production launch until REM confirms it.
The staging build presents these as the brief approved them, but launch is blocked on this list.

## FACTUAL CLAIMS ON THE SITE (staging)

- [x] Public contact basics added from REM's official site: 518-438-7338,
      orders@remdigitalprint.com, 10 Railroad Ave, Albany NY 12205
- [x] Remmert family printing roots since 1993, from Capital Region Chamber profile
- [x] 99% of jobs completed in-house, from REM services page
- [x] Most digital jobs completed in 3–5 business days, from REM services page
- [x] Next-day printing availability, from REM services page
- [ ] Exact rush policy language beyond next-day printing availability
- [ ] Union shop positioning (NOT used on site — confirm whether to add)
- [x] Mugs & sublimation: no minimums, no setup fees, no fading, no flaking,
      from REM services page
- [ ] Responds to quote requests "usually within one business day" (thank-you page,
      thank-you metadata, /upload confirmation)
- [ ] Origin story: started as a neighborhood/traditional print shop, grew into digital
      production (about page, about metadata, homepage HumanTrust act)
- [ ] Exact service-area language ("Albany / Capital Region / 518")
- [ ] Exact equipment inventory (not itemized on site — confirm if/what to list;
      homepage capability wall lists "Large Format" — confirm REM has it or swap the label)

## FUNCTIONAL GAPS THAT BLOCK LAUNCH

- [ ] File "upload" surfaces (/upload and quote wizard step 3) do NOT transmit files in V1 —
      only a list of file names/sizes reaches REM. On-site copy now says so explicitly and a
      real person must follow up to collect files. Before launch: either wire real file
      storage/transfer, or confirm the follow-up-to-collect-files workflow with REM.

## PLACEHOLDERS THAT MUST BE REPLACED (all in `lib/config.ts`)

- [x] Real phone number
- [x] Real street address
- [ ] Real hours
- [x] Real public email
- [ ] Real quote-inbox destination (`QUOTE_WEBHOOK_URL` env)
- [ ] Official REM logo files (site currently uses typographic REM wordmark)
- [ ] Brand accent confirmation: #C8102E sampled from approved Canva frames — confirm
      against REM's actual logo/identity
- [ ] Real photography: team, facility, equipment in use, finished products, hands/materials
- [ ] Real testimonials (site ships with clearly-structured slots, no invented quotes)
- [ ] Real featured-work projects (categories present; specific projects need approval)

## ACCOUNTS / IDS (env-gated, inactive until set)

- [ ] Custom domain + NEXT_PUBLIC_SITE_URL
- [ ] GTM / GA4 / Google Ads / Meta Pixel IDs + consent approach
- [ ] Google Business Profile links, review links, Search Console, Bing
