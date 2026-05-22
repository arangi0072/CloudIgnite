import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { 
  BookOpen, 
  ChevronRight, 
  Code2, 
  Terminal, 
  Zap, 
  Shield, 
  Database, 
  Globe, 
  Search,
  Menu,
  X,
  Check,
  Copy,
  Sparkles,
  Settings,
  Mail
} from 'lucide-react';

const CodeBlock = ({ children, language = 'kotlin' }: { children: React.ReactNode, language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof children === 'string') {
      navigator.clipboard.writeText(children);
    } else if (Array.isArray(children)) {
      navigator.clipboard.writeText(children.join(''));
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#030305] border border-white/10 shadow-2xl group relative my-4 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_10px_rgba(255,95,86,0.5)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_10px_rgba(255,189,46,0.5)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.5)]"></div>
        </div>
        <div className="text-[11px] font-mono font-medium text-on-surface-variant/70 uppercase tracking-wider">{language}</div>
      </div>
      <div className="p-5 overflow-x-auto relative">
        <pre className="text-[13px] font-mono text-gray-300 leading-relaxed">
          {children}
        </pre>
        <button 
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 rounded-md bg-white/5 backdrop-blur-md border border-white/10 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
};

export default function Docs() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [activeGroup, setActiveGroup] = useState('Getting Started');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('h2[id], h3[id]');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
          current = section.getAttribute('id') || '';
        }
      });

      if (current) {
        setActiveSection(current);
      } else if (sections.length > 0) {
        // If we are at the top, highlight the first section
        setActiveSection(sections[0].getAttribute('id') || '');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeGroup]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sidebarLinks = [
    {
      title: 'Getting Started',
      items: [
        { id: 'introduction', label: 'Introduction', icon: <BookOpen size={16} /> },
        { id: 'installation', label: 'Installation', icon: <Terminal size={16} /> },
        { id: 'quick-start', label: 'Quick Start', icon: <Zap size={16} /> },
      ]
    },
    {
      title: 'Authentication',
      items: [
        { id: 'init', label: 'init()', icon: <Shield size={16} /> },
        { id: 'login', label: 'login()', icon: <Shield size={16} /> },
        { id: 'logout', label: 'logout()', icon: <Shield size={16} /> },
      ]
    },
    {
      title: 'User',
      items: [
        { id: 'getcurrentuser', label: 'getCurrentUser()', icon: <Code2 size={16} /> },
        { id: 'requireuser', label: 'requireUser()', icon: <Code2 size={16} /> },
        { id: 'ensureloggedin', label: 'ensureLoggedIn()', icon: <Code2 size={16} /> },
      ]
    },
    {
      title: 'Session',
      items: [
        { id: 'restoresession', label: 'restoreSession()', icon: <Database size={16} /> },
        { id: 'initializeandgetuser', label: 'initializeAndGetUser()', icon: <Database size={16} /> },
        { id: 'isloggedin', label: 'isLoggedIn()', icon: <Database size={16} /> },
      ]
    },
    {
      title: 'Auth State',
      items: [
        { id: 'onauthstatechanged', label: 'onAuthStateChanged()', icon: <Sparkles size={16} /> },
      ]
    },
    {
      title: 'API',
      items: [
        { id: 'me', label: 'me()', icon: <Globe size={16} /> },
        { id: 'sessions', label: 'sessions()', icon: <Globe size={16} /> },
        { id: 'revokesession', label: 'revokeSession()', icon: <Globe size={16} /> },
      ]
    },
    {
      title: 'Email Features',
      items: [
        { id: 'resendverification', label: 'resendVerification()', icon: <Mail size={16} /> },
        { id: 'changeemail', label: 'changeEmail()', icon: <Mail size={16} /> },
        { id: 'confirmemail', label: 'confirmEmail()', icon: <Mail size={16} /> },
        { id: 'emailstatus', label: 'emailStatus()', icon: <Mail size={16} /> },
      ]
    },
    {
      title: 'Admin (Premium)',
      items: [
        { id: 'createuser', label: 'createUser()', icon: <Settings size={16} /> },
        { id: 'listusers', label: 'listUsers()', icon: <Settings size={16} /> },
        { id: 'disableuser', label: 'disableUser()', icon: <Settings size={16} /> },
      ]
    },
    {
      title: 'Advanced',
      items: [
        { id: 'advanced', label: 'Token Lifecycle', icon: <Settings size={16} /> },
      ]
    }
  ];

  // Flatten links for search
  const allLinks = sidebarLinks.flatMap(group => group.items);
  const searchResults = searchQuery 
    ? allLinks.filter(link => link.label.toLowerCase().includes(searchQuery.toLowerCase()) || link.id.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-md" 
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="w-full max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center px-4 py-4 border-b border-white/10 bg-white/[0.02]">
                <Search size={20} className="text-primary mr-3" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search documentation..." 
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-on-surface-variant/50 font-medium"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setIsSearchOpen(false)} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors uppercase">ESC</button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((result, index) => (
                      <motion.a 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        key={result.id} 
                        href={`#${result.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/10 border border-transparent hover:border-primary/20 text-on-surface-variant hover:text-white transition-all duration-300"
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          {result.icon}
                        </span>
                        <span className="font-medium">{result.label}</span>
                        <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                      </motion.a>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="px-4 py-12 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Search size={20} className="text-on-surface-variant/50" />
                    </div>
                    <p className="text-on-surface-variant font-medium">No results found for "{searchQuery}"</p>
                    <p className="text-sm text-on-surface-variant/50 mt-1">Try searching for something else.</p>
                  </div>
                ) : (
                  <div className="px-4 py-12 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Search size={20} className="text-on-surface-variant/50" />
                    </div>
                    <p className="text-on-surface-variant/50 font-medium">Type to start searching...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      <div className="absolute inset-0 bg-surface [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_0%,#000_100%)] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="sticky top-0 w-full z-50 bg-surface/60 backdrop-blur-2xl border-b border-white/5 py-4">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:opacity-80 transition-opacity"><Logo className="h-8" /></Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-on-surface-variant">
              <Link to="/docs" className="text-white">Docs</Link>
              <Link to="/api" className="hover:text-white transition-colors">API</Link>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setIsSearchOpen(true)} className="flex items-center gap-3 px-4 py-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium text-on-surface-variant group cursor-pointer hover:border-primary/50 hover:bg-white/10 transition-all w-64">
              <Search size={16} className="group-hover:text-primary transition-colors" />
              <span>Search docs...</span>
              <span className="ml-auto px-1.5 py-0.5 rounded bg-white/10 text-[10px] border border-white/10">⌘K</span>
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-[1400px] w-full mx-auto flex flex-col md:flex-row relative">
        {/* Sidebar */}
        <aside className={`md:w-64 shrink-0 border-r border-white/5 py-8 px-6 overflow-y-auto sticky top-[73px] h-[calc(100vh-73px)] scrollbar-hide ${isMobileMenuOpen ? 'block absolute z-40 bg-surface/95 backdrop-blur-xl w-full' : 'hidden md:block'}`}>
          <div className="space-y-8">
            {sidebarLinks.map((group, i) => {
              const isActiveGroup = activeGroup === group.title;
              return (
              <div key={i} className={`transition-all duration-500 ${isActiveGroup ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                <h4 className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${isActiveGroup ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {isActiveGroup && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
                  {group.title}
                </h4>
                <ul className="space-y-1.5 border-l border-white/5 ml-1 pl-2">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setActiveGroup(group.title); setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                        className={`group w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 ${activeSection === item.id ? 'text-primary bg-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]' : isActiveGroup ? 'text-white hover:bg-white/10' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}`}
                      >
                        <span className={`transition-all duration-300 group-hover:scale-110 ${isActiveGroup ? 'text-primary' : 'text-on-surface-variant/50 group-hover:text-primary'}`}>
                          {item.icon}
                        </span>
                        <span className={`transition-transform duration-300 group-hover:translate-x-1 ${activeSection === item.id ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold' : ''}`}>
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )})}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-12 px-6 md:px-12 lg:px-16 max-w-4xl relative">
          {/* Glowing Background */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-primary blur-[150px] rounded-full pointer-events-none"
          />
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-20 relative z-10"
            >
            {/* Hero Section */}
            {activeGroup === 'Getting Started' && (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
<div id="introduction" className="pt-12 pb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                <Sparkles size={12} /> SDK Documentation
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 tracking-tight mb-6 leading-tight">
                CloudIgnite Auth
              </h1>
              <p className="text-xl text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
                Secure Authentication for Modern Apps. Build faster with our developer-first SDKs, designed for scale and simplicity.
              </p>
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="glass rounded-2xl overflow-hidden shadow-2xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="px-5 py-3 bg-white/5 border-b border-white/5 flex items-center gap-2">
                  <Zap size={16} className="text-primary animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Quick Start</span>
                </div>
                <div className="px-2 pb-2">
                  <CodeBlock language="kotlin">
                    <span className="text-pink-400">val</span> auth = CloudIgniteAuth.init(context, <span className="text-green-400">"api_key"</span>)
                    <br/><br/>
                    <span className="text-pink-400">val</span> user = auth.initializeAndGetUser()
                    <br/><br/>
                    <span className="text-pink-400">if</span> (user == <span className="text-pink-400">null</span>) {'{'}
                    <br/>    auth.login(<span className="text-green-400">"email"</span>, <span className="text-green-400">"password"</span>)
                    <br/>{'}'}
                  </CodeBlock>
                </div>
              </motion.div>
            </div>

            <div className="space-y-12">
              <div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h2 id="initialization" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <span className="text-2xl">🧩</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Initialization</span>
                  </h2>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    The entry point of the SDK. It must be called before using any other function.
                  </p>

                  <div className="space-y-12">
                    {/* init() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">⚡</span>
                        <h3 id="init" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          init(context, apiKey)
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Initializes the CloudIgniteAuth SDK and prepares the authentication system for use.</p>
                        <p>When initialized, the SDK:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Sets up internal networking (Retrofit + Interceptors)</li>
                          <li>Loads stored tokens (if available)</li>
                          <li>Automatically attempts to restore the previous session</li>
                          <li>Starts the background token refresher (if session exists)</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            CloudIgniteAuth.init(context: Context, apiKey: String): CloudIgniteAuth
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Parameters
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-on-surface-variant">
                              <tr>
                                <th className="px-5 py-3 font-medium">Name</th>
                                <th className="px-5 py-3 font-medium">Type</th>
                                <th className="px-5 py-3 font-medium">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-on-surface">
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">context</td>
                                <td className="px-5 py-4 font-mono text-amber-400">Context</td>
                                <td className="px-5 py-4">Application context (recommended: <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">applicationContext</code>)</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">apiKey</td>
                                <td className="px-5 py-4 font-mono text-amber-400">String</td>
                                <td className="px-5 py-4">Public API key (<code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">pk_ci_...</code>) for your CloudIgnite project</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface">
                          <span className="font-mono text-primary">CloudIgniteAuth</span> → Singleton instance of the SDK
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> auth = CloudIgniteAuth.init(
                            <br/>    applicationContext,
                            <br/>    apiKey = <span className="text-green-400">"pk_ci_xxxxxxxxx"</span>
                            <br/>)
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>This method is idempotent (safe to call multiple times)</li>
                          <li>Always use <code className="text-xs bg-amber-500/20 px-1.5 py-0.5 rounded">applicationContext</code> to avoid memory leaks</li>
                          <li>Automatically triggers session restoration in background</li>
                          <li>Does NOT block UI thread</li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* getInstance() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">⚡</span>
                        <h3 id="getinstance" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          getInstance()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Returns the existing instance of the CloudIgniteAuth SDK.</p>
                        <p>Use this method when you need access to the SDK instance after initialization, without calling <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">init()</code> again.</p>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            CloudIgniteAuth.getInstance(): CloudIgniteAuth
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface">
                          <span className="font-mono text-primary">CloudIgniteAuth</span> → Existing initialized instance
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-red-500/10 border-b border-red-500/10 text-xs font-bold text-red-400 uppercase tracking-wider">
                          ❌ Throws
                        </div>
                        <div className="p-5 text-on-surface">
                          <span className="font-mono text-red-400">IllegalStateException</span> → If <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">init()</code> has not been called before
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> auth = CloudIgniteAuth.getInstance()
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>Must be called after <code className="text-xs bg-amber-500/20 px-1.5 py-0.5 rounded">init()</code></li>
                          <li>Recommended for:
                            <ul className="list-circle pl-6 mt-2 space-y-1">
                              <li>accessing SDK in different classes</li>
                              <li>avoiding re-initialization</li>
                            </ul>
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 shadow-xl">
                        <h6 className="font-bold text-emerald-400 mb-4 flex items-center gap-3">
                          <span className="text-2xl">🧠</span> Best Practice
                        </h6>
                        <CodeBlock language="kotlin">
                            <span className="text-gray-500">// App start</span>
                            <br/><span className="text-pink-400">val</span> auth = CloudIgniteAuth.init(applicationContext, API_KEY)
                            <br/>
                            <br/><span className="text-gray-500">// Anywhere else</span>
                            <br/><span className="text-pink-400">val</span> auth = CloudIgniteAuth.getInstance()
                        </CodeBlock>
                        <div className="flex items-start gap-3 text-emerald-400/90 font-medium bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                          <span className="text-xl">🔥</span>
                          <div>
                            <span className="block font-bold mb-1">Developer Tip:</span>
                            <span>Call <code className="text-xs bg-emerald-500/20 px-1.5 py-0.5 rounded">init()</code> once (App start) → use <code className="text-xs bg-emerald-500/20 px-1.5 py-0.5 rounded">getInstance()</code> everywhere else</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
</div>
</motion.div>
)}
{activeGroup === 'Authentication' && (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
<div className="space-y-12">
<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h2 id="authentication" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <span className="text-2xl">🔑</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Authentication</span>
                  </h2>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    Manage user sessions, login, and logout flows.
                  </p>

                  <div className="space-y-12">
                    {/* login() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔐</span>
                        <h3 id="login" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          login(email, password)
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Authenticates a user using email and password.</p>
                        <p>This function performs a full login flow:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Sends credentials to the backend</li>
                          <li>Receives access + refresh tokens</li>
                          <li>Stores tokens securely</li>
                          <li>Starts automatic token refresh</li>
                          <li>Updates authentication state</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun login(email: String, password: String): Result&lt;User&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Parameters
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-on-surface-variant">
                              <tr>
                                <th className="px-5 py-3 font-medium">Name</th>
                                <th className="px-5 py-3 font-medium">Type</th>
                                <th className="px-5 py-3 font-medium">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-on-surface">
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">email</td>
                                <td className="px-5 py-4 font-mono text-amber-400">String</td>
                                <td className="px-5 py-4">User email</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">password</td>
                                <td className="px-5 py-4 font-mono text-amber-400">String</td>
                                <td className="px-5 py-4">User password</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-primary">Result.Success&lt;User&gt;</span> → Login successful</div>
                          <div><span className="font-mono text-red-400">Result.Error</span> → Login failed</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> result = auth.login(<span className="text-green-400">"user@example.com"</span>, <span className="text-green-400">"123456"</span>)
                            <br/>
                            <br/><span className="text-pink-400">when</span> (result) {'{'}
                            <br/>    <span className="text-pink-400">is</span> Result.Success -&gt; {'{'}
                            <br/>        Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Welcome </span><span className="text-blue-400">$</span>{'{'}result.data.email{'}'}<span className="text-green-400">"</span>)
                            <br/>    {'}'}
                            <br/>    <span className="text-pink-400">is</span> Result.Error -&gt; {'{'}
                            <br/>        Log.e(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Login failed: </span><span className="text-blue-400">$</span>{'{'}result.message{'}'}<span className="text-green-400">"</span>)
                            <br/>    {'}'}
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>Automatically starts background token refresh</li>
                          <li>Stores tokens using SharedPreferences</li>
                          <li>Safe to call from coroutines only (suspend)</li>
                          <li>Emits authenticated state internally</li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* logout() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🚪</span>
                        <h3 id="logout" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          logout()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Logs out the current user and clears session data.</p>
                        <p>This function:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Removes access + refresh tokens</li>
                          <li>Stops background token refresh</li>
                          <li>Resets authentication state</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            fun logout()
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            auth.logout()
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>User will be fully logged out</li>
                          <li>All API calls after logout will fail until re-login</li>
                          <li>Should be used for:
                            <ul className="list-circle pl-6 mt-2 space-y-1">
                              <li>manual logout</li>
                              <li>session expiration handling</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* loginOrNull() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🧪</span>
                        <h3 id="loginornull" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          loginOrNull(email, password)
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>A simplified login helper that returns <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">User?</code> instead of <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">Result</code>.</p>
                        <p>This is a DX-friendly wrapper over <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">login()</code>:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Returns <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">User</code> on success</li>
                          <li>Returns <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">null</code> on failure</li>
                          <li>No need to handle <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">Result</code></li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun loginOrNull(email: String, password: String): User?
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Parameters
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-on-surface-variant">
                              <tr>
                                <th className="px-5 py-3 font-medium">Name</th>
                                <th className="px-5 py-3 font-medium">Type</th>
                                <th className="px-5 py-3 font-medium">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-on-surface">
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">email</td>
                                <td className="px-5 py-4 font-mono text-amber-400">String</td>
                                <td className="px-5 py-4">User email</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">password</td>
                                <td className="px-5 py-4 font-mono text-amber-400">String</td>
                                <td className="px-5 py-4">User password</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-primary">User</span> → if login successful</div>
                          <div><span className="font-mono text-red-400">null</span> → if login failed</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> user = auth.loginOrNull(<span className="text-green-400">"user@example.com"</span>, <span className="text-green-400">"123456"</span>)
                            <br/>
                            <br/><span className="text-pink-400">if</span> (user != <span className="text-pink-400">null</span>) {'{'}
                            <br/>    Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Welcome </span><span className="text-blue-400">$</span>{'{'}user.email{'}'}<span className="text-green-400">"</span>)
                            <br/>{'}'} <span className="text-pink-400">else</span> {'{'}
                            <br/>    Log.e(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Login failed"</span>)
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>Best for quick flows / simple apps</li>
                          <li>Avoid if you need detailed error handling</li>
                          <li>Still performs full login internally (tokens + refresh)</li>
                        </ul>
                      </div>

                      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 shadow-xl">
                        <h6 className="font-bold text-indigo-400 mb-4 flex items-center gap-3">
                          <span className="text-2xl">🧠</span> Quick Comparison
                        </h6>
                        <div className="overflow-x-auto bg-[#0d1117] rounded-xl border border-white/5 mb-5 shadow-inner">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-on-surface-variant">
                              <tr>
                                <th className="px-5 py-3 font-medium">Function</th>
                                <th className="px-5 py-3 font-medium">Return Type</th>
                                <th className="px-5 py-3 font-medium">Use Case</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-on-surface">
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">login</td>
                                <td className="px-5 py-4 font-mono text-primary">Result&lt;User&gt;</td>
                                <td className="px-5 py-4">Full control, production apps</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">loginOrNull</td>
                                <td className="px-5 py-4 font-mono text-primary">User?</td>
                                <td className="px-5 py-4">Simple flows, fast dev</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">logout</td>
                                <td className="px-5 py-4 font-mono text-primary">Unit</td>
                                <td className="px-5 py-4">End session</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="flex items-start gap-3 text-indigo-400/90 font-medium bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                          <span className="text-xl">🔥</span>
                          <div>
                            <span className="block font-bold mb-1">Dev Insight:</span>
                            <span><code className="text-xs bg-indigo-500/20 px-1.5 py-0.5 rounded">login()</code> = control <br/> <code className="text-xs bg-indigo-500/20 px-1.5 py-0.5 rounded">loginOrNull()</code> = speed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
</div>
</motion.div>
)}
{activeGroup === 'User' && (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
<div className="space-y-12">
<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h2 id="user-apis" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <span className="text-2xl">👤</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">User APIs</span>
                  </h2>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    Manage and retrieve the authenticated user.
                  </p>

                  <div className="space-y-12">
                    {/* getCurrentUser() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🧍</span>
                        <h3 id="getcurrentuser" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          getCurrentUser()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Fetches the currently authenticated user from the backend (<code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">/me</code> endpoint).</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Uses stored access token</li>
                          <li>Returns user if session is valid</li>
                          <li>Returns null if not authenticated or expired</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun getCurrentUser(): User?
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-primary">User</span> → if authenticated</div>
                          <div><span className="font-mono text-red-400">null</span> → if not logged in / session expired</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> user = auth.getCurrentUser()
                            <br/>
                            <br/><span className="text-pink-400">if</span> (user != <span className="text-pink-400">null</span>) {'{'}
                            <br/>    Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Welcome </span><span className="text-blue-400">$</span>{'{'}user.email{'}'}<span className="text-green-400">"</span>)
                            <br/>{'}'} <span className="text-pink-400">else</span> {'{'}
                            <br/>    Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"User not logged in"</span>)
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>Safe function (no crash)</li>
                          <li>Internally calls <code className="text-xs bg-amber-500/20 px-1.5 py-0.5 rounded">/me</code></li>
                          <li>Recommended for most use cases</li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* requireUser() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔥</span>
                        <h3 id="requireuser" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          requireUser()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Strict version of <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">getCurrentUser()</code>.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Guarantees a logged-in user</li>
                          <li>Throws exception if user is not authenticated</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun requireUser(): User
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-primary">User</span> → always (if no error)</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-red-500/10 border-b border-red-500/10 text-xs font-bold text-red-400 uppercase tracking-wider">
                          ❌ Throws
                        </div>
                        <div className="p-5 text-on-surface">
                          <span className="font-mono text-red-400">Exception</span> → if user not logged in
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> user = auth.requireUser()
                            <br/>
                            <br/>Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"User: </span><span className="text-blue-400">$</span>{'{'}user.email{'}'}<span className="text-green-400">"</span>)
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>Use in protected screens</li>
                          <li>Avoid in optional flows (can crash)</li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* ensureLoggedIn() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">⚡</span>
                        <h3 id="ensureloggedin" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          ensureLoggedIn(email, password)
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Smart helper that:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Returns existing user if already logged in</li>
                          <li>Otherwise performs login automatically</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun ensureLoggedIn(email: String, password: String): User?
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-primary">User</span> → if session exists OR login successful</div>
                          <div><span className="font-mono text-red-400">null</span> → if login failed</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> user = auth.ensureLoggedIn(<span className="text-green-400">"user@example.com"</span>, <span className="text-green-400">"123456"</span>)
                            <br/>
                            <br/><span className="text-pink-400">if</span> (user != <span className="text-pink-400">null</span>) {'{'}
                            <br/>    Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Ready: </span><span className="text-blue-400">$</span>{'{'}user.email{'}'}<span className="text-green-400">"</span>)
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>Great for auto-login flows</li>
                          <li>Avoid storing password insecurely in production</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                
</div>
</motion.div>
)}
{activeGroup === 'Session' && (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
<div className="space-y-12">
<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h2 id="session-management" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <span className="text-2xl">🔁</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Session Management</span>
                  </h2>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    Manage tokens and session state.
                  </p>

                  <div className="space-y-12">
                    {/* restoreSession() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">♻️</span>
                        <h3 id="restoresession" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          restoreSession()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Restores user session using stored refresh token.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Calls <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">/refresh</code></li>
                          <li>Generates new access token</li>
                          <li>Starts background refresh cycle</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun restoreSession()
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            auth.restoreSession()
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>Automatically called inside <code className="text-xs bg-amber-500/20 px-1.5 py-0.5 rounded">init()</code></li>
                          <li>No return → use with <code className="text-xs bg-amber-500/20 px-1.5 py-0.5 rounded">getCurrentUser()</code></li>
                          <li>Clears session if refresh fails</li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* initializeAndGetUser() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">⚡</span>
                        <h3 id="initializeandgetuser" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          initializeAndGetUser()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Best function for app startup.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Restores session</li>
                          <li>Immediately fetches user</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun initializeAndGetUser(): User?
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-primary">User</span> → if session valid</div>
                          <div><span className="font-mono text-red-400">null</span> → if not logged in</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> user = auth.initializeAndGetUser()
                            <br/>
                            <br/><span className="text-pink-400">if</span> (user != <span className="text-pink-400">null</span>) {'{'}
                            <br/>    Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Welcome back </span><span className="text-blue-400">$</span>{'{'}user.email{'}'}<span className="text-green-400">"</span>)
                            <br/>{'}'} <span className="text-pink-400">else</span> {'{'}
                            <br/>    Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Please login"</span>)
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>👉 Use this in MainActivity / Splash screen</li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* isLoggedIn() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🟢</span>
                        <h3 id="isloggedin" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          isLoggedIn()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Checks whether a session exists locally.</p>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            fun isLoggedIn(): Boolean
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-primary">true</span> → refresh token exists</div>
                          <div><span className="font-mono text-red-400">false</span> → no session</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">if</span> (auth.isLoggedIn()) {'{'}
                            <br/>    Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"User session exists"</span>)
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>Does NOT verify token validity</li>
                          <li>Only checks local storage</li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* getAccessToken() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔑</span>
                        <h3 id="getaccesstoken" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          getAccessToken()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Returns the current access token.</p>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            fun getAccessToken(): String?
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-primary">String</span> → access token</div>
                          <div><span className="font-mono text-red-400">null</span> → if not available</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> token = auth.getAccessToken()
                            <br/>Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Token: </span><span className="text-blue-400">$</span>token<span className="text-green-400">"</span>)
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>Mostly internal use</li>
                          <li>Automatically attached via interceptor</li>
                          <li>Avoid exposing in logs (security risk)</li>
                        </ul>
                      </div>

                      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 shadow-xl mt-12">
                        <h6 className="font-bold text-indigo-400 mb-4 flex items-center gap-3">
                          <span className="text-2xl">🧠</span> DX Summary
                        </h6>
                        <div className="overflow-x-auto bg-[#0d1117] rounded-xl border border-white/5 shadow-inner">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-on-surface-variant">
                              <tr>
                                <th className="px-5 py-3 font-medium">Function</th>
                                <th className="px-5 py-3 font-medium">Purpose</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-on-surface">
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">getCurrentUser()</td>
                                <td className="px-5 py-4">Safe fetch</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">requireUser()</td>
                                <td className="px-5 py-4">Strict fetch</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">ensureLoggedIn()</td>
                                <td className="px-5 py-4">Auto login</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">restoreSession()</td>
                                <td className="px-5 py-4">Refresh session</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">initializeAndGetUser()</td>
                                <td className="px-5 py-4">App start</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">isLoggedIn()</td>
                                <td className="px-5 py-4">Quick check</td>
                              </tr>
                              <tr>
                                <td className="px-5 py-4 font-mono text-white">getAccessToken()</td>
                                <td className="px-5 py-4">Internal usage</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
</div>
</motion.div>
)}
{activeGroup === 'Auth State' && (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
<div className="space-y-12">
<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h2 id="auth-state" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <span className="text-2xl">🎧</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Auth State (🔥 Real-Time Auth)</span>
                  </h2>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    Listen for authentication state changes in real-time.
                  </p>

                  <div className="space-y-12">
                    {/* onAuthStateChanged() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">👀</span>
                        <h3 id="onauthstatechanged" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          onAuthStateChanged(listener)
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Listens for authentication state changes in real-time.</p>
                        <p>This gets triggered when:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>User logs in ✅</li>
                          <li>User logs out 🚪</li>
                          <li>Session restored 🔁</li>
                          <li>Token refresh updates 🔄</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            fun onAuthStateChanged(listener: (User?) -&gt; Unit)
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Callback Value
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-primary">User</span> → when logged in</div>
                          <div><span className="font-mono text-red-400">null</span> → when logged out</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            auth.onAuthStateChanged {'{'} user -&gt;
                            <br/>    <span className="text-pink-400">if</span> (user != <span className="text-pink-400">null</span>) {'{'}
                            <br/>        Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"User logged in: </span><span className="text-blue-400">$</span>{'{'}user.email{'}'}<span className="text-green-400">"</span>)
                            <br/>    {'}'} <span className="text-pink-400">else</span> {'{'}
                            <br/>        Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"User logged out"</span>)
                            <br/>    {'}'}
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <h6 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚡</span> Behavior
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-blue-400/90">
                          <li>Immediately triggers with current state (🔥 important)</li>
                          <li>Then listens for future updates</li>
                          <li>Works across: <code className="text-xs bg-blue-500/20 px-1.5 py-0.5 rounded">login()</code>, <code className="text-xs bg-blue-500/20 px-1.5 py-0.5 rounded">logout()</code>, <code className="text-xs bg-blue-500/20 px-1.5 py-0.5 rounded">restoreSession()</code></li>
                        </ul>
                      </div>

                      <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <h6 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
                          <span className="text-lg">🧠</span> Internal Flow
                        </h6>
                        <ul className="space-y-2 text-purple-400/90 font-mono text-sm">
                          <li>login() → notifyAuthState(user)</li>
                          <li>logout() → notifyAuthState(null)</li>
                          <li>restoreSession() → notifyAuthState(user)</li>
                        </ul>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h6 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Notes
                        </h6>
                        <ul className="list-disc pl-6 space-y-2 text-amber-500/90">
                          <li>No need to manually check session again</li>
                          <li>Perfect for UI updates (React-style pattern)</li>
                          <li>Works great with: Jetpack Compose, MVVM, Live UI screens</li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* notifyAuthState() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔔</span>
                        <h3 id="notifyauthstate" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          notifyAuthState(user) 
                          <span className="text-xs bg-white/10 px-2 py-1 rounded-full ml-2 text-on-surface-variant font-sans text-white">Internal</span>
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Internal function used to notify all listeners.</p>
                      </div>

                      <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
                        <h6 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                          <span className="text-lg">⚠️</span> Important
                        </h6>
                        <p className="text-red-400/90 mb-2">You must call this in:</p>
                        <ul className="space-y-2 text-red-400/90 font-mono text-sm">
                          <li>login()          → notifyAuthState(user)</li>
                          <li>logout()         → notifyAuthState(null)</li>
                          <li>restoreSession() → notifyAuthState(user)</li>
                        </ul>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Real World Usage Pattern */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">💡</span>
                        <h3 id="real-world-usage" className="text-xl font-bold text-white">Real World Usage Pattern</h3>
                      </div>
                      
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <span className="text-xl">🔥</span> Splash Screen
                          </h4>
                          <CodeBlock language="kotlin">
                            auth.onAuthStateChanged {'{'} user -&gt;
                            <br/>    <span className="text-pink-400">if</span> (user != <span className="text-pink-400">null</span>) {'{'}
                            <br/>        goToHome()
                            <br/>    {'}'} <span className="text-pink-400">else</span> {'{'}
                            <br/>        goToLogin()
                            <br/>    {'}'}
                            <br/>{'}'}
                          </CodeBlock>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <span className="text-xl">🔥</span> Compose Example
                          </h4>
                          <CodeBlock language="kotlin">
                            <span className="text-pink-400">var</span> user <span className="text-pink-400">by</span> remember {'{'} mutableStateOf&lt;User?&gt;(<span className="text-pink-400">null</span>) {'}'}
                            <br/>
                            <br/>LaunchedEffect(Unit) {'{'}
                            <br/>    auth.onAuthStateChanged {'{'}
                            <br/>        user = it
                            <br/>    {'}'}
                            <br/>{'}'}
                          </CodeBlock>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                
</div>
</motion.div>
)}
{activeGroup === 'API' && (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
<div className="space-y-12">
<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h2 id="api" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">API</span>
                  </h2>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    These functions interact directly with backend endpoints and return structured results using <code className="text-sm bg-white/10 px-1.5 py-0.5 rounded font-mono">Result&lt;T&gt;</code>.
                  </p>

                  <div className="space-y-12">
                    {/* me() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">👤</span>
                        <h3 id="me" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          me()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Fetches the currently authenticated user's full profile from the server.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Uses access token</li>
                          <li>Calls <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">/me</code> endpoint</li>
                          <li>Validates session server-side</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun me(): Result&lt;User&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-green-400">Result.Success&lt;User&gt;</span> → user data</div>
                          <div><span className="font-mono text-red-400">Result.Error</span> → if token invalid / expired</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> result = auth.me()
                            <br/><br/>
                            <span className="text-pink-400">when</span> (result) {'{'}
                            <br/>    <span className="text-pink-400">is</span> Result.Success -&gt; {'{'}
                            <br/>        Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"User: </span><span className="text-blue-400">$</span>{'{'}result.data.email{'}'}<span className="text-green-400">"</span>)
                            <br/>    {'}'}
                            <br/>    <span className="text-pink-400">is</span> Result.Error -&gt; {'{'}
                            <br/>        Log.e(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Error: </span><span className="text-blue-400">$</span>{'{'}result.message{'}'}<span className="text-green-400">"</span>)
                            <br/>    {'}'}
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>Requires valid access token</li>
                            <li>Automatically refreshed if expired (via interceptor)</li>
                            <li>Recommended for manual validation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* getSessions() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">📱</span>
                        <h3 id="getsessions" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          getSessions()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Returns all active sessions for the current user.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Each session represents a logged-in device</li>
                          <li>Useful for account security dashboards</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun getSessions(): Result&lt;List&lt;Session&gt;&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-green-400">Result.Success&lt;List&lt;Session&gt;&gt;</span> → list of sessions</div>
                          <div><span className="font-mono text-red-400">Result.Error</span> → request failed</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> sessions = auth.getSessions()
                            <br/><br/>
                            <span className="text-pink-400">if</span> (sessions <span className="text-pink-400">is</span> Result.Success) {'{'}
                            <br/>    sessions.data.forEach {'{'}
                            <br/>        Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Device: </span><span className="text-blue-400">$</span>{'{'}it.userAgent{'}'}<span className="text-green-400">"</span>)
                            <br/>    {'}'}
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <p>Helps build:</p>
                          <ul className="list-disc pl-6">
                            <li>“Logged in devices” screen</li>
                            <li>Security activity tracking</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* revokeSession() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">❌</span>
                        <h3 id="revokesession" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          revokeSession(id)
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Revokes a specific session by ID.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Logs out a single device</li>
                          <li>Invalidates its refresh token</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun revokeSession(id: String): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-green-400">Result.Success</span> → session revoked</div>
                          <div><span className="font-mono text-red-400">Result.Error</span> → failed</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            auth.revokeSession(<span className="text-green-400">"session_id_123"</span>)
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>Does NOT affect current session (unless you revoke it explicitly)</li>
                            <li>Use with <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded font-mono">getSessions()</code></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* revokeOtherSessions() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔥</span>
                        <h3 id="revokeothersessions" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          revokeOtherSessions()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Revokes all sessions except the current one.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Logs out user from all other devices</li>
                          <li>Keeps current device active</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun revokeOtherSessions(): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-green-400">Result.Success</span> → others revoked</div>
                          <div><span className="font-mono text-red-400">Result.Error</span> → failed</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            auth.revokeOtherSessions()
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <p>Great for:</p>
                          <ul className="list-disc pl-6">
                            <li>Security settings</li>
                            <li>“Logout from all devices” button</li>
                            <li>Common in apps like banking / Google accounts</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* API Summary */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🧠</span>
                        <h3 id="api-summary" className="text-xl font-bold text-white">API Summary</h3>
                      </div>
                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-white/5 border-b border-white/10">
                                <th className="p-4 text-sm font-bold text-white uppercase tracking-wider">Function</th>
                                <th className="p-4 text-sm font-bold text-white uppercase tracking-wider">Purpose</th>
                              </tr>
                            </thead>
                            <tbody className="text-on-surface-variant divide-y divide-white/5">
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">me()</td>
                                <td className="p-4">Get current user</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">getSessions()</td>
                                <td className="p-4">List all sessions</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">revokeSession(id)</td>
                                <td className="p-4">Logout one device</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">revokeOtherSessions()</td>
                                <td className="p-4">Logout all other devices</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Real-World Flow Example */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔥</span>
                        <h3 id="api-real-world-flow" className="text-xl font-bold text-white">Real-World Flow Example</h3>
                      </div>
                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> sessions = auth.getSessions()
                            <br/><br/>
                            <span className="text-pink-400">if</span> (sessions <span className="text-pink-400">is</span> Result.Success) {'{'}
                            <br/><br/>
                            <span className="text-on-surface-variant">    // logout all other devices</span>
                            <br/>    auth.revokeOtherSessions()
                            <br/><br/>
                            <span className="text-on-surface-variant">    // logout a specific device</span>
                            <br/>    auth.revokeSession(sessions.data.first().id)
                            <br/>{'}'}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </div>

                
</div>
</motion.div>
)}
{activeGroup === 'Email Features' && (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
<div className="space-y-12">
<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h2 id="email-features" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <span className="text-2xl">📧</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Email Features</span>
                  </h2>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    These APIs handle email verification, email updates, and account trust status.
                  </p>

                  <div className="space-y-12">
                    {/* resendVerification() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔁</span>
                        <h3 id="resendverification" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          resendVerification()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Resends the email verification link to the user.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Used when user didn’t receive email</li>
                          <li>Works only if email is not verified</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun resendVerification(): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-green-400">Result.Success</span> → email sent</div>
                          <div><span className="font-mono text-red-400">Result.Error</span> → failed</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            auth.resendVerification()
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>Requires user to be logged in</li>
                            <li>Should be rate-limited (backend)</li>
                            <li>Use in “Didn’t receive email?” UI</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* changeEmail() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">✉️</span>
                        <h3 id="changeemail" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          changeEmail(email)
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Initiates email change request.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Sends confirmation link to new email</li>
                          <li>Does NOT immediately update email</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun changeEmail(email: String): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-green-400">Result.Success</span> → email change initiated</div>
                          <div><span className="font-mono text-red-400">Result.Error</span> → failed</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            auth.changeEmail(<span className="text-green-400">"new@email.com"</span>)
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>Requires confirmation step (<code className="text-xs bg-white/10 px-1.5 py-0.5 rounded font-mono">confirmEmail</code>)</li>
                            <li>Prevents unauthorized email changes</li>
                            <li>Good security practice</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* confirmEmail() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">✅</span>
                        <h3 id="confirmemail" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          confirmEmail(token)
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Confirms email change or verification using token.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Token comes from email link</li>
                          <li>Final step of verification process</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun confirmEmail(token: String): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <div><span className="font-mono text-green-400">Result.Success</span> → email verified/updated</div>
                          <div><span className="font-mono text-red-400">Result.Error</span> → invalid or expired token</div>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            auth.confirmEmail(<span className="text-green-400">"token_from_email"</span>)
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <p>Usually triggered from:</p>
                          <ul className="list-disc pl-6">
                            <li>Deep link 🔗</li>
                            <li>Web redirect</li>
                            <li>Must be handled in app routing</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* emailStatus() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">📊</span>
                        <h3 id="emailstatus" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          emailStatus()
                        </h3>
                      </div>
                      
                      <div className="text-on-surface-variant space-y-4">
                        <p>Returns current email verification status.</p>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun emailStatus(): Result&lt;EmailStatusResponse&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Returns
                        </div>
                        <div className="p-5 text-on-surface space-y-2">
                          <p className="text-sm text-on-surface-variant mb-2">Example response:</p>
                          <pre className="bg-black/30 p-3 rounded-lg font-mono text-sm text-green-300">
{`{
  "email": "user@example.com",
  "verified": true
}`}
                          </pre>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> status = auth.emailStatus()
                            <br/><br/>
                            <span className="text-pink-400">if</span> (status <span className="text-pink-400">is</span> Result.Success) {'{'}
                            <br/>    Log.d(<span className="text-green-400">"SDK"</span>, <span className="text-green-400">"Verified: </span><span className="text-blue-400">$</span>{'{'}status.data.verified{'}'}<span className="text-green-400">"</span>)
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <p>Useful for:</p>
                          <ul className="list-disc pl-6">
                            <li>Showing “Verify your email” banner</li>
                            <li>Blocking features until verified</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Email Flow (Full Lifecycle) */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🧠</span>
                        <h3 id="email-flow" className="text-xl font-bold text-white">Email Flow (Full Lifecycle)</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-surface border border-white/5 rounded-xl overflow-hidden shadow-lg p-6">
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><span className="text-xl">🔄</span> Verification Flow</h4>
                          <div className="space-y-3 font-mono text-sm">
                            <div className="text-on-surface">User registers/login</div>
                            <div className="text-on-surface-variant text-center">↓</div>
                            <div className="text-primary">emailStatus() <span className="text-on-surface-variant">→ not verified</span></div>
                            <div className="text-on-surface-variant text-center">↓</div>
                            <div className="text-primary">resendVerification()</div>
                            <div className="text-on-surface-variant text-center">↓</div>
                            <div className="text-on-surface">User clicks email link</div>
                            <div className="text-on-surface-variant text-center">↓</div>
                            <div className="text-primary">confirmEmail(token)</div>
                            <div className="text-on-surface-variant text-center">↓</div>
                            <div className="text-primary">emailStatus() <span className="text-green-400">→ verified ✅</span></div>
                          </div>
                        </div>

                        <div className="bg-surface border border-white/5 rounded-xl overflow-hidden shadow-lg p-6">
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><span className="text-xl">✉️</span> Email Change Flow</h4>
                          <div className="space-y-3 font-mono text-sm">
                            <div className="text-primary">changeEmail(newEmail)</div>
                            <div className="text-on-surface-variant text-center">↓</div>
                            <div className="text-on-surface">User receives email</div>
                            <div className="text-on-surface-variant text-center">↓</div>
                            <div className="text-primary">confirmEmail(token)</div>
                            <div className="text-on-surface-variant text-center">↓</div>
                            <div className="text-green-400">Email updated ✅</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Email Summary */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🧠</span>
                        <h3 id="email-summary" className="text-xl font-bold text-white">Summary</h3>
                      </div>
                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-white/5 border-b border-white/10">
                                <th className="p-4 text-sm font-bold text-white uppercase tracking-wider">Function</th>
                                <th className="p-4 text-sm font-bold text-white uppercase tracking-wider">Purpose</th>
                              </tr>
                            </thead>
                            <tbody className="text-on-surface-variant divide-y divide-white/5">
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">resendVerification()</td>
                                <td className="p-4">Send verification email</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">changeEmail(email)</td>
                                <td className="p-4">Start email change</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">confirmEmail(token)</td>
                                <td className="p-4">Confirm via token</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">emailStatus()</td>
                                <td className="p-4">Check verification</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
</div>
</motion.div>
)}
{activeGroup === 'Admin (Premium)' && (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
<div className="space-y-12">
<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h2 id="admin" className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="text-2xl">🛠</span> Admin SDK <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full ml-2 font-sans uppercase tracking-widest">Premium</span>
                  </h2>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    Server-side administrative functions for managing users.
                  </p>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                        <span className="text-xl">⚠️</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-red-400 mb-2">Important</h4>
                        <ul className="list-disc pl-5 space-y-1 text-red-200/80">
                          <li>This SDK is server-side only</li>
                          <li>Uses secret key (<code className="text-xs bg-red-500/20 px-1.5 py-0.5 rounded font-mono">sk_ci_...</code>)</li>
                          <li>Must NEVER be used in client apps ❌</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-12">
                    {/* init() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">⚡</span>
                        <h3 id="admin-init" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          init(secretKey)
                        </h3>
                      </div>
                      <div className="text-on-surface-variant space-y-4">
                        <p>Initializes the Admin SDK using your project’s secret key.</p>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            CloudIgniteAdmin.init(secretKey: String): CloudIgniteAdmin
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> admin = CloudIgniteAdmin.init(<span className="text-green-400">"sk_ci_123456..."</span>)
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>Secret key must start with <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded font-mono">sk_ci_</code></li>
                            <li>Used for User management and Security operations</li>
                            <li>Stored securely (env variables recommended)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="text-2xl">👥</span> Admin User Management
                    </h3>

                    {/* createUser() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">➕</span>
                        <h3 id="createuser" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          createUser(email, password)
                        </h3>
                      </div>
                      <div className="text-on-surface-variant space-y-4">
                        <p>Creates a new user inside your project.</p>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun createUser(email: String, password: String): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            admin.createUser(<span className="text-green-400">"user@example.com"</span>, <span className="text-green-400">"123456"</span>)
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>Email must be unique</li>
                            <li>Password should be validated (backend recommended)</li>
                            <li>Does NOT log user in</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* listUsers() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">📋</span>
                        <h3 id="listusers" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          listUsers()
                        </h3>
                      </div>
                      <div className="text-on-surface-variant space-y-4">
                        <p>Returns all users in the project.</p>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun listUsers(): Result&lt;List&lt;User&gt;&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> users = admin.listUsers()
                            <br/><br/>
                            <span className="text-pink-400">if</span> (users <span className="text-pink-400">is</span> Result.Success) {'{'}
                            <br/>    users.data.forEach {'{'}
                            <br/>        println(it.email)
                            <br/>    {'}'}
                            <br/>{'}'}
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <p>Useful for:</p>
                          <ul className="list-disc pl-6">
                            <li>Admin dashboards</li>
                            <li>Analytics</li>
                            <li>Should support pagination (future improvement)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* deleteUser() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">❌</span>
                        <h3 id="deleteuser" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          deleteUser(userId)
                        </h3>
                      </div>
                      <div className="text-on-surface-variant space-y-4">
                        <p>Deletes a user permanently.</p>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun deleteUser(userId: String): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            admin.deleteUser(<span className="text-green-400">"user_id_123"</span>)
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>Irreversible action ⚠️</li>
                            <li>Should also remove sessions and clean related data (future)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* disableUser() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">⛔</span>
                        <h3 id="disableuser" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          disableUser(userId)
                        </h3>
                      </div>
                      <div className="text-on-surface-variant space-y-4">
                        <p>Disables a user account.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Prevents login</li>
                          <li>Keeps data intact</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun disableUser(userId: String): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            admin.disableUser(<span className="text-green-400">"user_id_123"</span>)
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>Safer than delete</li>
                            <li>Ideal for Abuse control and Temporary bans</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* revokeSessions() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔥</span>
                        <h3 id="admin-revokesessions" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          revokeSessions(userId)
                        </h3>
                      </div>
                      <div className="text-on-surface-variant space-y-4">
                        <p>Revokes all active sessions for a user.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Logs user out from all devices</li>
                          <li>Invalidates refresh tokens</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun revokeSessions(userId: String): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            admin.revokeSessions(<span className="text-green-400">"user_id_123"</span>)
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>Used for Security breaches and Forced logout</li>
                            <li>Works instantly across devices</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="text-2xl">🔐</span> Security
                    </h3>

                    {/* rotateJWT() */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔄</span>
                        <h3 id="rotatejwt" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          rotateJWT(projectId)
                        </h3>
                      </div>
                      <div className="text-on-surface-variant space-y-4">
                        <p>Rotates the JWT secret for a project.</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Invalidates ALL existing access tokens</li>
                          <li>Forces re-authentication</li>
                        </ul>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider">
                          Function Signature
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className="text-base text-primary font-mono whitespace-nowrap">
                            suspend fun rotateJWT(projectId: String): Result&lt;Unit&gt;
                          </code>
                        </div>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>✅ Example</span>
                        </div>
                        <CodeBlock language="kotlin">
                            admin.rotateJWT(<span className="text-green-400">"project_id_123"</span>)
                        </CodeBlock>
                      </div>

                      <div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="px-5 py-3 bg-white/5 border-b border-white/5 text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-2">
                          <span>⚠️ Notes</span>
                        </div>
                        <div className="p-5 text-on-surface-variant space-y-2">
                          <ul className="list-disc pl-6">
                            <li>High-impact operation ⚠️</li>
                            <li>Use in Security incidents and Key leaks</li>
                            <li>All users will be logged out</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Admin SDK Summary */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🧠</span>
                        <h3 id="admin-summary" className="text-xl font-bold text-white">Admin SDK Summary</h3>
                      </div>
                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-white/5 border-b border-white/10">
                                <th className="p-4 text-sm font-bold text-white uppercase tracking-wider">Function</th>
                                <th className="p-4 text-sm font-bold text-white uppercase tracking-wider">Purpose</th>
                              </tr>
                            </thead>
                            <tbody className="text-on-surface-variant divide-y divide-white/5">
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">init()</td>
                                <td className="p-4">Initialize admin SDK</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">createUser()</td>
                                <td className="p-4">Create user</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">listUsers()</td>
                                <td className="p-4">Get all users</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">deleteUser()</td>
                                <td className="p-4">Delete user</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">disableUser()</td>
                                <td className="p-4">Disable account</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">revokeSessions()</td>
                                <td className="p-4">Logout user everywhere</td>
                              </tr>
                              <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">rotateJWT()</td>
                                <td className="p-4">Reset auth system</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Real-World Admin Flow */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="text-2xl">🔥</span>
                        <h3 id="admin-real-world-flow" className="text-xl font-bold text-white">Real-World Admin Flow</h3>
                      </div>
                      <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <CodeBlock language="kotlin">
                            <span className="text-pink-400">val</span> admin = CloudIgniteAdmin.init(<span className="text-green-400">"sk_ci_..."</span>)
                            <br/><br/>
                            <span className="text-on-surface-variant">    // create user</span>
                            <br/>    admin.createUser(<span className="text-green-400">"user@mail.com"</span>, <span className="text-green-400">"123456"</span>)
                            <br/><br/>
                            <span className="text-on-surface-variant">    // list users</span>
                            <br/>    <span className="text-pink-400">val</span> users = admin.listUsers()
                            <br/><br/>
                            <span className="text-on-surface-variant">    // disable suspicious user</span>
                            <br/>    admin.disableUser(<span className="text-green-400">"user_id"</span>)
                            <br/><br/>
                            <span className="text-on-surface-variant">    // force logout</span>
                            <br/>    admin.revokeSessions(<span className="text-green-400">"user_id"</span>)
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </div>

                
</div>
</motion.div>
)}
{activeGroup === 'Advanced' && (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
<div className="space-y-12">
<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h2 id="advanced" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <span className="text-2xl">⚙️</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Advanced</span>
                  </h2>
                  <p className="text-on-surface-variant mb-8 text-lg">
                    Deep dive into internal SDK mechanics.
                  </p>

                  <div className="space-y-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <h3 id="token-lifecycle" className="text-xl font-bold text-white">Token Lifecycle</h3>
                      </div>
                      <div className="text-on-surface-variant space-y-4">
                        <p>CloudIgniteAuth uses short-lived JWT access tokens and long-lived refresh tokens. The SDK automatically handles token rotation in the background.</p>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <h3 id="interceptor-system" className="text-xl font-bold text-white">Interceptor System</h3>
                      </div>
                      <div className="text-on-surface-variant space-y-4">
                        <p>You can hook into the OkHttp interceptor chain to inject the access token into your own API requests automatically.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
</motion.div>
)}
        
          {/* Next / Previous Navigation */}
          <div className="mt-24 pt-8 border-t border-white/10 flex items-center justify-between">
            {sidebarLinks.findIndex(g => g.title === activeGroup) > 0 ? (
              <button 
                onClick={() => {
                  const idx = sidebarLinks.findIndex(g => g.title === activeGroup);
                  setActiveGroup(sidebarLinks[idx - 1].title);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col items-start gap-2 px-6 py-4 rounded-xl glass hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline group-hover:text-primary transition-colors">Previous</span>
                <span className="text-white font-medium flex items-center gap-2">
                  <ChevronRight size={16} className="rotate-180 text-primary/50 group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                  {sidebarLinks[sidebarLinks.findIndex(g => g.title === activeGroup) - 1]?.title}
                </span>
              </button>
            ) : <div></div>}

            {sidebarLinks.findIndex(g => g.title === activeGroup) < sidebarLinks.length - 1 ? (
              <button 
                onClick={() => {
                  const idx = sidebarLinks.findIndex(g => g.title === activeGroup);
                  setActiveGroup(sidebarLinks[idx + 1].title);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col items-end gap-2 px-6 py-4 rounded-xl glass hover:border-primary/50 transition-all duration-300 text-right hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline group-hover:text-primary transition-colors">Next</span>
                <span className="text-white font-medium flex items-center gap-2">
                  {sidebarLinks[sidebarLinks.findIndex(g => g.title === activeGroup) + 1]?.title}
                  <ChevronRight size={16} className="text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </span>
              </button>
            ) : <div></div>}
          </div>
            </motion.div>
          </AnimatePresence>

        </main>

        {/* Right Sidebar (TOC) */}
        <aside className="hidden xl:block w-64 shrink-0 py-12 px-6 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto scrollbar-hide border-l border-white/5">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80 mb-6">On this page</h4>
          <ul className="space-y-3 text-[13px] text-on-surface-variant font-medium">
            {sidebarLinks.find(g => g.title === activeGroup)?.items.map(item => (
              <li key={item.id}>
                <a 
                  href={"#" + item.id} 
                  onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className={`transition-all duration-300 flex items-center gap-2 group px-3 py-2 rounded-lg ${activeSection === item.id ? 'text-primary font-bold bg-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]' : 'hover:text-white hover:bg-white/5'}`}
                >
                  <ChevronRight size={14} className={`transition-colors ${activeSection === item.id ? 'text-primary' : 'text-primary/50 group-hover:text-primary'}`} /> 
                  <span className={`${activeSection === item.id ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary' : ''}`}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
