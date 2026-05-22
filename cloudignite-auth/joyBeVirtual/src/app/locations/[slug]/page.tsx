"use client";

import { use } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, FileText, CheckCircle2, ShieldCheck, Mail, Users, Landmark, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  // Mock data fetching based on slug
  const city = slug.charAt(0).toUpperCase() + slug.slice(1);
  const locationData = {
    city: city,
    area: city === "Mumbai" ? "BKC (Bandra Kurla Complex)" : "Premium Central Hub",
    description: `Register your business in the most prestigious commercial district of ${city}. Our virtual office at this location offers bank-grade compliance and a professional presence that commands respect.`,
    image: PlaceHolderImages[0],
    price: "1,999",
    gstInfo: "Jurisdiction: Commissioner of GST - South Division",
    landmarks: ["Central Business Tower", "Elite Grand Hotel", "Metro Station Node"],
    deliverables: ["Authorized NOC", "1 Year Rent Agreement", "Utility Bill Copy", "Mail Forwarding Support"]
  };

  return (
    <main className="relative min-h-screen bg-background">
      <Header />

      <section className="relative pt-48 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                  <MapPin className="w-4 h-4" /> {locationData.area}
                </div>
                <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter leading-[0.9]">
                  {locationData.city} <br />
                  <span className="text-white/40">Business Node</span>
                </h1>
                <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                  {locationData.description}
                </p>
                <div className="flex gap-4">
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Zap className="w-3 h-3 mr-2" /> GST Ready
                  </Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    Elite Address
                  </Badge>
                </div>
              </div>

              <div className="glass p-8 rounded-[32px] border-white/10 space-y-6">
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Compliance Data</div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <div className="font-bold text-white mb-1">GST Jurisdiction</div>
                    <div className="text-sm text-white/40">{locationData.gstInfo}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Deliverables</div>
                  <div className="grid grid-cols-2 gap-4">
                    {locationData.deliverables.map((d, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Nearby Landmarks</div>
                <div className="flex flex-wrap gap-3">
                  {locationData.landmarks.map((l, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs text-white/60 border border-white/5">
                      <Landmark className="w-3 h-3" /> {l}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky top-32 space-y-8">
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={locationData.image.imageUrl}
                  alt={locationData.city}
                  fill
                  className="object-cover opacity-80"
                  data-ai-hint={locationData.image.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-8 glass rounded-[32px] border-white/10 backdrop-blur-3xl">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Starts At</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-headline font-black text-white">₹{locationData.price}</span>
                        <span className="text-white/40 text-sm">/mo</span>
                      </div>
                    </div>
                    <Button asChild className="rounded-2xl bg-primary h-14 px-8 font-bold">
                      <Link href="/contact">Get This Address</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-6 rounded-3xl border-white/5 space-y-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <div className="font-bold text-white text-sm">Mail Handling</div>
                  <div className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">Scanning & Email included</div>
                </div>
                <div className="glass p-6 rounded-3xl border-white/5 space-y-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div className="font-bold text-white text-sm">Meeting Rooms</div>
                  <div className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">On-demand availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-headline font-bold text-white mb-6">Need Help with Your Selection?</h2>
          <p className="text-white/40 mb-10 max-w-xl mx-auto">Our experts can help you choose the best address based on your business category and GST requirements.</p>
          <Button asChild size="lg" className="h-16 px-12 rounded-full glass border-white/10 text-white font-bold text-lg hover:border-primary transition-all">
            <Link href="/contact">Schedule Free Expert Call <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}