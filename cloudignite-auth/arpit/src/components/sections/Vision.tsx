
import React from 'react';
import { Target, Globe, Cpu, Lock } from 'lucide-react';

const roadmap = [
  { title: 'Developer Cloud Platform', icon: <Globe />, desc: 'Global orchestration for seamless deployment.' },
  { title: 'Enterprise Auth', icon: <Lock />, desc: 'Next-gen security protocols for high-scale apps.' },
  { title: 'Serverless Ecosystem', icon: <Cpu />, desc: 'Edge computing redefined with ultra-low cold starts.' },
  { title: 'Edge Infrastructure', icon: <Target />, desc: 'Expanding global node network for 0ms latency.' }
];

export const Vision = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-headline font-bold mb-12 max-w-4xl mx-auto leading-tight">
          “I am not just building projects. <br />
          <span className="text-gradient accent-gradient">I am building infrastructure for the next generation.</span>”
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {roadmap.map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl text-left border-white/5 hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
