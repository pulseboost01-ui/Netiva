import Stripe from 'stripe';

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null;

export const PLANS = {
  free: { priceId: null, name: 'Free' },
  pro: { priceId: process.env.STRIPE_PRICE_PRO ?? 'price_pro', name: 'Pro' },
  elite: { priceId: process.env.STRIPE_PRICE_ELITE ?? 'price_elite', name: 'Elite' },
  lifetime: { priceId: process.env.STRIPE_PRICE_LIFETIME ?? 'price_lifetime', name: 'Lifetime' },
} as const;
