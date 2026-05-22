import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import {
  Car, MapPin, Smartphone, Server, Database, Activity, GitBranch, Layers, 
  Terminal, Shield, Cpu, Code, ArrowLeft, RefreshCcw, Network, Zap, 
  Map, Users, Crosshair, Plus, Minus, Maximize, ArrowRight, Bot, BarChart, Clock, AlertTriangle, PlayCircle
} from 'lucide-react';

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

const UBER_NODES: NodeData[] = [
  { id: 'rider', label: 'Rider App', type: 'client', icon: Smartphone, desc: 'Requests rides, tracks location', color: 'text-white', stats: [{label: 'Active Users', value: '130M+', color: 'text-emerald-400'}, {label: 'Platform', value: 'iOS/Android', color: 'text-blue-400'}] },
  { id: 'driver', label: 'Driver App', type: 'client', icon: Car, desc: 'Receives requests, navigation', color: 'text-emerald-400', stats: [{label: 'Active Drivers', value: '6M+', color: 'text-emerald-400'}, {label: 'Ping Rate', value: 'Every 4s', color: 'text-blue-400'}] },
  { id: 'gateway', label: 'API Gateway', type: 'gw', icon: Layers, desc: 'Entry point, auth, rate limiting', color: 'text-cyan-400', stats: [{label: 'Requests', value: 'Millions/sec', color: 'text-cyan-400'}, {label: 'Tech', value: 'NGINX/Go', color: 'text-blue-400'}] },
  { id: 'dispatch', label: 'Dispatch', type: 'service', icon: Network, desc: 'Matches riders and drivers', color: 'text-purple-400', stats: [{label: 'Latency', value: '< 100ms', color: 'text-purple-400'}, {label: 'Language', value: 'Go/Node.js', color: 'text-rose-400'}] },
  { id: 'map', label: 'Map Service', type: 'service', icon: Map, desc: 'Routing, ETAs, H3 Index', color: 'text-amber-400', stats: [{label: 'Index', value: 'Hexagonal', color: 'text-amber-400'}, {label: 'Updates', value: 'Real-time', color: 'text-emerald-400'}] },
  { id: 'kafka', label: 'Kafka', type: 'queue', icon: RefreshCcw, desc: 'Event stream processing pipeline', color: 'text-orange-400', stats: [{label: 'Events/sec', value: 'Millions', color: 'text-orange-400'}, {label: 'Topics', value: 'Thousands', color: 'text-blue-400'}] },
  { id: 'cassandra', label: 'Cassandra', type: 'db', icon: Database, desc: 'Highly available NoSQL store', color: 'text-rose-400', stats: [{label: 'Clusters', value: 'Hundreds', color: 'text-rose-400'}, {label: 'Availability', value: '99.99%', color: 'text-emerald-400'}] },
  { id: 'redis', label: 'Redis / Cache', type: 'cache', icon: Zap, desc: 'In-memory geospatial index', color: 'text-red-500', stats: [{label: 'Read/Write', value: 'Sub-ms', color: 'text-red-500'}, {label: 'Architecture', value: 'Ringpop', color: 'text-cyan-400'}] },
  { id: 'pricing', label: 'Pricing Engine', type: 'service', icon: Code, desc: 'Dynamic pricing (surge)', color: 'text-blue-500', stats: [{label: 'Updates', value: 'Continuous', color: 'text-blue-500'}, {label: 'Input', value: 'ML Models', color: 'text-purple-400'}] },
];

const UBER_LINKS = [
  { source: 'rider', target: 'gateway' },
  { source: 'driver', target: 'gateway' },
  { source: 'gateway', target: 'dispatch' },
  { source: 'dispatch', target: 'map' },
  { source: 'dispatch', target: 'redis' },
  { source: 'dispatch', target: 'pricing' },
  { source: 'map', target: 'cassandra' },
  { source: 'pricing', target: 'cassandra' },
  { source: 'pricing', target: 'kafka' },
  { source: 'dispatch', target: 'kafka' },
  { source: 'gateway', target: 'kafka' },
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

    const simulationNodes: NodeData[] = UBER_NODES.map(d => ({ ...d }));
    const simulationLinks: LinkData[] = UBER_LINKS.map(d => ({ ...d }));

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
    <section className="py-24 relative overflow-hidden bg-black border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
           <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">SYSTEM <span className="text-cyan-400">TOPOLOGY</span></h2>
           <p className="text-slate-400 text-lg">Interactive force-directed graph of Uber's microservice ecosystem.</p>
        </div>

        <div className="h-[600px] w-full bg-[#02040a] rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl" ref={containerRef}>
          <div className="absolute top-6 left-6 flex flex-col items-start gap-3 bg-black/60 backdrop-blur-xl p-3 rounded-xl border border-white/10 pointer-events-none z-20 shadow-2xl">
             <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 border border-white/10 rounded text-[10px] font-bold text-white uppercase tracking-widest">Drag</kbd>
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">to Pan</span>
             </div>
             <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 border border-white/10 rounded text-[10px] font-bold text-white uppercase tracking-widest">Scroll / Buttons</kbd>
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">to Zoom</span>
             </div>
          </div>
             {nodes.length > 0 && (
                <TransformWrapper
                  initialScale={0.8}
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
                               <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.6" />
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
                                     fill="#2dd4bf"
                                     initial={{ offsetDistance: "0%" } as any}
                                     animate={{ offsetDistance: "100%" } as any}
                                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                     style={{ offsetPath: `path('M ${source.x} ${source.y} L ${target.x} ${target.y}')` } as any}
                                  />
                               )}
                             </g>
                           )
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
                                      className="absolute -inset-6 border-2 border-emerald-500/30 rounded-full"
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                   />
                                 )}
                                 <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl ${isActiveNode ? 'bg-[#0a0f1a] border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'bg-black border border-white/20 hover:border-white/40'}`}>
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
                                          <Activity className="w-3 h-3 animate-pulse" /> Live
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
      </div>
    </section>
  )
}

function UberHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)]" />
          <div className="absolute top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
       </div>

       <div className="container mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to Architectures
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-2xl text-white text-3xl font-black">
                   U
                 </div>
                 <div>
                   <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Real-Time Routing & Dispatch</h2>
                   <div className="text-slate-400 text-sm">Case Study #02</div>
                 </div>
               </div>

               <h1 className="text-[50px] md:text-[70px] font-display font-black leading-[0.9] tracking-tight mb-8">
                 UBER <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                   ARCHITECTURE
                 </span>
               </h1>

               <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
                 Matching millions of riders and drivers in real-time requires sub-second latency, robust geospatial indexing, and an architecture that handles billions of continuous telemetry events.
               </p>

               <div className="flex flex-wrap gap-4 mt-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                     <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Active Users</div>
                     <div className="text-2xl font-black text-white">150M+ / mo</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                     <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Global Reach</div>
                     <div className="text-2xl font-black text-emerald-400">70+ Countries</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                     <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Dispatch</div>
                     <div className="text-2xl font-black text-cyan-400">&lt; Seconds</div>
                  </div>
               </div>
            </div>

            <div className="relative hidden lg:block">
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full blur-[100px]" />
               <pre className="relative bg-[#02040a] rounded-2xl p-6 border border-white/10 text-xs text-emerald-400 font-mono shadow-2xl overflow-x-auto">
                 <code>{`// DISPATCH ALGORITHM EXCERPT

func (d *Dispatcher) Match(ctx context.Context, req *RideRequest) (*Match, error) {
    // 1. Fetch live drivers in H3 hexagon
    drivers := d.geoIndex.GetNearestDrivers(req.Location, req.Radius)
    
    // 2. Filter by criteria (UberX, rating, etc)
    var candidates []Driver
    for _, driver := range drivers { // 4s ping ttl
        if d.isEligible(driver, req) {
            candidates = append(candidates, driver)
        }
    }
    
    // 3. Score drivers via ranker ML
    scored := d.ranker.Score(candidates, req)
    
    // 4. Offer ride to best candidate
    bestMatch := d.offerRide(scored[0])
    
    return bestMatch, nil
}`}</code>
               </pre>
            </div>
          </div>
       </div>
    </section>
  )
}

function RideMatchingSystem() {
  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
       <div className="container mx-auto px-6">
          <div className="mb-16 max-w-3xl">
             <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Crosshair className="w-3 h-3" /> Core System
             </div>
             <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">REAL-TIME <span className="text-emerald-400">RIDE MATCHING</span></h2>
             <p className="text-slate-400 text-lg">The core dispatch system balances marketplace efficiency, minimizing rider wait times and maximizing driver utilization.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: Smartphone, title: 'Passenger Request', desc: 'Gateway parses pickup/dropoff, validates auth, and initiates a trip state machine.' },
               { icon: Crosshair, title: 'Nearest Driver Discovery', desc: 'DISCO (Dispatch Optimization) uses H3 and Ringpop to fetch drivers caching recent GPS pings.' },
               { icon: MapPin, title: 'ETA & Routing Engine', desc: 'Calculates dynamic route estimations considering real-time traffic and historical speeds.' },
               { icon: Code, title: 'Dynamic Pricing', desc: 'Applies real-time surge multipliers based on localized demand spikes and driver supply.' },
               { icon: Users, title: 'Driver Matching', desc: 'ML models score candidates. Best match receives offer. If declined, cascades to next best.' },
               { icon: Map, title: 'Trip Confirmation', desc: 'State syncs across Rider and Driver apps. Live WebSockets begin streaming location data.' }
             ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors relative group">
                   <div className="absolute top-4 right-4 text-white/5 font-black text-4xl group-hover:text-emerald-500/10 transition-colors">0{i+1}</div>
                   <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 text-emerald-400 shadow-xl relative z-10">
                      <item.icon className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                   <p className="text-slate-400 leading-relaxed text-sm relative z-10">{item.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function DynamicPricing() {
  return (
    <section className="py-24 relative bg-[#02040a] overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-rose-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.2)]">
              <Activity className="w-3 h-3" /> Marketplace Balance
            </div>
            <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none mb-6">DYNAMIC <span className="text-rose-500">PRICING ENGINE</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Surge pricing is calculated continuously to balance supply (drivers) and demand (riders). When demand spikes in a specific H3 hexagon, the pricing engine outputs a real-time fare multiplier.
            </p>
            <div className="space-y-4">
              {['Demand Spikes', 'Driver Availability', 'Weather Conditions', 'Traffic Data', 'Local Events'].map((input, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="font-bold text-sm">{input}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute -inset-10 bg-gradient-to-tr from-rose-500/20 to-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
             <div className="bg-[#02040a] rounded-3xl border border-white/10 p-8 shadow-2xl relative">
                <div className="flex justify-between items-end mb-8">
                   <div>
                     <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Current Surge</div>
                     <div className="text-4xl font-black text-rose-500">2.4x</div>
                   </div>
                   <div className="text-right">
                     <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Hexagon ID</div>
                     <div className="font-mono text-sm text-cyan-400">8928308280fffff</div>
                   </div>
                </div>
                {/* Heatmap visualization placeholder */}
                <div className="aspect-video bg-black/50 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-1 p-2">
                      {[...Array(15)].map((_, i) => {
                         const heat = Math.random();
                         const isHigh = heat > 0.7;
                         const color = isHigh ? 'bg-rose-500/40' : (heat > 0.4 ? 'bg-orange-500/30' : 'bg-emerald-500/10');
                         return (
                           <motion.div 
                             key={i} 
                             className={`rounded shadow-inner border border-white/5 ${color}`}
                             animate={{ opacity: [0.7, 1, 0.7] }}
                             transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                           />
                         )
                      })}
                   </div>
                   <div className="absolute bg-black/80 backdrop-blur border border-rose-500/50 px-4 py-2 rounded-lg text-rose-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                     <Zap className="w-4 h-4" /> Demand Spike Detected
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EventStreamingPipeline() {
  return (
    <section className="py-24 relative bg-black overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <RefreshCcw className="w-3 h-3" /> Event Driven
          </div>
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none mb-6">DATA <span className="text-orange-500">FIREHOSE</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Trillions of events flow through Kafka daily. This event streaming architecture decouples microservices and powers real-time analytics.</p>
        </div>

        <div className="relative">
           {/* Flow connection line */}
           <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full hidden md:block" />
           
           <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
             {[
               { name: "Mobile Apps", type: "Source", icon: Smartphone, color: "text-white", border: "border-white/20" },
               { name: "Kafka Topics", type: "Broker", icon: Layers, color: "text-orange-400", border: "border-orange-500/40", glow: "shadow-[0_0_30px_rgba(249,115,22,0.2)]" },
               { name: "Apache Flink", type: "Processing", icon: Zap, color: "text-amber-400", border: "border-amber-500/40" },
               { name: "Data Lake", type: "Storage", icon: Database, color: "text-blue-400", border: "border-blue-500/40" },
               { name: "Dispatch / ML", type: "Consumer", icon: Cpu, color: "text-purple-400", border: "border-purple-500/40" },
             ].map((node, i) => (
                <div key={i} className={`bg-[#0a0f1a] border ${node.border} p-6 rounded-2xl flex flex-col items-center justify-center text-center ${node.glow || ''}`}>
                   <node.icon className={`w-8 h-8 mb-4 ${node.color}`} />
                   <h4 className="font-bold text-sm mb-1">{node.name}</h4>
                   <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{node.type}</span>
                </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  )
}

function ErrorAndFaultTolerance() {
  return (
    <section className="py-24 relative bg-[#02040a] border-b border-white/5">
       <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/3">
                <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mb-6 text-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                   <Shield className="w-10 h-10" />
                </div>
                <h2 className="text-[30px] font-display font-black tracking-tight leading-none mb-4">FAULT <br/><span className="text-rose-500">TOLERANCE</span></h2>
             </div>
             <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Multi-Region Failover", desc: "Active-Active architecture across multiple data centers allows instant traffic shifting." },
                  { title: "Graceful Degradation", desc: "If ETA ML service fails, dispatch falls back to simple straight-line distance calculations." },
                  { title: "Circuit Breakers", desc: "Envoy proxies automatically block traffic to failing microservices to prevent cascading crashes." },
                  { title: "Ringpop Subnets", desc: "Geospatial indexing nodes are decentralized; if a node dies, the ring immediately rebalances." }
                ].map((item, i) => (
                   <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl">
                      <h4 className="font-bold text-sm text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </section>
  )
}

function RealtimeTracking() {
  return (
    <section className="py-24 relative bg-black overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Map className="w-3 h-3" /> Geospatial Architecture
          </div>
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none mb-6">HEXAGONAL <span className="text-emerald-500">MAPPING (H3)</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Uber cannot afford to check pure GPS radius queries for 6 million drivers. They open-sourced H3, an indexing system that gridded the entire earth into hexagons.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50" />
            <div className="relative aspect-video bg-[#02040a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
                {/* H3 Map visual simulation */}
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-20 grayscale invert filter" />
                <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse-slow">
                        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke="#10b981" strokeWidth="2" fill="rgba(16,185,129,0.2)" />
                    </svg>
                    <motion.div 
                        className="absolute inset-0 m-auto w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399]"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </div>
          </div>

          <div className="space-y-8">
            {[
              { title: "Constant Time Lookups", desc: "Every GPS coordinate is converted into a 64-bit integer representing its hexagon. Nearby drivers are found using simple array lookups instead of expensive math.", icon: Code },
              { title: "Ringpop & Gossip", desc: "State of drivers (available, busy) is kept in-memory across a cluster of Node.js instances that talk to each other via a gossip protocol.", icon: Layers },
              { title: "Kafka Firehose", desc: "Every driver phone sends a ping every 4 seconds. These billions of pings drop into Kafka, to be indexed by Redis and logged to Hadoop.", icon: Zap }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                 <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
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

function MachineLearning() {
  return (
    <section className="py-24 relative bg-black overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Cpu className="w-3 h-3" /> Michelangelo Platform
          </div>
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none mb-6">MACHINE <span className="text-purple-500">LEARNING</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Uber relies heavily on ML for ETAs, surge pricing, fraud detection, and rider-driver matching across both Ride-Hailing and Uber Eats. They built Michelangelo to standardise ML workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Feature Store", desc: "A centralized repository of features (e.g. 'user's average trips per week') computed via Spark, accessible at low latency by online models.", icon: Database },
            { step: "02", title: "Model Training", desc: "Batch training pipelines running on CPU/GPU clusters using XGBoost, TensorFlow, and PyTorch against historical data lakes.", icon: Server },
            { step: "03", title: "Real-time Inference", desc: "Deployed models exposed via RPC endpoints that can evaluate millions of scoring requests per second during dispatch.", icon: Zap },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:bg-white/10 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="text-[10px] font-black tracking-widest text-purple-500 mb-6">{item.step} / 03</div>
              <div className="w-12 h-12 rounded-xl bg-[#02040a] border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] mb-6">
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

function OpenSourceContributions() {
  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
       <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
             <GitBranch className="w-8 h-8 text-rose-500" />
             <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight">OPEN <span className="text-rose-500">SOURCE</span></h2>
          </div>
          <p className="text-slate-400 text-lg mb-12">Uber has created and open-sourced fundamental technologies used by millions of developers globally today.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { name: "H3", desc: "A hexagonal hierarchical geospatial indexing system used for efficient spatial analytics.", color: "text-emerald-400" },
               { name: "Jaeger", desc: "Distributed tracing platform created by Uber to monitor and troubleshoot complex microservices.", color: "text-cyan-400" },
               { name: "M3", desc: "A large-scale metrics platform for Prometheus designed to store and query billions of metrics.", color: "text-blue-400" },
               { name: "Base Web", desc: "A robust React UI framework providing base components for web applications.", color: "text-rose-400" }
             ].map((project, i) => (
               <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <h3 className={`font-black text-xl mb-2 ${project.color}`}>{project.name}</h3>
                  <p className="text-slate-400 text-sm">{project.desc}</p>
               </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function InteractiveSystemFlow() {
  const steps = [
    { label: "User App", desc: "Requests ride", color: "text-white", border: "border-white/20" },
    { label: "API Gateway", desc: "Auth & Rate limits", color: "text-cyan-400", border: "border-cyan-500/30" },
    { label: "Location Service", desc: "Geolocates user", color: "text-emerald-400", border: "border-emerald-500/30" },
    { label: "Dispatch Engine", desc: "Finds drivers via H3", color: "text-purple-400", border: "border-purple-500/30" },
    { label: "Pricing Engine", desc: "Calculates surge", color: "text-rose-400", border: "border-rose-500/30" },
    { label: "Driver Match", desc: "ML scoring", color: "text-orange-400", border: "border-orange-500/30" },
  ];

  return (
    <section className="py-24 relative bg-[#02040a] border-b border-white/5">
       <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
             <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">SYSTEM <span className="text-blue-500">FLOW</span></h2>
             <p className="text-slate-400 text-lg max-w-2xl mx-auto">What happens when a user books a ride? The request cascades through multiple microservices in less than a second.</p>
          </div>

          <div className="relative">
             <div className="flex flex-wrap justify-center gap-4 lg:gap-8 relative z-10">
                {steps.map((step, i) => (
                   <div key={i} className="flex items-center">
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.9 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.15 }}
                       className={`bg-[#0a0f1a] border ${step.border} p-5 rounded-2xl w-[160px] text-center shadow-2xl relative group`}
                     >
                        <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl bg-white/5 flex items-center justify-center text-[10px] font-bold text-slate-500">
                           {i + 1}
                        </div>
                        <h4 className={`font-bold mt-2 mb-1 ${step.color}`}>{step.label}</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{step.desc}</p>
                     </motion.div>
                     {i < steps.length - 1 && (
                        <ArrowRight className="w-6 h-6 text-slate-600 mx-2 lg:mx-4 hidden sm:block" />
                     )}
                   </div>
                ))}
             </div>
          </div>
       </div>
    </section>
  )
}

function EngineeringMetricsDashboard() {
  return (
    <section className="py-24 relative bg-black border-b border-white/5">
       <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
             <BarChart className="w-8 h-8 text-white" />
             <h2 className="text-[30px] font-display font-black tracking-tight">ENGINEERING <span className="text-slate-500">METRICS</span></h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { label: "Dispatch Latency", value: "< 100ms", icon: Clock, color: "text-emerald-400" },
               { label: "Kafka Throughput", value: "3M+/sec", icon: Activity, color: "text-orange-400" },
               { label: "Failed Requests", value: "0.01%", icon: AlertTriangle, color: "text-rose-400" },
               { label: "Active Drivers", value: "5.5M", icon: Car, color: "text-cyan-400" },
               { label: "Rides / Second", value: "300+", icon: Network, color: "text-purple-400" },
               { label: "GPS Updates", value: "Billion/day", icon: MapPin, color: "text-blue-400" },
               { label: "Surge Regions", value: "142", icon: Zap, color: "text-yellow-400" },
               { label: "Average ETA", value: "3.2m", icon: Clock, color: "text-emerald-400" }
             ].map((metric, i) => (
                <div key={i} className="bg-[#02040a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                         <metric.icon className={`w-4 h-4 ${metric.color}`} />
                      </div>
                      <Activity className="w-16 h-8 text-white/5" />
                   </div>
                   <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{metric.label}</div>
                      <div className="text-2xl font-black text-white">{metric.value}</div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  )
}

function AIInsights() {
  return (
    <section className="py-24 relative border-b border-white/5 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-indigo-900/10 blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                 <Terminal className="w-3 h-3" /> System Intelligence
               </div>
               <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-8">AI <span className="text-indigo-400">INSIGHTS</span></h2>
               
               <div className="space-y-6">
                  <div className="bg-[#02040a] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Why build H3?</h4>
                     <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Radius distance queries across millions of drivers using standard mathematics takes O(N) time and burns CPU. H3 pre-calculates the globe into hexagons, turning complex geospatial distance queries into simple, instant O(1) array index lookups.
                     </p>
                  </div>
                  <div className="bg-[#02040a] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">The Role of Kafka</h4>
                     <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Uber is fundamentally an event-streaming company. A car moving 10 feet generates a ping. Kafka acts as the central nervous system, decoupling the heavy ingestion of GPS data from the microservices reading it to prevent database locks.
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
                     <p className="font-mono text-sm text-indigo-400">Ask the architecture assistant...</p>
                     <div className="relative">
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50" placeholder="e.g. How does surge pricing work?" />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white p-1.5 rounded-lg transition-colors">
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

function CommunityDiscussions() {
  const discussions = [
    { user: "Michael T.", avatar: "bg-orange-500", role: "Sr Backend Engineer", topic: "Is Redis the best choice for geospatial queries?", replies: 34, text: "For exact sub-millisecond latencies needed during matching, an in-memory datastore like Redis coupled with a gossip protocol like Ringpop was necessary. H3 indexes serve as the keys." },
    { user: "Elena M.", avatar: "bg-teal-500", role: "Data Architect", topic: "Why did Uber create Jaeger?", replies: 67, text: "When you have thousands of microservices, finding out which service caused a 500ms delay in dispatch is impossible without distributed tracing. Jaeger solves this." }
  ];

  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-8">ENGINEERING <span className="text-indigo-500">DISCUSSIONS</span></h2>
        
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
                 <h3 className="font-bold text-lg text-emerald-100 mb-2">{d.topic}</h3>
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

function TechStackBreakdown() {
  const techs = [
    { name: "Node.js & Go", role: "Backend Services", pros: "Go handles extreme concurrency; Node routes API streams" },
    { name: "Cassandra", role: "Primary Datastore", pros: "Massive scale writes for trips, pricing, history" },
    { name: "Redis", role: "Datastore & Cache", pros: "In-memory caching and real-time geospatial queues" },
    { name: "Kafka", role: "Message Broker", pros: "Ingests billions of telemetry logs instantly" },
    { name: "Hadoop", role: "Big Data Lake", pros: "Long-term archiving for ML models and analytics" },
  ];

  return (
    <section className="py-24 relative bg-[#02040a] border-b border-white/5">
       <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-12 text-center">CORE <span className="text-cyan-400">TECHNOLOGIES</span></h2>
          
          <div className="space-y-4">
             {techs.map((tech, i) => (
               <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <div className="w-48 shrink-0">
                     <h3 className="font-bold text-lg text-white">{tech.name}</h3>
                     <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{tech.role}</p>
                  </div>
                  <div className="w-px h-12 bg-white/10 hidden md:block" />
                  <p className="text-slate-400 text-sm">{tech.pros}</p>
               </div>
             ))}
          </div>
       </div>
    </section>
  )
}

export function UberArchitecture() {
  useEffect(() => {
    document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-[#02040a] text-slate-100 min-h-screen relative font-sans">
      <UberHero />
      <RideMatchingSystem />
      <DynamicPricing />
      <InteractiveMap />
      <RealtimeTracking />
      <EventStreamingPipeline />
      <MachineLearning />
      <ErrorAndFaultTolerance />
      <InteractiveSystemFlow />
      <EngineeringMetricsDashboard />
      <TechStackBreakdown />
      <OpenSourceContributions />
      <AIInsights />
      <CommunityDiscussions />
      <div className="py-12 border-t border-white/5 bg-black text-center text-slate-500 text-sm">
         Note: This is a high-level representation of Uber's architecture based on their public engineering blogs.
      </div>
    </div>
  );
}
