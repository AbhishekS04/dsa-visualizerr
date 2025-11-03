"use client"

import { ThemeToggle } from "./theme-toggle"
import { useSmoothScroll } from "@/lib/smooth-scroll"

export function SiteHeader() {
  const { scrollToSection } = useSmoothScroll()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    scrollToSection(target, 80) // Offset for header
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-md bg-emerald-500" aria-hidden />
          <span className="text-sm font-mono tracking-tight">CodeDSA</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a 
            href="#dsa" 
            onClick={(e) => handleNavClick(e, "#dsa")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            DSA
          </a>
          <a 
            href="#features" 
            onClick={(e) => handleNavClick(e, "#features")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            Features
          </a>
          <a 
            href="#ai-tutor" 
            onClick={(e) => handleNavClick(e, "#ai-tutor")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            AI Tutor
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}