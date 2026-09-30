import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../layout/AppLayout';
import { Card3D } from '../ui/Card3D';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import {
  User,
  Share2,
  Edit3,
  Award,
  ShieldCheck,
  Video,
  Activity,
  Globe,
  MapPin,
  Calendar,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Trophy,
  Flame,
  Zap,
  Target,
  QrCode,
  Copy,
  Check,
  X
} from 'lucide-react';

export const AthleteProfile: React.FC = () => {
  const { user, stats, matches, videoSessions, setActiveModal, setActiveView, addNotification } = useApp();
  const [showShareCardModal, setShowShareCardModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedShotZone, setSelectedShotZone] = useState<string>('cover');
  const [selectedBadge, setSelectedBadge] = useState<{
    id: string;
    title: string;
    metric: string;
    desc: string;
    icon: any;
    criteria?: string;
  } | null>(null);
  const [hoveredMatchId, setHoveredMatchId] = useState<string | null>(null);

  const handleCopyCard = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    addNotification('Athlete Card Copied', 'Public dossier link copied to clipboard.');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <AppLayout
      title="Athlete Portfolio & Digital Card"
      subtitle="Comprehensive cricket profile, certified match telemetry, and scouting reel"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('public-profile')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#161F33] hover:bg-[#1E2942] text-slate-200 border border-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>Public Scout View</span>
          </button>

          <button
            onClick={() => setShowShareCardModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#161F33] hover:bg-[#1E2942] text-slate-200 border border-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#BEF264]" />
            <span>Shareable 3D Card</span>
          </button>

          <button
            onClick={() => setActiveView('onboarding')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#BEF264] hover:bg-[#aee750] text-black rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Profile Hero Header Card with 3D Tilt */}
        <Card3D intensity={8}>
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101626] via-[#0A0D15] to-[#06080E] border border-white/15 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Athlete Avatar with verified border */}
                <div className="relative">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#BEF264] shadow-xl"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-[#141B2D] to-[#1E2942] border-2 border-[#BEF264] flex items-center justify-center text-2xl font-extrabold text-[#BEF264] shadow-xl">
                      {user.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#BEF264] text-black flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tightest uppercase font-display">{user.name}</h2>
                    <span className="text-xs font-mono text-[#BEF264] bg-[#BEF264]/10 px-2.5 py-0.5 rounded-full font-bold">
                      @{user.username}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                      ID: {user.playerId || 'STX-8492'}
                    </span>
                    <span className="text-xs font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded">
                      {user.level}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-300">
                    {user.team} · <span className="text-slate-400 font-normal">{user.role}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                    <span>{user.battingStyle}</span>
                    <span>·</span>
                    <span>{user.bowlingStyle}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-[#BEF264]" />
                      {user.cityState || user.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Status & Link Badge */}
              <div className="flex flex-col sm:items-end gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#BEF264]" />
                  <span className="text-slate-300">Public Portfolio: </span>
                  <span className="text-[#BEF264] font-mono font-bold">
                    {user.publicProfile ? 'Active & Indexed' : 'Private'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">ID: {user.playerId || 'STX-8492'}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">{user.bio}</p>
            </div>
          </div>
        </Card3D>

        {/* Career Statistics Summary with Animated Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08]">
            <p className="text-[10px] uppercase font-mono text-slate-400">Total Runs</p>
            <p className="text-xl font-bold text-white font-mono mt-1 tabular-nums">
              <AnimatedCounter value={stats.totalRuns} />
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{stats.totalMatches} Matches</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08]">
            <p className="text-[10px] uppercase font-mono text-slate-400">Batting Average</p>
            <p className="text-xl font-bold text-[#BEF264] font-mono mt-1 tabular-nums">
              <AnimatedCounter value={stats.battingAvg} decimals={1} />
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Top-Order Anchor</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08]">
            <p className="text-[10px] uppercase font-mono text-slate-400">Strike Rate</p>
            <p className="text-xl font-bold text-sky-400 font-mono mt-1 tabular-nums">
              <AnimatedCounter value={stats.strikeRate} decimals={1} />
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Middle Overs Pace</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08]">
            <p className="text-[10px] uppercase font-mono text-slate-400">High Score</p>
            <p className="text-xl font-bold text-white font-mono mt-1 tabular-nums">
              <AnimatedCounter value={stats.highScore} />
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Campaign Peak</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08]">
            <p className="text-[10px] uppercase font-mono text-slate-400">Fielding Catches</p>
            <p className="text-xl font-bold text-emerald-400 font-mono mt-1 tabular-nums">
              <AnimatedCounter value={stats.totalCatches} />
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Slip Cordon Specialist</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08]">
            <p className="text-[10px] uppercase font-mono text-slate-400">Wickets</p>
            <p className="text-xl font-bold text-amber-400 font-mono mt-1 tabular-nums">
              <AnimatedCounter value={stats.totalWickets} />
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Pace / Seam</p>
          </div>
        </div>

        {/* Achievement Honors Badges with Scale Animation */}
        <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#BEF264]" />
              <h3 className="text-base font-extrabold text-white tracking-tight">Career Achievement Honors</h3>
            </div>
            <span className="text-[10px] font-mono text-[#BEF264]">4 CERTIFIED HONORS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: '1', title: 'Spin Destroyer', metric: '142.8 SR', desc: 'Maintained 140+ strike rate against spinners across 15 innings', icon: Zap },
              { id: '2', title: 'Corridor Master', metric: '94% Control', desc: 'Sub-millimeter leaving and defensive head stability on 4th stump', icon: ShieldCheck },
              { id: '3', title: 'Lightning Reflex', metric: '0.24s Catch', desc: 'Fastest slip reaction latency in regional club championship', icon: Flame },
              { id: '4', title: 'Death Over Finisher', metric: '186 Boundary', desc: 'High conversion death overs boundary rate in T20 tournaments', icon: Target }
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="p-4 rounded-xl bg-white/[0.02] hover:bg-[#BEF264]/5 border border-white/[0.08] hover:border-[#BEF264]/40 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center group-hover:bg-[#BEF264] group-hover:text-black transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#BEF264] bg-[#BEF264]/10 px-2 py-0.5 rounded">
                      {badge.metric}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#BEF264] transition-colors">{badge.title}</h4>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-snug">{badge.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Primary Goals & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Season Goals (Span 6) */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-xl font-black text-white uppercase font-display tracking-tight">Season Development Focus</h3>
              <span className="text-xs font-mono text-[#BEF264]">Active Campaign</span>
            </div>

            <div className="space-y-3">
              {user.primaryGoals.map((g, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#121216] border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-neutral-200 leading-snug">{g}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Coaches (Span 6) */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-xl font-black text-white uppercase font-display tracking-tight">Accredited Coaches & Academies</h3>
              <span className="text-xs font-mono text-sky-400">Verified Mentors</span>
            </div>

            <div className="space-y-3">
              {user.connectedCoaches.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl bg-[#141B2D] border border-white/5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{c.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#BEF264]" />
                    </p>
                    <p className="text-[11px] text-slate-400">{c.role} · {c.academy}</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Highlights Reel */}
        <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-bold text-white">Biomechanical Video Showcase</h3>
              <p className="text-xs text-slate-400">Analyzed batting drives, short-ball evades, and bowling releases</p>
            </div>
            <button
              onClick={() => setActiveView('video-analysis')}
              className="text-xs text-[#BEF264] hover:underline font-mono"
            >
              Open Video Lab
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoSessions.map((v) => (
              <div
                key={v.id}
                onClick={() => setActiveView('video-analysis')}
                className="p-4 rounded-xl bg-[#141B2D] border border-white/10 hover:border-[#BEF264]/40 transition-all cursor-pointer group"
              >
                <div className="h-32 rounded-lg bg-[#090D18] border border-white/5 flex items-center justify-center relative overflow-hidden mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#BEF264] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Video className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-slate-300">
                    {v.duration}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-[#BEF264]">{v.discipline}</span>
                    <span>{v.date}</span>
                  </div>
                  <p className="text-xs font-bold text-white group-hover:text-[#BEF264] transition-colors truncate">
                    {v.title}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Bat Speed: {v.metrics.batSpeedKph || v.metrics.deliverySpeedKph || 114} km/h
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Cricket Shot-Zone Wagon Wheel Visualization */}
        <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#BEF264]" />
                <h3 className="text-base font-extrabold text-white tracking-tight">Interactive Scoring Wagon Wheel</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">Click any ground sector to inspect boundary conversions, strike rates, and bat telemetry</p>
            </div>
            <span className="text-[10px] font-mono text-[#BEF264] bg-[#BEF264]/10 px-2.5 py-1 rounded-full border border-[#BEF264]/20 self-start sm:self-auto">
              RADIAL SECTOR TRACKER
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Radial Wagon Wheel SVG (Span 6) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-white/10 p-2 flex items-center justify-center bg-[#070A12] shadow-2xl">
                {/* Outfield Boundary Circles */}
                <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-12 rounded-full border border-dashed border-[#BEF264]/20 pointer-events-none" />
                <div className="absolute inset-24 rounded-full border border-white/10 pointer-events-none" />
                
                {/* Pitch Crease Center */}
                <div className="w-12 h-20 border border-[#BEF264]/50 rounded-sm bg-[#111A2E]/80 flex flex-col items-center justify-center z-10 pointer-events-none shadow-md">
                  <div className="w-6 h-0.5 bg-white/40 mb-3" />
                  <span className="text-[7px] font-mono text-[#BEF264] font-bold">PITCH</span>
                  <div className="w-6 h-0.5 bg-white/40 mt-3" />
                </div>

                {/* 6 Clickable Wagon Wheel Sector Buttons */}
                {[
                  { id: 'straight', label: 'Straight / Long-On', runs: 124, angle: '-top-2 left-1/2 -translate-x-1/2' },
                  { id: 'cover', label: 'Cover & Extra Cover', runs: 168, angle: 'top-10 left-3' },
                  { id: 'point', label: 'Point & Cut', runs: 94, angle: 'top-1/2 -left-3 -translate-y-1/2' },
                  { id: 'thirdman', label: 'Third Man', runs: 54, angle: 'bottom-8 left-4' },
                  { id: 'fineleg', label: 'Fine Leg / Hook', runs: 82, angle: 'bottom-8 right-4' },
                  { id: 'pull', label: 'Mid-Wicket & Cow Corner', runs: 186, angle: 'top-12 right-2' },
                ].map((sector) => {
                  const isSelected = selectedShotZone === sector.id;
                  return (
                    <button
                      key={sector.id}
                      onClick={() => setSelectedShotZone(sector.id)}
                      className={`absolute ${sector.angle} z-20 px-2.5 py-1 rounded-xl text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1.5 shadow-lg ${
                        isSelected
                          ? 'bg-[#BEF264] text-black font-extrabold ring-2 ring-[#BEF264]/50 scale-105'
                          : 'bg-[#121622]/90 hover:bg-[#182030] text-neutral-300 border border-white/10 hover:border-[#BEF264]/40'
                      }`}
                    >
                      <span>{sector.runs}r</span>
                      <span className="opacity-70 font-sans hidden sm:inline">{sector.id.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Sector Telemetry Detail (Span 6) */}
            <div className="lg:col-span-6 space-y-4">
              {(() => {
                const zoneMap: Record<string, { title: string; runs: number; boundaries: string; sr: number; exitVelo: string; insight: string }> = {
                  cover: {
                    title: 'Cover Drive & Extra Cover (Off-Side Arc)',
                    runs: 168,
                    boundaries: '68% (18 Fours, 4 Sixes)',
                    sr: 152.4,
                    exitVelo: '142.4 km/h',
                    insight: 'High-elbow vertical presentation. Exceptional head stability locked over ball impact.'
                  },
                  straight: {
                    title: 'Straight Drive & Long-On (V-Channel)',
                    runs: 124,
                    boundaries: '52% (12 Fours, 3 Sixes)',
                    sr: 138.2,
                    exitVelo: '138.0 km/h',
                    insight: 'Presented full face of the bat back down the ground. Minimum twist on contact.'
                  },
                  pull: {
                    title: 'Mid-Wicket & Cow Corner (Leg-Side Power Zone)',
                    runs: 186,
                    boundaries: '74% (16 Fours, 7 Sixes)',
                    sr: 172.6,
                    exitVelo: '148.2 km/h',
                    insight: 'Dominant horizontal bat arc. Fast wrist rotation generating explosive exit speeds.'
                  },
                  point: {
                    title: 'Backward Point & Square Cut',
                    runs: 94,
                    boundaries: '48% (10 Fours, 0 Sixes)',
                    sr: 124.0,
                    exitVelo: '132.0 km/h',
                    insight: 'Rolling wrists on short, wide deliveries. Keeps the ball firmly along the turf.'
                  },
                  fineleg: {
                    title: 'Fine Leg & Hook / Glance',
                    runs: 82,
                    boundaries: '42% (8 Fours, 1 Six)',
                    sr: 134.8,
                    exitVelo: '126.5 km/h',
                    insight: 'Soft hands using the pace of the bowler to deflect into deep vacant sectors.'
                  },
                  thirdman: {
                    title: 'Third Man & Glide Dabs',
                    runs: 54,
                    boundaries: '26% (4 Fours, 0 Sixes)',
                    sr: 112.5,
                    exitVelo: '118.0 km/h',
                    insight: 'Late open-face dab against 135kph+ pace bowling to steal strike rotation singles.'
                  }
                };
                const active = zoneMap[selectedShotZone] || zoneMap.cover;

                return (
                  <div className="p-5 rounded-2xl bg-[#0D1322] border border-[#BEF264]/30 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <h4 className="text-sm font-extrabold text-white font-mono">{active.title}</h4>
                      <span className="text-xs font-mono font-bold text-[#BEF264]">{active.runs} Career Runs</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center font-mono">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-[9px] text-neutral-400 block uppercase">Boundary %</span>
                        <span className="text-xs font-bold text-white mt-0.5 block">{active.boundaries.split(' ')[0]}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-[9px] text-neutral-400 block uppercase">Strike Rate</span>
                        <span className="text-xs font-bold text-sky-400 mt-0.5 block">{active.sr}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-[9px] text-neutral-400 block uppercase">Exit Speed</span>
                        <span className="text-xs font-bold text-[#BEF264] mt-0.5 block">{active.exitVelo}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed font-sans pt-1">
                      <strong className="text-white">Coach Kinematic Note: </strong>
                      {active.insight}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Animated Career Progression Timeline */}
        <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#BEF264]" />
              <h3 className="text-base font-extrabold text-white tracking-tight">Career Development Milestones</h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">CHRONOLOGICAL ROADMAP</span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#BEF264] via-sky-400 to-[#BEF264]/20">
            {[
              {
                year: '2026',
                badge: 'CURRENT CAMPAIGN',
                title: 'State Premier League Trials Shortlist',
                desc: 'Selected in the top 30 squad following a 42.5 tournament batting average and 94% defensive control rating.',
                highlight: true
              },
              {
                year: '2024',
                badge: 'LAB MILESTONE',
                title: 'StrydeX High-Speed Biomechanical Calibration',
                desc: 'Ingested 120 FPS camera telemetry: Bat swing exit velocity elevated from 106 to 118 kph with sub-millimeter head lock.',
                highlight: false
              },
              {
                year: '2023',
                badge: 'CAPTAINCY',
                title: 'District Championship Leadership & Golden Bat',
                desc: 'Appointed 1st XI District Captain. Scored 384 runs across 7 innings leading the team into the regional championship finals.',
                highlight: false
              },
              {
                year: '2022',
                badge: 'CENTURY',
                title: 'Maiden Multi-Day Century (114* off 168 balls)',
                desc: 'Anchored 4-day red-ball fixture against St. Peters with 16 boundary drives and zero false shots in the corridor.',
                highlight: false
              },
              {
                year: '2021',
                badge: 'DEBUT',
                title: 'Youth League Top Run-Scorer',
                desc: 'Finished youth campaign with 420 runs, earning formal nomination to the Regional High-Performance Academy.',
                highlight: false
              }
            ].map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Glowing Node Dot */}
                <div
                  className={`absolute -left-[27px] sm:-left-[35px] top-1 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                    milestone.highlight
                      ? 'bg-[#BEF264] border-black'
                      : 'bg-[#0E1322] border-[#BEF264] group-hover:bg-[#BEF264]'
                  }`}
                />

                <div className="p-4 rounded-xl bg-white/[0.02] hover:bg-[#BEF264]/5 border border-white/[0.06] hover:border-[#BEF264]/30 transition-all space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-extrabold text-[#BEF264]">{milestone.year}</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-neutral-300 font-semibold">
                      {milestone.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{milestone.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hover-Reveal Match Scorecard Cards */}
        <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">Recent Match Telemetry Cards</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Hover or tap any card to reveal full boundary breakdowns, balls faced, and video links</p>
            </div>
            <button
              onClick={() => setActiveView('performance')}
              className="text-xs text-[#BEF264] hover:underline font-mono"
            >
              All Match Logs
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.slice(0, 3).map((m) => {
              const isHovered = hoveredMatchId === m.id;
              const calculatedSR = m.ballsFaced > 0 ? ((m.runs / m.ballsFaced) * 100).toFixed(1) : '0';

              return (
                <div
                  key={m.id}
                  onMouseEnter={() => setHoveredMatchId(m.id)}
                  onMouseLeave={() => setHoveredMatchId(null)}
                  className="p-4 rounded-2xl bg-[#0E1322] border border-white/10 hover:border-[#BEF264]/50 transition-all cursor-pointer space-y-3 group shadow-lg"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#BEF264] font-bold">{m.format}</span>
                    <span className="text-neutral-400">{m.date}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#BEF264] transition-colors">{m.opponent}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">{m.result} · {m.notes || 'Innings Scorecard'}</p>
                  </div>

                  {/* Main Headline Stat */}
                  <div className="flex items-baseline justify-between pt-1 border-t border-white/[0.08]">
                    <div className="flex items-baseline gap-1.5 font-mono">
                      <span className="text-2xl font-black text-white">{m.runs}</span>
                      <span className="text-xs text-neutral-400">runs ({m.ballsFaced}b)</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#BEF264] bg-[#BEF264]/10 px-2 py-0.5 rounded">
                      SR {calculatedSR}
                    </span>
                  </div>

                  {/* Hover-Revealed Deep Performance Breakdown */}
                  <div className="pt-2 border-t border-white/[0.06] space-y-2 text-xs font-mono">
                    <div className="grid grid-cols-2 gap-2 text-neutral-300">
                      <div>Fours: <strong className="text-white">{m.fours}</strong></div>
                      <div>Sixes: <strong className="text-[#BEF264]">{m.sixes}</strong></div>
                      <div>Dismissal: <span className="text-neutral-400">{m.dismissal}</span></div>
                      <div>Wickets: <strong className="text-sky-400">{m.wickets || 0}</strong></div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveView('video-analysis');
                      }}
                      className="w-full mt-2 py-1.5 rounded-lg bg-white/[0.05] hover:bg-[#BEF264] hover:text-black text-neutral-200 text-[11px] font-mono font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Video className="w-3 h-3" />
                      <span>Review In Video Lab</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievement Honor Modal with Scale Animation */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-sm bg-[#0A0E18] border border-[#BEF264]/50 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black text-center space-y-4"
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#BEF264]/10 border-2 border-[#BEF264] text-[#BEF264] flex items-center justify-center shadow-md animate-pulse">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#BEF264] uppercase tracking-widest block font-bold">
                  VERIFIED ATHLETE HONOR
                </span>
                <h3 className="text-xl font-black text-white mt-1">{selectedBadge.title}</h3>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#BEF264]/15 border border-[#BEF264]/30 text-xs font-mono font-bold text-[#BEF264]">
                  {selectedBadge.metric}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2.5 p-2 rounded-xl bg-white/[0.04] border border-white/5">
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#BEF264]"
                />
                <span className="text-xs text-white font-semibold">{user.name}</span>
                <span className="text-[10px] text-neutral-400 font-mono">#{user.jerseyNumber} · {user.role}</span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-sans">{selectedBadge.desc}</p>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 text-[11px] font-mono text-neutral-400">
                <span>Certified by StrydeX Biomechanical Engine · Tamper Proof Dossier</span>
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="w-full py-2.5 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-bold font-mono transition-colors cursor-pointer"
              >
                Close Verification
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Shareable 3D Athlete Card Modal */}
      <AnimatePresence>
        {showShareCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-[#090C14] border border-[#BEF264]/40 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black overflow-hidden space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowShareCardModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono text-[#BEF264] uppercase tracking-widest block">
                  CERTIFIED CRICKET DOSSIER
                </span>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Shareable Athlete Card
                </h3>
              </div>

              {/* Holographic Athlete Card Preview */}
              <div className="rounded-2xl p-5 bg-gradient-to-b from-[#141B2D] via-[#0E1320] to-[#070910] border border-white/20 relative overflow-hidden shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-white">Stryde<span className="text-[#BEF264]">X</span></span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#BEF264]/15 text-[#BEF264]">
                      SCOUT VERIFIED
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">ID: {user.playerId || 'STX-8492'}</span>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={user.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-[#BEF264] shadow-md shrink-0"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white">{user.name}</h4>
                    <p className="text-xs text-[#BEF264] font-mono">@{user.username}</p>
                    <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                      {user.role} · {user.level} · {user.battingStyle}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 relative z-10 text-center font-mono">
                  <div className="p-2 rounded-lg bg-white/[0.04]">
                    <span className="text-[9px] text-neutral-500 block">AVG</span>
                    <span className="text-xs font-bold text-white">{stats.battingAvg}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.04]">
                    <span className="text-[9px] text-neutral-500 block">SR</span>
                    <span className="text-xs font-bold text-sky-400">{stats.strikeRate}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.04]">
                    <span className="text-[9px] text-neutral-500 block">HIGH</span>
                    <span className="text-xs font-bold text-[#BEF264]">{stats.highScore}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1 relative z-10">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#BEF264]" />
                    {user.cityState || user.location}
                  </span>
                  <span className="text-emerald-400">STATUS: MATCH READY</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyCard}
                  className="flex-1 py-3 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Dossier Link'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowShareCardModal(false)}
                  className="px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-mono border border-white/10 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};
