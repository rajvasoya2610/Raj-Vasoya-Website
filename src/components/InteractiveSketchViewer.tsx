import React, { useState } from 'react';
import { PenTool, Grid, ZoomIn, SlidersHorizontal, Sparkles } from 'lucide-react';

interface InteractiveSketchViewerProps {
  title?: string;
  imageSrc?: string;
}

export const InteractiveSketchViewer: React.FC<InteractiveSketchViewerProps> = ({
  title = "Hand-Drafted Ergonomic Ideation Studies",
  imageSrc = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
}) => {
  const [styleMode, setStyleMode] = useState<'pencil' | 'charcoal' | 'colored'>('pencil');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-[#0c0e17] p-5 shadow-2xl overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <span className="text-xs font-mono tracking-wider text-purple-400 uppercase font-semibold">
              Ideation & Aesthetics Studio
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mt-0.5">{title}</h4>
        </div>

        {/* Medium Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setStyleMode('pencil')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              styleMode === 'pencil'
                ? 'bg-purple-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Graphite / Pencil
          </button>
          <button
            onClick={() => setStyleMode('charcoal')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              styleMode === 'charcoal'
                ? 'bg-purple-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Charcoal Smudge
          </button>
          <button
            onClick={() => setStyleMode('colored')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              styleMode === 'colored'
                ? 'bg-purple-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Concept Render
          </button>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center min-h-[220px] max-h-[260px]">
        {/* Synthetic sketch illustration with dynamic filters */}
        <div
          className="w-full h-full relative transition-all duration-300 overflow-hidden flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'center center'
          }}
        >
          <img
            src={imageSrc}
            alt="Hand sketch ideation study"
            className={`w-full h-56 object-cover transition-all duration-500 ${
              styleMode === 'pencil'
                ? 'grayscale contrast-150 brightness-110 invert-0'
                : styleMode === 'charcoal'
                ? 'grayscale contrast-200 brightness-90 saturate-0 sepia-20'
                : 'saturate-120 contrast-110 brightness-100'
            }`}
          />

          {/* Golden Ratio / Caliper Overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none border border-purple-500/30">
              {/* Rule of thirds lines */}
              <div className="absolute left-1/3 top-0 bottom-0 border-l border-purple-400/20 border-dashed"></div>
              <div className="absolute left-2/3 top-0 bottom-0 border-l border-purple-400/20 border-dashed"></div>
              <div className="absolute top-1/3 left-0 right-0 border-t border-purple-400/20 border-dashed"></div>
              <div className="absolute top-2/3 left-0 right-0 border-t border-purple-400/20 border-dashed"></div>

              {/* Callouts */}
              <div className="absolute top-4 left-4 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-purple-300 border border-purple-500/30">
                Φ = 1.618 Proportions
              </div>
              <div className="absolute bottom-4 right-4 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                Curvature Continuity: G2
              </div>
            </div>
          )}
        </div>

        {/* Floating Tool Pills */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-md backdrop-blur border text-xs transition-colors ${
              showGrid
                ? 'bg-purple-900/80 border-purple-500/40 text-purple-200'
                : 'bg-slate-900/80 border-slate-700 text-slate-400'
            }`}
            title="Toggle Anatomical Grid"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-2 pt-2 border-t border-slate-800/70">
        <div className="flex justify-between items-center text-xs text-slate-300">
          <span className="flex items-center gap-1 font-medium">
            <ZoomIn className="w-3.5 h-3.5 text-purple-400" />
            Inspection Magnification:
          </span>
          <span className="font-mono text-purple-400 font-bold">{zoomLevel}%</span>
        </div>
        <input
          type="range"
          min="100"
          max="160"
          value={zoomLevel}
          onChange={e => setZoomLevel(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
          <span>Medium: 4B Graphite • Strathmore 400 Series 80lb Paper</span>
          <span className="text-purple-400">Rapid Form Ideation</span>
        </div>
      </div>
    </div>
  );
};
