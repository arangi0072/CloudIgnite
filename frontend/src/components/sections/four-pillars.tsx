"use client"
import { KeyRound, Mail, Package, Cpu } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef } from 'react';


type Pillar = {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
};

const pillars: Pillar[] = [
  {
    icon: <KeyRound className="h-8 w-8 text-accent" />,
    title: "Authentication",
    description: "Secure identity in minutes — not weeks.",
    features: ["JWT / OAuth", "Social login", "Multi-tenant ready", "Enterprise security"],
  },
  {
    icon: <Mail className="h-8 w-8 text-accent" />,
    title: "SMTP per Domain",
    description: "Email infrastructure developers actually control.",
    features: ["Dedicated domain sending", "Reputation protection", "High deliverability", "Real-time logs"],
  },
  {
    icon: <Package className="h-8 w-8 text-accent" />,
    title: "Object Storage",
    description: "Store anything. Retrieve instantly.",
    features: ["S3-compatible", "CDN-ready", "Versioning", "Extremely high durability"],
  },
  {
    icon: <Cpu className="h-8 w-8 text-accent" />,
    title: "Serverless Functions",
    description: "Deploy backend logic globally in seconds.",
    features: ["Zero server management", "Auto scaling", "Event-driven", "CLI deploys"],
  },
];

function PillarCard({ pillar }: { pillar: Pillar }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={cardRef} className="pillar-card">
      <div className="relative z-20">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
          {pillar.icon}
        </div>
        <h3 className="font-headline text-2xl font-bold">{pillar.title}</h3>
        <p className="mt-2 text-muted-foreground">{pillar.description}</p>
        <ul className="mt-6 space-y-3">
          {pillar.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default function FourPillars() {
  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.title} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
