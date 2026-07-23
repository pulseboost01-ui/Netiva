# NETIVA — SITE DISCIPLINE & CONVERSION CONSTITUTION
# Place this file as CLAUDE.md in the repo root. All work on netiva.tech obeys these rules.
# When any instruction in a task conflicts with this file, flag the conflict before coding.

## 0. MISSION
This site exists to convert premium founders and teams into booked calls.
Every change must either (a) increase clarity, (b) increase trust, or (c) reduce friction to contact.
If a proposed change does none of these, do not make it — say so.
The bar is not "as good as other Kampala/African agency sites" — it is a tier above them:
faster, more restrained, more evidenced, more specific. Generic agency-template language
("digital alchemy," "nervous systems," "signal") is a signal of sameness, not premium quality —
avoid it in favor of concrete, checkable claims (named clients, named tech, named outcomes).
Two explicit reference benchmarks, to be beaten, not matched: skillex.webflow.io (execution
discipline, spacing, typographic restraint) and jsui.digital (the direct competitor — beat it
on evidence and specificity, not on mood copy; see §1B). "Beat" means: faster Lighthouse scores,
tighter type/color/spacing discipline than Skillex, and more concrete, checkable proof (real
metrics, named payment rails, real testimonials) than JS.UI. Every homepage decision should be
checkable against both: does this read as more disciplined than Skillex, more substantive than
JS.UI?

## 1. NON-NEGOTIABLE BRAND FACTS
- Contact email: netivatech@gmail.com — use this consistently sitewide. If any other email domain is found in copy, unify it to this one and report it.
- Voice: "we" everywhere. Never "I", "my blog", "how I can help". Netiva is a studio.
- Phone/WhatsApp: +256705013062. WhatsApp CTA must exist sitewide (floating button or header icon), not only on case pages.
- Primary CTA: "Book a call" → must open a live scheduler (Cal.com/Calendly), never a mailto.
- Secondary contact: WhatsApp. There is no third CTA. "Get a Quote" lives only on /contact.
- Signature differentiator (must appear in hero subline and services): production mobile money & payments integrations — MTN MoMo, Flutterwave, PawaPay.

## 1B. COMPETITIVE SEPARATION MANDATE (non-negotiable)
Netiva currently shares near-identical language with at least one direct Kampala competitor
(jsui.digital) — "digital alchemy," "digital nervous systems," "signal," "the web is crowded
with template-driven noise," "output log"/"work." A premium client comparing both sites must
NOT see interchangeable positioning. This is priority zero, above visual polish:
- Retire every phrase that overlaps with jsui.digital's copy: "digital alchemy," "digital nervous
  systems," "signal"/"drop us a signal," "the web is crowded with template-driven noise,"
  "output log." Replace with language unique to Netiva, grounded in real capability (payments/
  mobile money integrations, African market fluency, specific stack) rather than atmosphere.
- Do not mirror their structure 1:1 (numbered "00X - LABEL" sections, "manifesto" link in hero,
  identical capability-grid wording). Structure may rhyme at a category level (hero → work →
  capabilities → CTA is a standard, fine pattern) but section labels, numbering style, and stock
  phrases must diverge visibly.
- Differentiate on substance JS.UI does not visibly claim: named payment rails (MTN MoMo,
  Flutterwave, PawaPay), named real case studies with numeric outcomes, a visible pricing anchor,
  a named founder/team with LinkedIn — things that are checkable, not just atmospheric.
- Before shipping new homepage copy, diff it mentally against jsui.digital's actual wording
  (fetch it if unsure) and flag any phrase-level overlap before committing.

## 2. DESIGN TOKENS (single source of truth)
Define in globals/tailwind config. Components may ONLY consume these tokens — no ad-hoc values.

### Color — exactly three roles:
- --background: one neutral (off-white or the dark editorial base — pick once, never mix per-section)
- --foreground: one near-opposite neutral for text
- --accent: ONE accent color. Used only for: primary CTA, link hover, active states, key highlights.
- Allowed derivatives: foreground at /80, /60, /40, /10, /5 opacities. Nothing else.
- FORBIDDEN: any second accent, gradients with 3+ stops, per-section color themes.

### Typography — exactly four sizes:
- display: clamp(4rem, 10vw, 9rem), tracking-tight, leading-[0.95] — hero only
- h2: text-4xl md:text-5xl, tracking-tight — section headings only
- body: text-lg, leading-relaxed
- caption: text-sm, foreground/60
- One typeface family (plus optional mono for labels). FORBIDDEN: any size outside these four; more than two font families.

### Spacing — fixed rhythm:
- Section vertical padding: py-24 md:py-40. No exceptions.
- Content width: max-w-6xl mx-auto px-6.
- Heading → content gap: mb-16.
- Card internal padding: p-8.
- FORBIDDEN: arbitrary one-off margins to "fix" layout; fix the parent rhythm instead.

### Radius & elevation:
- Cards: rounded-3xl. Images: rounded-2xl. Buttons: rounded-full.
- Shadow: shadow-sm at rest; hover = -translate-y-1 + shadow-md, transition 300ms.
- FORBIDDEN: mixed radii on siblings, heavy drop shadows, glassmorphism outside the nav.

## 3. COMPONENT LAW
- ONE <Card> component powers work items, service items, testimonials. Never fork a variant with different radius/padding — extend via props.
- ONE <Section> wrapper enforces spacing rhythm. All homepage sections use it.
- ONE motion primitive: fade-up on section entry (opacity 0→1, translateY 20px→0, 500ms ease-out, IntersectionObserver, respects prefers-reduced-motion). No parallax, no per-section animation styles. Optional single marquee under hero for logos.
- Nav: sticky top-0, backdrop-blur-md, bg-background/80, border-b border-foreground/5. Logo left; links: Work, Services, Blog, Contact; one accent "Book a call" button.
- Footer: logo, 4 links, socials, copyright. No duplicate CTA blocks.
- FOOTER — MINIMAL, NON-NEGOTIABLE: one thin row, py-10 max, single-line on desktop
  (wraps to 2-3 lines mobile only). Contents, in order, nothing more: logo mark (small,
  no tagline), 4 nav links, social icons (max 4, 20px, foreground/60 → accent on hover),
  copyright line ("© 2026 Netiva"). NO second CTA block, NO newsletter form, NO repeated
  contact details, NO manifesto/mission restatement, NO sitemap-style multi-column link
  dump. The CTA lives once, in the section directly above the footer — the footer itself
  is a quiet exit, not another pitch. border-t border-foreground/5 separates it from the
  CTA section; background stays identical to the rest of the page (no separate dark-footer
  block unless the whole site is already dark).
- Images: all project screenshots at 16:10, rounded-2xl, framed (browser chrome or flat color mat). FORBIDDEN: stock photos (remove Unsplash workspace image), raw unframed screenshots, mixed aspect ratios.

## 4. HOMEPAGE STRUCTURE (exactly six sections, this order)
1. Hero — display headline + one concrete subline naming: Next.js web apps, marketplaces, payment-integrated platforms, mobile money (MoMo/Flutterwave/PawaPay). One CTA: Book a call. One text link: View our work.
2. Selected Work — max 3 cards, each with a measurable outcome line (see §5).
3. Services — 4 cards: Strategy · Design · Development · Payments & Mobile Money Integrations.
4. Process — the existing 01–04 stages, unchanged in substance.
5. Testimonial — real client quotes only: quote, name, role, company. NEVER fabricate or placeholder a testimonial. If none exists yet, the section stays out of the build.
6. CTA — one closing block, then footer.
Manifesto / "Same internet. New signal." content moves to /company or blog. Do not re-add to homepage.

## 5. CASE STUDY LAW
- Key Outcome must be a result with a number or timeframe, never a status. "Live marketplace" is forbidden; "Launched in 12 weeks with escrow payments and N verified vendors" is the pattern.
- Only report numbers that are true and provided by Mitala. If a metric is missing, ASK — never invent, estimate, or placeholder metrics on a public page.
- Every case page: unique <title> ("Project — Category Case Study | Netiva"), unique meta description, correct canonical on netiva.tech (purge all netiva.studio references), correct og:url, real og:image.
- Each case ends with the same single CTA block (Book a call + WhatsApp).

## 6. COPY VOICE
- Concrete before clever. Flavor lines ("digital alchemy", "signals over static") may exist BELOW a concrete statement, never instead of one.
- Hero and section headings: max one line. Sublines: max two sentences.
- Every section must answer, at a glance: what is this, why does it matter to a premium client.
- Pricing anchor appears once on /services or /contact ("Engagements typically start from $X" — value supplied by Mitala, never invented).

## 7. TECHNICAL BAR (definition of done for every PR)
- All routes server-rendered or statically generated — project grids and case content must be visible in raw HTML (view-source test). No client-only content for anything Google should index.
- next/image for all images with correct sizes; hero image priority.
- Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 before merge.
- CLS < 0.1: every image and embed has explicit dimensions.
- One h1 per page; heading order never skips levels.
- All interactive elements keyboard-accessible with visible focus states (accent outline).
- Metadata via Next.js Metadata API per route — no inherited generic titles.
- No console errors, no unused CSS themes, no dead links (verify mailto/tel/wa.me targets).

## 8. WORKFLOW RULES FOR CLAUDE CODE
- Before writing code: state which section(s) of this file the change touches and how it complies.
- Smallest shippable diff. One concern per commit. Never refactor unrelated code "while here".
- After any visual change: list the token(s) consumed; if a new value was needed, propose the token addition explicitly — never inline it.
- Never delete or rewrite existing copy without showing before/after and getting approval.
- Never add: testimonials, metrics, client names, prices, or claims that Mitala has not explicitly provided in the conversation. Ask instead.
- If asked to add a feature that violates §2–§6 (second accent color, fifth font size, seventh homepage section, second CTA), refuse and cite the rule.

## 9. AUDIT CHECKLIST (run on request: "audit")
1. Grep for any email domain other than netivatech@gmail.com, and for netiva.studio → must return zero.
2. Grep copy for first-person singular ("I ", "my ") outside blog author bylines → must return zero.
2B. Grep copy for competitor-overlap phrases ("digital alchemy", "digital nervous system",
    "drop us a signal", "output log", "template-driven noise") → must return zero.
3. Confirm four-and-only-four text sizes in use.
4. Confirm one accent color in use.
5. Confirm all sections use <Section>, all cards use <Card>.
6. View-source /work: project cards present in HTML.
7. Every page: unique title + description + canonical.
8. All CTAs resolve: scheduler link live, wa.me link correct, tel correct.
9. Lighthouse scores meet §7 thresholds.
Report results as a pass/fail table with file paths for every failure.
