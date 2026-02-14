import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorGlow } from "@/components/cursor-glow";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import InteractiveTerminal from "@/components/interactive-terminal";
import SpaceBackground from "@/components/space-background";
import JourneyGame from "@/components/journey-game";
import ParticleField, { ClickRipple, FloatingElements } from "@/components/particle-field";

export default function Home() {
  return (
    <>
      {/* Background effects */}
      <SpaceBackground />
      <ParticleField />
      <FloatingElements />
      <ClickRipple />

      {/* UI elements */}
      <ScrollProgress />
      <CursorGlow />
      <Navigation />

      {/* Interactive elements */}
      <InteractiveTerminal />
      <JourneyGame />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Testimonials />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
