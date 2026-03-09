import React, { useEffect, useState } from 'react';
import { Thermometer, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { api, AlertData } from '../services/api';

export function SystemAlerts() {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getAlerts();
        setAlerts(res);
      } catch (err) {
        console.error('Failed to fetch alerts', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    if (type.includes('Temperature')) return Thermometer;
    if (type.includes('Voltage')) return AlertTriangle;
    return Info;
  };

  const getColor = (type: string) => {
    if (type.includes('Temperature')) return 'border-orange-500 text-orange-500';
    if (type.includes('Voltage')) return 'border-red-500 text-red-500';
    return 'border-blue-500 text-blue-500';
  };

  return (
    <div className="bg-card-dark rounded-xl border border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          System Alerts
        </h3>
        {alerts.length > 0 && (
          <span className="text-[10px] font-bold bg-primary text-white px-2 py-1 rounded tracking-widest">
            {alerts.length} NEW
          </span>
        )}
      </div>
      <div className="p-2 overflow-y-auto max-h-[220px] custom-scrollbar">
        <div className="flex flex-col gap-1">
          {alerts.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No active alerts</div>
          ) : (
            alerts.map((alert) => {
              const Icon = getIcon(alert.alert_type);
              const colorClass = getColor(alert.alert_type);
              return (
                <div 
                  key={alert.id}
                  className={cn(
                    "p-3 hover:bg-slate-800/50 rounded-lg flex gap-4 items-start transition-colors border-l-4",
                    colorClass.split(' ')[0]
                  )}
                >
                  <Icon className={cn("w-5 h-5 mt-0.5", colorClass.split(' ')[1])} />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{alert.alert_type}</p>
                    <p className="text-xs text-slate-500">{alert.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
