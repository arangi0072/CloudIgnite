import { motion } from 'motion/react';
import { Activity, ArrowUpRight, Cpu, Database, Server, Layers, GitMerge } from 'lucide-react';

const TRENDS = [
  { name: 'Agentic AI', icon: Cpu, trend: '+142%', dataTarget: '94.2k', sparkline: [10, 20, 15, 30, 45, 60, 90] },
  { name: 'Vector DBs', icon: Database, trend: '+88%', dataTarget: '62.8k', sparkline: [20, 25, 30, 40, 55, 65, 80] },
  { name: 'Edge Computing', icon: Server, trend: '+64%', dataTarget: '45.1k', sparkline: [40, 35, 45, 50, 60, 65, 75] },
  { name: 'Rust Systems', icon: GitMerge, trend: '+55%', dataTarget: '38.5k', sparkline: [30, 40, 45, 40, 50, 60, 70] },
  { name: 'Kubernetes', icon: Layers, trend: '+24%', dataTarget: '112.4k', sparkline: [60, 65, 60, 70, 75, 80, 85] }
];

export function TrendingRadar() {
  return (
    <section className="py-24 relative overflow-hidden border-b border-white/5 bg-[#02040a]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-6">
          <div>
             <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2">
               TRENDING <span className="text-cyan-400">TECHNOLOGIES</span>
             </h2>
             <div className="flex items-center gap-3">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
               <p className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  Live Global Search Telemetry
               </p>
             </div>
          </div>
          <button className="text-[11px] font-mono border border-white/20 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 px-4 py-2 rounded transition-all flex items-center gap-2 uppercase tracking-wide">
            View Expanded Radar <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
           {TRENDS.map((tech, i) => {
             const Icon = tech.icon;
             return (
               <motion.div 
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-[#0a0f1c] border border-white/10 hover:border-cyan-500/30 p-5 rounded-lg flex flex-col group relative transition-all duration-300"
               >
                 <div className="flex justify-between items-start mb-6">
                    <div className="p-2.5 rounded bg-white/5 border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-colors">
                       <Icon className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                    </div>
                 </div>

                 <h3 className="text-slate-200 text-sm font-semibold mb-1">{tech.name}</h3>
                 
                 <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-2xl font-mono font-bold text-white tracking-tight">{tech.dataTarget}</span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">
                      {tech.trend}
                    </span>
                 </div>

                 {/* Minimalist Sparkline */}
                 <div className="mt-auto h-10 flex items-end gap-1 w-full border-b border-white/5 pb-1">
                    {tech.sparkline.map((val, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 + idx * 0.05 }}
                        className="flex-1 bg-slate-700 group-hover:bg-cyan-500 transition-colors rounded-t-[1px] opacity-40 group-hover:opacity-80"
                      />
                    ))}
                 </div>
               </motion.div>
             )
           })}
        </div>
      </div>
    </section>
  );
}
