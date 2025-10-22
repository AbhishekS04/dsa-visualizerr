"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Msg = { role: "user" | "assistant"; content: string; id: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "hello",
      role: "assistant",
      content: "Hi! I&apos;m your DSA tutor. Ask me about Sorting, Graphs, DP, or anything you see on this page.",
    },
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault()
    const content = input.trim()
    if (!content) return
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) }),
      })
      if (!res.ok) throw new Error("Chat request failed")
      const data = await res.json()
      const reply: Msg = { id: crypto.randomUUID(), role: "assistant", content: data.reply ?? "" }
      setMessages((m) => [...m, reply])
    } catch (err) {
      const reply: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I had trouble replying. Please try again.",
      }
      setMessages((m) => [...m, reply])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2")}>
      {open && (
        <Card className="w-[min(92vw,360px)] overflow-hidden border-emerald-200/30 shadow-lg shadow-emerald-500/10 dark:border-emerald-800/30">
          <div className="flex items-center justify-between border-b px-3 py-2">
            <div className="text-sm font-medium">DSA Tutor</div>
            <button
              aria-label="Close chat"
              className="rounded p-1 text-sm text-muted-foreground hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="max-h-[50vh] min-h-[220px] space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "rounded-md px-3 py-2 text-sm",
                  m.role === "user"
                    ? "ml-auto max-w-[85%] bg-emerald-600 text-white dark:bg-emerald-500"
                    : "mr-auto max-w-[90%] bg-muted",
                )}
              >
                {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t px-3 py-2">
            <Input
              placeholder="Ask about DSA…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "..." : "Send"}
            </Button>
          </form>
        </Card>
      )}

      <Button
        aria-label="Open chat"
        size="icon"
        className="h-12 w-12 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 dark:bg-emerald-500"
        onClick={() => setOpen((v) => !v)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM6 9h12v2H6V9Zm0 4h8v2H6v-2Z" />
        </svg>
      </Button>
    </div>
  )
}
