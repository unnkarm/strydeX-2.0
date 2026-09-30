import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card3D } from '../ui/Card3D';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import {
  Activity,
  ShieldCheck,
  MapPin,
  Calendar,
  Share2,
  Mail,
  Award,
  Video,
  TrendingUp,
  Download,
  ArrowLeft,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const PublicAthleteProfile: React.FC = () => {
  const { user, stats, matches, videoSessions, setActiveView, setActiveModal, addNotification } = useApp();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addNotification('Public Link Copied', 'Portfolio URL copied to clipboard.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 selection:bg-[#BEF264] selection:text-black">
      {/* Public Top Banner */}
      <header className="border-b border-white/[0.08] bg-[#090D18]/90 backdrop-blur-md sticky top-0 z-30 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#BEF264] flex items-center justify-center text-black font-bold">
              <Activity className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              Stryde<span className="text-[#BEF264]">X</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              · Verified Athlete Dossier
            </span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveView('dashboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141B2D] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141B2D] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#BEF264]" />
              <span>Share</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Public Dossier Canvas */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Editorial Athlete Hero Card with 3D Tilt */}
        <Card3D intensity={6}>
          <div className="rounded-3xl bg-[#0D1424] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border border-white/[0.04] pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#BEF264] shadow-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#1A253F] to-[#0A0F1D] border-2 border-[#BEF264] flex items-center justify-center text-3xl font-extrabold text-[#BEF264] shadow-2xl">
                      {user.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-[#BEF264] text-black text-[10px] font-mono font-extrabold flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3 h-3 stroke-[3]" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tightest uppercase font-display">{user.name}</h1>
                    <span className="text-xs font-mono text-[#BEF264] bg-[#BEF264]/10 border border-[#BEF264]/20 px-3 py-1 rounded-full font-bold">
                      #{user.jerseyNumber}
                    </span>
                  </div>

                  <div className="text-sm text-slate-300 font-medium">
                    {user.role} · <span className="text-slate-400 font-normal">{user.level}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                    <span>{user.battingStyle}</span>
                    <span>·</span>
                    <span>{user.bowlingStyle}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {user.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => addNotification('Scout Request Sent', 'Arjun Sharma will receive your trial invitation.', 'success')}
                  className="px-6 py-3.5 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-black uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <Mail className="w-4 h-4 stroke-[2.5]" />
                  <span>Contact for Trial / Selection</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center font-mono">
                  Verified through {user.team}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{user.bio}</p>
            </div>
          </div>
        </Card3D>

        {/* Certified Telemetry Statistics Grid with 3D Cards & Animated Counters */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tightest uppercase font-display">
              Certified Season Metrics
            </h2>
            <span className="text-xs font-mono text-slate-500">2026 Competitive Slate</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Card3D intensity={10}>
              <div className="p-4 rounded-2xl bg-[#0D1424] border border-white/10 h-full">
                <p className="text-[10px] uppercase font-mono text-slate-400">Total Runs</p>
                <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">
                  <AnimatedCounter value={stats.totalRuns} />
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{stats.totalMatches} Matches</p>
              </div>
            </Card3D>

            <Card3D intensity={10}>
              <div className="p-4 rounded-2xl bg-[#0D1424] border border-white/10 h-full">
                <p className="text-[10px] uppercase font-mono text-slate-400">Batting Average</p>
                <p className="text-2xl font-bold text-[#BEF264] font-mono mt-1 tabular-nums">
                  <AnimatedCounter value={stats.battingAvg} decimals={1} />
                </p>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Top-Tier Club 1st XI</p>
              </div>
            </Card3D>

            <Card3D intensity={10}>
              <div className="p-4 rounded-2xl bg-[#0D1424] border border-white/10 h-full">
                <p className="text-[10px] uppercase font-mono text-slate-400">T20 Strike Rate</p>
                <p className="text-2xl font-bold text-sky-400 font-mono mt-1 tabular-nums">
                  <AnimatedCounter value={stats.strikeRate} decimals={1} />
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Powerplay Intent</p>
              </div>
            </Card3D>

            <Card3D intensity={10}>
              <div className="p-4 rounded-2xl bg-[#0D1424] border border-white/10 h-full">
                <p className="text-[10px] uppercase font-mono text-slate-400">High Score</p>
                <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">{stats.highScore}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Red Ball Century</p>
              </div>
            </Card3D>

            <Card3D intensity={10}>
              <div className="p-4 rounded-2xl bg-[#0D1424] border border-white/10 h-full">
                <p className="text-[10px] uppercase font-mono text-slate-400">Catches Held</p>
                <p className="text-2xl font-bold text-emerald-400 font-mono mt-1 tabular-nums">{stats.totalCatches}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">90% Efficiency</p>
              </div>
            </Card3D>

            <Card3D intensity={10}>
              <div className="p-4 rounded-2xl bg-[#0D1424] border border-white/10 h-full">
                <p className="text-[10px] uppercase font-mono text-slate-400">Bat Speed Max</p>
                <p className="text-2xl font-bold text-amber-400 font-mono mt-1 tabular-nums">
                  <AnimatedCounter value={116.8} decimals={1} />
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">km/h at Contact</p>
              </div>
            </Card3D>
          </div>
        </div>

        {/* Biomechanical Footage Reels with 3D tilt */}
        <div className="rounded-3xl bg-[#0D1424] border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-base font-bold text-white">Biomechanical Video Telemetry Reel</h2>
              <p className="text-xs text-slate-400">Motion captures verified through StrydeX AI pose estimators</p>
            </div>
            <span className="text-xs font-mono text-[#BEF264] bg-[#BEF264]/10 px-2 py-0.5 rounded">
              High-Speed Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoSessions.slice(0, 2).map((vid) => (
              <Card3D key={vid.id} intensity={8}>
                <div className="p-5 rounded-2xl bg-[#12192C] border border-white/10 space-y-3 h-full">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#BEF264] font-semibold">{vid.discipline}</span>
                    <span className="text-slate-400">{vid.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{vid.title}</h3>

                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs py-2 bg-[#090D18] rounded-xl border border-white/5">
                    <div>
                      <p className="text-[10px] text-slate-500">BAT SPEED</p>
                      <p className="font-bold text-white">{vid.metrics.batSpeedKph || 114} km/h</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">HEAD INDEX</p>
                      <p className="font-bold text-[#BEF264]">{vid.metrics.headStabilityScore || 92}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">STRIDE BASE</p>
                      <p className="font-bold text-sky-400">{vid.metrics.strideLengthMeters || 1.08}m</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {vid.observations[0]?.description}
                  </p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>

        {/* Coach Endorsements Strip */}
        <div className="rounded-3xl bg-[#0D1424] border border-white/10 p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
            Accredited Coaching Endorsements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.connectedCoaches.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-[#12192C] border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">{c.name}</p>
                  <p className="text-[11px] text-[#BEF264] font-mono">{c.role} · {c.academy}</p>
                  <p className="text-xs text-slate-300 italic pt-1 leading-relaxed">
                    "Arjun demonstrates exceptional game awareness in powerplay pacing and is developing exemplary back-foot poise against 135kph+ bowling."
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
