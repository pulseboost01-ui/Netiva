import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit';
import { sanitizeInput } from '@/lib/utils';

const JSEARCH_API = 'https://jsearch.p.rapidapi.com/search';

export async function GET(req: NextRequest) {
  const id = getClientIdentifier(req.headers);
  const limiter = rateLimit(id);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const query = sanitizeInput(req.nextUrl.searchParams.get('q') ?? 'developer');
  const rapidKey = process.env.RAPIDAPI_KEY;
  if (!rapidKey) {
    return NextResponse.json({ jobs: [], message: 'Job API not configured' });
  }
  try {
    const res = await fetch(`${JSEARCH_API}?query=${encodeURIComponent(query)}&num_pages=1`, {
      headers: { 'X-RapidAPI-Key': rapidKey, 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com' },
    });
    const data = await res.json();
    return NextResponse.json({ jobs: data.data ?? [] });
  } catch (e) {
    return NextResponse.json({ jobs: [], error: 'Fetch failed' }, { status: 500 });
  }
}
