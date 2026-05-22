import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Terminal, LayoutDashboard, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SYSTEM_DESIGN_TOPICS } from '../data/systemDesign';
import { Mermaid } from '../components/Mermaid';
import { AiTutorTerminal } from '../components/AiTutorTerminal';

export function SystemDesignTopic() {
  const { topicId } = useParams();
  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  
  const currentTopicIndex = SYSTEM_DESIGN_TOPICS.findIndex(c => c.id === topicId);
  const topic = SYSTEM_DESIGN_TOPICS[currentTopicIndex];
  
  useEffect(() => {
    document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'instant' });
    
    // Smooth scroll to the active sidebar item
    if (activeLinkRef.current) {
      activeLinkRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [topicId]);

  if (!topic) {
    return <Navigate to="/system-design" replace />;
  }

  const prevTopic = currentTopicIndex > 0 ? SYSTEM_DESIGN_TOPICS[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < SYSTEM_DESIGN_TOPICS.length - 1 ? SYSTEM_DESIGN_TOPICS[currentTopicIndex + 1] : null;

  const Icon = topic.icon;

  return (
    <div className="bg-[#02040a] text-slate-100 min-h-screen relative font-sans">
      {/* Sidebar Navigation */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/10 pt-24 pb-8 overflow-y-auto z-20">
        <div className="px-6 mb-8">
           <Link to="/system-design" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
             <LayoutDashboard className="w-4 h-4" /> All Systems
           </Link>
        </div>
        
        <div className="space-y-1 px-3">
           {SYSTEM_DESIGN_TOPICS.map(c => {
             const isActive = c.id === topicId;
             return (
               <Link 
                  key={c.id} 
                  to={`/system-design/${c.id}`}
                  ref={isActive ? activeLinkRef : null}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-cyan-500/10 border-l-2 border-cyan-500 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border-l-2 border-transparent'}`}
               >
                  <c.icon className={`w-4 h-4 ${isActive ? c.color : ''}`} />
                  <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{c.title}</span>
               </Link>
             );
           })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64">
         <section className="relative pt-24 pb-12 border-b border-white/10 bg-black overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
            <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${topic.bg} rounded-full blur-[120px] pointer-events-none opacity-50`} />
            
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
               <div className="lg:hidden mb-8">
                 <Link to="/system-design" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                   <ArrowLeft className="w-4 h-4" /> All Systems
                 </Link>
               </div>

               <div className="flex items-center gap-4 mb-6">
                 <div className={`w-16 h-16 rounded-2xl ${topic.bg} ${topic.border} border flex items-center justify-center shadow-xl`}>
                   <Icon className={`w-8 h-8 ${topic.color}`} />
                 </div>
               </div>

               <h1 className="text-[40px] md:text-[60px] font-display font-black leading-[1] tracking-tight mb-6">
                 {topic.title}
               </h1>

               <p className="text-xl text-slate-400 leading-relaxed font-medium">
                 {topic.desc}
               </p>
               
               {topic.related && topic.related.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                     <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Related:</span>
                     {topic.related.map(rId => {
                        const relatedC = SYSTEM_DESIGN_TOPICS.find(c => c.id === rId);
                        if (!relatedC) return null;
                        return (
                           <Link key={rId} to={`/system-design/${rId}`} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors">
                              <relatedC.icon className="w-3 h-3 text-slate-400" />
                              <span className="text-xs font-bold text-slate-300">{relatedC.title}</span>
                           </Link>
                        )
                     })}
                  </div>
               )}
            </div>
         </section>

         <section className="py-16">
            <div className="container mx-auto px-6 max-w-4xl">
               {topic.content && (
                  <div className="prose prose-invert prose-slate max-w-none">
                     <div className="bg-[#02040a] rounded-2xl border border-white/10 p-8 mb-12 shadow-xl">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                           <Terminal className="w-5 h-5 text-cyan-400" /> Overview
                        </h2>
                        <div className="prose prose-invert prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-400 prose-strong:text-slate-200">
                           <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {topic.content.overview}
                           </ReactMarkdown>
                        </div>
                     </div>

                     <div className="space-y-12">
                        {topic.content.sections.map((section, idx) => (
                           <motion.div 
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className="relative pl-8 md:pl-12 border-l border-white/10"
                           >
                              <div className={`absolute top-0 left-0 w-8 h-8 -ml-4 rounded-full ${topic.bg} border ${topic.border} flex items-center justify-center text-[10px] font-black ${topic.color}`}>
                                 {idx + 1}
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                              <div className="prose prose-invert prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-400 prose-li:text-slate-400 prose-strong:text-slate-200">
                                 <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                       code({node, inline, className, children, ...props}: any) {
                                          const match = /language-(\w+)/.exec(className || '')
                                          if (!inline && match && match[1] === 'mermaid') {
                                             return <Mermaid chart={String(children).replace(/\n$/, '')} />
                                          }
                                          return <code className={className} {...props}>{children}</code>
                                       }
                                    }}
                                 >
                                    {section.content}
                                 </ReactMarkdown>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               )}

               <div className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  {prevTopic ? (
                     <Link to={`/system-design/${prevTopic.id}`} className="group w-full sm:w-auto flex flex-col items-start px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1 flex items-center gap-1">
                           <ArrowLeft className="w-3 h-3" /> Previous
                        </span>
                        <span className="font-bold text-slate-300 group-hover:text-white">{prevTopic.title}</span>
                     </Link>
                  ) : <div />}

                  {nextTopic ? (
                     <Link to={`/system-design/${nextTopic.id}`} className="group w-full sm:w-auto flex flex-col items-end text-right px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1 flex items-center gap-1">
                           Next <ChevronRight className="w-3 h-3" />
                        </span>
                        <span className="font-bold text-slate-300 group-hover:text-white">{nextTopic.title}</span>
                     </Link>
                  ) : <div />}
               </div>
            </div>
            <div className="container mx-auto px-6 max-w-5xl">
               <AiTutorTerminal 
                  topicTitle={topic.title} 
                  topicContent={
                     topic.content?.overview + '\n' + 
                     topic.content?.sections.map(s => s.title + '\n' + s.content).join('\n')
                  } 
               />
            </div>
         </section>
      </div>
    </div>
  );
}
