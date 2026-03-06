import mongoose from 'mongoose';

export type SubscriptionPlan = 'free' | 'pro' | 'elite' | 'lifetime';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    plan: { type: String, enum: ['free', 'pro', 'elite', 'lifetime'], default: 'free' },
    status: { type: String, enum: ['active', 'canceled', 'past_due', 'trialing'], default: 'active' },
    stripeSubscriptionId: { type: String, index: true },
    stripeCustomerId: { type: String, index: true },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    cancelAtPeriodEnd: { type: Boolean, default: false },
    whiteLabelEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Subscription = mongoose.models.Subscription ?? mongoose.model('Subscription', SubscriptionSchema);
