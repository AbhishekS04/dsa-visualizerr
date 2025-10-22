import { Button } from "@/components/ui/button"

export function AITutorBanner() {
  return (
    <section id="ai-tutor" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="relative overflow-hidden rounded-xl border glow-emerald glow-emerald-hover">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(16,185,129,0.08) 0 1px, transparent 1px 40px), repeating-linear-gradient(0deg, rgba(16,185,129,0.06) 0 1px, transparent 1px 40px)",
          }}
        />
        <div className="relative flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h3 className="text-pretty text-xl font-semibold md:text-2xl">AI Tutor Mode</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              Get natural explanations for every step, like a personal coding mentor. Ask follow-up questions and see
              visual reasoning as algorithms run.
            </p>
          </div>
          <Button variant="secondary" className="glow-sky-hover">
            Try AI Tutor
          </Button>
        </div>
      </div>
    </section>
  )
}
