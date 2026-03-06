'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Github } from 'lucide-react';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 533.5 544.3"
      {...props}
    >
      <path
        fill="#4285F4"
        d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.2H272v95h146.9c-6.4 34.7-25.2 64.1-53.7 83.8l86.7 67.5c50.7-46.8 80.6-115.5 80.6-196.1z"
      />
      <path
        fill="#34A853"
        d="M272 544.3c72.6 0 133.6-24.1 178.2-65.3l-86.7-67.5c-24.1 16.2-55 25.6-91.5 25.6-70.3 0-129.8-47.5-151.2-111.4l-88.1 68.1c43.7 86.5 133.1 150.5 239.3 150.5z"
      />
      <path
        fill="#FBBC05"
        d="M120.8 325.7c-10.8-32.5-10.8-67.9 0-100.4l-88.1-68.1c-38.9 76-38.9 166.8 0 242.8l88.1-74.3z"
      />
      <path
        fill="#EA4335"
        d="M272 107.7c39.6-.6 78.4 14.4 107.8 41.6l80.9-80.9C406 24 343.8-1.4 272 0 165.8 0 76.4 64 32.7 150.5l88.1 68.1c21.4-63.9 80.9-111.4 151.2-110.9z"
      />
    </svg>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // open modal when page mounts
    setOpen(true);
  }, []);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      // if user closes modal, navigate back home
      router.push('/');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black p-6 overflow-hidden">
      {/* Background decorations retained from previous design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="glass-card p-12 rounded-[40px] border border-white/10 text-center max-w-md">
          <DialogHeader>
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-black font-black text-2xl leading-none">N</span>
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">Netiva</span>
            </Link>
            <DialogTitle className="text-3xl font-display font-bold">Welcome Back</DialogTitle>
            <DialogDescription className="text-sm text-white/40">
              One account. Four high-fidelity AI platforms. Sign in to continue your journey.
            </DialogDescription>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mt-8"
          >
            <Button
              className="w-full flex items-center justify-center py-3 rounded-2xl bg-white text-black hover:bg-white/90 text-lg font-bold shadow-xl transition-all active:scale-[0.98]"
              onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
            >
              <GoogleIcon className="w-5 h-5 mr-2" />
              Sign in with Google
            </Button>
            <Button
              className="w-full flex items-center justify-center py-3 rounded-2xl bg-white text-black hover:bg-white/90 text-lg font-bold shadow-xl transition-all active:scale-[0.98]"
              onClick={() => signIn('github', { callbackUrl: '/onboarding' })}
            >
              <Github className="w-5 h-5 mr-2" />
              Sign in with GitHub
            </Button>
            {/* Additional providers can be added here */}
          </motion.div>

          <DialogFooter>
            <p className="mt-10 text-center text-[10px] uppercase tracking-widest font-black text-black/20">
              Powered by Netiva Universal Auth
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
