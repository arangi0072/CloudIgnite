import React from 'react';
import { Zap } from 'lucide-react';

export function Logo({ className = "h-8", textClass = "text-2xl" }: { className?: string, textClass?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative h-full aspect-square rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(186,158,255,0.3)] border border-white/10 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
        <Zap className="text-surface w-3/5 h-3/5 relative z-10" fill="currentColor" strokeWidth={1} />
      </div>
      <span className={`text-white font-black tracking-tighter ${textClass}`}>
        CloudIgnite
      </span>
    </div>
  );
}
