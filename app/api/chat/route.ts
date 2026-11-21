import { NextRequest } from 'next/server';
import { getChatbotContext } from '@/lib/content';
import { chatWithGroqStream } from '@/lib/groq';

export const dynamic = 'force-dynamic';

function getFallbackAnswer(lastMsg: string): string {
  const query = lastMsg.toLowerCase();

  if (query.includes('trackit') || query.includes('overhead') || query.includes('proc')) {
    return `### Trackit Low-Overhead Architecture & Benchmarks

Trackit is an ultra-lightweight Linux system monitor written in C++17 that operates at a **1.3% CPU footprint** and **89.4MB RSS**:

- **Direct Kernel Telemetry:** Reads from \`/proc/stat\`, \`/proc/meminfo\`, and \`/proc/[pid]/stat\` directly using fixed-size POSIX buffers, avoiding any \`fork()\` or child process spawning overhead.
- **Concurrent Polling Engine:** A dedicated telemetry thread polls kernel counters every 500ms and writes delta metrics into an atomic ring buffer without blocking the render pipeline.
- **Zero-Allocation Parsing:** State strings are parsed in-place using pointer arithmetic and \`std::string_view\` without heap allocations in the hot loop.
- **Hardware-Accelerated UI:** Renders scrolling load curves and process tables at 60 FPS using **Dear ImGui** and modern **OpenGL 3.3** draw calls.
- **Repository:** Check out the source at [github.com/Ashish-331/Trackit](https://github.com/Ashish-331/Trackit).`;
  }

  if (query.includes('panopteez') || query.includes('cluster') || query.includes('distributed')) {
    return `### Panopteez Distributed Observability Pipeline

Panopteez is an end-to-end distributed telemetry and metric aggregation system:

- **Host Daemons (C++):** Lightweight daemon processes deployed across monitored nodes gather CPU, memory, and disk load and stream authenticated JSON payloads.
- **Ingestion Gateway (Node/Express):** High-throughput REST API with token-bucket rate limiting and schema validation to ingest time-series telemetry packets.
- **Persistence Layer (PostgreSQL & Prisma):** Multi-row batching into partitioned tables with composite indexes on \`(node_id, timestamp)\` for sliding-window analytics.
- **Topology:** Orchestrated as a 5-node cluster (4 telemetry agents + 1 central collector + PostgreSQL database) using Docker Compose.
- **Repository:** Explore the source at [github.com/Ashish-331/Panopteez](https://github.com/Ashish-331/Panopteez).`;
  }

  if (query.includes('competitive') || query.includes('rating') || query.includes('leetcode') || query.includes('codechef')) {
    return `### Competitive Programming & Problem Solving

Ashish practices competitive programming with a focus on data structures, graph algorithms, and amortized efficiency:

- **LeetCode:** **350+ Problems Solved** across Arrays, Binary Trees, Dynamic Programming, Graphs, and Heaps ([leetcode.com/u/ashish-331](https://leetcode.com/u/ashish-331/)).
- **CodeChef:** **Global Rank 418** in Starters 251 out of thousands of competitors ([codechef.com/users/ashish_331](https://www.codechef.com/users/ashish_331)). 250+ solved.
- **Academic Foundation:** Ranked in the **Top 1.34% nationally** in JEE Main 2024 out of 1.5M+ candidates. Current CGPA: **8.94 / 10.0** at NIT Agartala.`;
  }

  if (query.includes('strength') || query.includes('hire') || query.includes('intern') || query.includes('why')) {
    return `### Core Engineering Strengths

Why Ashish is an exceptional candidate for Systems & Backend Engineering roles:

1. **Kernel & POSIX Intuition:** Unlike developers who rely exclusively on high-level wrappers, Ashish understands Linux kernel interfaces, memory mappings, and system call boundaries.
2. **Proven Low-Resource Architecture:** Built Trackit to run at 1.3% CPU by bypassing fork costs and eliminating runtime heap churn.
3. **End-to-End Distributed Systems:** Designed Panopteez from C++ daemon metrics gathering through containerized Express ingestion to relational storage.
4. **Leadership & Communication:** President of the Data Science & AI Club (leading 50+ peers) and SIH 2025 college round winner leading a 6-member team.
5. **Availability:** Actively seeking **Summer 2025 / 2026 Systems & Backend Software Engineering Internships**.`;
  }

  return `### Ashish Kumar Singh — Systems & Backend Engineer

- **Education:** 3rd Year B.Tech CSE @ National Institute of Technology Agartala (**CGPA: 8.94 / 10.0**).
- **Core Specialization:** Low-overhead Linux systems programming in C++17, kernel \`/proc\` parsing, distributed backend telemetry, and containerization.
- **Featured Projects:**
  - **Trackit:** Real-time Linux monitor in C++17, Dear ImGui & OpenGL 3.3 (1.3% CPU, 89.4MB RSS).
  - **Panopteez:** 5-node distributed metric pipeline with C++ daemons, Node/Express, and PostgreSQL.
  - **AI Farmers Assistant:** SIH 2025 college winner (6-member team leader).
- **Contact:** [ashishsingh.cpr.edu@gmail.com](mailto:ashishsingh.cpr.edu@gmail.com) • [LinkedIn](https://www.linkedin.com/in/ashish-1-singh/) • [GitHub](https://github.com/Ashish-331)`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMsg = messages[messages.length - 1]?.content || '';
    const apiKey = process.env.GROQ_API_KEY;

    // If Groq API key is present and valid, try streaming live from Groq
    if (apiKey && apiKey !== 'placeholder' && !apiKey.startsWith('gsk_your')) {
      try {
        const context = getChatbotContext();
        const groqRes = await chatWithGroqStream(messages, context, apiKey);
        if (groqRes.ok && groqRes.body) {
          return new Response(groqRes.body, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          });
        }
      } catch {
        // Fall back to built-in telemetry response engine
      }
    }

    // High-performance built-in SSE streaming engine for instant, reliable terminal replies
    const answer = getFallbackAnswer(lastMsg);
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        // Split into natural word/line tokens for realistic smooth typing effect
        const words = answer.split(/(\s+)/);
        for (const token of words) {
          const payload = JSON.stringify({
            choices: [{ delta: { content: token } }],
          });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          await new Promise((r) => setTimeout(r, 12));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(stream, {
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
