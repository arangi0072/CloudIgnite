"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { 
  FileText, 
  Mail, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  ClipboardCheck,
  Zap
} from "lucide-react";

export function LocationsGrid() {
  const locations = [
    {
      city: "Mumbai",
      area: "BKC (Bandra Kurla Complex)",
      image: PlaceHolderImages[0],
      price: "1,999",
      badges: ["GST Ready", "Elite Address"],
      features: ["NOC Provided", "Utility Bill Support", "Mail Handling"]
    },
    {
      city: "Bangalore",
      area: "Koramangala 4th Block",
      image: PlaceHolderImages[1],
      price: "1,499",
      badges: ["Tech District", "Popular"],
      features: ["Digital NOC", "High-Speed Setup", "Receptionist"]
    },
    {
      city: "Delhi",
      area: "Connaught Place",
      image: PlaceHolderImages[2],
      price: "2,499",
      badges: ["Financial Hub", "Central"],
      features: ["Premium P.O. Box", "Identity Shield", "Board Room"]
    },
    {
      city: "Hyderabad",
      area: "Hi-Tech City",
      image: PlaceHolderImages[3],
      price: "1,799",
      badges: ["Software Park", "GST Verified"],
      features: ["Swift Registration", "Cloud Storage", "Virtual Reception"]
    },
    {
      city: "Pune",
      area: "Viman Nagar",
      image: PlaceHolderImages[4],
      price: "1,299",
      badges: ["Emerging Hub", "Startup Friendly"],
      features: ["Legal Compliance", "Mail Scanning", "Meeting Access"]
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-bold text-white">
              Browse Your Hub <br />
              <span className="text-white/40 font-medium">Filtered for Excellence.</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full glass border-white/10 text-white/70 hover:text-white">
              Filters
            </Button>
            <Button variant="outline" className="rounded-full glass border-white/10 text-white/70 hover:text-white">
              Sort by Price
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc, idx) => (
            <div 
              key={idx} 
              className="group relative glass border-white/10 rounded-[32px] overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={loc.image.imageUrl} 
                  alt={loc.city}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                  data-ai-hint={loc.image.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute top-6 left-6 flex gap-2">
                  {loc.badges.map((badge, i) => (
                    <Badge key={i} className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1 opacity-60">
                    <MapPin className="w-3 h-3" /> {loc.area}
                   </div>
                   <h3 className="text-2xl font-bold">{loc.city}</h3>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Starting At</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-headline font-bold text-white">₹{loc.price}</span>
                      <span className="text-white/40 text-sm">/mo</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-xs font-bold">
                    <Zap className="w-3 h-3" /> GST READY
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Key Deliverables</div>
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <FileText className="w-4 h-4 text-primary" /> NOC
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <ClipboardCheck className="w-4 h-4 text-primary" /> Agreement
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Mail className="w-4 h-4 text-primary" /> Mail
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <ShieldCheck className="w-4 h-4 text-primary" /> Compliance
                    </div>
                  </div>
                </div>

                <Button className="w-full h-14 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  View Full Details
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button variant="ghost" className="text-white/40 font-bold hover:text-white transition-colors">
            View All 50+ Locations <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
