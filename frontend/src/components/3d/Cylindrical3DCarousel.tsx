import React, { useState, useRef, useEffect } from 'react';
import { PerspectiveGrid } from './PerspectiveGrid';
import {
  Activity,
  Video,
  TrendingUp,
  Target,
  Shield,
  ArrowRight,
  Maximize2,
  X,
  Sparkles,
  Zap,
  Play,
  ArrowUpRight
} from 'lucide-react';

export interface CarouselCardItem {
  id: string;
  tag: string;
  title: string;
  category: string;
  metricLabel: string;
  metricValue: string;
  description: string;
  svgType: 'batting' | 'bowling' | 'fielding' | 'wagon' | 'portfolio';
  accentColor: string;
}

const CAROUSEL_ITEMS: CarouselCardItem[] = [
  {
    id: 'c1',
    tag: 'BIOMECHANICS / 120 FPS',
    title: 'Cover Drive Kinetic Chain',
    category: 'Batting Technique',
    metricLabel: 'BAT SPEED & IMPACT',
    metricValue: '114.2 km/h · 184ms',
    description: 'Sub-millimeter joint tracking isolating hip rotation, head stability, and vertical blade presentation through the V.',
    svgType: 'batting',
    accentColor: '#BEF264'
  },
  {
    id: 'c2',
    tag: 'RADIAL SPLITS / MIDDLE OVERS',
    title: '360° Wagon Wheel Telemetry',
    category: 'Scoring Intelligence',
    metricLabel: 'FIELD DOMINANCE',
    metricValue: '23% Extra Cover · 138.7 SR',
    description: 'Radial run density mapped against spin and pace variations to identify boundary corridors and dot-ball clusters.',
    svgType: 'wagon',
    accentColor: '#38BDF8'
  },
  {
    id: 'c3',
    tag: 'SEAM VELOCITY / RELEASE',
    title: 'Pace Delivery Stride Kinematics',
    category: 'Fast Bowling',
    metricLabel: 'RELEASE VELOCITY',
    metricValue: '124.5 km/h · 84.0° Brace',
    description: 'Front-foot plant mechanics, shoulder hip separation, and upright wrist cock for lethal outswing execution.',
    svgType: 'bowling',
    accentColor: '#F59E0B'
  },
  {
    id: 'c4',
    tag: 'REFLEX TIME / SLIP CORDON',
    title: 'First-Step Impulse & Diving Reach',
    category: 'Fielding Dynamics',
    metricLabel: 'REACTION SPEED',
    metricValue: '228ms · 90% Held',
    description: 'Computer-vision reaction timing from bat edge deflection to lateral dive extension with clean low-ground clearance.',
    svgType: 'fielding',
    accentColor: '#10B981'
  },
  {
    id: 'c5',
    tag: 'SCOUT CERTIFIED / DOSSIER',
    title: 'Verified Digital Athlete Portfolio',
    category: 'Player Development',
    metricLabel: 'CAREER MILESTONE',
    metricValue: '1,240 Runs · Avg 42.5',
    description: 'Shareable public credential dossier connecting verified scorecards, video reels, and accredited coach endorsements.',
    svgType: 'portfolio',
    accentColor: '#BEF264'
  }
];

export const Cylindrical3DCarousel: React.FC<{ onSelectCard?: (item: CarouselCardItem) => void }> = ({
  onSelectCard
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [activeModalItem, setActiveModalItem] = useState<CarouselCardItem | null>(null);

  const radius = 680; // Cylindrical radius in px
  const count = CAROUSEL_ITEMS.length;
  const angleStep = 360 / count;

  // Momentum Inertia Physics
  useEffect(() => {
    let animId: number;
    const applyInertia = () => {
      if (!isDragging && Math.abs(velocity) > 0.05) {
        setRotation((prev) => prev + velocity);
        setVelocity((prev) => prev * 0.92);
        animId = requestAnimationFrame(applyInertia);
      }
    };

    if (!isDragging && Math.abs(velocity) > 0.05) {
      animId = requestAnimationFrame(applyInertia);
    }

    return () => cancelAnimationFrame(animId);
  }, [isDragging, velocity]);

  // Mouse Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
    setVelocity(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    const currentAngle = startRotation + delta * 0.28;
    setRotation(currentAngle);
    setVelocity(delta * 0.04);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Dragging handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartRotation(rotation);
    setVelocity(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    setRotation(startRotation + delta * 0.28);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaX || e.deltaY;
    setRotation((prev) => prev - delta * 0.06);
  };

  const handleCardClick = (item: CarouselCardItem, cardAngle: number) => {
    const currentAngleOffset = ((rotation % 360) + 360) % 360;
    const targetAngle = ((360 - (cardAngle % 360)) + 360) % 360;
    const diff = Math.abs(((targetAngle - currentAngleOffset + 180) % 360) - 180);

    if (diff < 25) {
      setActiveModalItem(item);
      if (onSelectCard) onSelectCard(item);
    } else {
      setRotation(360 - cardAngle);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="relative w-full h-[640px] sm:h-[700px] bg-[#000000] overflow-hidden select-none cursor-grab active:cursor-grabbing flex flex-col justify-between py-6"
    >
      {/* 3D Floor Perspective Grid (Like Jesper Landberg floor) */}
      <div className="absolute inset-0 z-0">
        <PerspectiveGrid />
      </div>

      {/* Top Header Strip (Screenshot 1 Layout: Brand on Left, Profile on Right) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#BEF264] animate-pulse" />
          <span className="text-white font-bold tracking-tight">STRYDEX ARCHITECTURE</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-neutral-400">
          <span className="hidden sm:inline">DRAG OR SCROLL TO ROTATE</span>
          <span className="text-white uppercase font-bold tracking-wider hover:text-[#BEF264] transition-colors cursor-pointer">
            DOSSIER
          </span>
        </div>
      </div>

      {/* 3D Cylindrical Space Viewport */}
      <div
        className="relative w-full flex-1 flex items-center justify-center z-10"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        <div
          className="relative w-0 h-0 transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${radius * 0.4}px) rotateY(${rotation}deg)`
          }}
        >
          {CAROUSEL_ITEMS.map((item, index) => {
            const cardAngle = index * angleStep;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item, cardAngle)}
                className="absolute top-1/2 left-1/2 w-[320px] sm:w-[380px] h-[380px] sm:h-[420px] -mt-[190px] sm:-mt-[210px] -ml-[160px] sm:-ml-[190px] rounded-3xl bg-[#121212]/95 backdrop-blur-xl border border-white/[0.12] p-6 shadow-2xl transition-all duration-300 hover:border-[#BEF264] flex flex-col justify-between group overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9)'
                }}
              >
                {/* Subtle sheen highlight over card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#BEF264] font-semibold tracking-wider text-[11px]">{item.tag}</span>
                    <span className="text-neutral-400 group-hover:text-white transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tightest leading-tight group-hover:text-[#BEF264] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">{item.category}</p>
                </div>

                {/* Visual Graphic Representation */}
                <div className="relative h-40 sm:h-44 my-3 rounded-2xl bg-[#090909] border border-white/[0.08] flex items-center justify-center overflow-hidden">
                  {item.svgType === 'batting' && (
                    <svg viewBox="0 0 300 160" className="w-full h-full p-3">
                      <path d="M 60 40 Q 150 90 240 130" fill="none" stroke="#BEF264" strokeWidth="2.5" strokeDasharray="4 4" />
                      <circle cx="160" cy="50" r="10" fill="#1C1C1C" stroke="#BEF264" strokeWidth="2" />
                      <line x1="160" y1="60" x2="170" y2="105" stroke="#FFFFFF" strokeWidth="2.5" />
                      <line x1="170" y1="105" x2="225" y2="135" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="160" cy="50" r="3" fill="#BEF264" />
                      <circle cx="220" cy="130" r="3.5" fill="#EF4444" />
                      <text x="150" y="145" fill="#BEF264" fontSize="9" fontFamily="monospace">114.2 KM/H</text>
                    </svg>
                  )}

                  {item.svgType === 'wagon' && (
                    <svg viewBox="0 0 200 160" className="w-full h-full p-2">
                      <circle cx="100" cy="80" r="65" fill="#0C0C0C" stroke="#222222" strokeWidth="1.5" />
                      <circle cx="100" cy="80" r="32" fill="none" stroke="#333333" strokeDasharray="3 3" />
                      <line x1="100" y1="80" x2="150" y2="35" stroke="#BEF264" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="100" y1="80" x2="160" y2="70" stroke="#BEF264" strokeWidth="2" strokeLinecap="round" />
                      <line x1="100" y1="80" x2="130" y2="135" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                      <line x1="100" y1="80" x2="50" y2="125" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                      <rect x="96" y="70" width="8" height="20" fill="#BEF264" rx="1" />
                    </svg>
                  )}

                  {item.svgType === 'bowling' && (
                    <svg viewBox="0 0 300 160" className="w-full h-full p-3">
                      <line x1="30" y1="130" x2="270" y2="130" stroke="#333333" strokeWidth="1" />
                      <circle cx="190" cy="40" r="10" fill="#1C1C1C" stroke="#F59E0B" strokeWidth="2" />
                      <line x1="190" y1="50" x2="185" y2="100" stroke="#FFFFFF" strokeWidth="2.5" />
                      <line x1="190" y1="55" x2="230" y2="25" stroke="#FFFFFF" strokeWidth="3" />
                      <circle cx="233" cy="22" r="5" fill="#EF4444" />
                      <line x1="185" y1="100" x2="215" y2="130" stroke="#BEF264" strokeWidth="3" />
                      <text x="140" y="35" fill="#F59E0B" fontSize="9" fontFamily="monospace">84° BRACE</text>
                    </svg>
                  )}

                  {item.svgType === 'fielding' && (
                    <svg viewBox="0 0 300 160" className="w-full h-full p-3">
                      <circle cx="130" cy="70" r="9" fill="#1C1C1C" stroke="#10B981" strokeWidth="2" />
                      <line x1="130" y1="79" x2="145" y2="110" stroke="#FFFFFF" strokeWidth="2.5" />
                      <line x1="145" y1="110" x2="195" y2="115" stroke="#FFFFFF" strokeWidth="3" />
                      <circle cx="205" cy="115" r="4.5" fill="#10B981" />
                      <text x="130" y="145" fill="#10B981" fontSize="9" fontFamily="monospace">REACTION 228MS</text>
                    </svg>
                  )}

                  {item.svgType === 'portfolio' && (
                    <div className="flex flex-col items-center justify-center space-y-2 text-center p-3">
                      <div className="w-10 h-10 rounded-xl bg-[#BEF264] text-black font-extrabold flex items-center justify-center text-sm shadow-md">
                        AS
                      </div>
                      <p className="text-xs font-bold text-white font-mono">ARJUN SHARMA</p>
                      <p className="text-[10px] text-[#BEF264] font-mono">SCOUT VERIFIED · AVG 42.5</p>
                    </div>
                  )}
                </div>

                {/* Card Footer Metric */}
                <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase">{item.metricLabel}</span>
                    <span className="text-white font-bold tabular-nums text-sm group-hover:text-[#BEF264] transition-colors">
                      {item.metricValue}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#BEF264] group-hover:text-black text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Action Navigation Strip (Screenshot 1 Layout: FEATURED / FULL on Left, NEWSLETTER on Right) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold tracking-wider">FEATURED</span>
          <span>/</span>
          <span className="hover:text-white transition-colors cursor-pointer">FULL</span>
        </div>

        <button
          onClick={() => setActiveModalItem(CAROUSEL_ITEMS[0])}
          className="text-neutral-400 hover:text-white transition-colors uppercase font-bold tracking-wider text-[11px] cursor-pointer"
        >
          EXPLORE DOSSIER
        </button>
      </div>

      {/* Jesper Landberg-inspired Detail Modal (Modeled directly after Screenshot 2) */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#FFFFFF] text-black rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-12 text-left">
            {/* Modal Close Button (Circular black button with white X as in Screenshot 2) */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-[#000000] text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Title, Description, Tags (Screenshot 2) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tightest leading-tight">
                    {activeModalItem.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans font-normal">
                  {activeModalItem.description}
                </p>

                {/* Tags Strip (Screenshot 2: Small badge pills: GRIFLAN 2024 Trophy) */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold font-mono">
                    STRYDEX
                  </span>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold font-mono">
                    2026
                  </span>
                  <span className="text-base">🏆</span>
                </div>

                {/* Telemetry Metric pill */}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 font-mono text-xs space-y-1">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{activeModalItem.metricLabel}</p>
                  <p className="text-base font-extrabold text-black tabular-nums">{activeModalItem.metricValue}</p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveModalItem(null);
                      if (onSelectCard) onSelectCard(activeModalItem);
                    }}
                    className="px-6 py-3 rounded-xl bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer shadow-md"
                  >
                    Open in Telemetry Lab
                  </button>
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-4 py-3 rounded-xl text-xs font-semibold text-neutral-500 hover:text-black transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Preview Banner (Screenshot 2 layout) */}
              <div className="lg:col-span-6 rounded-2xl bg-[#000000] p-6 text-white overflow-hidden shadow-xl border border-neutral-200">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4 pb-2 border-b border-white/10">
                  <span className="text-[#BEF264]">{activeModalItem.tag}</span>
                  <span>CALIBRATED 120 FPS</span>
                </div>

                <div className="h-56 flex items-center justify-center">
                  {activeModalItem.svgType === 'batting' && (
                    <svg viewBox="0 0 300 160" className="w-full h-full p-2">
                      <path d="M 60 40 Q 150 90 240 130" fill="none" stroke="#BEF264" strokeWidth="2.5" strokeDasharray="4 4" />
                      <circle cx="160" cy="50" r="12" fill="#1C1C1C" stroke="#BEF264" strokeWidth="2" />
                      <line x1="160" y1="62" x2="170" y2="105" stroke="#FFFFFF" strokeWidth="3" />
                      <line x1="170" y1="105" x2="235" y2="135" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
                      <circle cx="230" cy="130" r="5" fill="#EF4444" />
                      <text x="180" y="148" fill="#BEF264" fontSize="11" fontFamily="monospace" fontWeight="bold">IMPACT 184ms</text>
                    </svg>
                  )}

                  {activeModalItem.svgType === 'wagon' && (
                    <svg viewBox="0 0 200 160" className="w-full h-full">
                      <circle cx="100" cy="80" r="70" fill="#0C0C0C" stroke="#333333" strokeWidth="1.5" />
                      <line x1="100" y1="80" x2="155" y2="30" stroke="#BEF264" strokeWidth="3" strokeLinecap="round" />
                      <line x1="100" y1="80" x2="165" y2="70" stroke="#BEF264" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="100" y1="80" x2="135" y2="140" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
                      <rect x="96" y="68" width="8" height="24" fill="#BEF264" rx="1" />
                    </svg>
                  )}

                  {activeModalItem.svgType !== 'batting' && activeModalItem.svgType !== 'wagon' && (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#BEF264] text-black font-extrabold flex items-center justify-center text-lg shadow-lg">
                        SX
                      </div>
                      <p className="text-sm font-bold text-white font-mono">{activeModalItem.title}</p>
                      <p className="text-xs text-[#BEF264] font-mono">{activeModalItem.metricValue}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>HEX #fff · SWISS TYPOGRAPHY</span>
                  <span className="text-[#BEF264]">VERIFIED TELEMETRY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
