import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Settings as SettingsPage } from './pages/Settings';
import { LayoutDashboard, BarChart3, Bell, Settings, RefreshCw } from 'lucide-react';
import { cn } from './lib/utils';

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background-dark text-slate-100">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 pb-24 lg:pb-0">
        <Header />
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Fallback for other routes */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card-dark border-t border-slate-800 z-50 flex justify-around items-center h-16 px-4">
        <Link to="/" className={cn("flex flex-col items-center gap-1", location.pathname === '/' ? "text-primary" : "text-slate-500")}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </Link>
        <Link to="/analytics" className={cn("flex flex-col items-center gap-1", location.pathname === '/analytics' ? "text-primary" : "text-slate-500")}>
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Stats</span>
        </Link>
        <div className="relative -top-6">
          <button className="w-12 h-12 rounded-full bg-primary text-white shadow-xl shadow-primary/30 flex items-center justify-center border-4 border-background-dark active:scale-95 transition-transform">
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>
        <Link to="/alerts" className={cn("flex flex-col items-center gap-1", location.pathname === '/alerts' ? "text-primary" : "text-slate-500")}>
          <Bell className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Alerts</span>
        </Link>
        <Link to="/settings" className={cn("flex flex-col items-center gap-1", location.pathname === '/settings' ? "text-primary" : "text-slate-500")}>
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Config</span>
        </Link>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
