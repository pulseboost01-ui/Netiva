import { getCurrentUserId } from '@/lib/auth-server';
import { NextRequest, NextResponse } from 'next/server';
import { buildNetivaPrompt, streamOpenAI } from '@/lib/ai-prompt';
import { sanitizeInput } from '@/lib/utils';
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const id = userId ?? getClientIdentifier(req.headers);
    const limiter = rateLimit(id);
    if (!limiter.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const product = sanitizeInput(String(body.product ?? 'netiva'));
    const outputType = sanitizeInput(String(body.output_type ?? 'response'));
    const userInput = sanitizeInput(String(body.user_input ?? '').slice(0, 4000));

    const systemPrompt = buildNetivaPrompt({ output_type: outputType, product, user_input: userInput });
    const stream = await streamOpenAI(systemPrompt, userInput);

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-RateLimit-Remaining': String(limiter.remaining),
      },
    });
  } catch (e) {
    console.error('AI generate error', e);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
