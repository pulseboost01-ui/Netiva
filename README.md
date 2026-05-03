# LaunchFolio — Next.js + Framer Motion Clone

A pixel-perfect clone of the LaunchFolio Framer template, rebuilt in **Next.js 14** with **Framer Motion** animations. No Framer database or store required — all data is hardcoded in `/src/data/index.ts`.

## Tech Stack

- **Next.js 14** (App Router)
- **Framer Motion 11** — all animations
- **Tailwind CSS** — styling
- **TypeScript** — type safety
- **Lucide React** — icons
- **Google Fonts** — DM Serif Display + DM Sans

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Projects, Testimonials, Services, About, Blog, FAQ |
| `/work` | All projects with filter by category |
| `/work/[slug]` | Individual project case study |
| `/services` | Services & pricing with process steps |
| `/blog` | Blog listing with featured post |
| `/blog/[slug]` | Full blog article |
| `/contact` | Contact form |
| `/quote` | Multi-step quote request wizard |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customise

All content lives in **`/src/data/index.ts`** — edit projects, services, testimonials, blog posts, FAQs and site config there.

### Key design tokens (in `globals.css`):
```css
--background: #0a0a0a;
--foreground: #fafafa;
--accent: #e8ff5a;       /* Yellow-green accent */
--card: #111111;
```

## Build for Production

```bash
npm run build
npm start
```
