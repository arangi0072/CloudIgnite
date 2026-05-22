import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { LocationsHero } from "@/components/sections/locations-hero";
import { LocationsGrid } from "@/components/sections/locations-grid";
import { InteractiveMap } from "@/components/sections/interactive-map";

export default function LocationsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-24">
        <LocationsHero />
        <InteractiveMap />
        <LocationsGrid />
      </div>
      <Footer />
    </main>
  );
}
