import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/sign-in' },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
    '/profile/:path*',
  ],
};
