import React from 'react';
import type { PersonalInfo, Discipline } from '../types/portfolio.ts';
import {
  PenTool,
  LineChart,
  Cpu,
  ArrowRight,
  Sparkles,
  Github,
  Edit3,
  Layers,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  personalInfo: PersonalInfo;
  activeDiscipline: Discipline;
  onSelectDiscipline: (d: Discipline) => void;
  onOpenDeployModal: () => void;
  onOpenEditorModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  personalInfo,
  activeDiscipline,
  onSelectDiscipline,
  onOpenDeployModal,
  onOpenEditorModal
}) => {
  // Constellation skill nodes for the orbital radar (inspired by Image 1)
  const orbitalNodes = [
    { label: 'CAD 3D', icon: '⚙️', angle: 30, radius: 140, discipline: 'engineering', color: '#f59e0b' },
    { label: 'Python FEA', icon: '📊', angle: 80, radius: 110, discipline: 'data', color: '#06b6d4' },
    { label: 'Sketch Art', icon: '🎨', angle: 140, radius: 135, discipline: 'art', color: '#a855f7' },
    { label: 'SolidWorks', icon: '📐', angle: 195, radius: 150, discipline: 'engineering', color: '#f59e0b' },
    { label: 'Telemetry', icon: '📈', angle: 245, radius: 105, discipline: 'data', color: '#06b6d4' },
    { label: 'Ergonomics', icon: '✏️', angle: 295, radius: 135, discipline: 'art', color: '#a855f7' },
    { label: 'DFM/CNC', icon: '🔩', angle: 345, radius: 95, discipline: 'engineering', color: '#f59e0b' },
  ];

  return (
    <section className="relative pt-6 pb-20 overflow-hidden">
      {/* Top Cosmic Glow Eclipse Arc (Directly inspired by user Image 1) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[360px] pointer-events-none z-0">
        <div className="w-full h-full cosmic-glow-arc"></div>
        {/* Core incandescent ellipse aura */}
        <div className="absolute top-[-90px] left-1/2 -translate-x-1/2 w-[340px] h-[170px] rounded-full cosmic-core opacity-75"></div>
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[240px] h-[120px] rounded-full bg-[#08090E]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold shadow-lg shadow-purple-900/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Multi-Disciplinary Hybrid Portfolio</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Art</span>,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Analytical Data</span>, and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Engineering Design</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Eliminating the disconnect between aesthetic vision, empirical validation, and physical manufacturing. Turning hand-drawn sketches into FEA-validated, production-grade 3D CAD assemblies.
            </p>

            {/* Interactive Discipline Filter Buttons (Requested in user brief) */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Filter Portfolio By Discipline:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectDiscipline('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    activeDiscipline === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span>🌌</span>
                  All Hybrid ({'3 Case Studies'})
                </button>
                <button
                  onClick={() => onSelectDiscipline('art')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    activeDiscipline === 'art'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  Sketch Artist
                </button>
                <button
                  onClick={() => onSelectDiscipline('data')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    activeDiscipline === 'data'
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <LineChart className="w-3.5 h-3.5" />
                  Data Analytics
                </button>
                <button
                  onClick={() => onSelectDiscipline('engineering')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    activeDiscipline === 'engineering'
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Design Engineer
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/30 hover:scale-[1.02]"
              >
                <span>Explore 3-Stage Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDeployModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-slate-200 font-medium text-sm transition-colors"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>How to Deploy on GitHub.io</span>
              </button>

              <button
                onClick={onOpenEditorModal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
                title="Easy No-Code Project Manager"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Customize / Add Projects</span>
              </button>
            </div>
          </div>

          {/* Right Column: Orbital Skill Constellation Diagram (Inspired by Image 1) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] flex items-center justify-center">
              {/* Concentric Orbital Rings */}
              <div className="absolute w-[360px] h-[360px] rounded-full border border-slate-800/60 pointer-events-none"></div>
              <div className="absolute w-[280px] h-[280px] rounded-full border border-slate-800/80 pointer-events-none"></div>
              <div className="absolute w-[200px] h-[200px] rounded-full border border-purple-500/20 pointer-events-none"></div>
              <div className="absolute w-[120px] h-[120px] rounded-full border border-cyan-500/20 pointer-events-none"></div>

              {/* Crosshair grid lines */}
              <div className="absolute w-full h-[1px] bg-slate-800/40 pointer-events-none"></div>
              <div className="absolute h-full w-[1px] bg-slate-800/40 pointer-events-none"></div>

              {/* Central Core Node: The Hybrid Polymath */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-1 shadow-[0_0_40px_rgba(168,85,247,0.4)] animate-pulse">
                <div className="w-full h-full bg-[#0c0e17] rounded-full flex flex-col items-center justify-center text-center p-2">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    HYBRID
                  </span>
                  <span className="text-xs font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    POLYMATH
                  </span>
                </div>
              </div>

              {/* Floating Planetary Nodes around the Orbit */}
              {orbitalNodes.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const x = Math.cos(rad) * (node.radius * 0.95);
                const y = Math.sin(rad) * (node.radius * 0.95);

                const isSelected = activeDiscipline === node.discipline;

                return (
                  <button
                    key={i}
                    onClick={() => onSelectDiscipline(node.discipline as Discipline)}
                    className={`absolute z-20 p-2.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-115 flex items-center gap-1.5 shadow-xl ${
                      isSelected
                        ? 'bg-purple-950/90 border-purple-400 shadow-purple-500/30 ring-2 ring-purple-500/40'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-600'
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    title={`Filter by ${node.label}`}
                  >
                    <span className="text-sm">{node.icon}</span>
                    <span className="text-[11px] font-mono font-bold text-slate-200 whitespace-nowrap">
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
