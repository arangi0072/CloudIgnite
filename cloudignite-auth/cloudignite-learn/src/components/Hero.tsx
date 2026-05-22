import { motion } from 'motion/react';
import { Search, ChevronRight, Network, Database, Server, Layers, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

const SUGGESTIONS = [
  "How Netflix scales globally",
  "Kafka vs RabbitMQ",
  "Go concurrency explained",
  "Build scalable auth system"
];

export function Hero() {
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % SUGGESTIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-32">
      {/* Floating particles (simplified representation) */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/4 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="w-full lg:w-3/5 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">CloudIgnite Learn OS v2.0</span>
              </div>
              
              <h1 className="text-[50px] md:text-[70px] lg:text-[80px] font-display font-black leading-[0.85] tracking-tight mb-6">
                EXPLORE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">TECHNOLOGY</span> <br/>
                <span className="italic text-cyan-400 font-light underline decoration-1 underline-offset-8">BEYOND</span> SEARCH
              </h1>
              
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8">
                Visualize systems, discover trending technologies, understand architectures, and learn how modern software powers the world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-2xl"
            >
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-2xl opacity-50 pointer-events-none"></div>
              <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl p-2 rounded-2xl flex items-center shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-cyan-500">
                <div className="px-4">
                  <Search className="w-6 h-6 text-cyan-400 transition-colors" />
                </div>
                <div className="flex-1 min-w-0 relative h-12 flex items-center">
                  <input 
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none text-lg font-bold text-slate-100 placeholder:text-transparent"
                  />
                  {!searchValue && (
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                       <motion.span
                          key={suggestionIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-slate-500 font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis"
                       >
                         {SUGGESTIONS[suggestionIndex]}
                       </motion.span>
                    </div>
                  )}
                </div>
                <div className="px-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-cyan-400 transition-colors"
                  >
                    <span>ANALYZE</span>
                  </motion.button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Suggestions:</span>
                <button className="text-[10px] text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded hover:bg-white/10 transition-colors flex items-center gap-1">
                  Start Exploring <ChevronRight className="w-3 h-3 text-cyan-400" />
                </button>
                <button className="text-[10px] text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded hover:bg-white/10 transition-colors flex items-center gap-1">
                  Trending Technologies <ChevronRight className="w-3 h-3 text-purple-400" />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-2/5 flex justify-center items-center relative min-h-[500px]">
             <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                {/* Floating Node System Architecture Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                   {/* Background pulse */}
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)]" />
                   
                   {/* Core Node */}
                   <motion.div 
                     animate={{ y: [-8, 8, -8] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute w-24 h-24 bg-gradient-to-br from-cyan-900/40 to-slate-900 border border-cyan-500/40 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur-md z-20"
                   >
                     <Network className="w-10 h-10 text-cyan-400" />
                     <div className="absolute inset-0 border border-cyan-400/20 rounded-2xl animate-ping" style={{ animationDuration: '3s' }} />
                   </motion.div>

                   {/* Satellite Nodes */}
                   {/* Node 1: Top Left */}
                   <motion.div 
                     animate={{ y: [-5, 5, -5], x: [-5, 5, -5] }}
                     transition={{ duration: 7, delay: 0, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-[10%] left-[10%] w-16 h-16 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center shadow-lg z-20 group hover:border-cyan-500/50 transition-colors"
                   >
                     <Database className="w-6 h-6 text-slate-400 group-hover:text-cyan-400" />
                   </motion.div>

                   {/* Node 2: Top Right */}
                   <motion.div 
                     animate={{ y: [5, -5, 5], x: [-5, 5, -5] }}
                     transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-[20%] right-[10%] w-16 h-16 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center shadow-lg z-20 group hover:border-purple-500/50 transition-colors"
                   >
                     <Server className="w-6 h-6 text-slate-400 group-hover:text-purple-400" />
                   </motion.div>

                   {/* Node 3: Bottom Right */}
                   <motion.div 
                     animate={{ y: [-6, 6, -6], x: [5, -5, 5] }}
                     transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute bottom-[15%] right-[15%] w-16 h-16 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center shadow-lg z-20 group hover:border-emerald-500/50 transition-colors"
                   >
                     <Layers className="w-6 h-6 text-slate-400 group-hover:text-emerald-400" />
                   </motion.div>

                   {/* Node 4: Bottom Left */}
                   <motion.div 
                     animate={{ y: [6, -6, 6], x: [5, -5, 5] }}
                     transition={{ duration: 6, delay: 3, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute bottom-[20%] left-[5%] w-16 h-16 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center shadow-lg z-20 group hover:border-fuchsia-500/50 transition-colors"
                   >
                     <Globe className="w-6 h-6 text-slate-400 group-hover:text-fuchsia-400" />
                   </motion.div>

                   {/* Connection Lines (SVG) */}
                   <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.2))' }}>
                      <motion.line x1="50%" y1="50%" x2="20%" y2="20%" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5" strokeDasharray="4 4" 
                        animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                      <motion.line x1="50%" y1="50%" x2="80%" y2="28%" stroke="rgba(168,85,247,0.2)" strokeWidth="1.5" strokeDasharray="4 4" 
                        animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
                      <motion.line x1="50%" y1="50%" x2="77%" y2="77%" stroke="rgba(16,185,129,0.2)" strokeWidth="1.5" strokeDasharray="4 4" 
                        animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                      <motion.line x1="50%" y1="50%" x2="15%" y2="72%" stroke="rgba(217,70,239,0.2)" strokeWidth="1.5" strokeDasharray="4 4" 
                        animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }} />
                   </svg>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Live Stats Bar */}
      <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/40 backdrop-blur-xl h-32 hidden md:block mt-8">
        <div className="container mx-auto px-6 h-full flex items-center justify-between text-sm overflow-x-auto whitespace-nowrap gap-12">
            <div>
               <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1 flex items-center gap-2"> Total Index Capacity</div>
               <div className="text-2xl font-black text-white">2M+ <span className="text-xs text-green-400 font-normal">TECH SEARCHES</span></div>
            </div>
            <div className="h-12 w-[1px] bg-white/10" />
            <div>
               <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1 flex items-center gap-2"> Architecture Maps</div>
               <div className="text-2xl font-black text-white">50K+ <span className="text-xs text-cyan-400 font-normal">LIVE</span></div>
            </div>
            <div className="h-12 w-[1px] bg-white/10" />
            <div>
               <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1 flex items-center gap-2"> Trending Tech</div>
               <div className="text-2xl font-black text-white">10K+ <span className="text-xs text-purple-400 font-normal">TOPICS</span></div>
            </div>
            <div className="h-12 w-[1px] bg-white/10" />
            <div className="flex items-center gap-4">
               <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">Developer Pulse</div>
                  <div className="text-xs text-white">4,281 Live Developers</div>
               </div>
               <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center p-1">
                 <div className="w-full h-full bg-cyan-400/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan] animate-pulse"></div>
                 </div>
               </div>
            </div>
        </div>
      </div>
    </section>
  );
}
