export async function chatWithGroq(messages: { role: string; content: string }[], context: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen/qwen3.8-27b',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant on Ashish Kumar Singh's portfolio website. Answer questions about Ashish based on the following information. Be friendly, concise, and professional. If asked something not covered below, say you don't have that information and suggest contacting Ashish directly.\n\n${context}`,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 512,
      stream: true,
    }),
  });
  return response;
}
