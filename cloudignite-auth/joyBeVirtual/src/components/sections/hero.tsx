"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, MapPin, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-grid">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold animate-in fade-in slide-in-from-left-4 duration-1000">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              INDIA'S #1 VIRTUAL INFRASTRUCTURE
            </div>
            
            <h1 className="font-headline font-black text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
              Your Office. <br />
              <span className="text-white/40">Anywhere.</span> <br />
              Instant.
            </h1>
            
            <p className="text-lg text-white/60 font-body max-w-md animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              BeVirtual provides premium virtual office infrastructure for GST, Incorporation, and multi-state expansion. Elite business addresses for elite builders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <Button asChild size="lg" className="rounded-full bg-primary text-white h-14 px-8 text-md font-bold group shadow-lg shadow-primary/20">
                <Link href="/contact">
                  Get Virtual Address
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full glass text-white border-white/10 h-14 px-8 text-md font-bold">
                <Link href="/locations">See Locations</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4 text-white/40 animate-in fade-in duration-1000 delay-700">
              <div className="flex flex-col">
                <span className="text-2xl font-headline font-bold text-white">10K+</span>
                <span className="text-xs">Businesses</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-headline font-bold text-white">50+</span>
                <span className="text-xs">Prime Cities</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-headline font-bold text-white">99.2%</span>
                <span className="text-xs">Approval</span>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* 3D Glass Cards Parallax Effect Simulation */}
            <div className="relative w-full max-w-md">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
              
              <div className="glass-dark p-6 rounded-[24px] rotate-[-6deg] animate-float relative z-20 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <ShieldCheck className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">GST Approved Address</h3>
                    <p className="text-xs text-white/40">Verified Compliance</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/5 rounded-full" />
                  <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                </div>
              </div>

              <div className="glass p-6 rounded-[24px] rotate-[12deg] translate-x-12 -translate-y-8 relative z-30 shadow-2xl backdrop-blur-3xl glow-blue">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <MapPin className="text-accent w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Mumbai BKC</h3>
                    <p className="text-xs text-white/40">Premium District</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>Registration Status</span>
                  <Badge className="bg-emerald-500/20 text-emerald-500 border-none">Active</Badge>
                </div>
              </div>

              <div className="glass-dark p-6 rounded-[24px] rotate-[-2deg] translate-x-4 translate-y-24 relative z-10 shadow-2xl opacity-60 scale-95">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <FileText className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Documents Ready</h3>
                    <p className="text-xs text-white/40">Instant Generation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
