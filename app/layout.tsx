import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import ChatWidget from "@/components/chat/chat-widget"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: {
    default: "CodeDSA - Interactive DSA Learning Platform",
    template: "%s | CodeDSA"
  },
  description: "Master Data Structures & Algorithms with interactive visualizers, AI tutoring, and step-by-step explanations. Practice Arrays, Stacks, Queues, Sorting, Searching, and Dynamic Programming.",
  keywords: ["DSA", "Data Structures", "Algorithms", "Learning", "Visualizer", "Programming", "Interview Prep"],
  authors: [{ name: "Team X-Force" }],
  creator: "Team X-Force",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "CodeDSA - Interactive DSA Learning Platform",
    description: "Master Data Structures & Algorithms with interactive visualizers",
    siteName: "CodeDSA",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeDSA - Interactive DSA Learning Platform",
    description: "Master Data Structures & Algorithms with interactive visualizers",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
        <ChatWidget />
      </body>
    </html>
  )
}
