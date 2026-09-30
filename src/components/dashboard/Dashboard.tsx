import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../layout/AppLayout';
import { PERFORMANCE_TRENDS } from '../../lib/mock-data';
import { TimeRange } from '../../types';
import { Card3D } from '../ui/Card3D';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import {
  TrendingUp,
  Activity,
  Video,
  Plus,
  ArrowUpRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award,
  Zap,
  Target
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    user,
    setActiveView,
    setActiveModal,
    matches,
    videoSessions,
    goals,
    drills,
    stats,
    timeFilter,
    setTimeFilter
  } = useApp();

  const [activeMetricTab, setActiveMetricTab] = useState<'avg' | 'sr' | 'runs'>('avg');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ date: string; value: number } | null>(null);

  // Get trend data for the selected timeframe
  const currentTrend = PERFORMANCE_TRENDS[timeFilter] || PERFORMANCE_TRENDS['30D'];

  // SVG Chart Calculations
  const chartHeight = 180;
  const chartWidth = 600;
  const paddingX = 40;
  const paddingY = 25;

  const dataValues = currentTrend.map((d) =>
    activeMetricTab === 'avg' ? d.avg : activeMetricTab === 'sr' ? d.sr : d.runs
  );
  const minVal = Math.floor(Math.min(...dataValues) * 0.9);
  const maxVal = Math.ceil(Math.max(...dataValues) * 1.1) || 100;

  const points = currentTrend.map((d, i) => {
    const x = paddingX + (i / (currentTrend.length - 1 || 1)) * (chartWidth - paddingX * 2);
    const val = activeMetricTab === 'avg' ? d.avg : activeMetricTab === 'sr' ? d.sr : d.runs;
    const y = chartHeight - paddingY - ((val - minVal) / (maxVal - minVal || 1)) * (chartHeight - paddingY * 2);
    return { x, y, date: d.date, val };
  });

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  const areaD = `${pathD} L ${points[points.length - 1]?.x} ${chartHeight - paddingY} L ${points[0]?.x} ${chartHeight - paddingY} Z`;

  return (
    <AppLayout
      title={`Good morning, ${user.name.split(' ')[0]}.`}
      subtitle="Here's how your game is progressing across your latest competitive matches and net sessions."
      actions={
        <div className="flex items-center gap-1.5 p-1 bg-[#121216] rounded-xl border border-white/10 text-xs font-mono">
          {(['7D', '30D', '90D', 'All Time'] as TimeRange[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFilter(tf)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                timeFilter === tf
                  ? 'bg-[#BEF264] text-black font-extrabold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Athlete Identity Summary Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#09090C] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={user.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-[#BEF264]/40 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-extrabold text-white">{user.name}</span>
                <span className="text-xs text-[#BEF264] font-mono">@{user.username}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-neutral-300">
                  ID: {user.playerId || 'STX-8492'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/20">
                  {user.role}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-neutral-300">
                  {user.level}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                {user.battingStyle} · {user.bowlingStyle} · {user.cityState || user.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setActiveView('onboarding')}
              className="px-3.5 py-2 rounded-xl bg-[#BEF264]/10 hover:bg-[#BEF264]/20 text-[#BEF264] border border-[#BEF264]/30 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Edit Player Identity & Onboarding</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 KPI Cards with 3D Tilt and Animated Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Batting Average */}
          <Card3D intensity={10}>
            <div className="p-5 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/20 transition-all h-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Batting Average</span>
                <span className="w-2 h-2 rounded-full bg-[#BEF264] animate-pulse" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tightest">
                  <AnimatedCounter value={stats.battingAvg} decimals={1} />
                </span>
                <span className="text-xs text-neutral-500 font-mono">runs / out</span>
              </div>
              <div className="mt-2 text-xs text-[#BEF264] flex items-center gap-1 font-mono">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+3.9 vs season baseline</span>
              </div>
            </div>
          </Card3D>

          {/* 2. Strike Rate */}
          <Card3D intensity={10}>
            <div className="p-5 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/20 transition-all h-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Strike Rate</span>
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tightest">
                  <AnimatedCounter value={stats.strikeRate} decimals={1} />
                </span>
                <span className="text-xs text-neutral-500 font-mono">per 100 balls</span>
              </div>
              <div className="mt-2 text-xs text-[#38BDF8] flex items-center gap-1 font-mono">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>64% powerplay boundary rate</span>
              </div>
            </div>
          </Card3D>

          {/* 3. Total Runs */}
          <Card3D intensity={10}>
            <div className="p-5 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/20 transition-all h-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Total Runs</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tightest">
                  <AnimatedCounter value={stats.totalRuns} />
                </span>
                <span className="text-xs text-neutral-500 font-mono">{stats.totalMatches} matches</span>
              </div>
              <div className="mt-2 text-xs text-neutral-400 font-mono">
                High Score: <strong className="text-white">{stats.highScore}</strong> (Red Ball)
              </div>
            </div>
          </Card3D>

          {/* 4. Training Sessions */}
          <Card3D intensity={10}>
            <div className="p-5 rounded-2xl bg-[#09090C] border border-white/[0.08] hover:border-white/20 transition-all h-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Training Sessions</span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tightest">
                  <AnimatedCounter value={18} />
                </span>
                <span className="text-xs text-neutral-500 font-mono">this campaign</span>
              </div>
              <div className="mt-2 text-xs text-amber-400 flex items-center gap-1 font-mono">
                <Flame className="w-3.5 h-3.5" />
                <span>94% weekly drill consistency</span>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Development Insights Card with 3D sheen */}
        <Card3D intensity={6}>
          <div className="p-5 rounded-2xl bg-[#09090C] border border-[#BEF264]/30 shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center shrink-0 border border-[#BEF264]/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase font-mono tracking-wider text-[#BEF264]">
                      AI Biomechanical Observation
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                      CALIBRATED 120 FPS
                    </span>
                  </div>
                  <p className="text-sm text-neutral-200 leading-relaxed max-w-3xl font-sans">
                    "Your scoring rate against spin has improved across your last five recorded sessions. Head position during the back-foot punch is stabilizing 42ms earlier on impact."
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveView('video-analysis')}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#BEF264] hover:text-black text-white text-xs font-semibold whitespace-nowrap border border-white/10 hover:border-[#BEF264] transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>View Video Breakdown</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Card3D>

        {/* Performance Trend Chart + Quick Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Section (Span 8) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tightest">Performance Telemetry Progression</h3>
                <p className="text-xs text-neutral-400 font-sans">Progression tracked across {timeFilter} timeframe</p>
              </div>

              {/* Metric Selector Tabs with Animated Shared Layout */}
              <div className="flex items-center gap-1 p-1 bg-[#121216] rounded-xl border border-white/10 text-xs font-mono relative">
                {[
                  { id: 'avg', label: 'Batting Avg' },
                  { id: 'sr', label: 'Strike Rate' },
                  { id: 'runs', label: 'Match Runs' }
                ].map((tab) => {
                  const isActive = activeMetricTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveMetricTab(tab.id as 'avg' | 'sr' | 'runs')}
                      className={`relative px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        isActive ? 'text-black font-extrabold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="dashboardMetricTabIndicator"
                          className="absolute inset-0 bg-[#BEF264] rounded-lg -z-0 shadow-sm"
                          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Responsive Self-Drawing SVG Chart */}
            <div className="relative w-full my-4">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-48 overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#BEF264" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#BEF264" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Subtle horizontal grid lines */}
                {[0.25, 0.5, 0.75].map((pct, idx) => {
                  const yPos = paddingY + pct * (chartHeight - paddingY * 2);
                  return (
                    <line
                      key={idx}
                      x1={paddingX}
                      y1={yPos}
                      x2={chartWidth - paddingX}
                      y2={yPos}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Shaded Area Fill */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Main Curve Stroke with Self-Drawing Motion */}
                <motion.path
                  key={`${activeMetricTab}-${timeFilter}`}
                  d={pathD}
                  fill="none"
                  stroke="#BEF264"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Interactive Points */}
                {points.map((p, idx) => (
                  <g key={idx} className="cursor-pointer">
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4.5"
                      fill="#0D1322"
                      stroke="#BEF264"
                      strokeWidth="2"
                      className="hover:scale-150 transition-transform origin-center"
                      onMouseEnter={() => setHoveredDataPoint({ date: p.date, value: p.val })}
                      onMouseLeave={() => setHoveredDataPoint(null)}
                    />
                    <text
                      x={p.x}
                      y={chartHeight - 6}
                      fill="#64748B"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {p.date}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Hover Readout Tooltip */}
              {hoveredDataPoint && (
                <div className="absolute top-2 right-4 px-3 py-1.5 rounded-lg bg-[#141B2D] border border-white/20 text-xs font-mono text-white shadow-xl animate-in fade-in duration-100">
                  <span className="text-slate-400">{hoveredDataPoint.date}: </span>
                  <span className="font-bold text-[#BEF264]">{hoveredDataPoint.value}</span>
                </div>
              )}
            </div>

            {/* Bottom Chart Footer Legend */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
                {activeMetricTab === 'avg'
                  ? 'Batting Average (42.5 Current)'
                  : activeMetricTab === 'sr'
                  ? 'T20 Strike Rate (138.7 Current)'
                  : 'Innings Runs Logged'}
              </span>
              <button
                onClick={() => setActiveView('performance')}
                className="text-[#BEF264] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full Telemetry Tabs</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Quick Actions & Short Targets (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Quick Actions</h3>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setActiveModal('upload-video')}
                  className="p-3.5 rounded-xl bg-[#121216] hover:bg-[#181820] border border-white/10 text-left transition-all group cursor-pointer hover:border-[#BEF264]/40 hover:scale-[1.02]"
                >
                  <Video className="w-5 h-5 text-[#BEF264] mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-white">Upload Video</p>
                  <p className="text-[10px] text-neutral-400 font-mono">Biomechanics</p>
                </button>

                <button
                  onClick={() => setActiveModal('log-match')}
                  className="p-3.5 rounded-xl bg-[#121216] hover:bg-[#181820] border border-white/10 text-left transition-all group cursor-pointer hover:border-sky-400/40 hover:scale-[1.02]"
                >
                  <Calendar className="w-5 h-5 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-white">Log Match</p>
                  <p className="text-[10px] text-neutral-400 font-mono">Scorecard</p>
                </button>

                <button
                  onClick={() => setActiveModal('log-training')}
                  className="p-3.5 rounded-xl bg-[#121216] hover:bg-[#181820] border border-white/10 text-left transition-all group cursor-pointer hover:border-amber-400/40 hover:scale-[1.02]"
                >
                  <Target className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-white">Record Training</p>
                  <p className="text-[10px] text-neutral-400 font-mono">Drill Routine</p>
                </button>

                <button
                  onClick={() => setActiveView('athlete-profile')}
                  className="p-3.5 rounded-xl bg-[#121216] hover:bg-[#181820] border border-white/10 text-left transition-all group cursor-pointer hover:border-emerald-400/40 hover:scale-[1.02]"
                >
                  <Award className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-white">Athlete Portfolio</p>
                  <p className="text-[10px] text-neutral-400 font-mono">Public Link</p>
                </button>
              </div>
            </div>

            {/* Active Goals Preview */}
            <div className="p-5 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Active Goals</span>
                <button
                  onClick={() => setActiveView('training')}
                  className="text-xs text-[#BEF264] hover:underline font-mono cursor-pointer"
                >
                  Manage
                </button>
              </div>

              <div className="space-y-2.5">
                {goals.slice(0, 2).map((g) => (
                  <div key={g.id} className="p-2.5 rounded-xl bg-[#121216] border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white font-medium truncate max-w-[170px]">{g.title}</span>
                      <span className="text-[#BEF264] font-mono text-[11px] tabular-nums font-bold">{g.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#BEF264] h-full rounded-full transition-all duration-700"
                        style={{ width: `${g.progressPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Split: Recent Activity Log & Today's Drills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Match & Telemetry Activity (Span 7) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white tracking-tightest">Recent Match Log & Milestones</h3>
              <button
                onClick={() => setActiveView('performance')}
                className="text-xs text-[#BEF264] hover:underline font-mono cursor-pointer"
              >
                View all ({matches.length})
              </button>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {matches.slice(0, 4).map((m) => (
                <div key={m.id} className="py-3 flex items-center justify-between gap-4 group">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-[#BEF264] transition-colors truncate">
                      {m.opponent}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{m.format}</span>
                      <span>·</span>
                      <span>{m.date}</span>
                      <span>·</span>
                      <span className="text-slate-300">{m.dismissal}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-base font-bold text-white font-mono tabular-nums">
                      {m.runs} <span className="text-xs font-normal text-slate-400">({m.ballsFaced}b)</span>
                    </p>
                    <p className="text-xs font-mono text-[#BEF264] tabular-nums">SR {m.strikeRate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Scheduled Drills Checklist (Span 5) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tightest">Today's Training Focus</h3>
                <p className="text-xs text-neutral-400 font-sans">Complete daily drills to calibrate tracking models</p>
              </div>
              <button
                onClick={() => setActiveView('training')}
                className="text-xs text-[#BEF264] hover:underline font-mono cursor-pointer"
              >
                All Drills
              </button>
            </div>

            <div className="space-y-2.5">
              {drills.slice(0, 3).map((d) => (
                <div
                  key={d.id}
                  className={`p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    d.completed
                      ? 'bg-white/[0.02] border-white/5 opacity-75'
                      : 'bg-[#121216] border-white/10 hover:border-[#BEF264]/30'
                  }`}
                  onClick={() => setActiveView('training')}
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                      d.completed
                        ? 'bg-[#BEF264] border-[#BEF264] text-black font-bold'
                        : 'border-white/20 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-semibold ${
                        d.completed ? 'text-neutral-500 line-through' : 'text-white'
                      }`}
                    >
                      {d.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono mt-0.5">
                      <span>{d.category}</span>
                      <span>·</span>
                      <span>{d.durationMin} mins</span>
                      <span>·</span>
                      <span className="text-neutral-300 font-sans truncate">{d.repsOrOvers}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
