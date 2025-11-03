"use client";

import { Button } from "@/components/ui/button";
import { Highlighter } from "../magicui/highlighter";
import StarOnGithub from "@/components/ui/button-github";
import { ANIMATION_CLASSES } from "@/lib/animations";
import { useSmoothScroll } from "@/lib/smooth-scroll";

export function Hero() {
  const { scrollToSection } = useSmoothScroll();

  const handleExploreFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("#features", 80); // Offset for header
  };

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
            <button 
              onClick={handleExploreFeatures}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-10 rounded-md px-6 has-[>svg]:px-4"
            >
              Explore Features
            </button>
          </div>
        </div>
        <div className="mx-auto mt-12 h-px max-w-3xl bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>
    </section>
  );
}