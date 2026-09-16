import { NextRequest, NextResponse } from 'next/server'
import { recordMetric, MetricKind } from '@/lib/metrics'

const allowedKinds: MetricKind[] = ['pageview', 'affiliate_click', 'ad_event', 'error']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!allowedKinds.includes(body.kind)) return NextResponse.json({ error: 'Invalid metric kind' }, { status: 400 })

    await recordMetric({
      kind: body.kind,
      path: typeof body.path === 'string' ? body.path.slice(0, 300) : undefined,
      provider: typeof body.provider === 'string' ? body.provider.slice(0, 100) : undefined,
      metadata: typeof body.metadata === 'object' && body.metadata ? body.metadata : undefined,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
