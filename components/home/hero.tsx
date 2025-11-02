import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Highlighter } from "../magicui/highlighter";
import StarOnGithub from "@/components/ui/button-github";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div
        className="absolute inset-0 bg-terminal-grid pointer-events-none"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Master DSA Algorithms {" "}&
          </h1>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">

          <Highlighter action="underline" color="#FF9800">
            Coding Interviews
          </Highlighter>{" "}
         
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
            {"Interactive Visualizations • AI Explanations • Placement Prep"}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StarOnGithub />
            <Link href="#features">
              <Button size="lg" variant="secondary" className="glow-sky-hover">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-12 h-px max-w-3xl bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>
    </section>
  );
}