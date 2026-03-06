'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function SanityCTA() {
  return (
    <section className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl w-full px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Say goodbye to limitations. Just build it your way.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start from scratch with docs, pick up a template, or work through free guided courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base px-8 h-12">
              <Link href="/sign-in">Get started now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 h-12">
              <Link href="/#pricing">Contact sales</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            Start in minutes. It's free.
          </p>
        </div>
      </div>
    </section>
  );
}
