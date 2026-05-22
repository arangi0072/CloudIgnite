"use client";

import { useState } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, HelpCircle, ArrowRight, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [rent, setRent] = useState(50000);
  const virtualOfficeRate = 1999;
  const annualSavings = (rent - virtualOfficeRate) * 12;

  const plans = [
    {
      name: "Starter",
      tag: "For GST Only",
      price: isAnnual ? 1499 : 1999,
      features: [
        "Premium Business Address",
        "GST Verified Address",
        "NOC Provided",
        "Rent Agreement (1 Year)",
        "Utility Bill (Scan Copy)",
        "Basic Mail Handling"
      ],
      isPopular: false
    },
    {
      name: "Growth",
      tag: "Most Requested",
      price: isAnnual ? 2499 : 2999,
      features: [
        "All Starter Features",
        "Company Incorporation Support",
        "Client Meeting Space (4h/mo)",
        "Signage Support",
        "Dedicated Mail Scanning",
        "Phone Answering Service"
      ],
      isPopular: true
    },
    {
      name: "Scale",
      tag: "For Multi-State",
      price: isAnnual ? 4499 : 4999,
      features: [
        "All Growth Features",
        "Multi-State Expansion Suite",
        "Unlimited Meeting Rooms",
        "Dedicated Relationship Manager",
        "Priority Legal Assistance",
        "Compliance Dashboard Access"
      ],
      isPopular: false
    }
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-48 pb-20 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter mb-6">
            Transparent Pricing for <br />
            <span className="text-white/40">Your Business Address</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
            Choose the infrastructure tier that fits your growth. No hidden costs. No security deposits. No long-term maintenance.
          </p>

          <div className="flex items-center justify-center gap-4 mb-20">
            <span className={cn("text-sm font-bold transition-colors", !isAnnual ? "text-white" : "text-white/40")}>Monthly</span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual} 
              className="data-[state=checked]:bg-primary"
            />
            <span className={cn("text-sm font-bold transition-colors", isAnnual ? "text-white" : "text-white/40")}>
              Annual <span className="text-emerald-500 text-xs ml-1 uppercase tracking-wider">(Save 25%)</span>
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={cn(
                  "relative p-8 rounded-[40px] flex flex-col transition-all duration-500 text-left",
                  plan.isPopular 
                    ? "bg-white/[0.05] border-2 border-primary scale-105 shadow-2xl z-20" 
                    : "glass border-white/10 hover:border-white/20 z-10"
                )}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl">
                    Popular Choice
                  </div>
                )}
                <div className="mb-8">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">{plan.tag}</div>
                  <h3 className="text-3xl font-headline font-bold text-white mb-2">{plan.name}</h3>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-headline font-black text-white">₹{plan.price.toLocaleString()}</span>
                    <span className="text-white/40 text-sm">/mo</span>
                  </div>
                  <div className="text-[10px] text-white/20 mt-1 uppercase font-bold tracking-widest">Billed {isAnnual ? "Annually" : "Monthly"}</div>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={cn("w-5 h-5 shrink-0 mt-0.5", plan.isPopular ? "text-primary" : "text-white/40")} />
                      <span className="text-sm text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button asChild variant={plan.isPopular ? "default" : "outline"} className="w-full h-14 rounded-2xl font-bold group">
                  <Link href="/contact">
                    Select {plan.name} <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-black/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="glass p-12 rounded-[40px] relative overflow-hidden">
             <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl font-headline font-bold text-white leading-tight">Savings Calculator</h2>
                  <p className="text-white/60">Calculate how much your business saves annually by switching to virtual infrastructure.</p>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60 uppercase tracking-widest font-bold text-[10px]">Avg Physical Rent (Monthly)</span>
                        <span className="text-white font-bold">₹{rent.toLocaleString()}</span>
                      </div>
                      <Slider value={[rent]} min={5000} max={200000} step={5000} onValueChange={(v) => setRent(v[0])} />
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-10 rounded-[32px] text-center space-y-4">
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Est. Annual Savings</div>
                  <div className="text-6xl font-headline font-black text-primary">₹{(annualSavings / 100000).toFixed(1)}L</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                    <Zap className="w-3 h-3" /> Zero Capital Expenditure
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold text-white mb-4">Common Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { q: "Are there any hidden costs?", a: "No. The price you see includes NOC, Agreement, and Utility bills required for GST." },
              { q: "Do I need to pay a security deposit?", a: "Zero deposit. Unlike physical offices, we don't hold your capital." },
              { q: "Can I upgrade my plan later?", a: "Absolutely. You can upgrade to include meeting rooms or multi-state anytime." },
              { q: "Is this legal for GST registration?", a: "Yes, 100%. Our addresses are verified and NOCs are issued by authorized owners." }
            ].map((faq, i) => (
              <div key={i} className="glass p-8 rounded-[32px] border-white/5">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-2">{faq.q}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary/10 border-y border-white/5">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-headline font-bold text-white mb-6">Choose Your Plan & Start Registration</h2>
          <p className="text-white/60 mb-10">Our compliance team is ready to process your application today.</p>
          <Button asChild size="lg" className="h-16 px-12 rounded-full bg-primary text-white font-bold text-lg shadow-2xl shadow-primary/20">
            <Link href="/contact">Apply Now <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}