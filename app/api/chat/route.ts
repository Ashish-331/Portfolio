import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const contextPath = path.join(process.cwd(), 'content', 'chatbot-context.md');
    const context = fs.readFileSync(contextPath, 'utf-8');

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Groq API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
            content: `You are Ashish Kumar Singh's interactive portfolio assistant for interviewers and recruiters. Answer questions accurately, concisely, and professionally using the context below. Highlight his systems programming expertise (C++, Linux /proc, Trackit), backend/metrics engineering (Panopteez, Node/Express, PostgreSQL, Docker), academic excellence (8.94 CGPA at NIT Agartala), and technical leadership (President of Data Science & AI Club). Keep answers crisp and formatted with markdown if needed.\n\nContext:\n${context}`,
          },
          ...messages,
        ],
        temperature: 0.6,
        max_tokens: 600,
        stream: true,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return new Response(JSON.stringify({ error: `Groq error: ${errText}` }), {
        status: groqRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(groqRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
