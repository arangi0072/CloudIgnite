/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Wrench, 
  Monitor, 
  Trophy, 
  Award, 
  GraduationCap, 
  Phone, 
  Send, 
  Moon, 
  Sun,
  ChevronRight,
  Download,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  category: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

interface Achievement {
  title: string;
  value: string;
  description: string;
}

interface Certification {
  title: string;
  issuer: string;
}

interface Education {
  degree: string;
  institution: string;
  score: string;
}

// --- Data ---

const SKILLS: SkillCategory[] = [
  {
    title: "Languages",
    icon: <Code2 className="w-5 h-5" />,
    skills: ["HTML5", "C++", "JavaScript", "PHP", "Python", "Java", "SQL"]
  },
  {
    title: "Frameworks",
    icon: <Cpu className="w-5 h-5" />,
    skills: ["ReactJS", "NodeJS", "Tailwind CSS", "Bootstrap"]
  },
  {
    title: "Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: ["MySQL", "MongoDB", "VS Code", "Postman", "Figma", "Canva"]
  },
  {
    title: "Platforms",
    icon: <Monitor className="w-5 h-5" />,
    skills: ["Linux", "Windows", "Google Cloud", "Virtual Machines"]
  }
];

const PROJECTS: Project[] = [
  {
    title: "Vibe-Sphere",
    description: "Event Booking System featuring real-time seat booking, admin dashboard, and ticket PDF download.",
    tech: ["HTML", "CSS", "JS", "PHP", "MySQL", "Tailwind"],
    github: "#",
    category: "Web"
  },
  {
    title: "Power-Plus",
    description: "Smart energy assistant AI bot designed to reduce electricity bills through intelligent monitoring.",
    tech: ["React", "NodeJS", "APIs"],
    github: "#",
    category: "AI"
  },
  {
    title: "Mental Health Simulator",
    description: "Terminal-based mood tracker with feedback system to help users monitor their mental well-being.",
    tech: ["Java", "Python"],
    github: "#",
    category: "Terminal"
  },
  {
    title: "Text Utils",
    description: "A comprehensive text analysis tool with dark/light mode and various text manipulation features.",
    tech: ["React", "Tailwind", "JS"],
    github: "#",
    category: "Utility"
  },
  {
    title: "Python Project",
    description: "An independent project showcasing advanced problem-solving techniques and Python scripting.",
    tech: ["Python"],
    github: "#",
    category: "Scripting"
  }
];

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "LeetCode",
    value: "1,855,244",
    description: "Global Rank"
  },
  {
    title: "HackerRank",
    value: "12,361",
    description: "Top among 250k+ participants"
  }
];

const CERTIFICATIONS: Certification[] = [
  { title: "Data Structures & Algorithms (Java)", issuer: "Cipher School" },
  { title: "Cloud Computing", issuer: "NPTEL" },
  { title: "Computer Networking", issuer: "Google" },
  { title: "AI Essentials", issuer: "Infosys" }
];

const EDUCATION: Education[] = [
  { degree: "B.Tech CSE", institution: "Lovely Professional University", score: "CGPA: 6.67" },
  { degree: "Intermediate", institution: "CBSE / State Board", score: "90%" },
  { degree: "Matriculation", institution: "CBSE / State Board", score: "84%" }
];

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold tracking-tight mb-2"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1 bg-primary mt-4"
    />
  </div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* --- Navbar --- */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-background/80 backdrop-blur-md py-4 border-border" : "bg-transparent py-6 border-transparent"
      )}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.a 
            href="#" 
            className="text-2xl font-bold tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            HARSH<span className="text-primary/50">.</span>
          </motion.a>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 text-sm font-medium">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-primary/70 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden gradient-bg">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
              >
                Available for opportunities
              </motion.span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
                Hi, I'm <span className="text-primary">Harsh</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Full Stack Developer | Problem Solver.
                <span className="block mt-2 text-lg">Building scalable, efficient, and user-focused digital solutions.</span>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold transition-all shadow-lg shadow-primary/20"
                >
                  View Projects
                </motion.a>
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-border rounded-full font-bold hover:bg-muted transition-all"
                >
                  Contact Me
                </motion.a>
              </div>

              <div className="flex gap-6">
                {[
                  { icon: <Github />, href: "https://github.com", label: "GitHub" },
                  { icon: <Linkedin />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Mail />, href: "mailto:harshyadav01205@gmail.com", label: "Email" }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -5, color: "var(--primary)" }}
                    className="text-muted-foreground transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden md:block"
            >
              <div className="w-full aspect-square rounded-full border-2 border-dashed border-primary/20 animate-[spin_20s_linear_infinite] absolute inset-0" />
              <div className="w-full aspect-square rounded-full border border-primary/10 animate-[spin_15s_linear_infinite_reverse] absolute inset-0" />
              <div className="relative z-10 w-full aspect-square flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-primary/5 rounded-3xl backdrop-blur-3xl border border-primary/10 flex items-center justify-center p-12 overflow-hidden group">
                  <Terminal className="w-full h-full text-primary/20 group-hover:text-primary/40 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
          >
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-muted-foreground rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <SectionHeading subtitle="Get to know me better">About Me</SectionHeading>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6 text-lg leading-relaxed">
                  <p>
                    I am a passionate Computer Science student at <span className="font-bold text-primary">Lovely Professional University</span>. 
                    My journey in tech is driven by a deep-seated curiosity for solving real-world problems through code.
                  </p>
                  <p>
                    I specialize in building scalable, efficient, and user-focused digital solutions. 
                    My approach combines technical rigor with a creative mindset, ensuring that every application I build 
                    not only works flawlessly but also provides a meaningful experience.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Problem Solving", icon: <Award className="w-5 h-5" /> },
                    { label: "Teamwork", icon: <Mail className="w-5 h-5" /> },
                    { label: "Adaptability", icon: <ChevronRight className="w-5 h-5" /> },
                    { label: "Project Management", icon: <Wrench className="w-5 h-5" /> }
                  ].map((item) => (
                    <div key={item.label} className="p-4 bg-background border border-border rounded-2xl flex items-center gap-3">
                      <div className="text-primary">{item.icon}</div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="py-24">
          <div className="container mx-auto px-6">
            <SectionHeading subtitle="My technical toolkit">Skills & Expertise</SectionHeading>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-background border border-border rounded-3xl hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-muted text-xs font-medium rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <SectionHeading subtitle="Some of my recent work">Featured Projects</SectionHeading>
              
              <div className="flex gap-2 p-1 bg-background border border-border rounded-full overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={cn(
                      "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                      activeFilter === cat ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-background border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col"
                  >
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code2 className="w-12 h-12 text-primary/10 group-hover:text-primary/30 transition-colors duration-500" />
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {project.category}
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2 py-1 bg-muted text-[10px] font-bold rounded-md uppercase tracking-tight">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        <a 
                          href={project.github} 
                          className="flex-1 flex items-center justify-center gap-2 py-3 border border-border rounded-xl text-sm font-bold hover:bg-muted transition-all"
                        >
                          <Github className="w-4 h-4" /> Code
                        </a>
                        {project.demo && (
                          <a 
                            href={project.demo} 
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-all"
                          >
                            <ExternalLink className="w-4 h-4" /> Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- Achievements & Stats --- */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeading subtitle="Competitive Programming">Achievements</SectionHeading>
                <div className="space-y-6">
                  {ACHIEVEMENTS.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 bg-muted/50 border border-border rounded-3xl flex items-center gap-6"
                    >
                      <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary uppercase tracking-widest">{item.title}</h4>
                        <div className="text-3xl font-bold tracking-tighter my-1">{item.value}</div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {CERTIFICATIONS.map((cert, idx) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 bg-background border border-border rounded-3xl hover:border-primary/20 transition-all"
                  >
                    <Award className="w-6 h-6 text-primary mb-4" />
                    <h4 className="font-bold text-sm mb-2">{cert.title}</h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Education Section --- */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <SectionHeading subtitle="Academic background">Education</SectionHeading>
            <div className="max-w-4xl space-y-8">
              {EDUCATION.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8 border-l-2 border-border group"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-border group-hover:bg-primary transition-colors" />
                  <div className="bg-background p-8 rounded-3xl border border-border shadow-sm group-hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold">{edu.degree}</h3>
                        <p className="text-muted-foreground flex items-center gap-2 mt-1">
                          <GraduationCap className="w-4 h-4" /> {edu.institution}
                        </p>
                      </div>
                      <div className="px-4 py-2 bg-primary/5 text-primary font-bold rounded-xl border border-primary/10">
                        {edu.score}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
              <div>
                <SectionHeading subtitle="Let's build something together">Get In Touch</SectionHeading>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email</h4>
                      <p className="text-lg font-medium">harshyadav01205@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Phone</h4>
                      <p className="text-lg font-medium">+91-6367701597</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-muted/50 p-10 rounded-[2.5rem] border border-border"
              >
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest ml-1">Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest ml-1">Email</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest ml-1">Message</label>
                    <textarea 
                      rows={4}
                      placeholder="Your message here..."
                      className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>
                  <button className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-primary/10">
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold tracking-tighter mb-2">HARSH</h2>
            <p className="text-sm text-muted-foreground">Built with ❤️ by Harsh</p>
          </div>
          
          <div className="flex gap-6">
            {[
              { icon: <Github className="w-5 h-5" />, href: "#" },
              { icon: <Linkedin className="w-5 h-5" />, href: "#" },
              { icon: <Mail className="w-5 h-5" />, href: "#" }
            ].map((social, idx) => (
              <a key={idx} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                {social.icon}
              </a>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
