import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { DevelopmentGoal, TrainingDrill } from '../../types';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import {
  Target,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';

interface TrainingGoalProgressBarProps {
  onSelectGoal?: (goalId: string) => void;
  className?: string;
}

export const TrainingGoalProgressBar: React.FC<TrainingGoalProgressBarProps> = ({
  onSelectGoal,
  className = ''
}) => {
  const { user, goals, drills, toggleDrillComplete, toggleGoalComplete } = useApp();
  const [showGoalBreakdown, setShowGoalBreakdown] = useState(false);

  // 1. Overall Task Completion Metrics
  const totalTasks = drills.length;
  const completedTasks = drills.filter((d) => d.completed).length;
  const overallTaskPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // 2. Goal-Specific Task Calculations
  const goalsWithCalculatedProgress = goals.map((goal) => {
    // Find drills assigned directly or by category
    const linkedDrills = drills.filter((d) => d.goalId === goal.id);
    const relatedDrills =
      linkedDrills.length > 0
        ? linkedDrills
        : drills.filter((d) => {
            if (goal.category === 'Tactical' && (d.category === 'Batting' || d.category === 'Fitness')) return true;
            if (goal.category === 'Technique' && d.category === 'Batting') return true;
            if (goal.category === 'Fitness' && d.category === 'Fitness') return true;
            return false;
          });

    const goalTotalTasks = relatedDrills.length;
    const goalCompletedTasks = relatedDrills.filter((d) => d.completed).length;

    // Computed percentage: if marked complete, 100%; otherwise ratio of completed tasks
    let computedPercent = goal.completed ? 100 : 0;
    if (!goal.completed && goalTotalTasks > 0) {
      computedPercent = Math.round((goalCompletedTasks / goalTotalTasks) * 100);
    } else if (!goal.completed && goalTotalTasks === 0) {
      computedPercent = goal.progressPercent;
    }

    return {
      ...goal,
      relatedDrills,
      goalTotalTasks,
      goalCompletedTasks,
      computedPercent
    };
  });

  // 3. Overall Weighted Goal Progress
  const totalGoalPercentage =
    goalsWithCalculatedProgress.length > 0
      ? Math.round(
          goalsWithCalculatedProgress.reduce((sum, g) => sum + g.computedPercent, 0) /
            goalsWithCalculatedProgress.length
        )
      : overallTaskPercentage;

  const achievedGoalsCount = goalsWithCalculatedProgress.filter(
    (g) => g.completed || g.computedPercent >= 100
  ).length;

  const remainingMins = drills
    .filter((d) => !d.completed)
    .reduce((sum, d) => sum + d.durationMin, 0);

  // Status Badge Label
  const getStatusBadge = () => {
    if (totalGoalPercentage >= 100) {
      return { label: 'ALL TARGETS MASTERED', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    }
    if (totalGoalPercentage >= 75) {
      return { label: 'MATCH CALIBRATED', color: 'text-[#BEF264] border-[#BEF264]/30 bg-[#BEF264]/10' };
    }
    if (totalGoalPercentage >= 40) {
      return { label: 'STEADY PROGRESSION', color: 'text-sky-400 border-sky-400/30 bg-sky-400/10' };
    }
    return { label: 'CALIBRATION PHASE', color: 'text-amber-400 border-amber-400/30 bg-amber-400/10' };
  };

  const status = getStatusBadge();

  return (
    <div
      className={`rounded-2xl bg-[#09090C] border border-white/[0.08] p-5 sm:p-6 transition-all ${className}`}
    >
      {/* Top Header Row with Athlete Profile Picture & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3.5">
          {/* Athlete Profile Picture Avatar */}
          <div className="relative shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-11 h-11 rounded-xl object-cover border-2 border-[#BEF264]"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-[#141B2D] border-2 border-[#BEF264] flex items-center justify-center text-sm font-bold text-[#BEF264]">
                {user.name.split(' ').map((n) => n[0]).join('')}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#BEF264] flex items-center justify-center text-black text-[9px] font-bold">
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white tracking-tightest">
                Goal Progression & Task Completion
              </h3>
            </div>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              Updates in real-time as practice drills are completed towards your defined development targets
            </p>
          </div>
        </div>

        {/* Status Chip & Metric */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${status.color}`}
          >
            {status.label}
          </span>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tightest tabular-nums">
              <AnimatedCounter value={totalGoalPercentage} />%
            </span>
          </div>
        </div>
      </div>

      {/* Main Visual Progress Bar Track */}
      <div className="pt-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">
            Tasks Completed: <span className="text-white font-bold">{completedTasks}</span> of{' '}
            <span className="text-white font-bold">{totalTasks}</span> drills
          </span>
          <span className="text-[#BEF264] font-semibold">
            {achievedGoalsCount} of {goals.length} Goals Achieved
          </span>
        </div>

        {/* Visual Bar with Multi-tier Fill and Milestones */}
        <div className="relative w-full h-4 bg-white/[0.05] rounded-full overflow-hidden border border-white/10 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, totalGoalPercentage))}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full transition-all ${
              totalGoalPercentage >= 100
                ? 'bg-gradient-to-r from-emerald-400 to-[#BEF264]'
                : totalGoalPercentage >= 60
                ? 'bg-gradient-to-r from-[#BEF264] to-[#aee750]'
                : 'bg-gradient-to-r from-sky-400 to-[#BEF264]'
            }`}
          />

          {/* Milestone Step Ticks */}
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
            {[25, 50, 75].map((tick) => (
              <div
                key={tick}
                className="w-0.5 h-full bg-black/40"
                style={{ position: 'absolute', left: `${tick}%` }}
              />
            ))}
          </div>
        </div>

        {/* Milestones Labels */}
        <div className="grid grid-cols-4 text-[10px] font-mono text-neutral-400 pt-0.5">
          <div className="text-left">25% Baseline</div>
          <div className="text-center">50% Mid-Phase</div>
          <div className="text-center">75% Match-Ready</div>
          <div className="text-right text-[#BEF264]">100% Goal Met</div>
        </div>
      </div>

      {/* Quick Summary Pill Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 mt-4 border-t border-white/[0.06]">
        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[10px] uppercase font-mono text-neutral-400 block">Total Workload</span>
          <span className="text-xs font-bold text-white font-mono mt-0.5 block tabular-nums">
            {drills.reduce((sum, d) => sum + d.durationMin, 0)} Mins Scheduled
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[10px] uppercase font-mono text-neutral-400 block">Remaining Workload</span>
          <span className="text-xs font-bold text-amber-400 font-mono mt-0.5 block tabular-nums">
            {remainingMins > 0 ? `${remainingMins} Mins to Target` : 'All Drills Completed'}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[10px] uppercase font-mono text-neutral-400 block">Active Goals</span>
          <span className="text-xs font-bold text-white font-mono mt-0.5 block tabular-nums">
            {goals.length} Defined Targets
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-neutral-400 block">Breakdown</span>
            <span className="text-xs font-bold text-[#BEF264] font-mono mt-0.5 block">
              {showGoalBreakdown ? 'Hide Goals' : 'View Goal Bars'}
            </span>
          </div>
          <button
            onClick={() => setShowGoalBreakdown(!showGoalBreakdown)}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Toggle individual goal progress bars"
          >
            {showGoalBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Accordion / Detailed Breakdown of Each Defined Goal */}
      <AnimatePresence>
        {showGoalBreakdown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pt-4 mt-4 border-t border-white/[0.06] space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Progress Bars by Defined Development Goal ({goalsWithCalculatedProgress.length})
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                Click task checkboxes to advance each goal
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalsWithCalculatedProgress.map((g) => (
                <div
                  key={g.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    g.completed || g.computedPercent >= 100
                      ? 'bg-emerald-500/[0.04] border-emerald-500/30'
                      : 'bg-[#121216] border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#BEF264] font-semibold">
                          {g.category}
                        </span>
                        <span className="text-xs font-bold text-white truncate">{g.title}</span>
                      </div>
                      <p className="text-[11px] font-mono text-neutral-400 mt-1">
                        Current: <span className="text-white">{g.currentValue}</span> · Target:{' '}
                        <span className="text-[#BEF264] font-semibold">{g.targetValue}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold font-mono text-white tabular-nums">
                        {g.computedPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Individual Goal Progress Bar */}
                  <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden mt-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${g.computedPercent}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        g.completed || g.computedPercent >= 100
                          ? 'bg-emerald-400'
                          : g.computedPercent >= 70
                          ? 'bg-[#BEF264]'
                          : 'bg-sky-400'
                      }`}
                    />
                  </div>

                  {/* Linked Drills Checklist for this goal */}
                  {g.relatedDrills.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-white/[0.04] space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span>Associated Tasks ({g.goalCompletedTasks}/{g.goalTotalTasks}):</span>
                        {g.completed ? (
                          <span className="text-emerald-400 font-bold">✓ Target Reached</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleGoalComplete(g.id)}
                            className="text-[#BEF264] hover:underline cursor-pointer"
                          >
                            Mark Target Done
                          </button>
                        )}
                      </div>

                      <div className="space-y-1">
                        {g.relatedDrills.map((drill) => (
                          <button
                            key={drill.id}
                            type="button"
                            onClick={() => toggleDrillComplete(drill.id)}
                            className={`w-full text-left p-1.5 rounded-lg flex items-center justify-between gap-2 text-[11px] transition-colors cursor-pointer ${
                              drill.completed
                                ? 'bg-white/[0.02] text-neutral-400 line-through'
                                : 'bg-white/[0.04] text-white hover:bg-white/[0.08]'
                            }`}
                          >
                            <span className="truncate flex items-center gap-1.5">
                              <span
                                className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] border shrink-0 ${
                                  drill.completed
                                    ? 'bg-[#BEF264] border-[#BEF264] text-black font-bold'
                                    : 'border-white/30 text-transparent'
                                }`}
                              >
                                ✓
                              </span>
                              <span>{drill.title}</span>
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                              {drill.durationMin}m
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
