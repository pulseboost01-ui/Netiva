import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/user';

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const existing = await User.findOne({ email: session.user.email });
    if (existing) {
      await User.updateOne(
        { email: session.user.email },
        { $set: { name: session.user.name ?? undefined, image: session.user.image ?? undefined } }
      );
      return NextResponse.json({ ok: true, updated: true });
    }
    await User.create({
      email: session.user.email,
      name: session.user.name ?? null,
      image: session.user.image ?? null,
      role: 'user',
    });
    return NextResponse.json({ ok: true, created: true });
  } catch (e) {
    console.error('Sync user error', e);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
