import { getSession } from '@/lib/auth-server';
import { Gift, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReferralCopyButton } from '@/components/referral-copy-button';

export default async function ReferralsPage() {
  const session = await getSession();
  const userId = session?.user?.id ?? '';
  const suffix = userId.length >= 8 ? userId.slice(-8) : userId;
  const code = userId ? `NETIVA-${suffix.toUpperCase().replace(/[^A-Z0-9]/g, '0')}` : '';

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Referrals</h1>
      <p className="text-muted-foreground mb-8">Share your link. Get $20–$50 credit per paid referral.</p>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Gift className="h-5 w-5" /> Your referral code</CardTitle>
          <CardDescription>Share with friends. When they subscribe to Pro or Elite, you get $50 credit.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3 font-mono">
            <span className="flex-1">{code || 'Sign in to get your code'}</span>
            <ReferralCopyButton code={code} />
          </div>
          <p className="text-sm text-muted-foreground">Credits apply to Pro/Elite subscriptions. No cash payout unless configured in your account.</p>
        </CardContent>
      </Card>

      <Card className="mt-6 max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Share2 className="h-5 w-5" /> Referral stats</CardTitle>
          <CardDescription>Total referrals and credits earned.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Paid referrals</p>
            </div>
            <div>
              <p className="text-2xl font-bold">$0</p>
              <p className="text-sm text-muted-foreground">Credits earned</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
