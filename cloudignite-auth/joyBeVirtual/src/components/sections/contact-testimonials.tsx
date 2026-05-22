"use client";

import { Star, Quote } from "lucide-react";

export function ContactTestimonials() {
  const testimonials = [
    {
      text: "The onboarding help was phenomenal. They explained every legal document required for my GST registration in Delhi without any jargon.",
      author: "Aditya Sharma",
      role: "Founder, TechNova Solutions"
    },
    {
      text: "I had a very complex requirement for 4 states. The consultation was precise, fast, and highly professional. Highly recommended for multi-state expansion.",
      author: "Priya Menon",
      role: "Operations Head, QuickPay"
    }
  ];

  return (
    <section className="py-24 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-white/40">Real feedback from founders who expanded with BeVirtual support.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass p-8 rounded-[32px] relative group hover:border-primary/30 transition-all">
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-primary/10 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-white/70 italic leading-relaxed mb-8 relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t.author}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
