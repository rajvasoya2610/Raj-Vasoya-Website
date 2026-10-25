import React, { useState } from 'react';
import type { CaseStudy } from '../types/portfolio.ts';
import { InteractiveSketchViewer } from './InteractiveSketchViewer.tsx';
import { InteractiveDataChart } from './InteractiveDataChart.tsx';
import { InteractiveCadViewer } from './InteractiveCadViewer.tsx';
import {
  PenTool,
  LineChart,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  ChevronRight,
  Share2
} from 'lucide-react';

interface CaseStudyExplorerProps {
  caseStudies: CaseStudy[];
}

export const CaseStudyExplorer: React.FC<CaseStudyExplorerProps> = ({ caseStudies }) => {
  const [selectedStudyIndex, setSelectedStudyIndex] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<'sketch' | 'data' | 'cad'>('sketch');

  const currentStudy = caseStudies[selectedStudyIndex] || caseStudies[0];

  if (!currentStudy) return null;

  return (
    <section id="case-studies" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            End-To-End Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            The Complete Tri-Discipline Flow
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            See how each breakthrough moves through our integrated pipeline: from raw conceptual sketches, through analytical FEA feasibility models, to precision production CAD.
          </p>
        </div>

        {/* Case Study Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {caseStudies.map((study, idx) => {
            const isSelected = idx === selectedStudyIndex;
            return (
              <button
                key={study.id}
                onClick={() => {
                  setSelectedStudyIndex(idx);
                  setActiveStage('sketch');
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-purple-600/30 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                {study.title}
              </button>
            );
          })}
        </div>

        {/* Active Case Study Showcase Card */}
        <div className="glow-card rounded-3xl p-6 sm:p-10 border border-slate-800/90 shadow-2xl relative overflow-hidden">
          {/* Subtle cosmic background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Title & Impact Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  {currentStudy.completionDate}
                </span>
                <span>•</span>
                <span className="text-cyan-400 uppercase tracking-wider font-semibold">
                  Multi-Disciplinary Hybrid
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {currentStudy.title}
              </h3>
              <p className="text-slate-300 mt-1 text-sm sm:text-base font-normal">
                {currentStudy.subtitle}
              </p>
            </div>

            {/* Impact Metric Badges */}
            <div className="flex items-center gap-3">
              {currentStudy.impactMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-2.5 text-center min-w-[95px]"
                >
                  <span className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-mono">
                    {metric.value}
                  </span>
                  <span className="block text-[11px] font-medium text-slate-400 mt-0.5">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Stage Interactive Pipeline Navigation */}
          <div className="my-8">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              The 3-Step Hybrid Flow Architecture:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stage 1: The Vision */}
              <button
                onClick={() => setActiveStage('sketch')}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
                  activeStage === 'sketch'
                    ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    STAGE 1: THE VISION
                  </span>
                  <PenTool className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-base font-semibold text-white">Concept Sketching</div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {currentStudy.sketchStage.subtitle}
                </p>
              </button>

              {/* Stage 2: The Validation */}
              <button
                onClick={() => setActiveStage('data')}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
                  activeStage === 'data'
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    STAGE 2: THE VALIDATION
                  </span>
                  <LineChart className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-base font-semibold text-white">Data & Feasibility</div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {currentStudy.dataStage.subtitle}
                </p>
              </button>

              {/* Stage 3: The Solution */}
              <button
                onClick={() => setActiveStage('cad')}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
                  activeStage === 'cad'
                    ? 'bg-amber-950/40 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    STAGE 3: THE SOLUTION
                  </span>
                  <Cpu className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-base font-semibold text-white">CAD & Engineering</div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {currentStudy.cadStage.subtitle}
                </p>
              </button>
            </div>
          </div>

          {/* Active Stage Details & Interactive Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            {/* Left: Narrative & Key Breakthroughs */}
            <div className="lg:col-span-6 space-y-6">
              {activeStage === 'sketch' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                    {currentStudy.sketchStage.title}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {currentStudy.sketchStage.description}
                  </p>
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold block">
                      Ideation Milestones:
                    </span>
                    {currentStudy.sketchStage.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {currentStudy.sketchStage.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-purple-900/30 text-purple-300 border border-purple-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeStage === 'data' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    {currentStudy.dataStage.title}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {currentStudy.dataStage.description}
                  </p>
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold block">
                      Quantitative Validation:
                    </span>
                    {currentStudy.dataStage.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {currentStudy.dataStage.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyan-900/30 text-cyan-300 border border-cyan-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeStage === 'cad' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    {currentStudy.cadStage.title}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {currentStudy.cadStage.description}
                  </p>
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold block">
                      Mechanical Execution & DFM:
                    </span>
                    {currentStudy.cadStage.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {currentStudy.cadStage.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-amber-900/30 text-amber-300 border border-amber-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools and Tech Stack */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  Unified Toolchain Utilized:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentStudy.toolsUsed.map((tool, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Flow Next Step Button */}
              <div className="flex items-center gap-3 pt-2">
                {activeStage === 'sketch' && (
                  <button
                    onClick={() => setActiveStage('data')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-lg shadow-cyan-600/20"
                  >
                    Proceed to Stage 2: Data Feasibility
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {activeStage === 'data' && (
                  <button
                    onClick={() => setActiveStage('cad')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-lg shadow-amber-600/20"
                  >
                    Proceed to Stage 3: CAD & Engineering
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {activeStage === 'cad' && (
                  <button
                    onClick={() => setActiveStage('sketch')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-lg shadow-purple-600/20"
                  >
                    Revisit Stage 1: Initial Sketches
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Embedded Interactive Sandbox Viewer */}
            <div className="lg:col-span-6">
              {activeStage === 'sketch' && (
                <InteractiveSketchViewer
                  title={`${currentStudy.title} - Ideation Studies`}
                  imageSrc={currentStudy.heroImage}
                />
              )}
              {activeStage === 'data' && (
                <InteractiveDataChart
                  title={`${currentStudy.title} - Stress & Feasibility Metrics`}
                />
              )}
              {activeStage === 'cad' && (
                <InteractiveCadViewer
                  title={`${currentStudy.title} - Parametric Assembly`}
                  initialMode="shaded"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
