import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../layout/AppLayout';
import { Card3D } from '../ui/Card3D';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import {
  DISMISSAL_BREAKDOWN,
  SCORING_ZONES,
  BOWLING_LENGTH_DISTRIBUTION,
  FIELDING_STATS,
  FITNESS_BENCHMARKS
} from '../../lib/mock-data';
import { MatchFormat } from '../../types';
import { Pitch3D } from '../3d/Pitch3D';
import {
  TrendingUp,
  Target,
  Shield,
  Activity,
  Filter,
  PieChart,
  BarChart2,
  Calendar,
  Layers,
  Award,
  Zap
} from 'lucide-react';

export const PerformanceAnalytics: React.FC = () => {
  const { matches, formatFilter, setFormatFilter, setActiveModal } = useApp();
  const [activeTab, setActiveTab] = useState<'batting' | 'bowling' | 'fielding' | 'fitness'>('batting');

  // Filter matches based on selected format
  const filteredMatches = matches.filter((m) =>
    formatFilter === 'All' ? true : m.format === formatFilter
  );

  // Computed Batting Stats
  const totalRuns = filteredMatches.reduce((acc, m) => acc + m.runs, 0);
  const totalBalls = filteredMatches.reduce((acc, m) => acc + m.ballsFaced, 0);
  const totalFours = filteredMatches.reduce((acc, m) => acc + m.fours, 0);
  const totalSixes = filteredMatches.reduce((acc, m) => acc + m.sixes, 0);
  const outs = filteredMatches.filter((m) => !m.dismissal.toLowerCase().includes('not out')).length;
  const battingAvg = outs > 0 ? Number((totalRuns / outs).toFixed(1)) : totalRuns;
  const strikeRate = totalBalls > 0 ? Number(((totalRuns / totalBalls) * 100).toFixed(1)) : 0;
  const boundaryRuns = totalFours * 4 + totalSixes * 6;
  const boundaryPercentage = totalRuns > 0 ? Math.round((boundaryRuns / totalRuns) * 100) : 0;
  const estimatedDotBallPct = 34.2;

  // Computed Bowling Stats
  const totalOvers = filteredMatches.reduce((acc, m) => acc + (m.oversBowled || 0), 0);
  const totalWickets = filteredMatches.reduce((acc, m) => acc + (m.wickets || 0), 0);
  const totalConceded = filteredMatches.reduce((acc, m) => acc + (m.runsConceded || 0), 0);
  const bowlingEconomy = totalOvers > 0 ? Number((totalConceded / totalOvers).toFixed(2)) : 5.14;

  return (
    <AppLayout
      title="Cricket Performance Telemetry"
      subtitle="Multi-format statistical breakdowns, scoring zones, dismissal vectors, and physical benchmarks"
      actions={
        <div className="flex items-center gap-2">
          {/* Format filter dropdown */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121A2B] rounded-lg border border-white/10 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {(['All', 'T20', 'One Day (50-over)', 'Multi-Day (Red Ball)'] as MatchFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormatFilter(fmt)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  formatFilter === fmt
                    ? 'bg-[#BEF264] text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fmt === 'One Day (50-over)' ? '50-Over' : fmt === 'Multi-Day (Red Ball)' ? 'Red Ball' : fmt}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1">
          {[
            { id: 'batting', label: 'Batting Telemetry', icon: TrendingUp },
            { id: 'bowling', label: 'Bowling & Lines', icon: Target },
            { id: 'fielding', label: 'Fielding & Reflexes', icon: Shield },
            { id: 'fitness', label: 'Physical Conditioning', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#BEF264] text-white bg-white/[0.03]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#BEF264]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Centerpiece Interactive 3D Cricket Pitch */}
        <Pitch3D />

        {/* 1. BATTING TAB */}
        {activeTab === 'batting' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Batting Top Metrics with 3D Tilt */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Total Runs</p>
                  <p className="text-xl font-bold text-white font-mono mt-1 tabular-nums">
                    <AnimatedCounter value={totalRuns} />
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{filteredMatches.length} Innings</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Batting Average</p>
                  <p className="text-xl font-bold text-[#BEF264] font-mono mt-1 tabular-nums">
                    <AnimatedCounter value={battingAvg} decimals={1} />
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{outs} Dismissals</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Strike Rate</p>
                  <p className="text-xl font-bold text-sky-400 font-mono mt-1 tabular-nums">
                    <AnimatedCounter value={strikeRate} decimals={1} />
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{totalBalls} Balls</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Boundaries</p>
                  <p className="text-xl font-bold text-white font-mono mt-1 tabular-nums">
                    {totalFours} <span className="text-xs text-slate-500">4s</span> · {totalSixes} <span className="text-xs text-slate-500">6s</span>
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{boundaryPercentage}% of runs</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Dot Ball %</p>
                  <p className="text-xl font-bold text-white font-mono mt-1 tabular-nums">{estimatedDotBallPct}%</p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Target &lt; 28%</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Control Index</p>
                  <p className="text-xl font-bold text-amber-400 font-mono mt-1 tabular-nums">84.6%</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Clean bat contact</p>
                </div>
              </Card3D>
            </div>

            {/* Split: Wagon Wheel & Dismissal Modes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Cricket Wagon Wheel Visualization (Span 7) */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tightest uppercase font-display">Scoring Distribution (Wagon Wheel)</h3>
                    <p className="text-xs text-neutral-400 font-sans">Run density by radial field direction</p>
                  </div>
                  <span className="text-xs font-mono text-[#BEF264] bg-[#BEF264]/10 px-2 py-0.5 rounded font-bold">
                    Peak: Cover & Extra Cover (23%)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* Circular Wagon Wheel Graphic */}
                  <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                      <circle cx="100" cy="100" r="90" fill="#0A0E18" stroke="#1E293B" strokeWidth="2" />
                      <circle cx="100" cy="100" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                      <rect x="95" y="86" width="10" height="28" fill="#BEF264" opacity="0.8" rx="1" />

                      {SCORING_ZONES.map((zone, idx) => {
                        const angle = (idx / SCORING_ZONES.length) * 2 * Math.PI;
                        const x2 = 100 + Math.cos(angle) * 90;
                        const y2 = 100 + Math.sin(angle) * 90;
                        return (
                          <line
                            key={idx}
                            x1="100"
                            y1="100"
                            x2={x2}
                            y2={y2}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                          />
                        );
                      })}

                      <line x1="100" y1="100" x2="160" y2="45" stroke="#BEF264" strokeWidth="3" strokeLinecap="round" />
                      <line x1="100" y1="100" x2="175" y2="80" stroke="#BEF264" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="100" y1="100" x2="140" y2="160" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="100" y1="100" x2="60" y2="155" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
                      <line x1="100" y1="100" x2="45" y2="60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                      <span className="text-[10px] text-slate-500 font-mono">BATSMAN</span>
                      <span className="text-xs font-bold text-white font-mono">RHB</span>
                    </div>
                  </div>

                  {/* Wagon Sector Table */}
                  <div className="space-y-2 text-xs font-mono">
                    {SCORING_ZONES.map((zone) => (
                      <div key={zone.zone} className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color }} />
                          <span className="text-slate-300 font-sans">{zone.zone}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-white font-bold tabular-nums">{zone.runs}r </span>
                          <span className="text-slate-400">({zone.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dismissal Breakdown Vector (Span 5) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
                <div className="pb-3 border-b border-white/[0.06]">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tightest uppercase font-display">Dismissal Vulnerability Analysis</h3>
                  <p className="text-xs text-neutral-400 font-sans">Breakdown of wickets surrendered this season</p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {DISMISSAL_BREAKDOWN.map((d) => (
                    <div key={d.name} className="space-y-1">
                      <div className="flex items-center justify-between text-slate-300 font-sans">
                        <span>{d.name}</span>
                        <span className="font-mono text-white font-bold tabular-nums">
                          {d.count} ({d.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#BEF264] h-full rounded-full transition-all duration-700"
                          style={{ width: `${d.percentage * 2.5}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-[#141B2D] border border-white/5 text-xs text-slate-300">
                  <strong className="text-[#BEF264]">Tactical Takeaway:</strong> 55% of dismissals occur from aerial catches. Work on rolling wrists over pull shots and grounding drives.
                </div>
              </div>
            </div>

            {/* Match History Scorebook Table */}
            <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-base font-bold text-white">Innings Scorebook Log</h3>
                  <p className="text-xs text-slate-400">Individual match figures with dismissal details</p>
                </div>
                <button
                  onClick={() => setActiveModal('log-match')}
                  className="px-3 py-1.5 rounded-lg bg-[#BEF264] text-black text-xs font-bold hover:bg-[#aee750] transition-colors cursor-pointer"
                >
                  + Record Innings
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-sans uppercase tracking-wider text-[11px]">
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Opponent</th>
                      <th className="py-2.5 px-3">Format</th>
                      <th className="py-2.5 px-3 text-right">Runs</th>
                      <th className="py-2.5 px-3 text-right">Balls</th>
                      <th className="py-2.5 px-3 text-right">4s/6s</th>
                      <th className="py-2.5 px-3 text-right">SR</th>
                      <th className="py-2.5 px-3">Dismissal</th>
                      <th className="py-2.5 px-3">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredMatches.map((m) => (
                      <tr key={m.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="py-3 px-3 text-slate-400">{m.date}</td>
                        <td className="py-3 px-3 font-sans font-semibold text-white">{m.opponent}</td>
                        <td className="py-3 px-3 text-slate-300">{m.format}</td>
                        <td className="py-3 px-3 text-right font-bold text-white tabular-nums">{m.runs}</td>
                        <td className="py-3 px-3 text-right text-slate-400 tabular-nums">{m.ballsFaced}</td>
                        <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{m.fours}/{m.sixes}</td>
                        <td className="py-3 px-3 text-right text-[#BEF264] font-bold tabular-nums">{m.strikeRate}</td>
                        <td className="py-3 px-3 font-sans text-slate-300">{m.dismissal}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                              m.result === 'Won'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : m.result === 'Lost'
                                ? 'bg-red-500/10 text-red-400'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {m.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. BOWLING TAB */}
        {activeTab === 'bowling' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Total Overs Bowled</p>
                  <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">{totalOvers} ov</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Seam & Swing</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Wickets Taken</p>
                  <p className="text-2xl font-bold text-[#BEF264] font-mono mt-1 tabular-nums">{totalWickets}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Best: 2/32</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Economy Rate</p>
                  <p className="text-2xl font-bold text-sky-400 font-mono mt-1 tabular-nums">
                    <AnimatedCounter value={bowlingEconomy} decimals={2} />
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">RPO Across Formats</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-4 rounded-xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-[10px] uppercase font-mono text-slate-400">Dot Ball % Bowled</p>
                  <p className="text-2xl font-bold text-emerald-400 font-mono mt-1 tabular-nums">46.8%</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Pressure Building</p>
                </div>
              </Card3D>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-base font-bold text-white">Delivery Length Pitch Heatmap</h3>
                    <p className="text-xs text-slate-400">Pitch coordinates & economy across delivery zones</p>
                  </div>
                  <span className="text-xs font-mono text-[#BEF264] bg-[#BEF264]/10 px-2 py-0.5 rounded">
                    Target: 6-8m Corridor
                  </span>
                </div>

                <div className="relative w-full max-w-md mx-auto h-64 bg-[#090D18] border border-white/10 rounded-xl overflow-hidden p-4 flex flex-col justify-between font-mono text-[10px]">
                  <div className="border-b border-white/30 pb-1 text-center text-slate-400 uppercase">
                    BATSMAN POPPING CREASE (STUMPS)
                  </div>

                  <div className="space-y-1.5 flex-1 py-2 flex flex-col justify-around">
                    <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                      <span className="text-emerald-400 font-bold">FULL / YORKER (0-4m)</span>
                      <span className="text-white">48 balls · Econ 5.25 · 2 wkts</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#BEF264]/15 border border-[#BEF264]/40 flex items-center justify-between shadow-sm">
                      <span className="text-[#BEF264] font-bold">GOOD LENGTH (6-8m CORRIDOR)</span>
                      <span className="text-white font-bold">84 balls · Econ 4.86 · 3 wkts</span>
                    </div>
                    <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                      <span className="text-amber-400 font-bold">BACK OF LENGTH (8-10m)</span>
                      <span className="text-white">54 balls · Econ 5.77 · 1 wkt</span>
                    </div>
                    <div className="p-2 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-between">
                      <span className="text-red-400 font-bold">SHORT / BOUNCER (&gt;10m)</span>
                      <span className="text-white">24 balls · Econ 7.00 · 0 wkts</span>
                    </div>
                  </div>

                  <div className="border-t border-white/30 pt-1 text-center text-slate-400 uppercase">
                    BOWLER DELIVERY STRIDE CREASE
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-4">
                <div className="pb-3 border-b border-white/[0.06]">
                  <h3 className="text-base font-bold text-white">Line & Seam Release Metrics</h3>
                  <p className="text-xs text-slate-400">High-speed release orientation</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#141B2D] border border-white/5 space-y-1">
                    <p className="text-slate-400 font-mono text-[10px]">AVG RELEASE VELOCITY</p>
                    <p className="text-lg font-bold text-white font-mono">124.5 km/h</p>
                    <p className="text-[11px] text-emerald-400">Peak: 128.4 km/h</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141B2D] border border-white/5 space-y-1">
                    <p className="text-slate-400 font-mono text-[10px]">CORRIDOR ACCURACY</p>
                    <p className="text-lg font-bold text-[#BEF264] font-mono">68.4% on 4th Stump</p>
                    <p className="text-[11px] text-slate-400">Consistent away movement to right-handers</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141B2D] border border-white/5 space-y-1">
                    <p className="text-slate-400 font-mono text-[10px]">FRONT FOOT BRACE ANGLE</p>
                    <p className="text-lg font-bold text-white font-mono">84.0° at Delivery</p>
                    <p className="text-[11px] text-amber-400">Focus on stiffening knee joint on landing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. FIELDING TAB */}
        {activeTab === 'fielding' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card3D intensity={10}>
                <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Catches Held</p>
                  <p className="text-3xl font-extrabold text-white font-mono mt-1 tabular-nums">
                    {FIELDING_STATS.totalCatches}
                  </p>
                  <p className="text-xs text-[#BEF264] font-mono mt-1">{FIELDING_STATS.catchEfficiency} conversion</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Direct Hits</p>
                  <p className="text-3xl font-extrabold text-white font-mono mt-1 tabular-nums">
                    {FIELDING_STATS.directHits}
                  </p>
                  <p className="text-xs text-sky-400 font-mono mt-1">From Ring & Outfield</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Run Outs Executed</p>
                  <p className="text-3xl font-extrabold text-white font-mono mt-1 tabular-nums">
                    {FIELDING_STATS.runOutAssists}
                  </p>
                  <p className="text-xs text-slate-400 font-mono mt-1">Keeper assists</p>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/[0.08] h-full">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Runs Saved in Field</p>
                  <p className="text-3xl font-extrabold text-[#BEF264] font-mono mt-1 tabular-nums">
                    +{FIELDING_STATS.runsSavedInField}
                  </p>
                  <p className="text-xs text-emerald-400 font-mono mt-1">Dives & stops</p>
                </div>
              </Card3D>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">Fielding Positioning & Efficiency</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#141B2D] border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-white">Slip Cordon</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    12 catches taken at 1st & 2nd slip. Reaction time measured at 228ms from edge deflection.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#141B2D] border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-white">Cover / Extra Cover Ring</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Primary powerplay position. 44 fielding stops recorded with 3 direct-hit stumps hits.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#141B2D] border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-white">Deep Mid-Wicket Relay</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Boundary cutoff efficiency 92%. Average throw return velocity clocked at 98 km/h to keeper.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. FITNESS TAB */}
        {activeTab === 'fitness' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-base font-bold text-white">Physical & Athletic Testing Benchmarks</h3>
                  <p className="text-xs text-slate-400">Club & representative performance standards</p>
                </div>
                <span className="text-xs font-mono text-[#BEF264] bg-[#BEF264]/10 px-2.5 py-1 rounded">
                  Status: High Performance Band
                </span>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {FITNESS_BENCHMARKS.map((f, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4 font-mono text-xs">
                    <div>
                      <p className="font-sans font-semibold text-white text-sm">{f.test}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">Benchmark Target: {f.benchmark}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-bold text-white tabular-nums">{f.score}</p>
                      <p className="text-xs text-[#BEF264] tabular-nums font-semibold">{f.percentile} Percentile</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
