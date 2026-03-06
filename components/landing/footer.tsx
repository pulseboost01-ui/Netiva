'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const links = {
  Products: [
    { label: 'EdTech SMS', href: '/dashboard/edtech' },
    { label: 'ResumeRocket AI', href: '/dashboard/resume' },
    { label: 'BidAI Pro', href: '/dashboard/bidai' },
    { label: 'Affiliates Omega', href: '/dashboard/affiliates' },
  ],
  Company: [
    { label: 'Pricing', href: '/#pricing' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/[0.08] bg-[#000000] py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Join Netiva Today
          </h2>
          <p className="mt-4 text-white/60">
            One account. Four products. Unlimited scale.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-primary/25"
          >
            <Link href="/sign-in">Get Started Free</Link>
          </Button>
        </motion.div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-12 md:grid-cols-4">
          <div>
            <p className="font-semibold text-white">Netiva</p>
            <p className="mt-2 text-sm text-white/50">
              AI-powered ecosystem for education, careers, freelance & growth.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="font-semibold text-white">{title}</p>
              <ul className="mt-4 space-y-2">
                {items.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-white/[0.08] pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Netiva. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
