'use client';

import { GraduationCap, FileText, MessageSquare, Users, Code, Zap, BarChart3 } from 'lucide-react';

const products = [
  {
    name: 'EdTech SMS',
    description: 'The most flexible School Management System. Configure with TypeScript. Customize with React.',
    icon: GraduationCap,
    detail: 'The most flexible School Management System',
  },
  {
    name: 'ResumeRocket AI',
    description: 'Interactive resume building. Serve visual drag-and-drop editing as you expect.',
    icon: FileText,
    detail: 'Interactive resume building',
  },
  {
    name: 'BidAI Pro',
    description: 'The agent that knows your proposals. Accelerate your work. Query, audit, edit at scale.',
    icon: MessageSquare,
    detail: 'The agent that knows your proposals',
  },
  {
    name: 'Affiliates Omega',
    description: 'Custom apps equals tailored workflows. Create dashboards, tables, and grids.',
    icon: Users,
    detail: 'Custom apps equals tailored workflows',
  },
  {
    name: 'Functions + AI',
    description: 'Automate any workflow with AI. Deploy serverless functions. Trigger on any change.',
    icon: Zap,
    detail: 'Automate any workflow with AI',
  },
  {
    name: 'Analytics + CDN',
    description: 'The database optimized for content. Store data as JSON, from any source, structured your way.',
    icon: BarChart3,
    detail: 'The database optimized for content',
  },
];

export function SanityFullStack() {
  return (
    <section className="w-full bg-muted/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl w-full px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Full stack</h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              Take control of your content workflows
            </h3>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Gain full control to build, scale, and ship the content applications your team needs, so they can move faster, collaborate and scale without friction.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.name} className="space-y-3 p-6 rounded-lg border bg-background hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <product.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="font-semibold">{product.name}</h4>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">{product.detail}</p>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
