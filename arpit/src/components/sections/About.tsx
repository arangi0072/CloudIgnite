
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const stats = [
  { label: 'Services Built', value: '10+' },
  { label: 'Microservices Designed', value: '25+' },
  { label: 'Projects Deployed', value: '50+' },
  { label: 'Users Target', value: 'Millions' },
];

export const About = () => {
  const founderImg = PlaceHolderImages.find(img => img.id === 'founder-photo');

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src='/arpit_pic.jpeg'
                alt="Arpit Rangi"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint="tech founder portrait"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">Designing the Backbone <br /><span className="text-accent">of Modern Software</span></h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                I'm <span className="text-white font-medium">Arpit Rangi</span>, a B.Tech student and startup founder with an elite engineering mindset.
                My focus lies in building the next generation of developer cloud platforms.
              </p>
              <p>
                As the Founder of <span className="text-white font-medium">CloudIgnite</span>, I specialize in microservices, distributed systems, authentication architecture, and storage systems at scale.
              </p>
              <p>
                My mission is to build a tech powerhouse that redefines how developers deploy and manage infrastructure globally, aiming for a ₹1000+ crore impact.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <div className="text-3xl font-headline font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
