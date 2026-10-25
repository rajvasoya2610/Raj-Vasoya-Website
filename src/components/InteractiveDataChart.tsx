import React, { useState } from 'react';
import { Sliders, TrendingUp, BarChart2, ShieldCheck, Zap } from 'lucide-react';

interface InteractiveDataChartProps {
  title?: string;
}

export const InteractiveDataChart: React.FC<InteractiveDataChartProps> = ({
  title = "Empirical Validation & Telemetry Analytics"
}) => {
  const [activeDataset, setActiveDataset] = useState<'stress-strain' | 'vibration-fft' | 'thermal'>('stress-strain');
  const [loadForce, setLoadForce] = useState<number>(35); // kN
  const [sampleRate, setSampleRate] = useState<number>(500); // Hz

  // Derived engineering metrics
  const maxStressMPa = Math.round(loadForce * 8.4);
  const yieldStrength = 420; // MPa for 7075-T6
  const safetyFactor = (yieldStrength / Math.max(1, maxStressMPa)).toFixed(2);
  const isSafe = Number(safetyFactor) >= 1.5;

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-[#0c0e17] p-5 shadow-2xl overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-mono tracking-wider text-cyan-400 uppercase font-semibold">
              Empirical Telemetry Engine
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mt-0.5">{title}</h4>
        </div>

        {/* Dataset Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveDataset('stress-strain')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeDataset === 'stress-strain'
                ? 'bg-cyan-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Stress vs Strain
          </button>
          <button
            onClick={() => setActiveDataset('vibration-fft')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeDataset === 'vibration-fft'
                ? 'bg-cyan-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            FFT Resonance
          </button>
          <button
            onClick={() => setActiveDataset('thermal')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeDataset === 'thermal'
                ? 'bg-cyan-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Thermal Decay
          </button>
        </div>
      </div>

      {/* SVG Chart Display */}
      <div className="relative my-4 bg-slate-950/70 border border-slate-900 rounded-xl p-4 min-h-[220px] flex flex-col justify-between">
        <svg viewBox="0 0 500 200" className="w-full h-44 overflow-visible">
          {/* Grid lines */}
          <line x1="40" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="40" y1="65" x2="480" y2="65" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="40" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="40" y1="155" x2="480" y2="155" stroke="#334155" strokeWidth="1.5" />
          <line x1="40" y1="20" x2="40" y2="155" stroke="#334155" strokeWidth="1.5" />

          {/* Render Curve based on Active Dataset */}
          {activeDataset === 'stress-strain' && (
            <>
              {/* Elastic Zone */}
              <path
                d={`M 40 155 Q 180 ${155 - loadForce * 1.8} 320 ${155 - loadForce * 2.3} T 460 ${155 - loadForce * 2.7}`}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Shaded Area */}
              <path
                d={`M 40 155 Q 180 ${155 - loadForce * 1.8} 320 ${155 - loadForce * 2.3} T 460 ${155 - loadForce * 2.7} L 460 155 Z`}
                fill="url(#cyanGradient)"
                opacity="0.25"
              />
              {/* Critical Yield Point */}
              <circle
                cx="320"
                cy={155 - loadForce * 2.3}
                r="5"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="330" y={145 - loadForce * 2.3} fill="#f59e0b" fontSize="10" fontFamily="monospace">
                Yield Point (Re = 0.2%)
              </text>
            </>
          )}

          {activeDataset === 'vibration-fft' && (
            <>
              {/* FFT Frequency spectrum harmonic spikes */}
              <path
                d="M 40 155 L 90 152 L 140 148 L 175 140 L 190 35 L 205 142 L 260 149 L 320 60 L 335 150 L 460 153"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
              />
              <path
                d="M 40 155 L 90 152 L 140 148 L 175 140 L 190 35 L 205 142 L 260 149 L 320 60 L 335 150 L 460 153 L 460 155 Z"
                fill="url(#purpleGradient)"
                opacity="0.25"
              />
              <circle cx="190" cy="35" r="5" fill="#ef4444" stroke="#fff" strokeWidth="2" />
              <text x="200" y="38" fill="#ef4444" fontSize="10" fontFamily="monospace">
                Resonant Peak (120 Hz)
              </text>
            </>
          )}

          {activeDataset === 'thermal' && (
            <>
              {/* Thermal decay exponential curve */}
              <path
                d={`M 40 30 Q 140 110 280 140 T 470 152`}
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
              />
              <text x="290" y="130" fill="#f97316" fontSize="10" fontFamily="monospace">
                Convection Coeff (h = 1850 W/m²K)
              </text>
            </>
          )}

          {/* Gradients */}
          <defs>
            <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Axis Labels */}
          <text x="45" y="15" fill="#64748b" fontSize="10" fontFamily="monospace">
            {activeDataset === 'stress-strain' ? 'Stress σ (MPa)' : activeDataset === 'vibration-fft' ? 'Power Spectral Density' : 'Temp (°C)'}
          </text>
          <text x="410" y="172" fill="#64748b" fontSize="10" fontFamily="monospace">
            {activeDataset === 'stress-strain' ? 'Strain ε (%)' : activeDataset === 'vibration-fft' ? 'Frequency (Hz)' : 'Time (sec)'}
          </text>
        </svg>

        {/* Live Metrics readout badges */}
        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-900">
          <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">CALCULATED STRESS</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">{maxStressMPa} MPa</span>
          </div>

          <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">SAFETY FACTOR</span>
            <span className={`text-sm font-bold font-mono ${isSafe ? 'text-emerald-400' : 'text-amber-400'}`}>
              {safetyFactor}x {isSafe ? '✓' : '⚠️'}
            </span>
          </div>

          <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">R² CORRELATION</span>
            <span className="text-sm font-bold text-purple-400 font-mono">0.994</span>
          </div>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="space-y-3 pt-2 border-t border-slate-800/70">
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Applied Dynamic Load:
            </span>
            <span className="font-mono text-cyan-400 font-bold">{loadForce} kN</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            value={loadForce}
            onChange={e => setLoadForce(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-500">
          <span>Telemetry Source: Accelerometer + Load Cell Array</span>
          <span className="text-cyan-400 font-mono">Sample: {sampleRate} Hz</span>
        </div>
      </div>
    </div>
  );
};
