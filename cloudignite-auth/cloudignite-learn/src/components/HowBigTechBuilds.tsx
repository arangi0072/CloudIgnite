import { motion } from 'motion/react';
import { PlayCircle, Shield, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const COMPANIES = [
  {
    name: 'Netflix',
    description: 'Global Streaming Architecture',
    stats: '238M Subscribers • 1B+ Hours/week',
    stack: ['Java', 'Spring', 'Cassandra', 'Kafka', 'AWS'],
    color: 'from-red-600 to-rose-900',
    logo: 'N'
  },
  {
    name: 'Uber',
    description: 'Real-time dispatch & routing',
    stats: '25M Trips/day • Sub-second latency',
    stack: ['Go', 'Node.js', 'MySQL', 'Redis', 'Kafka'],
    color: 'from-slate-700 to-black',
    logo: 'U'
  },
  {
    name: 'Discord',
    description: 'Massively scalable real-time chat',
    stats: '150M MAU • 4B Messages/day',
    stack: ['Rust', 'Elixir', 'ScyllaDB', 'WebRTC'],
    color: 'from-indigo-500 to-purple-700',
    logo: 'D'
  }
];

export function HowBigTechBuilds() {
  return (
    <section className="py-24 relative border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-[40px] md:text-[50px] font-display font-black mb-4 tracking-tight leading-[0.9]">HOW <span className="text-cyan-400">BIG TECH</span> BUILDS</h2>
            <p className="text-slate-400 max-w-2xl text-lg">
               Cinematic deep dives into the production architectures powering the most demanding applications on Earth.
            </p>
          </div>
          <button className="text-[10px] font-bold text-cyan-400 flex items-center gap-2 transition-colors uppercase tracking-widest px-5 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full border border-cyan-400">
            Explore 100+ Architectures <MoveRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {COMPANIES.map((company, i) => (
             <Link to={`/architecture/${company.name.toLowerCase()}`} key={company.name}>
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6, delay: i * 0.15 }}
                 className="group relative h-[400px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl cursor-pointer"
               >
                  {/* Background Image/Gradient mockup */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                  
                  {/* Tech streams animation overlay */}
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                     {Array.from({length: 5}).map((_, j) => (
                       <motion.div 
                          key={j}
                          className="absolute h-full w-px bg-white left-[20%]"
                          style={{ left: `${20 * (j+1)}%` }}
                       >
                          <motion.div 
                             className="w-full h-1/4 bg-gradient-to-b from-transparent via-white to-transparent"
                             animate={{ y: ['-100%', '400%'] }}
                             transition={{ duration: 1.5 + j * 0.5, repeat: Infinity, ease: 'linear', delay: j * 0.2 }}
                          />
                       </motion.div>
                     ))}
                  </div>

                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                       <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 font-black text-2xl shadow-xl">
                          {company.logo}
                       </div>
                       <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-white/10 text-slate-300">
                          <Shield className="w-3 h-3 text-cyan-400" />
                          Verified Data
                       </div>
                     </div>

                     <div>
                        <h3 className="text-3xl font-black mb-2 group-hover:translate-x-2 transition-transform duration-300 tracking-tight">{company.name}</h3>
                        <p className="text-slate-400 mb-4">{company.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {company.stack.map(tech => (
                            <span key={tech} className="px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-widest bg-white/10 border border-white/10 rounded backdrop-blur-sm">
                               {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{company.stats}</span>
                          <PlayCircle className="w-8 h-8 text-white opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                        </div>
                     </div>
                  </div>
               </motion.div>
             </Link>
           ))}
        </div>
      </div>
    </section>
  );
}
