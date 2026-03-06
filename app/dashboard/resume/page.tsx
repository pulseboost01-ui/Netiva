import Link from 'next/link';
import { FileText, Briefcase, MessageSquare, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function ResumeDashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          ResumeRocket AI
        </h1>
        <p className="text-muted-foreground">AI resume & cover builder, job tracker, interview prep, ATS scorer.</p>
      </div>

      <Tabs defaultValue="resume">
        <TabsList className="mb-6">
          <TabsTrigger value="resume">Resume / Cover</TabsTrigger>
          <TabsTrigger value="jobs">Job tracker</TabsTrigger>
          <TabsTrigger value="interview">Interview prep</TabsTrigger>
          <TabsTrigger value="ats">ATS scorer</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Resume Builder</CardTitle>
                <CardDescription>Create or improve your resume with AI. Pick a template and we&apos;ll optimize for ATS.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild><Link href="/dashboard/resume/builder">Start building</Link></Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cover letter</CardTitle>
                <CardDescription>Generate tailored cover letters from your resume and job description.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild><Link href="/dashboard/resume/cover">Generate cover letter</Link></Button>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Professional templates optimized for applicant tracking systems.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <Button variant="outline" size="sm">Modern</Button>
                <Button variant="outline" size="sm">Classic</Button>
                <Button variant="outline" size="sm">Minimal</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" /> Job tracker</CardTitle>
              <CardDescription>Track applications and pipeline.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No jobs yet. Add your first application from the Resume builder or here.</p>
              <Button className="mt-4" asChild><Link href="/dashboard/resume/jobs">Add application</Link></Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="interview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Interview prep</CardTitle>
              <CardDescription>Practice questions and get AI feedback.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><Link href="/dashboard/resume/interview">Start prep</Link></Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ats">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" /> ATS score</CardTitle>
              <CardDescription>See how your resume scores against job descriptions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">Upload a resume and job description to get a score.</p>
                <Progress value={0} className="h-2" />
                <Button asChild><Link href="/dashboard/resume/ats">Check ATS score</Link></Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
