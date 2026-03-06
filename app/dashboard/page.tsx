import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/user';
import Link from 'next/link';
import { Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) redirect('/sign-in');

  // Prefer primaryProduct stored in the session/JWT.
  let primaryProduct: string | null = (session as { primaryProduct?: string | null }).primaryProduct ?? null;

  // Fallback to MongoDB if session doesn't have it.
  if (!primaryProduct) {
    try {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      primaryProduct = user?.primaryProduct || null;
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('MongoDB connection failed in dashboard page:', error?.message);
      }
      primaryProduct = null;
    }
  }
  
  if (!primaryProduct) {
    redirect('/onboarding');
  }

  // Redirect to the selected product dashboard
  redirect(`/dashboard/${primaryProduct}`);
}
