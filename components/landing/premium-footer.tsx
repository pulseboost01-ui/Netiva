'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const links = {
  Products: [
    { label: 'EdTech SMS', href: '/products/edtech' },
    { label: 'ResumeRocket AI', href: '/products/resume' },
    { label: 'BidAI Pro', href: '/products/bid' },
    { label: 'Affiliates Omega', href: '/products/affiliates' },
  ],
  Solutions: [
    { label: 'For Education', href: '/solutions#education' },
    { label: 'For Careers', href: '/solutions#careers' },
    { label: 'For Freelance', href: '/solutions#freelance' },
    { label: 'For Business', href: '/solutions#business' },
  ],
  Resources: [
    { label: 'Documentation', href: '/resources#docs' },
    { label: 'Blog', href: '/blog' },
    { label: 'Guides', href: '/resources#guides' },
    { label: 'Support', href: '/resources#support' },
  ],
  Company: [
    { label: 'About', href: '/#about' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/contact' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/netiva', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/netiva', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/netiva', label: 'GitHub' },
];

export function PremiumFooter() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="relative w-full border-t bg-background">
      <div className="mx-auto max-w-7xl w-full px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Netiva
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Unified AI-powered ecosystem for education, careers, freelance & growth.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="md:col-span-2">
              <h3 className="font-semibold mb-4 text-sm">{title}</h3>
              <ul className="space-y-2">
                {items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Netiva. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-8 w-8 ml-2"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
