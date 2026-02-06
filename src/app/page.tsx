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

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navigation />

      <main className="relative">
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
