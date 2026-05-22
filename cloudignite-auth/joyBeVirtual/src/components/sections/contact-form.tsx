"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Send, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="glass p-12 rounded-[40px] text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-headline font-bold text-white">Inquiry Received Successfully</h3>
          <p className="text-white/60 max-w-md mx-auto">
            One of our compliance specialists will reach out to you at the provided contact details within the next 30 minutes.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild className="rounded-full h-12 px-8 bg-primary hover:bg-primary/90">
            <Link href="/locations">
              Browse Locations <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button variant="ghost" className="text-white/60 hover:text-white" onClick={() => setIsSubmitted(false)}>
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      
      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Name</label>
            <Input required placeholder="John Doe" className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Business Name</label>
            <Input required placeholder="Acme Corp" className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus:ring-primary/20" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email Address</label>
            <Input required type="email" placeholder="john@company.com" className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Phone Number</label>
            <Input required type="tel" placeholder="+91 98765 43210" className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus:ring-primary/20" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">City Interested In</label>
            <Input placeholder="e.g. Mumbai, Bangalore" className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Requirement Type</label>
            <Select>
              <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus:ring-primary/20">
                <SelectValue placeholder="Select requirement" />
              </SelectTrigger>
              <SelectContent className="glass border-white/10 text-white">
                <SelectItem value="gst">GST Registration</SelectItem>
                <SelectItem value="incorporation">Company Incorporation</SelectItem>
                <SelectItem value="expansion">Multi-State Expansion</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Business Requirement Details</label>
          <Textarea 
            placeholder="Tell us about your business goals and specific needs..." 
            className="bg-white/5 border-white/10 min-h-[120px] rounded-xl text-white focus:ring-primary/20" 
          />
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox id="consent" className="border-white/20 data-[state=checked]:bg-primary" />
          <label htmlFor="consent" className="text-sm text-white/60 cursor-pointer select-none">
            I agree to be contacted regarding my inquiry and accept the privacy policy.
          </label>
        </div>

        <Button disabled={loading} type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 text-lg">
          {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
          Request Consultation
        </Button>
      </form>
    </div>
  );
}
