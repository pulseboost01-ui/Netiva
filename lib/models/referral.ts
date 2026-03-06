import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema(
  {
    referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    referredUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    referredEmail: String,
    code: { type: String, required: true },
    status: { type: String, enum: ['pending', 'signed_up', 'paid'], default: 'pending' },
    creditAmount: { type: Number, default: 50 },
    paidAt: Date,
  },
  { timestamps: true }
);

ReferralSchema.index({ referrerId: 1 });
ReferralSchema.index({ code: 1 });

export const Referral = mongoose.models.Referral ?? mongoose.model('Referral', ReferralSchema);
