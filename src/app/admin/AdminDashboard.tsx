'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import type { DashboardMetrics } from '@/lib/metrics'

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="border border-chalk-line bg-white p-5"><p className="text-xs uppercase tracking-wide text-ink-soft">{label}</p><p className="scoreline mt-2 text-3xl text-pitch">{value.toLocaleString()}</p></div>
}

export default function AdminDashboard({ initialMetrics, email }: { initialMetrics: DashboardMetrics; email: string }) {
  const [metrics, setMetrics] = useState(initialMetrics)
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setLoading(true)
    const response = await fetch('/api/admin/metrics', { cache: 'no-store' })
    if (response.ok) setMetrics(await response.json())
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-chalk">
      <header className="border-b border-chalk-line bg-pitch text-white">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-5">
          <div><p className="scoreline text-xs uppercase text-floodlight">Control room</p><h1 className="mt-1 text-3xl text-white">Platform dashboard</h1><p className="mt-1 text-sm text-white/70">Signed in as {email}</p></div>
          <div className="flex gap-3"><button onClick={refresh} className="rounded border border-white/30 px-4 py-2 text-sm hover:border-floodlight hover:text-floodlight">{loading ? 'Refreshing...' : 'Refresh data'}</button><button onClick={() => signOut({ callbackUrl: '/' })} className="rounded bg-floodlight px-4 py-2 text-sm font-semibold text-ink hover:bg-white">Sign out</button></div>
        </div>
      </header>
      <div className="container py-10">
        {!metrics.configured && <div className="mb-8 border border-floodlight bg-floodlight/10 p-4 text-sm text-ink">MongoDB is not configured yet. Add `MONGODB_URI` and `MONGODB_DB` to start collecting dashboard metrics.</div>}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <Stat label="Page views" value={metrics.totals.pageview || 0} />
          <Stat label="API requests" value={metrics.totals.api_request || 0} />
          <Stat label="Errors" value={metrics.totals.error || 0} />
          <Stat label="Affiliate clicks" value={metrics.totals.affiliate_click || 0} />
          <Stat label="Ad events" value={metrics.totals.ad_event || 0} />
        </section>
        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="border border-chalk-line bg-white p-6"><h2 className="text-xl">Top pages, last 30 days</h2><div className="mt-5 space-y-3">{metrics.topPages.length ? metrics.topPages.map((page) => <div key={page._id} className="flex justify-between border-b border-chalk-line py-2 text-sm"><span>{page._id || '/'}</span><strong>{page.views.toLocaleString()}</strong></div>) : <p className="text-sm text-ink-soft">No page-view events yet.</p>}</div></div>
          <div className="border border-chalk-line bg-white p-6"><h2 className="text-xl">Daily activity</h2><div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-chalk-line text-ink-soft"><th className="py-2">Date</th><th>Views</th><th>API</th><th>Errors</th></tr></thead><tbody>{metrics.daily.slice(-14).map((day) => <tr key={day._id} className="border-b border-chalk-line/60"><td className="py-2">{day._id}</td><td>{day.pageviews}</td><td>{day.apiRequests}</td><td>{day.errors}</td></tr>)}</tbody></table></div></div>
        </section>
        <section className="mt-8 border border-chalk-line bg-white p-6"><h2 className="text-xl">Recent errors</h2><div className="mt-5 space-y-3">{metrics.recentErrors.length ? metrics.recentErrors.map((error, index) => <div key={`${error.path}-${index}`} className="border-l-2 border-card-red pl-3 text-sm"><p className="font-semibold">{error.path || 'Unknown path'} {error.provider ? `· ${error.provider}` : ''}</p><p className="text-ink-soft">{error.metadata ? JSON.stringify(error.metadata) : 'No additional details'}</p></div>) : <p className="text-sm text-ink-soft">No recorded errors.</p>}</div></section>
      </div>
    </main>
  )
}
