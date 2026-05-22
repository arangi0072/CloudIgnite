"use client";

import { ShieldCheck, MapPin, FileText, CheckCircle2 } from "lucide-react";

export function ContactTrust() {
  return (
    <div className="glass p-8 rounded-[32px] border border-white/5 space-y-8">
      <div className="space-y-2">
        <h3 className="text-xl font-headline font-bold text-white">Trust & Compliance</h3>
        <p className="text-sm text-white/40">All inquiries are handled by trained compliance specialists and lawyers.</p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">Registered Entity</div>
            <div className="text-xs text-white/60 leading-relaxed">
              BeVirtual Infrastructure Pvt Ltd. <br />
              Corporate Identity Number (CIN): <br />
              U74140MH2025PTC123456
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <MapPin className="w-5 h-5 text-primary shrink-0" />
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">Service Coverage</div>
            <div className="text-xs text-white/60 leading-relaxed">
              PAN India coverage across 28 states and 8 union territories.
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <FileText className="w-5 h-5 text-primary shrink-0" />
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">Documentation Guarantee</div>
            <div className="text-xs text-white/60 leading-relaxed">
              Standardized NOC, Rent Agreements, and Utility Bills for GST success.
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
          <CheckCircle2 className="w-3 h-3" /> 100% Secure Data Transmission
        </div>
      </div>
    </div>
  );
}
