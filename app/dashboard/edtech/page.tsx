import Link from 'next/link';
import { GraduationCap, Users, BookOpen, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function EdTechDashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            EdTech SMS
          </h1>
          <p className="text-muted-foreground">School management, parent app, admin pages, student tracking.</p>
        </div>
        <Button asChild><Link href="/dashboard/edtech/settings">Settings</Link></Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="parents">Parent app</TabsTrigger>
          <TabsTrigger value="pages">Editable pages</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Schools</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Connected institutions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Tracked students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Parent app</CardTitle>
                <Badge variant="secondary">Preview</Badge>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/edtech/parent-preview">Open preview</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Admin pages</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/edtech/pages">Edit pages</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick start</CardTitle>
              <CardDescription>Add your first school, configure the parent app, and create editable content pages.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><Link href="/dashboard/edtech/setup">Setup wizard</Link></Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schools">Connect schools and manage institutions from here.</TabsContent>
        <TabsContent value="parents">Parent app preview and customization.</TabsContent>
        <TabsContent value="pages">Admin-editable pages for your schools.</TabsContent>
      </Tabs>
    </div>
  );
}
