import { PremiumHeader } from '@/components/landing/premium-header';
import { PremiumFooter } from '@/components/landing/premium-footer';
import { Users, TrendingUp, BarChart3, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  {
    title: 'Lead Generation',
    description: 'Create high-converting lead capture forms and landing pages.',
    icon: Users,
  },
  {
    title: 'Affiliate Tracking',
    description: 'Track affiliates, commissions, and performance in real-time.',
    icon: BarChart3,
  },
  {
    title: 'Revenue Dashboards',
    description: 'Comprehensive analytics and reporting for your affiliate program.',
    icon: TrendingUp,
  },
  {
    title: 'Commission Management',
    description: 'Automated commission calculations and payouts.',
    icon: DollarSign,
  },
];

const benefits = [
  'Scale affiliate revenue by 3x',
  'Automate commission tracking and payouts',
  'Real-time performance analytics',
  'Increase lead conversion rates by 40%',
];

export default function AffiliatesProductPage() {
  return (
    <>
      <PremiumHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-7xl w-full px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              <span>Affiliate Marketing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Affiliates Omega
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced affiliate marketing platform with lead generation, tracking, and commission management.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/dashboard/affiliates">Get Started</Link>
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
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Affiliates Omega</h2>
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
              <CardTitle className="text-3xl mb-4">Scale Your Affiliate Program</CardTitle>
              <CardDescription className="text-lg">
                Join businesses using Affiliates Omega to grow their revenue through affiliate marketing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link href="/dashboard/affiliates">
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
