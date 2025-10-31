"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTopic, getVisualizerQueryFor } from "@/components/topics/topics-data"

export default function TopicPage({ params }: { params: { slug: string } }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const topic = getTopic(params.slug)
  if (!topic) return notFound()

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">{topic.name}</h1>
          <p className="text-sm text-muted-foreground">{topic.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono">
            {topic.tagline}
          </Badge>
          <Link
            href="/topics"
            aria-label="Back to topics"
            className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            ← Back
          </Link>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Algorithms in this topic</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {topic.algorithms.map((a) => {
            const q = getVisualizerQueryFor(topic.slug, a.slug)
            const isOpen = openSlug === a.slug
            return (
              <Card
                key={a.slug}
                className="cursor-pointer transition hover:shadow-md"
                onClick={() => setOpenSlug((s) => (s === a.slug ? null : a.slug))}
                aria-expanded={isOpen}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{a.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>{a.brief}</p>
                  {isOpen && (
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground">
                        Visualize {a.name} with step-by-step animation and a clear final result.
                      </p>
                      <Link
                        href={`/visualizer?${q}`}
                        className="shrink-0 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visualize →
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </main>
  )
}
