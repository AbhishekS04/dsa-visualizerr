import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { DsaSection } from "@/components/home/dsa-section"
import { FeaturesSection } from "@/components/home/features-section"
import { AITutorBanner } from "@/components/home/ai-tutor-banner"
import Team from "@/components/team"
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler"
import FooterSection from "@/components/magicui/footer"
import ChatWidget from "@/components/chat/chat-widget"
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        {/* replace homepage with DSA landing sections */}
        <DsaSection />
        {/* </CHANGE> */}
        <FeaturesSection />
        {/* <AITutorBanner /> */}
      {/* <Team/> */}
      </main>

      <FooterSection/>

      {/* AI Chat Widget */}
      <ChatWidget />

      {/* <SiteFooter /> */}
    </>
  )
}
