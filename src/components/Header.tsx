import React from 'react';
import { Wifi, Zap, RefreshCw } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-background-dark/80 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex flex-col">
          <h2 className="text-lg lg:text-xl font-bold tracking-tight">System Overview</h2>
        </div>
        
        <div className="flex items-center gap-3 lg:gap-6">
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
              <Wifi className="w-3 h-3" /> Online
            </div>
            <div className="flex items-center gap-1.5 text-primary bg-primary/10 px-2 py-1 rounded-md">
              <Zap className="w-3 h-3" /> Charging
            </div>
          </div>
          
          <button className="flex items-center justify-center p-2 rounded-lg bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
            <RefreshCw className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
            <img 
              className="rounded-full w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
              alt="User profile"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
