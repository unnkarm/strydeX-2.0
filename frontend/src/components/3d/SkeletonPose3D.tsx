import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Sparkles, Compass, Eye, Play, Pause, RotateCcw } from 'lucide-react';

interface SkeletonPose3DProps {
  className?: string;
}

export const SkeletonPose3D: React.FC<SkeletonPose3DProps> = ({ className = '' }) => {
  const [phase, setPhase] = useState<'stance' | 'backlift' | 'impact' | 'follow'>('impact');
  const [showAngles, setShowAngles] = useState(true);

  // Kinetic joint node coordinates for each delivery phase
  const poseConfigs = {
    stance: {
      head: { x: 250, y: 70 },
      neck: { x: 250, y: 95 },
      leftShoulder: { x: 225, y: 110 },
      rightShoulder: { x: 275, y: 110 },
      leftElbow: { x: 205, y: 145 },
      rightElbow: { x: 290, y: 145 },
      leftWrist: { x: 230, y: 185 },
      rightWrist: { x: 260, y: 185 },
      batTip: { x: 280, y: 120 },
      hipCenter: { x: 250, y: 195 },
      leftHip: { x: 235, y: 200 },
      rightHip: { x: 265, y: 200 },
      leftKnee: { x: 230, y: 250 },
      rightKnee: { x: 270, y: 250 },
      leftAnkle: { x: 225, y: 300 },
      rightAnkle: { x: 275, y: 300 },
      elbowAngle: '128°',
      headTilt: '0.4°',
      strideLen: '0.85m',
      batSpeed: '0 kph'
    },
    backlift: {
      head: { x: 245, y: 75 },
      neck: { x: 245, y: 100 },
      leftShoulder: { x: 220, y: 115 },
      rightShoulder: { x: 270, y: 115 },
      leftElbow: { x: 195, y: 135 },
      rightElbow: { x: 305, y: 130 },
      leftWrist: { x: 215, y: 160 },
      rightWrist: { x: 285, y: 150 },
      batTip: { x: 345, y: 80 },
      hipCenter: { x: 245, y: 200 },
      leftHip: { x: 230, y: 205 },
      rightHip: { x: 260, y: 205 },
      leftKnee: { x: 220, y: 255 },
      rightKnee: { x: 265, y: 250 },
      leftAnkle: { x: 210, y: 300 },
      rightAnkle: { x: 270, y: 300 },
      elbowAngle: '142°',
      headTilt: '1.2°',
      strideLen: '1.15m',
      batSpeed: '64 kph'
    },
    impact: {
      head: { x: 230, y: 85 },
      neck: { x: 230, y: 110 },
      leftShoulder: { x: 205, y: 125 },
      rightShoulder: { x: 255, y: 120 },
      leftElbow: { x: 180, y: 155 },
      rightElbow: { x: 285, y: 150 },
      leftWrist: { x: 240, y: 190 },
      rightWrist: { x: 260, y: 190 },
      batTip: { x: 260, y: 285 },
      hipCenter: { x: 240, y: 205 },
      leftHip: { x: 225, y: 210 },
      rightHip: { x: 255, y: 210 },
      leftKnee: { x: 200, y: 260 },
      rightKnee: { x: 270, y: 250 },
      leftAnkle: { x: 180, y: 300 },
      rightAnkle: { x: 280, y: 300 },
      elbowAngle: '168°',
      headTilt: '0.8°',
      strideLen: '1.45m',
      batSpeed: '138 kph'
    },
    follow: {
      head: { x: 235, y: 80 },
      neck: { x: 235, y: 105 },
      leftShoulder: { x: 210, y: 115 },
      rightShoulder: { x: 260, y: 115 },
      leftElbow: { x: 190, y: 110 },
      rightElbow: { x: 240, y: 90 },
      leftWrist: { x: 230, y: 90 },
      rightWrist: { x: 260, y: 80 },
      batTip: { x: 280, y: 40 },
      hipCenter: { x: 240, y: 200 },
      leftHip: { x: 225, y: 205 },
      rightHip: { x: 255, y: 205 },
      leftKnee: { x: 205, y: 255 },
      rightKnee: { x: 270, y: 250 },
      leftAnkle: { x: 185, y: 300 },
      rightAnkle: { x: 280, y: 300 },
      elbowAngle: '115°',
      headTilt: '2.1°',
      strideLen: '1.42m',
      batSpeed: '94 kph'
    }
  };

  const current = poseConfigs[phase];

  return (
    <div className={`p-5 rounded-2xl bg-[#080B12] border border-white/10 relative overflow-hidden space-y-4 ${className}`}>
      {/* Header controls */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#BEF264]" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            3D Biomechanical Skeleton Model
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#BEF264]/10 text-[#BEF264] font-mono border border-[#BEF264]/20">
            17 JOINT ESTIMATOR
          </span>
        </div>

        <button
          onClick={() => setShowAngles(!showAngles)}
          className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
            showAngles ? 'bg-[#BEF264]/10 text-[#BEF264] border-[#BEF264]/30' : 'text-neutral-400 border-white/10 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Joint Angles</span>
        </button>
      </div>

      {/* SVG Skeleton Viewport with Motion Interpolation */}
      <div className="relative h-72 sm:h-80 w-full bg-[#05070D] rounded-xl flex items-center justify-center overflow-hidden border border-white/[0.06]">
        {/* Subtle coordinate grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skelGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#BEF264" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skelGrid)" />
        </svg>

        {/* Dynamic Pose Render */}
        <svg viewBox="0 0 500 340" className="w-full h-full relative z-10 p-2">
          {/* Ground crease line */}
          <line x1="80" y1="300" x2="420" y2="300" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

          {/* Bat Trajectory Arc */}
          <path
            d={`M ${current.batTip.x} ${current.batTip.y} Q 280 200 ${current.leftWrist.x} ${current.leftWrist.y}`}
            fill="none"
            stroke="#BEF264"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Spine & Head */}
          <line x1={current.head.x} y1={current.head.y} x2={current.neck.x} y2={current.neck.y} stroke="#38BDF8" strokeWidth="3" />
          <line x1={current.neck.x} y1={current.neck.y} x2={current.hipCenter.x} y2={current.hipCenter.y} stroke="#38BDF8" strokeWidth="3.5" />

          {/* Shoulders */}
          <line x1={current.leftShoulder.x} y1={current.leftShoulder.y} x2={current.rightShoulder.x} y2={current.rightShoulder.y} stroke="#38BDF8" strokeWidth="3" />

          {/* Arms (Left) */}
          <line x1={current.leftShoulder.x} y1={current.leftShoulder.y} x2={current.leftElbow.x} y2={current.leftElbow.y} stroke="#BEF264" strokeWidth="3" />
          <line x1={current.leftElbow.x} y1={current.leftElbow.y} x2={current.leftWrist.x} y2={current.leftWrist.y} stroke="#BEF264" strokeWidth="3" />

          {/* Arms (Right) */}
          <line x1={current.rightShoulder.x} y1={current.rightShoulder.y} x2={current.rightElbow.x} y2={current.rightElbow.y} stroke="#BEF264" strokeWidth="3" />
          <line x1={current.rightElbow.x} y1={current.rightElbow.y} x2={current.rightWrist.x} y2={current.rightWrist.y} stroke="#BEF264" strokeWidth="3" />

          {/* Hips */}
          <line x1={current.leftHip.x} y1={current.leftHip.y} x2={current.rightHip.x} y2={current.rightHip.y} stroke="#38BDF8" strokeWidth="3" />

          {/* Legs (Left) */}
          <line x1={current.leftHip.x} y1={current.leftHip.y} x2={current.leftKnee.x} y2={current.leftKnee.y} stroke="#38BDF8" strokeWidth="3" />
          <line x1={current.leftKnee.x} y1={current.leftKnee.y} x2={current.leftAnkle.x} y2={current.leftAnkle.y} stroke="#38BDF8" strokeWidth="3" />

          {/* Legs (Right) */}
          <line x1={current.rightHip.x} y1={current.rightHip.y} x2={current.rightKnee.x} y2={current.rightKnee.y} stroke="#38BDF8" strokeWidth="3" />
          <line x1={current.rightKnee.x} y1={current.rightKnee.y} x2={current.rightAnkle.x} y2={current.rightAnkle.y} stroke="#38BDF8" strokeWidth="3" />

          {/* Illuminated Joint Nodes */}
          {[
            current.head,
            current.neck,
            current.leftShoulder,
            current.rightShoulder,
            current.leftElbow,
            current.rightElbow,
            current.leftWrist,
            current.rightWrist,
            current.leftHip,
            current.rightHip,
            current.leftKnee,
            current.rightKnee,
            current.leftAnkle,
            current.rightAnkle
          ].map((node, i) => (
            <g key={i}>
              <circle cx={node.x} cy={node.y} r="5" fill="#BEF264" />
              <circle cx={node.x} cy={node.y} r="9" fill="none" stroke="#BEF264" strokeWidth="1" opacity="0.6" />
            </g>
          ))}

          {/* Telemetry Annotations */}
          {showAngles && (
            <>
              {/* Elbow callout */}
              <text x={current.leftElbow.x - 45} y={current.leftElbow.y} fill="#BEF264" fontSize="10" fontFamily="monospace" fontWeight="bold">
                {current.elbowAngle}
              </text>
              {/* Head stability callout */}
              <text x={current.head.x + 18} y={current.head.y + 4} fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                Δ {current.headTilt}
              </text>
              {/* Bat speed callout */}
              <text x={current.batTip.x + 12} y={current.batTip.y} fill="#BEF264" fontSize="11" fontFamily="monospace" fontWeight="bold">
                {current.batSpeed}
              </text>
            </>
          )}
        </svg>

        {/* Phase Badge */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 border border-white/10 text-[10px] font-mono text-neutral-300">
          <span>PHASE: </span>
          <span className="text-[#BEF264] uppercase font-bold">{phase}</span>
        </div>
      </div>

      {/* Delivery Phase Step Bar */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        {(['stance', 'backlift', 'impact', 'follow'] as const).map((p) => {
          const isSelected = phase === p;
          return (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#BEF264] text-black font-extrabold shadow-sm'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white'
              }`}
            >
              {p.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
