import Link from 'next/link';
import { MessageSquare, FileSearch, BarChart3, FileCode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BidAIDashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-primary" />
          BidAI Pro
        </h1>
        <p className="text-muted-foreground">AI proposal generator, client research, analytics, freelance templates.</p>
      </div>

      <Tabs defaultValue="proposals">
        <TabsList className="mb-6">
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="research">Client research</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="proposals">
          <Card>
            <CardHeader>
              <CardTitle>AI Proposal Generator</CardTitle>
              <CardDescription>Generate winning freelance proposals from job briefs. Paste the job and we’ll draft a tailored proposal.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><Link href="/dashboard/bidai/generate">Generate proposal</Link></Button>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent proposals</CardTitle>
              <CardDescription>Your last 5 proposals.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No proposals yet. Create your first one above.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileSearch className="h-5 w-5" /> Client research</CardTitle>
              <CardDescription>AI-powered research on clients and companies before you bid.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><Link href="/dashboard/bidai/research">Research client</Link></Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Analytics</CardTitle>
              <CardDescription>Win rate, response rate, and proposal performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Connect your freelance platform or log outcomes to see analytics.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileCode className="h-5 w-5" /> Templates</CardTitle>
              <CardDescription>Reusable proposal templates by niche.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm">Web dev</Button>
                <Button variant="outline" size="sm">Design</Button>
                <Button variant="outline" size="sm">Writing</Button>
                <Button variant="outline" size="sm">Marketing</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
