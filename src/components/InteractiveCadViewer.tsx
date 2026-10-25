import React, { useRef, useEffect, useState } from 'react';
import { Eye, Layers, Activity, RotateCw, Maximize2 } from 'lucide-react';

interface InteractiveCadViewerProps {
  title?: string;
  initialMode?: 'shaded' | 'wireframe' | 'fea';
}

export const InteractiveCadViewer: React.FC<InteractiveCadViewerProps> = ({
  title = "Parametric Kinematic Linkage Model",
  initialMode = 'shaded'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<'shaded' | 'wireframe' | 'fea'>(initialMode);
  const [explodedVal, setExplodedVal] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 25, y: 45 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // 3D Canvas renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let localRotY = rotation.y;
    let localRotX = rotation.x;

    const render = () => {
      if (isRotating && !isDraggingRef.current) {
        localRotY += 0.8;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Radian angles
      const radX = (localRotX * Math.PI) / 180;
      const radY = (localRotY * Math.PI) / 180;

      // Project 3D point to 2D
      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const x1 = x * Math.cos(radY) + z * Math.sin(radY);
        const z1 = -x * Math.sin(radY) + z * Math.cos(radY);
        // Rotate X
        const y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = y * Math.sin(radX) + z1 * Math.cos(radX);

        // Perspective
        const scale = 240 / (280 + z2);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          depth: z2
        };
      };

      // Mechanical assembly components with exploded offset
      const explodeOffset = (explodedVal / 100) * 55;

      // Component 1: Central Hub
      const drawCylinder = (baseY: number, height: number, radius: number, colorBase: string, stressLevel = 0.3) => {
        const segments = 16;
        const topY = baseY - height;
        const ptsBottom: { px: number; py: number; depth: number }[] = [];
        const ptsTop: { px: number; py: number; depth: number }[] = [];

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;
          ptsBottom.push(project(x, baseY, z));
          ptsTop.push(project(x, topY, z));
        }

        // Color determination
        let fillColor = colorBase;
        let strokeColor = '#38bdf8';
        if (mode === 'fea') {
          // FEA Von Mises stress color
          const hue = Math.max(0, 240 - stressLevel * 240); // Blue to Red
          fillColor = `hsla(${hue}, 85%, 55%, 0.75)`;
          strokeColor = `hsla(${hue}, 100%, 75%, 0.9)`;
        } else if (mode === 'wireframe') {
          fillColor = 'transparent';
          strokeColor = '#06b6d4';
        }

        // Draw side facets
        for (let i = 0; i < segments; i++) {
          ctx.beginPath();
          ctx.moveTo(ptsBottom[i].px, ptsBottom[i].py);
          ctx.lineTo(ptsBottom[i + 1].px, ptsBottom[i + 1].py);
          ctx.lineTo(ptsTop[i + 1].px, ptsTop[i + 1].py);
          ctx.lineTo(ptsTop[i].px, ptsTop[i].py);
          ctx.closePath();

          if (mode !== 'wireframe') {
            ctx.fillStyle = fillColor;
            ctx.fill();
          }
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Top cap
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          if (i === 0) ctx.moveTo(ptsTop[i].px, ptsTop[i].py);
          else ctx.lineTo(ptsTop[i].px, ptsTop[i].py);
        }
        ctx.closePath();
        if (mode !== 'wireframe') {
          ctx.fillStyle = mode === 'fea' ? fillColor : 'rgba(56, 189, 248, 0.4)';
          ctx.fill();
        }
        ctx.stroke();
      };

      // Component 2: Kinematic Linkage Arms (Exploded in X and Z)
      const drawArm = (angleDeg: number, length: number, stress: number) => {
        const rad = (angleDeg * Math.PI) / 180;
        const ex = Math.cos(rad) * explodeOffset * 1.4;
        const ez = Math.sin(rad) * explodeOffset * 1.4;

        const startX = Math.cos(rad) * 20 + ex;
        const startZ = Math.sin(rad) * 20 + ez;
        const endX = Math.cos(rad) * (20 + length) + ex;
        const endZ = Math.sin(rad) * (20 + length) + ez;

        const p1 = project(startX, -5, startZ);
        const p2 = project(endX, -5, endZ);
        const p3 = project(endX, 5, endZ);
        const p4 = project(startX, 5, startZ);

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.lineTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.closePath();

        let fill = 'rgba(147, 51, 234, 0.45)';
        let stroke = '#c084fc';

        if (mode === 'fea') {
          const hue = Math.max(0, 240 - stress * 240);
          fill = `hsla(${hue}, 85%, 55%, 0.75)`;
          stroke = `hsla(${hue}, 100%, 75%, 0.9)`;
        } else if (mode === 'wireframe') {
          fill = 'transparent';
          stroke = '#a855f7';
        }

        if (mode !== 'wireframe') {
          ctx.fillStyle = fill;
          ctx.fill();
        }
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // End bearing pivot ring
        const endPivot = project(endX, 0, endZ);
        ctx.beginPath();
        ctx.arc(endPivot.px, endPivot.py, 6, 0, Math.PI * 2);
        ctx.strokeStyle = '#38bdf8';
        ctx.stroke();
      };

      // Draw Sub-Assemblies with Exploded Y offsets
      // Upper Top Bearing Ring
      drawCylinder(-25 - explodeOffset * 1.2, 10, 36, 'rgba(14, 165, 233, 0.35)', 0.15);

      // Main Central Hub
      drawCylinder(15, 30, 28, 'rgba(59, 130, 246, 0.4)', 0.45);

      // Kinematic Arms
      drawArm(0, 55, 0.82); // Highly stressed arm
      drawArm(120, 55, 0.55);
      drawArm(240, 55, 0.35);

      // Lower Mount Plate
      drawCylinder(35 + explodeOffset * 1.2, 8, 48, 'rgba(99, 102, 241, 0.35)', 0.25);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [mode, explodedVal, isRotating, rotation]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x + dy * 0.5)),
      y: prev.y + dx * 0.5
    }));
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-[#0c0e17] p-5 shadow-2xl overflow-hidden flex flex-col justify-between group">
      {/* CAD Header overlay */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono tracking-wider text-emerald-400 uppercase font-semibold">
              Live 3D CAD Assembly Engine
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mt-0.5">{title}</h4>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setMode('shaded')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              mode === 'shaded'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Shaded CAD
          </button>
          <button
            onClick={() => setMode('wireframe')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              mode === 'wireframe'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Wireframe
          </button>
          <button
            onClick={() => setMode('fea')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              mode === 'fea'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            FEA Stress Map
          </button>
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <div
        className="relative my-3 flex items-center justify-center cursor-grab active:cursor-grabbing bg-radial from-slate-900/60 to-[#0c0e17] rounded-xl overflow-hidden min-h-[260px]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          width={460}
          height={260}
          className="w-full h-[260px] max-w-full block"
        />

        {/* Grid and Axis overlay */}
        <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-500 pointer-events-none flex flex-col gap-0.5">
          <span>TOLERANCE: ±0.012 mm</span>
          <span>MATERIAL: AL-7075-T6</span>
          <span>ORIENTATION: Isometric [X:{rotation.x.toFixed(0)}°, Y:{rotation.y.toFixed(0)}°]</span>
        </div>

        {/* FEA Gradient Legend when in FEA mode */}
        {mode === 'fea' && (
          <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-800 p-2 rounded-lg text-[10px] font-mono flex flex-col items-center gap-1">
            <span className="text-slate-300 font-semibold">Von Mises Stress</span>
            <div className="w-2.5 h-16 rounded-sm bg-gradient-to-t from-blue-500 via-green-400 via-yellow-400 to-red-500"></div>
            <div className="flex justify-between w-full text-[9px] text-slate-400">
              <span>0 MPa</span>
              <span className="text-red-400 font-bold">295 MPa</span>
            </div>
          </div>
        )}
      </div>

      {/* Assembly controls footer */}
      <div className="space-y-3 pt-2 border-t border-slate-800/70 z-10">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-medium flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
            Exploded View Slider:
          </span>
          <span className="font-mono text-purple-400 font-bold">{explodedVal}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={explodedVal}
          onChange={e => setExplodedVal(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-slate-400 text-[11px]">
            Drag mouse to rotate 3D model • Scroll/Slide to explode
          </span>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors text-[11px]"
          >
            <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
            {isRotating ? 'Pause Auto-Spin' : 'Auto-Spin'}
          </button>
        </div>
      </div>
    </div>
  );
};
