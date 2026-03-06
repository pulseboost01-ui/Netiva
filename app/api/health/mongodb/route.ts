import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    const message = error?.message ?? String(error);
    return NextResponse.json(
      {
        ok: false,
        error: 'MongoDB connection failed',
        message,
        hint: 'Check MongoDB Atlas Network Access (IP whitelist), VPN, and outbound port 27017.',
      },
      { status: 503 }
    );
  }
}

