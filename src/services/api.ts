export interface BatteryData {
  id: number;
  voltage: number;
  current: number;
  temperature: number;
  soc: number;
  cycle_count: number;
  timestamp: string;
}

export interface PredictionData {
  id: number;
  health_status: string;
  remaining_life: number;
  runtime_estimation: number;
  timestamp: string;
}

export interface AlertData {
  id: number;
  alert_type: string;
  message: string;
  timestamp: string;
}

export const api = {
  getRealtime: async (): Promise<BatteryData> => {
    const res = await fetch('/api/realtime');
    return res.json();
  },
  getHistory: async (): Promise<BatteryData[]> => {
    const res = await fetch('/api/history');
    return res.json();
  },
  getPrediction: async (): Promise<PredictionData> => {
    const res = await fetch('/api/prediction');
    return res.json();
  },
  getAlerts: async (): Promise<AlertData[]> => {
    const res = await fetch('/api/alerts');
    return res.json();
  }
};
