import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session?.user) redirect('/sign-in');

  const { user } = session;
  const role = (session as { role?: string }).role ?? 'user';

  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback className="text-xl">{(user.name ?? user.email)?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name ?? 'User'}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <Badge variant="secondary" className="mt-1">{role}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Signed in with Google. Your profile is shared across EdTech SMS, ResumeRocket AI, BidAI Pro, and Affiliates Omega.
            Change preferences from each product dashboard or contact support for role updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
