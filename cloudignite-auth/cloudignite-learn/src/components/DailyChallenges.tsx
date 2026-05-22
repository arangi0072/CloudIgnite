import { motion } from 'motion/react';
import { PlayCircle, Award, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CHALLENGES = [
  {
    id: 1,
    title: 'Design a Unique ID Generator',
    difficulty: 'Medium',
    time: '45 mins',
    desc: 'Generate globally unique IDs at high scale in a distributed system (like Twitter Snowflake).',
    tags: ['Distributed Systems', 'Clock Sync', '64-bit ID'],
    slug: 'unique-id-generator'
  },
  {
    id: 2,
    title: 'Design a Key-Value Store',
    difficulty: 'Hard',
    time: '60 mins',
    desc: 'Build a highly available, distributed key-value store with eventual consistency (like DynamoDB).',
    tags: ['Consistent Hashing', 'Vector Clocks', 'Gossip Protocol'],
    slug: 'key-value-store'
  },
  {
    id: 3,
    title: 'Design a Web Crawler',
    difficulty: 'Hard',
    time: '60 mins',
    desc: 'Process billions of web pages incrementally without infinite loops or DDOSing target servers.',
    tags: ['Bloom Filters', 'BFS', 'Robots.txt'],
    slug: 'web-crawler'
  }
];

export function DailyChallenges() {
  return (
    <section className="py-24 relative bg-[#02040a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <span className="w-8 h-1 bg-red-500 rounded-full" />
               <h3 className="text-red-400 font-mono text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Practice Ground
               </h3>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white">
              INTERVIEW <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">CHALLENGES</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-full transition-all uppercase tracking-widest">
            View All Scenarios <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHALLENGES.map((challenge, i) => (
            <Link to={`/system-design/${challenge.slug}`} key={challenge.id} className="block group h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-8 hover:border-red-500/50 hover:bg-red-500/5 transition-all flex flex-col h-full cursor-pointer"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 rounded text-[11px] font-mono font-bold uppercase tracking-wider
                    ${challenge.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}
                  >
                    {challenge.difficulty}
                  </span>
                  <span className="text-slate-400 text-xs font-mono flex items-center gap-1">
                    <PlayCircle className="w-3.5 h-3.5" /> {challenge.time}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                  {challenge.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  {challenge.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                   {challenge.tags.map(tag => (
                     <span key={tag} className="text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded">
                       {tag}
                     </span>
                   ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
