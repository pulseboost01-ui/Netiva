import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: String, enum: ['edtech', 'resume', 'bidai', 'affiliates'], required: true },
    event: { type: String, required: true },
    value: Number,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

AnalyticsSchema.index({ userId: 1, product: 1, createdAt: -1 });
AnalyticsSchema.index({ event: 1, createdAt: -1 });

export const Analytics = mongoose.models.Analytics ?? mongoose.model('Analytics', AnalyticsSchema);
