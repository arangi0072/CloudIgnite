import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2, Terminal, Cpu, Activity, ShieldCheck, Hash, Code, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AiTutorTerminalProps {
  topicTitle: string;
  topicContent: string;
}

const QUICK_COMMANDS = [
  { cmd: '/explain_simply', desc: 'Break down into simpler terms' },
  { cmd: '/interview_prep', desc: 'Generate 3 potential interview questions' },
  { cmd: '/find_bottlenecks', desc: 'Analyze failure points in this design' },
  { cmd: '/code_example', desc: 'Show a relevant code snippet if applicable' },
];

// ─── Strip outer wrapper ──────────────────────────────────────────────────────
// Gemini sometimes wraps the ENTIRE response in ```console or ```bash.
// If the whole response is one fenced block, unwrap it so markdown renders.
function unwrapOuterCodeFence(raw: string): string {
  const trimmed = raw.trim();
  // Match ```<lang>\n...\n``` where the closing ``` is at the very end
  const match = trimmed.match(/^```[a-zA-Z_\-]*\n([\s\S]*)\n```$/);
  if (match) return match[1].trim();
  return raw;
}

// ─── Inline Markdown Parser ───────────────────────────────────────────────────

function InlineText({ text }: { text: string }) {
  const tokens = text.split(
    /(\*\*\*[^*]+?\*\*\*|\*\*[^*]+?\*\*|__[^_]+?__|~~[^~]+?~~|\*[^*\n]+?\*|_[^_\n]+?_|`[^`]+?`|\[[^\]]+\]\([^)]+\))/g
  );

  return (
    <>
      {tokens.map((tok, i) => {
        if (tok.startsWith('***') && tok.endsWith('***'))
          return <strong key={i} className="font-bold italic text-white">{tok.slice(3, -3)}</strong>;

        if ((tok.startsWith('**') && tok.endsWith('**')) || (tok.startsWith('__') && tok.endsWith('__')))
          return <strong key={i} className="font-bold text-white">{tok.slice(2, -2)}</strong>;

        if (tok.startsWith('~~') && tok.endsWith('~~'))
          return <del key={i} className="line-through text-[#666]">{tok.slice(2, -2)}</del>;

        if ((tok.startsWith('*') && tok.endsWith('*') && tok.length > 2) ||
          (tok.startsWith('_') && tok.endsWith('_') && tok.length > 2))
          return <em key={i} className="italic text-blue-300">{tok.slice(1, -1)}</em>;

        if (tok.startsWith('`') && tok.endsWith('`') && tok.length > 2)
          return (
            <code key={i} className="bg-[#1e1e1e] border border-[#2a2a2a] text-emerald-300 px-1.5 py-0.5 rounded text-[0.82em] font-mono">
              {tok.slice(1, -1)}
            </code>
          );

        const linkMatch = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch)
          return (
            <a key={i} href={linkMatch[2]} target="_blank" rel="noreferrer"
              className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors">
              {linkMatch[1]}
            </a>
          );

        return <span key={i}>{tok}</span>;
      })}
    </>
  );
}

// ─── Block Markdown Renderer ──────────────────────────────────────────────────

function MarkdownRenderer({ text }: { text: string }) {
  // Always strip outer code fence first
  const cleaned = unwrapOuterCodeFence(text);
  const lines = cleaned.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trim = line.trim();

    // ── Fenced code block ────────────────────────────────────────────────────
    if (trim.startsWith('```')) {
      const lang = trim.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      blocks.push(
        <div key={key++} className="my-3 rounded-lg overflow-hidden border border-[#2a2a2a] shadow-lg">
          {lang && (
            <div className="bg-[#111] border-b border-[#2a2a2a] px-4 py-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500/60 inline-block" />
              <span className="text-[10px] text-[#555] uppercase tracking-widest font-bold">{lang}</span>
            </div>
          )}
          <pre className="bg-[#0d0d0d] p-4 overflow-x-auto">
            <code className="text-emerald-300 text-[12px] font-mono leading-relaxed whitespace-pre">
              {codeLines.join('\n')}
            </code>
          </pre>
        </div>
      );
      continue;
    }

    // ── Horizontal rule ──────────────────────────────────────────────────────
    if (/^[-*_]{3,}$/.test(trim)) {
      blocks.push(<hr key={key++} className="border-[#2a2a2a] my-4" />);
      i++;
      continue;
    }

    // ── Blockquote ───────────────────────────────────────────────────────────
    if (trim.startsWith('> ')) {
      const qLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        qLines.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="border-l-2 border-emerald-500/40 pl-4 my-3 italic text-[#888] text-[13px] leading-relaxed space-y-1">
          {qLines.map((q, qi) => <p key={qi}><InlineText text={q} /></p>)}
        </blockquote>
      );
      continue;
    }

    // ── Table ────────────────────────────────────────────────────────────────
    if (trim.startsWith('|') && trim.endsWith('|')) {
      const allRows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        const cells = lines[i].trim().slice(1, -1).split('|').map(c => c.trim());
        if (!cells.every(c => /^[-: ]+$/.test(c))) allRows.push(cells);
        i++;
      }
      if (allRows.length > 0) {
        const [header, ...rows] = allRows;
        blocks.push(
          <div key={key++} className="my-4 overflow-x-auto rounded-lg border border-[#2a2a2a]">
            <table className="w-full text-[12px] border-collapse">
              <thead>
                <tr>
                  {header.map((h, hi) => (
                    <th key={hi} className="bg-[#111] px-3 py-2 text-left text-emerald-400 font-bold border-b border-[#2a2a2a]">
                      <InlineText text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#050505]'}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-[#d0d0d0] border-b border-[#1a1a1a]">
                        <InlineText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // ── Headers (startsWith so emoji & special chars never break it) ─────────
    if (trim.startsWith('#### ')) {
      blocks.push(
        <h4 key={key++} className="text-[#93c5fd] font-bold text-[11px] mt-3 mb-1 uppercase tracking-widest">
          <InlineText text={trim.slice(5)} />
        </h4>
      );
      i++; continue;
    }
    if (trim.startsWith('### ')) {
      blocks.push(
        <h3 key={key++} className="text-blue-400 font-bold text-[13px] mt-4 mb-1.5 flex items-center gap-1.5">
          <span className="text-emerald-500/40 text-[10px] font-mono select-none">###</span>
          <InlineText text={trim.slice(4)} />
        </h3>
      );
      i++; continue;
    }
    if (trim.startsWith('## ')) {
      blocks.push(
        <h2 key={key++} className="text-blue-400 font-bold text-sm mt-5 mb-2 border-b border-[#1e1e1e] pb-1">
          <InlineText text={trim.slice(3)} />
        </h2>
      );
      i++; continue;
    }
    if (trim.startsWith('# ')) {
      blocks.push(
        <h1 key={key++} className="text-blue-300 font-bold text-base mt-5 mb-2 border-b border-[#2a2a2a] pb-1">
          <InlineText text={trim.slice(2)} />
        </h1>
      );
      i++; continue;
    }

    // ── Unordered list ────────────────────────────────────────────────────────
    if (/^\s*[-*+] /.test(line)) {
      const items: Array<{ text: string; depth: number }> = [];
      while (i < lines.length && /^\s*[-*+] /.test(lines[i])) {
        const depth = lines[i].match(/^(\s*)/)![1].length;
        const text = lines[i].trim().replace(/^[-*+] /, '');
        items.push({ text, depth });
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-2 text-[#e2e8f0] text-[13px] leading-relaxed space-y-1">
          {items.map((item, ii) => (
            <li key={ii} style={{ paddingLeft: `${item.depth * 16 + 14}px` }} className="relative">
              <span className="absolute text-emerald-500/60 select-none" style={{ left: `${item.depth * 16 + 2}px` }}>•</span>
              <InlineText text={item.text} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // ── Ordered list ──────────────────────────────────────────────────────────
    if (/^\s*\d+[.)]\s/.test(line)) {
      const items: Array<{ text: string; num: number; depth: number }> = [];
      while (i < lines.length && /^\s*\d+[.)]\s/.test(lines[i])) {
        const depth = lines[i].match(/^(\s*)/)![1].length;
        const numMatch = lines[i].trim().match(/^(\d+)[.)]\s(.*)$/);
        items.push({
          text: numMatch ? numMatch[2] : lines[i].trim(),
          num: numMatch ? parseInt(numMatch[1]) : items.length + 1,
          depth,
        });
        i++;
      }
      blocks.push(
        <ol key={key++} className="my-2 text-[#e2e8f0] text-[13px] leading-relaxed space-y-1">
          {items.map((item, ii) => (
            <li key={ii} style={{ paddingLeft: `${item.depth * 16 + 22}px` }} className="relative">
              <span className="absolute text-emerald-400/70 font-mono text-[11px] tabular-nums"
                style={{ left: `${item.depth * 16}px` }}>
                {item.num}.
              </span>
              <InlineText text={item.text} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // ── Blank line ────────────────────────────────────────────────────────────
    if (!trim) {
      blocks.push(<div key={key++} className="h-2" />);
      i++;
      continue;
    }

    // ── Paragraph — greedily collect consecutive plain lines ──────────────────
    const paraLines: string[] = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (
        !t ||
        t.startsWith('```') ||
        t.startsWith('#') ||
        t.startsWith('> ') ||
        /^[-*_]{3,}$/.test(t) ||
        /^\s*[-*+] /.test(lines[i]) ||
        /^\s*\d+[.)]\s/.test(lines[i]) ||
        (t.startsWith('|') && t.endsWith('|'))
      ) break;
      paraLines.push(t);
      i++;
    }

    if (paraLines.length > 0) {
      blocks.push(
        <p key={key++} className="text-[#e2e8f0] leading-relaxed text-[13px] my-0.5">
          <InlineText text={paraLines.join(' ')} />
        </p>
      );
    } else {
      i++; // safety fallback
    }
  }

  return <div className="space-y-0">{blocks}</div>;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AiTutorTerminal({ topicTitle, topicContent }: AiTutorTerminalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uptime, setUptime] = useState(0);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) { hasMountedRef.current = true; return; }
    const el = terminalBodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const t = setInterval(() => setUptime(u => u + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatUptime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleSend = async (overrideInput?: string) => {
    const userMsg = (overrideInput || input).trim();
    if (!userMsg) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const gApiKey = process.env.GEMINI_API_KEY;
      if (!gApiKey) {
        setMessages(prev => [...prev, {
          role: 'model',
          text: '**FATAL EXCEPTION:** `GEMINI_API_KEY` is undefined. System halted.',
        }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: gApiKey });

      // KEY FIX in system prompt: explicitly forbid wrapping in a top-level code block
      const systemInstruction = `You are "Arch-OS", a highly advanced, snarky but brilliant engineering AI embedded in a systems design console.
The user is viewing the module: ${topicTitle}.
Context parameters:
${topicContent}

CRITICAL FORMATTING RULES — follow exactly:
- NEVER wrap your entire response inside a \`\`\`console, \`\`\`bash, or any other top-level code fence. Output plain Markdown directly.
- Use ### for section headers, **bold** for emphasis, \`inline code\` for terms, and \`\`\` fenced blocks ONLY for actual code snippets.
- Use numbered lists (1. 2. 3.) and bullet lists (- item) for structured content.
- Keep it snarky, precise, and dense with information.
- If they use /explain_simply → use plain language and analogies.
- If they use /interview_prep → give 3 Q&As with answers.
- If they use /find_bottlenecks → analyze failure points.
- If they use /code_example → show a working, commented code snippet inside a proper \`\`\` block.`;

      const history = messages
        .map(m => `${m.role === 'user' ? 'GUEST_USER' : 'ARCH_OS'}: ${m.text}`)
        .join('\n');
      const nextContent = history
        ? `${history}\nGUEST_USER: ${userMsg}`
        : `GUEST_USER: ${userMsg}`;

      const response = await ai.models.generateContent({
        model: "gemma-4-26b-a4b-it",
        contents: nextContent,
        config: { systemInstruction, temperature: 0.7 },
      });

      if (response.text) {
        setMessages(prev => [...prev, { role: 'model', text: response.text ?? '' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'model',
        text: '**NETWORK_ERR:** Uplink severed. Cannot reach neural core.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="w-full mt-24 mb-16 relative">
      <div className="rounded-xl overflow-hidden bg-[#0a0a0a] border border-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-[700px] font-mono">

        {/* ── Top Bar ──────────────────────────────────────────────────────── */}
        <div className="bg-[#111111] border-b border-[#2a2a2a] px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-500/50" />
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#666666]">
              <Terminal className="w-3.5 h-3.5" />
              <span>root@arch-os:~/{topicTitle.toLowerCase().replace(/\s+/g, '-')}</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-[10px] text-[#555555]">
            <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-emerald-500" /> SYS_NORM</span>
            <span className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-blue-500" /> 12% USAGE</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-purple-500" /> SECURE</span>
            <span className="font-mono">UP: {formatUptime(uptime)}</span>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar */}
          <div className="hidden md:flex w-64 bg-[#0d0d0d] border-r border-[#2a2a2a] flex-col p-4">
            <div className="mb-6">
              <div className="text-[10px] font-bold text-[#555555] uppercase tracking-widest mb-3">Active Context</div>
              <div className="flex items-start gap-2 text-sm text-[#e0e0e0]">
                <Hash className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="leading-tight">{topicTitle}</span>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-[10px] font-bold text-[#555555] uppercase tracking-widest mb-3">Available Commands</div>
              <div className="space-y-2">
                {QUICK_COMMANDS.map((cmd, idx) => (
                  <button key={idx} onClick={() => handleSend(cmd.cmd)} className="w-full text-left group">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#888888] group-hover:text-emerald-400 transition-colors">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {cmd.cmd}
                    </div>
                    <div className="text-[10px] text-[#444444] pl-5 mt-0.5 group-hover:text-[#666]">{cmd.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-[10px] text-[#444] py-2 border-t border-[#2a2a2a] flex flex-col gap-1">
                <div>Arch-OS Kernel v4.2.0</div>
                <div>Neural Engine Connected</div>
              </div>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-1 flex flex-col bg-[#050505] relative shadow-inner min-w-0">
            <div
              ref={terminalBodyRef}
              className="flex-1 overflow-y-auto p-6"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}
            >
              {messages.length === 0 ? (
                <div className="text-[#a0a0a0] max-w-2xl text-sm">
                  <div className="text-emerald-500 mb-4 font-bold flex items-center gap-2">
                    <Code className="w-5 h-5" /> ARCH-OS INITIALIZED
                  </div>
                  <p className="mb-2">
                    System booted successfully. Module{' '}
                    <span className="text-blue-400">'{topicTitle}'</span> loaded into memory.
                  </p>
                  <p className="mb-6">
                    I am your architectural copilot. Use the command sidebar or type natural language queries below to begin system analysis.
                  </p>
                  <div className="hidden md:block">
                    <div className="text-[#555] text-xs mb-2">--- Quick Help ---</div>
                    <ul className="text-xs space-y-1 text-[#777] list-disc list-inside">
                      <li>Type <span className="text-[#999]">any technical question</span> regarding the current architecture.</li>
                      <li>Click the quick commands on the left for standard operations.</li>
                      <li>
                        Use <kbd className="bg-[#222] px-1 py-0.5 rounded border border-[#333]">Enter</kbd> to submit,{' '}
                        <kbd className="bg-[#222] px-1 py-0.5 rounded border border-[#333]">Shift + Enter</kbd> for newline.
                      </li>
                    </ul>
                  </div>
                  <div className="md:hidden mt-8">
                    <div className="text-[#555] text-xs mb-3 uppercase tracking-wider">Available Commands</div>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_COMMANDS.map(c => (
                        <button key={c.cmd} onClick={() => handleSend(c.cmd)}
                          className="px-3 py-1.5 bg-[#1a1a1a] border border-[#333] hover:border-emerald-500/50 hover:bg-[#222] text-emerald-400/80 rounded flex items-center gap-1.5 text-xs transition-colors">
                          <ChevronRight className="w-3 h-3" /> {c.cmd}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pb-4">
                  {messages.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`text-[10px] mb-1 font-bold tracking-widest uppercase ${m.role === 'user' ? 'text-blue-500' : 'text-emerald-500'}`}>
                        {m.role === 'user' ? 'guest_user' : 'arch_os'}
                      </div>
                      <div className={`max-w-[90%] md:max-w-[80%] min-w-0 ${m.role === 'user' ? 'text-[#cccccc]' : 'text-[#e2e8f0]'}`}>
                        {m.role === 'user' ? (
                          <div className="bg-[#111111] border border-[#2a2a2a] px-4 py-2 rounded-lg text-[13px] font-sans break-words whitespace-pre-wrap">
                            {m.text}
                          </div>
                        ) : (
                          <div className="font-sans">
                            <MarkdownRenderer text={m.text} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start mt-4">
                      <div className="text-emerald-500 text-[10px] mb-1 font-bold tracking-widest uppercase">arch_os</div>
                      <div className="flex items-center gap-3 text-[#666666] text-sm font-mono mt-1">
                        <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />
                        <span className="animate-pulse">processing_query...</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* ── Input ─────────────────────────────────────────────────────── */}
            <div className="p-4 bg-[#0a0a0a] border-t border-[#2a2a2a] flex items-center gap-3 w-full">
              <span className="text-emerald-500 font-bold ml-2 animate-pulse">&gt;</span>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Execute command or ask question..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-[#e0e0e0] placeholder-[#444] font-mono text-[13px] resize-none h-6 outline-none py-0.5 leading-relaxed"
                rows={1}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-2 text-[#666] hover:text-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Send command"
              >
                <div className="border border-current rounded p-1">
                  <Send className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}