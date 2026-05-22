import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { TrendingDown, ShieldCheck, MapPin, Rocket, CheckCircle2, ArrowRight, Zap, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function WhyVirtualOfficePage() {
  const comparisons = [
    { label: "Security Deposit", physical: "₹3,00,000+", virtual: "₹0" },
    { label: "Maintenance", physical: "₹15,000/mo", virtual: "Included" },
    { label: "Electricity", physical: "₹8,000/mo", virtual: "Included" },
    { label: "Furniture/Setup", physical: "₹5,00,000+", virtual: "₹0" },
    { label: "Contract Lock-in", physical: "3 Years", virtual: "Zero" },
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-48 pb-20 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-8">
            The Future of Business Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black text-white tracking-tighter mb-8 leading-[0.9]">
            The Smarter Way to <br />
            <span className="text-white/40">Build & Scale.</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
            A virtual office isn't just an address — it's a strategic move to optimize capital, ensure legal compliance, and expand your footprint at 1/10th the cost.
          </p>
          <Button asChild size="lg" className="h-16 px-12 rounded-full bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20">
            <Link href="/locations">Browse Locations</Link>
          </Button>
        </div>
      </section>

      <section className="py-32 bg-black/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-headline font-bold text-white mb-4">Who Is This For?</h2>
            <p className="text-white/40">Infrastructure tailored for modern builders.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Rocket className="w-8 h-8 text-primary" />, title: "Digital Startups", text: "Remote-first teams needing a premium HQ for GST and company registry." },
              { icon: <Globe className="w-8 h-8 text-accent" />, title: "National Expanders", text: "Established brands entering new states without the heavy capex of local offices." },
              { icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />, title: "Freelancers", text: "Independent professionals wanting to separate home from business with elite addresses." }
            ].map((item, i) => (
              <div key={i} className="glass p-10 rounded-[40px] border-white/5 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-white/40 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-headline font-bold text-white leading-tight">Physical vs <span className="text-primary">Virtual</span></h2>
              <p className="text-white/60">A side-by-side comparison of why high-growth companies are switching to virtual addresses.</p>
              <div className="space-y-1">
                <div className="grid grid-cols-3 p-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  <span>Expense</span>
                  <span>Physical Office</span>
                  <span className="text-primary">BeVirtual</span>
                </div>
                {comparisons.map((c, i) => (
                  <div key={i} className="grid grid-cols-3 p-4 border-t border-white/5 text-sm">
                    <span className="text-white/60">{c.label}</span>
                    <span className="text-white/40">{c.physical}</span>
                    <span className="text-white font-bold text-emerald-500">{c.virtual}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]" />
              <div className="glass p-10 rounded-[40px] relative z-10 text-center space-y-6 border-white/10">
                <TrendingDown className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-3xl font-headline font-bold text-white">95% Cost Savings</h3>
                <p className="text-white/40 text-sm">On average, businesses save ₹6.5 Lakhs in their first year of expansion using BeVirtual nodes.</p>
                <div className="w-full h-px bg-white/10" />
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/40">
                  <span>Capital Preserved</span>
                  <span className="text-white">High Efficiency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black/40">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="glass p-12 md:p-20 rounded-[48px] border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
              <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-8">
                  <h2 className="text-5xl font-headline font-bold text-white leading-[0.9]">Legal & <br />Accepted.</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-white/80">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                      <span>Compliant with MCA and GST Act</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                      <span>Verified Documentation Standards</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                      <span>Used by 10,000+ Registered Companies</span>
                    </div>
                  </div>
                  <Button asChild size="lg" className="rounded-full bg-primary h-14 px-8 font-bold">
                    <Link href="/faq">Read Legality FAQ</Link>
                  </Button>
                </div>
                <div className="relative aspect-square">
                   <Image 
                    src={PlaceHolderImages[4].imageUrl} 
                    alt="Corporate Office"
                    fill
                    className="object-cover rounded-[32px] opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                    data-ai-hint="corporate office meeting"
                   />
                </div>
              </div>
           </div>
        </div>
      </section>

      <section className="py-32 text-center">
        <h2 className="text-4xl font-headline font-bold text-white mb-10">Start Your Business Journey Today</h2>
        <Button asChild size="lg" className="h-16 px-12 rounded-full bg-primary text-white font-bold text-lg">
          <Link href="/contact">Get Started Now <ArrowRight className="ml-2 w-5 h-5" /></Link>
        </Button>
      </section>

      <Footer />
    </main>
  );
}