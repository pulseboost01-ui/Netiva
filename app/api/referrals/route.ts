import { getCurrentUserId } from '@/lib/auth-server';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const REFERRAL_CREDIT = 50; // $50 credit per paid referral

export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const limiter = rateLimit(userId);
  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  // TODO: fetch from MongoDB Referral model where referrerId = userId
  const suffix = userId.length >= 8 ? userId.slice(-8) : userId;
  return NextResponse.json({
    code: `NETIVA-${suffix.toUpperCase().replace(/[^A-Z0-9]/g, '0')}`,
    credits: 0,
    totalReferrals: 0,
    creditPerReferral: REFERRAL_CREDIT,
  });
}
