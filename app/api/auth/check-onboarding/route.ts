import { getSession } from '@/lib/auth-server';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/user';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return NextResponse.json({ needsOnboarding: false });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    
    return NextResponse.json({ 
      needsOnboarding: !user?.primaryProduct,
      primaryProduct: user?.primaryProduct || null,
    });
  } catch (error) {
    console.error('Check onboarding error:', error);
    return NextResponse.json({ needsOnboarding: false });
  }
}
