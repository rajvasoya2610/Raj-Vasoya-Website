import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';
import {
  PenTool,
  LineChart,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const AboutProcess: React.FC = () => {
  const [activeCompetency, setActiveCompetency] = useState<'all' | 'art' | 'data' | 'engineering'>('all');

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background celestial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            Core Value Narrative
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Why the Hybrid Polymath Wins
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            In modern product development, designers create shapes that engineers cannot manufacture, engineers build mechanisms users find repulsive, and analysts analyze metrics after the failure has already occurred.
          </p>
        </div>

        {/* The 3-Way Synergy Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Sketch Artist */}
          <div className="glow-card rounded-3xl p-8 border border-purple-500/30 relative flex flex-col justify-between group hover:border-purple-500/70 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <PenTool className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold block mb-1">
                Pillar 1 • The Human Sense
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">Sketch Artist</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Unrestricted rapid ideation and emotional aesthetic language. By drawing 50 concept iterations on paper in an afternoon, we explore unconventional forms that CAD software unconsciously discourages.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-purple-300 font-semibold uppercase">Key Deliverable:</span>
              <div className="text-xs text-slate-400">Ergonomic gestures, CMF boards & hand-drafted proportion schemes</div>
            </div>
          </div>

          {/* Card 2: Data Analyst */}
          <div className="glow-card rounded-3xl p-8 border border-cyan-500/30 relative flex flex-col justify-between group hover:border-cyan-500/70 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                Pillar 2 • Empirical Proof
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">Data Analyst</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Subjective beauty meets objective mathematical rigor. Utilizing Python telemetry scripts, statistical DOE (Design of Experiments), and FEA stress metrics to validate performance before physical tooling.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-cyan-300 font-semibold uppercase">Key Deliverable:</span>
              <div className="text-xs text-slate-400">FEA stress gradients, regression models & telemetry analytics</div>
            </div>
          </div>

          {/* Card 3: Design Engineer */}
          <div className="glow-card rounded-3xl p-8 border border-amber-500/30 relative flex flex-col justify-between group hover:border-amber-500/70 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                Pillar 3 • Physical Reality
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">Design Engineer</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Precision engineering that manufactures at scale. Complex parametric surface CAD, kinematic joint constraints, GD&T tolerance stackups, and direct DFM optimization for CNC, injection molding, and 3D printing.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-amber-300 font-semibold uppercase">Key Deliverable:</span>
              <div className="text-xs text-slate-400">Production-ready CAD assemblies, 2D drawings & functional prototypes</div>
            </div>
          </div>
        </div>

        {/* Interactive Skills Matrix */}
        <div className="glow-card rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Technical & Creative Mastery Matrix
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Proficiency benchmarks across software, hardware, and analytical toolsets.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveCompetency('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCompetency === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Skills
              </button>
              <button
                onClick={() => setActiveCompetency('art')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCompetency === 'art'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Art
              </button>
              <button
                onClick={() => setActiveCompetency('data')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCompetency === 'data'
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Data
              </button>
              <button
                onClick={() => setActiveCompetency('engineering')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCompetency === 'engineering'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Engineering
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.filter(
              cat => activeCompetency === 'all' || cat.discipline === activeCompetency
            ).map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <span className="text-sm font-bold text-white">{cat.name}</span>
                </div>
                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className={`font-medium ${skill.highlight ? 'text-white font-semibold' : 'text-slate-300'}`}>
                          {skill.name}
                        </span>
                        <span className="font-mono text-slate-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
                        <div
                          className={`h-full rounded-full ${
                            cat.discipline === 'art'
                              ? 'bg-gradient-to-r from-purple-500 to-fuchsia-400'
                              : cat.discipline === 'data'
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-400'
                              : 'bg-gradient-to-r from-amber-500 to-orange-400'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
