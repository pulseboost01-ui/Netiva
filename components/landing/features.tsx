'use client';

import { motion } from 'framer-motion';
import { GraduationCap, FileText, MessageSquare, Users, Zap, BarChart3, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: GraduationCap,
    title: 'EdTech SMS',
    description: 'School management, parent app, admin pages, student tracking – all in one.',
    href: '/dashboard/edtech',
  },
  {
    icon: FileText,
    title: 'ResumeRocket AI',
    description: 'AI resume & cover builder, job tracker, interview prep, ATS scorer, templates.',
    href: '/dashboard/resume',
  },
  {
    icon: MessageSquare,
    title: 'BidAI Pro',
    description: 'AI proposal generator, client research, analytics, freelance templates.',
    href: '/dashboard/bidai',
  },
  {
    icon: Users,
    title: 'Affiliates Omega',
    description: 'Lead-gen forms, affiliate tracking, revenue dashboards.',
    href: '/dashboard/affiliates',
  },
  { icon: Zap, title: 'Unified AI Coach', description: 'Daily tips and top 3 opportunities across all products.' },
  { icon: BarChart3, title: 'Analytics Engine', description: 'Revenue and usage tracking across your entire ecosystem.' },
  { icon: Share2, title: 'Viral & Referrals', description: 'Share insights, referral codes, $20–$50 credit per paid referral.' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-calm">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One ecosystem. Every growth lever.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Education, careers, freelance, affiliate growth – unified under Netiva with AI and analytics.
          </p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
                {'href' in f && (
                  <CardContent>
                    <a href={f.href} className="text-sm font-medium text-primary hover:underline">
                      Open dashboard →
                    </a>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
