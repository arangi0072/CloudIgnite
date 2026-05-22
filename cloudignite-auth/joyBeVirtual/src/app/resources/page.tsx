import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { FileText, Download, PlayCircle, BookOpen, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ResourcesPage() {
  const guides = [
    { title: "GST Registration Guide (2025)", category: "Compliance", time: "10 min read", image: PlaceHolderImages[0] },
    { title: "LLP vs Pvt Ltd Incorporation", category: "Legal", time: "15 min read", image: PlaceHolderImages[1] },
    { title: "Multi-State Expansion Strategy", category: "Expansion", time: "8 min read", image: PlaceHolderImages[2] },
  ];

  const checklist = [
    "Identity Proof of Directors (PAN/Aadhaar)",
    "Authorization Letter from Company",
    "Digital Signature (DSC)",
    "MOA & AOA (for Companies)",
    "Passport Size Photos"
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-48 pb-20 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-8">
              Founder Learning Center
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Compliance <br />
              <span className="text-white/40">Simplified.</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl">
              Everything you need to know about registering and scaling your business in India. Expert guides, checklists, and documentation explainers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {guides.map((guide, i) => (
              <div key={i} className="group glass rounded-[32px] overflow-hidden border-white/5 hover:border-primary/50 transition-all cursor-pointer">
                <div className="relative h-48">
                  <Image 
                    src={guide.image.imageUrl} 
                    alt={guide.title}
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint={guide.image.imageHint}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">{guide.category}</span>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="text-xs text-white/40 font-bold">{guide.time}</div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{guide.title}</h3>
                  <div className="flex items-center gap-2 text-primary text-sm font-bold pt-2">
                    Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
            <div className="space-y-8">
              <h2 className="text-4xl font-headline font-bold text-white">Downloadable <span className="text-white/40">Compliance Checklist</span></h2>
              <p className="text-white/60">Prepare for your GST or Company registration with our definitive document checklist. Avoid rejections with verified steps.</p>
              <div className="space-y-4">
                {checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="rounded-full bg-primary text-white h-14 px-8 font-bold shadow-xl shadow-primary/20">
                <Download className="w-4 h-4 mr-2" /> Download PDF Checklist
              </Button>
            </div>
            <div className="relative aspect-video glass rounded-[40px] flex items-center justify-center overflow-hidden group border-white/10">
              <Image 
                src={PlaceHolderImages[3].imageUrl} 
                alt="Video thumbnail"
                fill
                className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all"
                data-ai-hint="business meeting room"
              />
              <PlayCircle className="w-20 h-20 text-white relative z-10 group-hover:scale-110 transition-transform cursor-pointer" />
              <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl border-white/10 backdrop-blur-3xl z-10">
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Featured Explainer</div>
                <div className="text-white font-bold">How Virtual Offices Work for GST (2025)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary/10 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-8" />
          <h2 className="text-4xl font-headline font-bold text-white mb-6">Talk to a Compliance Expert</h2>
          <p className="text-white/60 mb-10 text-lg">Every business is unique. Get a personalized consultation on documentation and multi-state expansion strategy from our experts.</p>
          <Button asChild size="lg" className="h-16 px-12 rounded-full bg-primary text-white font-bold text-lg shadow-2xl shadow-primary/20">
            <Link href="/contact">Schedule Free Consultation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}