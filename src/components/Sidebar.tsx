import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  HeartPulse, 
  Bell, 
  Settings, 
  BatteryCharging
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: HeartPulse, label: 'Health Reports', path: '/health' },
  { icon: Bell, label: 'Alerts', path: '/alerts' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-card-dark border-r border-slate-800 p-6 fixed h-full z-40">
      <div className="flex flex-col gap-8 h-full">
        <div>
          <Link to="/" className="flex items-center gap-2 text-primary">
            <BatteryCharging className="w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">BattGuard</h1>
          </Link>
          <p className="text-slate-500 text-xs mt-1 font-mono uppercase tracking-wider">ID: #BATT-9021</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-100")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">Sync Status</p>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Last synced 2m ago
          </div>
        </div>
      </div>
    </aside>
  );
}
