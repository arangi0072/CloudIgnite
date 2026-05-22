import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, HardDrive, Zap, Network, Activity, Server, Clock } from 'lucide-react';

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(2) + 'K';
  return num.toFixed(0);
}

function formatBytes(bytes: number): string {
  if (bytes >= 1e15) return (bytes / 1e15).toFixed(2) + ' PB';
  if (bytes >= 1e12) return (bytes / 1e12).toFixed(2) + ' TB';
  if (bytes >= 1e9) return (bytes / 1e9).toFixed(2) + ' GB';
  if (bytes >= 1e6) return (bytes / 1e6).toFixed(2) + ' MB';
  if (bytes >= 1e3) return (bytes / 1e3).toFixed(2) + ' KB';
  return bytes.toFixed(0) + ' B';
}

function formatBandwidth(bytesPerSec: number): string {
  return formatBytes(bytesPerSec) + '/s';
}

export function CapacityCalculator() {
  const [dau, setDau] = useState<number>(10); // Millions
  const [reads, setReads] = useState<number>(30); // per user per day
  const [writes, setWrites] = useState<number>(5); // per user per day
  const [avgPayload, setAvgPayload] = useState<number>(5); // KB

  const metrics = useMemo(() => {
    const rawDau = dau * 1_000_000;
    
    // QPS
    const readRps = (rawDau * reads) / 86400;
    const writeRps = (rawDau * writes) / 86400;
    const totalRps = readRps + writeRps;
    const peakRps = totalRps * 2; // Assuming peak is 2x average
    
    // Bandwidth
    const bytesPerPayload = avgPayload * 1024;
    const readBandwidth = readRps * bytesPerPayload;
    const writeBandwidth = writeRps * bytesPerPayload;
    
    // Storage
    const dailyStorage = rawDau * writes * bytesPerPayload;
    const yearStorage = dailyStorage * 365;
    const fiveYearStorage = yearStorage * 5;

    return {
      readRps, writeRps, totalRps, peakRps,
      readBandwidth, writeBandwidth,
      dailyStorage, yearStorage, fiveYearStorage
    };
  }, [dau, reads, writes, avgPayload]);

  return (
    <section className="py-24 relative bg-[#03060E] border-y border-white/5 overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Controls */}
          <div className="w-full lg:w-5/12">
            <div className="flex items-center gap-3 mb-4">
               <span className="w-8 h-1 bg-indigo-500 rounded-full" />
               <h3 className="text-indigo-400 font-mono text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
                 <Calculator className="w-4 h-4" /> Interactive Tool
               </h3>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 leading-tight">
              CAPACITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">ESTIMATOR</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12">
              Back-of-the-envelope calculations are critical in system design interviews. Adjust the metrics below to instantly see how scale impacts infrastructure requirements.
            </p>

            <div className="space-y-8 bg-[#070b16] border border-white/10 p-8 rounded-2xl shadow-xl">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-300">Daily Active Users (DAU)</label>
                  <span className="text-indigo-400 font-mono font-bold bg-indigo-500/10 px-3 py-1 rounded border border-indigo-500/20">
                    {dau} Million
                  </span>
                </div>
                <input 
                  type="range" min="1" max="500" value={dau} onChange={(e) => setDau(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-300">Reads per User / Day</label>
                  <span className="text-cyan-400 font-mono font-bold bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
                    {reads}
                  </span>
                </div>
                <input 
                  type="range" min="1" max="200" value={reads} onChange={(e) => setReads(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-300">Writes per User / Day</label>
                  <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
                    {writes}
                  </span>
                </div>
                <input 
                  type="range" min="1" max="100" value={writes} onChange={(e) => setWrites(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-300">Avg. Payload Size</label>
                  <span className="text-orange-400 font-mono font-bold bg-orange-500/10 px-3 py-1 rounded border border-orange-500/20">
                    {avgPayload} KB
                  </span>
                </div>
                <input 
                  type="range" min="1" max="1024" value={avgPayload} onChange={(e) => setAvgPayload(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Results Grid */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Traffic Card */}
             <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
               <div className="flex items-start gap-4 mb-8">
                 <div className="p-3 bg-cyan-500/10 rounded-xl">
                   <Activity className="w-6 h-6 text-cyan-400" />
                 </div>
                 <div>
                   <h4 className="text-white font-bold text-lg leading-tight">Traffic (QPS)</h4>
                   <p className="text-slate-500 text-[11px] font-mono uppercase tracking-wider">Queries Per Second</p>
                 </div>
               </div>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm">Avg Load</span>
                    <span className="text-2xl font-mono text-white font-semibold">{formatNumber(metrics.totalRps)}/s</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm">Peak Load (2x)</span>
                    <span className="text-2xl font-mono text-cyan-400 font-semibold">{formatNumber(metrics.peakRps)}/s</span>
                  </div>
                  <div className="h-px w-full bg-white/10 my-2" />
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>Reads: {formatNumber(metrics.readRps)}/s</span>
                    <span>Writes: {formatNumber(metrics.writeRps)}/s</span>
                  </div>
               </div>
             </div>

             {/* Network Bandwidth */}
             <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-fuchsia-500/50 transition-colors">
               <div className="flex items-start gap-4 mb-8">
                 <div className="p-3 bg-fuchsia-500/10 rounded-xl">
                   <Network className="w-6 h-6 text-fuchsia-400" />
                 </div>
                 <div>
                   <h4 className="text-white font-bold text-lg leading-tight">Network</h4>
                   <p className="text-slate-500 text-[11px] font-mono uppercase tracking-wider">Bandwidth Needs</p>
                 </div>
               </div>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm">Ingress (Write)</span>
                    <span className="text-2xl font-mono text-white font-semibold">{formatBandwidth(metrics.writeBandwidth)}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm">Egress (Read)</span>
                    <span className="text-2xl font-mono text-fuchsia-400 font-semibold">{formatBandwidth(metrics.readBandwidth)}</span>
                  </div>
                  <div className="h-px w-full bg-white/10 my-2" />
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>Total: {formatBandwidth(metrics.writeBandwidth + metrics.readBandwidth)}</span>
                  </div>
               </div>
             </div>

             {/* Storage Card */}
             <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors md:col-span-2">
               <div className="flex items-start gap-4 mb-8">
                 <div className="p-3 bg-emerald-500/10 rounded-xl">
                   <HardDrive className="w-6 h-6 text-emerald-400" />
                 </div>
                 <div>
                   <h4 className="text-white font-bold text-lg leading-tight">Database Storage</h4>
                   <p className="text-slate-500 text-[11px] font-mono uppercase tracking-wider">Storage Capacity Planning</p>
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 distribute-items">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="text-slate-400 text-sm mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> 1 Day</div>
                    <div className="text-3xl font-mono text-white font-bold">{formatBytes(metrics.dailyStorage)}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="text-slate-400 text-sm mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> 1 Year</div>
                    <div className="text-3xl font-mono text-white font-bold">{formatBytes(metrics.yearStorage)}</div>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                    <div className="text-emerald-400/80 text-sm mb-2 flex items-center gap-2"><Server className="w-4 h-4"/> 5 Years</div>
                    <div className="text-3xl font-mono text-emerald-400 font-bold">{formatBytes(metrics.fiveYearStorage)}</div>
                  </div>
               </div>
             </div>

          </div>
        </div>
      </div>
    </section>
  );
}
