'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function SanityHero() {
  return (
    <section className="relative w-full bg-background py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl w-full px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl mb-6">
            The Unified AI Ecosystem
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Unlock your business with a fully customizable all-code platform for education, careers, freelance, and growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-base px-8 h-12">
              <Link href="/sign-in">
                Start Building
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 h-12">
              <Link href="/products">
                Watch Demo
              </Link>
            </Button>
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            <code className="bg-muted px-3 py-1 rounded text-xs font-mono">
              npm create netiva@latest
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
