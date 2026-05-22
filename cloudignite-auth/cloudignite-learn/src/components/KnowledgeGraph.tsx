import { motion } from 'motion/react';
import { Network, Database, Container, Server, Code, RefreshCcw, Plus, Minus, Maximize } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const INITIAL_NODES = [
  { id: 'app', label: 'Client App', type: 'code', icon: Code },
  { id: 'api', label: 'API Gateway', type: 'server', icon: Server },
  { id: 'auth', label: 'Auth Service', type: 'server', icon: RefreshCcw },
  { id: 'k8s', label: 'Kubernetes', type: 'cluster', icon: Container },
  { id: 'kafka', label: 'Kafka Stream', type: 'queue', icon: Network },
  { id: 'db1', label: 'Vector DB', type: 'db', icon: Database },
  { id: 'db2', label: 'Cassandra DB', type: 'db', icon: Database },
];

const INITIAL_EDGES = [
  { source: 'app', target: 'api' },
  { source: 'api', target: 'auth' },
  { source: 'api', target: 'k8s' },
  { source: 'k8s', target: 'kafka' },
  { source: 'k8s', target: 'db1' },
  { source: 'kafka', target: 'db2' },
];

// We extend the node interfaces for D3's coordinates
interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: string;
  icon: any;
}

interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  source: string | NodeData;
  target: string | NodeData;
}

export function KnowledgeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => {
    const width = 2000;
    const height = 1200;

    const simulationNodes: NodeData[] = INITIAL_NODES.map(d => ({ ...d }));
    const simulationLinks: LinkData[] = INITIAL_EDGES.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<NodeData>(simulationNodes)
      .force("link", d3.forceLink<NodeData, LinkData>(simulationLinks).id(d => d.id).distance(180))
      .force("charge", d3.forceManyBody().strength(-2000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(100))
      .on("tick", () => {
        // Create new arrays so React re-renders
        setNodes([...simulationNodes]);
        setLinks([...simulationLinks]);
      });

    return () => simulation.stop();
  }, []);

  return (
    <section className="py-24 relative min-h-[900px] flex items-center overflow-hidden bg-black/20">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,rgba(0,0,0,0)_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-[40px] md:text-[60px] font-black mb-6 leading-[0.9] tracking-tight">KNOWLEDGE <span className="text-cyan-400">GRAPH</span></h2>
          <p className="text-slate-400 text-lg">
             Explore the hidden architecture of modern software. Drag, zoom, and dive deep into how systems connect, flow, and scale.
          </p>
        </div>

        {/* The Graph Canvas Area */}
        <div className="relative w-full h-[600px] rounded-3xl bg-[#02040a] border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Subtle grid pattern for the map */}
          <div className="absolute inset-0 bg-grid-white opacity-5" />
          
          <div ref={containerRef} className="absolute inset-0">
              {nodes.length > 0 && (
                <TransformWrapper
                  initialScale={1}
                  minScale={0.3}
                  maxScale={2}
                  centerOnInit={true}
                  wheel={{ wheelDisabled: true }}
                  panning={{ disabled: false }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-2 bg-black/60 backdrop-blur-xl p-2 rounded-xl border border-white/10 shadow-2xl">
                        <button onClick={() => zoomIn()} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10" aria-label="Zoom In">
                          <Plus className="w-5 h-5 text-white" />
                        </button>
                        <button onClick={() => zoomOut()} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10" aria-label="Zoom Out">
                          <Minus className="w-5 h-5 text-white" />
                        </button>
                        <button onClick={() => resetTransform()} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10" aria-label="Reset Zoom">
                          <Maximize className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                    <div style={{ width: '2000px', height: '1200px', position: 'relative' }}>
                       {/* Draw Edges */}
                       <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                         <defs>
                            <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                               <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                               <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
                            </linearGradient>
                         </defs>
                         {links.map((edge, i) => {
                           const source = edge.source as NodeData;
                           const target = edge.target as NodeData;
                           if (source.x === undefined || target.x === undefined) return null;
                           
                           const isActive = activeNode === source.id || activeNode === target.id;
                           return (
                             <g key={`edge-${i}`}>
                               <line 
                                  x1={source.x} 
                                  y1={source.y} 
                                  x2={target.x} 
                                  y2={target.y}
                                  stroke={isActive ? "url(#edgeGradient)" : "rgba(255,255,255,0.05)"}
                                  strokeWidth={isActive ? 3 : 1.5}
                                  className="transition-all duration-300"
                               />
                               {isActive && (
                                  <motion.circle
                                     r="4"
                                     fill="#22d3ee"
                                     style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
                                     initial={{ cx: source.x, cy: source.y }}
                                     animate={{ cx: target.x, cy: target.y }}
                                     transition={{ 
                                       duration: 1.5, 
                                       repeat: Infinity, 
                                       ease: "linear",
                                     }}
                                  />
                               )}
                             </g>
                           );
                         })}
                       </svg>

                       {/* Nodes */}
                       {nodes.map((node) => {
                         const Icon = node.icon;
                         const isActive = activeNode === node.id;
                         
                         if (node.x === undefined || node.y === undefined) return null;

                         return (
                           <motion.div
                             key={node.id}
                             className="absolute cursor-grab active:cursor-grabbing group z-10"
                             style={{ top: (node.y || 0) - 32, left: (node.x || 0) - 32 }}
                             onMouseEnter={() => setActiveNode(node.id)}
                             onMouseLeave={() => setActiveNode(null)}
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                           >
                              <div className="relative">
                                 {isActive && (
                                   <motion.div 
                                      className="absolute -inset-4 border-2 border-cyan-500/50 rounded-full"
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                   />
                                 )}
                                 <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${isActive ? 'bg-[#02040a] border-2 border-cyan-400 glow-cyan' : 'bg-[#0a0e17] border border-white/20 hover:border-white/40'}`}>
                                     <Icon className={`w-6 h-6 ${isActive ? 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-300'}`} />
                                 </div>
                                 
                                 {/* Node Label Tooltip */}
                                 <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap bg-[#02040a]/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-[10px] uppercase font-bold tracking-widest transition-opacity duration-200 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                    {node.label}
                                 </div>
                                 
                                 {isActive && (
                                    <motion.div 
                                      initial={{ opacity: 0, x: 10, y: "-50%" }}
                                      animate={{ opacity: 1, x: 0, y: "-50%" }}
                                      className="absolute left-full ml-10 top-1/2 w-[240px] bg-black/80 border border-white/10 backdrop-blur-xl p-4 rounded-xl pointer-events-none hidden lg:block shadow-2xl z-50 text-left"
                                    >
                                       <h4 className="text-cyan-400 text-[10px] uppercase font-bold tracking-widest mb-1">Architecture Node</h4>
                                       <h3 className="text-lg font-black font-display text-white mb-2 leading-tight">{node.label}</h3>
                                       <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">Detailed documentation, tutorials, and trending open-source implementations.</p>
                                       <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-2 uppercase tracking-widest">
                                         <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_currentColor]" />
                                         System Healthy
                                       </div>
                                    </motion.div>
                                 )}
                              </div>
                           </motion.div>
                         )
                       })}
                    </div>
                  </TransformComponent>
                  </>
                  )}
                </TransformWrapper>
             )}
          </div>
          
          <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 rounded-lg border border-white/5 pointer-events-none z-20">
             <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest">Drag to Pan</kbd>
             <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest">Use Buttons to Zoom</kbd>
          </div>
        </div>
      </div>
    </section>
  );
}
