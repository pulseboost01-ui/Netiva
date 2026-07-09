export const siteConfig = {
  name: "Netiva",
  legalName: "Mitala Netiva",
  title: "Full-stack web developer",
  url: "https://netiva.tech",
  tagline: "I build web apps, dashboards, marketplaces, and payment-driven systems for real-world operations.",
  description:
    "I'm a solo full-stack web developer based in Kampala, Uganda, building production web products with Next.js, React, Node.js, and modern databases.",
  email: "hello@netiva.tech",
  phone: {
    display: "+256 705 013 062",
    tel: "+256705013062",
    whatsappDigits: "256705013062",
  },
  location: "Kampala — UG",
  siteVersion: "V.2026.1",
  availability: "Open for selected projects",
  avatar: "{{TODO: add real portrait photo}}",
  hero: {
    line1: "Full-stack",
    line2: "web products.",
    leadBold:
      "Marketplaces, school systems, payment workflows, and operational dashboards — engineered for real users, real money, and production load.",
    leadRest: "",
  },
  identity: {
    label: "About",
    body:
      "I'm a solo full-stack developer with production work in marketplaces, school management, streaming, and mobile-money-enabled platforms. I work directly with clients and ship the core implementation myself.",
    manifestoHref: "/work",
    manifestoCta: "See real projects",
  },
  socialProofLine: "Production work in marketplaces, edtech, and digital platforms",
  socials: {
    twitter: "{{TODO: confirm real URL}}",
    instagram: "{{TODO: confirm real URL}}",
    linkedin: "{{TODO: confirm real URL}}",
    github: "{{TODO: confirm real URL}}",
  },
  privacyPolicyHref: "/privacy",
  termsHref: "/terms",
};

export const trustedLogos: string[] = [];

export type NavLinkItem =
  | { label: string; href: string }
  | { label: string; href: string; drawer: "contact" | "booking" };

export const navLinks: NavLinkItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Edtech", href: "https://edtech.netiva.tech" },
  { label: "Contact", href: "/contact", drawer: "contact" },
];

export const CAPABILITIES_SECTION_NO = "002";

export const capabilities = [
  { id: "product", title: "Product builds", subtitle: "Marketplace, SaaS, and platform features" },
  { id: "frontend", title: "Frontend engineering", subtitle: "React, Next.js, dashboards, and flows" },
  { id: "backend", title: "Backend systems", subtitle: "APIs, auth, payments, billing, and integrations" },
  { id: "ops", title: "Operational tooling", subtitle: "Admin panels, KYC, reconciliations, and notifications" },
] as const;

export function isContactDrawerLink(link: NavLinkItem): link is NavLinkItem & { drawer: "contact" } {
  return "drawer" in link && link.drawer === "contact";
}

export function isBookingDrawerLink(link: NavLinkItem): link is NavLinkItem & { drawer: "booking" } {
  return "drawer" in link && link.drawer === "booking";
}

export const projects = [
  {
    id: "venstela",
    title: "Venstela",
    subtitle: "Events marketplace",
    category: "Marketplace",
    year: "2024",
    description:
      "A marketplace for event vendors with vendor management, escrow handling, commission logic, admin controls, and a lead wallet for operator workflows.",
    problem:
      "Event operators needed a single system to onboard vendors, hold funds safely, and take commission without manual reconciliation.",
    engineering: [
      "Escrow state machine for vendor payouts",
      "Configurable commission engine per category",
      "Lead wallet and operator admin control center",
      "Vendor onboarding and listing workflows",
    ],
    tags: ["Next.js", "Node.js", "MongoDB", "Payments"],
    image: "{{TODO: add screenshot for Venstela}}",
    color: "#f7f2e8",
    accent: "#b45309",
    featured: true,
    client: "Venstela",
    duration: "Production build",
    services: ["Full-stack development", "Payments", "Admin tooling"],
    outcome: "Marketplace platform",
    outcomeStat: { value: "Escrow", label: "commission engine live" },
  },
  {
    id: "soundit",
    title: "Soundit",
    subtitle: "African music streaming and ticketing",
    category: "Platform",
    year: "2024",
    description:
      "A music and ticketing platform with royalty splits, KYC, mobile-money payouts, WhatsApp/email notifications, and direct messaging for creators and fans.",
    problem:
      "Creators and fans needed a platform that could split royalties fairly, verify identity, and pay out via mobile money—not card-only rails.",
    engineering: [
      "Royalty split logic across creators and rights holders",
      "KYC flows before payouts",
      "PawaPay / Flutterwave / MTN MoMo integration paths",
      "WhatsApp and email notification pipelines",
      "Direct messaging between creators and fans",
    ],
    tags: ["Node.js", "PostgreSQL", "Payments", "Notifications"],
    image: "{{TODO: add screenshot for Soundit}}",
    color: "#101010",
    accent: "#facc15",
    featured: true,
    client: "Soundit",
    duration: "Production build",
    services: ["Core platform engineering", "Fintech flows", "Messaging integrations"],
    outcome: "Streaming + ticketing system",
    outcomeStat: { value: "MoMo", label: "payout-ready architecture" },
  },
  {
    id: "edtech",
    title: "Edtech school management",
    subtitle: "Multi-tenant school SaaS",
    category: "SaaS",
    year: "2024",
    description:
      "A multi-tenant school management system with a super-admin billing portal, school-level dashboards, and a parent/student mobile app for fees, attendance, and report cards. Live at Eden Blossoms Pre & Primary School with 114 students.",
    problem:
      "Schools needed one operational system for fees, attendance, and report cards—with a parent app that works on low-end phones and PIN-based login.",
    engineering: [
      "Multi-tenant billing portal for super-admin",
      "Per-school admin dashboards and role access",
      "React Native parent/student app (Expo)",
      "Fees, attendance, and report card workflows",
      "Secure PIN login for parents",
    ],
    tags: ["Next.js", "React Native", "PostgreSQL", "Billing"],
    image: "{{TODO: add screenshot for Edtech}}",
    color: "#eef6ff",
    accent: "#2563eb",
    featured: true,
    client: "Eden Blossoms Pre & Primary School",
    duration: "Live production client",
    services: ["SaaS engineering", "Billing portal", "Mobile app delivery"],
    outcome: "School operations platform",
    outcomeStat: { value: "114", label: "students on system today" },
    externalUrl: "https://edtech.netiva.tech",
  },
  {
    id: "draqla",
    title: "DraQla",
    subtitle: "Video streaming platform",
    category: "Streaming",
    year: "2023",
    description:
      "A video platform with Bunny CDN delivery and a cost-optimized storage pipeline tuned for media-heavy traffic.",
    problem:
      "Video delivery needed CDN-backed playback without runaway storage costs as the library grew.",
    engineering: [
      "Bunny CDN integration for media delivery",
      "Cost-optimized upload and storage pipeline",
      "Performance tuning for media-heavy pages",
      "Next.js frontend with streaming-optimized assets",
    ],
    tags: ["Next.js", "CDN", "Storage", "Performance"],
    image: "{{TODO: add screenshot for DraQla}}",
    color: "#f4f4f5",
    accent: "#7c3aed",
    featured: true,
    client: "DraQla",
    duration: "Production build",
    services: ["Frontend + platform delivery", "Media pipeline", "Performance tuning"],
    outcome: "Streaming delivery platform",
    outcomeStat: { value: "CDN", label: "cost-aware delivery" },
  },
];

export const workPhases = ["Discovery", "Build", "Launch"] as const;

/** @deprecated Use workPhases */
export const agencyPhases = workPhases;

export const workHistory = [
  { company: "Global clients", role: "Full-stack product builds", period: "2023–today" },
  { company: "Schools & operators", role: "Operational web platforms", period: "ongoing" },
] as const;

export const launchFolioTechStack = [
  "Next.js",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Sanity",
] as const;

export const launchFolioServicePills = [
  "Marketplace systems",
  "Payment integrations",
  "School management software",
  "Streaming platforms",
  "Admin dashboards",
  "Mobile-money workflows",
] as const;

export const homePricing = {
  headline: "How I work",
  headlineEm: "with clients.",
  leadBold:
    "I usually scope work as a clear project with defined milestones, a realistic delivery plan, and direct communication.",
  leadRest:
    " For larger product work, I can partner on a longer engagement once the problem, architecture, and budget are clear.",
  steps: [
    {
      title: "Scope",
      body: "We clarify the problem, the users, the core workflows, and the technical constraints before any build starts.",
    },
    {
      title: "Build",
      body: "I implement the product directly, keeping the work visible with practical checkpoints and decisions along the way.",
    },
    {
      title: "Launch",
      body: "We ship, test the real workflow, and keep the handover clear so the system remains usable after launch.",
    },
  ],
  footerNote: "I'm a solo full-stack developer, so I keep scope clear and delivery focused.",
  unlimited: {
    kicker: "Best fit",
    title: "Project-based build",
    description:
      "Ideal when you need a marketplace, SaaS feature, dashboard, payment flow, or custom web platform delivered with direct ownership.",
    price: null as number | null,
    period: "project",
    bullets: [
      "Direct implementation from planning to launch",
      "Clear scope, milestones, and delivery checkpoints",
      "Frontend + backend delivery in one workflow",
      "Payment, billing, and operational integrations when needed",
      "Simple handover and support for launch",
    ],
    cta: "Discuss your project",
  },
  single: {
    title: "School or operations product",
    description:
      "For school systems, admin panels, or workflow tools, I can scope the work around the operational need rather than a generic agency package.",
    bullets: ["Requirements review", "System architecture", "Build and launch", "Post-launch support as needed"],
    cta: "Start the conversation",
  },
} as const;

export const services = [
  {
    id: "product-builds",
    title: "Product builds",
    price: null as number | null,
    priceType: "project",
    description:
      "Marketplace features, internal tools, admin systems, and custom workflows that need to work in production.",
    features: ["Requirements review", "UI implementation", "Core feature delivery", "Testing and launch support"],
    icon: "Layers",
    popular: true,
  },
  {
    id: "frontend-engineering",
    title: "Frontend engineering",
    price: null as number | null,
    priceType: "project",
    description: "React and Next.js interfaces for dashboards, portals, and product surfaces that need clear behavior.",
    features: ["Responsive UI implementation", "Component structure", "Interaction polish", "Accessibility basics"],
    icon: "Code2",
    popular: false,
  },
  {
    id: "backend-systems",
    title: "Backend systems",
    price: null as number | null,
    priceType: "project",
    description:
      "APIs, auth, billing, payments, notifications, and database-backed logic for real operational products.",
    features: ["API development", "Payment integrations", "Database modeling", "Operational workflows"],
    icon: "Database",
    popular: false,
  },
  {
    id: "school-ops",
    title: "School & ops platforms",
    price: null as number | null,
    priceType: "project",
    description:
      "Multi-user admin systems, parent/student apps, fee workflows, attendance, and reporting for institutions.",
    features: ["Role-based access", "Billing and reporting", "Mobile-friendly experience", "Secure operational flows"],
    icon: "Pen",
    popular: false,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "{{TODO: request written testimonial from Alex Muheesi / Eden Blossoms}}",
    role: "{{TODO: real role}}",
    company: "Eden Blossoms Pre & Primary School",
    avatar: "{{TODO: add real photo for Alex Muheesi / Eden Blossoms}}",
    quote: "{{TODO: real testimonial quote from Eden Blossoms head teacher}}",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "What kinds of projects do you take on?",
    answer:
      "I work on production web products that need careful implementation: marketplaces, dashboards, SaaS features, payment workflows, and school or operations platforms.",
  },
  {
    question: "Do you work solo or with a team?",
    answer:
      "I work as a solo full-stack developer and handle the core build directly, while keeping communication simple and delivery focused.",
  },
  {
    question: "Can you help with payments, billing, or mobile money?",
    answer:
      "Yes. I have experience with payment integrations such as PawaPay, Flutterwave, and MTN MoMo, along with invoice or billing-related flows.",
  },
  {
    question: "Do you work with schools or education software?",
    answer:
      "Yes. I've built school management software with admin portals, parent/student experiences, reporting, fees, and attendance workflows.",
  },
  {
    question: "How do we start?",
    answer:
      "Send a short brief with your goals, scope, timeline, and any technical constraints. I'll reply with a practical next step and a clear estimate.",
  },
];

export const blogPosts = [
  {
    id: "mobile-money-reconciliation",
    title: "{{TODO: write real post about mobile-money reconciliation and payment workflows}}",
    excerpt:
      "{{TODO: real excerpt about handling mobile-money payments, reconciliation, and user trust in fintech workflows}}",
    date: "{{TODO: real publish date}}",
    readTime: "{{TODO: real read time}}",
    category: "Process",
    image: "{{TODO: add blog cover image for mobile-money post}}",
    featured: true,
    draft: true,
    content: "{{TODO: write real post about a specific technical challenge I've solved}}",
  },
  {
    id: "multi-tenant-billing",
    title: "{{TODO: write real post about multi-tenant billing architecture}}",
    excerpt:
      "{{TODO: real excerpt about school or SaaS billing structure, per-tenant admin flows, and payment handling}}",
    date: "{{TODO: real publish date}}",
    readTime: "{{TODO: real read time}}",
    category: "Business",
    image: "{{TODO: add blog cover image for multi-tenant billing post}}",
    featured: true,
    draft: true,
    content: "{{TODO: write real post about a specific technical challenge I've solved}}",
  },
];

export const stats = [
  { value: "4", label: "production platforms built" },
  { value: "114", label: "students on edtech system today" },
  { value: "3", label: "payment integrations in production" },
];

export const tools = [...launchFolioTechStack];

export const skills = [
  { name: "Next.js / React", level: 90 },
  { name: "Node.js / Express", level: 88 },
  { name: "MongoDB / PostgreSQL", level: 85 },
  { name: "Payment integrations", level: 82 },
  { name: "React Native", level: 78 },
  { name: "System architecture", level: 80 },
];

export const quoteServices = [
  { id: "product-builds", label: "Product builds" },
  { id: "frontend-engineering", label: "Frontend engineering" },
  { id: "backend-systems", label: "Backend systems" },
  { id: "school-ops", label: "School & operations platforms" },
  { id: "other", label: "Something custom" },
];

export const budgetRanges = [
  { id: "under-2k", label: "Under $2,000" },
  { id: "2k-5k", label: "$2,000 – $5,000" },
  { id: "5k-10k", label: "$5,000 – $10,000" },
  { id: "10k-20k", label: "$10,000 – $20,000" },
  { id: "20k-plus", label: "$20,000+" },
];

export const projectCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))] as const;
