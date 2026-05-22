import React from 'react';

const row1 = ['Go', 'Docker', 'NGINX', 'Cassandra', 'PostgreSQL', 'Kong Gateway', 'Kubernetes'];
const row2 = ['Redis', 'TypeScript', 'Python', 'Django', 'Node.js', 'React', 'GraphQL'];

export const TechStack = () => {
  return (
    <section id="tech" className="py-24 border-y border-white/5 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Ecosystem</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
          World-Class <span className="text-gradient">Infrastructure</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
          Powered by an industry-leading modern technology stack to ensure performance, scalability, and robust security.
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-8 md:gap-12 overflow-hidden py-10 w-full">
        {/* Top Row - Scrolling Left */}
        <div className="flex animate-scroll-x gap-12 md:gap-24 pr-12 md:pr-24 whitespace-nowrap w-max hover:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1, ...row1].map((tech, idx) => (
            <div
              key={idx}
              className="text-5xl md:text-7xl font-headline font-black text-white/5 hover:text-white/90 transition-all duration-300 cursor-default select-none hover:scale-110 hover:-translate-y-2 drop-shadow-none hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Bottom Row - Scrolling Right */}
        <div 
          className="flex animate-scroll-x gap-12 md:gap-24 pr-12 md:pr-24 whitespace-nowrap w-max hover:[animation-play-state:paused]" 
          style={{ animationDirection: 'reverse' }}
        >
          {[...row2, ...row2, ...row2, ...row2].map((tech, idx) => (
            <div
              key={idx}
              className="text-5xl md:text-7xl font-headline font-black text-white/5 hover:text-white/90 transition-all duration-300 cursor-default select-none hover:scale-110 hover:-translate-y-2 drop-shadow-none hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
