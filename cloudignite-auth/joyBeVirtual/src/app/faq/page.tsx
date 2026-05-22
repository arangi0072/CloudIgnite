"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, FileText, Building2, Gavel, Mail, XCircle } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const [search, setSearch] = useState("");

  const categories = [
    {
      id: "gst",
      title: "GST Registration",
      icon: <FileText className="w-5 h-5 text-primary" />,
      questions: [
        { q: "Is virtual office legal for GST registration in India?", a: "Yes, virtual offices are completely legal for GST registration as long as you have a valid NOC from the owner and a registered rent agreement." },
        { q: "What documents will I receive for GST?", a: "You will receive an Authorization Letter, NOC (No Objection Certificate), and a copy of the latest Electricity/Utility Bill." },
        { q: "Can I use this for GST in multiple states?", a: "Yes, you can take multiple virtual office addresses in different states to get state-specific GST numbers." }
      ]
    },
    {
      id: "incorporation",
      title: "Company Incorporation",
      icon: <Building2 className="w-5 h-5 text-accent" />,
      questions: [
        { q: "Can I use a virtual office for ROC registration?", a: "Yes, virtual offices can be used as the Registered Office Address for Private Limited and LLP incorporations." },
        { q: "Will I get a signage at the location?", a: "Most of our premium plans include a signage board placement at the location, which is a compliance requirement." }
      ]
    },
    {
      id: "documentation",
      title: "Documentation & Process",
      icon: <Gavel className="w-5 h-5 text-emerald-500" />,
      questions: [
        { q: "How long does it take to get the documents?", a: "Once your KYC is verified, we typically issue the documents within 24-48 working hours." },
        { q: "Are the agreements notarized?", a: "Yes, we provide legally valid rent agreements as per the state's stamp duty laws." }
      ]
    },
    {
      id: "inspection",
      title: "Mail & Inspection",
      icon: <Mail className="w-5 h-5 text-white" />,
      questions: [
        { q: "What happens during a GST inspector visit?", a: "Our premium locations have on-site receptionists who represent your business. We notify you immediately of any government visits." },
        { q: "How is my physical mail handled?", a: "Mail is received at the reception, scanned, and emailed to you. If required, we can forward physical copies to your residence." }
      ]
    }
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-48 pb-20 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter mb-8">
            How Can We <span className="text-white/40">Help?</span>
          </h1>
          
          <div className="max-w-xl mx-auto relative mb-20">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search common questions..." 
              className="h-16 pl-12 glass border-white/10 text-white rounded-full text-lg focus-visible:ring-primary/20"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Categories</h3>
              {categories.map((cat) => (
                <button 
                  key={cat.id} 
                  className="w-full flex items-center gap-3 p-4 glass rounded-2xl border-white/5 hover:border-primary/50 transition-all text-sm font-bold text-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    {cat.icon}
                  </div>
                  {cat.title}
                </button>
              ))}
            </div>

            <div className="lg:col-span-3 space-y-12">
              {categories.map((cat) => (
                <div key={cat.id} className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{cat.title}</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {cat.questions.map((item, i) => (
                      <AccordionItem key={i} value={`${cat.id}-${i}`} className="glass px-6 rounded-[24px] border-white/5 overflow-hidden">
                        <AccordionTrigger className="text-left text-white font-bold hover:no-underline py-6">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-white/60 pb-6 leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/40">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-white font-bold mb-4">Still have questions?</h3>
          <p className="text-white/40 mb-8">Our support team is available Mon-Sat, 10 AM - 7 PM.</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 h-12 bg-primary text-white font-bold rounded-full">Chat with Us</button>
            <button className="px-8 h-12 glass text-white font-bold rounded-full border-white/10">Email Support</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}