import { motion } from 'motion/react';
import { MessageSquare, ThumbsUp, MoreHorizontal, Sparkles } from 'lucide-react';

const DISCUSSIONS = [
  {
    title: "Why did Prime Video switch from Serverless back to a Monolith?",
    author: "tech_architect",
    topic: "Architecture Debate",
    replies: 128,
    likes: 450,
    aiSummary: "Cost optimization. The overhead of step functions and multiple lambda calls for continuous video stream monitoring was 90% of the cost. A monolithic EC2 approach reduced costs by 90%."
  },
  {
    title: "Best patterns for combining Postgres and Vector Search?",
    author: "db_ninja",
    topic: "System Design",
    replies: 64,
    likes: 210,
    aiSummary: "pgvector is recommended for < 10M embeddings. For larger datasets, CQRS pattern to offload vectors to Pinecone/Qdrant while keeping metadata in Postgres is the standard."
  }
];

export function Community() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
             <h2 className="text-[40px] md:text-[50px] font-display font-black mb-4 tracking-tight leading-[0.9]">ENGINEERING <span className="text-purple-400">COUNCIL</span></h2>
             <p className="text-slate-400 text-lg">
                High-signal architecture debates, system design Q&A, and AI-summarized insights from principal engineers.
             </p>
          </div>
          <button className="text-[10px] border border-white/10 hover:bg-white/10 px-5 py-2 rounded-full transition-colors font-bold uppercase tracking-widest backdrop-blur-md">
            Join the Discussion
          </button>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
           {DISCUSSIONS.map((post, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.98 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4, delay: i * 0.1 }}
               className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl"
             >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-xs shadow-lg">
                     {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                     <div className="text-xs font-bold">{post.author}</div>
                     <div className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">{post.topic}</div>
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-6 tracking-tight leading-tight">{post.title}</h3>

                <div className="bg-black/40 rounded-xl p-5 mb-6 border border-white/5 relative shadow-inner">
                   <div className="absolute -top-3 left-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                     <Sparkles className="w-3 h-3" /> AI CONCLUSION
                   </div>
                   <p className="text-slate-300 text-sm leading-relaxed mt-2">
                     {post.aiSummary}
                   </p>
                </div>

                <div className="flex items-center justify-between text-slate-500 text-sm">
                   <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                        <ThumbsUp className="w-4 h-4" /> {post.likes}
                      </button>
                      <button className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                        <MessageSquare className="w-4 h-4" /> {post.replies} Replies
                      </button>
                   </div>
                   <button className="hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
