"use client";

import { Phone, MessageSquare, Mail, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactOptions() {
  const options = [
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      title: "Phone Support",
      description: "Immediate voice assistance",
      action: "+91 1800-VIRTUAL",
      buttonText: "Call Now"
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
      title: "WhatsApp Consultation",
      description: "Quick chat & documentation",
      action: "Chat on WhatsApp",
      buttonText: "Message"
    },
    {
      icon: <Mail className="w-5 h-5 text-accent" />,
      title: "Email Support",
      description: "For detailed inquiries",
      action: "hello@bevirtual.in",
      buttonText: "Write Email"
    },
    {
      icon: <Calendar className="w-5 h-5 text-white" />,
      title: "Schedule a Call",
      description: "Pick a time for experts",
      action: "View Calendar",
      buttonText: "Book Slot"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Quick Contact Options</h3>
      <div className="grid gap-4">
        {options.map((option, idx) => (
          <div key={idx} className="glass p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                {option.icon}
              </div>
              <div>
                <div className="font-bold text-white">{option.title}</div>
                <div className="text-xs text-white/40">{option.description}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80">{option.action}</span>
              <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 h-8 px-3 text-xs font-bold">
                {option.buttonText} <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
