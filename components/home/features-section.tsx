"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IframeModal } from "@/components/ui/iframe-modal"
import { cn } from "@/lib/utils"
import { ANIMATION_CLASSES } from "@/lib/animations"
import { useSmoothScroll } from "@/lib/smooth-scroll"


// The other visualizers will be used in this section of the codebase
const features = [
  { name: "Side-by-side Algorithm Comparisons", href: "https://sortingg-visualizer.vercel.app" },
  { name: "Custom Input Upload", href: "https://www.cs.usfca.edu/~galles/visualization/Algorithms.html" },
  { name: "Save Progress (Resume Anytime)", href: "https://www.programiz.com/dsa" },
  { name: "Gamification (Leaderboards, Challenges, Badges)", href: "https://leetcode.com" },
  { name: "Placement Prep Mode (FAANG-style Problems)", href: "https://www.hackerrank.com" },
  { name: "Community (Share & Discover Visualizations)", href: "https://github.com" },
]

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<{ name: string; href: string } | null>(null)
  const { scrollToSection } = useSmoothScroll()

  const handleFeatureClick = (feature: { name: string; href: string }) => {
    // Check if the href is an internal anchor link
    if (feature.href.startsWith('#')) {
      scrollToSection(feature.href, 80);
    } else {
      setSelectedFeature(feature)
    }
  }

  const handleCloseModal = () => {
    setSelectedFeature(null)
  }

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Platform Features</h2>
      </div>

      {/* pill buttons */}
      <div className="flex flex-wrap gap-3">
        {features.map((f) => (
          <button
            key={f.name}
            onClick={() => handleFeatureClick(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer",
              ANIMATION_CLASSES.smoothHover
            )}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* mini cards for rhythm */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.slice(0, 3).map((f, i) => (
          <Card 
            key={i} 
            className="h-full cursor-pointer"
            onClick={() => handleFeatureClick(f)}
          >
            <CardHeader>
              <CardTitle className="text-base">{f.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore this capability with interactive demos and real interview-style exercises.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Iframe Modal */}
      <IframeModal
        isOpen={selectedFeature !== null}
        onClose={handleCloseModal}
        url={selectedFeature?.href || ""}
        title={selectedFeature?.name || ""}
      />
    </section>
  )
}