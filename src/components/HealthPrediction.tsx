import React, { useEffect, useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { api, PredictionData } from '../services/api';
import { cn } from '../lib/utils';

export function HealthPrediction() {
  const [data, setData] = useState<PredictionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getPrediction();
        setData(res);
      } catch (err) {
        console.error('Failed to fetch prediction', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="bg-card-dark rounded-xl border border-slate-800 h-64 animate-pulse"></div>;

  const isHealthy = data.health_status === 'Healthy';
  const isCritical = data.health_status === 'Critical';

  return (
    <div className="bg-card-dark rounded-xl border border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-800">
        <h3 className="font-bold flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" />
          Health Prediction
        </h3>
      </div>
      <div className="p-6 flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">SOH Grade</p>
            <p className={cn(
              "text-3xl font-bold",
              isHealthy ? "text-green-500" : isCritical ? "text-red-500" : "text-yellow-500"
            )}>
              {isHealthy ? '94%' : isCritical ? '65%' : '82%'}
            </p>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase",
            isHealthy ? "bg-green-500/10 text-green-500" : isCritical ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
          )}>
            {data.health_status}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/30">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Useful Life</p>
            <p className="font-bold text-lg">{data.remaining_life.toFixed(0)} <span className="text-xs font-normal opacity-60">h</span></p>
          </div>
          <div className={cn(
            "bg-slate-800/50 p-4 rounded-xl border border-slate-700/30 border-l-4",
            isHealthy ? "border-green-500" : isCritical ? "border-red-500" : "border-yellow-500"
          )}>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Runtime Est.</p>
            <p className="font-bold text-lg">{data.runtime_estimation.toFixed(1)} <span className="text-xs font-normal opacity-60">h</span></p>
          </div>
        </div>
        
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-xs leading-relaxed text-slate-400">
            {isHealthy 
              ? "Battery is performing optimally. No immediate maintenance required." 
              : `Battery health is degraded. Maintenance is recommended within ${isCritical ? '2' : '14'} days.`}
          </p>
        </div>
      </div>
    </div>
  );
}
