"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronDown, Download } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="bg-white/5 text-white/80 border-white/10 px-4 py-1 rounded-full">Cloud Architecture</Badge>
            <Badge variant="secondary" className="bg-white/5 text-white/80 border-white/10 px-4 py-1 rounded-full">Distributed Systems</Badge>
            <Badge variant="secondary" className="bg-white/5 text-white/80 border-white/10 px-4 py-1 rounded-full">SaaS Founder</Badge>
            <Badge variant="secondary" className="bg-white/5 text-white/80 border-white/10 px-4 py-1 rounded-full">System Design</Badge>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold mb-6 tracking-tight">
            Building the Future of <br />
            <span className="text-gradient accent-gradient">Cloud Infrastructure.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            I'm <span className="text-white font-medium">Arpit Rangi</span>, Founder of <span className="text-white font-medium">CloudIgnite</span> — designing scalable developer platforms, authentication systems, and hosting automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
              <a href="#projects" className="flex items-center gap-2">
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-white/10 hover:bg-white/5">
              <a href="#contact">Contact Me</a>
            </Button>

            {/* CV Download Button */}
            <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-lg bg-white text-black hover:bg-white/90 group">
              <a
                href="/Arpit_Rangi_CV.pdf"
                download
                className="flex items-center gap-2"
              >
                Download CV
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>

          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-muted-foreground w-6 h-6" />
      </div>

      <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};