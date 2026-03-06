'use client';

import { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export function PricingCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState([10000]);
  const [currentPlan, setCurrentPlan] = useState<'free' | 'pro' | 'elite'>('free');

  const revenue = monthlyRevenue[0];
  const savings = {
    free: 0,
    pro: revenue * 0.15, // 15% efficiency gain
    elite: revenue * 0.30, // 30% efficiency gain
  };

  const costs = {
    free: 0,
    pro: 19,
    elite: 49,
  };

  const netSavings = {
    free: 0,
    pro: savings.pro - costs.pro,
    elite: savings.elite - costs.elite,
  };

  const roi = {
    free: 0,
    pro: ((savings.pro - costs.pro) / costs.pro) * 100,
    elite: ((savings.elite - costs.elite) / costs.elite) * 100,
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="h-5 w-5 text-primary" />
          <CardTitle>ROI Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate your potential savings and ROI with Netiva
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base mb-4 block">
            Estimated Monthly Revenue: ${revenue.toLocaleString()}
          </Label>
          <Slider
            value={monthlyRevenue}
            onValueChange={setMonthlyRevenue}
            min={1000}
            max={100000}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>$1k</span>
            <span>$100k</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {(['free', 'pro', 'elite'] as const).map((plan) => (
            <Card
              key={plan}
              className={`cursor-pointer transition-all ${
                currentPlan === plan ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setCurrentPlan(plan)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg capitalize">{plan}</CardTitle>
                  {currentPlan === plan && (
                    <Badge>Selected</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Cost:</span>
                  <span className="font-semibold">${costs[plan]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Savings:</span>
                  <span className="font-semibold text-green-600">
                    ${Math.round(savings[plan]).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Net Savings:</span>
                  <span className={`font-semibold ${netSavings[plan] > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                    ${Math.round(netSavings[plan]).toLocaleString()}
                  </span>
                </div>
                {plan !== 'free' && (
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">
                      {Math.round(roi[plan])}% ROI
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {currentPlan !== 'free' && (
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm font-semibold mb-1">
              With {currentPlan.toUpperCase()} plan:
            </p>
            <p className="text-sm text-muted-foreground">
              You could save ${Math.round(netSavings[currentPlan]).toLocaleString()} per month
              ({Math.round(roi[currentPlan])}% ROI) by increasing efficiency and reducing manual work.
            </p>
          </div>
        )}

        <Button className="w-full" size="lg">
          Upgrade to {currentPlan === 'free' ? 'Pro' : currentPlan.toUpperCase()}
        </Button>
      </CardContent>
    </Card>
  );
}
