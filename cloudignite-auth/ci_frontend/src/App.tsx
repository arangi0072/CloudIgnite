import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Logo } from './components/Logo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Docs from './pages/Docs';
import {
  Database,
  Terminal,
  Fingerprint,
  Mail,
  LineChart,
  Globe,
  CheckCircle2,
  Copy,
  User,
  Network,
  Cloud,
  Code2,
  Menu,
  X,
  ChevronRight,
  Shield,
  Zap,
  Lock,
  MessageSquare,
  Twitter,
  Github,
  ArrowRight,
  Search,
  Plus,
  ArrowUp,
  Command,
  HelpCircle,
  Activity,
  Server,
  Cpu,
  Check,
  Video,
  Rocket
} from 'lucide-react';
import ArpitCV from './pages/ArpitCV';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('product');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['product', 'docs', 'pricing', 'github'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full z-[60] bg-primary/10 backdrop-blur-md border-b border-primary/20 py-1.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Noida-Edge: 0.9ms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Mumbai-Edge: 1.4ms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">BGP Anycast Routing: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">DDoS Mitigation: Shielded</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Global Uptime: 100%</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 pl-8 bg-primary/10 backdrop-blur-md">
            <span className="text-[8px] font-black text-primary uppercase tracking-widest">Network Status: 2 Regions Active</span>
          </div>
        </div>
      </div>
      <nav className={`fixed top-8 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-surface/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_0_50px_rgba(186,158,255,0.1)]' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <a href="#" className="hover:opacity-80 transition-opacity"><Logo className="h-8" /></a>
              <div className="hidden lg:flex flex-col">
                <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Operational</span>
                </div>
                <span className="text-[8px] text-outline mt-0.5 ml-1 font-bold">Checked 2m ago</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['Product', 'Pricing'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-xs font-black uppercase tracking-widest transition-all relative group ${activeSection === item.toLowerCase() ? 'text-white' : 'text-on-surface-variant hover:text-white'}`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              ))}
              <Link
                to="/docs"
                className="text-xs font-black uppercase tracking-widest transition-all relative group text-on-surface-variant hover:text-white"
              >
                Docs
                <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileActive={{ scale: 0.98 }}
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-3 px-4 py-2 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-outline group cursor-pointer hover:border-primary/50 hover:bg-white/10 transition-all"
            >
              <Search size={14} className="group-hover:text-primary transition-colors" />
              <span>Search</span>
              <span className="ml-4 px-1.5 py-0.5 rounded bg-white/10 text-[8px] border border-white/10">⌘K</span>
            </motion.div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-white transition-colors">Sign In</Link>
              <Link to="/signup" className="px-6 py-2.5 rounded-md bg-gradient-to-r from-primary to-primary-dim text-surface text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(186,158,255,0.4)] active:scale-95 transition-all hover:opacity-90 inline-block">
                Get Started
              </Link>
            </div>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-surface border-b border-white/5 p-6 md:hidden"
            >
              <div className="flex flex-col gap-4">
                <a href="#product" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white">Product</a>
                <a href="#docs" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-on-surface-variant">Docs</a>
                <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-on-surface-variant">Pricing</a>
                <a href="#github" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-on-surface-variant">GitHub</a>
                <hr className="border-white/5 my-2" />
                <Link to="/login" className="w-full py-3 text-center font-medium text-white block">Sign In</Link>
                <Link to="/signup" className="w-full py-3 rounded-md bg-primary text-surface font-bold text-center block">Get Started</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Command Palette Simulation */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCommandPaletteOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-surface-container border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
                <Search className="text-outline" size={20} />
                <input
                  autoFocus
                  placeholder="Search documentation, components, or commands..."
                  className="bg-transparent border-none outline-none text-white w-full text-lg placeholder:text-outline"
                />
                <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-outline">ESC</div>
              </div>
              <div className="p-4 max-h-[400px] overflow-y-auto scrollbar-hide">
                <div className="text-[10px] font-bold text-outline uppercase tracking-widest px-4 mb-2">Recent Searches</div>
                {[
                  { title: 'Edge Runtime API', category: 'Documentation', icon: <Code2 size={14} /> },
                  { title: 'S3 Compatibility Guide', category: 'Guides', icon: <HelpCircle size={14} /> },
                  { title: 'Pricing Calculator', category: 'Tools', icon: <Activity size={14} /> },
                  { title: 'System Status', category: 'Resources', icon: <Server size={14} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-outline group-hover:text-primary transition-colors">{item.icon}</div>
                      <span className="text-sm text-on-surface group-hover:text-white transition-colors">{item.title}</span>
                    </div>
                    <span className="text-[10px] text-outline">{item.category}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-surface-container-low border-t border-white/5 flex items-center justify-between text-[10px] text-outline">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><span className="px-1 py-0.5 rounded bg-white/10">↑↓</span> to navigate</span>
                  <span className="flex items-center gap-1"><span className="px-1 py-0.5 rounded bg-white/10">↵</span> to select</span>
                </div>
                <span>CloudIgnite Search v1.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [deployments, setDeployments] = useState([
    { id: 1, app: 'auth-service', region: 'ap-south-1', time: 'Just now' },
    { id: 2, app: 'payment-webhook', region: 'us-east-1', time: '2s ago' },
    { id: 3, app: 'image-optimizer', region: 'eu-central-1', time: '5s ago' }
  ]);

  useEffect(() => {
    const apps = ['graphql-api', 'user-dashboard', 'analytics-worker', 'email-queue', 'search-indexer'];
    const regions = ['ap-south-1', 'us-west-2', 'eu-west-1', 'ap-northeast-1', 'sa-east-1'];

    const interval = setInterval(() => {
      setDeployments(prev => {
        const newDeploy = {
          id: Date.now(),
          app: apps[Math.floor(Math.random() * apps.length)],
          region: regions[Math.floor(Math.random() * regions.length)],
          time: 'Just now'
        };
        // Update times for existing
        const updated = prev.map(d => {
          if (d.time === 'Just now') return { ...d, time: '2s ago' };
          if (d.time === '2s ago') return { ...d, time: '5s ago' };
          return { ...d, time: '10s+ ago' };
        });
        return [newDeploy, ...updated].slice(0, 3);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div style={{ y: y1, opacity }} className="absolute top-20 right-[10%] w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10" />
      <motion.div style={{ y: y2, opacity }} className="absolute bottom-20 left-[5%] w-72 h-72 bg-secondary/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">v2.0 Now Live</span>
          </div>
          <h1 className="hero-title text-6xl md:text-8xl font-black text-white leading-[0.9]">
            Build, Deploy, Scale — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary-container to-secondary">Without Limits</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed font-medium">
            The modern infrastructure stack for engineers who move fast. Global edge runtime, multi-tenant auth, and high-performance object storage out of the box.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/signup" className="px-8 py-4 rounded-md bg-gradient-to-r from-primary to-primary-dim text-surface font-black text-lg glow-hover transition-all duration-300 active:scale-95 shadow-[0_0_40px_rgba(186,158,255,0.4)] inline-block">
              Start Building Free
            </Link>
            <button className="px-8 py-4 rounded-md border border-white/10 bg-white/5 text-white font-black text-lg hover:bg-white/10 transition-all duration-300 active:scale-95">
              View Docs
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden md:flex items-center gap-2 text-xs text-outline font-bold"
          >
            <Command size={12} />
            <span>Press <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">⌘K</span> to search documentation</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-surface-container-lowest rounded-xl border border-white/10 overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
            <div className="flex items-center justify-between px-4 py-3 bg-surface-container border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Terminal — deploy-function</span>
              </div>

              {/* Live Deployment Ticker */}
              <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded bg-black/30 border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-mono text-emerald-500/80 uppercase">Live Deployments</span>
              </div>
            </div>
            <div className="p-8 font-mono text-sm space-y-3 relative">
              <div className="flex gap-3"><span className="text-primary-container">λ</span> <span className="text-on-surface">cloudignite deploy ./functions/api-handler</span></div>
              <div className="text-on-surface-variant/70">Checking environment variables...</div>
              <div className="text-emerald-400 flex items-center gap-2">
                <Check size={14} />
                <span>Build successful [2.4s]</span>
              </div>
              <div className="text-on-surface-variant/70">Compressing artifacts... 4.2 MB</div>
              <div className="text-on-surface-variant/70">Uploading to edge nodes...</div>
              <div className="flex gap-3 text-secondary-dim">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  [====================] 100%
                </motion.span>
              </div>
              <div className="pt-2 text-primary font-bold">🚀 Deployment complete: https://api.cloudignite.sh/v1</div>
              <div className="animate-pulse inline-block w-2 h-5 bg-primary/50 align-middle"></div>

              {/* Floating Live Feed Overlay */}
              <div className="absolute bottom-4 right-4 w-64 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-3 hidden sm:block">
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {deployments.map((dep) => (
                      <motion.div
                        key={dep.id}
                        initial={{ opacity: 0, x: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center justify-between text-[10px]"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Cloud size={10} className="text-primary shrink-0" />
                          <span className="text-white truncate">{dep.app}</span>
                          <span className="text-outline shrink-0">{dep.region}</span>
                        </div>
                        <span className="text-emerald-500 shrink-0">{dep.time}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Logos = () => {
  const logos = [
    { name: 'Stripe', url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
    { name: 'Vercel', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg' },
    { name: 'Notion', url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
    { name: 'OpenAI', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
    { name: 'Airbnb', url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg' },
    { name: 'Slack', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-surface-container-low/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-bold text-outline uppercase tracking-[0.3em] mb-12">Trusted by the next generation of giants</p>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 whitespace-nowrap">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={`${logo.name}-${i}`}
                src={logo.url}
                alt={logo.name}
                className="h-6 md:h-8 object-contain brightness-0 invert inline-block"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Authentication",
      desc: "Enterprise-grade authentication with RBAC, passkeys, and built-in user management. Secure your apps in minutes.",
      icon: <Fingerprint className="text-primary" />,
      color: "primary",
      bg: "bg-primary/10"
    },
    {
      title: "Edge Storage",
      desc: "S3-compatible storage with global replication and instant consistency across all regions. Built for hyper-scale.",
      icon: <Database className="text-emerald-400" />,
      color: "emerald-400",
      bg: "bg-emerald-400/10"
    },
    {
      title: "Serverless Functions",
      desc: "Execute serverless functions at the edge with sub-10ms cold starts. Powered by V8 isolates for maximum performance and isolation.",
      icon: <Zap className="text-amber-400" />,
      color: "amber-400",
      bg: "bg-amber-400/10"
    },
    {
      title: "SMTP Mesh",
      desc: "Reliable transactional emails delivered instantly through our dedicated edge SMTP mesh. High deliverability guaranteed.",
      icon: <Mail className="text-purple-400" />,
      color: "purple-400",
      bg: "bg-purple-400/10"
    }
  ];

  return (
    <section id="product" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4"
          >
            Core Primitives
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Four Products. <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Infinite Possibilities.</span>
          </h2>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Most startups only need these four primitives to launch and scale. CloudIgnite provides the most critical building blocks so you can focus on what matters: <span className="text-white font-bold">your product.</span>
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-10 rounded-3xl bg-surface-container-low border border-white/5 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] transition-all duration-500 overflow-hidden shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

              {/* Animated Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 group-hover:animate-shimmer pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-surface border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] transition-all duration-500 shadow-xl">
                  {f.icon}
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">{f.title}</h3>
                <p className="text-on-surface-variant leading-relaxed font-medium text-lg group-hover:text-on-surface transition-colors duration-300">{f.desc}</p>
              </div>
              <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-${f.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EcosystemRoadmap = () => {
  const roadmapItems = [
    {
      quarter: "Q3 2026",
      title: "IgniteCode",
      desc: "Real-time collaborative IDE built directly into the dashboard. Code, preview, and deploy without leaving the browser. Features multiplayer cursors, live terminal sharing, and instant edge deployments.",
      icon: <Code2 size={24} />,
      status: "Launching Soon",
      color: "primary"
    },
    {
      quarter: "Q4 2026",
      title: "Real-time Database",
      desc: "Globally distributed, multi-master database with sub-10ms sync times. Built on top of our existing edge network. Features automatic conflict resolution, offline support, and seamless integration with Edge Functions.",
      icon: <Database size={24} />,
      status: "In Development",
      color: "emerald-500"
    },
    {
      quarter: "Q1 2027",
      title: "Video Streaming API",
      desc: "Low-latency video ingestion and delivery network. Transcode and stream 4K video directly from the edge. Includes real-time analytics, adaptive bitrate streaming, and DRM support.",
      icon: <Video size={24} />,
      status: "Research",
      color: "secondary"
    },
    {
      quarter: "Q2 2027",
      title: "CI Mails",
      desc: "Transactional email service with built-in analytics, template management, and guaranteed deliverability. Features visual template builder, A/B testing, and advanced routing rules.",
      icon: <Mail size={24} />,
      status: "Concept",
      color: "amber-400"
    },
    {
      quarter: "Q3 2027",
      title: "Edge Hosting",
      desc: "Next-generation static and dynamic hosting with instant global invalidation. Features automatic image optimization, edge caching rules, and seamless integration with our global network.",
      icon: <Cloud size={24} />,
      status: "Planning",
      color: "red-400"
    }
  ];

  return (
    <section className="py-32 px-6 bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary)_0%,transparent_50%)] opacity-5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Rocket size={14} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">The Future</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Building the <span className="text-outline">Ecosystem.</span></h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed">
            We're not just building infrastructure; we're building a complete ecosystem for the next generation of applications. Here's what's coming next.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-full p-8 rounded-2xl bg-surface-container border border-white/5 group-hover:border-white/10 transition-all relative z-10 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-${item.color}/10 flex items-center justify-center text-${item.color}`}>
                    {item.icon}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-outline bg-surface px-2 py-1 rounded border border-white/5">
                    {item.quarter}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-8 flex-grow">{item.desc}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'In Development' || item.status === 'Launching Soon' ? 'bg-emerald-500 animate-pulse' : 'bg-outline'}`}></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{item.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Functions', 'Storage', 'Logs'];

  return (
    <section className="py-32 px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3 space-y-8">
            <h2 className="text-4xl font-black text-white leading-tight">Your infrastructure, unified.</h2>
            <div className="space-y-4">
              {[
                { title: 'Analytics Hub', desc: 'Real-time traffic ingestion with detailed latency breakdowns.', tab: 'Overview' },
                { title: 'Storage Management', desc: 'Browse objects and manage permissions via visual interface.', tab: 'Storage' },
                { title: 'Console Logs', desc: 'Stream logs directly from the edge for easy debugging.', tab: 'Logs' }
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => setActiveTab(item.tab)}
                  className={`p-4 rounded-lg transition-all cursor-pointer border-l-4 ${activeTab === item.tab ? 'bg-surface-container border-primary shadow-lg' : 'hover:bg-surface-container border-transparent'}`}
                >
                  <h4 className={`font-bold ${activeTab === item.tab ? 'text-white' : 'text-on-surface-variant'}`}>{item.title}</h4>
                  <p className={`text-sm ${activeTab === item.tab ? 'text-on-surface-variant' : 'text-outline'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-surface-container-lowest overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-surface-container">
                <div className="flex gap-4">
                  {tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs font-bold transition-all pb-4 -mb-4 relative ${activeTab === tab ? 'text-white' : 'text-on-surface-variant'}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-white/5 rounded border border-white/5">
                    <Search size={10} className="text-outline" />
                    <span className="text-[10px] text-outline">Search logs...</span>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded text-[10px] font-bold uppercase">System Operational</div>
                </div>
              </div>
              <div className="p-8 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'Overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl bg-surface-container border border-white/5">
                          <div className="text-xs text-on-surface-variant mb-2">Total Requests (24h)</div>
                          <div className="text-3xl font-black text-white">4.2M</div>
                          <div className="mt-4 h-16 w-full flex items-end gap-1">
                            {[40, 60, 100, 70, 85, 100].map((h, i) => (
                              <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }}>
                                {h === 100 && <div className="w-full h-full bg-primary rounded-t-sm" />}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-6 rounded-xl bg-surface-container border border-white/5">
                          <div className="text-xs text-on-surface-variant mb-2">Avg. Latency</div>
                          <div className="text-3xl font-black text-secondary">14ms</div>
                          <div className="mt-4 h-16 w-full flex items-end gap-1">
                            {[60, 30, 25, 50, 65, 50].map((h, i) => (
                              <div key={i} className="flex-1 bg-secondary/20 rounded-t-sm" style={{ height: `${h}%` }}>
                                {h === 65 && <div className="w-full h-full bg-secondary rounded-t-sm" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-6 rounded-xl bg-surface-container border border-white/5">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-xs font-bold text-white">Active Functions</div>
                          <div className="text-[10px] text-primary uppercase font-bold tracking-widest">Live View</div>
                        </div>
                        <div className="space-y-3">
                          {[
                            { name: 'auth-handler-production', status: 'Stable', color: 'text-emerald-400' },
                            { name: 'image-processor-edge', status: 'Stable', color: 'text-emerald-400' },
                            { name: 'stripe-webhook-listener', status: 'Retrying...', color: 'text-amber-400' }
                          ].map((func) => (
                            <div key={func.name} className="flex justify-between text-xs py-2 border-b border-white/5 last:border-0">
                              <span className="font-mono text-on-surface">{func.name}</span>
                              <span className={func.color}>{func.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'Functions' && (
                    <motion.div
                      key="functions"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="p-4 rounded-lg bg-surface-container border border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                              <Cpu size={16} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">function-node-{i}</div>
                              <div className="text-[10px] text-on-surface-variant">Last deployed 2h ago</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-xs text-white">128MB</div>
                              <div className="text-[10px] text-outline">Memory</div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'Storage' && (
                    <motion.div
                      key="storage"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-3 gap-4"
                    >
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-square rounded-lg bg-surface-container border border-white/5 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-primary/50 transition-all">
                          <Cloud size={24} className="text-outline group-hover:text-primary transition-colors" />
                          <span className="text-[10px] text-outline">bucket-{i}.zip</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'Logs' && (
                    <motion.div
                      key="logs"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-black/50 rounded-lg p-4 font-mono text-[10px] space-y-1 h-[300px] overflow-y-auto scrollbar-hide"
                    >
                      <div className="text-outline">[2024-03-27 12:23:34] INFO: Initializing edge node...</div>
                      <div className="text-emerald-400">[2024-03-27 12:23:35] SUCCESS: Node connected to global mesh.</div>
                      <div className="text-outline">[2024-03-27 12:23:36] DEBUG: Cache warming for region us-east-1</div>
                      <div className="text-primary">[2024-03-27 12:23:37] EVENT: Function 'auth-handler' invoked.</div>
                      <div className="text-outline">[2024-03-27 12:23:38] INFO: Request processed in 12ms.</div>
                      <div className="text-amber-400">[2024-03-27 12:23:39] WARN: High latency detected in region ap-south-1.</div>
                      <div className="text-outline">[2024-03-27 12:23:40] INFO: Auto-scaling triggered for 'image-processor'.</div>
                      <div className="text-outline">[2024-03-27 12:23:41] INFO: 2 new instances provisioned.</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CodeSnippet = () => {
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<'typescript' | 'go' | 'rust' | 'python'>('typescript');

  const snippets = {
    typescript: {
      label: 'TypeScript',
      filename: 'api-example.ts',
      code: `import { CloudIgnite } from '@cloudignite/sdk';

// Initialize client
const client = new CloudIgnite({ apiKey: process.env.CI_API_KEY });

// Upload a file to edge storage
const { url } = await client.storage.upload({
  path: 'user-uploads/avatar.jpg',
  file: imageBuffer,
  public: true
});

// Trigger a serverless processing job
await client.functions.invoke('process-image', { url });`,
      jsx: (
        <>
          <span className="text-violet-400">import</span> {'{ CloudIgnite }'} <span className="text-violet-400">from</span> <span className="text-emerald-400">'@cloudignite/sdk'</span>;<br /><br />
          <span className="text-slate-500">// Initialize client</span><br />
          <span className="text-violet-400">const</span> client = <span className="text-violet-400">new</span> <span className="text-amber-400">CloudIgnite</span>({'{ apiKey: process.env.CI_API_KEY }'});<br /><br />
          <span className="text-slate-500">// Upload a file to edge storage</span><br />
          <span className="text-violet-400">const</span> {'{ url }'} = <span className="text-violet-400">await</span> client.storage.<span className="text-amber-400">upload</span>({'{'}<br />
          {'  '}path: <span className="text-emerald-400">'user-uploads/avatar.jpg'</span>,<br />
          {'  '}file: imageBuffer,<br />
          {'  '}public: <span className="text-primary">true</span><br />
          {'}'});<br /><br />
          <span className="text-slate-500">// Trigger a serverless processing job</span><br />
          <span className="text-violet-400">await</span> client.functions.<span className="text-amber-400">invoke</span>(<span className="text-emerald-400">'process-image'</span>, {'{ url }'});
        </>
      )
    },
    go: {
      label: 'Go',
      filename: 'main.go',
      code: `package main

import (
	"context"
	"github.com/cloudignite/sdk-go"
)

func main() {
	// Initialize client
	client := cloudignite.NewClient(cloudignite.WithAPIKey("CI_API_KEY"))

	// Upload a file to edge storage
	upload, _ := client.Storage.Upload(context.Background(), &cloudignite.UploadInput{
		Path:   "user-uploads/avatar.jpg",
		File:   imageBuffer,
		Public: true,
	})

	// Trigger a serverless processing job
	client.Functions.Invoke(context.Background(), "process-image", map[string]string{
		"url": upload.URL,
	})
}`,
      jsx: (
        <>
          <span className="text-violet-400">package</span> main<br /><br />
          <span className="text-violet-400">import</span> (<br />
          {'	'}<span className="text-emerald-400">"context"</span><br />
          {'	'}<span className="text-emerald-400">"github.com/cloudignite/sdk-go"</span><br />
          )<br /><br />
          <span className="text-violet-400">func</span> <span className="text-amber-400">main</span>() {'{'}<br />
          {'	'}<span className="text-slate-500">// Initialize client</span><br />
          {'	'}client := cloudignite.<span className="text-amber-400">NewClient</span>(cloudignite.<span className="text-amber-400">WithAPIKey</span>(<span className="text-emerald-400">"CI_API_KEY"</span>))<br /><br />
          {'	'}<span className="text-slate-500">// Upload a file to edge storage</span><br />
          {'	'}upload, _ := client.Storage.<span className="text-amber-400">Upload</span>(context.<span className="text-amber-400">Background</span>(), &cloudignite.UploadInput{'{'}<br />
          {'		'}Path:   <span className="text-emerald-400">"user-uploads/avatar.jpg"</span>,<br />
          {'		'}File:   imageBuffer,<br />
          {'		'}Public: <span className="text-primary">true</span>,<br />
          {'	}'})<br /><br />
          {'	'}<span className="text-slate-500">// Trigger a serverless processing job</span><br />
          {'	'}client.Functions.<span className="text-amber-400">Invoke</span>(context.<span className="text-amber-400">Background</span>(), <span className="text-emerald-400">"process-image"</span>, <span className="text-violet-400">map</span>[<span className="text-primary">string</span>]<span className="text-primary">string</span>{'{'}<br />
          {'		'}<span className="text-emerald-400">"url"</span>: upload.URL,<br />
          {'	}'})<br />
          {'}'}
        </>
      )
    },
    rust: {
      label: 'Rust',
      filename: 'main.rs',
      code: `use cloudignite::Client;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize client
    let client = Client::new(std::env::var("CI_API_KEY")?);

    // Upload a file to edge storage
    let upload = client.storage().upload(
        "user-uploads/avatar.jpg",
        image_buffer,
        true // public
    ).await?;

    // Trigger a serverless processing job
    client.functions().invoke("process-image", json!({
        "url": upload.url
    })).await?;

    Ok(())
}`,
      jsx: (
        <>
          <span className="text-violet-400">use</span> cloudignite::Client;<br />
          <span className="text-violet-400">use</span> serde_json::json;<br /><br />
          <span className="text-amber-400">#[tokio::main]</span><br />
          <span className="text-violet-400">async fn</span> <span className="text-amber-400">main</span>() -&gt; <span className="text-primary">Result</span>&lt;(), <span className="text-primary">Box</span>&lt;<span className="text-violet-400">dyn</span> std::error::Error&gt;&gt; {'{'}<br />
          {'    '}<span className="text-slate-500">// Initialize client</span><br />
          {'    '}<span className="text-violet-400">let</span> client = Client::<span className="text-amber-400">new</span>(std::env::<span className="text-amber-400">var</span>(<span className="text-emerald-400">"CI_API_KEY"</span>)?);<br /><br />
          {'    '}<span className="text-slate-500">// Upload a file to edge storage</span><br />
          {'    '}<span className="text-violet-400">let</span> upload = client.<span className="text-amber-400">storage</span>().<span className="text-amber-400">upload</span>(<br />
          {'        '}<span className="text-emerald-400">"user-uploads/avatar.jpg"</span>,<br />
          {'        '}image_buffer,<br />
          {'        '}<span className="text-primary">true</span> <span className="text-slate-500">// public</span><br />
          {'    '}).<span className="text-violet-400">await</span>?;<br /><br />
          {'    '}<span className="text-slate-500">// Trigger a serverless processing job</span><br />
          {'    '}client.<span className="text-amber-400">functions</span>().<span className="text-amber-400">invoke</span>(<span className="text-emerald-400">"process-image"</span>, <span className="text-amber-400">json!</span>({'{'}<br />
          {'        '}<span className="text-emerald-400">"url"</span>: upload.url<br />
          {'    }'})).<span className="text-violet-400">await</span>?;<br /><br />
          {'    '}<span className="text-amber-400">Ok</span>(())<br />
          {'}'}
        </>
      )
    },
    python: {
      label: 'Python',
      filename: 'app.py',
      code: `import os
from cloudignite import CloudIgnite

# Initialize client
client = CloudIgnite(api_key=os.getenv("CI_API_KEY"))

# Upload a file to edge storage
upload = client.storage.upload(
    path="user-uploads/avatar.jpg",
    file=image_buffer,
    public=True
)

# Trigger a serverless processing job
client.functions.invoke("process-image", {"url": upload.url})`,
      jsx: (
        <>
          <span className="text-violet-400">import</span> os<br />
          <span className="text-violet-400">from</span> cloudignite <span className="text-violet-400">import</span> CloudIgnite<br /><br />
          <span className="text-slate-500"># Initialize client</span><br />
          client = <span className="text-amber-400">CloudIgnite</span>(api_key=os.<span className="text-amber-400">getenv</span>(<span className="text-emerald-400">"CI_API_KEY"</span>))<br /><br />
          <span className="text-slate-500"># Upload a file to edge storage</span><br />
          upload = client.storage.<span className="text-amber-400">upload</span>(<br />
          {'    '}path=<span className="text-emerald-400">"user-uploads/avatar.jpg"</span>,<br />
          {'    '}file=image_buffer,<br />
          {'    '}public=<span className="text-primary">True</span><br />
          )<br /><br />
          <span className="text-slate-500"># Trigger a serverless processing job</span><br />
          client.functions.<span className="text-amber-400">invoke</span>(<span className="text-emerald-400">"process-image"</span>, {'{"url": upload.url}'})
        </>
      )
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeLang].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-widest">SDK FIRST</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">Built for humans, optimized for speed.</h2>
          <p className="text-on-surface-variant mt-4 max-w-2xl mx-auto">Native SDKs for your favorite languages. Type-safe, intuitive, and designed to get out of your way.</p>
        </div>
        <div className="relative bg-surface-container-highest rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-surface-container border-b border-white/5">
            <div className="flex overflow-x-auto scrollbar-hide">
              {(Object.keys(snippets) as Array<keyof typeof snippets>).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeLang === lang
                      ? 'border-primary text-primary bg-white/5'
                      : 'border-transparent text-on-surface-variant hover:text-white hover:bg-white/5'
                    }`}
                >
                  {snippets[lang].label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 px-6 py-3 sm:py-0 border-t sm:border-t-0 border-white/5">
              <span className="text-xs font-mono text-on-surface-variant">{snippets[activeLang].filename}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs text-on-surface-variant hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-md border border-white/10"
              >
                {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeLang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-8 font-mono text-sm leading-relaxed overflow-x-auto min-h-[320px]"
              >
                <code>
                  {snippets[activeLang].jsx}
                </code>
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: 0,
      desc: 'Perfect for side projects and learning.',
      features: ['5GB Edge Storage', '1M Function Invocations', 'Community Support'],
      button: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 49 : 39,
      desc: 'For growing teams and production apps.',
      features: ['100GB Edge Storage', '25M Function Invocations', 'Custom Domains', 'Priority Email Support'],
      button: 'Go Pro',
      popular: true
    },
    {
      name: 'Scale',
      price: billingCycle === 'monthly' ? 199 : 159,
      desc: 'Enterprise performance and security.',
      features: ['Unlimited Edge Storage', 'Unlimited Invocations', 'SOC2 Compliance', '24/7 Dedicated Support'],
      button: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 bg-surface-container-low/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Simple, Scaleable Pricing.</h2>
          <div className="inline-flex items-center p-1 rounded-full bg-surface-container-highest border border-white/5">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-surface-container text-white' : 'text-on-surface-variant'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-surface-container text-white' : 'text-on-surface-variant'}`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-10 rounded-2xl flex flex-col relative transition-all duration-500 ${plan.popular ? 'bg-surface-container border-2 border-primary shadow-[0_0_50px_rgba(186,158,255,0.15)] scale-105 z-10' : 'glass border border-white/5'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-primary text-surface text-[10px] font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-4xl font-black text-white mb-6">${plan.price} <span className="text-lg text-on-surface-variant font-medium">/mo</span></div>
              <p className="text-on-surface-variant mb-8 text-sm leading-relaxed">{plan.desc}</p>
              <ul className="space-y-4 mb-10 flex-grow text-sm">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-on-surface-variant">
                    <CheckCircle2 size={18} className={plan.popular ? 'text-primary' : 'text-emerald-500'} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className={`w-full py-3 rounded-lg font-bold transition-all active:scale-95 text-center block ${plan.popular ? 'bg-gradient-to-r from-primary to-primary-dim text-surface shadow-lg shadow-primary/20 hover:opacity-90' : 'border border-outline-variant text-white hover:bg-surface-container-highest'}`}>
                {plan.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "CloudIgnite cut our deployment times by 80%. The sub-millisecond cold starts are a game changer for our real-time analytics.",
      author: "Sarah Chen",
      role: "CTO at DataStream",
      avatar: "https://picsum.photos/seed/sarah/100/100"
    },
    {
      quote: "The multi-tenant auth is the most robust I've seen. We migrated 50k users in a weekend with zero downtime.",
      author: "Marcus Thorne",
      role: "Lead Architect at FinTech Pro",
      avatar: "https://picsum.photos/seed/marcus/100/100"
    },
    {
      quote: "Finally, a cloud provider that understands developers. The CLI is intuitive and the edge storage is incredibly fast.",
      author: "Elena Rodriguez",
      role: "Founder of CreativeFlow",
      avatar: "https://picsum.photos/seed/elena/100/100"
    }
  ];

  return (
    <section className="py-32 px-6 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-white mb-4">Loved by Engineers.</h2>
          <p className="text-on-surface-variant">Don't just take our word for it. Here's what the community is saying.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-surface-container border border-white/5 flex flex-col justify-between"
            >
              <div className="mb-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Zap key={i} size={14} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-white text-lg italic leading-relaxed">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full border-2 border-primary/20" referrerPolicy="no-referrer" />
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-xs text-on-surface-variant">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does CloudIgnite prevent vendor lock-in?",
      a: "We believe in open standards. Our Object Storage is 100% S3-compatible, and our SMTP mesh uses standard protocols. You can export your data and logic at any time."
    },
    {
      q: "Is my data secure and compliant?",
      a: "CloudIgnite is SOC2 Type II compliant. All data is encrypted at rest with AES-256 and in transit via TLS 1.3. We also offer regional data residency options for the Scale plan."
    },
    {
      q: "What happens if I exceed my plan limits?",
      a: "We don't believe in hard caps. If you exceed your plan limits, we'll gracefully transition you to usage-based billing so your services never go offline. You'll receive alerts at 80% and 100% usage."
    },
    {
      q: "How do cold starts compare to other providers?",
      a: "Our proprietary edge runtime keeps functions 'warm' across our global mesh. Average cold starts are under 10ms, compared to the 200ms+ industry average."
    },
    {
      q: "Do you offer migration assistance?",
      a: "Yes! For Pro and Scale customers, we offer zero-downtime migration assistance. Our engineering team will help you move your data and logic from AWS, GCP, or Azure."
    },
    {
      q: "Is support handled by humans or AI?",
      a: "While we use AI for instant documentation search, all technical support tickets are handled by our senior engineering team based in San Francisco and London."
    }
  ];

  return (
    <section id="docs" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">Common Questions</h2>
          <p className="text-on-surface-variant">Everything you need to know about the platform.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-surface-container-low overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-white">{faq.q}</span>
                <ChevronRight className={`transition-transform ${openIndex === i ? 'rotate-90' : ''}`} size={20} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-on-surface-variant leading-relaxed text-sm">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SecuritySection = () => {
  return (
    <section className="py-32 px-6 bg-surface-container-low/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Shield size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Enterprise Security</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Your data is safe by default.</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              We implement industry-leading security protocols to ensure your application and user data are protected from day one. No configuration required.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: <Lock size={20} />, title: 'End-to-End Encryption', desc: 'AES-256 encryption at rest and TLS 1.3 in transit.' },
                { icon: <Fingerprint size={20} />, title: 'SOC2 Type II', desc: 'Independently audited for security and availability.' },
                { icon: <Shield size={20} />, title: 'DDoS Protection', desc: 'Global edge-level mitigation for all traffic.' },
                { icon: <Database size={20} />, title: 'Automatic Backups', desc: 'Point-in-time recovery for all storage buckets.' }
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <div className="text-primary">{item.icon}</div>
                  <h4 className="font-bold text-white">{item.title}</h4>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Compliance Badges */}
            <div className="pt-8 border-t border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Certified & Compliant</div>
              <div className="flex flex-wrap gap-4">
                {['SOC2 Type II', 'GDPR Ready', 'HIPAA Compliant', 'ISO 27001'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container border border-white/5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-xs font-bold text-white">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full"></div>
            <div className="relative glass p-8 rounded-3xl border border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="text-emerald-500" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Identity Verified</div>
                      <div className="text-[10px] text-on-surface-variant">Multi-factor authentication enabled</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-500">SECURE</div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Lock className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Data Encrypted</div>
                      <div className="text-[10px] text-on-surface-variant">SHA-256 Hashing Active</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-primary">ACTIVE</div>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-highest border border-white/5">
                  <div className="text-[10px] font-mono text-on-surface-variant mb-2">SECURITY_LOGS_STREAM</div>
                  <div className="font-mono text-[10px] space-y-1">
                    <div className="text-emerald-400">[INFO] Incoming request from 192.168.1.1 verified.</div>
                    <div className="text-emerald-400">[INFO] JWT signature validated successfully.</div>
                    <div className="text-primary">[AUDIT] SOC2 Compliance check passed.</div>
                    <div className="text-on-surface-variant">[DEBUG] Cache hit for session_id: 8291...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GlobalNetwork = () => {
  const [activeNodes, setActiveNodes] = useState(142);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { top: '55%', left: '68%', label: 'Noida (2 Nodes)', status: 'Operational', ping: true, latency: '4ms' },
    { top: '62%', left: '66%', label: 'Mumbai (1 Node)', status: 'Operational', ping: true, latency: '8ms' },
    { top: '68%', left: '67%', label: 'Bangalore', status: 'Planned', ping: false, latency: '--' },
    { top: '65%', left: '69%', label: 'Hyderabad', status: 'Planned', ping: false, latency: '--' },
    { top: '20%', left: '25%', label: 'San Francisco', status: 'Planned', ping: false, latency: '--' },
    { top: '35%', left: '75%', label: 'London', status: 'Planned', ping: false, latency: '--' },
    { top: '45%', left: '30%', label: 'New York', status: 'Planned', ping: false, latency: '--' },
    { top: '60%', left: '80%', label: 'Singapore', status: 'Planned', ping: false, latency: '--' },
    { top: '40%', left: '15%', label: 'Tokyo', status: 'Planned', ping: false, latency: '--' },
  ];

  return (
    <section ref={containerRef} id="network" className="py-32 px-6 relative overflow-hidden">
      <motion.div style={{ y: springY }} className="absolute inset-0 bg-primary/5 -z-10"></motion.div>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square">
            {/* Detailed SVG World Map Simulation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg viewBox="0 0 1000 500" className="w-full h-full fill-primary">
                <path d="M150,100 Q200,50 300,100 T500,150 T700,100 T900,150 L900,400 Q800,450 700,400 T500,350 T300,400 T100,350 Z" opacity="0.2" />
                {/* India Focus */}
                <circle cx="670" cy="300" r="10" className="fill-primary/20 animate-pulse" />
              </svg>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Globe size={400} className="text-primary/10 animate-[spin_120s_linear_infinite]" />
            </div>

            {/* Map Dots */}
            {nodes.map((dot, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                className="absolute flex flex-col items-center gap-2 group cursor-pointer"
                style={{ top: dot.top, left: dot.left }}
              >
                <div className="relative">
                  {dot.ping && <div className="absolute -inset-3 rounded-full bg-primary/30 animate-ping"></div>}
                  <div className={`w-2.5 h-2.5 rounded-full ${dot.status === 'Planned' ? 'bg-white/20 border border-white/40' : 'bg-primary shadow-[0_0_15px_rgba(186,158,255,1)]'} transition-all group-hover:scale-150`}></div>

                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20">
                    <div className="bg-surface-container border border-white/10 p-3 rounded-lg shadow-2xl min-w-[140px] backdrop-blur-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-white">{dot.label}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${dot.status === 'Planned' ? 'bg-white/10 text-outline' : 'bg-emerald-500/10 text-emerald-500'}`}>
                          {dot.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[8px] text-on-surface-variant">
                        <span>Latency</span>
                        <span className="font-mono text-primary">{dot.latency}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border backdrop-blur-sm transition-all ${dot.status === 'Planned' ? 'text-outline border-white/5 bg-surface/50 hidden md:block' : 'text-white border-white/10 bg-surface/90 group-hover:border-primary/50'}`}>
                  {dot.label}
                </span>
              </motion.div>
            ))}

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                d="M680,300 Q750,250 800,300"
                className="stroke-primary stroke-[0.5] fill-none"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                d="M680,300 Q500,200 300,150"
                className="stroke-primary stroke-[0.5] fill-none"
              />
            </svg>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
              <Globe size={14} className="text-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Global Infrastructure</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Expanding the <span className="text-outline">Edge.</span></h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Our network is rapidly growing. We currently operate <span className="text-white font-bold">2 high-capacity nodes in Noida</span> and <span className="text-white font-bold">1 in Mumbai</span>, serving the Indian subcontinent with sub-10ms latency.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-black text-white">4ms</div>
                <div className="text-xs text-outline uppercase tracking-widest mt-1 font-bold">Noida Latency</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">Anycast</div>
                <div className="text-xs text-outline uppercase tracking-widest mt-1 font-bold">BGP Routing</div>
              </div>
              <div>
                <div className="text-3xl font-black text-primary">Shield</div>
                <div className="text-xs text-outline uppercase tracking-widest mt-1 font-bold">DDoS Mitigation</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">NVMe</div>
                <div className="text-xs text-outline uppercase tracking-widest mt-1 font-bold">Edge Caching</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 rounded-full bg-white text-surface text-xs font-black uppercase tracking-widest hover:bg-primary transition-all active:scale-95">
                View Network Map
              </button>
              <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 flex items-center gap-2">
                Request a Region <ArrowRight size={14} />
              </button>
            </div>

            {/* Expansion Ticker Overlay */}
            <div className="mt-12 relative group">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-1 rounded-xl bg-gradient-to-r from-primary/20 via-white/5 to-primary/20 overflow-hidden">
                <div className="flex items-center bg-surface-container rounded-lg p-5">
                  <div className="flex-shrink-0 z-10 bg-surface-container pr-8 border-r border-white/10 flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary blur-md animate-pulse"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] whitespace-nowrap">Expansion Plan:</span>
                  </div>
                  <div className="flex gap-16 animate-marquee whitespace-nowrap pl-8">
                    {[
                      'Bangalore (100GbE Backbone) Q3 2026',
                      'Hyderabad (AI Inference Cluster) Q4 2026',
                      'Chennai (Subsea Cable Landing) Q1 2027',
                      'Pune (Disaster Recovery Site) Q2 2027',
                      'Delhi NCR (Capacity +200%) Q3 2026',
                      'Kolkata (East India Gateway) Q4 2027'
                    ].map((city, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] hover:text-white transition-colors cursor-default">{city}</span>
                        <div className="w-1 h-1 rounded-full bg-primary/30"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const UniversalArchitecture = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const steps = [
    {
      title: "Edge Entry",
      desc: "Requests hit Noida or Mumbai nodes in <5ms.",
      icon: <Globe size={20} />,
      color: "primary"
    },
    {
      title: "Isolate Execution",
      desc: "V8 isolates execute your logic in 1ms.",
      icon: <Cpu size={20} />,
      color: "secondary"
    },
    {
      title: "Global Sync",
      desc: "Data replicated across our global mesh.",
      icon: <Network size={20} />,
      color: "emerald-500"
    },
    {
      title: "Response Delivery",
      desc: "Optimized payload delivered to the client.",
      icon: <Zap size={20} />,
      color: "amber-400"
    }
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 bg-surface-container-lowest relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Universal Architecture</div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">How it <span className="text-outline">Works.</span></h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">One stack. Infinite possibilities. Designed for the next decade of engineering.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden md:block -translate-y-1/2 z-0">
            <motion.div
              style={{ scaleX: pathLength }}
              className="h-full bg-gradient-to-r from-primary via-secondary to-emerald-500 origin-left"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-surface border border-white/10 hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TechnicalSpecifications = () => {
  const specs = [
    {
      category: "Compute Engine",
      items: [
        { label: "Processors", value: "AMD EPYC™ 9004 Series (Genoa)" },
        { label: "Core Density", value: "128 Cores / 256 Threads per Node" },
        { label: "Memory", value: "DDR5-4800 ECC Registered RAM" },
        { label: "Isolation", value: "Firecracker MicroVMs + gVisor" }
      ]
    },
    {
      category: "Network & Security",
      items: [
        { label: "Backbone", value: "100GbE Mellanox ConnectX-7" },
        { label: "Routing", value: "BGP Anycast + SmartPath™ AI" },
        { label: "DDoS Shield", value: "12Tbps Global Mitigation Cap" },
        { label: "Encryption", value: "TLS 1.3 / WireGuard® Tunneling" }
      ]
    },
    {
      category: "Storage Architecture",
      items: [
        { label: "Drives", value: "Enterprise NVMe Gen5 SSDs" },
        { label: "Performance", value: "10M+ IOPS per Cluster" },
        { label: "Redundancy", value: "Triple-Replication (Erasure Coding)" },
        { label: "API", value: "S3-Compatible / POSIX Compliant" }
      ]
    }
  ];

  return (
    <section className="py-32 px-6 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Technical Specifications</div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Enterprise Grade <br /><span className="text-outline">Hardware Stack.</span></h2>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Shield size={24} />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-widest">SOC2 Type II</div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Compliance Certified</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {specs.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="h-px flex-grow bg-white/10"></div>
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] whitespace-nowrap">{group.category}</h3>
              </div>
              <div className="space-y-6">
                {group.items.map((item, j) => (
                  <div key={j} className="group cursor-default">
                    <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{item.label}</div>
                    <div className="text-lg font-bold text-white group-hover:translate-x-2 transition-transform">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FutureVision = () => {
  return (
    <section className="py-48 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-12"
        >
          Future Vision 2030
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter leading-[0.85]"
        >
          BEYOND THE <br />
          <span className="text-outline">TRADITIONAL CLOUD</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-on-surface-variant mb-16 max-w-3xl mx-auto leading-relaxed font-light"
        >
          We are building a future where infrastructure is invisible. A world where developers focus solely on logic, and the network handles the rest—autonomously, globally, and instantly.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-12 text-left">
          {[
            { title: 'Autonomous Scaling', desc: 'Predictive scaling that anticipates traffic spikes before they happen.' },
            { title: 'Quantum Security', desc: 'Post-quantum encryption standards for the next era of data protection.' },
            { title: 'Zero-Latency Mesh', desc: 'Direct-to-user routing that bypasses traditional internet bottlenecks.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-bold text-white flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {item.title}
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Architecture = () => {
  const steps = [
    { label: 'User', icon: <User /> },
    { label: 'Edge API', icon: <Network /> },
    { label: 'Services', icon: <Code2 /> },
    { label: 'Storage', icon: <Cloud /> }
  ];

  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black text-white">Universal Architecture.</h2>
        </div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 -z-10"></div>
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border border-white/10 group-hover:border-primary transition-all duration-500">
                <div className="text-on-surface-variant group-hover:text-primary transition-colors">
                  {step.icon}
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-outline">{step.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OpenSource = () => {
  return (
    <section id="github" className="py-32 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="p-12 rounded-3xl bg-gradient-to-br from-surface-container to-surface border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <Github size={200} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <Github size={14} className="text-white" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Open Source</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-6">Built in the open.</h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              CloudIgnite is built on top of open-source foundations. Our core runtime, SDKs, and CLI are all available on GitHub. Join 10,000+ developers contributing to the future of the edge.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-surface font-bold hover:bg-white/90 transition-all">
                <Github size={18} />
                Star on GitHub
              </button>
              <div className="flex items-center gap-6 px-6 py-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex flex-col">
                  <span className="text-white font-bold">12.4k</span>
                  <span className="text-[10px] text-outline uppercase font-bold">Stars</span>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-white font-bold">840+</span>
                  <span className="text-[10px] text-outline uppercase font-bold">Contributors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto relative rounded-3xl p-16 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl -z-10"></div>
        <div className="absolute inset-0 bg-surface-container-high/40 backdrop-blur-3xl -z-20"></div>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Start building the future — today.</h2>
        <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">Deploy your first serverless application in under 60 seconds.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/signup" className="px-12 py-5 rounded-md bg-gradient-to-r from-primary to-primary-dim text-surface font-black text-xl shadow-[0_0_50px_rgba(186,158,255,0.4)] hover:scale-105 transition-all active:scale-95 inline-block">
            Get Started for Free
          </Link>
          <button className="px-12 py-5 rounded-md border border-white/10 text-white font-black text-xl hover:bg-white/5 transition-all">
            Talk to Engineering
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-surface-container-low pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
        <div className="col-span-1 lg:col-span-2">
          <a href="#" className="mb-6 block hover:opacity-80 transition-opacity"><Logo className="h-8" /></a>
          <p className="text-sm text-on-surface-variant max-w-xs mb-8 leading-relaxed">
            The modern infrastructure stack for engineers who move fast. Global edge runtime, multi-tenant auth, and high-performance storage.
          </p>
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-white uppercase tracking-widest">Subscribe to our newsletter</h5>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-grow bg-surface-container border border-white/10 rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button
                type="submit"
                disabled={subscribed}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${subscribed ? 'bg-emerald-500 text-white' : 'bg-primary text-surface hover:opacity-90'}`}
              >
                {subscribed ? 'Joined!' : 'Join'}
              </button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] text-emerald-500 font-bold"
              >
                Welcome to the obsidian age. Check your inbox!
              </motion.p>
            )}
            <p className="text-[10px] text-outline">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Product</h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Features <Zap size={12} /></a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Runtime</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Edge Network</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Status Page</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Twitter size={14} /> Twitter</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Github size={14} /> GitHub</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><MessageSquare size={14} /> Discord</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Mail size={14} /> Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <p className="text-sm text-on-surface-variant">© {new Date().getFullYear()} CloudIgnite Inc. All rights reserved.</p>
          <a href="#" className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors group">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">All Systems Operational</span>
            </div>
          </a>
        </div>
        <div className="flex gap-8 text-xs text-outline">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-surface shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function Home() {
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCookieConsent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mesh-gradient min-h-screen selection:bg-primary selection:text-surface relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Custom Smooth Scroll Container (Visual Only) */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Logos />
        <Features />
        <UniversalArchitecture />
        <TechnicalSpecifications />
        <DashboardPreview />
        <GlobalNetwork />
        <SecuritySection />
        <EcosystemRoadmap />
        <CodeSnippet />
        <Pricing />
        <FutureVision />
        <FAQ />
        <OpenSource />
        <CTA />
        <Footer />
        <BackToTop />
      </div>

      {/* Cookie Consent Simulation */}
      <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-6 z-[100] max-w-sm p-6 bg-surface-container border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-2">Privacy Preference</h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed mb-4">
                  We use cookies to optimize site performance and analyze traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowCookieConsent(false)}
                    className="px-4 py-2 rounded bg-primary text-surface text-[10px] font-bold hover:bg-primary-dim transition-colors active:scale-95"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => setShowCookieConsent(false)}
                    className="px-4 py-2 rounded bg-white/5 text-white text-[10px] font-bold hover:bg-white/10 transition-colors active:scale-95"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:projectId/:serviceId?" element={<Project />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/arpit_cv" element={<ArpitCV />} />
      </Routes>
    </BrowserRouter>
  );
}
