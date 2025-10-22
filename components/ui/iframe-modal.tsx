"use client"

import { X } from "lucide-react"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface IframeModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
}

export function IframeModal({ isOpen, onClose, url, title }: IframeModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative flex h-[90vh] w-[95vw] flex-col rounded-lg border bg-background shadow-2xl",
          "md:h-[85vh] md:w-[90vw]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <span className="text-xs text-muted-foreground">- External Content</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950"
            >
              Open in New Tab ↗
            </a>
            <button
              onClick={onClose}
              className="rounded-md p-2 hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Iframe Content */}
        <div className="relative flex-1 overflow-hidden">
          <iframe
            src={url}
            title={title}
            className="h-full w-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            loading="lazy"
          />
        </div>

        {/* Footer Info */}
        <div className="border-t bg-muted/30 px-4 py-2">
          <p className="text-xs text-muted-foreground">
            Viewing: <span className="font-mono">{url}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
