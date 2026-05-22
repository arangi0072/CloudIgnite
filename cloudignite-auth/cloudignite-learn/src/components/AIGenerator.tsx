import { motion } from 'motion/react';
import { Cpu, Terminal, Sparkles, CheckCircle2, Server, Database, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Mermaid } from './Mermaid';
import { AiTutorTerminal } from './AiTutorTerminal';

interface TechItem {
  name: string;
  desc: string;
}

interface GeneratedData {
  mermaid: string;
  techStack: TechItem[];
  insight: string;
  bottlenecks: string[];
}

export function AIGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('Build scalable realtime chat application');
  const [data, setData] = useState<GeneratedData | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key missing');
      }

      const ai = new GoogleGenAI({ apiKey });
      const promptText = `
        You are an expert system design architect.
        A user asked to build: "${prompt}"
        
        Provide a JSON object with strictly these fields:
        "mermaid": A valid mermaid.js diagram string (flowchart TD or LR) representing the architecture. DO NOT wrap with \`\`\`mermaid just provide the raw mermaid code. Make it detailed (5-8 nodes). No markdown wrappers.
        "techStack": An array of exactly 4 objects simulating the stack, each with a "name" (e.g. "PostgreSQL") and a "desc" (e.g. "Primary datastore for ACID guarantees").
        "insight": A powerful, 2-sentence paragraph providing a critical scaling insight.
        "bottlenecks": An array of 3 critical scaling challenges or specific bottlenecks to watch out for.
        
        ONLY output valid JSON. No markdown wrappers.
      `;

      const response = await ai.models.generateContent({
        model: "gemma-4-26b-a4b-it",
        contents: promptText,
      });

      let responseText = response.text || '';
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

      const parsedData = JSON.parse(responseText) as GeneratedData;
      setData(parsedData);

    } catch (err) {
      console.error(err);
      // Fallback
      setData({
        mermaid: "flowchart LR\nClient-->API\nAPI-->Database",
        techStack: [
          { name: "React", desc: "Client side UI" },
          { name: "Node.js", desc: "API Gateway" },
          { name: "PostgreSQL", desc: "Relational data" },
          { name: "Redis", desc: "Caching layer" }
        ],
        insight: "Failed to generate AI response. Pls check API key or prompt.",
        bottlenecks: ["Database locks", "API rate limiting", "Network latency"]
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">

          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-[10px] tracking-widest uppercase mb-4 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              AI Architecture Blueprint
            </div>
            <h2 className="text-[40px] md:text-[50px] font-display font-black mb-6 leading-[0.9] tracking-tight">DESCRIBE IT. <span className="text-cyan-400">BUILD IT.</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Generate production-ready architecture diagrams, stack recommendations, and scaling strategies instantly from natural language.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-2 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Command Line Input */}
            <div className="bg-[#02040a] border border-white/5 rounded-2xl p-6 lg:p-8 relative z-10">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 focus-within:border-cyan-500/50 focus-within:bg-white/10 transition-all shadow-inner">
                  <Terminal className="w-6 h-6 text-cyan-500" />
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    className="w-full bg-transparent border-none outline-none text-slate-100 font-bold"
                    placeholder="Describe your system (e.g., 'Scale Uber dispatch system')..."
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full lg:w-auto relative group overflow-hidden bg-white text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-80 disabled:hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      GENERATING
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" /> GENERATE
                    </span>
                  )}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                </button>
              </div>

              {/* Simulated Output Area */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className={`transition-all duration-1000 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
                  {!data ? (
                    <div className="bg-[#02040a] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-grid-white opacity-[0.2]" />
                      <h4 className="text-[10px] text-slate-400 mb-6 flex items-center gap-2 font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-slate-500" /> Awaiting Input
                      </h4>
                      <div className="relative h-48 flex items-center justify-between px-8">
                        <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center relative z-10 opacity-50">
                          Client
                        </div>
                        <div className="flex-1 h-px bg-slate-700 relative opacity-50" />
                        <div className="w-20 h-24 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-col gap-2 relative z-10 opacity-50">
                          <Server className="w-6 h-6 text-slate-500" />
                          <span className="text-[10px] font-mono">Gateway</span>
                        </div>
                        <div className="flex-1 h-px bg-slate-700 relative opacity-50" />
                        <div className="flex flex-col gap-4 relative z-10 opacity-50">
                          <div className="w-20 h-16 rounded-xl bg-slate-800 border-l border-b border-slate-700 flex items-center justify-center flex-col gap-1">
                            <Database className="w-4 h-4 text-slate-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-[#02040a] border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden group shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                        <div className="absolute inset-0 bg-grid-white opacity-[0.1]" />
                        <div className="absolute top-0 right-0 p-4">
                          <div className="text-[10px] font-bold text-cyan-500 bg-cyan-950/50 px-2 py-1 rounded tracking-widest uppercase flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> ARCHITECTURE GENERATED</div>
                        </div>

                        <h4 className="text-[10px] text-slate-400 mb-8 flex items-center gap-2 font-bold uppercase tracking-widest relative z-10">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" /> Visual Blueprint
                        </h4>

                        <div className="relative z-10 flex justify-center items-center overflow-x-auto min-h-[300px] bg-black/40 rounded-lg border border-white/5 p-4">
                          <Mermaid chart={data.mermaid} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#02040a] border border-white/5 rounded-xl p-6 shadow-inner">
                          <h4 className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2"><Server className="w-4 h-4 text-cyan-400" /> Recommended Stack</h4>
                          <ul className="space-y-4">
                            {data.techStack.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                                <div>
                                  <div className="text-sm text-slate-200 font-bold">{item.name}</div>
                                  <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-6 flex flex-col">
                          <div className="bg-[#02040a] border border-white/5 rounded-xl p-6 border-l-2 border-l-cyan-500 shadow-inner">
                            <h4 className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2"><Sparkles className="w-4 h-4 text-cyan-400" /> Key Architect Insight</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {data.insight}
                            </p>
                          </div>

                          <div className="bg-[#02040a] border border-white/5 rounded-xl p-6 border-l-2 border-l-orange-500 shadow-inner flex-1">
                            <h4 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-400" /> Critical Bottlenecks</h4>
                            <ul className="space-y-2">
                              {data.bottlenecks.map((btn, idx) => (
                                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                                  <span className="text-orange-500/50 mt-0.5">•</span> <span>{btn}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Render AiTutorTerminal below if we have data to ask follow up questions */}
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mt-8">
                <h3 className="text-center text-slate-500 text-xs font-bold tracking-widest uppercase mb-4">Deep Dive & Follow-Up Questions</h3>
                <AiTutorTerminal
                  topicTitle={`Custom Architecture: ${prompt}`}
                  topicContent={`
                      Architecture Diagram (Mermaid):
                      ${data.mermaid}
                      
                      Stack:
                      ${data.techStack.map(t => `- ${t.name}: ${t.desc}`).join('\n')}
                      
                      Insight: ${data.insight}
                      
                      Bottlenecks:
                      ${data.bottlenecks.map(b => `- ${b}`).join('\n')}
                    `}
                />
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
