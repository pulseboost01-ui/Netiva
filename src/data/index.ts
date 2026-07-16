export const siteConfig = {
  name: "Netiva",
  legalName: "Netiva Studio Ltd.",
  title: "Premier Web Design & Development",
  /** Short line beside nav logo (agency meta). */
  tagline: "Digital systems that provoke, perform, and persuade.",
  description:
    "We partner with founders and teams who need more than templates—clear strategy, ruthless craft, and products that behave as well as they look.",
  email: "hello@netiva.tech",
  /** Voice + WhatsApp (+256705013062) */
  phone: {
    display: "+256705013062",
    tel: "+256705013062",
    whatsappDigits: "256705013062",
  },
  location: "Kampala — UG",
  /** Build label next to scroll cue (agency sites often version the deck). */
  siteVersion: "V.2025.2",
  availability: "Accepting selective projects • Q4 '25",
  /** Optional portrait for contextual CTAs. */
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces&q=80",
  hero: {
    line1: "Digital",
    line2: "Alchemy.",
    leadBold:
      "We don't just build websites—we craft digital nervous systems that provoke, perform, and persuade.",
    leadRest: "",
  },
  /** Homepage identity block, inspired by premiere studio positioning. */
  identity: {
    label: "Positioning",
    body:
      "The web is crowded with template-driven noise. We exist to disrupt the silence of sameness—with systems you can iterate, explain, and scale.",
    manifestoHref: "/blog/designer-developer-gap",
    manifestoCta: "Read the manifesto",
  },
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

/** Grayscale client marks in hero trust row. */
export const trustedLogos = ["Stripe", "Vercel", "Linear", "Framer"];

export type NavLinkItem =
  | { label: string; href: string }
  | { label: string; href: string; drawer: "contact" | "booking" };

export const navLinks: NavLinkItem[] = [
  { label: "Work", href: "/work" },
  { label: "Expertise", href: "/services" },
  { label: "Agency", href: "/#agency" },
  { label: "Blog", href: "/blog" },
  { label: "Book a Call", href: "#", drawer: "booking" },
  { label: "Contact", href: "/contact", drawer: "contact" },
];

/** Homepage “Capabilities” — aligned with [jsui.digital](https://www.jsui.digital/) offerings. Section index shown once as **002**. */
export const CAPABILITIES_SECTION_NO = "002";

export const capabilities = [
  { id: "brand", title: "Brand Design", subtitle: "Strategy, Identity, Systems" },
  { id: "uiux", title: "UI / UX", subtitle: "Research, Wireframing, Prototyping" },
  {
    id: "web",
    title: "Web Development",
    subtitle: "React, Next.js, WebGL-ready experiences",
  },
  { id: "cms", title: "CMS & Architecture", subtitle: "Headless, Scalable, Content" },
] as const;

export function isContactDrawerLink(link: NavLinkItem): link is NavLinkItem & { drawer: "contact" } {
  return "drawer" in link && link.drawer === "contact";
}

export function isBookingDrawerLink(link: NavLinkItem): link is NavLinkItem & { drawer: "booking" } {
  return "drawer" in link && link.drawer === "booking";
}

/** Real Netiva client work, shown in build/launch order. */
export const projects = [
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
    image: "/projects/venstela.png",
    color: "#0c0a09",
    accent: "#eab308",
    featured: true,
    client: "Venstela",
    duration: "Ongoing",
    services: ["Product Design", "Web App", "Next.js", "Ongoing Development"],
    outcome: "Live marketplace",
    liveUrl: "https://venstela.com",
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
    image: "/projects/draqla.png",
    color: "#0a0a0a",
    accent: "#d4af37",
    featured: true,
    client: "Draqla",
    duration: "12 weeks",
    services: ["Product Design", "Web App", "Streaming Infrastructure"],
    outcome: "Streaming platform",
    liveUrl: "https://draqla.up.railway.app",
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
    image: "/projects/edtech.png",
    color: "#f5f3ff",
    accent: "#6d28d9",
    featured: true,
    client: "School Management System",
    duration: "Ongoing",
    services: ["Product Design", "Web App", "Role-based Access", "Ongoing Development"],
    outcome: "School management platform",
    liveUrl: "https://edtech.netiva.tech",
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
    image: "/projects/whispers.png",
    color: "#fdf2ee",
    accent: "#e8926b",
    featured: true,
    client: "Whispers of Antidote",
    duration: "8 weeks",
    services: ["Web Design", "Booking System", "Content"],
    outcome: "Counseling practice site",
    liveUrl: "https://whispersofantidote.com",
  },
];

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
];

export const testimonials = [
  {
    id: 1,
    name: "Martina Martinez",
    role: "Customer Manager",
    company: "SupportEase",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
    quote:
      "The new UI halved inbound support tickets—we finally had clarity customers could self-serve.",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas Weber",
    role: "Co-founder",
    company: "Marketplace Partner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    quote:
      "Netiva operates like an in-house frontier team—strategy, UX, and build quality stayed aligned.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ben Harper",
    role: "CTO",
    company: "Nexus",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    quote:
      "Conversion improved materially after Netiva tightened our narrative and site architecture.",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Wong",
    role: "Data Scientist",
    company: "DataSphere",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    quote:
      "Their design systems thinking made dense analytics legible—the product finally feels humane.",
    rating: 5,
  },
  {
    id: 5,
    name: "Natalie Rivera",
    role: "Brand Manager",
    company: "UnityBrands",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80",
    quote:
      "The repositioning sharpened everything from pitch decks to in-app—we sound like ourselves now.",
    rating: 5,
  },
  {
    id: 6,
    name: "Emma Kraft",
    role: "CMO",
    company: "TechVista",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80",
    quote:
      "Engagement climbed double digits post-launch; the storytelling finally matches product reality.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines vary based on complexity. A simple project might take 2-3 weeks, while more comprehensive designs can take 1-2 months. I will provide a specific estimate after our initial consultation.",
  },
  {
    question: "Can you work with my existing brand and designs?",
    answer:
      "Absolutely! I'm experienced in working with established brands. I will ensure all new designs align perfectly with your existing brand identity and style.",
  },
  {
    question: "What makes your design process unique?",
    answer:
      "My process stands out due to our collaborative approach. I involve you at every stage, ensuring the final product truly reflects your vision while benefiting from my expertise.",
  },
  {
    question: "Do you offer ongoing support after the project is completed?",
    answer:
      "Yes, I provide post-project support. This includes minor adjustments and answering questions about your new designs for up to 30 days after delivery. If there's a need for longer support, we can discuss a retainer.",
  },
  {
    question: "How do you handle confidentiality and intellectual property rights?",
    answer:
      "I take confidentiality seriously. All client information and project details are kept strictly confidential. Upon project completion, you'll own full intellectual property rights to the final designs.",
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
  { id: "retainer", label: "Monthly partnership" },
  { id: "other", label: "Something custom" },
];

export const budgetRanges = [
  { id: "under-2k", label: "Under $2,000" },
  { id: "2k-5k", label: "$2,000 – $5,000" },
  { id: "5k-10k", label: "$5,000 – $10,000" },
  { id: "10k-20k", label: "$10,000 – $20,000" },
  { id: "20k-plus", label: "$20,000+" },
];
