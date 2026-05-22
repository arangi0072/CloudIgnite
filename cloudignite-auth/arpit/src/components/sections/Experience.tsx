
import React from 'react';
import { Briefcase, Layers, Server, ShieldCheck, Database } from 'lucide-react';

const experiences = [
  {
    role: 'Founder',
    company: 'CloudIgnite',
    description: 'Spearheading the building of a comprehensive cloud infrastructure platform.',
    details: [
      'Multi-tenant auth system with high concurrency',
      'Distributed object storage architecture',
      'SMTP & email infrastructure scaling',
      'Serverless compute & edge functions',
      'Developer hosting automation workflows'
    ],
    icon: <Server className="w-5 h-5" />,
    date: '2023 - Present'
  },
  {
    role: 'Backend Engineer',
    company: 'Infrastructure Projects',
    description: 'Designed and deployed core architectural components for high-traffic apps.',
    details: [
      'Engineered real-time database syncing with CDC',
      'Built Docker + NGINX deployment automation suites',
      'Developed scalable authentication APIs (JWT, OAuth)',
      'Stack: Go, Django, Node.js, Cassandra, PostgreSQL'
    ],
    icon: <Database className="w-5 h-5" />,
    date: '2021 - 2023'
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-16 text-center">Engineering <span className="text-primary">Journey</span></h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden sm:block" />
          
          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Node */}
                <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shadow-[0_0_20px_rgba(56,46,160,0.5)]">
                  {exp.icon}
                </div>
                
                {/* Card */}
                <div className={`w-full md:w-[45%] glass-card p-8 rounded-3xl ${idx % 2 !== 0 ? 'md:text-right' : ''}`}>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{exp.date}</span>
                  <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-accent font-medium mb-4">{exp.company}</p>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <ul className={`space-y-2 text-sm text-muted-foreground ${idx % 2 !== 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        {idx % 2 === 0 ? <ShieldCheck className="w-4 h-4 text-primary shrink-0" /> : null}
                        {detail}
                        {idx % 2 !== 0 ? <ShieldCheck className="w-4 h-4 text-primary shrink-0" /> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
