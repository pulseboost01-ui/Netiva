import { getSession } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import { Sparkles, TrendingUp, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function CoachPage() {
  const session = await getSession();
  if (!session?.user) redirect('/sign-in');

  // In production, fetch from AI API
  const opportunities = [
    {
      product: 'ResumeRocket AI',
      title: 'Update your resume with latest achievements',
      description: 'Your resume hasn\'t been updated in 2 months. Add your recent project to increase match rate.',
      impact: 'High',
      action: '/dashboard/resume',
    },
    {
      product: 'BidAI Pro',
      title: '3 new freelance opportunities match your skills',
      description: 'Based on your profile, there are 3 high-value projects you should apply for.',
      impact: 'High',
      action: '/dashboard/bidai',
    },
    {
      product: 'Affiliates Omega',
      title: 'Optimize your lead capture form',
      description: 'Your conversion rate dropped 15%. Update your form to improve results.',
      impact: 'Medium',
      action: '/dashboard/affiliates',
    },
  ];

  const tips = [
    {
      category: 'Career Growth',
      tip: 'Focus on building 2-3 core skills deeply rather than spreading thin across many.',
      icon: Target,
    },
    {
      category: 'Productivity',
      tip: 'Batch similar tasks together to reduce context switching and increase efficiency.',
      icon: Zap,
    },
    {
      category: 'Growth',
      tip: 'Track your metrics weekly to identify trends and make data-driven decisions.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Coach</h1>
        <p className="text-muted-foreground">Your daily personalized insights and opportunities</p>
      </div>

      {/* Top Opportunities */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Top 3 Opportunities Today</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {opportunities.map((opp, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{opp.product}</Badge>
                  <Badge variant={opp.impact === 'High' ? 'default' : 'outline'}>
                    {opp.impact} Impact
                  </Badge>
                </div>
                <CardTitle className="text-lg">{opp.title}</CardTitle>
                <CardDescription>{opp.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href={opp.action} className="text-sm text-primary hover:underline">
                  Take action →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Tips */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Today's Tips</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {tips.map((tip, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <tip.icon className="h-4 w-4 text-primary" />
                  </div>
                  <Badge variant="outline">{tip.category}</Badge>
                </div>
                <CardDescription className="text-base">{tip.tip}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Powered Insights</CardTitle>
          </div>
          <CardDescription>
            Based on your usage patterns across all products, here's what we recommend:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>You're most active in ResumeRocket AI. Consider exploring BidAI Pro to diversify your income streams.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Your affiliate conversion rate is above average. Scale your campaigns to maximize revenue.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Upgrade to Elite plan to unlock advanced AI features and analytics across all products.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
