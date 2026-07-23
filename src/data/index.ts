export const siteConfig = {
  name: "Netiva",
  legalName: "Netiva",
  title: "Premier Web Design & Development",
  /** Short line beside nav logo (agency meta). */
  tagline: "Digital systems that provoke, perform, and persuade.",
  description:
    "We partner with founders and teams who need more than templates—clear strategy, ruthless craft, and products that behave as well as they look.",
  /** Hero subline (CLAUDE.md §4.1) — must concretely name: Next.js web apps, marketplaces,
   * payment-integrated platforms, and mobile money (MoMo/Flutterwave/PawaPay). */
  heroSubline:
    "We build Next.js web apps, marketplaces, and payment-integrated platforms—MTN MoMo, Flutterwave, and PawaPay wired in from day one.",
  email: "netivatech@gmail.com",
  /** Voice + WhatsApp (+256705013062) */
  phone: {
    display: "+256705013062",
    tel: "+256705013062",
    whatsappDigits: "256705013062",
  },
  location: "Kampala — UG",
  /** Build label next to scroll cue (agency sites often version the deck). */
  // siteVersion: "V.2025.2",
  // availability: "Accepting selective projects • Q4 '25",
  socialProofLine: "Trusted by product-led teams globally",
  socials: {
    twitter: "https://x.com/mitalasam",
    instagram: "https://instagram.com",
    linkedin: "https://www.linkedin.com/in/mitalasamuel/",
    dribbble: "https://dribbble.com",
  },
  privacyPolicyHref: "/privacy",
  termsHref: "/terms",
};

export type NavLinkItem =
  | { label: string; href: string }
  | { label: string; href: string; drawer: "contact" | "booking" };

export const navLinks: NavLinkItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact", drawer: "contact" },
  { label: "Book a call", href: "/book", drawer: "booking" },
];

/** Homepage "Services" — the four capability groups named in CLAUDE.md §4. */
export const capabilities = [
  { id: "strategy", title: "Strategy", subtitle: "Scope, architecture, and a plan we can commit to" },
  { id: "design", title: "Design", subtitle: "Interfaces designed in the medium they ship in" },
  { id: "development", title: "Development", subtitle: "Next.js and React, production-grade from week one" },
  {
    id: "payments",
    title: "Payments & Mobile Money Integrations",
    subtitle: "MTN MoMo, Flutterwave, and PawaPay — built and shipped, not theoretical",
  },
] as const;

export function isContactDrawerLink(link: NavLinkItem): link is NavLinkItem & { drawer: "contact" } {
  return "drawer" in link && link.drawer === "contact";
}

export function isBookingDrawerLink(link: NavLinkItem): link is NavLinkItem & { drawer: "booking" } {
  return "drawer" in link && link.drawer === "booking";
}

export type ProjectTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
} | null;

/**
 * Quantified stat tiles for case studies — distinct from the qualitative `outcomes` below.
 * All four projects currently use `[METRIC_NEEDED]` placeholders pending real numbers; see
 * CONTENT_TODO.md before replacing any of them.
 */
export type CaseStudyMetric = {
  value: string;
  label: string;
  context?: string;
};

/** Real Netiva client work, shown in build/launch order. */
export const projects: {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  status: "ongoing" | "completed";
  description: string;
  tags: string[];
  image: string;
  /** Additional real screenshots for the case study gallery. Omit or leave empty if none are cleared for publishing. */
  gallery?: string[];
  color: string;
  accent: string;
  featured: boolean;
  client: string;
  duration: string;
  services: string[];
  outcome: string;
  liveUrl: string;
  caseStudy: { challenge: string; approach: string; result: string };
  metrics: CaseStudyMetric[];
  outcomes: { label: string; value: string }[];
  testimonial: ProjectTestimonial;
}[] = [
  {
    id: "venstela",
    title: "Venstela",
    subtitle: "Event Services Marketplace",
    category: "Marketplace",
    year: "2024",
    status: "ongoing" as const,
    description:
      "Africa's marketplace for modern events — connecting planners with verified vendors, curated venues, and event-ready products, with transparent pricing and secure bookings. Netiva continues to build and maintain the platform.",
    tags: ["Marketplace", "Web App", "Next.js"],
    image: "/projects/venstela1.jpg",
    gallery: ["/projects/venstela1.jpg", "/projects/venstela2.jpg", "/projects/venstela3.jpg"],
    color: "#0c0a09",
    accent: "#eab308",
    featured: true,
    client: "Venstela",
    duration: "Ongoing",
    services: ["Product Design", "Web App", "Next.js", "Ongoing Development"],
    outcome: "Live marketplace",
    liveUrl: "https://venstela.com",
    caseStudy: {
      challenge:
        "Event planners were juggling vendor discovery, quotes, and payment across chat threads and manual invoices—with no reliable way to verify who they were paying or hold funds safely until a booking was actually fulfilled.",
      approach:
        "We designed and built a marketplace with verified vendor onboarding, transparent listings, and secure, escrow-backed bookings, so payment only releases once both sides confirm delivery. Netiva remains the team building and maintaining the platform today.",
      result:
        "Venstela is live in production as an ongoing marketplace, with Netiva continuing to ship new vendor, booking, and payments features.",
    },
    metrics: [
      { value: "[METRIC_NEEDED]", label: "Verified vendors onboarded" },
      { value: "[METRIC_NEEDED]", label: "Bookings processed" },
      { value: "[METRIC_NEEDED]", label: "Platform uptime" },
    ],
    outcomes: [
      { label: "Payments", value: "Escrow-backed booking flow" },
      { label: "Trust & safety", value: "Verified vendor onboarding" },
      { label: "Status", value: "Live & in ongoing development" },
      { label: "Commerce model", value: "Transparent, upfront pricing" },
    ],
    testimonial: null,
  },
  {
    id: "draqla",
    title: "Draqla",
    subtitle: "Streaming Platform",
    category: "Streaming",
    year: "2024",
    status: "completed" as const,
    description:
      "Uganda's premium streaming platform for movies, series, live TV, and VJ-hosted original content — built for fast browsing and playback across East African audiences.",
    tags: ["Streaming", "Web App", "Media"],
    image: "/projects/draqla4.jpg",
    gallery: ["/projects/draqla1.png", "/projects/draqla2.jpg", "/projects/draqla3.jpg"],
    color: "#0a0a0a",
    accent: "#d4af37",
    featured: true,
    client: "Draqla",
    duration: "12 weeks",
    services: ["Product Design", "Web App", "Streaming Infrastructure"],
    outcome: "Streaming platform",
    liveUrl: "https://draqla.up.railway.app",
    caseStudy: {
      challenge:
        "Streaming platforms serving East African audiences have to perform well on inconsistent mobile connections while still feeling like a global-grade product—most off-the-shelf solutions weren't built for that trade-off.",
      approach:
        "We built a fast-loading catalog and playback experience covering movies, series, live TV, and VJ-hosted original content, tuned for East African network conditions, and shipped it to production.",
      result: "Draqla is live and streaming to real users today.",
    },
    metrics: [
      { value: "[METRIC_NEEDED]", label: "Median load time" },
      { value: "[METRIC_NEEDED]", label: "Concurrent stream capacity" },
      { value: "[METRIC_NEEDED]", label: "East Africa playback latency" },
    ],
    outcomes: [
      { label: "Performance", value: "Tuned for East African network conditions" },
      { label: "Catalog", value: "Movies, series, live TV & VJ-hosted originals" },
      { label: "Status", value: "Live in production" },
      { label: "Experience", value: "Fast-loading browsing & playback" },
    ],
    testimonial: null,
  },
  {
    id: "school-management-system",
    title: "School Management System",
    subtitle: "Role-based School Platform",
    category: "Education",
    year: "2024",
    status: "ongoing" as const,
    description:
      "A role-based school management system for parents, teachers, secretaries, and admins — handling records, attendance, and communication in one platform. Netiva continues to maintain and extend the system.",
    tags: ["EdTech", "Web App", "Dashboard"],
    image: "/projects/system2.jpg",
    gallery: ["/projects/system.png", "/projects/system2.jpg", "/projects/system3.jpg"],
    color: "#f5f3ff",
    accent: "#6d28d9",
    featured: true,
    client: "School Management System",
    duration: "Ongoing",
    services: ["Product Design", "Web App", "Role-based Access", "Ongoing Development"],
    outcome: "School management platform",
    liveUrl: "https://edtech.netiva.tech",
    caseStudy: {
      challenge:
        "The school needed one system that four very different roles—parents, teachers, secretaries, and admins—could all trust for records, attendance, and communication, replacing a patchwork of spreadsheets and paper.",
      approach:
        "We designed a role-based platform with dedicated permissions and workflows for each user type, then shipped it into a live school environment. Netiva continues to maintain and extend it as the school's needs grow.",
      result: "The system is live and in daily use at a real school, with Netiva actively extending it.",
    },
    metrics: [
      { value: "4", label: "User roles unified", context: "Parents, teachers, secretaries, admins" },
      { value: "[METRIC_NEEDED]", label: "Students & staff managed" },
      { value: "[METRIC_NEEDED]", label: "Admin time saved" },
    ],
    outcomes: [
      { label: "Access control", value: "Role-based access for 4 user types" },
      { label: "Coverage", value: "Records, attendance & communication in one system" },
      { label: "Status", value: "Live & in daily use at a real school" },
      { label: "Development", value: "Actively maintained & extended" },
    ],
    testimonial: null,
  },
  {
    id: "whispers-of-antidote",
    title: "Whispers of Antidote",
    subtitle: "Counseling & Therapy",
    category: "Wellness",
    year: "2024",
    status: "completed" as const,
    description:
      "A calming, professional web presence for a Kampala-based counseling practice — booking, case studies, and client resources for therapy, trauma support, and relationship guidance.",
    tags: ["Wellness", "Booking", "Web Design"],
    image: "/projects/whispers2.jpg",
    gallery: ["/projects/whispers3.jpg", "/projects/whispers4.jpg", "/projects/whispers5.jpg"],
    color: "#fdf2ee",
    accent: "#e8926b",
    featured: true,
    client: "Whispers of Antidote",
    duration: "8 weeks",
    services: ["Web Design", "Booking System", "Content"],
    outcome: "Counseling practice site",
    liveUrl: "https://whispersofantidote.com",
    caseStudy: {
      challenge:
        "A counseling practice needed a web presence that felt as calm and trustworthy as the therapy itself, with straightforward booking and resources for people who may already be in a vulnerable place.",
      approach:
        "We designed and built a calming, professional site end to end—covering booking, case studies, and client resources for therapy, trauma support, and relationship guidance.",
      result: "The site is live and in active use as the practice's primary booking and information channel.",
    },
    metrics: [
      { value: "[METRIC_NEEDED]", label: "Booking conversion rate" },
      { value: "[METRIC_NEEDED]", label: "Booking payment success rate" },
      { value: "[METRIC_NEEDED]", label: "Avg. booking response time" },
    ],
    outcomes: [
      { label: "Design tone", value: "Calm, trust-first visual design" },
      { label: "Booking", value: "Integrated booking system" },
      { label: "Content", value: "Case studies & client resources" },
      { label: "Status", value: "Live & in active use" },
    ],
    testimonial: null,
  },
];

export type ProjectItem = (typeof projects)[number];

export const agencyPhases = [
  "Strategy",
  "Design",
  "Development",
  "Launch",
] as const;

export const workHistory = [
  { company: "Product teams", role: "Full-service digital", period: "2022–today" },
  { company: "Startups • Non-profits", role: "Web & identity", period: "ongoing" },
] as const;

/** How we operate — shown as an icon list in the Agency section. */
export const agencyPrinciples = [
  {
    icon: "Award",
    title: "Ownership",
    description: "We treat every engagement like our own product, not a line item.",
  },
  {
    icon: "MessageCircle",
    title: "Communication",
    description: "Async by default, but visible in real time—no black-box weeks.",
  },
  {
    icon: "Zap",
    title: "Momentum",
    description: "Small, shippable steps beat big reveals. We compound weekly.",
  },
] as const;

export const launchFolioTechStack = [
  "Figma",
  "Framer",
  "Webflow",
  "Rive",
  "Blender",
  "Trello",
  "ChatGPT",
  "Claude",
] as const;

export const launchFolioServicePills = [
  "Brand systems",
  "Design systems",
  "Next.js",
  "Headless CMS",
  "Motion UI",
  "Analytics",
  "Performance",
] as const;

export const homePricing = {
  headline: "Engagements",
  headlineEm: "built for clarity.",
  leadBold: "Every scope is modeled before we write production code.",
  leadRest:
    " Retainers or fixed phases—priced to outcomes, padded with pragmatic documentation.",
  steps: [
    {
      title: "Brief",
      body: "Executive workshop + KPI mapping so every surface ladders to measurable outcomes.",
    },
    {
      title: "Assemble",
      body: "We pair design, engineering, and content strategy under one roadmap with visible milestones.",
    },
    {
      title: "Amplify",
      body: "Launch, instrument, and iterate—we stay embedded until dashboards reflect the uplift.",
    },
  ],
  footerNote: "Netiva operates pods, not freelancers—/async first, ruthless documentation always.",
  unlimited: {
    kicker: "Product accelerator",
    title: "Product partnership",
    description:
      "A senior pod embedded with your roadmap—discovery, UX, frontend, and release discipline in one runway.",
    price: 12000,
    period: "month",
    bullets: [
      "Dedicated design + frontend pod",
      "Weekly planning & demos",
      "Design system ownership",
      "Next.js/React implementation",
      "Slack + Loom async reviews",
      "Pause with 30-day notice",
    ],
    cta: "Start a partnership",
  },
  single: {
    title: "Focused launch",
    description:
      "From zero to shipped for a single surface—ideal when you already know what needs to exist.",
    bullets: ["Narrative positioning", "UI system + CMS", "Launch checklist", "30-day stabilization"],
    cta: "Request scope",
  },
} as const;

export const services = [
  {
    id: "brand-design",
    title: "Brand Design",
    description:
      "Positioning and visual systems that behave like infrastructure—stretching seamlessly into product and campaigns.",
    features: ["Discovery workshops", "Verbal identity", "Logo + lockups", "Color & typography", "Systems guide"],
    icon: "Pen",
    popular: false,
  },
  {
    id: "ui-ux",
    title: "UI / UX",
    description:
      "Research-led interfaces with ruthless clarity—rapid prototyping through production-ready handoff.",
    features: ["Landscape audit", "User flows & wires", "High-fidelity UI", "Interactive prototype", "QA support"],
    icon: "Layers",
    popular: true,
  },
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Engineering that embraces motion, accessibility, and performance budgets without sacrificing artistry.",
    features: ["React / Next.js build", "Component library in code", "Animation systems", "Core Web Vitals focus"],
    icon: "Code2",
    popular: false,
  },
  {
    id: "cms-architecture",
    title: "CMS & Architecture",
    description:
      "Composable stacks that marketers can wield—scalable schemas, previews, and deploy pipelines included.",
    features: ["Headless CMS selection", "Content modeling", "Preview + webhooks", "Docs for editors"],
    icon: "Database",
    popular: false,
  },
  {
    id: "payments-integrations",
    title: "Payments & Financial Integrations",
    description:
      "Production-grade money movement for African markets—mobile money, cards, and escrow logic that reconciles cleanly and survives audits.",
    features: [
      "PawaPay, Flutterwave & MTN MoMo integration",
      "Escrow & split-payment logic",
      "KYC & verification flows",
      "Mobile money reconciliation",
      "Webhook-driven transaction states",
    ],
    icon: "Landmark",
    popular: false,
  },
];

/** General-practices statement, not a formal certification. Flag any claim here that should be backed by a real security policy doc. */
export const securityStatement = {
  heading: "Security & data handling",
  body:
    "We handle client and payment data on a least-privilege basis: secrets stay in environment variables and secret managers (never in source control), production access is scoped per engagement, and payment flows are built against the provider's own PCI-compliant infrastructure rather than storing card data ourselves. Every integration is reviewed for webhook signature verification and idempotent transaction handling before it ships.",
  disclaimer:
    "This is a description of our current working practices, not a formal security certification.",
};

/** International/remote engagement logistics — payment rails, delivery cadence, contracting. */
export const internationalEngagement = {
  heading: "Working with international clients",
  body:
    "Most of our engagements are remote and async-by-default, so distance and time zones aren't a blocker to working with us.",
  paymentRails: [
    "USDT / crypto",
    "USD via Wise, Payoneer, or bank wire",
    "Standard invoicing (NET terms by agreement)",
  ],
  delivery: [
    "4+ hour overlap with US/EU/UK business hours by default",
    "Async updates via written status reports, with live calls for key milestones",
    "Same-business-day response commitment on active engagements",
  ],
  contracting:
    "Every engagement runs under our Terms of Service — the same contractual framework covering scope, IP assignment, confidentiality, and payment terms that a customised master agreement would. An NDA is available on request before any discovery call — just ask.",
};

export const faqs = [
  {
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines vary based on complexity. A simple project might take 2-3 weeks, while more comprehensive builds can take 1-2 months or run as an ongoing engagement. We provide a specific estimate after our initial consultation.",
  },
  {
    question: "Can you work with my existing brand and designs?",
    answer:
      "Absolutely! We're experienced in working with established brands. We'll ensure all new designs align perfectly with your existing brand identity and style.",
  },
  {
    question: "What makes your design process unique?",
    answer:
      "Our process stands out due to our collaborative approach. We involve you at every stage, ensuring the final product truly reflects your vision while benefiting from our expertise.",
  },
  {
    question: "Do you offer ongoing support after the project is completed?",
    answer:
      "Yes, we provide post-project support. This includes minor adjustments and answering questions about your new build for up to 30 days after delivery. If there's a need for longer support, we can discuss a retainer.",
  },
  {
    question: "How do you handle confidentiality and intellectual property rights?",
    answer:
      "We take confidentiality seriously. All client information and project details are kept strictly confidential, and an NDA is available on request before we even get on a discovery call. Every engagement runs on a written contract covering scope and payment terms, and upon project completion you own full intellectual property rights to the final work.",
  },
];

export const blogPosts = [
  {
    id: "designer-developer-gap",
    title: "How designers and developers can actually collaborate.",
    excerpt:
      "Discover proven strategies to bridge the designer-developer gap. Learn how top teams eliminate handoff friction and ship better products faster through true collaboration.",
    date: "Mar 6, 2025",
    readTime: "6 min read",
    category: "Process",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    featured: true,
    content: `
      The gap between design and development has been a persistent challenge in product teams for decades. Designers create beautiful, pixel-perfect mockups. Developers build functional, scalable systems. And somewhere in between, the magic gets lost.

      But it doesn't have to be this way.

      The most successful product teams I've worked with share one thing in common: they've made collaboration a first-class citizen in their process, not an afterthought.

      **Start with shared language**

      The first barrier is terminology. Designers talk about "whitespace" and developers talk about "padding." Designers say "component" and developers mean something entirely different by it. Building a shared glossary — even just a simple Notion doc — eliminates countless misunderstandings.

      **Design in systems, not screens**

      The biggest shift you can make is moving from designing screens to designing systems. When you think in components and states, your handoffs become dramatically cleaner. A button isn't just a button — it has hover, active, disabled, loading, and error states. Document all of them.

      **Involve developers early**

      Don't wait until the design is "done" to show it to developers. Bring them in during the concept phase. They'll flag technical constraints early, suggest simpler implementations, and feel genuine ownership over the final product.

      **Use design tokens**

      Design tokens are the bridge between Figma and code. When your design system uses tokens for colors, spacing, and typography — and those tokens map directly to CSS variables or Tailwind config — updates become trivial. Change a token in one place and it ripples everywhere.

      The gap exists because we let it. Close it deliberately, and you'll ship better products faster than you thought possible.
    `,
  },
  {
    id: "conversion-portfolio",
    title: "Why faster isn't always better.",
    excerpt:
      "Speed is celebrated in product teams—but the fastest design process isn't always the one that delivers the best outcomes. Here's when to slow down.",
    date: "Apr 22, 2025",
    readTime: "5 min read",
    category: "Process",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    featured: true,
    content: `
      I've reviewed hundreds of designer portfolios. Most of them share the same fundamental flaw: they're designed to impress designers, not hire-able to clients.

      Here's the uncomfortable truth: your potential clients don't care about your process nearly as much as they care about their problem. They're not evaluating your aesthetic sensibility — they're asking "can this person solve my specific problem?"

      **The gallery portfolio trap**

      Most portfolios are just galleries. Beautiful images arranged in a grid. No context, no story, no outcome. A client looking at this is thinking: "This looks nice, but how do I know it worked?"

      The fix is simple but uncomfortable: lead with results, not process.

      **Structure that converts**

      Every case study should follow this arc:
      1. The problem (make the client feel seen)
      2. Your approach (establish credibility)
      3. The solution (show your craft)
      4. The outcome (prove it worked)

      Numbers matter. "The redesign improved conversion by 34%" is infinitely more compelling than "I redesigned their website."

      **Social proof placement**

      Put testimonials near your CTAs, not at the bottom of the page after the visitor has already decided. The decision to reach out happens before they scroll to the footer.

      **One clear ask**

      What do you want visitors to do? Book a call? Fill out a form? Send an email? Pick one and make it obvious. Multiple competing CTAs create paralysis.

      Your portfolio is your best salesperson. Make it work harder.
    `,
  },
  {
    id: "framer-design-system",
    title: "Designing for human connection.",
    excerpt:
      "Interfaces aren't neutral—they shape how people feel about your product. A practical lens for designing warmth and clarity without sacrificing usability.",
    date: "Apr 1, 2025",
    readTime: "4 min read",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    featured: false,
    content: `
      A design system is only as good as its adoption. The most beautifully documented system is worthless if developers are building their own components from scratch anyway.

      I've built design systems for startups and established companies alike. The ones that survive have a few things in common.

      **Build with developers, not for them**

      Invite your lead developer to the first design system workshop. Not as an observer — as a co-creator. Their input on component structure will be invaluable, and their buy-in will be transformative.

      **Start smaller than you think**

      The trap is trying to systematize everything before you've launched anything. Start with 10 core components: button, input, card, modal, toast, badge, avatar, dropdown, table, and form. Get those right. Build on top.

      **Token everything**

      Colors, spacing, border radius, shadow, typography. Every design decision should trace back to a token. When you change the token, everything updates automatically. This is the magic that makes design systems worth the investment.

      The system that ships beats the system that's perfect. Start shipping.
    `,
  },
  {
    id: "pricing-design-work",
    title: "How I Price My Design Work (And Why I Stopped Charging Hourly)",
    excerpt:
      "Hourly pricing penalizes expertise. Here's the value-based model that doubled my income without doubling my hours.",
    date: "Sep 18, 2024",
    readTime: "7 min read",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    featured: false,
    content: `
      The day I stopped charging hourly was the day my business fundamentally changed.

      Hourly pricing has a perverse incentive built into it: efficiency is punished. The faster you work, the less you earn. Your expertise — the thing clients are actually paying for — becomes a liability.

      **Value-based pricing in practice**

      Value-based pricing means anchoring your price to the outcome, not the time. If your branding work helps a company raise their prices by 20%, what's that worth to them over 5 years? The answer is almost certainly more than your invoice.

      The conversation shifts from "how long will this take?" to "what results can I expect?" That's a much better conversation to be in.

      **My current pricing model**

      I use a hybrid: fixed-price projects for defined scope, monthly retainers for ongoing relationships, and day rates for consulting. Each serves a different type of client need.

      Fixed-price projects work because both parties know exactly what they're getting. The risk is absorbed by the designer (scope creep is real) but the reward is proportional to your efficiency.

      Monthly retainers are ideal for clients who need ongoing design support. Predictable revenue, predictable relationship.

      **The transition**

      Switching pricing models is uncomfortable. You'll likely lose some clients. But you'll gain clients who value design as an investment, not a commodity. Those clients are better to work with, pay more, and refer more.

      Charge what you're worth. Then get better at being worth it.
    `,
  },
];

export const stats = [
  { value: "35+", label: "Launches shipped" },
  { value: "12ms", label: "Avg. CLS budget" },
  { value: "5★", label: "Avg. sprint feedback" },
];

export const tools = [...launchFolioTechStack];

export const skills = [
  { name: "UI Design", level: 95 },
  { name: "UX Research", level: 85 },
  { name: "Brand Identity", level: 90 },
  { name: "Motion Design", level: 80 },
  { name: "Framer / Webflow", level: 88 },
  { name: "Design Systems", level: 92 },
];

export const quoteServices = [
  { id: "brand-design", label: "Brand Design" },
  { id: "ui-ux", label: "UI / UX" },
  { id: "web-dev", label: "Web Development" },
  { id: "cms-architecture", label: "CMS & Architecture" },
  { id: "payments-integrations", label: "Payments & Financial Integrations" },
  { id: "retainer", label: "Monthly partnership" },
  { id: "other", label: "Something custom" },
];

export const budgetRanges = [
  { id: "under-2k", label: "Under $2,000" },
  { id: "2k-5k", label: "$2,000 – $5,000" },
  { id: "5k-10k", label: "$5,000 – $10,000" },
  { id: "10k-20k", label: "$10,000 – $20,000" },
  { id: "20k-50k", label: "$20,000 – $50,000" },
  { id: "50k-150k", label: "$50,000 – $150,000" },
  { id: "150k-plus", label: "$150,000+" },
  { id: "retainer", label: "Ongoing retainer" },
];

/**
 * Legal/compliance facts for procurement & vendor-vetting review. Fields not yet confirmed use
 * honest "available on request" copy rather than bracketed placeholders — see CONTENT_TODO.md
 * for what still needs to be filled in and where.
 */
export const PENDING_LEGAL_FIELD = "Available on request";

export const companyInfo = {
  legalName: siteConfig.legalName ?? siteConfig.name,
  tradingAs: siteConfig.name,
  registrationStatus: PENDING_LEGAL_FIELD,
  registrationNumber: PENDING_LEGAL_FIELD,
  tin: PENDING_LEGAL_FIELD,
  certificateOfGoodStanding: PENDING_LEGAL_FIELD,
  registeredAddress: PENDING_LEGAL_FIELD,
  jurisdiction: "Uganda",
  contactEmail: siteConfig.email,
  contactPhone: siteConfig.phone.display,
} as const;

/**
 * Core team. Names are real and confirmed. Mitala's title and domain line are confirmed by the
 * user; the other three members' `role` and `domain` values are Claude's best-guess inference
 * (reusing the previously-established backend/design/frontend seat descriptions), including the
 * name-to-role mapping — all of it needs explicit sign-off before shipping. See CONTENT_TODO.md.
 * No photo, LinkedIn, or email is shown for anyone besides the founder until that person supplies
 * it themselves.
 */
export const teamMembers: {
  id: string;
  name: string;
  role: string;
  roleConfirmed: boolean;
  domain: string;
  linkedin?: string;
  markers?: string[];
}[] = [
  {
    id: "founder",
    name: "Mitala",
    role: "Full-Stack Developer",
    roleConfirmed: true,
    domain: "Handles architecture, payments integrations, and stays the main point of contact for clients.",
    linkedin: siteConfig.socials.linkedin,
    markers: [
      "Payments integrations: PawaPay, Flutterwave, and MTN MoMo in production",
      "Main point of contact across every engagement — no account-manager layer",
    ],
  },
  {
    id: "hope",
    name: "Hope",
    role: "Lead Backend Engineer",
    roleConfirmed: false,
    domain: "Builds and maintains the APIs and databases behind Venstela and the school system.",
  },
  {
    id: "derick",
    name: "Derick",
    role: "Product & UI Designer",
    roleConfirmed: false,
    domain: "Turns early ideas into wireframes, then into the interfaces that ship.",
  },
  {
    id: "reagan",
    name: "Reagan",
    role: "Frontend Engineer",
    roleConfirmed: false,
    domain: "Writes the React and Next.js code that turns finished designs into working pages.",
  },
] as const;

/** /capability-statement content. Quantified outcomes are placeholder-tagged until real numbers are supplied. */
export const capabilityStatement = {
  legalName: siteConfig.legalName ?? siteConfig.name,
  teamSize: "4-person core team",
  foundedContext: "Full-service digital studio working with clients globally.",
  techStack: [
    "Next.js / React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Headless CMS platforms",
    "PawaPay / Flutterwave / MTN MoMo",
  ],
  sectorExperience: [
    { sector: "Marketplaces & escrow commerce", detail: "Vendor onboarding, bookings, and escrow-backed payments (Venstela)." },
    { sector: "EdTech", detail: "Role-based school management software live in daily use (School Management System)." },
    { sector: "Fintech & payments", detail: "Production integrations with PawaPay, Flutterwave, and MTN MoMo covering KYC and reconciliation." },
    { sector: "Media & streaming", detail: "Playback and catalog infrastructure tuned for East African network conditions (Draqla)." },
  ],
  /** Derived from `projects` below rather than hardcoded, so it stays accurate as the portfolio grows. */
  quantifiedOutcomes: [
    { label: "Live production platforms shipped & maintained", value: String(projects.length) },
    { label: "Payments infrastructure", value: "PawaPay, Flutterwave & MTN MoMo in production" },
    { label: "Engagement range", value: "8-week fixed launches to ongoing multi-year platforms" },
  ],
} as const;

/**
 * Homepage social-proof quotes. Empty until real client testimonials are collected — see
 * CONTENT_TODO.md. ClientTestimonialsSection hides itself entirely when this is empty rather
 * than rendering placeholder quotes; add real entries here (id, quote, name, role, company) to
 * bring the section back.
 */
export const clientTestimonials: {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}[] = [];
