import type { NextRequest } from "next/server"
import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// In-memory storage for question count per session (use Redis/DB for production)
const sessionQuestionCount = new Map<string, number>()
const MAX_QUESTIONS = 36

// DSA Topics and website features that are allowed
const DSA_TOPICS = [
  "array", "string", "linked list", "stack", "queue", "tree", "binary tree",
  "bst", "heap", "hash", "graph", "sorting", "searching", "recursion",
  "dynamic programming", "dp", "greedy", "backtracking", "divide and conquer",
  "time complexity", "space complexity", "big o", "algorithm", "data structure",
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

    // Get current question count for this session
    const currentCount = sessionQuestionCount.get(sessionId) ?? 0

    // Check if user has reached the question limit
    if (currentCount >= MAX_QUESTIONS) {
      return Response.json({
        reply: `⚠️ You've reached the maximum limit of ${MAX_QUESTIONS} questions for this session. Please refresh the page to start a new session or continue exploring our DSA visualizers!`,
        limitReached: true
      })
    }

    // Get the latest user message
    const latestUserMessage = messages.filter(m => m.role === "user").pop()?.content.toLowerCase() ?? ""

    // Check if the question is DSA-related
    const isDSARelated = DSA_TOPICS.some(topic => latestUserMessage.includes(topic))
    
    // Detect non-DSA questions
    const nonDSAKeywords = [
      "weather", "cook", "recipe", "movie", "music", "sports", "news",
      "politics", "celebrity", "game", "fashion", "travel", "restaurant"
    ]
    const isNonDSA = nonDSAKeywords.some(keyword => latestUserMessage.includes(keyword))

    // Reject non-DSA questions
    if (isNonDSA || (!isDSARelated && latestUserMessage.length > 10)) {
      return Response.json({
        reply: "I'm a specialized DSA (Data Structures & Algorithms) tutor. I can only help with topics like arrays, sorting, searching, trees, graphs, dynamic programming, and other DSA concepts. Please ask me a DSA-related question!",
        rejected: true
      })
    }

    // Enhanced DSA-focused system prompt with website knowledge
    const system = `You are an expert Data Structures & Algorithms (DSA) tutor for the CodeDSA educational platform.

PLATFORM OVERVIEW:
CodeDSA is an interactive DSA learning platform featuring:
- 7 Core DSA Topics: Arrays, Strings, Stacks, Queues, Sorting, Searching, and Dynamic Programming
- Interactive visualizers for each topic that show step-by-step algorithm execution
- AI-powered tutoring with 36 questions per session
- External visualizer integrations for hands-on learning
- Mobile-responsive design for learning anywhere

AVAILABLE TOPICS & VISUALIZERS:
1. **Array** - Index manipulation, traversal operations (visualizer at array-visualizerr.vercel.app)
2. **String** - Pattern matching, string operations (visualizer at string-visualizer.vercel.app)
3. **Stack** - LIFO operations, push/pop mechanics (visualizer at stack-visualizerr.vercel.app)
4. **Queue** - FIFO operations, enqueue/dequeue (visualizer at queue-visualizerr.vercel.app)
5. **Sorting** - 6 algorithms: Bubble, Insertion, Selection, Merge, Quick, Heap Sort (visualizer at sortingg-visualizer.vercel.app)
6. **Searching** - Binary, Linear, Ternary search algorithms (visualizer at searchingg-visualizer.vercel.app)
7. **Dynamic Programming** - Patterns, state transitions, memoization (visualizer at dynamic-programming-visualizerr.vercel.app)

PLATFORM FEATURES:
- Side-by-side algorithm comparisons
- Custom input upload for testing
- Interactive step-by-step visualizations
- Real-time complexity analysis
- FAANG-style interview preparation

HOW TO USE THE PLATFORM:
- Click any DSA topic card on the homepage to open its interactive visualizer in an embedded viewer
- Use the visualizers to see algorithms execute step-by-step
- Ask me (the AI tutor) questions about any DSA topic
- Each session allows 36 questions - counter shown in chat header

YOUR ROLE AS AI TUTOR:
- Answer DSA questions with clear, educational explanations
- Guide users on how to use platform features and visualizers
- Provide step-by-step algorithm explanations with complexity analysis
- Use code examples in JavaScript/TypeScript when helpful
- Explain how to access specific topics on the platform
- Help users understand visualization outputs
- Be encouraging and patient with learners

COMMON USER QUESTIONS YOU SHOULD HANDLE:
1. "How do I access the sorting visualizer?" → Explain clicking the Sorting card opens embedded visualizer
2. "What sorting algorithms are available?" → List all 6: Bubble, Insertion, Selection, Merge, Quick, Heap
3. "Explain bubble sort" → Provide algorithm explanation + mention visualizer for hands-on learning
4. "What's the difference between stack and queue?" → Explain LIFO vs FIFO with platform examples
5. "How does binary search work?" → Explain algorithm + direct to Searching visualizer
6. "What is time complexity?" → Teach Big O with examples from platform's algorithms
7. "How can I practice dynamic programming?" → Explain DP concepts + guide to DP visualizer
8. "What topics are covered here?" → List all 7 core topics with brief descriptions
9. "How do I use the visualizers?" → Explain click-to-open embedded viewer system
10. "Can you explain merge sort step by step?" → Provide detailed explanation + mention Sorting visualizer
11. "What's the best way to learn DSA?" → Recommend using visualizers alongside explanations
12. "How many questions can I ask?" → Explain 36-question limit per session
13. "What is a binary search tree?" → Explain BST concept (note: not yet on platform but coming soon)
14. "Difference between linear and binary search?" → Compare both + mention Searching visualizer
15. "How does a stack work in real life?" → Use browser back button analogy + platform Stack visualizer

IMPORTANT GUIDELINES:
- If asked about non-DSA topics, politely decline and redirect to DSA
- Always mention relevant visualizers when explaining algorithms
- Keep responses under 200 words unless explaining complex algorithms
- Use encouraging language for learners
- Provide JavaScript/TypeScript code examples when helpful
- Reference specific platform features when relevant

RESPONSE FORMAT:
- Start with direct answer
- Add algorithm explanation if needed
- Include time/space complexity
- Mention relevant visualizer
- Provide code example if helpful
- End with encouragement or next learning step`

    const prompt =
      messages.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n") + "\nAssistant:"

    const openrouter = createOpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    })

    const { text } = await generateText({
      model: openrouter("openai/gpt-3.5-turbo"),
      system,
      prompt,
    })

    // Increment question count
    sessionQuestionCount.set(sessionId, currentCount + 1)
    const questionsRemaining = MAX_QUESTIONS - (currentCount + 1)

    return Response.json({ 
      reply: text,
      questionsRemaining,
      questionNumber: currentCount + 1
    })
  } catch (err: any) {
    console.error("Chat API Error:", err)
    return new Response(
      JSON.stringify({ error: err?.message ?? "Unknown error" }), 
      { status: 500 }
    )
  }
}
