import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { topics } from "@/components/topics/topics-data"

export default function TopicsIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">Data Structures & Algorithms</h1>
        <Link href="/" className="text-sm text-emerald-600 hover:underline dark:text-emerald-400">
          Back to home
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => {
          const href = t.externalUrl || `/topics/${t.slug}`
          return (
            <Link key={t.slug} href={href} className="block h-full">
              <Card className="flex h-full min-h-32 flex-col transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/10">
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
            </Link>
          )
        })}
      </div>
    </main>
  )
}
