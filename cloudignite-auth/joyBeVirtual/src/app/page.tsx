import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { SocialTicker } from "@/components/sections/social-ticker";
import { LocationExplorer } from "@/components/sections/location-explorer";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { Pricing } from "@/components/sections/pricing";
import { TrustCompliance } from "@/components/sections/trust-compliance";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <SocialTicker />
      <LocationExplorer />
      <ROICalculator />
      <TrustCompliance />
      <Pricing />
      <Footer />
    </main>
  );
}
