import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import axios from 'axios';

import {
   ArrowLeft,
   ArrowRight,
   Terminal,
   LayoutDashboard,
   ChevronRight,
   Clock3,
   Flame,
   BookOpen,
   FolderTree,
   Layers3,
   ChevronLeft,
} from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Mermaid } from '../components/Mermaid';
import { AiTutorTerminal } from '../components/AiTutorTerminal';

const API_BASE = 'https://api.learn.cloudignite.in';

// =========================================
// TYPES
// =========================================

interface Topic {
   id: string;
   slug: string;
   title: string;
   short_description: string;
   hero_description: string;
   category: string;
   icon_url: string;
   cover_image: string;
   difficulty_level: string;
   estimated_read_time: number;
   trending_score: number;
   popularity_score: number;
   is_featured: boolean;
   parent_topic_id?: string;
   topic_level: number;
   topic_order: number;
   path: string;
   is_category: boolean;
}

interface Section {
   id: string;
   section_order: number;
   section_type: string;
   title: string;
   content: string;
}

interface TopicTreeNode {
   topic: Topic;
   children: TopicTreeNode[];
}

interface TopicResponse {
   topic: Topic;
   sections: Section[];
   child_topics: Topic[];
}

// =========================================
// FIND LEVEL 2 ROOT
// =========================================

function findLevel2Root(
   node: TopicTreeNode,
   currentPath?: string,
   level2Node?: TopicTreeNode
): TopicTreeNode | null {
   const currentLevel2 = node.topic.topic_level === 2 ? node : level2Node;

   if (node.topic.path === currentPath) return currentLevel2 || node;

   for (const child of node.children || []) {
      const found = findLevel2Root(child, currentPath, currentLevel2);
      if (found) return found;
   }
   return null;
}

// =========================================
// FIND SIBLINGS (for prev/next navigation)
// =========================================

function findSiblings(
   root: TopicTreeNode,
   currentPath: string
): { prev: Topic | null; next: Topic | null } {
   let siblings: Topic[] = [];
   let parent: TopicTreeNode | null = null;

   // Recursively search for parent node containing currentPath as direct child
   const search = (node: TopicTreeNode): boolean => {
      if (node.children) {
         for (const child of node.children) {
            if (child.topic.path === currentPath) {
               parent = node;
               siblings = node.children.map(c => c.topic);
               return true;
            }
            if (search(child)) return true;
         }
      }
      return false;
   };

   search(root);

   if (!parent || siblings.length === 0) return { prev: null, next: null };

   const currentIndex = siblings.findIndex(t => t.path === currentPath);
   return {
      prev: currentIndex > 0 ? siblings[currentIndex - 1] : null,
      next: currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null,
   };
}

// =========================================
// SIDEBAR TREE (cleaned, professional)
// =========================================

function SidebarTree({
   node,
   currentPath,
   depth = 0,
}: {
   node: TopicTreeNode;
   currentPath?: string;
   depth?: number;
}) {
   const [open, setOpen] = useState(depth < 2);
   const { topic } = node;
   const hasChildren = (node.children?.length ?? 0) > 0;
   const isActive = topic.path === currentPath;
   const isParentOfActive = currentPath?.startsWith(topic.path);

   return (
      <li className="relative">
         <div
            className={`
          flex items-center gap-2.5 min-h-[42px]
          rounded-lg transition-colors duration-150
          ${isActive
                  ? 'bg-indigo-500/15 border-l-2 border-indigo-400 text-white'
                  : isParentOfActive
                     ? 'bg-white/[0.04] text-slate-200'
                     : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
               }
        `}
            style={{ paddingLeft: `${depth * 14 + 8}px`, paddingRight: '8px' }}
         >
            {/* Expand toggle */}
            <div className="w-5 h-5 flex shrink-0 items-center justify-center">
               {hasChildren && (
                  <button
                     onClick={() => setOpen(!open)}
                     aria-expanded={open}
                     className="flex items-center justify-center w-5 h-5 text-slate-500 hover:text-indigo-300 transition-colors"
                  >
                     <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-90' : ''
                           }`}
                     />
                  </button>
               )}
            </div>

            {/* Node link */}
            <Link
               to={`/topic/${topic.path}`}
               className="flex items-center gap-3 min-w-0 flex-1 py-1.5"
            >
               <div
                  className={`
              shrink-0 w-8 h-8 flex items-center justify-center rounded-md
              ${topic.is_category
                        ? 'bg-indigo-500/10 text-indigo-300'
                        : 'bg-white/[0.05] text-slate-300'
                     }
            `}
               >
                  {topic.is_category ? (
                     <FolderTree className="w-4 h-4" />
                  ) : (
                     <Terminal className="w-4 h-4" />
                  )}
               </div>

               <div className="min-w-0 flex-1">
                  <div
                     className={`
                truncate text-sm leading-snug font-medium
                ${depth === 0 ? 'text-[15px] font-semibold' : ''}
                ${isActive ? 'text-white' : ''}
              `}
                  >
                     {topic.title}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        L{topic.topic_level}
                     </span>
                     <span
                        className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-indigo-400' : 'bg-slate-600'
                           }`}
                     />
                  </div>
               </div>
            </Link>
         </div>

         {/* Children */}
         <AnimatePresence initial={false}>
            {hasChildren && open && (
               <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
               >
                  <div
                     className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/20 to-transparent"
                     style={{ marginLeft: `${depth * 14}px` }}
                  />
                  <div className="pl-0 space-y-0.5 py-0.5">
                     {node.children?.map((child) => (
                        <SidebarTree
                           key={child.topic.id}
                           node={child}
                           currentPath={currentPath}
                           depth={depth + 1}
                        />
                     ))}
                  </div>
               </motion.ul>
            )}
         </AnimatePresence>
      </li>
   );
}

// =========================================
// PAGE
// =========================================

export function FoundationTopic() {
   const { '*': topicPath } = useParams();
   const currentPath = topicPath || 'foundations';

   const [topic, setTopic] = useState<Topic | null>(null);
   const [sections, setSections] = useState<Section[]>([]);
   const [childTopics, setChildTopics] = useState<Topic[]>([]);
   const [topicTree, setTopicTree] = useState<TopicTreeNode | null>(null);
   const [loading, setLoading] = useState(true);

   // Fetch topic tree
   useEffect(() => {
      const fetchTree = async () => {
         try {
            const response = await axios.get(`${API_BASE}/api/topic-tree/foundations`);
            const fullTree = response.data.tree;
            const level2Tree = findLevel2Root(fullTree, currentPath);
            setTopicTree(level2Tree || fullTree);
         } catch (err) {
            console.error(err);
         }
      };
      fetchTree();
   }, [currentPath]);

   // Fetch topic data
   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchTopic = async () => {
         try {
            setLoading(true);
            const response = await axios.get(`${API_BASE}/api/topics/${currentPath}`);
            const data: TopicResponse = response.data.data;
            setTopic(data.topic);
            setSections(data.sections || []);
            const childResponse = await axios.get(
               `${API_BASE}/api/topic-children/${currentPath}`
            );
            setChildTopics(childResponse.data.children || []);
         } catch (err) {
            console.error(err);
         } finally {
            setLoading(false);
         }
      };
      fetchTopic();
   }, [currentPath]);

   // Compute previous/next siblings
   const { prev, next } = useMemo(() => {
      if (!topicTree || !currentPath) return { prev: null, next: null };
      return findSiblings(topicTree, currentPath);
   }, [topicTree, currentPath]);

   // Not found
   if (!loading && !topic) {
      return <Navigate to="/foundations" replace />;
   }

   return (
      <div className="bg-[#02040a] text-slate-100 min-h-screen">
         {/* ========================================= */}
         {/* SIDEBAR */}
         {/* ========================================= */}
         <div
            className="
          hidden lg:block fixed left-0 top-0 bottom-0 w-80
          bg-black border-r border-white/10 overflow-y-auto z-20
        "
         >
            <div className="sticky top-0 z-20 bg-black border-b border-white/10 px-6 pt-8 pb-5">
               <Link
                  to="/foundations"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
               >
                  <LayoutDashboard className="w-4 h-4" />
                  Topic Explorer
               </Link>
            </div>
            <div className="p-4 space-y-2">
               {topicTree && <SidebarTree node={topicTree} currentPath={currentPath} />}
            </div>
         </div>

         {/* ========================================= */}
         {/* MAIN CONTENT */}
         {/* ========================================= */}
         <div className="lg:pl-80">
            {loading ? (
               <div className="flex items-center justify-center h-screen text-slate-400">
                  <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                     Loading topic...
                  </motion.div>
               </div>
            ) : topic ? (
               <>
                  {/* ========================================= */}
                  {/* HERO — Refined */}
                  {/* ========================================= */}
                  <section className="relative overflow-hidden border-b border-white/10 bg-black/30">
                     {/* Subtle background glow */}
                     <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent" />
                     <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px]" />

                     <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 max-w-6xl">
                        {/* Mobile back link */}
                        <div className="lg:hidden mb-8">
                           <Link
                              to="/foundations"
                              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                           >
                              <ArrowLeft className="w-4 h-4" />
                              Foundations
                           </Link>
                        </div>

                        {/* Breadcrumb */}
                        <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
                           {topic.path.split('/').map((part, index, arr) => {
                              const partialPath = arr.slice(0, index + 1).join('/');
                              const isLast = index === arr.length - 1;
                              return (
                                 <div key={partialPath} className="flex items-center gap-2">
                                    <Link
                                       to={`/topic/${partialPath}`}
                                       className={`capitalize transition-colors ${isLast
                                             ? 'text-white font-semibold'
                                             : 'text-slate-500 hover:text-slate-300'
                                          }`}
                                    >
                                       {part.replace(/-/g, ' ')}
                                    </Link>
                                    {!isLast && <ChevronRight className="w-4 h-4 text-slate-700" />}
                                 </div>
                              );
                           })}
                        </div>

                        {/* Meta badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                           <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] uppercase tracking-widest font-bold">
                              {topic.category}
                           </div>
                           <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                              <Clock3 className="w-3 h-3" />
                              {topic.estimated_read_time || 10} min read
                           </div>
                           <div className="flex items-center gap-1 text-orange-400 text-xs font-semibold">
                              <Flame className="w-3 h-3" />
                              {topic.trending_score || 90}
                           </div>
                           <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                              <Layers3 className="w-3 h-3" />
                              Level {topic.topic_level}
                           </div>
                        </div>

                        {/* Title and description */}
                        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                           <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                              {topic.icon_url ? (
                                 <img src={topic.icon_url} alt={topic.title} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                              ) : (
                                 <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
                              )}
                           </div>
                           <div>
                              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-4">
                                 {topic.title}
                              </h1>
                              <p className="max-w-3xl text-lg md:text-xl text-slate-400 leading-relaxed">
                                 {topic.hero_description || topic.short_description}
                              </p>
                           </div>
                        </div>

                        {/* Quick prev/next buttons at hero bottom */}
                        {(prev || next) && (
                           <div className="flex justify-between mt-12 pt-6 border-t border-white/5">
                              {prev ? (
                                 <Link
                                    to={`/topic/${prev.path}`}
                                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                                 >
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    <div className="text-sm">
                                       <div className="text-[10px] text-slate-500 uppercase tracking-widest">Previous</div>
                                       <div className="font-medium truncate max-w-[180px]">{prev.title}</div>
                                    </div>
                                 </Link>
                              ) : <div />}
                              {next ? (
                                 <Link
                                    to={`/topic/${next.path}`}
                                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group ml-auto text-right"
                                 >
                                    <div className="text-sm">
                                       <div className="text-[10px] text-slate-500 uppercase tracking-widest">Next</div>
                                       <div className="font-medium truncate max-w-[180px]">{next.title}</div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                 </Link>
                              ) : <div />}
                           </div>
                        )}
                     </div>
                  </section>

                  {/* ========================================= */}
                  {/* CONTENT */}
                  {/* ========================================= */}
                  <section className="py-16 md:py-24">
                     <div className="container mx-auto px-6 max-w-5xl">
                        {/* Sections with timeline styling */}
                        <div className="space-y-16 md:space-y-24">
                           {sections.map((section, idx) => (
                              <motion.div
                                 key={section.id}
                                 initial={{ opacity: 0, y: 20 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                 viewport={{ once: true, margin: '-100px' }}
                                 transition={{ duration: 0.4, delay: idx * 0.05 }}
                                 className="relative pl-10 md:pl-16 border-l border-white/10"
                              >
                                 <div className="absolute top-0 left-0 -ml-5 md:-ml-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-sm md:text-base font-black text-indigo-300">
                                    {idx + 1}
                                 </div>
                                 <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-6">
                                    {section.title}
                                 </h2>
                                 <div
                                    className="
                          prose prose-invert prose-slate max-w-none
                          prose-p:text-slate-400 prose-p:leading-relaxed prose-p:text-lg
                          prose-li:text-slate-400 prose-li:text-lg
                          prose-strong:text-white
                          prose-h1:text-white prose-h2:text-white prose-h3:text-white
                          prose-a:text-indigo-400 hover:prose-a:text-indigo-300
                        "
                                 >
                                    <ReactMarkdown
                                       remarkPlugins={[remarkGfm]}
                                       components={{
                                          code({ inline, className, children, ...props }: any) {
                                             const match = /language-(\w+)/.exec(className || '');
                                             if (!inline && match && match[1] === 'mermaid') {
                                                return (
                                                   <Mermaid chart={String(children).replace(/\n$/, '')} />
                                                );
                                             }
                                             return (
                                                <code className={className} {...props}>
                                                   {children}
                                                </code>
                                             );
                                          },
                                       }}
                                    >
                                       {section.content}
                                    </ReactMarkdown>
                                 </div>
                              </motion.div>
                           ))}
                        </div>

                        {/* Child topics grid — refined cards */}
                        {childTopics.length > 0 && (
                           <div className="mt-24">
                              <div className="flex items-center gap-3 mb-10">
                                 <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <FolderTree className="w-5 h-5 text-indigo-300" />
                                 </div>
                                 <div>
                                    <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-bold">
                                       Continue Learning
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                                       Sub Topics
                                    </h2>
                                 </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {childTopics.map((child) => (
                                    <Link
                                       key={child.id}
                                       to={`/topic/${child.path}`}
                                       className="group block"
                                    >
                                       <div
                                          className="
                              relative overflow-hidden rounded-2xl
                              border border-white/5 bg-white/[0.02]
                              hover:bg-white/[0.04] hover:border-indigo-500/20
                              transition-all duration-300 p-6 h-full
                            "
                                       >
                                          <div className="flex items-start gap-4 mb-4">
                                             <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                                                {child.is_category ? (
                                                   <FolderTree className="w-4 h-4 text-indigo-300" />
                                                ) : (
                                                   <Terminal className="w-4 h-4 text-indigo-300" />
                                                )}
                                             </div>
                                             <div className="min-w-0">
                                                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                                                   {child.title}
                                                </h3>
                                                <p className="text-sm text-slate-400 line-clamp-2">
                                                   {child.short_description || child.hero_description}
                                                </p>
                                             </div>
                                          </div>
                                          <div className="flex items-center justify-between">
                                             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                                Level {child.topic_level}
                                             </span>
                                             <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                          </div>
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           </div>
                        )}

                        {/* Bottom navigation — large prev/next */}
                        {(prev || next) && (
                           <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {prev ? (
                                 <Link
                                    to={`/topic/${prev.path}`}
                                    className="group flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all"
                                 >
                                    <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0">
                                       <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                                    </div>
                                    <div className="min-w-0">
                                       <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                                          Previous Topic
                                       </div>
                                       <div className="font-semibold text-white truncate">{prev.title}</div>
                                    </div>
                                 </Link>
                              ) : (
                                 <div />
                              )}
                              {next ? (
                                 <Link
                                    to={`/topic/${next.path}`}
                                    className="group flex items-start justify-end gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all text-right sm:col-start-2"
                                 >
                                    <div className="min-w-0">
                                       <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                                          Next Topic
                                       </div>
                                       <div className="font-semibold text-white truncate">{next.title}</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0">
                                       <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                 </Link>
                              ) : (
                                 <div />
                              )}
                           </div>
                        )}
                     </div>

                     {/* AI Tutor */}
                     <div className="container mx-auto px-6 max-w-5xl mt-24">
                        <AiTutorTerminal
                           topicTitle={topic.title}
                           topicContent={sections
                              .map(section => section.title + '\n' + section.content)
                              .join('\n')}
                        />
                     </div>
                  </section>
               </>
            ) : null}
         </div>
      </div>
   );
}