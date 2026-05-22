import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-background pt-32 pb-12 border-t border-white/[0.05]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-headline font-bold text-white mb-6">
              Build your empire <br />
              <span className="text-white/40">without the lease.</span>
            </h2>
            <p className="text-white/60 max-w-md text-lg">
              The infrastructure for the next generation of Indian founders. 
              Modern business needs modern presence.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Button asChild size="lg" className="rounded-full bg-primary text-white h-16 px-12 text-lg font-bold shadow-2xl shadow-primary/20">
              <Link href="/contact">Get Started Now</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 border-t border-white/5 pt-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-headline font-bold text-white">
                B
              </div>
              <span className="font-headline font-bold text-xl tracking-tight text-white">
                BeVirtual
              </span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed uppercase tracking-widest">
              Premium Infrastructure <br />
              for Distributed Teams
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-bold">Solutions</h4>
            <nav className="flex flex-col gap-2 text-sm text-white/60">
              <Link href="/contact" className="hover:text-primary transition-colors">GST Registration</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Business Incorporation</Link>
              <Link href="/locations" className="hover:text-primary transition-colors">Meeting Spaces</Link>
              <Link href="/locations" className="hover:text-primary transition-colors">Mail Forwarding</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold">Cities</h4>
            <nav className="flex flex-col gap-2 text-sm text-white/60">
              <Link href="/locations" className="hover:text-primary transition-colors">Mumbai BKC</Link>
              <Link href="/locations" className="hover:text-primary transition-colors">Bangalore Koramangala</Link>
              <Link href="/locations" className="hover:text-primary transition-colors">Delhi CP</Link>
              <Link href="/locations" className="hover:text-primary transition-colors">Hyderabad Hi-Tech</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold">Connect</h4>
            <nav className="flex flex-col gap-2 text-sm text-white/60">
              <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link>
              <Link href="#" className="hover:text-primary transition-colors">Media Kit</Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
          <div>© 2025 BEVIRTUAL INFRASTRUCTURE PVT LTD.</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Compliance Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
