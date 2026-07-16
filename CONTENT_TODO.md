# Content TODO

Everything on this list is a **real placeholder**, clearly marked in the UI (bracketed text,
dashed borders, or "[METRIC]" tags) so nothing fabricated is presented as fact. Replace each
item with real information before using this site in a government or enterprise procurement
process. All line numbers are current as of this pass — re-check them if the file has since
been edited.

## 1. Company / legal (highest priority for procurement)

All in `src/data/index.ts`, `companyInfo` object:

- `src/data/index.ts:628` — `registrationStatus`: how the business is legally registered (sole
  proprietorship, registered business name, limited company) and with which registry.
- `src/data/index.ts:629` — `registrationNumber`: company/business registration number.
- `src/data/index.ts:630` — `tin`: Tax Identification Number.
- `src/data/index.ts:631` — `certificateOfGoodStanding`: link or reference, if one exists.
- `src/data/index.ts:632` — `registeredAddress`: registered business address.

Rendered on `/company` (`src/app/company/page.tsx`) and referenced from the footer
(`src/components/layout/Footer.tsx`) and `/capability-statement`.

## 2. Team (`/team`, data in `src/data/index.ts`, `teamMembers` array)

- `src/data/index.ts:642` — Founder name (real name, role is already correct: "Founder &
  Full-Stack Engineer"). Add a real photo to replace the placeholder avatar in
  `src/components/team/TeamPageClient.tsx`.
- `src/data/index.ts:649` — Lead Backend Engineer: name, bio accuracy, photo.
- `src/data/index.ts:656` — Product & UI Designer: name, bio accuracy, photo (or remove the slot
  if this role isn't filled yet).
- `src/data/index.ts:663` — Frontend Engineer: name, bio accuracy, photo (or remove the slot if
  this role isn't filled yet).

If any of these roles are genuinely unfilled, delete the slot rather than leaving a fake name.

## 3. Case study outcomes & testimonials (`src/data/index.ts`, `projects` array)

### Venstela
- `src/data/index.ts:111-114` — 4 quantified outcome metrics (active vendors, bookings
  processed, escrow volume, uptime).
- `src/data/index.ts:117-121` — Client testimonial: real contact name, role, and quote.

### Draqla
- `src/data/index.ts:151-154` — 4 quantified outcome metrics (viewers, playback start time,
  catalog size, sessions).
- `src/data/index.ts:157-161` — Client testimonial: real contact name, role, and quote.

### School Management System
- `src/data/index.ts:191-194` — 4 quantified outcome metrics (students managed, staff accounts,
  attendance records, messages sent).
- `src/data/index.ts:197-201` — Client testimonial: real contact name, role, quote, **and the
  real school name** (currently withheld pending permission to publish it).

### Whispers of Antidote
- `src/data/index.ts:231-234` — 4 quantified outcome metrics (booking requests, response time,
  resource pages, satisfaction).
- `src/data/index.ts:237-241` — Client testimonial: real contact name, role, and quote.

All of the above render on each project's case study page at `/work/<slug>`
(`src/components/work/ProjectCaseStudy.tsx`).

## 4. Homepage testimonials (`src/data/index.ts`, `clientTestimonials` array)

- `src/data/index.ts:698-705` — Testimonial 1: real client name, role, company, quote.
- `src/data/index.ts:706-713` — Testimonial 2: real client name, role, company, quote.
- `src/data/index.ts:714-721` — Testimonial 3: real client name, role, company, quote.

Renders on the homepage via `src/components/sections/ClientTestimonialsSection.tsx`. If fewer
than 3 real testimonials are available, trim the array rather than shipping placeholders live.

## 5. Capability statement (`/capability-statement`)

- `src/data/index.ts:690-692` — 3 quantified outcomes (platforms shipped, payment volume
  processed, average engagement length) in the `capabilityStatement.quantifiedOutcomes` array.

## 6. Security & data handling statement

- `src/data/index.ts` — `securityStatement.disclaimer` (in the `securityStatement` export,
  directly after the `services` array): once a formal, written security/data-handling policy
  document exists, link it here instead of the general-practices description. Rendered on
  `/services` (`src/components/services/ServicesPageClient.tsx`).

## Notes on what was deliberately left alone

- No fake client logos, fake review-site ratings, or invented press mentions were added anywhere.
- The homepage's existing "Partner signals" section (`src/components/sections/TestimonialsSection.tsx`)
  was left as-is — it's Netiva's own account of each engagement, not attributed client quotes, so
  it isn't a fabrication risk.
- Organization JSON-LD in `src/app/layout.tsx` only encodes facts already present in
  `siteConfig` (name, email, phone, location, social links) — no registration numbers or claims
  requiring verification were added to structured data.
