import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import {
  MessageSquare, Mic, Smartphone, Server, Database, Activity, GitBranch, Layers, 
  Terminal, Shield, Cpu, Code, ArrowLeft, RefreshCcw, Network, Zap, 
  Users, Plus, Minus, Maximize, ArrowRight, Bot, BarChart, Clock, AlertTriangle, PlayCircle
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

const DISCORD_NODES: NodeData[] = [
  { id: 'client', label: 'Discord Client', type: 'client', icon: Smartphone, desc: 'React Native / Desktop', color: 'text-white', stats: [{label: 'Active Users', value: '150M+', color: 'text-indigo-400'}, {label: 'WebSocket', value: 'Persistent', color: 'text-blue-400'}] },
  { id: 'gateway', label: 'WebSocket Gateway', type: 'gw', icon: Layers, desc: 'Maintains long-lived connections', color: 'text-indigo-400', stats: [{label: 'Connections', value: 'Millions', color: 'text-indigo-400'}, {label: 'Language', value: 'Elixir', color: 'text-purple-400'}] },
  { id: 'guild', label: 'Guild Servers', type: 'service', icon: Users, desc: 'Erlang processes per Server', color: 'text-purple-400', stats: [{label: 'Concurrency', value: 'Massive', color: 'text-purple-400'}, {label: 'Process', value: 'BEAM', color: 'text-rose-400'}] },
  { id: 'presence', label: 'Presence Service', type: 'service', icon: Zap, desc: 'Tracks online/offline state', color: 'text-yellow-400', stats: [{label: 'Updates/sec', value: 'Millions', color: 'text-yellow-400'}, {label: 'Latency', value: 'Sub-ms', color: 'text-emerald-400'}] },
  { id: 'voice', label: 'Voice SFU', type: 'service', icon: Mic, desc: 'Selective Forwarding Unit', color: 'text-emerald-400', stats: [{label: 'Protocol', value: 'WebRTC', color: 'text-emerald-400'}, {label: 'Routing', value: 'C++', color: 'text-blue-400'}] },
  { id: 'api', label: 'HTTP API', type: 'service', icon: Code, desc: 'Stateless REST endpoints', color: 'text-blue-400', stats: [{label: 'Language', value: 'Python/Rust', color: 'text-blue-400'}, {label: 'Requests', value: 'High', color: 'text-cyan-400'}] },
  { id: 'db', label: 'ScyllaDB', type: 'db', icon: Database, desc: 'Stores trillions of messages', color: 'text-rose-400', stats: [{label: 'Messages', value: 'Trillions', color: 'text-rose-400'}, {label: 'Writes', value: 'Fast', color: 'text-orange-400'}] },
  { id: 'rust', label: 'Read States (Rust)', type: 'service', icon: Cpu, desc: 'Fast unread badge calculation', color: 'text-orange-400', stats: [{label: 'Performance', value: 'Max', color: 'text-orange-400'}, {label: 'Memory', value: 'Safe', color: 'text-yellow-400'}] },
];

const DISCORD_LINKS = [
  { source: 'client', target: 'gateway' },
  { source: 'client', target: 'api' },
  { source: 'client', target: 'voice' },
  { source: 'gateway', target: 'guild' },
  { source: 'gateway', target: 'presence' },
  { source: 'api', target: 'guild' },
  { source: 'guild', target: 'db' },
  { source: 'guild', target: 'rust' },
  { source: 'api', target: 'db' },
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

    const simulationNodes: NodeData[] = DISCORD_NODES.map(d => ({ ...d }));
    const simulationLinks: LinkData[] = DISCORD_LINKS.map(d => ({ ...d }));

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
           <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">SYSTEM <span className="text-indigo-400">TOPOLOGY</span></h2>
           <p className="text-slate-400 text-lg">Interactive force-directed graph of Discord's microservice ecosystem.</p>
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
                               <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
                               <stop offset="100%" stopColor="#c084fc" stopOpacity="0.6" />
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
                                     fill="#c084fc"
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
                                      className="absolute -inset-6 border-2 border-indigo-500/30 rounded-full"
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                   />
                                 )}
                                 <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl ${isActiveNode ? 'bg-[#0a0f1a] border-2 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)]' : 'bg-black border border-white/20 hover:border-white/40'}`}>
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
                                       
                                       <div className="mt-4 text-[10px] text-indigo-400 font-bold flex items-center gap-2 uppercase tracking-widest">
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

function DiscordHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
          <div className="absolute top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
       </div>

       <div className="container mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to Architectures
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-16 h-16 rounded-2xl bg-[#5865F2] flex items-center justify-center shadow-[0_0_30px_rgba(88,101,242,0.4)] text-white text-3xl font-black">
                   D
                 </div>
                 <div>
                   <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Real-Time Chat & VoIP</h2>
                   <div className="text-slate-400 text-sm">Case Study #03</div>
                 </div>
               </div>

               <h1 className="text-[50px] md:text-[70px] font-display font-black leading-[0.9] tracking-tight mb-8">
                 DISCORD <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                   ARCHITECTURE
                 </span>
               </h1>

               <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                 Scaling to handle billions of messages per day and millions of concurrent voice connections using Elixir, Rust, and ScyllaDB for uncompromised performance.
               </p>

               <div className="flex flex-wrap gap-4 mt-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                     <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Active Users</div>
                     <div className="text-2xl font-black text-white">150M+ / mo</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                     <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Messages</div>
                     <div className="text-2xl font-black text-indigo-400">Billions / day</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                     <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Tech Debt</div>
                     <div className="text-2xl font-black text-purple-400">Go to Rust</div>
                  </div>
               </div>
            </div>

            <div className="relative hidden lg:block">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent rounded-full blur-[100px]" />
               <pre className="relative bg-[#02040a] rounded-2xl p-6 border border-white/10 text-xs text-indigo-400 font-mono shadow-2xl overflow-x-auto">
                 <code>{`// ELIXIR GUILD PROCESS EXCERPT

defmodule Discord.Guild do
  use GenServer

  # Every Discord server is a single Erlang process
  # enabling massive concurrency and state isolation.
  
  def handle_cast({:new_message, msg}, state) do
    # 1. Update local guild state
    new_state = add_to_timeline(state, msg)
    
    # 2. Fanout to connected WebSocket gateways
    Discord.PubSub.broadcast!(
      "guild_#{state.id}",
      {:message_create, msg}
    )
    
    {:noreply, new_state}
  end
end`}</code>
               </pre>
            </div>
          </div>
       </div>
    </section>
  )
}

function RealtimeMessaging() {
  return (
    <section className="py-24 relative border-b border-white/5 bg-[#02040a]">
       <div className="container mx-auto px-6">
          <div className="mb-16 max-w-3xl">
             <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <MessageSquare className="w-3 h-3" /> Event Driven
             </div>
             <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">THE ELIXIR <span className="text-indigo-400">GATEWAY</span></h2>
             <p className="text-slate-400 text-lg">Discord handles millions of concurrent WebSocket connections using Elixir and the Erlang VM (BEAM).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: Layers, title: 'WebSocket Gateway', desc: 'Maintains long-lived stateful connections with clients. Handles authentication, compression, and basic routing.' },
               { icon: Users, title: 'Guild Servers (BEAM)', desc: 'Every Discord server is mapped to an Erlang process. If a server crashes, it isolated from others.' },
               { icon: Activity, title: 'Presence / PubSub', desc: 'A complex distributed system tracking who is online and fanning out "user typing" or "status changed" events instantly.' }
             ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors relative group">
                   <div className="absolute top-4 right-4 text-white/5 font-black text-4xl group-hover:text-indigo-500/10 transition-colors">0{i+1}</div>
                   <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 text-indigo-400 shadow-xl relative z-10">
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

function ScyllaDBMigration() {
  return (
    <section className="py-24 relative bg-black overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-rose-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.2)]">
              <Database className="w-3 h-3" /> Data Storage
            </div>
            <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none mb-6">MIGRATING TO <span className="text-rose-500">SCYLLADB</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Discord originally stored messages in MongoDB, then Cassandra. Facing JVM garbage collection pauses managing trillions of messages, they migrated to ScyllaDB (a C++ rewrite of Cassandra).
            </p>
            <div className="space-y-4">
              {['Lower Latency', 'No Garbage Collection Pauses', 'Higher Throughput', 'Reduced Node Count', 'Trillions of Messages'].map((input, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="font-bold text-sm">{input}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute -inset-10 bg-gradient-to-tr from-rose-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
             <div className="bg-[#02040a] rounded-3xl border border-white/10 p-8 shadow-2xl relative">
                <div className="flex justify-between items-end mb-8">
                   <div>
                     <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Stored Messages</div>
                     <div className="text-4xl font-black text-rose-500">Trillions</div>
                   </div>
                   <div className="text-right">
                     <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Latency Tail (P99)</div>
                     <div className="font-mono text-sm text-emerald-400">&lt; 15ms</div>
                   </div>
                </div>
                <div className="aspect-video bg-black/50 rounded-xl border border-white/5 relative overflow-hidden flex flex-col justify-center px-6">
                    <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-rose-500 w-[95%]" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-widest border-b border-white/10 pb-2 mb-2">
                        <span>Disk Usage</span>
                        <span>Petabytes</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden relative">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-emerald-400" 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-widest">
                        <span>Write Throughput</span>
                        <span>Massive Scale</span>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RustReadStates() {
  return (
    <section className="py-24 relative bg-black overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <Cpu className="w-3 h-3" /> Performance Critical
          </div>
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight leading-none mb-6">REWRITING IN <span className="text-orange-500">RUST</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Discord migrated their Read States service (which controls notification badges) from Go to Rust to solve GC spikes that were causing high latency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#02040a] rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 text-center">Previous Go Implementation</h3>
                <div className="h-32 mb-4 flex items-end gap-1 px-4">
                    {[1, 1, 1, 5, 2, 1, 8, 1, 1, 2, 6, 1, 1, 1].map((val, i) => (
                        <div key={i} className={`w-full rounded-t-sm ${val > 4 ? 'bg-rose-500' : 'bg-slate-600'}`} style={{ height: `${val * 10}%` }} />
                    ))}
                </div>
                <p className="text-center text-sm text-slate-400">Garbage collection caused CPU spikes and latency latency outliers.</p>
            </div>
            <div className="bg-[#02040a] rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px]" />
                <h3 className="text-xl font-bold mb-4 text-orange-400 text-center relative z-10">New Rust Implementation</h3>
                <div className="h-32 mb-4 flex items-end gap-1 px-4 relative z-10">
                    {[1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1].map((val, i) => (
                        <div key={i} className="w-full bg-orange-400 rounded-t-sm" style={{ height: `${val * 10}%` }} />
                    ))}
                </div>
                <p className="text-center text-sm text-slate-400 relative z-10">Predictable memory management led to smooth, flat latency curves.</p>
            </div>
        </div>
      </div>
    </section>
  )
}

function WebRTCVoice() {
    return (
      <section className="py-24 relative bg-[#02040a] border-b border-white/5">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="md:w-1/3">
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                     <Mic className="w-10 h-10" />
                  </div>
                  <h2 className="text-[30px] font-display font-black tracking-tight leading-none mb-4">VOICE & <span className="text-emerald-500">VIDEO</span></h2>
               </div>
               <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "WebRTC", desc: "Standardization means it runs smoothly in browsers without plugins." },
                    { title: "SFU Architecture", desc: "Selective Forwarding Units receive one stream from you and route it to everyone, rather than P2P mesh." },
                    { title: "Global Regions", desc: "Voice servers are geolocated worldwide to minimize ping and packet loss." },
                    { title: "C++ Routing", desc: "The core media routing is implemented in C++ for maximum network performance." }
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

function InteractiveSystemFlow() {
  const steps = [
    { label: "User Client", desc: "Sends Message", color: "text-white", border: "border-white/20" },
    { label: "API Edge", desc: "Cloudflare/Rate Limits", color: "text-cyan-400", border: "border-cyan-500/30" },
    { label: "Guild Server", desc: "Validates Permissions", color: "text-purple-400", border: "border-purple-500/30" },
    { label: "ScyllaDB", desc: "Stores Message", color: "text-rose-400", border: "border-rose-500/30" },
    { label: "Gateway", desc: "Fanout via PubSub", color: "text-indigo-400", border: "border-indigo-500/30" },
    { label: "Other Clients", desc: "Receive Message", color: "text-emerald-400", border: "border-emerald-500/30" },
  ];

  return (
    <section className="py-24 relative bg-[#02040a] border-b border-white/5">
       <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
             <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-4">SYSTEM <span className="text-indigo-500">FLOW</span></h2>
             <p className="text-slate-400 text-lg max-w-2xl mx-auto">What happens when someone sends a message in a 100k+ user server? The fanout architecture ensures sub-second delivery globally.</p>
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
               { label: "Msg Dispatch Latency", value: "< 10ms", icon: Clock, color: "text-emerald-400" },
               { label: "Concurrent Vocie", value: "Millions", icon: Mic, color: "text-blue-400" },
               { label: "DB Read Tails", value: "< 15ms", icon: Database, color: "text-rose-400" },
               { label: "Active WebSockets", value: "Massive", icon: Layers, color: "text-indigo-400" },
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

function TechStackBreakdown() {
  const techs = [
    { name: "Elixir & Erlang", role: "Gateway & Guilds", pros: "Actor model per server makes presence and fanout incredibly stable." },
    { name: "Rust", role: "Read States", pros: "Replaced Go to solve garbage collection latency spikes." },
    { name: "ScyllaDB", role: "Message Store", pros: "High-performance C++ rewrite of Cassandra, handles trillions of rows." },
    { name: "React Native", role: "Mobile Client", pros: "Shared codebase allowing rapid feature parity with desktop." },
    { name: "Python", role: "API Edge", pros: "Used for standard REST API endpoints and integration services." },
  ];

  return (
    <section className="py-24 relative bg-[#02040a] border-b border-white/5">
       <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-[30px] md:text-[40px] font-display font-black tracking-tight mb-12 text-center">CORE <span className="text-indigo-400">TECHNOLOGIES</span></h2>
          
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
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Why Elixir and the BEAM?</h4>
                     <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Instead of traditional thread-pools, the Erlang VM (BEAM) can spawn millions of lightweight processes. Discord allocates one process per Discord Server (Guild), providing perfect isolation and predictable execution.
                     </p>
                  </div>
                  <div className="bg-[#02040a] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Rust for Performance</h4>
                     <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        When you track unread badges for millions of users across thousands of channels, caching fails footprint limits. Discord wrote custom memory-managed Rust services to keep read-state recalculations lightning-fast.
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
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50" placeholder="e.g. How does Discord voice SFU work?" />
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
    { user: "Alex B.", avatar: "bg-purple-500", role: "Backend Developer", topic: "Is moving from Cassandra to ScyllaDB worth the ops cost?", replies: 120, text: "If you're dealing with JVM garbage collection pauses at massive scale, yes. The C++ rewrite provides incredibly consistent tail latencies." },
    { user: "Chen W.", avatar: "bg-emerald-500", role: "Comm Engineer", topic: "Why SFU instead of P2P mesh for voice?", replies: 56, text: "P2P destroys client bandwidth when you have more than a few users. Sending 1 upstream to a server and receiving N downstreams scales much better for large gaming channels." }
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

export function DiscordArchitecture() {
  useEffect(() => {
    document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-[#02040a] text-slate-100 min-h-screen relative font-sans">
      <DiscordHero />
      <RealtimeMessaging />
      <InteractiveMap />
      <ScyllaDBMigration />
      <RustReadStates />
      <WebRTCVoice />
      <InteractiveSystemFlow />
      <EngineeringMetricsDashboard />
      <TechStackBreakdown />
      <AIInsights />
      <CommunityDiscussions />
      <div className="py-12 border-t border-white/5 bg-black text-center text-slate-500 text-sm">
         Note: This is a high-level representation of Discord's architecture based on their public engineering blogs.
      </div>
    </div>
  );
}
