import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../layout/AppLayout';
import { TRAINING_PROGRAMS } from '../../lib/mock-data';
import { Card3D } from '../ui/Card3D';
import { TrainingGoalProgressBar } from './TrainingGoalProgressBar';
import {
  Dumbbell,
  CheckCircle2,
  Calendar,
  Plus,
  Trash2,
  Target,
  Flame,
  Clock,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';

export const TrainingDevelopment: React.FC = () => {
  const {
    drills,
    toggleDrillComplete,
    goals,
    addGoal,
    toggleGoalComplete,
    deleteGoal,
    setActiveModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'drills' | 'programs' | 'calendar' | 'goals'>('drills');
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState<'Technique' | 'Power' | 'Tactical' | 'Fitness'>('Tactical');
  const [newGoalTarget, setNewGoalTarget] = useState('150.0 SR');
  const [newGoalMetric, setNewGoalMetric] = useState('Strike Rate');
  const [newGoalDeadline, setNewGoalDeadline] = useState('Nov 30, 2026');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    addGoal({
      title: newGoalTitle,
      category: newGoalCategory,
      targetMetric: newGoalMetric,
      currentValue: 'In Progress',
      targetValue: newGoalTarget,
      deadline: newGoalDeadline
    });

    setNewGoalTitle('');
    setShowAddGoalForm(false);
  };

  const weekDays = [
    { day: 'Mon', date: 'Sep 22', status: 'completed', focus: 'Tee Alignment' },
    { day: 'Tue', date: 'Sep 23', status: 'completed', focus: '135kph Short Ball' },
    { day: 'Wed', date: 'Sep 24', status: 'match', focus: 'T20 Match Day' },
    { day: 'Thu', date: 'Sep 25', status: 'completed', focus: 'Spin Footwork' },
    { day: 'Fri', date: 'Sep 26', status: 'rest', focus: 'Mobility & Recovery' },
    { day: 'Sat', date: 'Sep 27', status: 'completed', focus: 'Net Simulation' },
    { day: 'Sun', date: 'Sep 28', status: 'upcoming', focus: 'League Match 1st XI' }
  ];

  return (
    <AppLayout
      title="Training & Athlete Development Hub"
      subtitle="Structured biomechanical drill regimens, weekly workloads, and developmental milestone tracking"
      actions={
        <button
          onClick={() => setActiveModal('log-training')}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#BEF264] hover:bg-[#aee750] text-black rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Training Session</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Visual Progress Bar Component tracking completed tasks relative to development goals */}
        <TrainingGoalProgressBar onSelectGoal={() => setActiveTab('goals')} />

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1">
          {[
            { id: 'drills', label: "Today's Drills", icon: Dumbbell },
            { id: 'calendar', label: 'Weekly Schedule', icon: Calendar },
            { id: 'programs', label: 'Training Programs', icon: Layers },
            { id: 'goals', label: 'Development Targets', icon: Target },
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

        {/* 1. TODAY'S DRILLS */}
        {activeTab === 'drills' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Drills List (Span 8) */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tightest uppercase font-display">Scheduled Practice Drills</h3>
                    <p className="text-xs text-neutral-400 font-sans">Click checkboxes as you complete each exercise</p>
                  </div>
                  <span className="text-xs font-mono text-[#BEF264] font-bold">
                    {drills.filter((d) => d.completed).length} of {drills.length} Complete
                  </span>
                </div>

                <div className="space-y-3">
                  {drills.map((drill) => (
                    <div
                      key={drill.id}
                      onClick={() => toggleDrillComplete(drill.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                        drill.completed
                          ? 'bg-white/[0.02] border-white/5 opacity-75'
                          : 'bg-[#121829] border-white/10 hover:border-white/20 hover:scale-[1.01]'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                          drill.completed
                            ? 'bg-[#BEF264] border-[#BEF264] text-black'
                            : 'border-white/20 text-transparent hover:border-[#BEF264]'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-sm font-bold ${
                              drill.completed ? 'text-slate-400 line-through' : 'text-white'
                            }`}
                          >
                            {drill.title}
                          </p>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                              drill.difficulty === 'Elite'
                                ? 'bg-red-500/10 text-red-400'
                                : drill.difficulty === 'Intermediate'
                                ? 'bg-amber-500/10 text-amber-400'
                                : 'bg-emerald-500/10 text-emerald-400'
                            }`}
                          >
                            {drill.difficulty}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 mt-1">{drill.description}</p>

                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-mono flex-wrap">
                          <span className="text-[#BEF264]">{drill.category}</span>
                          <span>·</span>
                          <span>{drill.durationMin} mins</span>
                          <span>·</span>
                          <span>{drill.repsOrOvers}</span>
                          {drill.goalId && (
                            <>
                              <span>·</span>
                              <span className="inline-flex items-center gap-1 text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                                <Target className="w-3 h-3" />
                                <span>{goals.find((g) => g.id === drill.goalId)?.title || 'Target Goal'}</span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Summary & Volume (Span 4) */}
              <div className="lg:col-span-4 space-y-4">
                <Card3D intensity={8}>
                  <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-4 h-full">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Weekly Workload Volume
                    </h3>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded bg-[#141B2D]">
                        <span className="text-slate-400">Balls Faced in Nets</span>
                        <span className="font-bold text-white">280 balls</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded bg-[#141B2D]">
                        <span className="text-slate-400">Overs Bowled (Practice)</span>
                        <span className="font-bold text-white">16.4 overs</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded bg-[#141B2D]">
                        <span className="text-slate-400">Fielding Reps Taken</span>
                        <span className="font-bold text-[#BEF264]">72 catches</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded bg-[#141B2D]">
                        <span className="text-slate-400">Total Training Duration</span>
                        <span className="font-bold text-white">4h 45m</span>
                      </div>
                    </div>
                  </div>
                </Card3D>

                <div className="p-5 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-2 text-xs">
                  <p className="font-bold text-white">Coach Note for the Week</p>
                  <p className="text-slate-300 leading-relaxed italic">
                    "Ensure you complete the 20m shuttle intervals with batting pads on to match real match-day fatigue when running hard 2s."
                  </p>
                  <p className="text-slate-500 font-mono text-[10px]">— Coach Michael Vaughan-Smith</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. WEEKLY CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tightest uppercase font-display">Current Week Microcycle</h3>
                  <p className="text-xs text-neutral-400 font-sans">Training sessions, recovery intervals, and match fixtures</p>
                </div>
                <span className="text-xs font-mono text-[#BEF264] bg-[#BEF264]/10 px-2.5 py-1 rounded">
                  Weekly Compliance: 94%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                {weekDays.map((w, idx) => (
                  <Card3D key={idx} intensity={8}>
                    <div
                      className={`p-4 rounded-xl border flex flex-col justify-between min-h-[140px] h-full ${
                        w.status === 'match'
                          ? 'bg-sky-500/10 border-sky-500/30'
                          : w.status === 'completed'
                          ? 'bg-[#121829] border-white/10'
                          : w.status === 'rest'
                          ? 'bg-slate-900/50 border-white/5'
                          : 'bg-[#121829] border-[#BEF264]/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-white">{w.day}</span>
                          <span className="text-slate-400 text-[10px]">{w.date}</span>
                        </div>

                        <div className="mt-3">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold block w-fit ${
                              w.status === 'match'
                                ? 'bg-sky-400 text-black'
                                : w.status === 'completed'
                                ? 'bg-[#BEF264] text-black'
                                : w.status === 'rest'
                                ? 'bg-slate-800 text-slate-300'
                                : 'bg-amber-400 text-black'
                            }`}
                          >
                            {w.status.toUpperCase()}
                          </span>
                          <p className="text-xs font-semibold text-white mt-2 leading-snug">{w.focus}</p>
                        </div>
                      </div>

                      <div className="pt-2 text-[10px] text-slate-500 font-mono">
                        {w.status === 'completed' ? 'Verified Telemetry' : w.status === 'match' ? 'League XI' : 'Scheduled'}
                      </div>
                    </div>
                  </Card3D>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. TRAINING PROGRAMS */}
        {activeTab === 'programs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRAINING_PROGRAMS.map((prog) => (
                <Card3D key={prog.id} intensity={10}>
                  <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-4 h-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#BEF264] bg-[#BEF264]/10 px-2 py-0.5 rounded font-semibold">
                          {prog.discipline}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{prog.durationWeeks} WEEKS</span>
                      </div>

                      <h3 className="text-lg font-bold text-white">{prog.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{prog.description}</p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">{prog.modulesCount} modules</span>
                      <button
                        onClick={() => alert(`Enrolled in "${prog.title}"! Routine added to your weekly schedule.`)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#BEF264] text-black font-bold hover:bg-[#aee750] transition-colors cursor-pointer"
                      >
                        Start Program
                      </button>
                    </div>
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        )}

        {/* 4. DEVELOPMENT TARGETS & GOALS */}
        {activeTab === 'goals' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-base font-bold text-white">Development Milestones & Goals</h3>
                  <p className="text-xs text-slate-400">Track measurable targets with clear completion deadlines</p>
                </div>

                <button
                  onClick={() => setShowAddGoalForm(!showAddGoalForm)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#BEF264] text-black text-xs font-bold hover:bg-[#aee750] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Goal</span>
                </button>
              </div>

              {showAddGoalForm && (
                <form
                  onSubmit={handleCreateGoal}
                  className="p-5 rounded-xl bg-[#141B2D] border border-[#BEF264]/30 space-y-4 animate-in slide-in-from-top-2"
                >
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Add New Development Target
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Goal Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elevate strike rate vs left-arm spin"
                        value={newGoalTitle}
                        onChange={(e) => setNewGoalTitle(e.target.value)}
                        className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Category</label>
                      <select
                        value={newGoalCategory}
                        onChange={(e) => setNewGoalCategory(e.target.value as any)}
                        className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                      >
                        <option value="Tactical">Tactical</option>
                        <option value="Technique">Technique</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Power">Power</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Target Value</label>
                      <input
                        type="text"
                        value={newGoalTarget}
                        onChange={(e) => setNewGoalTarget(e.target.value)}
                        className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1">Target Deadline</label>
                      <input
                        type="text"
                        value={newGoalDeadline}
                        onChange={(e) => setNewGoalDeadline(e.target.value)}
                        className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddGoalForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#BEF264] text-black text-xs font-bold rounded-lg hover:bg-[#aee750] cursor-pointer"
                    >
                      Save Target
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal) => {
                  const linkedDrills = drills.filter((d) => d.goalId === goal.id);
                  const totalLinked = linkedDrills.length;
                  const completedLinked = linkedDrills.filter((d) => d.completed).length;
                  const computedPercent = goal.completed
                    ? 100
                    : totalLinked > 0
                    ? Math.round((completedLinked / totalLinked) * 100)
                    : goal.progressPercent;

                  return (
                    <Card3D key={goal.id} intensity={8}>
                      <div
                        className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all h-full ${
                          goal.completed || computedPercent >= 100
                            ? 'bg-emerald-500/[0.04] border-emerald-500/20'
                            : 'bg-[#121829] border-white/10'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono mb-2">
                            <span className="text-[#BEF264] font-semibold">{goal.category}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">Due: {goal.deadline}</span>
                              <button
                                onClick={() => deleteGoal(goal.id)}
                                title="Delete Goal"
                                className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h4
                            className={`text-sm font-bold ${
                              goal.completed ? 'text-slate-400 line-through' : 'text-white'
                            }`}
                          >
                            {goal.title}
                          </h4>

                          <div className="mt-3 flex items-center justify-between text-xs font-mono">
                            <span className="text-slate-400">Current: {goal.currentValue}</span>
                            <span className="text-white font-bold">Target: {goal.targetValue}</span>
                          </div>

                          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-2.5">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${
                                goal.completed || computedPercent >= 100 ? 'bg-emerald-400' : 'bg-[#BEF264]'
                              }`}
                              style={{ width: `${computedPercent}%` }}
                            />
                          </div>

                          {totalLinked > 0 && (
                            <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                              <span>Linked Tasks:</span>
                              <span className="text-[#BEF264] font-semibold">
                                {completedLinked} of {totalLinked} completed
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                          <span className="text-xs font-mono text-slate-400">{computedPercent}% Progress</span>
                          <button
                            onClick={() => toggleGoalComplete(goal.id)}
                            className={`px-3 py-1 rounded text-xs font-semibold font-mono transition-colors cursor-pointer ${
                              goal.completed
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-white/10 text-white hover:bg-white/15'
                            }`}
                          >
                            {goal.completed ? '✓ Achieved' : 'Mark Complete'}
                          </button>
                        </div>
                      </div>
                    </Card3D>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
