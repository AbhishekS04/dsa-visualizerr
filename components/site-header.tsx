"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-md bg-emerald-500" aria-hidden />
          <span className="text-sm font-mono tracking-tight">CodeDSA</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#dsa" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            DSA
          </Link>
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#ai-tutor" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            AI Tutor
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
