import { motion } from 'motion/react';
import { TerminalSquare, TrendingUp, GitPullRequest, Radio } from 'lucide-react';

const FEED = [
  { time: '10:42 AM', type: 'TREND', text: 'Supabase real-time subscriptions seeing 80% spike in search volume.', color: 'text-purple-400' },
  { time: '10:38 AM', type: 'GITHUB', text: 'vercel/ai repo just crossed 10k stars. New agentic frameworks released.', color: 'text-slate-300' },
  { time: '10:15 AM', type: 'ARCH', text: 'Post: "How we migrated from Lambda to ECS" trending at #1.', color: 'text-cyan-400' },
  { time: '09:55 AM', type: 'AI ALERT', text: 'Claude 3.5 Sonnet outperforming Opus in coding benchmarks.', color: 'text-rose-400' },
  { time: '09:30 AM', type: 'STARTUP', text: 'Vector DB startup Pinecone announces serverless architecture.', color: 'text-emerald-400' },
];

export function IntelligenceFeed() {
  return (
    <section className="py-24 relative bg-[#02040a] border-y border-white/5">
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3">
           <div className="sticky top-24">
             <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
               <Radio className="w-3 h-3 animate-pulse" /> Live Terminal
             </div>
             <h2 className="text-[40px] md:text-[50px] font-display font-black mb-4 tracking-tight leading-[0.9]">DEVELOPER <span className="text-cyan-400">PULSE</span></h2>
             <p className="text-slate-400 mb-8 max-w-sm">
                A real-time Bloomberg terminal for software engineering. Stay ahead of infrastructure trends, GitHub spikes, and architectural shifts.
             </p>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-inner">
                  <div className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">Active Users</div>
                  <div className="text-2xl font-black text-cyan-400">4,281</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-inner">
                  <div className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">Systems Tracked</div>
                  <div className="text-2xl font-black text-purple-400">18,405</div>
                </div>
             </div>
           </div>
        </div>

        <div className="lg:w-2/3">
           <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative backdrop-blur-xl">
              {/* Terminal Header */}
              <div className="bg-black/60 border-b border-white/10 px-4 py-3 flex justify-between items-center">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                   <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                 </div>
                 <div className="font-mono text-[10px] uppercase font-bold tracking-widest text-slate-500">DEV_INTEL_STREAM.sh</div>
                 <TerminalSquare className="w-4 h-4 text-slate-600" />
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm h-[400px] overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-[#02040a] to-transparent z-10" />
                 
                 <div className="space-y-4">
                    {FEED.map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex gap-4 border-b border-white/5 pb-4 last:border-0"
                      >
                         <span className="text-slate-600 shrink-0 font-bold">{item.time}</span>
                         <span className={`shrink-0 w-24 [text-shadow:0_0_8px_currentColor] font-bold ${item.color}`}>
                           [{item.type}]
                         </span>
                         <span className="text-slate-300 font-medium">{item.text}</span>
                      </motion.div>
                    ))}
                    
                    <motion.div 
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-cyan-500 flex items-center gap-2 pt-2"
                    >
                      <span className="w-2.5 h-4 bg-cyan-500 block" /> Awaiting new signals...
                    </motion.div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
