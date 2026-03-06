import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

type PrimaryProduct = 'edtech' | 'resume' | 'bidai' | 'affiliates';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user?.email) {
        // Sync user to database (non-blocking - don't fail auth if DB is unavailable)
        try {
          const { connectDB } = await import('@/lib/mongodb');
          const { User } = await import('@/lib/models/user');
          
          // Try to connect with timeout
          const connectionPromise = connectDB();
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout')), 5000)
          );
          
          await Promise.race([connectionPromise, timeoutPromise]);
          
          const existing = await User.findOne({ email: user.email });
          if (!existing) {
            await User.create({
              email: user.email,
              name: user.name ?? null,
              image: user.image ?? null,
              role: 'user',
              primaryProduct: null,
            });
          }
        } catch (error: any) {
          // Log error but don't block authentication
          // MongoDB connection issues shouldn't prevent users from signing in
          if (process.env.NODE_ENV === 'development') {
            console.warn('User sync warning (non-blocking):', error?.message || error);
          }
        }
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        (session as { role?: string }).role = (token.role as string) ?? 'user';
      }
      (session as { primaryProduct?: PrimaryProduct | null }).primaryProduct =
        ((token as { primaryProduct?: PrimaryProduct | null }).primaryProduct ?? null);
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user?.id) token.sub = user.id;
      if (user) (token as { role?: string }).role = (user as { role?: string }).role ?? 'user';

      // Allow client-side session.update({ primaryProduct }) to persist in JWT
      if (trigger === 'update') {
        const next = (session as { primaryProduct?: string | null } | undefined)?.primaryProduct ?? null;
        if (next && ['edtech', 'resume', 'bidai', 'affiliates'].includes(next)) {
          (token as { primaryProduct?: PrimaryProduct | null }).primaryProduct = next as PrimaryProduct;
        }
      }

      return token;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};

declare module 'next-auth' {
  interface Session {
    user: { id: string; name?: string | null; email?: string | null; image?: string | null };
    role?: string;
    primaryProduct?: PrimaryProduct | null;
  }
}
