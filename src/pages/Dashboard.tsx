import React from 'react';
import { motion } from 'motion/react';
import { StatCards } from '../components/StatCards';
import { SensorTrends } from '../components/SensorTrends';
import { HealthPrediction } from '../components/HealthPrediction';
import { IOPerformance } from '../components/IOPerformance';
import { SystemAlerts } from '../components/SystemAlerts';

export function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6"
    >
      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SensorTrends />
        </div>
        <div>
          <HealthPrediction />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IOPerformance />
        <SystemAlerts />
      </div>
    </motion.div>
  );
}
