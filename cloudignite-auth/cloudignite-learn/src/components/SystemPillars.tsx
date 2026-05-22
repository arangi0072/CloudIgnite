import { motion } from 'motion/react';
import { Network, Database, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const PATTERNS = [
  {
    title: 'Event-Driven Architecture',
    desc: 'Decoupling services through asynchronous message brokers like Kafka and RabbitMQ.',
    icon: Network,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10'
  },
  {
    title: 'CQRS Patterns',
    desc: 'Separating read and write operations to scale high-throughput databases efficiently.',
    icon: Database,
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10'
  },
  {
    title: 'Circuit Breakers',
    desc: 'Preventing cascading network failures in distributed microservice topologies.',
    icon: ShieldAlert,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Leader Election',
    desc: 'Ensuring cluster consensus and fault tolerance using ZooKeeper or etcd.',
    icon: Cpu,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10'
  }
];

export function SystemPillars() {
  return (
    <section className="py-24 relative bg-[#050914] border-t border-white/5 overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 bg-grid-white opacity-[0.02] pointer-events-none" />
       
       <div className="container mx-auto px-6 relative z-10">
         <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6">
              CORE INFRASTRUCTURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">PATTERNS</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Master the foundational building blocks used to scale modern cloud applications from startup MVPs to global enterprise operations.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PATTERNS.map((pattern, index) => {
              const Icon = pattern.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-[#0a0f1c] border border-white/5 hover:border-white/20 p-8 rounded-2xl h-full transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                     <div className={`w-14 h-14 ${pattern.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                       <Icon className={`w-7 h-7 ${pattern.color}`} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{pattern.title}</h3>
                     <p className="text-slate-400 leading-relaxed text-sm">
                       {pattern.desc}
                     </p>
                  </div>
                </motion.div>
              )
            })}
         </div>
         
         <div className="mt-16 text-center">
            <Link to="/foundations" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-full transition-colors text-sm uppercase tracking-widest">
               Explore Foundation Modules <Network className="w-4 h-4" />
            </Link>
         </div>
       </div>
    </section>
  )
}
