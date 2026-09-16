import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const ADMIN_EMAIL = 'mitalasamuel5@gmail.com'
const authSecret = process.env.NEXTAUTH_SECRET || 'local-development-secret-change-me'

function getAdminPasswordHash() {
  if (process.env.ADMIN_PASSWORD_HASH_B64) {
    return Buffer.from(process.env.ADMIN_PASSWORD_HASH_B64, 'base64').toString('utf8')
  }
  return process.env.ADMIN_PASSWORD_HASH
}

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  providers: [
    CredentialsProvider({
      name: 'Admin password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase()
        const password = credentials?.password
        const passwordHash = getAdminPasswordHash()
        if (!email || !password || email !== ADMIN_EMAIL || !passwordHash) return null
        const valid = await bcrypt.compare(password, passwordHash)
        return valid ? { id: ADMIN_EMAIL, email: ADMIN_EMAIL, isAdmin: true } : null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/sign-in' },
  callbacks: {
    async signIn({ user }) {
      return user.email?.toLowerCase() === ADMIN_EMAIL
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email
      token.isAdmin = token.email?.toLowerCase() === ADMIN_EMAIL
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
        session.user.isAdmin = token.isAdmin === true
      }
      return session
    },
  },
}
