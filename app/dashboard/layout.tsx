import * as React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/user';
import Link from 'next/link';
import { LayoutDashboard, User as UserIcon, Settings, BarChart3, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PremiumHeader } from '@/components/landing/premium-header';
import { ProductSwitcher } from '@/components/dashboard/product-switcher';

const nav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/referrals', label: 'Referrals', icon: Gift },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session?.user) redirect('/sign-in');

  // Prefer primaryProduct stored in the session/JWT so the app works even if MongoDB is down.
  let primaryProduct: string | null = (session as { primaryProduct?: string | null }).primaryProduct ?? null;

  // If it's not in the session (older cookie), try MongoDB.
  if (!primaryProduct) {
    try {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      primaryProduct = user?.primaryProduct || null;
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('MongoDB connection failed in dashboard layout:', error?.message);
      }
      primaryProduct = null;
    }
  }
  
  // If no primary product selected, redirect to onboarding
  if (!primaryProduct) {
    redirect('/onboarding');
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PremiumHeader />
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-background">
          <div className="p-4 border-b">
            <ProductSwitcher currentProduct={primaryProduct} />
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            <Link href="/profile">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <UserIcon className="h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
