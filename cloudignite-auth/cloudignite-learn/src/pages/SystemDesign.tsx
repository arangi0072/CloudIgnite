import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map, Terminal } from 'lucide-react';
import { SYSTEM_DESIGN_TOPICS } from '../data/systemDesign';

function SystemDesignHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl text-white">
              <Map className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-slate-400 font-bold uppercase tracking-widest text-sm">Learning Path</h2>
              <div className="text-slate-500 text-sm">Module 02</div>
            </div>
          </div>

          <h1 className="text-[50px] md:text-[70px] font-display font-black leading-[0.9] tracking-tight mb-8">
            SYSTEM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              DESIGN
            </span>
          </h1>

          <p className="text-xl text-slate-400 leading-relaxed">
            Master the art of designing large-scale distributed systems. Learn how Big Tech companies solve complex engineering challenges, scale to millions of users, and handle petabytes of data.
          </p>
        </div>
      </div>
    </section>
  )
}

function TopicsGrid() {
  return (
    <section className="py-24 relative border-t border-white/5 bg-[#02040a]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SYSTEM_DESIGN_TOPICS.map((topic, i) => (
            <Link to={`/system-design/${topic.id}`} key={topic.id} className="block group">
              <motion.div
                id={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors overflow-hidden h-full flex flex-col"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                
                <div className={`w-14 h-14 rounded-2xl ${topic.bg} ${topic.border} border flex items-center justify-center mb-6 shadow-xl relative z-10`}>
                  <topic.icon className={`w-7 h-7 ${topic.color}`} />
                </div>
                
                <h3 className="text-2xl font-black text-white mb-3 relative z-10 group-hover:text-cyan-400 transition-colors">{topic.title}</h3>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium relative z-10 flex-grow">{topic.desc}</p>
                
                <div className="space-y-3 relative z-10 mb-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Key Concepts</h4>
                  {topic.points.map((point, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-xs text-slate-300 font-bold">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 relative z-10 flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Study Case</span>
                   <Terminal className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SystemDesign() {
  useEffect(() => {
    document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-black text-slate-100 min-h-screen relative font-sans">
      <SystemDesignHero />
      <TopicsGrid />
      
      <div className="py-24 text-center border-t border-white/5 bg-[#02040a]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black mb-6">Explore Real World Architectures</h2>
          <div className="flex justify-center gap-4">
            <Link to="/architecture/uber" className="px-6 py-3 bg-black border border-white/10 hover:bg-white/5 text-white font-bold rounded-xl transition-colors">
              Study Uber
            </Link>
            <Link to="/architecture/discord" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors">
              Study Discord
            </Link>
          </div>
        </div>
      </div>

      <div className="py-12 border-t border-white/5 bg-black text-center text-slate-500 text-sm">
         These concepts are the building blocks of massive distributed systems.
      </div>
    </div>
  );
}
