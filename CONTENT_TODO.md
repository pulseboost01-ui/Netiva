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

Names are real and now public on `/team`: Mitala, Hope, Derick, Reagan. Mitala's title
("Founder & Full-Stack Developer") and one-line domain description were given directly and are
settled. **The other three are not settled** — everything below is Claude's inference, not
confirmed fact:

- **Role titles and one-line domain descriptions are guessed**, reusing the three seats that were
  previously placeholder-only ("Lead Backend Engineer" / API design, data modeling, infra;
  "Product & UI Designer" / research, UX, visual systems; "Frontend Engineer" / interfaces and
  design systems). Confirm or correct both the title and the description directly with Hope,
  Derick, and Reagan — the description was originally written about an anonymous seat, not a named
  person, so check it actually matches what each of them does.
- **The name-to-role mapping is also a guess** — Hope, Derick, and Reagan were assigned to those
  three titles in the order they were listed, with no actual information about who does what.
  Don't assume the pairing is right; check it explicitly with each person.
- No photo, LinkedIn, or email is shown for Hope, Derick, or Reagan — left out of the rendered page
  entirely rather than shown as placeholders. Add each once the person supplies it.
- **Confirm each team member is okay being listed publicly before this page goes live**, and
  collect photos/bios/LinkedIn from anyone who wants them included.

Rendered by `src/components/team/TeamPageClient.tsx` (founder gets a featured block; Hope/Derick/
Reagan render as a name + role roster list, no avatar placeholders).

## 3. Case study quantified metrics & testimonials (`src/data/index.ts`, `projects` array)

Each project now has two separate blocks: a qualitative `outcomes` array (real, already written)
and a quantified `metrics` array (new — `CaseStudyMetric[]`, rendered by
`src/components/work/CaseStudyMetrics.tsx` directly below the hero image). Every `metrics` entry
currently uses a `"[METRIC_NEEDED]"` value placeholder — replace with real numbers, don't remove
the tile.

### Venstela (`metrics` array on the `venstela` project)
- Verified vendors onboarded (count)
- Bookings processed (count or volume)
- Platform uptime (%)
- Client testimonial: real contact name, role, and quote (`testimonial` field, currently `null`).

### Draqla (`metrics` array on the `draqla` project)
- Median load time
- Concurrent stream capacity
- East Africa playback latency
- Client testimonial: real contact name, role, and quote (`testimonial` field, currently `null`).

### School Management System (`metrics` array on the `school-management-system` project)
- User roles unified — already real ("4": parents, teachers, secretaries, admins), no action needed.
- Students & staff managed (count)
- Admin time saved (e.g. hours/week, or % reduction)
- Client testimonial: real contact name, role, quote, **and the real school name** (currently
  withheld pending permission to publish it).

### Whispers of Antidote (`metrics` array on the `whispers-of-antidote` project)
- Booking conversion rate
- Booking payment success rate — label deliberately doesn't name a specific payment processor
  (e.g. PawaPay) since none is listed in this project's `services`/description; only add a
  processor name here if the project actually integrates one.
- Avg. booking response time
- Client testimonial: real contact name, role, and quote.

All of the above render on each project's case study page at `/work/<slug>`
(`src/components/work/ProjectCaseStudy.tsx` + `CaseStudyMetrics.tsx`).

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
- The homepage's "How we approach the work" section (`src/components/sections/TestimonialsSection.tsx`,
  formerly "Partner signals") is Netiva's own account of each engagement, styled deliberately
  without quote marks or testimonial-card chrome so it can't be mistaken for third-party
  endorsement. Real client testimonials belong exclusively in
  `src/components/sections/ClientTestimonialsSection.tsx`, which stays hidden until real quotes
  are added to `clientTestimonials` in `src/data/index.ts` — keep these two sections visually
  distinct going forward.
- Organization JSON-LD in `src/app/layout.tsx` only encodes facts already present in
  `siteConfig` (name, email, phone, location, social links) — no registration numbers or claims
  requiring verification were added to structured data.

## 7. Discoverability (external actions, no code involved)

- Claim/complete a Netiva profile on **Clutch** and **GoodFirms**, and set up a **LinkedIn Company
  Page** — these are primary channels international/enterprise buyers use to vet vendors, and they
  compound credibility independently of the website.
- Once 2-3 consented client testimonials exist (see section 3/4 above), ask those clients to also
  leave a review on one of the platforms above — third-party-hosted reviews outweigh on-site quotes.
- Once real testimonials and metrics are in place, the site is a legitimate submission candidate for
  design award platforms (Awwwards, CSS Design Awards, regional African design awards). Submit, and
  only add an award badge to the site after actually winning/being listed — never preemptively.
- If a formal, lawyer-drafted Master Service Agreement template (distinct from the on-site Terms of
  Service at `/terms`) is wanted for larger procurement processes, have that drafted and referenced
  from `src/data/index.ts` (`internationalEngagement.contracting`,
  `src/components/services/ServicesPageClient.tsx`) — the current copy honestly points to the
  existing Terms of Service as the operative contract rather than claiming a separate document
  exists.

## Legal entity / registration status — do not change without explicit instruction

Netiva's URSB business registration is in **Draft/Pending** status. Per explicit user
instruction, do not add a company registration number, "registered company" language, or any
other legal-entity claim anywhere on the site (footer, `/company`, `/capability-statement`, or
elsewhere) until told the registration has moved past Draft/Pending. `companyInfo` in
`src/data/index.ts` currently uses neutral "Available on request" copy for these fields — this
is intentional and should not be upgraded to an affirmative registered/incorporated claim
without that go-ahead.
