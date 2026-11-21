export async function chatWithGroqStream(
  messages: { role: string; content: string }[],
  context: string,
  apiKey: string
) {
  return fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen/qwen3.8-27b',
      messages: [
        {
          role: 'system',
          content: `You are Ashish Kumar Singh's interactive AI Portfolio Assistant for recruiters, engineering managers, and technical peers. Answer questions accurately, concisely, and with high technical depth using the context below. Highlight his systems programming expertise (C++, Linux /proc filesystem parsing, Trackit, Dear ImGui), distributed backend engineering (Panopteez, Node/Express, PostgreSQL, Prisma, Docker Compose), competitive programming milestones (LeetCode 350+, CodeChef Global Rank 418), academic excellence (8.94 CGPA @ NIT Agartala, JEE Main top 1.34%), and engineering leadership (President of Data Science & AI Club leading 50+ members). Keep answers crisp and formatted with markdown (bullet points, code snippets, bold tags).\n\nContext:\n${context}`,
        },
        ...messages,
      ],
      temperature: 0.6,
      max_tokens: 650,
      stream: true,
    }),
  });
}