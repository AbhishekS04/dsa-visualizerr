import type { NextRequest } from "next/server"
import { generateText } from "ai"
// import { google } from "@ai-sdk/google"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages = (body?.messages ?? []) as { role: "user" | "assistant"; content: string }[]

    const system =
      "You are a helpful Data Structures & Algorithms tutor. Explain clearly, show steps, and prefer concise examples."

    const prompt =
      messages.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n") + "\nAssistant:"

    const { text } = await generateText({
      // model: google("models/gemini-1.5-flash"),
      model: "openai/gpt-5-mini",
      system,
      prompt,
    })

    return Response.json({ reply: text })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), { status: 500 })
  }
}
