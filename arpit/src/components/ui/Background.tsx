
import React from 'react';

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="grid-bg absolute inset-0 opacity-30" />
      
      {/* Glow Orbs */}
      <div className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div className="absolute top-[20%] -right-[5%] h-[40%] w-[40%] rounded-full bg-accent/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
