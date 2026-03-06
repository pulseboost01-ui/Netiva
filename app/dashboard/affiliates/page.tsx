import Link from 'next/link';
import { Users, FormInput, DollarSign, Link2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AffiliatesDashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          Affiliates Omega
        </h1>
        <p className="text-muted-foreground">Lead-gen forms, affiliate tracking, revenue dashboards.</p>
      </div>

      <Tabs defaultValue="forms">
        <TabsList className="mb-6">
          <TabsTrigger value="forms">Lead forms</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="links">Tracking links</TabsTrigger>
        </TabsList>
        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FormInput className="h-5 w-5" /> Lead-gen forms</CardTitle>
              <CardDescription>Create and embed forms to capture leads. Connect to your CRM or use built-in storage.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><Link href="/dashboard/affiliates/forms/new">Create form</Link></Button>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your forms</CardTitle>
              <CardDescription>List of forms and recent submissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No forms yet. Create one to start collecting leads.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="affiliates">
          <Card>
            <CardHeader>
              <CardTitle>Affiliate network</CardTitle>
              <CardDescription>Invite affiliates and track their referrals and payouts.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><Link href="/dashboard/affiliates/invite">Invite affiliate</Link></Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" /> Revenue dashboard</CardTitle>
              <CardDescription>Total revenue, by product, by affiliate.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Connect Stripe or log payouts to see revenue here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-5 w-5" /> Tracking links</CardTitle>
              <CardDescription>Generate unique links for affiliates and campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><Link href="/dashboard/affiliates/links">Create link</Link></Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
