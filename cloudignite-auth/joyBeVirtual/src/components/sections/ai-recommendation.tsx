"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { aiPoweredLocationRecommendation, type AIPoweredLocationRecommendationOutput } from "@/ai/flows/ai-powered-location-recommendation";

export function AIRecommendation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIPoweredLocationRecommendationOutput | null>(null);
  
  const [form, setForm] = useState({
    businessType: "",
    targetRegions: "",
    operationalNeeds: ""
  });

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await aiPoweredLocationRecommendation({
        businessType: form.businessType,
        targetRegions: form.targetRegions.split(",").map(r => r.trim()),
        operationalNeeds: form.operationalNeeds
      });
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai" className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> POWERED BY GEN AI
          </div>
          <h2 className="text-5xl font-headline font-bold text-white">Smart Location Intelligence</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Our AI analyzes your business model and expansion goals to recommend the perfect hub for your next growth phase.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <form onSubmit={handleRecommend} className="glass p-8 rounded-[32px] space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Business Type</label>
              <Input 
                placeholder="e.g. SaaS, D2C, E-commerce" 
                className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                required
                value={form.businessType}
                onChange={e => setForm({...form, businessType: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Target Regions (Comma separated)</label>
              <Input 
                placeholder="e.g. Karnataka, Maharashtra, Delhi NCR" 
                className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                required
                value={form.targetRegions}
                onChange={e => setForm({...form, targetRegions: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Specific Operational Needs</label>
              <Textarea 
                placeholder="e.g. Need GST registration in 48h, client meeting space monthly..." 
                className="bg-white/5 border-white/10 text-white rounded-xl min-h-[100px]"
                required
                value={form.operationalNeeds}
                onChange={e => setForm({...form, operationalNeeds: e.target.value})}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full rounded-xl bg-accent text-white h-12 font-bold hover:bg-accent/90 shadow-xl shadow-accent/20"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Generate Recommendation
            </Button>
          </form>

          <div className="relative">
            {!result && !loading && (
              <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 glass border-dashed rounded-[32px]">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <Sparkles className="text-white/20 w-8 h-8" />
                </div>
                <p className="text-white/40 max-w-[280px]">Fill the form to see AI-powered insights for your business</p>
              </div>
            )}

            {loading && (
              <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 glass rounded-[32px]">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-accent animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-accent animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-accent animate-bounce delay-200" />
                </div>
                <p className="text-white font-medium">BeVirtual AI is thinking...</p>
              </div>
            )}

            {result && (
              <div className="glass p-8 rounded-[32px] space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500 w-5 h-5" /> Recommended Strategy
                </h3>
                
                <div className="space-y-4">
                  {result.recommendedLocations.map((loc, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-accent/50 transition-colors">
                      <div className="font-bold text-white mb-2">{loc.city}</div>
                      <div className="text-xs text-white/40 mb-3">{loc.address}</div>
                      <div className="flex flex-wrap gap-2">
                        {loc.keyBenefits.map((benefit, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/20">{benefit}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Justification</div>
                  <p className="text-sm text-white/70 leading-relaxed italic border-l-2 border-accent pl-4">
                    "{result.justification}"
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Essential Services</div>
                  <div className="flex flex-wrap gap-2">
                    {result.associatedServices.map((service, i) => (
                      <span key={i} className="text-[11px] font-medium text-white/90 bg-white/10 px-3 py-1 rounded-full">{service}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}