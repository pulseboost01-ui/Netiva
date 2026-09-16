import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions, ADMIN_EMAIL } from '@/lib/auth'
import { getDashboardMetrics } from '@/lib/metrics'
import AdminDashboard from './AdminDashboard'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.isAdmin) redirect('/admin/sign-in')

  const metrics = await getDashboardMetrics()
  return <AdminDashboard initialMetrics={metrics} email={ADMIN_EMAIL} />
}
