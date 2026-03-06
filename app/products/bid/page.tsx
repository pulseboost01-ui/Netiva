import { PremiumHeader } from '@/components/landing/premium-header';
import { PremiumFooter } from '@/components/landing/premium-footer';
import { MessageSquare, Sparkles, TrendingUp, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  {
    title: 'AI Proposal Generator',
    description: 'Generate winning freelance proposals with AI-powered analysis and personalization.',
    icon: Sparkles,
  },
  {
    title: 'Client Research',
    description: 'Automated research on clients and projects to craft targeted proposals.',
    icon: BarChart3,
  },
  {
    title: 'Win Rate Tracking',
    description: 'Track proposal success rates and optimize your approach over time.',
    icon: TrendingUp,
  },
  {
    title: 'Template Library',
    description: 'Access proven proposal templates for different industries and project types.',
    icon: MessageSquare,
  },
];

const benefits = [
  'Increase proposal win rate by 50%',
  'Save 5+ hours per proposal',
  'Automated client research and insights',
  'Track and optimize proposal performance',
];

export default function BidAIProductPage() {
  return (
    <>
      <PremiumHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-7xl w-full px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <MessageSquare className="h-4 w-4" />
              <span>Freelance Growth</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              BidAI Pro
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Intelligent freelance proposal generator that crafts winning bids using AI analysis and market insights.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/dashboard/bidai">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl w-full px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl w-full px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose BidAI Pro</h2>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl w-full px-4 py-20">
          <Card className="max-w-2xl mx-auto text-center p-12">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Win More Projects</CardTitle>
              <CardDescription className="text-lg">
                Join freelancers using BidAI Pro to increase their proposal win rates and grow their business.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link href="/dashboard/bidai">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <PremiumFooter />
    </>
  );
}
