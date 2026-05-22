"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, Sparkles } from "lucide-react";

export function ROICalculator() {
  const [rent, setRent] = useState(50000);
  const virtualOfficeRate = 1999;
  const annualSavings = (rent - virtualOfficeRate) * 12;

  return (
    <section id="roi" className="py-32 bg-black/40 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass p-12 rounded-[32px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-accent font-bold text-sm tracking-widest uppercase">
                <TrendingDown className="w-4 h-4" /> Expansion ROI
              </div>
              <h2 className="text-4xl font-headline font-bold text-white">
                How much will you <br />
                <span className="text-primary">save this year?</span>
              </h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Estimated Physical Office Rent</span>
                    <span className="text-white font-bold">₹{rent.toLocaleString()}/mo</span>
                  </div>
                  <Slider 
                    value={[rent]} 
                    min={10000} 
                    max={200000} 
                    step={5000} 
                    onValueChange={(v) => setRent(v[0])}
                    className="cursor-pointer"
                  />
                </div>
                <p className="text-sm text-white/40">
                  BeVirtual rate: ₹1,999/mo fixed. No maintenance. No electricity. No security deposits.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 glow-blue">
              <span className="text-white/40 text-sm font-medium">Estimated Annual Savings</span>
              <div className="text-6xl font-headline font-black text-white tracking-tighter">
                ₹{(annualSavings / 100000).toFixed(1)}L
              </div>
              <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> HIGH EFFICIENCY
              </div>
              <div className="w-full h-px bg-white/10 my-4" />
              <div className="grid grid-cols-2 w-full gap-4">
                <div className="text-left">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">ROI</div>
                  <div className="text-white font-bold text-xl">25x</div>
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Setup Time</div>
                  <div className="text-white font-bold text-xl">24 Hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}