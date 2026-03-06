import { getCurrentUserId } from '@/lib/auth-server';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PLANS } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }
  const body = await req.json();
  const plan = (body.plan as keyof typeof PLANS) ?? 'pro';
  const priceId = PLANS[plan]?.priceId;
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }
  const origin = req.headers.get('origin') ?? 'http://localhost:3000';
  try {
    const session = await stripe.checkout.sessions.create({
      mode: plan === 'lifetime' ? 'payment' : 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/#pricing`,
      client_reference_id: userId,
      metadata: { plan },
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('Checkout error', e);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
