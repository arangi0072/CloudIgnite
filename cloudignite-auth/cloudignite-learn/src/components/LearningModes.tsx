import { motion } from 'motion/react';
import { BookOpen, Map, Target, Briefcase, GraduationCap, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const MODES = [
  { title: 'Foundations', desc: 'Core architecture concepts', icon: BookOpen, progress: 100, color: 'text-slate-400', path: '/foundations' },
  { title: 'System Design', desc: 'Mastering distributed systems', icon: Map, progress: 45, color: 'text-cyan-400', path: '/system-design' },
  { title: 'AI Engineering', desc: 'LLMs, RAG, and AI Agents', icon: Bot, progress: 15, color: 'text-amber-400', path: '/' },
  { title: 'Interview Prep', desc: 'Big tech interview simulations', icon: Target, progress: 12, color: 'text-purple-400', path: '/' },
  { title: 'Industry Deep Dive', desc: 'Deconstructing real apps', icon: Briefcase, progress: 0, color: 'text-emerald-400', path: '/' },
  { title: 'Advanced Topics', desc: 'Consensus algorithms & more', icon: GraduationCap, progress: 0, color: 'text-rose-400', path: '/' },
];

export function LearningModes() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-[40px] md:text-[50px] font-display font-black mb-4 tracking-tight leading-[0.9]">LEARNING <span className="text-cyan-400">MODES</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Progress from fundamental building blocks to principal-level system design. The platform adapts to your current knowledge.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {MODES.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <Link to={mode.path} key={mode.title} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] block group">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 whileHover={{ y: -10, scale: 1.02 }}
                 className="w-full h-full bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl relative cursor-pointer shadow-2xl flex flex-col"
               >
                 {/* Hover lighting sweep */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                 
                 <div className="flex justify-between items-start mb-12">
                   <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                     <Icon className={`w-6 h-6 ${mode.color}`} />
                   </div>
                   
                   {/* Progress Ring Simulation */}
                   <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-white/10" />
                        <circle 
                          cx="24" cy="24" r="20" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          fill="transparent" 
                          strokeDasharray={125.6} 
                          strokeDashoffset={125.6 - (125.6 * mode.progress) / 100} 
                          className={`${mode.color} transition-all duration-1000 ease-out`} 
                        />
                      </svg>
                      <span className="absolute text-[10px] font-bold tracking-tighter">{mode.progress}%</span>
                   </div>
                 </div>

                 <h3 className="text-2xl font-black mb-2 tracking-tight">{mode.title}</h3>
                 <p className="text-slate-400 text-sm mb-6">{mode.desc}</p>
                 
                 <div className="flex items-center gap-3 mt-auto">
                    <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-900" />
                       <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-900" />
                       <div className="w-6 h-6 rounded-full bg-slate-600 border border-slate-900" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">+12.4k learners</span>
                 </div>
               </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
