import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

export function IOPerformance() {
  return (
    <div className="bg-card-dark rounded-xl border border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-800">
        <h3 className="font-bold flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-primary" />
          I/O Performance Panel
        </h3>
      </div>
      <div className="p-6 grid grid-cols-2 gap-8 divide-x divide-slate-800">
        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Input (Charging)</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Voltage</span>
              <span className="font-bold font-mono">54.2V</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Current</span>
              <span className="font-bold font-mono">5.1A</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Wattage</span>
              <span className="font-bold font-mono text-primary">276.4W</span>
            </div>
          </div>
        </div>
        <div className="space-y-4 pl-8">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Output (Load)</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Voltage</span>
              <span className="font-bold font-mono">47.8V</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Current</span>
              <span className="font-bold font-mono">0.0A</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Wattage</span>
              <span className="font-bold font-mono text-slate-600">0.0W</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
