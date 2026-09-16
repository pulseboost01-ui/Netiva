import { getMetricsCollection } from './mongodb'

export type MetricKind = 'pageview' | 'api_request' | 'error' | 'affiliate_click' | 'ad_event'

export interface MetricEvent {
  kind: MetricKind
  path?: string
  provider?: string
  status?: number
  durationMs?: number
  metadata?: Record<string, string | number | boolean | null>
  createdAt: Date
}

export interface DashboardMetrics {
  configured: boolean
  totals: Record<string, number>
  daily: Array<{ _id: string; pageviews: number; apiRequests: number; errors: number }>
  topPages: Array<{ _id: string; views: number }>
  recentErrors: Array<{ path?: string; provider?: string; metadata?: Record<string, unknown>; createdAt?: Date }>
}

export async function recordMetric(event: Omit<MetricEvent, 'createdAt'>) {
  try {
    const collection = await getMetricsCollection()
    if (!collection) return
    await collection.insertOne({ ...event, createdAt: new Date() })
  } catch (error) {
    console.error('Failed to record metric:', error)
  }
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const collection = await getMetricsCollection()
  if (!collection) return { configured: false, totals: {}, daily: [], topPages: [], recentErrors: [] }

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const [totals, daily, topPages, recentErrors] = await Promise.all([
    collection.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: '$kind', count: { $sum: 1 } } },
    ]).toArray(),
    collection.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, pageviews: { $sum: { $cond: [{ $eq: ['$kind', 'pageview'] }, 1, 0] } }, apiRequests: { $sum: { $cond: [{ $eq: ['$kind', 'api_request'] }, 1, 0] } }, errors: { $sum: { $cond: [{ $eq: ['$kind', 'error'] }, 1, 0] } } } },
      { $sort: { _id: 1 } },
    ]).toArray(),
    collection.aggregate([
      { $match: { kind: 'pageview', createdAt: { $gte: since } } },
      { $group: { _id: '$path', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
    ]).toArray(),
    collection.find({ kind: 'error' }).sort({ createdAt: -1 }).limit(20).project({ _id: 0 }).toArray(),
  ])

  return {
    configured: true,
    totals: Object.fromEntries(totals.map((item) => [item._id, item.count])),
    daily: daily.map((item) => ({ _id: String(item._id), pageviews: Number(item.pageviews || 0), apiRequests: Number(item.apiRequests || 0), errors: Number(item.errors || 0) })),
    topPages: topPages.map((item) => ({ _id: String(item._id || ''), views: Number(item.views || 0) })),
    recentErrors: recentErrors as Array<{ path?: string; provider?: string; metadata?: Record<string, unknown>; createdAt?: Date }>,
  }
}
