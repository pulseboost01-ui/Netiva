'use client';

import { GraduationCap, FileText, MessageSquare, Users, Sparkles, BarChart3, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'APPS & SDK',
    description: 'Content applications that enable custom workflows at scale, from creation to distribution.',
    icon: Zap,
    image: 'apps',
  },
  {
    title: 'Compute + AI',
    description: 'Automate anything with functions and agent actions, powering your content operations with AI',
    icon: Sparkles,
    image: 'compute',
  },
  {
    title: 'Content Lake',
    description: 'A database optimized for content queries, authoring and delivery.',
    icon: BarChart3,
    image: 'content',
  },
];

export function SanityFeatures() {
  return (
    <section className="w-full bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl w-full px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Empower devs and creators to deliver faster—at scale with AI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                {/* Placeholder for images */}
                <div className="h-48 bg-muted rounded-lg mt-6 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">{feature.image}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
