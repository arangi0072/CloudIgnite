import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { ArrowLeft, Mail, Lock, User, Terminal, Zap, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-surface flex relative overflow-hidden selection:bg-primary selection:text-surface">
      {/* Left Creative Side */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden border-r border-white/5 bg-surface-container-lowest">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-secondary)_0%,transparent_50%)] opacity-10 pointer-events-none"></div>
        <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        <div className="relative z-10 w-full max-w-lg p-12">
          <Link to="/" className="inline-flex items-center mb-16 hover:opacity-80 transition-opacity">
            <Logo className="h-10" textClass="text-3xl" />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-black text-white mb-6 leading-[1.1]">
              Start building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondary to-primary">the future.</span>
            </h2>
            <p className="text-lg text-on-surface-variant mb-12">
              Join thousands of developers building scalable, high-performance applications on our global edge network.
            </p>

            <div className="space-y-4">
              {[
                { icon: Globe, title: "Global Edge Network", desc: "275+ PoPs worldwide for zero latency" },
                { icon: Terminal, title: "Zero-config Deployments", desc: "Push to main and you're instantly live" },
                { icon: Zap, title: "Sub-millisecond Execution", desc: "Lightning fast serverless functions" }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-on-surface-variant">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10 bg-surface">
        {/* Mobile Nav */}
        <nav className="lg:hidden p-6 flex items-center justify-between border-b border-white/5">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Logo className="h-6" textClass="text-xl" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back
          </Link>
        </nav>

        {/* Desktop Back Button */}
        <div className="hidden lg:flex justify-end p-8">
          <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        <main className="flex-grow flex items-center justify-center p-6 lg:p-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="text-center lg:text-left mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Globe size={12} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Join 50,000+ Developers</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">Create an account</h1>
              <p className="text-sm text-on-surface-variant">Join CloudIgnite and start building</p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2 group">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest group-focus-within:text-primary transition-colors">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-outline group-focus-within:text-primary transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                    placeholder="Ada Lovelace"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest group-focus-within:text-primary transition-colors">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-outline group-focus-within:text-primary transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest group-focus-within:text-primary transition-colors">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-outline group-focus-within:text-primary transition-colors" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {password.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${password.length < 8 ? 'w-1/3 bg-red-500' : password.length < 12 ? 'w-2/3 bg-amber-500' : 'w-full bg-emerald-500'}`}></div>
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-medium w-16 text-right">
                      {password.length < 8 ? 'Weak' : password.length < 12 ? 'Good' : 'Strong'}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input type="checkbox" id="terms" required className="peer appearance-none w-4 h-4 border border-white/20 rounded bg-surface-container-low checked:bg-primary checked:border-primary transition-colors cursor-pointer" />
                  <svg className="absolute w-3 h-3 text-surface pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer select-none">
                  I agree to the <a href="#" className="text-primary hover:text-primary-dim transition-colors">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary-dim transition-colors">Privacy Policy</a>.
                </label>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 mt-6 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-surface font-black text-sm shadow-[0_0_20px_rgba(186,158,255,0.3)] hover:shadow-[0_0_30px_rgba(186,158,255,0.5)] transition-all active:scale-[0.98] group"
              >
                Create Account
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center lg:text-left">
              <p className="text-sm text-on-surface-variant">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-white hover:text-primary transition-colors">Sign in</Link>
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
