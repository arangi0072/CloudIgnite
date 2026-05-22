import { motion } from 'motion/react';
import { Network, Database, Container, Server, Shield, Activity, Zap, PlayCircle, GitBranch, Terminal, Layers, RefreshCcw, Cpu, Code, BarChart2, AlertTriangle, CheckCircle2, TrendingUp, Plus, Minus, Maximize } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

// Hero Section
function NetflixHero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-[#02040a]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-black to-[#02040a] z-0" />
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] opacity-50" />

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-bold text-[10px] uppercase tracking-widest mb-12 transition-colors">
            ← Back to Architectures
          </Link>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Shield className="w-3 h-3" /> Verified Data
            </span>
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <Activity className="w-3 h-3 animate-pulse" /> Production Architecture
            </span>
          </div>

          <h1 className="text-[60px] md:text-[90px] font-display font-black leading-[0.85] tracking-tight mb-8">
            NETFLIX <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">GLOBAL STREAMING</span><br/>
            ARCHITECTURE
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-12 font-medium">
            How Netflix streams billions of hours of content globally with massive distributed systems, intelligent caching, microservices, and cloud infrastructure.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Subscribers", value: "238M+", sub: "Global" },
              { label: "Volume", value: "1B+", sub: "Hours/Week" },
              { label: "Scale", value: "190+", sub: "Countries" },
              { label: "Services", value: "1000+", sub: "Microservices" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
             {['Java', 'Spring Boot', 'Cassandra', 'Kafka', 'Redis', 'EVCache', 'AWS', 'GraphQL', 'Kubernetes'].map(tech => (
               <span key={tech} className="px-3 py-1.5 text-xs font-bold text-slate-300 uppercase tracking-widest bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shadow-sm">
                  {tech}
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SystemOverview() {
  const cards = [
    { title: "Backend Services", icon: Server, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", desc: "1000+ microservices handling auth, billing, and routing", metrics: "2M+ RPS" },
    { title: "Recommendation Engine", icon: Cpu, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", desc: "Machine learning pipelines for personalized content discovery", metrics: "Sub-50ms Latency" },
    { title: "Streaming Pipeline", icon: PlayCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", desc: "Adaptive bitrate streaming and video encoding farm", metrics: "100K+ Encoding Jobs" },
    { title: "Open Connect (CDN)", icon: Network, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", desc: "Global custom CDN appliances installed directly at ISPs", metrics: "100s of Tbps" },
    { title: "Data Infrastructure", icon: Database, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", desc: "Massive scale Cassandra clusters and Kafka event streams", metrics: "Trillions of Events/Day" },
    { title: "Telemetry & Monitoring", icon: Activity, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", desc: "Atlas and Mantis for real-time operational insights", metrics: "1.5B Metrics/Minute" },
  ];

  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
      <div className="container mx-auto px-6">
        <h2 className="text-[30px] md:text-[40px] font-display font-black mb-12 tracking-tight">SYSTEM <span className="text-red-500">OVERVIEW</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div 
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition-all duration-300 shadow-xl cursor-pointer"
            >
               <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                 <card.icon className={`w-6 h-6 ${card.color}`} />
               </div>
               <h3 className="text-xl font-black mb-2 tracking-tight">{card.title}</h3>
               <p className="text-slate-400 text-sm mb-6 leading-relaxed min-h-[60px]">{card.desc}</p>
               <div className="flex items-center justify-between border-t border-white/10 pt-4">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scale Metric</span>
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${card.color}`}>{card.metrics}</span>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Map visualization
interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: string;
  icon: any;
  desc: string;
  color: string;
  stats: { label: string; value: string; color: string }[];
}

interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  source: string | NodeData;
  target: string | NodeData;
}

const NETFLIX_NODES: NodeData[] = [
  { id: 'client', label: 'User Device', type: 'client', icon: PlayCircle, desc: 'TVs, Mobile, Web UI', color: 'text-white', stats: [{label: 'Active Subs', value: '250M+', color: 'text-emerald-400'}, {label: 'Stream Quality', value: 'Dynamic 4K', color: 'text-blue-400'}] },
  { id: 'cdn', label: 'Open Connect CDN', type: 'cdn', icon: Network, desc: 'Video Chunks Delivery', color: 'text-emerald-400', stats: [{label: 'Appliances', value: '18,000+', color: 'text-emerald-400'}, {label: 'Global TTL', value: '< 20ms', color: 'text-blue-400'}] },
  { id: 'proxy', label: 'Zuul API Gateway', type: 'gw', icon: Layers, desc: 'Dynamic Edge Routing', color: 'text-cyan-400', stats: [{label: 'Requests/sec', value: 'Millions', color: 'text-cyan-400'}, {label: 'Failover', value: 'Automatic', color: 'text-emerald-400'}] },
  { id: 'auth', label: 'Playback Auth', type: 'service', icon: Shield, desc: 'DRM & Token Validation', color: 'text-blue-400', stats: [{label: 'Verification', value: 'Sub-ms', color: 'text-blue-400'}, {label: 'Tokens', value: 'OAuth/Paseto', color: 'text-emerald-400'}] },
  { id: 'steer', label: 'Play API', type: 'service', icon: Code, desc: 'Orchestrates playback requests', color: 'text-blue-400', stats: [{label: 'gRPC Calls', value: 'High', color: 'text-violet-400'}, {label: 'Services hit', value: '20+', color: 'text-rose-400'}] },
  { id: 'rec', label: 'Recommendations', type: 'service', icon: Cpu, desc: 'ML Model Inference', color: 'text-purple-400', stats: [{label: 'Calculations', value: 'Trillions', color: 'text-purple-400'}, {label: 'Pipeline', value: 'TensorFlow', color: 'text-orange-400'}] },
  { id: 'cache', label: 'EVCache', type: 'cache', icon: Zap, desc: 'Memcached-based distributed cache', color: 'text-amber-400', stats: [{label: 'Hits/sec', value: '30M+', color: 'text-amber-400'}, {label: 'Hit Rate', value: '99%', color: 'text-emerald-400'}] },
  { id: 'db', label: 'Cassandra', type: 'db', icon: Database, desc: 'Highly available NoSQL datastore', color: 'text-rose-400', stats: [{label: 'Nodes', value: 'Thousands', color: 'text-rose-400'}, {label: 'Writes/sec', value: 'Massive', color: 'text-cyan-400'}] },
  { id: 'kafka', label: 'Kafka', type: 'queue', icon: RefreshCcw, desc: 'Event stream processing pipeline', color: 'text-orange-400', stats: [{label: 'Events/day', value: 'Trillions', color: 'text-orange-400'}, {label: 'Topics', value: 'Thousands', color: 'text-blue-400'}] },
];

const NETFLIX_LINKS = [
  { source: 'client', target: 'proxy' },
  { source: 'client', target: 'cdn' }, // video traffic bypasses proxy
  { source: 'proxy', target: 'steer' },
  { source: 'proxy', target: 'rec' },
  { source: 'steer', target: 'auth' },
  { source: 'steer', target: 'cache' },
  { source: 'steer', target: 'db' },
  { source: 'rec', target: 'cache' },
  { source: 'rec', target: 'db' },
  { source: 'rec', target: 'kafka' },
  { source: 'steer', target: 'kafka' },
];

function InteractiveMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const simulationNodes: NodeData[] = NETFLIX_NODES.map(d => ({ ...d }));
    const simulationLinks: LinkData[] = NETFLIX_LINKS.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<NodeData>(simulationNodes)
      .force("link", d3.forceLink<NodeData, LinkData>(simulationLinks).id(d => d.id).distance(200))
      .force("charge", d3.forceManyBody().strength(-3000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(120))
      .on("tick", () => {
        setNodes([...simulationNodes]);
        setLinks([...simulationLinks]);
      });

    return () => simulation.stop();
  }, []);

  return (
    <section className="py-24 relative bg-black border-b border-white/5">
      <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />
      
      <div className="container mx-auto px-6 relative z-10 mb-8">
         <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">INTERACTIVE <span className="text-cyan-400">MAP</span></h2>
         <p className="text-slate-400">Explore the core systems of the playback architecture. Zoom and pan the map.</p>
      </div>

      <div className="w-full h-[700px] bg-[#02040a] border-y border-white/10 relative overflow-hidden shadow-2xl">
        <div ref={containerRef} className="absolute inset-0">
             {nodes.length > 0 && (
                <TransformWrapper
                  initialScale={1}
                  minScale={0.3}
                  maxScale={2.5}
                  centerOnInit
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
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                       <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                         <defs>
                            <linearGradient id="edgeNet" x1="0%" y1="0%" x2="100%" y2="0%">
                               <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                               <stop offset="100%" stopColor="#e11d48" stopOpacity="0.6" />
                            </linearGradient>
                         </defs>
                         {links.map((edge, i) => {
                           const source = edge.source as NodeData;
                           const target = edge.target as NodeData;
                           if (source.x === undefined || target.x === undefined) return null;
                           
                           const isActiveEdge = activeNode === source.id || activeNode === target.id;
                           const isFadedEdge = activeNode && !isActiveEdge;

                           return (
                             <g key={`edge-${i}`}>
                               <line 
                                  x1={source.x} 
                                  y1={source.y} 
                                  x2={target.x} 
                                  y2={target.y}
                                  stroke={isActiveEdge ? "url(#edgeNet)" : "rgba(255,255,255,0.1)"}
                                  strokeWidth={isActiveEdge ? 3 : 1}
                                  className={`transition-all duration-300 ${isFadedEdge ? 'opacity-10' : 'opacity-100'}`}
                               />
                               {isActiveEdge && (
                                  <motion.circle
                                     r="4"
                                     fill="#e11d48"
                                     style={{ filter: "drop-shadow(0 0 8px #e11d48)" }}
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

                       {nodes.map((node) => {
                         const Icon = node.icon;
                         const isActiveNode = activeNode === node.id;
                         
                         const isConnectedToActive = activeNode ? links.some(edge => {
                           const sourceId = typeof edge.source === 'object' ? (edge.source as NodeData).id : edge.source;
                           const targetId = typeof edge.target === 'object' ? (edge.target as NodeData).id : edge.target;
                           return (sourceId === activeNode && targetId === node.id) || (targetId === activeNode && sourceId === node.id) || activeNode === node.id;
                         }) : true;

                         const isFadedNode = activeNode && !isConnectedToActive;
                         
                         if (node.x === undefined || node.y === undefined) return null;

                         return (
                           <motion.div
                             key={node.id}
                             className={`absolute cursor-grab active:cursor-grabbing group z-10 transition-opacity duration-300 ${isFadedNode ? 'opacity-20' : 'opacity-100'}`}
                             style={{ top: (node.y || 0) - 40, left: (node.x || 0) - 40 }}
                             onMouseEnter={() => setActiveNode(node.id)}
                             onMouseLeave={() => setActiveNode(null)}
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                           >
                              <div className="relative">
                                 {isActiveNode && (
                                   <motion.div 
                                      className="absolute -inset-6 border-2 border-red-500/30 rounded-full"
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                   />
                                 )}
                                 <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl ${isActiveNode ? 'bg-[#0a0f1a] border-2 border-red-500 shadow-[0_0_30px_rgba(225,29,72,0.4)]' : 'bg-black border border-white/20 hover:border-white/40'}`}>
                                     <Icon className={`w-8 h-8 ${isActiveNode ? node.color : 'text-slate-400'}`} />
                                 </div>
                                 
                                 <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-[10px] uppercase font-bold tracking-widest transition-opacity duration-200 pointer-events-none ${isActiveNode ? 'opacity-100' : 'opacity-0'}`}>
                                    {node.label}
                                 </div>
                                 
                                 {isActiveNode && (
                                    <motion.div 
                                      initial={{ opacity: 0, x: 10, y: "-50%", scale: 0.9 }}
                                      animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
                                      className="absolute left-full ml-4 md:ml-8 top-1/2 w-[220px] md:w-[280px] bg-black/90 border border-white/10 backdrop-blur-xl p-4 md:p-5 rounded-2xl pointer-events-none block shadow-2xl z-50 text-left"
                                    >
                                       <h4 className={`text-[10px] uppercase font-bold tracking-widest mb-2 ${node.color}`}>{node.type} Node</h4>
                                       <h3 className="text-xl font-black font-display text-white mb-2 leading-tight">{node.label}</h3>
                                       <p className="text-xs text-slate-400 mb-4 leading-relaxed font-medium">{node.desc}</p>
                                       
                                       <div className="bg-white/5 rounded-lg p-3 border border-white/5 space-y-2">
                                          {node.stats?.map((stat, i) => (
                                            <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                               <span className="text-slate-500">{stat.label}</span>
                                               <span className={stat.color}>{stat.value}</span>
                                            </div>
                                          ))}
                                       </div>
                                       
                                       <div className="mt-4 text-[10px] text-emerald-400 font-bold flex items-center gap-2 uppercase tracking-widest">
                                         <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_currentColor]" />
                                         Operational
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
        
        <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/60 backdrop-blur-xl p-3 rounded-xl border border-white/10 pointer-events-none z-20 shadow-2xl">
           <kbd className="px-2 py-1 bg-white/10 border border-white/10 rounded text-[10px] font-bold text-white uppercase tracking-widest">Drag to Pan</kbd>
           <kbd className="px-2 py-1 bg-white/10 border border-white/10 rounded text-[10px] font-bold text-white uppercase tracking-widest">Use Buttons to Zoom</kbd>
        </div>
      </div>
    </section>
  )
}

function DataEngineering() {
  return (
    <section className="py-24 relative bg-black overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-violet-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <Database className="w-3 h-3" /> Big Data & Analytics
            </div>
            <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none mb-4"><span className="text-violet-500">KEYSTONE</span> DATA PIPELINE</h2>
            <p className="text-slate-400 text-lg">Netflix processes trillions of events per day (viewing history, UI interactions, performance metrics) using their custom data routing system.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Event Capture", desc: "Mobile apps, Smart TVs, and web browsers send interaction events via gRPC.", icon: Code },
            { step: "02", title: "Kafka Bus", desc: "Events hit Fronting Kafka clusters, absorbing millions of requests per second.", icon: Layers },
            { step: "03", title: "Stream Processing", desc: "Apache Flink processes streams in real-time for recommendations and monitoring.", icon: Zap },
            { step: "04", title: "Iceberg Storage", desc: "Data lands in S3 using Apache Iceberg format for massive-scale analytics.", icon: Server }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:bg-white/10 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="text-[10px] font-black tracking-widest text-violet-500 mb-6">{item.step} / 04</div>
              <div className="w-12 h-12 rounded-xl bg-[#02040a] border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)] mb-6">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RequestFlowVisual() {
   return (
      <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
        <div className="container mx-auto px-6">
           <div className="mb-16">
              <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">REQUEST <span className="text-rose-500">FLOW</span></h2>
              <p className="text-slate-400 text-lg">What happens when a user clicks "Play"?</p>
           </div>
           
           <div className="max-w-4xl mx-auto space-y-8 relative">
              <div className="absolute left-8 top-8 bottom-8 w-px bg-white/10" />
              
              {[
                 { step: "1", title: "DNS & Zuul Proxy", desc: "User request hits AWS route53, routing to nearest Zuul edge gateway for dynamic routing and filter application.", color: "bg-cyan-500" },
                 { step: "2", title: "Play API & Auth", desc: "Zuul proxies request to Play API which verifies subscriber DRM tokens and membership status.", color: "bg-blue-500" },
                 { step: "3", title: "Steering & Metadata", desc: "Play API fetches show metadata from EVCache, falls back to Cassandra if cache miss occurs.", color: "bg-purple-500" },
                 { step: "4", title: "Open Connect Selection", desc: "Play API runs steering logic to find the closest, healthiest Open Connect Appliance (OCA) with the specific video bits.", color: "bg-rose-500" },
                 { step: "5", title: "Direct Streaming", desc: "Client receives OCA IP address and begins streaming video chunks directly from the ISP-embedded CDN.", color: "bg-emerald-500" }
              ].map((item, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-8 items-start relative z-10"
                 >
                    <div className={`w-16 h-16 rounded-2xl ${item.color} shrink-0 flex items-center justify-center font-black text-2xl text-white shadow-lg border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
                       {item.step}
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex-1 hover:bg-white/10 transition-colors">
                       <h3 className="text-xl font-black tracking-tight mb-2">{item.title}</h3>
                       <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>
   )
}

function AIInsights() {
  return (
    <section className="py-24 relative border-b border-white/5 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-blue-900/10 blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                 <Terminal className="w-3 h-3" /> System Intelligence
               </div>
               <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-8">AI <span className="text-purple-400">INSIGHTS</span></h2>
               
               <div className="space-y-6">
                  <div className="bg-[#02040a] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Why Cassandra?</h4>
                     <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Netflix uses Cassandra for its inherently peer-to-peer architecture. It allows them to write data to multiple nodes across multiple regions with no single point of failure. EVCache sits in front to shield Cassandra from 99% of read requests.
                     </p>
                  </div>
                  <div className="bg-[#02040a] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Why Open Connect?</h4>
                     <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        By deploying their own custom hardware directly inside ISPs, Netflix bypasses the public internet backbone. This drastically cuts transit costs and guarantees low-latency, high-bandwidth streams during peak evening hours.
                     </p>
                  </div>
               </div>
            </div>

            <div className="relative">
               <div className="bg-[#02040a] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                     <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                     <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                     <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="space-y-4">
                     <p className="font-mono text-sm text-purple-400">Ask the architecture assistant...</p>
                     <div className="relative">
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50" placeholder="e.g. How does failover work?" />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-500 hover:bg-purple-600 text-white p-1.5 rounded-lg transition-colors">
                           <PlayCircle className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  )
}

function ScalingReliability() {
  const strategies = [
    { name: "Multi-Region Active-Active", desc: "Netflix runs out of three AWS regions concurrently. If an entire AWS region drops, traffic is dynamically shifted to the other two within minutes.", color: "text-emerald-400" },
    { name: "Chaos Engineering", desc: "Chaos Monkey randomly terminates instances in production to ensure services degradation is graceful and automated recovery works.", color: "text-rose-400" },
    { name: "Circuit Breakers (Hystrix)", desc: "Prevents cascading failures. If a service is struggling, calls to it are automatically failed fast to protect the rest of the system.", color: "text-blue-400" },
    { name: "Automated Canary Deployments", desc: "Kayenta analyzes telemetry of new code in production against a baseline before rolling out further to limit blast radius.", color: "text-cyan-400" }
  ];

  return (
    <section className="py-24 relative border-b border-white/5 bg-black">
      <div className="container mx-auto px-6">
         <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">SCALING & <span className="text-emerald-500">RELIABILITY</span></h2>
         <p className="text-slate-400 text-lg mb-12">How Netflix survives internet-scale traffic and cloud outages.</p>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
               {strategies.map((str, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="bg-[#02040a] border border-white/10 rounded-2xl p-6 shadow-xl"
                  >
                     <h3 className={`text-xl font-black mb-2 ${str.color}`}>{str.name}</h3>
                     <p className="text-slate-400 text-sm leading-relaxed font-medium">{str.desc}</p>
                  </motion.div>
               ))}
            </div>

            <div className="relative group">
               <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-[50px] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="bg-[#02040a] border border-white/10 rounded-3xl p-8 backdrop-blur-xl h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                  
                  <div className="text-center relative z-10">
                     <Activity className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                     <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Active-Active Shift</h3>
                     <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Data Center Failover Demo</p>
                     
                     <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">US-EAST (100%)</div>
                        <div className="text-slate-600"><PlayCircle className="w-6 h-6 animate-pulse" /></div>
                        <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">EU-WEST (100%)</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  )
}

function IncidentAnalysis() {
  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
       <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
             <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <AlertTriangle className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none">INCIDENT <span className="text-red-500">ANALYSIS</span></h2>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Premium Post-Mortem Explorer</div>
             </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl overflow-hidden relative shadow-2xl">
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                <div className="lg:col-span-1 border-r border-white/10 pr-8">
                   <h3 className="text-xl font-black mb-6 tracking-tight">Historic Incidents</h3>
                   <div className="space-y-3">
                      {[
                        { title: "AWS us-east-1 Outage (2015)", status: "Migrated", color: "text-emerald-400" },
                        { title: "Global DNS Routing Failure", status: "Resolved", color: "text-yellow-400" },
                        { title: "Cassandra Ring Split", status: "Resolved", color: "text-emerald-400" },
                        { title: "Squid Game Traffic Spike", status: "Absorbed", color: "text-cyan-400" }
                      ].map((inc, i) => (
                         <div key={i} className="p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all group">
                            <h4 className="font-bold text-sm text-slate-200 mb-1 group-hover:text-red-400 transition-colors">{inc.title}</h4>
                            <div className={`text-[10px] uppercase tracking-widest font-bold ${inc.color}`}>{inc.status}</div>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="lg:col-span-2">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <h3 className="text-3xl font-black tracking-tight mb-2">Squid Game Traffic Spike</h3>
                         <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Oct 2021 • Global Traffic Surge</p>
                      </div>
                      <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                         System Absorbed
                      </span>
                   </div>

                   <div className="h-40 bg-white/5 border border-white/10 rounded-xl mb-6 relative overflow-hidden flex items-end">
                      <div className="absolute inset-0 flex items-end opacity-50">
                         {Array.from({length: 40}).map((_, i) => {
                            const h = i > 15 && i < 25 ? 80 + Math.random() * 20 : 20 + Math.random() * 20;
                            return (
                               <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-500 border-t border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] mx-0.5" style={{ height: `${h}%` }} />
                            )
                         })}
                      </div>
                      <div className="absolute top-4 left-4 text-cyan-400 font-bold text-[10px] uppercase tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">Live Throughput Anomaly</div>
                   </div>

                   <p className="text-slate-300 text-sm leading-relaxed font-medium">
                      The premier of Squid Game caused an unprecedented spike in global streaming traffic, increasing baseline load by over 300% in certain regions. The architecture absorbed the traffic seamlessly via Open Connect's edge localization. Content was proactively cached at ISP edges globally, meaning the massive spike in viewing did not traverse the internet backbone, preventing catastrophic routing failures.
                   </p>
                </div>
             </div>
          </div>
       </div>
    </section>
  )
}

function EngineeringMetrics() {
  return (
    <section className="py-24 relative border-b border-white/5 bg-black overflow-hidden">
       <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />
       <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-12">ENGINEERING <span className="text-blue-500">METRICS</span></h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { metric: "Active Devices", value: "850M+", icon: Network, color: "text-blue-400" },
               { metric: "Play API RPS", value: "2.5M", icon: Activity, color: "text-rose-400" },
               { metric: "Cache Hit Ratio", value: "99.8%", icon: Zap, color: "text-amber-400" },
               { metric: "Open Connect Tput", value: "200Tbps", icon: Server, color: "text-emerald-400" },
             ].map((m, i) => (
                <div key={i} className="bg-[#02040a] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                   <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <m.icon className="w-24 h-24 text-white" />
                   </div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{m.metric}</div>
                   <div className={`text-4xl font-black tracking-tight drop-shadow-[0_0_15px_currentColor] ${m.color}`}>{m.value}</div>
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function ContentPipeline() {
  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a] overflow-hidden">
       {/* Background grids and glows */}
       <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

       <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-blue-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Code className="w-3 h-3" /> Core Technology
              </div>
              <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none mb-4">DYNAMIC <span className="text-blue-500">CONTENT ENCODING</span></h2>
              <p className="text-slate-400 text-lg">Netflix doesn't just encode a video once. They use a neural network (Dynamic Optimizer) to encode every single scene at the optimal bitrate.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                <h3 className="text-xl font-black mb-6 tracking-tight">Per-Title & Per-Shot Encoding</h3>
                
                <div className="relative h-48 mb-8 flex items-center justify-between px-4">
                  <div className="absolute top-1/2 left-8 right-8 h-px bg-white/10 -translate-y-1/2" />
                  
                  {[
                    { label: "Raw Master File", size: "2TB", icon: Database },
                    { label: "Scene Detection (ML)", size: "Chunks", icon: Cpu },
                    { label: "Parallel Workers", size: "10K+ EC2", icon: Layers },
                    { label: "Optimized Output", size: "4K/HDR", icon: PlayCircle }
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="relative z-10 flex flex-col items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#02040a] border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                         <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">{step.label}</div>
                         <div className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded inline-block">{step.size}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Instead of using one massive server to encode a 2-hour movie, Netflix breaks the master file down into thousands of tiny chunks based on scene changes. These chunks are processed in parallel across hundreds of thousands of AWS EC2 spot instances using their media processing platform, Archer.
                </p>
             </div>

             <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors shadow-xl">
                  <h4 className="font-black text-rose-100 mb-2">Complexity-Based Bitrates</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Fast action scenes (explosions, sports) require high bitrates to look good. Quiet dialogue scenes don't. Netflix's AI analyzes each shot specifically to allocate bandwidth precisely where the human eye needs it.</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors shadow-xl group">
                  <div className="flex items-center justify-between mb-4">
                     <h4 className="font-black text-rose-100">Storage vs Bandwidth</h4>
                     <Network className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">It's cheaper to pre-encode 50 different variations of a single movie (costing storage space) than it is to stream a higher-bitrate-than-necessary file to millions of people (costing transit bandwidth).</p>
                </div>
             </div>
          </div>
       </div>
    </section>
  )
}

function DeviceUIArchitecture() {
  return (
    <section className="py-24 relative bg-black overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-rose-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            <Layers className="w-3 h-3" /> Client Architecture
          </div>
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none mb-6">CUSTOM <span className="text-rose-500">RENDER ENGINE</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Smart TVs are severely underpowered. Netflix engineers couldn't use standard DOM rendering, so they built their own rendering engine.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50" />
            <div className="relative aspect-video bg-[#02040a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
               {/* TV Screen Mockup */}
               <div className="absolute inset-0 p-4 flex flex-col">
                  {/* Top nav */}
                  <div className="h-6 w-full flex items-center justify-between mb-8 opacity-50">
                    <div className="w-24 h-4 bg-white/20 rounded" />
                    <div className="flex gap-2"><div className="w-4 h-4 bg-white/20 rounded-full" /><div className="w-4 h-4 bg-white/20 rounded-full" /></div>
                  </div>
                  {/* Hero item */}
                  <div className="h-1/2 w-full bg-gradient-to-r from-rose-500/20 to-transparent rounded-lg mb-4 flex flex-col justify-end p-4 border border-white/5">
                     <div className="w-1/2 h-6 bg-white/80 rounded mb-2" />
                     <div className="w-1/3 h-3 bg-white/40 rounded" />
                  </div>
                  {/* Row */}
                  <div className="flex gap-4 h-1/4">
                     {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex-1 bg-white/10 rounded border border-white/5" />
                     ))}
                  </div>

                  {/* Rendering Overlay */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                     <motion.div 
                       className="absolute w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_#22d3ee]"
                       animate={{ top: ["0%", "100%", "0%"] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     />
                     <div className="px-4 py-2 bg-black/80 border border-cyan-500 text-cyan-400 text-xs font-mono font-bold rounded flex items-center gap-2 backdrop-blur-md">
                        <Code className="w-4 h-4" /> Gibbon React Runtime
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            {[
              { title: "React Without the DOM", desc: "Netflix uses a custom React reconciler. Instead of rendering to HTML elements, it renders to a WebGL canvas running inside a custom app on the TV.", icon: Code },
              { title: "Zero Garbage Collection", desc: "Garbage collection pauses standard JavaScript, causing dropped frames on set-top boxes. Netflix heavily reuses objects using a custom memory pool.", icon: RefreshCcw },
              { title: "Pre-fetching Strategies", desc: "When navigating the grid, images and metadata are aggressively pre-fetched so pressing 'arrow right' feels instant.", icon: Zap }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                 <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <feature.icon className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
function TechStackBreakdown() {
  const techs = [
    { name: "Cassandra", role: "NoSQL Database", pros: "Linearly scalable, Multi-region active-active, No SPOF" },
    { name: "Kafka", role: "Event Bus", pros: "Handles trillions of telemetry & logging events per day" },
    { name: "EVCache", role: "Distributed Cache", pros: "Memcached wrapper, sub-millisecond lookups, highly available" },
    { name: "Spring Boot", role: "Microservices", pros: "Core language for backend services, mature ecosystem" },
    { name: "GraphQL", role: "Federated API", pros: "Aggregates fetching across 100s of backend services" }
  ];

  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
       <div className="container mx-auto px-6">
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-12">TECH <span className="text-cyan-400">STACK</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {techs.map((t, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                   <h3 className="text-2xl font-black mb-1">{t.name}</h3>
                   <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4">{t.role}</div>
                   <p className="text-sm text-slate-400 font-medium">{t.pros}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function TimelineEvolution() {
  const events = [
    { year: "2008", title: "The Great Outage & Monolith", desc: "A massive database corruption in their monolith data center halted DVD shipments for 3 days. Netflix decided to move to AWS." },
    { year: "2011", title: "Microservices & Chaos Monkey", desc: "Started untangling the monolith into loosely coupled services and invented Chaos Monkey to test resilience." },
    { year: "2016", title: "Global Expansion & Open Connect", desc: "Expanded to 130 new countries simultaneously requiring massive CDN scale-out via custom freebsd appliance deployments." },
    { year: "2020", title: "Kubernetes & GraphQL", desc: "Migrated from EC2-only deployments to Titus (internal container management) and unified edge endpoints with GraphQL." }
  ];

  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
       <div className="container mx-auto px-6">
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-16 text-center">ARCHITECTURE <span className="text-rose-500">EVOLUTION</span></h2>
          
          <div className="max-w-4xl mx-auto relative">
             <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10" />
             
             <div className="space-y-24">
                {events.map((evt, i) => {
                   const isLeft = i % 2 === 0;
                   return (
                      <div key={i} className="relative flex items-center justify-center">
                         <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 border-4 border-[#02040a] z-10 shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
                         
                         <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 ml-auto'}`}>
                            <motion.div 
                               initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                               whileInView={{ opacity: 1, x: 0 }}
                               viewport={{ once: true }}
                               className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl hover:bg-white/10 transition-colors"
                            >
                               <div className="text-3xl font-black text-rose-500 mb-2">{evt.year}</div>
                               <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{evt.title}</h3>
                               <p className="text-sm text-slate-400 font-medium leading-relaxed">{evt.desc}</p>
                            </motion.div>
                         </div>
                      </div>
                   )
                })}
             </div>
          </div>
       </div>
    </section>
  )
}

function OpenSourcePioneer() {
  const oss = [
    { title: "Chaos Monkey", desc: "Invented Chaos Engineering by randomly terminating production EC2 instances to enforce resilience.", icon: AlertTriangle, color: "text-rose-400" },
    { title: "Netflix OSS (Eureka/Zuul)", desc: "Pioneered the Java microservice ecosystem long before Kubernetes existed, sharing tools like Eureka (Service Discovery) and Zuul (Gateway).", icon: Server, color: "text-cyan-400" },
    { title: "Spinnaker", desc: "Created the multi-cloud continuous delivery platform used globally for high-velocity deployments.", icon: GitBranch, color: "text-blue-400" },
    { title: "Mantis & Atlas", desc: "Open-sourced their massive scale operational telemetry and stream processing systems.", icon: Activity, color: "text-emerald-400" }
  ];

  return (
    <section className="py-24 relative border-b border-white/5 bg-black">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
           <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">OPEN SOURCE <span className="text-cyan-400">PIONEER</span></h2>
           <p className="text-slate-400 text-lg">Netflix's commitment to sharing their battle-tested infrastructure software shaped the modern cloud-native ecosystem.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {oss.map((item, i) => (
             <div key={i} className="bg-[#02040a] border border-white/10 rounded-2xl p-8 hover:bg-white/5 transition-colors shadow-2xl flex gap-6 items-start">
                <div className={`shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color}`}>
                   <item.icon className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-black mb-2 text-white">{item.title}</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}

function CommunityDiscussions() {
  const discussions = [
    { user: "Sarah J.", avatar: "bg-blue-500", role: "Sr Staff Engineer", topic: "Is EVCache overkill for most startups?", replies: 42, text: "If you aren't doing 100k+ RPS, standard Redis clusters are fine. Netflix uses EVCache heavily because of their specific global replication needs." },
    { user: "David C.", avatar: "bg-emerald-500", role: "Platform Architect", topic: "Why not use gRPC instead of GraphQL?", replies: 89, text: "They actually use gRPC heavily between backend services! GraphQL is mostly used at the edge to aggregate data for the client UI seamlessly." }
  ];

  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-8">ENGINEERING <span className="text-purple-500">DISCUSSIONS</span></h2>
        
        <div className="space-y-6">
           {discussions.map((d, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                 <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-full ${d.avatar} flex items-center justify-center font-bold text-white shadow-xl`}>
                       {d.user[0]}
                    </div>
                    <div>
                       <div className="font-bold text-white tracking-tight">{d.user}</div>
                       <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{d.role}</div>
                    </div>
                 </div>
                 <h3 className="font-bold text-lg text-rose-100 mb-2">{d.topic}</h3>
                 <p className="text-slate-400 text-sm leading-relaxed mb-4">{d.text}</p>
                 <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors"><Activity className="w-3 h-3" /> {d.replies} Replies</span>
                    <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">Upvote</span>
                 </div>
              </div>
           ))}
        </div>
        
        <div className="mt-8 text-center">
           <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold text-sm text-white transition-colors">
              Join the Architecture Discussion
           </button>
        </div>
      </div>
    </section>
  )
}

function RelatedArchitectures() {
  const architectures = [
    { title: "Uber Dispatch", icon: Activity, color: "from-slate-700 to-black" },
    { title: "Discord Chat", icon: Terminal, color: "from-indigo-600 to-purple-800" },
    { title: "Spotify Recs", icon: PlayCircle, color: "from-emerald-600 to-teal-900" }
  ];

  return (
    <section className="py-24 relative bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-[20px] md:text-[30px] font-display font-black tracking-tight mb-8">EXPLORE <span className="text-cyan-400">RELATED</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {architectures.map((arch, i) => (
              <div key={i} className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl">
                 <div className={`absolute inset-0 bg-gradient-to-br ${arch.color} opacity-40 group-hover:opacity-80 transition-opacity duration-300`} />
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
                 <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <arch.icon className="w-8 h-8 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-lg font-black text-white group-hover:translate-x-2 transition-transform">{arch.title}</h3>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </section>
  )
}

export function NetflixArchitecture() {
  useEffect(() => {
    document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-[#02040a] text-slate-100 min-h-screen relative font-sans">
      <NetflixHero />
      <SystemOverview />
      <ContentPipeline />
      <DeviceUIArchitecture />
      <EngineeringMetrics />
      <InteractiveMap />
      <DataEngineering />
      <RequestFlowVisual />
      <ScalingReliability />
      <IncidentAnalysis />
      <TimelineEvolution />
      <AIInsights />
      <TechStackBreakdown />
      <OpenSourcePioneer />
      <CommunityDiscussions />
      <RelatedArchitectures />
      
      <footer className="py-12 text-center text-[10px] font-bold uppercase tracking-widest text-slate-600 border-t border-white/5 bg-black">
         CloudIgnite Analytics • Internal Intelligence System
      </footer>
    </div>
  )
}
