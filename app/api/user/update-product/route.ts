import { getCurrentUserId } from '@/lib/auth-server';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/user';

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { primaryProduct } = body;

    if (!primaryProduct || !['edtech', 'resume', 'bidai', 'affiliates'].includes(primaryProduct)) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    try {
      await connectDB();
      await User.findByIdAndUpdate(userId, { primaryProduct });
      return NextResponse.json({ success: true });
    } catch (dbError: any) {
      // Provide helpful error message for MongoDB connection issues
      const errorMessage = dbError?.message || '';
      const isConnectionError = 
        errorMessage.includes('whitelist') || 
        errorMessage.includes('connect') ||
        errorMessage.includes('MongooseServerSelectionError') ||
        errorMessage.includes('ReplicaSetNoPrimary') ||
        errorMessage.includes('timeout');

      if (isConnectionError) {
        console.error('MongoDB connection error:', errorMessage);
        return NextResponse.json(
          { 
            error: 'MongoDB connection failed',
            message: 'Please whitelist your IP address in MongoDB Atlas Network Access settings.',
            helpUrl: 'https://docs.atlas.mongodb.com/security-whitelist/',
            details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
          },
          { status: 503 }
        );
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update product', 
        message: error.message || 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}
