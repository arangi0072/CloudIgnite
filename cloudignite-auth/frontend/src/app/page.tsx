import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import FourPillars from "@/components/sections/four-pillars";
import WhyCloudIgnite from "@/components/sections/why-cloudignite";
import DeveloperExperience from "@/components/sections/developer-experience";
import Performance from "@/components/sections/performance";
import Comparison from "@/components/sections/comparison";
import FinalCta from "@/components/sections/final-cta";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <Hero />
        <FourPillars />
        <WhyCloudIgnite />
        <DeveloperExperience />
        <Performance />
        <Comparison />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
