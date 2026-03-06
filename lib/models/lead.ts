import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: String, enum: ['edtech', 'resume', 'bidai', 'affiliates'], required: true },
    source: String,
    email: String,
    name: String,
    data: mongoose.Schema.Types.Mixed,
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'converted'], default: 'new' },
  },
  { timestamps: true }
);

LeadSchema.index({ userId: 1, product: 1 });
LeadSchema.index({ createdAt: -1 });

export const Lead = mongoose.models.Lead ?? mongoose.model('Lead', LeadSchema);
