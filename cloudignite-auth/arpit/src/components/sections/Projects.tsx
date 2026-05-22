
"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    title: 'CloudIgnite Platform',
    category: 'Cloud Infrastructure',
    description:
      'Enterprise-grade cloud platform providing multi-tenant authentication, S3-compatible object storage, user-domain SMTP services, and Firecracker-based serverless functions with full SDK support and developer documentation.',
    imageUrl: '/cloudignite.png',
    link: 'https://cloudignite.in',
    stack: ['Go', 'Django', 'React', 'Docker', 'Kong', 'MinIO', 'Cassandra'],
  },
  {
    title: 'Sechat',
    category: 'Real-Time Communication',
    description:
      'Modern real-time chat application with instant messaging, media sharing, and scalable WebSocket architecture designed for high concurrency and low latency.',
    imageUrl: '/sechat-logo.png',
    link: 'https://github.com/arangi0072/SecHat/',
    stack: ['Flutter', 'Firebase', 'WebSockets'],
  },
  {
    title: 'NotesHouse',
    category: 'Productivity',
    description:
      'Cross-platform note-taking and task management application featuring cloud sync, offline support, and intuitive UI for efficient personal knowledge management.',
    imageUrl: '/noteshouse.png',
    link: 'https://noteshouse-72.web.app/',
    stack: ['Flutter', 'Firebase', 'REST APIs'],
  }
];
export const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Strategic <span className="text-accent">Solutions</span></h2>
            <p className="text-muted-foreground text-lg max-w-xl">Curated selection of infrastructure and developer platforms built with scalability in mind.</p>
          </div>
          <Button variant="outline" className="rounded-full">View All GitHub</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const imgData = PlaceHolderImages.find(img => img.id === project.imageUrl);
            return (
              <div key={idx} className="glass-card rounded-3xl overflow-hidden group hover:border-primary/50 transition-all duration-300">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint="cloud infrastructure"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/20 backdrop-blur-md text-primary-foreground border-primary/30 uppercase tracking-tighter">{project.category}</Badge>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold uppercase px-2 py-1 bg-white/5 rounded-md text-white/60">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="rounded-full w-full group/btn">
                        View Details <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform" />
                      </Button>
                    </a>
                    {/* <Button size="icon" variant="outline" className="rounded-full shrink-0">
                      <Github className="w-4 h-4" />
                    </Button> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
