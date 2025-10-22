import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground">
            About
          </Link>
          <span aria-hidden>•</span>
          <Link href="#" className="hover:text-foreground">
            FAQ
          </Link>
          <span aria-hidden>•</span>
          <Link href="#" className="hover:text-foreground">
            Careers
          </Link>
          <span aria-hidden>•</span>
          <Link href="#" className="hover:text-foreground">
            Terms of Service
          </Link>
          <span aria-hidden>•</span>
          <Link href="#" className="hover:text-foreground">
            Privacy Policy
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link aria-label="GitHub" href="#" className="text-muted-foreground transition-colors hover:text-emerald-500">
            <Github className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Twitter"
            href="#"
            className="text-muted-foreground transition-colors hover:text-emerald-500"
          >
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
