import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative pt-24 pb-12 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 rounded-t-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                 <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
               </div>
               <span className="text-xl font-bold tracking-tighter uppercase">CloudIgnite <span className="text-cyan-400">Learn</span></span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
               The futuristic knowledge platform for software engineers. Visualizing architecture, mapping systems, and explaining the tech that runs the world.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
             <h4 className="text-[10px] font-bold tracking-widest text-slate-500 mb-6 uppercase">Platform</h4>
             <ul className="space-y-4 text-slate-300 text-sm font-medium">
               <li><a href="#" className="hover:text-cyan-400 transition-colors">Tech Graph</a></li>
               <li><a href="#" className="hover:text-cyan-400 transition-colors">Architecture Maps</a></li>
               <li><a href="#" className="hover:text-cyan-400 transition-colors">AI Generator</a></li>
               <li><a href="#" className="hover:text-cyan-400 transition-colors">Intelligence Feed</a></li>
             </ul>
          </div>
          
          <div>
             <h4 className="text-[10px] font-bold tracking-widest text-slate-500 mb-6 uppercase">Resources</h4>
             <ul className="space-y-4 text-slate-300 text-sm font-medium">
               <li><a href="#" className="hover:text-cyan-400 transition-colors">API Docs</a></li>
               <li><a href="#" className="hover:text-cyan-400 transition-colors">System Design Primer</a></li>
               <li><a href="#" className="hover:text-cyan-400 transition-colors">Open Source</a></li>
               <li><a href="#" className="hover:text-cyan-400 transition-colors">Roadmap</a></li>
             </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-[10px] uppercase font-bold tracking-widest text-slate-500">
           <p>© {new Date().getFullYear()} CloudIgnite Learn. Systems Operating Normally.</p>
           <div className="flex items-center gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
             <a href="#" className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_currentColor] animate-pulse" /> Status: All Systems Operational</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
