import { PremiumHeader } from '@/components/landing/premium-header';
import { PremiumFooter } from '@/components/landing/premium-footer';
import { GraduationCap, Users, BookOpen, BarChart3, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  {
    title: 'Complete School Management',
    description: 'Manage students, classes, schedules, and administrative tasks all in one place.',
    icon: BookOpen,
  },
  {
    title: 'Parent Communication',
    description: 'Real-time messaging, announcements, and progress updates for parents.',
    icon: Users,
  },
  {
    title: 'Student Tracking',
    description: 'Comprehensive tracking of attendance, grades, assignments, and performance.',
    icon: BarChart3,
  },
  {
    title: 'Secure & Compliant',
    description: 'Bank-level security with FERPA compliance and data protection.',
    icon: Shield,
  },
];

const benefits = [
  'Reduce administrative workload by 60%',
  'Improve parent engagement by 3x',
  'Increase student performance tracking accuracy',
  'Streamline communication across all stakeholders',
];

export default function EdTechProductPage() {
  return (
    <>
      <PremiumHeader />
      <main className="pt-16">
        {/* Hero */}
        <section className="mx-auto max-w-7xl w-full px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              <span>Education Technology</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              EdTech SMS
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Complete school management system with parent communication, student tracking, and administrative tools.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/dashboard/edtech">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
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

        {/* Benefits */}
        <section className="mx-auto max-w-7xl w-full px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose EdTech SMS</h2>
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

        {/* CTA */}
        <section className="mx-auto max-w-7xl w-full px-4 py-20">
          <Card className="max-w-2xl mx-auto text-center p-12">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Ready to Transform Your School?</CardTitle>
              <CardDescription className="text-lg">
                Join schools worldwide using EdTech SMS to streamline operations and improve outcomes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link href="/dashboard/edtech">
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
