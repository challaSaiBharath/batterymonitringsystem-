import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('battery.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS battery_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voltage REAL,
    current REAL,
    temperature REAL,
    soc REAL,
    cycle_count INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS battery_predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    health_status TEXT,
    remaining_life REAL,
    runtime_estimation REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_type TEXT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/sensor-data', (req, res) => {
    const { voltage, current, temperature, soc, cycle_count } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO battery_data (voltage, current, temperature, soc, cycle_count)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(voltage, current, temperature, soc, cycle_count);

    // Run "ML" Prediction Logic (Simulated)
    let health_status = 'Healthy';
    if (temperature > 45 || voltage < 3.2 || cycle_count > 1000) {
      health_status = 'Critical';
    } else if (temperature > 40 || voltage < 3.4 || cycle_count > 800) {
      health_status = 'Normal';
    }

    const remaining_life = Math.max(0, (1500 - cycle_count) * 0.5); // Simple linear decay simulation
    const runtime_estimation = (soc / 100) * 18; // Simple linear runtime simulation

    const predStmt = db.prepare(`
      INSERT INTO battery_predictions (health_status, remaining_life, runtime_estimation)
      VALUES (?, ?, ?)
    `);
    predStmt.run(health_status, remaining_life, runtime_estimation);

    // Check for alerts
    if (temperature > 40) {
      db.prepare('INSERT INTO alerts (alert_type, message) VALUES (?, ?)').run('High Temperature', `Battery temperature reached ${temperature}°C`);
    }
    if (voltage < 3.3) {
      db.prepare('INSERT INTO alerts (alert_type, message) VALUES (?, ?)').run('Low Voltage', `Battery voltage dropped to ${voltage}V`);
    }

    res.json({ status: 'ok' });
  });

  app.get('/api/realtime', (req, res) => {
    const data = db.prepare('SELECT * FROM battery_data ORDER BY timestamp DESC LIMIT 1').get();
    res.json(data || {});
  });

  app.get('/api/history', (req, res) => {
    const data = db.prepare('SELECT * FROM battery_data ORDER BY timestamp DESC LIMIT 20').all();
    res.json(data.reverse());
  });

  app.get('/api/prediction', (req, res) => {
    const data = db.prepare('SELECT * FROM battery_predictions ORDER BY timestamp DESC LIMIT 1').get();
    res.json(data || {});
  });

  app.get('/api/alerts', (req, res) => {
    const data = db.prepare('SELECT * FROM alerts ORDER BY timestamp DESC LIMIT 10').all();
    res.json(data);
  });

  // Simulation Logic: Generate data every 5 seconds if no data exists or just for testing
  setInterval(() => {
    const voltage = 3.5 + Math.random() * 0.5;
    const current = 1.0 + Math.random() * 2.0;
    const temperature = 25 + Math.random() * 20;
    const soc = Math.max(0, 100 - (Date.now() % 100000) / 1000);
    const cycle_count = 200 + Math.floor(Math.random() * 5);

    const stmt = db.prepare(`
      INSERT INTO battery_data (voltage, current, temperature, soc, cycle_count)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(voltage, current, temperature, soc, cycle_count);

    // Update predictions
    let health_status = 'Healthy';
    if (temperature > 42) health_status = 'Critical';
    else if (temperature > 38) health_status = 'Normal';

    const remaining_life = 500 - (cycle_count / 10);
    const runtime_estimation = (soc / 100) * 15;

    db.prepare(`
      INSERT INTO battery_predictions (health_status, remaining_life, runtime_estimation)
      VALUES (?, ?, ?)
    `).run(health_status, remaining_life, runtime_estimation);

    if (temperature > 40) {
      db.prepare('INSERT INTO alerts (alert_type, message) VALUES (?, ?)').run('High Temperature', `Cell #4 reached ${temperature.toFixed(1)}°C. Cooling initiated.`);
    }
  }, 5000);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
