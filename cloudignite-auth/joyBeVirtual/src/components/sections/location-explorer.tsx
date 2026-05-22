"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export function LocationExplorer() {
  const cities = [
    { name: "Mumbai", area: "BKC", image: PlaceHolderImages[0], status: "Premium" },
    { name: "Bangalore", area: "Koramangala", image: PlaceHolderImages[1], status: "Tech Hub" },
    { name: "Delhi", area: "Connaught Place", image: PlaceHolderImages[2], status: "Elite" },
    { name: "Hyderabad", area: "Hi-Tech City", image: PlaceHolderImages[3], status: "Popular" },
    { name: "Pune", area: "Baner", image: PlaceHolderImages[4], status: "Growing" },
  ];

  return (
    <section id="locations" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-headline font-bold text-white tracking-tight">
              Elite Network. <br />
              <span className="text-white/40">Top Tier Locations.</span>
            </h2>
            <p className="text-white/60 max-w-md">
              Access prime business addresses across 50+ major Indian cities.
              Built for SaaS, D2C, and remote-first enterprises.
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
            View All Cities <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar scroll-smooth snap-x">
          {cities.map((city, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-[320px] h-[450px] relative group cursor-pointer snap-start"
            >
              <div className="absolute inset-0 rounded-[24px] overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-700">
                <Image 
                  src={city.image.imageUrl} 
                  alt={city.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                  data-ai-hint={city.image.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              
              <div className="absolute top-6 left-6">
                <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-3">
                  {city.status}
                </Badge>
              </div>

              <div className="absolute bottom-8 left-8 right-8 space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <MapPin className="w-3 h-3" />
                  {city.area}
                </div>
                <h3 className="text-3xl font-headline font-bold text-white leading-none">
                  {city.name}
                </h3>
                <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}