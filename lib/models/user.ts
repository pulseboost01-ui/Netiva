import mongoose from 'mongoose';

export type Role = 'user' | 'admin' | 'white-label';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: String,
    image: String,
    role: { type: String, enum: ['user', 'admin', 'white-label'], default: 'user' },
    primaryProduct: { type: String, enum: ['edtech', 'resume', 'bidai', 'affiliates'], default: null },
    stripeCustomerId: { type: String, index: true },
    subscriptionPlan: { type: String, enum: ['free', 'pro', 'elite', 'lifetime'], default: 'free' },
    whiteLabelEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.models.User ?? mongoose.model('User', UserSchema);
