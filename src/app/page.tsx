import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { LeftPanel } from "@/components/left-panel";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { AgentPipeline } from "@/components/sections/agent-pipeline";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import ThreeBackgroundWrapper from "@/components/three-background-wrapper";

export default function Home() {
  return (
    <>
      {/* WebGL neural-network background */}
      <ThreeBackgroundWrapper />

      <ScrollProgress />
      <Navigation />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="lg:flex">
          {/* Left: sticky panel — fixed while right scrolls */}
          <header className="lg:sticky lg:top-0 lg:max-h-screen lg:w-[38%] lg:overflow-y-auto px-6 md:px-10 lg:px-12 pt-16 pb-10 lg:py-24">
            <LeftPanel />
          </header>

          {/* Right: scrollable content — wider reading area */}
          <main className="lg:w-[62%] px-6 md:px-10 lg:pl-10 lg:pr-14">
            <About />
            <Experience />
            <Projects />
            <AgentPipeline />
            <Skills />
            <Testimonials />
            <Blog />
            <Contact />
          </main>
        </div>

        <Footer />
      </div>

      <ChatWidget />
    </>
  );
}
