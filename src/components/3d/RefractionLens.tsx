import React, { useRef, useEffect, useState } from 'react';
import { Eye, Sparkles, X } from 'lucide-react';

interface RefractionLensProps {
  active: boolean;
  onToggle: () => void;
}

export const RefractionLens: React.FC<RefractionLensProps> = ({ active, onToggle }) => {
  const lensRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.45 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!active) return;

    let targetX = pos.x;
    let targetY = pos.y;
    let currentX = pos.x;
    let currentY = pos.y;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden">
      {/* Refractive Spherical Lens Overlay (Capturing Screenshot 3) */}
      <div
        ref={lensRef}
        className="absolute pointer-events-auto cursor-crosshair transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '320px',
          height: '320px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer Chromatic Aberration Ring (Glass dispersion) */}
        <div className="absolute inset-0 rounded-full border border-white/20 shadow-2xl backdrop-blur-[2px] transition-all">
          {/* Chromatic edge layers */}
          <div
            className="absolute inset-0 rounded-full mix-blend-screen opacity-90"
            style={{
              boxShadow:
                'inset 0 0 40px rgba(255, 0, 70, 0.4), inset 0 0 60px rgba(0, 240, 255, 0.4)'
            }}
          />

          {/* Liquid glass sphere gradient and specular reflections */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-black/40 via-white/[0.08] to-white/[0.25] backdrop-blur-[4px] border border-white/30 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-inner">
            {/* Specular glare curved arc */}
            <div className="absolute -top-10 left-10 w-44 h-24 bg-white/20 rounded-full blur-md transform -rotate-12 pointer-events-none" />

            <div className="relative z-10 space-y-1.5 animate-in fade-in duration-200">
              <span className="text-[10px] font-mono text-[#BEF264] uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded-full border border-[#BEF264]/30">
                STRYDEX 3D VISION LENS
              </span>
              <p className="text-sm font-bold text-white tracking-tight">
                Kinematic Refraction
              </p>
              <p className="text-[11px] text-slate-300 font-mono">
                X: {Math.round(pos.x)} · Y: {Math.round(pos.y)}
              </p>
              <p className="text-[10px] text-[#BEF264] pt-1">
                Sub-millimeter Stance Alignment
              </p>
            </div>
          </div>
        </div>

        {/* Small close pill on the lens */}
        <button
          onClick={onToggle}
          className="absolute -top-2 -right-2 p-1.5 bg-black text-white hover:text-[#BEF264] rounded-full border border-white/20 shadow-lg cursor-pointer"
          title="Exit Lens Mode"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Persistent floating banner explaining lens mode */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto bg-[#0D1424]/90 backdrop-blur-md border border-[#BEF264]/40 px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 text-xs font-mono text-white">
        <span className="w-2 h-2 rounded-full bg-[#BEF264] animate-ping" />
        <span>3D Chromatic Refraction Lens Active · Move Cursor Over Telemetry</span>
        <button
          onClick={onToggle}
          className="ml-2 text-xs text-slate-400 hover:text-white underline"
        >
          Disable
        </button>
      </div>
    </div>
  );
};
