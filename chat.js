export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { messages } = req.body;

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content: 'You are Mallu AI, a friendly Kerala assistant. Reply in Malayalam, Manglish or English, matching how the user writes.'
        },
        ...messages
      ]
    })
  });

  const data = await r.json();
  res.status(r.status).json({
    reply: data.choices?.[0]?.message?.content ?? 'Something went wrong.'
  });
}
