"use client";

import { Search, MapPin, Building2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

export function LocationsHero() {
  return (
    <section className="pt-20 pb-16 relative overflow-hidden bg-grid">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight mb-6">
            Choose Your Business Address in <br />
            <span className="text-primary">India’s Top Commercial Locations</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
            Register GST or incorporate your company using verified virtual office addresses in major business hubs. Elite presence without the expensive overhead.
          </p>

          <div className="glass p-4 rounded-[24px] shadow-2xl border border-white/10 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <Input 
                placeholder="Search city or state..." 
                className="pl-12 h-14 bg-white/5 border-none rounded-xl focus-visible:ring-primary/20 text-white placeholder:text-white/30"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select>
                <SelectTrigger className="h-14 bg-white/5 border-none rounded-xl w-full md:w-[140px] text-white">
                  <SelectValue placeholder="GST" />
                </SelectTrigger>
                <SelectContent className="glass border-white/10 text-white">
                  <SelectItem value="available">GST Ready</SelectItem>
                  <SelectItem value="not-needed">Non-GST</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-14 bg-white/5 border-none rounded-xl w-full md:w-[140px] text-white">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="glass border-white/10 text-white">
                  <SelectItem value="budget">₹1k - ₹2k</SelectItem>
                  <SelectItem value="mid">₹2k - ₹5k</SelectItem>
                  <SelectItem value="premium">₹5k+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button className="h-14 px-8 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all w-full md:w-auto shadow-lg shadow-primary/20">
              Find Office
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto py-12 border-y border-white/10">
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-xs text-white/40 font-bold uppercase tracking-widest">Cities</div>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="text-3xl font-bold text-white">200+</div>
            <div className="text-xs text-white/40 font-bold uppercase tracking-widest">Addresses</div>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="text-3xl font-bold text-white">10k+</div>
            <div className="text-xs text-white/40 font-bold uppercase tracking-widest">Businesses</div>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="text-3xl font-bold text-white">99.8%</div>
            <div className="text-xs text-white/40 font-bold uppercase tracking-widest">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
