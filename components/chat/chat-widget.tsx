"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { ANIMATION_DURATION, EASING } from "@/lib/animations"

type Msg = { role: "user" | "assistant"; content: string; id: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [sessionId] = useState(() => crypto.randomUUID())
  const [questionsRemaining, setQuestionsRemaining] = useState(36)
  const [limitReached, setLimitReached] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [hasChatted, setHasChatted] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault()
    const content = input.trim()
    if (!content || limitReached) return
    setHasChatted(true)
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
          sessionId 
        }),
      })
      if (!res.ok && res.status !== 429) throw new Error("Chat request failed")

      // Initialize an empty assistant message and stream into it
      const assistantId = crypto.randomUUID()
      setMessages((m) => [...m, { id: assistantId, role: "assistant", content: "" }])

      const remainingHeader = res.headers.get("X-Questions-Remaining")
      if (remainingHeader) setQuestionsRemaining(Number(remainingHeader))
      if (res.status === 429) {
        setLimitReached(true)
      }

      if (res.body) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          setMessages((m) => m.map((msg) => msg.id === assistantId ? { ...msg, content: msg.content + chunk } : msg))
        }
      } else {
        // Fallback if server did not stream
        const text = await res.text()
        setMessages((m) => m.map((msg) => msg.id === assistantId ? { ...msg, content: text } : msg))
      }
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

  function renderAssistantMessage(text: string) {
    // Clean up markdown-style formatting that shouldn't be displayed literally
    const cleanText = (str: string) => {
      return str
        .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markers
        .replace(/\*(.*?)\*/g, '$1')      // Remove italic markers
        .replace(/__(.*?)__/g, '$1')      // Remove underline markers
        .replace(/~~(.*?)~~/g, '$1')      // Remove strikethrough markers
    }

    const lines = text.split('\n')
    const blocks: Array<{ type: 'code'; lang: string; code: string } | { type: 'text'; text: string }> = []
    let inCode = false
    let codeLang = 'text'
    let buffer: string[] = []

    const flushText = () => {
      const t = buffer.join('\n').trim()
      if (t) blocks.push({ type: 'text', text: cleanText(t) })
      buffer = []
    }

    for (const line of lines) {
      if (!inCode && line.startsWith('```')) {
        flushText()
        inCode = true
        codeLang = line.replace('```', '').trim() || 'text'
        buffer = []
        continue
      }
      if (inCode && line.startsWith('```')) {
        const code = buffer.join('\n')
        blocks.push({ type: 'code', lang: codeLang, code })
        inCode = false
        codeLang = 'text'
        buffer = []
        continue
      }
      buffer.push(line)
    }
    flushText()

    return (
      <div className="space-y-2">
        {blocks.map((b, i) => {
          if (b.type === 'code') {
            const displayLangMap: Record<string, string> = { cpp: 'C++', csharp: 'C#', js: 'JavaScript', ts: 'TypeScript' }
            const displayLang = displayLangMap[b.lang] || (b.lang ? b.lang.toUpperCase() : 'TEXT')
            return (
              <CodeBlock key={i} lang={b.lang} displayLang={displayLang} code={b.code} />
            )
          }
          return (
            <motion.p 
              key={i} 
              className="leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: ANIMATION_DURATION.NORMAL / 1000, 
                ease: EASING.EMPHASIZED_DECELERATE,
                delay: i * 0.05
              }}
            >
              {b.text}
            </motion.p>
          )
        })}
      </div>
    )
  }

  function CodeBlock({ lang, displayLang, code }: { lang: string; displayLang: string; code: string }) {
    const [copied, setCopied] = useState(false)
    async function onCopy() {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      } catch {}
    }
    return (
      <motion.div 
        className="rounded-md border border-slate-700/80 bg-slate-900 shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION.NORMAL / 1000, ease: EASING.STANDARD }}
      >
        <div className="flex items-center justify-between border-b border-slate-700/80 bg-slate-800/70 px-2 py-1">
          <span className="text-[10px] tracking-wide text-slate-300">{displayLang}</span>
          <button
            type="button"
            aria-live="polite"
            aria-label={copied ? "Copied" : "Copy code"}
            onClick={onCopy}
            className={cn(
              "group relative overflow-hidden text-[11px] px-2 py-0.5 rounded-md text-slate-100",
              copied ? "bg-emerald-600" : "bg-slate-700 hover:bg-slate-600",
              "transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            )}
          >
            <span className={cn(
              "inline-flex items-center gap-1 transition-all duration-300",
              copied ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 absolute"
            )}>
              <Check className="h-3.5 w-3.5" /> Copied
            </span>
            <span className={cn(
              "inline-flex transition-all duration-300",
              copied ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
            )}>Copy</span>
            <span className={cn(
              "pointer-events-none absolute inset-0 rounded-md",
              copied ? "animate-[ping_0.6s_ease-out_1] bg-emerald-400/30" : ""
            )}/>
          </button>
        </div>
        <pre className="p-3 text-xs text-slate-100 overflow-x-auto whitespace-pre font-mono">
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      </motion.div>
    )
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2")} data-testid="chat-widget-container">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              duration: ANIMATION_DURATION.NORMAL / 1000, 
              ease: EASING.SMOOTH 
            }}
          >
            <Card 
              role="dialog" 
              aria-modal="true" 
              aria-label="DSA Tutor chat"
              className="w-[min(92vw,360px)] overflow-hidden border-emerald-200/30 shadow-lg shadow-emerald-500/10 dark:border-emerald-800/30"
            >
              <div className="flex items-center justify-between border-b px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">DSA Tutor</div>
                  <span className="text-xs text-muted-foreground">({questionsRemaining} left)</span>
                </div>
                <button
                  aria-label="Close chat"
                  className="rounded p-1 text-sm text-muted-foreground hover:bg-muted transition-colors duration-200"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>

              <div 
                className="max-h-[50vh] min-h-[220px] space-y-3 overflow-y-auto px-3 py-3" 
                aria-live="polite" 
                aria-relevant="additions"
              >
                {!hasChatted && (
                  <motion.div 
                    className="mr-auto max-w-[90%] rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: ANIMATION_DURATION.NORMAL / 1000, ease: EASING.STANDARD }}
                  >
                    {(() => {
                      const hour = new Date().getHours()
                      const period = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
                      return `${period}! Ask me anything about DSA and algorithms.`
                    })()}
                  </motion.div>
                )}
                <AnimatePresence>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ 
                        duration: ANIMATION_DURATION.NORMAL / 1000, 
                        ease: EASING.STANDARD 
                      }}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm whitespace-pre-wrap",
                        m.role === "user"
                          ? "ml-auto max-w-[85%] bg-emerald-600 text-white dark:bg-emerald-500"
                          : "mr-auto max-w-[90%] bg-muted",
                      )}
                    >
                      {m.role === "assistant" ? (
                        renderAssistantMessage(m.content)
                      ) : (
                        m.content
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={endRef} />
                {loading && (
                  <motion.div 
                    className={cn("mr-auto max-w-[90%] rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground flex items-center gap-2")}
                    aria-label="Assistant is thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: ANIMATION_DURATION.NORMAL / 1000 }}
                  >
                    <Spinner className="size-4" />
                    <span>Thinking…</span>
                  </motion.div>
                )}
              </div>

              <form onSubmit={sendMessage} className="flex items-center gap-2 border-t px-3 py-2">
                <Input
                  placeholder={limitReached ? "Limit reached" : "Ask about DSA…"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading || limitReached}
                  aria-label="Chat input"
                />
                <Button 
                  type="submit" 
                  disabled={loading || limitReached}
                  className="transition-all duration-200 ease-out"
                >
                  {loading ? "..." : "Send"}
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ 
            duration: ANIMATION_DURATION.FAST / 1000, 
            ease: EASING.SMOOTH 
          }}
        >
          <Button
            aria-label="Open chat"
            data-testid="chat-open-button"
            size="icon"
            className="h-12 w-12 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 dark:bg-emerald-500 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
            onClick={() => setOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM6 9h12v2H6V9Zm0 4h8v2H6v-2Z" />
            </svg>
          </Button>
        </motion.div>
      )}
    </div>
  )
}