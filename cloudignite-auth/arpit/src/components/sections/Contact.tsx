
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="glass-card p-8 md:p-16 rounded-[40px] grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-8">Let's build <br />something <span className="text-primary">extraordinary.</span></h2>
            <p className="text-muted-foreground text-lg mb-10">
              Open for collaboration on high-scale infrastructure projects, microservices architecture, and startup ventures.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:founder@cloudignite.in" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Email</div>
                  <div className="font-medium">founder@cloudignite.in</div>
                </div>
              </a>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 bg-white/5 border-white/10 hover:bg-primary hover:border-primary transition-all group">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 bg-white/5 border-white/10 hover:bg-primary hover:border-primary transition-all group">
                  <Github className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Name</label>
                <Input placeholder="John Doe" className="bg-white/5 border-white/10 rounded-2xl h-12 px-6 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Email</label>
                <Input placeholder="john@example.com" type="email" className="bg-white/5 border-white/10 rounded-2xl h-12 px-6 focus:ring-primary/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Message</label>
              <Textarea placeholder="Tell me about your project..." className="bg-white/5 border-white/10 rounded-2xl min-h-[150px] px-6 py-4 focus:ring-primary/50" />
            </div>
            <Button className="w-full h-14 rounded-2xl text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
              Send Message <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </form>
        </div>
        
        <div className="mt-24 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Arpit Rangi. Built for the future of cloud.
        </div>
      </div>
    </section>
  );
};
