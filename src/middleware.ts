import { withAuth } from 'next-auth/middleware'

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET || 'local-development-secret-change-me',
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname === '/admin/sign-in') return true
      return token?.email?.toLowerCase() === 'mitalasamuel5@gmail.com' && token.isAdmin === true
    },
  },
  pages: { signIn: '/admin/sign-in' },
})

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
