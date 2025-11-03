"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IframeModal } from "@/components/ui/iframe-modal"
import { useSmoothScroll } from "@/lib/smooth-scroll"

type Topic = {
  name: string
  slug: string
  tagline: string
  progress: number
  url: string
}

const topics: Topic[] = [
  { name: "Array", slug: "array", tagline: "Index, traversal & manipulation", progress: 60, url: "https://array-visualizerr.vercel.app" },
  { name: "String", slug: "string", tagline: "Pattern matching & operations", progress: 10, url: "https://string-visualizer.vercel.app" },
  { name: "Stack", slug: "stack", tagline: "LIFO operations", progress: 75, url: "https://stack-visualizerr.vercel.app" },
  { name: "Queue", slug: "queue", tagline: "FIFO operations", progress: 75, url: "https://queue-visualizerr.vercel.app/overview" },
  { name: "Sorting", slug: "sorting", tagline: "6 algorithms to master", progress: 40, url: "https://sortingg-visualizer.vercel.app" },
  { name: "Searching", slug: "searching", tagline: "Binary, Ternary & more", progress: 25, url: "https://searchingg-visualizer.vercel.app" },
  { name: "Dynamic Programming", slug: "dynamic-programming", tagline: "Patterns & state transitions", progress: 20, url: "https://dynamic-programming-visualizerr.vercel.app" },
  { name: "Graph", slug: "graph", tagline: "Traversal & shortest path algorithms", progress: 30, url: "https://graphh-visualizerr.vercel.app" },
]

export function DsaSection() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const { scrollToSection } = useSmoothScroll()

  const handleCardClick = (topic: Topic) => {
    setSelectedTopic(topic)
  }

  const handleCloseModal = () => {
    setSelectedTopic(null)
  }

  return (
    <section id="dsa" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Data Structures & Algorithms</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => {
          return (
            <Card 
              key={t.slug} 
              className="flex h-full min-h-32 flex-col transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
              onClick={() => handleCardClick(t)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.name} – {t.tagline}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Iframe Modal */}
      <IframeModal
        isOpen={selectedTopic !== null}
        onClose={handleCloseModal}
        url={selectedTopic?.url || ""}
        title={selectedTopic?.name || ""}
      />
    </section>
  )
}