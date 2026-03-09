import React, { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell
} from 'recharts';
import { api, BatteryData } from '../services/api';

export function SensorTrends() {
  const [data, setData] = useState<BatteryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getHistory();
        setData(res);
      } catch (err) {
        console.error('Failed to fetch history', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = data.map((d, i) => ({
    name: i.toString(),
    value: d.voltage * 10, // Scale for visibility
    original: d.voltage
  }));

  return (
    <div className="bg-card-dark rounded-xl border border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-bold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Sensor Trends
        </h3>
        <div className="flex bg-slate-800 p-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
          <button className="px-3 py-1.5 rounded-md bg-primary text-white">Live</button>
          <button className="px-3 py-1.5 rounded-md text-slate-400 hover:text-slate-100 transition-colors">24H</button>
          <button className="px-3 py-1.5 rounded-md text-slate-400 hover:text-slate-100 transition-colors">7D</button>
        </div>
      </div>
      
      <div className="p-6 flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              hide 
            />
            <YAxis 
              hide 
              domain={[0, 100]}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(43, 140, 238, 0.1)' }}
              contentStyle={{ 
                backgroundColor: '#16202a', 
                border: '1px solid #1e293b',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: any) => [`${(value / 10).toFixed(2)}V`, 'Voltage']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill="#2b8cee" 
                  fillOpacity={0.2 + (entry.value / 100) * 0.4} 
                  stroke="#2b8cee"
                  strokeWidth={index === chartData.length - 1 ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="px-6 py-4 bg-slate-800/20 flex gap-6 text-[10px] font-bold uppercase tracking-widest">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span> Voltage</div>
        <div className="flex items-center gap-1.5 opacity-40"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Temperature</div>
        <div className="flex items-center gap-1.5 opacity-40"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Current</div>
      </div>
    </div>
  );
}
