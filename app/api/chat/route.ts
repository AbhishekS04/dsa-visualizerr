import type { NextRequest } from "next/server"
import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// In-memory storage for question count per session (use Redis/DB for production)
const sessionQuestionCount = new Map<string, number>()

// Per-IP daily limit (resets every UTC day)
type DailyCount = { count: number; dayKey: string }
const ipDailyCount = new Map<string, DailyCount>()

const MAX_QUESTIONS_SESSION = 36
const MAX_QUESTIONS_PER_IP_PER_DAY = 15

// DSA Topics and website features that are allowed
const DSA_TOPICS = [
  "array", "string", "linked list", "stack", "queue", "tree", "binary tree",
  "bst", "heap", "hash", "graph", "sorting", "searching", "recursion",
  "dynamic programming", "dp", "greedy", "backtracking", "divide and conquer",
  "time complexity", "space complexity", "big o", "algorithm", "data structure", "dsa",
  "bfs", "dfs", "dijkstra", "binary search", "merge sort", "quick sort",
  "bubble sort", "insertion sort", "selection sort", "trie", "segment tree",
  "avl", "red-black", "b-tree", "priority queue",
  // Website-specific keywords
  "visualizer", "platform", "website", "codedsa", "topic", "learn", "tutorial",
  "how to use", "access", "navigate", "feature", "tool", "practice"
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages = (body?.messages ?? []) as { role: "user" | "assistant"; content: string }[]
    const sessionId = body?.sessionId ?? "default"
    const ip = (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || (req as any).ip || "unknown") as string
    const dayKey = new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)

    // Get current question count for this session
    const currentCount = sessionQuestionCount.get(sessionId) ?? 0

    // Check if user has reached the question limit
    if (currentCount >= MAX_QUESTIONS_SESSION) {
      const message = `⚠️ You\'ve reached the maximum limit of ${MAX_QUESTIONS_SESSION} questions for this session. Please refresh the page to start a new session or continue exploring our DSA visualizers.`
      return new Response(message, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Questions-Remaining": "0",
          "X-Limit-Reached": "session",
        },
      })
    }

    // Per-IP daily limit
    const ipCount = ipDailyCount.get(ip)
    if (!ipCount || ipCount.dayKey !== dayKey) {
      ipDailyCount.set(ip, { count: 0, dayKey })
    }
    const updated = ipDailyCount.get(ip) as DailyCount
    if (updated.count >= MAX_QUESTIONS_PER_IP_PER_DAY) {
      const message = `🚫 Daily limit reached. You can ask up to ${MAX_QUESTIONS_PER_IP_PER_DAY} DSA questions per day from your IP. Please try again tomorrow.`
      return new Response(message, {
        status: 429,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Questions-Remaining": "0",
          "X-Limit-Reached": "ip",
        },
      })
    }

    // Get the latest user message
    const latestUserMessage = messages.filter(m => m.role === "user").pop()?.content.toLowerCase() ?? ""

    // Detect preferred language from the user's latest message
    const languageAliases: Record<string, string> = {
      javascript: 'javascript', js: 'javascript', typescript: 'typescript', ts: 'typescript',
      python: 'python', py: 'python', java: 'java', 'c++': 'cpp', cpp: 'cpp', c: 'c',
      'c#': 'csharp', csharp: 'csharp', go: 'go', golang: 'go', rust: 'rust', kotlin: 'kotlin',
      swift: 'swift', ruby: 'ruby', php: 'php'
    }
    let preferredLanguage = 'javascript'
    for (const [key, val] of Object.entries(languageAliases)) {
      if (latestUserMessage.includes(`in ${key}`) || latestUserMessage.includes(`${key} code`) || latestUserMessage.endsWith(key)) {
        preferredLanguage = val
        break
      }
    }

    // Check if the question is DSA-related (expanded heuristic)
    const EXTRA_ALGOS = [
      'two pointers', 'sliding window', 'kmp', 'karp-rabin', 'boyer-moore',
      'union find', 'disjoint set', 'mst', 'kruskal', 'prim', 'topological', 'toposort',
      'floyd-warshall', 'bellman-ford', 'kadane', 'prefix sum', 'binary indexed tree', 'fenwick',
      'monotonic stack', 'deque', 'lru', 'memoization', 'tabulation', 'bitmask', 'tries', 'suffix array',
      'segment tree', 'sparse table', 'fast power', 'modular', 'combinatorics'
    ]
    const isDSARelated = [...DSA_TOPICS, ...EXTRA_ALGOS].some(topic => latestUserMessage.includes(topic))
    
    // Detect non-DSA questions
    const nonDSAKeywords = [
      "weather", "cook", "recipe", "movie", "music", "sports", "news",
      "politics", "celebrity", "game", "fashion", "travel", "restaurant"
    ]
    const isNonDSA = nonDSAKeywords.some(keyword => latestUserMessage.includes(keyword))

    // Reject only if clearly non-DSA and not touching algorithms/DSA terms
    if (!isDSARelated && (isNonDSA || latestUserMessage.length > 40)) {
      const message = "I can only help with DSA topics (arrays, trees, graphs, DP, sorting/searching, etc.). Please re-ask with the specific algorithm or concept (e.g., ‘KMP in C++’, ‘Dijkstra in Python’)."
      return new Response(message, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Rejected": "true",
        },
      })
    }

    // DSA-focused system prompt for high-quality, structured chatbot responses
    const system = `You are a senior DSA (Data Structures & Algorithms) tutor chatbot.

Goals:
- Provide accurate, concise, and friendly explanations focused ONLY on DSA and algorithms.
- Prefer clarity over verbosity. Avoid filler and marketing language.
- When unsure or the question is ambiguous, ask 1 concise clarifying question first.

Style:
- Keep most answers under 180 words unless a step-by-step is essential.
- Use short paragraphs and bullet lists for readability.
- When helpful, include a minimal JavaScript example inside a code block.
- Always include time and space complexity when describing an algorithm.

Strict Policies:
- Decline non-DSA questions (politely) and redirect to DSA topics.
- Do NOT invent APIs, links, or data you don't have.
- If the user requests code, provide a compact, correct example.

Code-first rule:
- If the user explicitly asks for code/snippet/implementation and the request is clearly DSA-related, DO NOT ask clarifying questions. Respond immediately with a code-first answer following the template.

Response Template:
1) Direct answer in 1-3 sentences
2) Steps or reasoning (bullets)
3) Complexity (Big-O)
4) Optional: Minimal JS/TS code block labeled with the correct language, e.g., \`\`\`${preferredLanguage}\n...\n\`\`\`
5) Next step or tip for study

Examples of good behavior:
- If user: "Explain merge sort" → concise definition, key steps, O(n log n) time, O(n) space, short example.
- If user: "What's a queue?" → definition, use cases, main ops, complexities, brief example.
- If user: non-DSA → polite refusal + examples of allowed topics.`

    const wantsCode = /\b(code|snippet|implement|implementation|example|solve|write)\b/.test(latestUserMessage)
    const prompt =
      messages.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n") +
      `\nAssistant (${wantsCode ? 'Provide code first with a short heading, then complexity.' : 'If including code, '}use ${preferredLanguage} fenced code blocks):`

    const openrouter = createOpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    })

    // Stream response for live typing effect
    const result = await streamText({
      model: openrouter("openai/gpt-3.5-turbo"),
      system,
      prompt,
      temperature: 0.2,
      maxTokens: 600,
    })

    // Increment counters
    sessionQuestionCount.set(sessionId, currentCount + 1)
    updated.count += 1
    const questionsRemaining = Math.min(
      MAX_QUESTIONS_SESSION - (currentCount + 1),
      MAX_QUESTIONS_PER_IP_PER_DAY - updated.count
    )

    const stream = new ReadableStream({
      start: async (controller) => {
        try {
          for await (const delta of result.textStream) {
            controller.enqueue(new TextEncoder().encode(delta))
          }
        } catch (e) {
          // swallow to close stream cleanly
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Questions-Remaining": String(Math.max(0, questionsRemaining)),
      },
    })
  } catch (err: any) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error("Chat API Error:", err)
    }
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }), 
      { status: 500 }
    )
  }
}
