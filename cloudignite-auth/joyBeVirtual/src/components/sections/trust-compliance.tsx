import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";

export function TrustCompliance() {
  const stats = [
    { label: "Compliance Score", value: "99.2%" },
    { label: "Active Nodes", value: "54" },
    { label: "Verification Time", value: "< 24h" },
    { label: "System Uptime", value: "99.9%" }
  ];

  return (
    <section className="py-32 bg-black/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto border border-white/[0.05] rounded-[40px] p-8 md:p-16 bg-grid">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShieldCheck className="text-primary w-6 h-6" />
                </div>
                <span className="text-white font-headline font-bold text-xl">Bank-Grade Infrastructure</span>
              </div>
              
              <h2 className="text-5xl font-headline font-bold text-white tracking-tight">
                Compliant by Design. <br />
                <span className="text-white/40">Secure by Protocol.</span>
              </h2>
              
              <p className="text-white/60 leading-relaxed">
                We operate under the strictest regulatory frameworks to ensure your virtual presence is robust and future-proof. 
                Our infrastructure is trusted by 10,000+ registered Indian businesses.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-3xl font-headline font-black text-white">{stat.value}</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px]" />
              <div className="glass p-8 rounded-[32px] space-y-8 relative z-10 border-white/10 glow-violet">
                <div className="space-y-4">
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Verification Pipeline</div>
                  <div className="space-y-6 relative before:absolute before:left-3 before:top-4 before:bottom-4 before:w-px before:bg-white/10">
                    {[
                      { step: "01", title: "KYC Onboarding", status: "Secure" },
                      { step: "02", title: "Address Allocation", status: "Automated" },
                      { step: "03", title: "GST/NOC Generation", status: "Instant" },
                      { step: "04", title: "Registry Verification", status: "Final" }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-6 relative z-10">
                        <div className="w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[10px] font-bold text-primary">
                          {step.step}
                        </div>
                        <div className="flex-grow flex justify-between items-center">
                          <span className="text-white font-medium">{step.title}</span>
                          <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{step.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/10">
            {["ISO 27001", "RBI COMPLIANT", "GST VERIFIED", "SECURE DATA"].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3 text-white/20 font-headline font-bold text-sm tracking-widest uppercase grayscale hover:grayscale-0 transition-all cursor-default">
                <CheckCircle2 className="w-4 h-4 text-white/10" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}