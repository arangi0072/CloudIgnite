"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Best for individual freelancers",
      price: isAnnual ? 1499 : 1999,
      features: ["Premium Business Address", "Mail Handling", "GST Approved Address", "No Hidden Charges"],
      isPopular: false
    },
    {
      name: "Growth",
      description: "Perfect for fast growing SaaS",
      price: isAnnual ? 2499 : 2999,
      features: ["All Starter Features", "Client Meeting Spaces (4h/mo)", "Dedicated Phone Line", "GST Registration Support", "NOC Documentation"],
      isPopular: true
    },
    {
      name: "Enterprise",
      description: "Complete infrastructure solution",
      price: isAnnual ? 4499 : 4999,
      features: ["All Growth Features", "Multi-State Expansion Suite", "Priority Legal Support", "Unlimited Client Meetings", "Compliance Dashboard"],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-5xl font-headline font-bold text-white tracking-tight">Simple. <span className="text-white/40">Transparent.</span></h2>
          
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm transition-colors", !isAnnual ? "text-white" : "text-white/40")}>Monthly</span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual} 
              className="data-[state=checked]:bg-primary"
            />
            <span className={cn("text-sm transition-colors", isAnnual ? "text-white" : "text-white/40")}>
              Yearly <span className="text-emerald-500 font-bold ml-1">Save 25%</span>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={cn(
                "relative p-8 rounded-[32px] flex flex-col transition-all duration-500 group",
                plan.isPopular 
                  ? "bg-white/[0.05] border-2 border-primary scale-105 shadow-2xl z-20" 
                  : "glass border-white/10 hover:border-white/20 z-10"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-headline font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-white/40">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-headline font-black text-white">₹{plan.price.toLocaleString()}</span>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={cn("w-5 h-5 shrink-0 mt-0.5", plan.isPopular ? "text-primary" : "text-white/40")} />
                    <span className="text-sm text-white/70 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.isPopular ? "default" : "outline"}
                className={cn(
                  "w-full rounded-2xl h-12 font-bold group",
                  plan.isPopular ? "bg-primary text-white" : "glass text-white border-white/10"
                )}
              >
                Choose {plan.name}
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}