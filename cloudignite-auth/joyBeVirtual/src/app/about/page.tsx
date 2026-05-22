import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, Target, Users, Zap, Building2, TrendingUp, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: "Transparency", text: "Zero hidden charges. Full documentation provided upfront for GST success." },
    { icon: <Building2 className="w-6 h-6 text-accent" />, title: "Prime Locations", text: "Addresses in Grade-A commercial buildings that reflect your brand's prestige." },
    { icon: <Zap className="w-6 h-6 text-emerald-500" />, title: "Fast Onboarding", text: "Digitized NOC and Agreement generation in under 24 hours." },
    { icon: <Users className="w-6 h-6 text-white" />, title: "Expert Support", text: "Compliance specialists and lawyers guiding you through every state-wise nuance." },
  ];

  const stats = [
    { label: "Cities Covered", value: "50+" },
    { label: "Businesses Served", value: "10K+" },
    { label: "Approval Rate", value: "99.2%" },
    { label: "Active Addresses", value: "200+" },
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-48 pb-32 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-8">
            Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black text-white tracking-tighter mb-8 max-w-5xl mx-auto leading-[0.9]">
            Building Trusted Business <br />
            <span className="text-white/40">Presence Across India</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
            BeVirtual was born from a simple realization: entrepreneurs shouldn't be limited by high physical office costs. We empower startups to register, operate, and expand across India with elite infrastructure and verified compliance.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12 border-t border-white/10">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-4xl font-headline font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/40 font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-4xl font-headline font-bold text-white">The BeVirtual Story</h2>
              <div className="space-y-12 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-px before:bg-white/10">
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-xs text-white">2021</div>
                  <h3 className="text-xl font-bold text-white mb-2">The Realization</h3>
                  <p className="text-white/60">Founded during the remote-work revolution, we saw founders struggling with GST addresses while working from home.</p>
                </div>
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-xs text-white">2022</div>
                  <h3 className="text-xl font-bold text-white mb-2">Network Expansion</h3>
                  <p className="text-white/60">Partnered with prime commercial hubs in Mumbai, Delhi, and Bangalore to offer elite business nodes.</p>
                </div>
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-white">2025</div>
                  <h3 className="text-xl font-bold text-white mb-2">The Infrastructure Standard</h3>
                  <p className="text-white/60">Now serving 10,000+ businesses with automated compliance and multi-state expansion tools.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-[100px]" />
              <div className="glass p-12 rounded-[40px] relative z-10 border-white/10">
                <Target className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-headline font-bold text-white mb-4">Our Vision</h3>
                <p className="text-white/60 leading-relaxed text-lg italic">
                  "To become the digital nervous system for Indian enterprises, where every founder can plant their business flag anywhere in the subcontinent within 24 hours."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden" />
                  <div>
                    <div className="text-white font-bold">Team BeVirtual</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">Founding Management</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-headline font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-white/40 max-w-xl mx-auto">The principles that guide our compliance and service excellence.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((v, i) => (
              <div key={i} className="glass p-8 rounded-[32px] border-white/5 hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-headline font-black text-white mb-8">Start Your Business Registration with Confidence</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="h-16 px-12 rounded-full bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20">
              <Link href="/locations">View Locations</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-full glass text-white border-white/10 font-bold text-lg">
              <Link href="/contact">Talk to Experts</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}