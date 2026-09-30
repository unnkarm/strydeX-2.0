import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Layers,
  Target,
  Shield,
  Zap,
  Info,
  ChevronRight,
  Sparkles,
  BarChart3
} from 'lucide-react';

export type PitchViewMode = 'lengths' | 'shots' | 'fielding';

interface ZoneDetail {
  id: string;
  name: string;
  subtitle: string;
  stat1: { label: string; value: string };
  stat2: { label: string; value: string };
  stat3: { label: string; value: string };
  insight: string;
}

const BOWLING_LENGTH_DATA: Record<string, ZoneDetail> = {
  yorker: {
    id: 'yorker',
    name: 'Yorker Hole (0 - 2m from batting crease)',
    subtitle: 'Death Over Blockhole Vector',
    stat1: { label: 'Dot Ball %', value: '68.4%' },
    stat2: { label: 'Dismissal Rate', value: '18.2%' },
    stat3: { label: 'Economy', value: '4.80 rpo' },
    insight: 'Exceptional toe-crusher trajectory. High strike efficiency when aimed at base of off stump.'
  },
  full: {
    id: 'full',
    name: 'Full Pitch / Half Volley (2 - 6m)',
    subtitle: 'Drive Zone & Swing Extraction',
    stat1: { label: 'Drive Boundary %', value: '44.0%' },
    stat2: { label: 'Edge Induction', value: '26.8%' },
    stat3: { label: 'Economy', value: '8.40 rpo' },
    insight: 'Maximum conventional swing phase. Vulnerable to front-foot off-drives if seam deviates under 0.8°.'
  },
  good: {
    id: 'good',
    name: 'Good Length (6 - 8m)',
    subtitle: 'Corridor of Uncertainty (Highest Value)',
    stat1: { label: 'False Shot %', value: '38.6%' },
    stat2: { label: 'Play & Miss', value: '24.1%' },
    stat3: { label: 'Economy', value: '5.20 rpo' },
    insight: 'Forces batsman into two-mind decisions between front and back foot. Elite 4th-stump line conversion.'
  },
  short: {
    id: 'short',
    name: 'Back of Length (8 - 10m)',
    subtitle: 'Chest High Cross-Seam Jolt',
    stat1: { label: 'Pull Defense', value: '52.0%' },
    stat2: { label: 'Top-Edge %', value: '14.5%' },
    stat3: { label: 'Economy', value: '6.70 rpo' },
    insight: 'Hard to get under. Restricts front-foot boundaries while cramping the pull shot angle.'
  },
  bouncer: {
    id: 'bouncer',
    name: 'Bouncer / Helmet Trajectory (10m+)',
    subtitle: 'Short Pitch Intimidation',
    stat1: { label: 'Duck / Evade', value: '71.0%' },
    stat2: { label: 'Caught Deep', value: '22.0%' },
    stat3: { label: 'Release Speed', value: '138.4 kph' },
    insight: 'Used as surprise delivery. Head stability drops 32% under rapid 138kph+ bouncers.'
  }
};

const SHOT_ZONE_DATA: Record<string, ZoneDetail> = {
  cover: {
    id: 'cover',
    name: 'Cover Drive & Extra Cover',
    subtitle: 'Primary Boundary Sector (Off-Side)',
    stat1: { label: 'Runs Scored', value: '168 runs' },
    stat2: { label: 'Boundary Rate', value: '68%' },
    stat3: { label: 'Timing Quality', value: '94/100' },
    insight: 'Dominant high-elbow extension zone. 142kph bat speed with head locked directly over impact point.'
  },
  straight: {
    id: 'straight',
    name: 'Straight Drive & Long-On',
    subtitle: 'V-Channel Penetration',
    stat1: { label: 'Runs Scored', value: '124 runs' },
    stat2: { label: 'Boundary Rate', value: '52%' },
    stat3: { label: 'Timing Quality', value: '91/100' },
    insight: 'Clean straight face presented to pace deliveries. Minimum bat twist at point of contact.'
  },
  pull: {
    id: 'pull',
    name: 'Mid-Wicket & Cow Corner Pull',
    subtitle: 'High-Impact Power Zone',
    stat1: { label: 'Runs Scored', value: '186 runs' },
    stat2: { label: 'Boundary Rate', value: '74%' },
    stat3: { label: 'Avg Exit Speed', value: '148 kph' },
    insight: 'Maximum bottom-hand torque and fast hip rotation across short of length deliveries.'
  },
  cut: {
    id: 'cut',
    name: 'Point & Backward Point Cut',
    subtitle: 'Late Pace Utilization',
    stat1: { label: 'Runs Scored', value: '92 runs' },
    stat2: { label: 'Boundary Rate', value: '58%' },
    stat3: { label: 'Timing Quality', value: '88/100' },
    insight: 'Exploits room outside off-stump with sharp horizontal wrist snap and weight transferred back.'
  },
  legflick: {
    id: 'legflick',
    name: 'Fine Leg & Square Leg Glance',
    subtitle: 'Wristy Deflection Area',
    stat1: { label: 'Runs Scored', value: '112 runs' },
    stat2: { label: 'Boundary Rate', value: '46%' },
    stat3: { label: 'Timing Quality', value: '90/100' },
    insight: 'Effortless glance using bowler’s incoming pace against middle and leg deliveries.'
  }
};

const FIELDING_ZONE_DATA: Record<string, ZoneDetail> = {
  slips: {
    id: 'slips',
    name: 'Slip Cordon & Gully (1st, 2nd, Gully)',
    subtitle: 'Pace Catching Corridor',
    stat1: { label: 'Catches Taken', value: '14 catches' },
    stat2: { label: 'Catch Efficiency', value: '92%' },
    stat3: { label: 'Reaction Time', value: '0.24 sec' },
    insight: 'Soft hands posture with weight on balls of feet. Critical for new-ball seam movement.'
  },
  point: {
    id: 'point',
    name: 'Backward Point & Cover Ring',
    subtitle: '30-Yard Infield Reflex Unit',
    stat1: { label: 'Runs Saved', value: '48 runs' },
    stat2: { label: 'Direct Hits', value: '5 hits' },
    stat3: { label: 'Dive Radius', value: '2.4 meters' },
    insight: 'High lateral agility post. Cuts off sharp cuts and induces run-out hesitation.'
  },
  deepmid: {
    id: 'deepmid',
    name: 'Deep Mid-Wicket & Long-On Boundary',
    subtitle: 'High Aerial Interception Unit',
    stat1: { label: 'Catches on Rope', value: '8 catches' },
    stat2: { label: 'Boundary Saves', value: '19 saves' },
    stat3: { label: 'Relay Throw Time', value: '1.82 sec' },
    insight: 'Boundary awareness with athletic jump timing and boundary rope foot-awareness.'
  }
};

export const Pitch3D: React.FC = () => {
  const [viewMode, setViewMode] = useState<PitchViewMode>('lengths');
  const [selectedZone, setSelectedZone] = useState<string>('good');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // Get active detail card
  const activeDetail =
    viewMode === 'lengths'
      ? BOWLING_LENGTH_DATA[selectedZone] || BOWLING_LENGTH_DATA.good
      : viewMode === 'shots'
      ? SHOT_ZONE_DATA[selectedZone] || SHOT_ZONE_DATA.cover
      : FIELDING_ZONE_DATA[selectedZone] || FIELDING_ZONE_DATA.slips;

  return (
    <div className="rounded-3xl bg-[#09090C] border border-white/[0.08] p-5 sm:p-7 shadow-2xl relative overflow-hidden space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264] animate-pulse" />
            <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              Interactive 3D Pitch Kinematics
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/20">
              3D SPATIAL
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5 font-sans">
            Click pitch areas to inspect delivery line & length, shot execution, and field placement telemetry.
          </p>
        </div>

        {/* View Mode Tabs with Animated Layout Pill */}
        <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono self-start sm:self-auto">
          {[
            { id: 'lengths', label: 'Lengths & Line', icon: Target },
            { id: 'shots', label: 'Shot Zones', icon: Zap },
            { id: 'fielding', label: 'Field Positions', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = viewMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setViewMode(tab.id as PitchViewMode);
                  if (tab.id === 'lengths') setSelectedZone('good');
                  else if (tab.id === 'shots') setSelectedZone('cover');
                  else setSelectedZone('slips');
                }}
                className={`relative px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isActive ? 'text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="pitchTabIndicator"
                    className="absolute inset-0 bg-[#BEF264] rounded-lg -z-0 shadow-sm"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pitch Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive 3D Perspective Pitch Canvas (Span 7) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-[#06080E] border border-white/10 relative overflow-hidden select-none min-h-[380px]">
          {/* Turf Ambient Grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#BEF264 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

          {/* Perspective Container */}
          <div
            className="w-full max-w-sm relative transition-transform duration-500 ease-out"
            style={{
              perspective: '800px'
            }}
          >
            <div
              className="w-full relative rounded-2xl p-4 transition-all duration-300 shadow-2xl"
              style={{
                transform: 'rotateX(28deg) rotateZ(0deg)',
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(180deg, #1b2816 0%, #172412 100%)',
                border: '2px solid rgba(190, 242, 100, 0.25)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(190, 242, 100, 0.1)'
              }}
            >
              {/* Bowling End Crease & Stumps */}
              <div className="w-full flex items-center justify-center relative pb-3 pt-1 border-b border-white/30">
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 absolute left-2">
                  BOWLER END
                </span>
                {/* 3 Stumps */}
                <div className="flex gap-1.5 items-end h-5">
                  <div className="w-1 h-5 bg-[#E5C158] rounded-t-sm shadow-sm" />
                  <div className="w-1 h-5 bg-[#E5C158] rounded-t-sm shadow-sm" />
                  <div className="w-1 h-5 bg-[#E5C158] rounded-t-sm shadow-sm" />
                </div>
              </div>

              {/* Pitch Surface with Interactive Zones */}
              <div className="py-2 space-y-1.5 relative">
                {viewMode === 'lengths' && (
                  <>
                    {[
                      { id: 'bouncer', label: 'BOUNCER (10m+)', color: 'bg-red-500/20 hover:bg-red-500/30 border-red-500/40 text-red-300' },
                      { id: 'short', label: 'SHORT OF LENGTH (8-10m)', color: 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-300' },
                      { id: 'good', label: 'GOOD LENGTH (6-8m) · OPTIMAL', color: 'bg-[#BEF264]/25 hover:bg-[#BEF264]/35 border-[#BEF264] text-[#BEF264]' },
                      { id: 'full', label: 'FULL PITCH (2-6m)', color: 'bg-sky-500/20 hover:bg-sky-500/30 border-sky-500/40 text-sky-300' },
                      { id: 'yorker', label: 'YORKER BLOCKHOLE (0-2m)', color: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/40 text-purple-300' }
                    ].map((zone) => {
                      const isSelected = selectedZone === zone.id;
                      return (
                        <button
                          key={zone.id}
                          onClick={() => setSelectedZone(zone.id)}
                          onMouseEnter={() => setHoveredZone(zone.id)}
                          onMouseLeave={() => setHoveredZone(null)}
                          className={`w-full py-2.5 px-3 rounded-lg border text-center text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-between ${
                            zone.color
                          } ${isSelected ? 'ring-2 ring-white scale-[1.02] shadow-lg' : 'opacity-80'}`}
                        >
                          <span>{zone.label}</span>
                          {isSelected && <span className="text-white text-[10px]">SELECTED</span>}
                        </button>
                      );
                    })}
                  </>
                )}

                {viewMode === 'shots' && (
                  <div className="grid grid-cols-2 gap-2 py-2">
                    {[
                      { id: 'cover', label: 'Cover Drive (Off)', color: 'border-[#BEF264] text-[#BEF264] bg-[#BEF264]/20' },
                      { id: 'straight', label: 'Straight Drive (V)', color: 'border-sky-400 text-sky-300 bg-sky-500/20' },
                      { id: 'pull', label: 'Mid-Wicket Pull', color: 'border-amber-400 text-amber-300 bg-amber-500/20' },
                      { id: 'cut', label: 'Square Cut', color: 'border-purple-400 text-purple-300 bg-purple-500/20' },
                      { id: 'legflick', label: 'Fine Leg Glance', color: 'border-emerald-400 text-emerald-300 bg-emerald-500/20' }
                    ].map((shot) => {
                      const isSelected = selectedZone === shot.id;
                      return (
                        <button
                          key={shot.id}
                          onClick={() => setSelectedZone(shot.id)}
                          className={`p-3 rounded-xl border text-center text-xs font-mono font-bold transition-all cursor-pointer ${
                            shot.color
                          } ${isSelected ? 'ring-2 ring-white scale-105' : 'opacity-70'}`}
                        >
                          {shot.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {viewMode === 'fielding' && (
                  <div className="space-y-2 py-1">
                    {[
                      { id: 'slips', label: 'Slip Cordon & Gully (Pace Trap)', color: 'border-purple-400 text-purple-300 bg-purple-500/20' },
                      { id: 'point', label: 'Point & Infield Ring (Direct Hit)', color: 'border-[#BEF264] text-[#BEF264] bg-[#BEF264]/20' },
                      { id: 'deepmid', label: 'Deep Boundary Aerial Patrol', color: 'border-sky-400 text-sky-300 bg-sky-500/20' }
                    ].map((field) => {
                      const isSelected = selectedZone === field.id;
                      return (
                        <button
                          key={field.id}
                          onClick={() => setSelectedZone(field.id)}
                          className={`w-full p-3 rounded-xl border text-left text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-between ${
                            field.color
                          } ${isSelected ? 'ring-2 ring-white scale-[1.02]' : 'opacity-70'}`}
                        >
                          <span>{field.label}</span>
                          {isSelected && <span className="text-[10px] text-white">ACTIVE</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Batting End Crease & Stumps */}
              <div className="w-full flex items-center justify-center relative pt-3 pb-1 border-t border-white/40">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#BEF264] absolute right-2">
                  BATSMAN CREASE
                </span>
                {/* 3 Stumps */}
                <div className="flex gap-1.5 items-start h-5">
                  <div className="w-1 h-5 bg-[#E5C158] rounded-b-sm shadow-sm" />
                  <div className="w-1 h-5 bg-[#E5C158] rounded-b-sm shadow-sm" />
                  <div className="w-1 h-5 bg-[#E5C158] rounded-b-sm shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[10px] font-mono text-neutral-400 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#BEF264]" />
            <span>22 YARDS (20.12M) TURF MODEL · CALIBRATED SEAM BOUNCE VECTOR</span>
          </div>
        </div>

        {/* Right: Telemetry Inspector Card (Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDetail.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-[#121216] border border-white/10 space-y-4 shadow-xl"
            >
              <div>
                <span className="text-[10px] font-mono text-[#BEF264] uppercase tracking-wider block">
                  ZONE INSPECTION · TELEMETRY
                </span>
                <h4 className="text-base font-extrabold text-white tracking-tight mt-0.5">
                  {activeDetail.name}
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">{activeDetail.subtitle}</p>
              </div>

              {/* 3 KPI Telemetry Pills */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block truncate">
                    {activeDetail.stat1.label}
                  </span>
                  <span className="text-sm font-extrabold text-[#BEF264] font-mono mt-0.5 block">
                    {activeDetail.stat1.value}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block truncate">
                    {activeDetail.stat2.label}
                  </span>
                  <span className="text-sm font-extrabold text-white font-mono mt-0.5 block">
                    {activeDetail.stat2.value}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block truncate">
                    {activeDetail.stat3.label}
                  </span>
                  <span className="text-sm font-extrabold text-sky-400 font-mono mt-0.5 block">
                    {activeDetail.stat3.value}
                  </span>
                </div>
              </div>

              {/* AI Coaching Insight */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300 leading-relaxed font-sans flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#BEF264] shrink-0 mt-0.5" />
                <span>{activeDetail.insight}</span>
              </div>

              {/* Quick tip */}
              <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-between pt-1 border-t border-white/[0.06]">
                <span>MATCH SAMPLES: 32 INNINGS</span>
                <span className="text-[#BEF264]">CONFIDENCE 98.4%</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
