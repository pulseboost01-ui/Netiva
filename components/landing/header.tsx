'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { GraduationCap, FileText, MessageSquare, Users, User, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const products = [
  { name: 'EdTech SMS', href: '/dashboard/edtech', icon: GraduationCap },
  { name: 'ResumeRocket AI', href: '/dashboard/resume', icon: FileText },
  { name: 'BidAI Pro', href: '/dashboard/bidai', icon: MessageSquare },
  { name: 'Affiliates Omega', href: '/dashboard/affiliates', icon: Users },
];

const MotionHeader = motion.header;

export function Header() {
  const { data: session, status } = useSession();
  const isSignedIn = status === 'authenticated' && !!session?.user;

  return (
    <MotionHeader
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 right-0 top-0 z-50 w-full glass border-b border-white/[0.08]"
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Netiva
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/products">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/5">Products</Button>
          </Link>
          <Link href="/solutions">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/5">Solutions</Button>
          </Link>
          <Link href="/resources">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/5">Resources</Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border border-white/10 hover:bg-white/5">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image ?? undefined} />
                    <AvatarFallback className="bg-white/10 text-white">{(session?.user?.name ?? session?.user?.email)?.[0] ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 glass border-white/10 bg-black/80 backdrop-blur-xl">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="text-white/90">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {products.map((p) => (
                  <DropdownMenuItem key={p.href} asChild>
                    <Link href={p.href} className="text-white/90">{p.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="text-white/90">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="text-white/90">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-white/80 hover:text-white hover:bg-white/5">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 btn-glow transition-all duration-300 hover:scale-[1.02]"
              >
                <Link href="/sign-in">Get Started Free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </MotionHeader>
  );
}
