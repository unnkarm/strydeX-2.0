import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../layout/AppLayout';
import { VideoAnalysisItem } from '../../types';
import { ThreeCricketBall } from '../3d/ThreeCricketBall';
import { SkeletonPose3D } from '../3d/SkeletonPose3D';
import { Card3D } from '../ui/Card3D';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import {
  Video,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Eye,
  EyeOff,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Layers,
  MessageSquare,
  ChevronRight,
  Maximize2,
  ZoomIn,
  Compass,
  Sliders,
  SplitSquareVertical,
  Activity,
  Scan,
  Zap,
  Flame,
  Check
} from 'lucide-react';

export const VideoAnalysis: React.FC = () => {
  const { videoSessions, currentVideoId, setCurrentVideoId, setActiveModal, user } = useApp();

  const currentSession = videoSessions.find((s) => s.id === currentVideoId) || videoSessions[0];

  // Analysis mode: Video Tracking vs 3D Seam Kinematics vs 3D Skeleton Pose
  const [analysisMode, setAnalysisMode] = useState<'video' | 'seam-3d' | 'skeleton-3d'>('video');

  // Video Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(28);
  const totalFrames = 120;
  const [playbackSpeed, setPlaybackSpeed] = useState<0.25 | 0.5 | 1>(0.5);
  const [showOverlays, setShowOverlays] = useState(true);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(0);
  const [zoomMode, setZoomMode] = useState(false);

  // Before / After Split Comparison Slider State
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [splitSliderPos, setSplitSliderPos] = useState(50); // percentage 0 - 100
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // AI Telemetry Processing Simulation State
  const [isProcessingTelemetry, setIsProcessingTelemetry] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);

  const processingStages = [
    'INGESTING HIGH-SPEED 240FPS SENSOR FEED...',
    'DETECTING 17 KINETIC POSE LANDMARKS...',
    'ISOLATING WRIST ACCELERATION & BAT VELOCITY...',
    'CROSS-REFERENCING MCC BIOMECHANICAL NORMS...',
    'TELEMETRY MATRIX SYNCHRONIZED.'
  ];

  // Trigger simulated laboratory scan sequence
  const handleTriggerReScan = () => {
    setIsProcessingTelemetry(true);
    setProcessingStage(0);

    const interval = setInterval(() => {
      setProcessingStage((prev) => {
        if (prev >= processingStages.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsProcessingTelemetry(false), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev >= totalFrames) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / (30 * playbackSpeed));
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentFrame((prev) => Math.min(totalFrames, prev + 1));
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    setCurrentFrame((prev) => Math.max(0, prev - 1));
  };

  const jumpToTime = (timeStr: string, index: number) => {
    setIsPlaying(false);
    setSelectedPhaseIndex(index);
    const parts = timeStr.split(':');
    const seconds = parseFloat(parts[1] || '1');
    const targetFrame = Math.min(totalFrames, Math.round(seconds * 24));
    setCurrentFrame(targetFrame);
  };

  // Split Comparison Slider Drag Handler
  const handleSliderPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingSlider || !splitContainerRef.current) return;
    const rect = splitContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSplitSliderPos(percent);
  };

  return (
    <AppLayout
      title="AI Biomechanical Video Analysis"
      subtitle="Frame-synchronized skeletal posture, bat arc geometry, and delivery release kinematics"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerReScan}
            disabled={isProcessingTelemetry}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold bg-[#121216] hover:bg-[#181820] text-[#BEF264] border border-[#BEF264]/30 rounded-lg transition-colors cursor-pointer"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>{isProcessingTelemetry ? 'Scanning...' : 'Re-Run AI Scan'}</span>
          </button>

          <button
            onClick={() => setActiveModal('upload-video')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#BEF264] hover:bg-[#aee750] text-black rounded-lg transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Clip</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Mode Switcher: Video Biomechanics vs 3D Seam vs 3D Pose */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-1.5 rounded-2xl bg-[#09090C] border border-white/[0.08]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setAnalysisMode('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                analysisMode === 'video'
                  ? 'bg-[#181820] text-white border border-white/15 shadow-sm shadow-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-[#BEF264]" />
              <span>120 FPS Video Scrubber</span>
            </button>

            <button
              onClick={() => setAnalysisMode('seam-3d')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                analysisMode === 'seam-3d'
                  ? 'bg-[#181820] text-white border border-white/15 shadow-sm shadow-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#BEF264]" />
              <span>3D Seam Kinematics</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#BEF264]/15 text-[#BEF264] font-bold">3D</span>
            </button>

            <button
              onClick={() => setAnalysisMode('skeleton-3d')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                analysisMode === 'skeleton-3d'
                  ? 'bg-[#181820] text-white border border-white/15 shadow-sm shadow-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span>3D Skeleton Pose</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 font-bold">LAB</span>
            </button>
          </div>

          <div className="flex items-center gap-3 px-3 text-[11px] font-mono text-neutral-400">
            <button
              onClick={() => setIsSplitMode(!isSplitMode)}
              className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSplitMode
                  ? 'bg-[#BEF264]/15 text-[#BEF264] border-[#BEF264]'
                  : 'bg-white/[0.04] text-neutral-300 border-white/10 hover:text-white'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>Split Comparison Slider</span>
            </button>
          </div>
        </div>

        {/* 3D Skeleton Pose Mode */}
        {analysisMode === 'skeleton-3d' ? (
          <div className="space-y-6">
            <SkeletonPose3D />
          </div>
        ) : analysisMode === 'seam-3d' ? (
          /* 3D Seam Kinematics Mode */
          <div className="space-y-6">
            <ThreeCricketBall className="min-h-[500px] shadow-2xl" />
          </div>
        ) : (
          /* Standard Biomechanical Video Player Workspace */
          <>
            {/* Session selector pills with active glow */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08]">
              <span className="text-xs font-mono text-neutral-400 shrink-0">Recorded Sessions:</span>
              {videoSessions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setCurrentVideoId(v.id);
                    setCurrentFrame(24);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer border ${
                    v.id === currentSession.id
                      ? 'bg-[#181820] border-[#BEF264] text-white font-semibold shadow-sm'
                      : 'bg-[#0E0E12] border-white/5 text-neutral-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {v.title} · <span className="font-mono text-[#BEF264]">{v.discipline}</span>
                </button>
              ))}
            </div>

            {/* Video Player & Biomechanics Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Video Viewport & Frame Scrubber (Span 7) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl bg-[#09090C] border border-white/15 overflow-hidden shadow-2xl transition-all">
                  {/* Top Viewport Status Header */}
                  <div className="px-4 py-2.5 bg-[#070A12] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={user.name}
                        className="w-5 h-5 rounded-full object-cover border border-[#BEF264]"
                      />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
                      <span className="text-white font-semibold">{currentSession.title}</span>
                      {isSplitMode && (
                        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px]">
                          SPLIT COMPARISON
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span>FRAME {currentFrame}/{totalFrames}</span>
                      <span>·</span>
                      <span className="text-[#BEF264]">{(currentFrame / 24).toFixed(2)}s</span>
                      <button
                        onClick={() => setZoomMode(!zoomMode)}
                        className={`p-1 rounded transition-colors ${zoomMode ? 'bg-[#BEF264] text-black' : 'text-neutral-400 hover:text-white'}`}
                        title="Zoom Stance Details"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Processing Telemetry Overlay Banner */}
                  {isProcessingTelemetry && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 space-y-4 text-center"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#BEF264]/10 border border-[#BEF264] flex items-center justify-center text-[#BEF264] animate-spin">
                        <Scan className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#BEF264] uppercase tracking-widest">
                          STRYDEX COMPUTER VISION ENGINE
                        </span>
                        <h4 className="text-sm font-bold text-white font-mono">
                          {processingStages[processingStage]}
                        </h4>
                      </div>
                      <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#BEF264] transition-all duration-300"
                          style={{ width: `${((processingStage + 1) / processingStages.length) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* The Video Display Area with Biomechanical Skeletal Simulation */}
                  <div
                    ref={splitContainerRef}
                    onPointerMove={handleSliderPointerMove}
                    onPointerUp={() => setIsDraggingSlider(false)}
                    className={`relative h-80 sm:h-96 w-full bg-[#080C14] flex items-center justify-center overflow-hidden select-none transition-transform duration-300 ${
                      zoomMode ? 'scale-125 origin-center' : 'scale-100'
                    }`}
                  >
                    {/* Turf Matrix Background Pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="turfPattern2" width="24" height="24" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="24" x2="24" y2="0" stroke="#BEF264" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#turfPattern2)" />
                    </svg>

                    {/* Animated Scanning Laser Line */}
                    <div
                      className="absolute inset-y-0 w-0.5 bg-[#BEF264] pointer-events-none z-20 animate-pulse"
                      style={{
                        left: `${(currentFrame / totalFrames) * 100}%`,
                        transition: isPlaying ? 'none' : 'left 0.1s ease-out'
                      }}
                    >
                      <div className="absolute top-2 -left-12 px-1.5 py-0.5 rounded bg-black/80 border border-[#BEF264] text-[9px] font-mono text-[#BEF264] whitespace-nowrap">
                        LASER SCAN
                      </div>
                    </div>

                    {/* Pitch Crease Lines */}
                    <div className="absolute inset-x-8 bottom-10 h-0.5 bg-white/20" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-44 h-14 border-t-2 border-l-2 border-r-2 border-[#BEF264]/30" />

                    {/* Dynamic Biomechanical Kinematic Calculations */}
                    {(() => {
                      const progress = currentFrame / totalFrames;
                      const headX = 220 + Math.sin(progress * Math.PI) * 15;
                      const headY = 95 + Math.cos(progress * Math.PI) * 5;
                      const handX = 200 + progress * 60;
                      const handY = 160 + Math.sin(progress * Math.PI) * 20;
                      const batTipX = handX + 60 * Math.cos(progress * 1.5);
                      const batTipY = handY + 50 * Math.sin(progress * 1.5);
                      const frontFootX = 250 + progress * 20;
                      const frontFootY = 270;

                      return (
                        <svg viewBox="0 0 500 340" className="w-full h-full relative z-10 p-4 pointer-events-none">
                          {/* Motion Trail (Bat Swing Arc) */}
                          <path
                            d={`M 170 90 Q 240 ${130 + progress * 25} ${batTipX} ${batTipY}`}
                            fill="none"
                            stroke="#BEF264"
                            strokeWidth="3"
                            strokeDasharray="4 4"
                            opacity={showOverlays ? 0.8 : 0}
                          />

                          {/* Stride Length Indicator Line */}
                          {showOverlays && (
                            <>
                              <line x1="170" y1="275" x2={frontFootX} y2="275" stroke="#38BDF8" strokeWidth="2" />
                              <text
                                x={(170 + frontFootX) / 2}
                                y="292"
                                fill="#38BDF8"
                                fontSize="10"
                                fontFamily="monospace"
                                textAnchor="middle"
                              >
                                STRIDE: {(1.2 + progress * 0.35).toFixed(2)}m
                              </text>
                            </>
                          )}

                          {/* Skeletal Player Silhouette and Connected Bones */}
                          {/* Torso & Head */}
                          <circle cx={headX} cy={headY} r="18" fill="#141B2D" stroke={showOverlays ? '#BEF264' : '#64748B'} strokeWidth="2" />
                          <line x1={headX} y1={headY + 18} x2={headX - 10} y2="180" stroke={showOverlays ? '#BEF264' : '#64748B'} strokeWidth="4" />

                          {/* Arms & Bat */}
                          <line x1={headX - 5} y1="120" x2={handX} y2={handY} stroke={showOverlays ? '#BEF264' : '#64748B'} strokeWidth="3" />
                          <line x1={handX} y1={handY} x2={batTipX} y2={batTipY} stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />

                          {/* Legs */}
                          <line x1={headX - 10} y1="180" x2="170" y2="270" stroke={showOverlays ? '#38BDF8' : '#64748B'} strokeWidth="4" />
                          <line x1={headX - 10} y1="180" x2={frontFootX} y2={frontFootY} stroke={showOverlays ? '#38BDF8' : '#64748B'} strokeWidth="4" />

                          {/* Overlays: Joint Nodes & Dynamic Annotations */}
                          {showOverlays && (
                            <>
                              {/* Joint Node Circles */}
                              <circle cx={headX} cy={headY} r="4" fill="#BEF264" />
                              <circle cx={handX} cy={handY} r="5" fill="#BEF264" />
                              <circle cx={frontFootX} cy={frontFootY} r="4" fill="#38BDF8" />
                              <circle cx="170" cy="270" r="4" fill="#38BDF8" />

                              {/* Head stability label */}
                              <text x={headX + 22} y={headY} fill="#BEF264" fontSize="10" fontFamily="monospace" fontWeight="bold">
                                HEAD STABILITY: 94/100
                              </text>

                              {/* Bat Speed Callout */}
                              <text x={batTipX + 10} y={batTipY} fill="#F59E0B" fontSize="11" fontFamily="monospace" fontWeight="bold">
                                {Math.round(85 + progress * 58)} KPH
                              </text>
                            </>
                          )}
                        </svg>
                      );
                    })()}

                    {/* Interactive Split Comparison Slider Divider Handle */}
                    {isSplitMode && (
                      <div
                        className="absolute inset-y-0 z-30 flex items-center justify-center cursor-ew-resize group"
                        style={{ left: `${splitSliderPos}%` }}
                        onPointerDown={(e) => {
                          e.preventDefault();
                          setIsDraggingSlider(true);
                        }}
                      >
                        <div className="w-1 h-full bg-[#BEF264]" />
                        <div className="w-8 h-8 rounded-full bg-[#BEF264] text-black font-extrabold flex items-center justify-center shadow-xl shadow-black/80 scale-100 group-hover:scale-110 transition-transform">
                          <Sliders className="w-4 h-4" />
                        </div>
                        {/* Tags */}
                        <span className="absolute -top-7 -left-20 px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[9px] font-mono text-neutral-300">
                          RAW CAM
                        </span>
                        <span className="absolute -top-7 -right-22 px-2 py-0.5 rounded bg-black/90 border border-[#BEF264]/40 text-[9px] font-mono text-[#BEF264]">
                          AI OVERLAY
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Player Scrubber & Transport Controls Bar */}
                  <div className="p-4 bg-[#09090C] border-t border-white/10 space-y-3">
                    {/* Frame Progress Bar with phase markers */}
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max={totalFrames}
                        value={currentFrame}
                        onChange={(e) => {
                          setIsPlaying(false);
                          setCurrentFrame(parseInt(e.target.value));
                        }}
                        className="w-full h-2 bg-[#161F33] rounded-lg appearance-none cursor-pointer accent-[#BEF264]"
                      />
                      {/* Phase Keyframe Markers */}
                      <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
                        <button onClick={() => setCurrentFrame(10)} className="hover:text-[#BEF264] cursor-pointer">
                          | Stance
                        </button>
                        <button onClick={() => setCurrentFrame(35)} className="hover:text-[#BEF264] cursor-pointer">
                          | Backlift
                        </button>
                        <button onClick={() => setCurrentFrame(65)} className="hover:text-[#BEF264] cursor-pointer">
                          | Impact
                        </button>
                        <button onClick={() => setCurrentFrame(100)} className="hover:text-[#BEF264] cursor-pointer">
                          | Follow
                        </button>
                      </div>
                    </div>

                    {/* Button Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-2.5 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black font-bold transition-all shadow-md cursor-pointer"
                        >
                          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        </button>
                        <button
                          onClick={handleStepBackward}
                          className="p-2 rounded-lg bg-white/[0.04] text-neutral-400 hover:text-white"
                          title="Previous Frame"
                        >
                          <Rewind className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleStepForward}
                          className="p-2 rounded-lg bg-white/[0.04] text-neutral-400 hover:text-white"
                          title="Next Frame"
                        >
                          <FastForward className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCurrentFrame(0)}
                          className="p-2 rounded-lg bg-white/[0.04] text-neutral-400 hover:text-white"
                          title="Reset"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Playback Speed Chips */}
                      <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-lg text-xs font-mono">
                        {([0.25, 0.5, 1] as const).map((spd) => (
                          <button
                            key={spd}
                            onClick={() => setPlaybackSpeed(spd)}
                            className={`px-2 py-0.5 rounded transition-colors ${
                              playbackSpeed === spd ? 'bg-[#BEF264] text-black font-bold' : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>

                      {/* Toggle Overlays */}
                      <button
                        onClick={() => setShowOverlays(!showOverlays)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                          showOverlays
                            ? 'bg-[#BEF264]/10 text-[#BEF264] border-[#BEF264]/30'
                            : 'bg-white/[0.04] text-neutral-400 border-white/10'
                        }`}
                      >
                        {showOverlays ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>AI HUD</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biomechanical Telemetry & Coach Notes (Span 5) */}
              <div className="lg:col-span-5 space-y-4">
                {/* 4 Telemetry Metrics Cards with Staggered Entrance */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[#09090C] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Bat Speed at Impact</span>
                    <div className="flex items-baseline gap-1 text-2xl font-bold font-mono text-[#BEF264]">
                      <AnimatedCounter value={currentSession.metrics.batSpeedKph || 141.2} />
                      <span className="text-xs text-neutral-400">kph</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Top 5% for club level</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090C] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Backlift Angle</span>
                    <div className="flex items-baseline gap-1 text-2xl font-bold font-mono text-sky-400">
                      <AnimatedCounter value={currentSession.metrics.backliftAngleDeg || 38.4} decimals={1} />
                      <span className="text-xs text-neutral-400">deg</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">Tilted towards 2nd slip</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090C] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Head Balance Score</span>
                    <div className="flex items-baseline gap-1 text-2xl font-bold font-mono text-white">
                      <AnimatedCounter value={currentSession.metrics.headStabilityScore || 94} />
                      <span className="text-xs text-neutral-400">/100</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Locked through impact</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090C] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Impact Timing Window</span>
                    <div className="flex items-baseline gap-1 text-2xl font-bold font-mono text-purple-400">
                      <AnimatedCounter value={currentSession.metrics.impactTimingMs || 12} />
                      <span className="text-xs text-neutral-400">ms</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">Sub-millisecond middle</span>
                  </div>
                </div>

                {/* Key Observations List */}
                <div className="p-5 rounded-2xl bg-[#09090C] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Kinetic Observations ({currentSession.observations.length})
                    </span>
                    <span className="text-[10px] font-mono text-[#BEF264]">AI CALIBRATED</span>
                  </div>

                  <div className="space-y-2">
                    {currentSession.observations.map((obs, idx) => (
                      <div
                        key={idx}
                        onClick={() => jumpToTime(obs.frameTime, idx)}
                        className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] cursor-pointer transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{obs.title}</span>
                          <span className="text-[10px] font-mono text-[#BEF264]">{obs.frameTime}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-snug">{obs.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coach Feedback Box */}
                {currentSession.coachFeedback && (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#121622] to-[#0A0D14] border border-[#BEF264]/20 space-y-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#BEF264]" />
                      <span className="text-xs font-bold text-white font-mono">
                        {currentSession.coachFeedback.coachName}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono ml-auto">
                        {currentSession.coachFeedback.date}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 italic">
                      "{currentSession.coachFeedback.comment}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};
