import React, { useEffect, useState } from 'react';
import { Database, Zap, Activity } from 'lucide-react';
import { api, BatteryData } from '../services/api';

export function StatCards() {
  const [data, setData] = useState<BatteryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getRealtime();
        setData(res);
      } catch (err) {
        console.error('Failed to fetch realtime data', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse h-48 bg-slate-800/20 rounded-xl"></div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* SOC Gauge */}
      <div className="bg-card-dark p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
        <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full soc-gauge opacity-20" style={{ background: `conic-gradient(var(--color-primary) ${data.soc}%, #1e293b 0)` }}></div>
          <div className="absolute inset-2 rounded-full border-4 border-primary rotate-[-90deg]" style={{ background: `conic-gradient(var(--color-primary) ${data.soc}%, transparent 0)` }}></div>
          <div className="z-10 text-center">
            <span className="text-3xl font-bold block">{data.soc.toFixed(0)}%</span>
            <span className="text-[10px] uppercase font-bold text-primary tracking-widest">SOC</span>
          </div>
        </div>
        <p className="text-slate-500 text-sm">Optimized Mode</p>
      </div>

      {/* Available Capacity */}
      <div className="bg-card-dark p-6 rounded-xl border border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[10px] text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full font-bold">LIVE</span>
        </div>
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Available Capacity</h3>
        <p className="text-2xl font-bold">{(data.soc * 100).toFixed(0)} <span className="text-sm font-normal text-slate-500">mAh</span></p>
        <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${data.soc}%` }}></div>
        </div>
      </div>

      {/* Voltage */}
      <div className="bg-card-dark p-6 rounded-xl border border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-orange-400/10 rounded-lg">
            <Zap className="w-5 h-5 text-orange-400" />
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nominal</span>
        </div>
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Voltage</h3>
        <p className="text-2xl font-bold">{data.voltage.toFixed(1)} <span className="text-sm font-normal text-slate-500">V</span></p>
        <p className="text-[10px] text-slate-500 mt-2 font-mono">Temp: {data.temperature.toFixed(1)}°C</p>
      </div>

      {/* Current */}
      <div className="bg-card-dark p-6 rounded-xl border border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-purple-400/10 rounded-lg">
            <Activity className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Steady</span>
        </div>
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Current</h3>
        <p className="text-2xl font-bold">{data.current.toFixed(1)} <span className="text-sm font-normal text-slate-500">A</span></p>
        <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest">Cycles: {data.cycle_count}</p>
      </div>
    </div>
  );
}
