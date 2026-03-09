import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Bell, Shield, Database, Save } from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState({
    tempThreshold: 45,
    voltThreshold: 3.2,
    alertNotifications: true,
    autoCooling: true,
    syncInterval: 5
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <SettingsIcon className="text-primary" />
        System Configuration
      </h2>

      <div className="space-y-4">
        {/* Thresholds */}
        <div className="bg-card-dark p-6 rounded-xl border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Safety Thresholds
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Max Temperature (°C)</label>
              <input 
                type="number" 
                value={settings.tempThreshold}
                onChange={(e) => setSettings({...settings, tempThreshold: parseInt(e.target.value)})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Min Voltage (V)</label>
              <input 
                type="number" 
                step="0.1"
                value={settings.voltThreshold}
                onChange={(e) => setSettings({...settings, voltThreshold: parseFloat(e.target.value)})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card-dark p-6 rounded-xl border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notifications & Automation
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Alert Notifications</p>
                <p className="text-xs text-slate-500">Receive push notifications for critical alerts</p>
              </div>
              <button 
                onClick={() => setSettings({...settings, alertNotifications: !settings.alertNotifications})}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.alertNotifications ? 'bg-primary' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.alertNotifications ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Auto Cooling System</p>
                <p className="text-xs text-slate-500">Automatically trigger cooling when temp exceeds threshold</p>
              </div>
              <button 
                onClick={() => setSettings({...settings, autoCooling: !settings.autoCooling})}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoCooling ? 'bg-primary' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.autoCooling ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Data Sync */}
        <div className="bg-card-dark p-6 rounded-xl border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Database className="w-4 h-4" /> Data Management
          </h3>
          
          <div className="space-y-2">
            <label className="text-xs text-slate-400">Sync Interval (Seconds)</label>
            <select 
              value={settings.syncInterval}
              onChange={(e) => setSettings({...settings, syncInterval: parseInt(e.target.value)})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
            >
              <option value={1}>1 Second</option>
              <option value={5}>5 Seconds</option>
              <option value={10}>10 Seconds</option>
              <option value={30}>30 Seconds</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95"
        >
          <Save className="w-5 h-5" /> Save Configuration
        </button>
      </div>
    </motion.div>
  );
}
