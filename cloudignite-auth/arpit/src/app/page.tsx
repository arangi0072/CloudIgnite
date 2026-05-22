
import { Navbar } from '@/components/ui/Navbar';
import { Background } from '@/components/ui/Background';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { TechStack } from '@/components/sections/TechStack';
import { Vision } from '@/components/sections/Vision';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Background />
      <Navbar />
      
      <div className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Vision />
        <Contact />
      </div>
    </main>
  );
}
