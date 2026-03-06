const SYSTEM_PROMPT = `You are Netiva AI, a 30-year expert in education, careers, freelance, affiliates, and business growth. Generate {output_type} for {product} based on {user_input} with quantifiable results, personalized insights, and scalable suggestions. Be concise and actionable.`;

export function buildNetivaPrompt(params: {
  output_type: string;
  product: string;
  user_input: string;
}) {
  return SYSTEM_PROMPT
    .replace('{output_type}', params.output_type)
    .replace('{product}', params.product)
    .replace('{user_input}', params.user_input);
}

export async function streamOpenAI(
  prompt: string,
  userContent: string,
  options?: { model?: string; max_tokens?: number }
) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(JSON.stringify({ error: 'OpenAI API key not configured' })));
        controller.close();
      },
    });
  }
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: options?.model ?? 'gpt-4o-mini',
      max_tokens: options?.max_tokens ?? 1024,
      stream: true,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: userContent },
      ],
    }),
  });
  if (!res.ok || !res.body) {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(JSON.stringify({ error: 'OpenAI request failed' })));
        controller.close();
      },
    });
  }
  return res.body;
}
