import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        securityLevel: 'loose',
      });
      
      const renderChart = async () => {
        try {
          // Generate a unique ID for the chart
          const id = `mermaid-${Math.random().toString(36).substring(2)}`;
          const { svg } = await mermaid.render(id, chart);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid render error:', error);
          if (ref.current) {
            ref.current.innerHTML = `<div className="text-red-400 p-4 border border-red-500/30 rounded-lg bg-red-500/10">Failed to render diagram</div>`;
          }
        }
      };

      renderChart();
    }
  }, [chart]);

  return (
    <div className="my-8 flex justify-center bg-slate-900/50 p-6 rounded-xl border border-slate-800 overflow-x-auto">
      <div ref={ref} className="w-full flex justify-center" />
    </div>
  );
}
