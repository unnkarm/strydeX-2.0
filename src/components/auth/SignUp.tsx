import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CricketRole, BattingStyle, BowlingStyle, PlayingLevel } from '../../types';
import { ArrowRight, ArrowLeft, Check, CheckCircle2 } from 'lucide-react';
import { StrydeXLogo } from '../ui/StrydeXLogo';

export const SignUp: React.FC = () => {
  const { user, setUser, setIsAuthenticated, setActiveView, addNotification } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState('Arjun Sharma');
  const [email, setEmail] = useState('arjun.sharma@crickettech.io');
  const [password, setPassword] = useState('password123');
  const [accountType, setAccountType] = useState<'Athlete' | 'Coach' | 'Academy'>('Athlete');

  // Step 2: Cricket Specifics
  const [role, setRole] = useState<CricketRole>('Batsman');
  const [battingStyle, setBattingStyle] = useState<BattingStyle>('Right-hand bat');
  const [bowlingStyle, setBowlingStyle] = useState<BowlingStyle>('Right-arm medium');
  const [level, setLevel] = useState<PlayingLevel>('Club Cricketer');
  const [team, setTeam] = useState('Kensington Wanderers CC');

  // Step 3: Goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Increase strike rate against spin',
    'Improve head stability on the drive',
    'Improve sprint speed between wickets'
  ]);

  const availableGoals = [
    'Increase strike rate against spin',
    'Improve head stability on the drive',
    'Master the short ball duck & pull',
    'Develop consistent death-over yorkers',
    'Increase bowling release velocity (+5kph)',
    'Sharpen slip catching reaction time',
    'Improve sprint speed between wickets',
    'Build a professional digital portfolio'
  ];

  const toggleGoal = (g: string) => {
    if (selectedGoals.includes(g)) {
      setSelectedGoals(selectedGoals.filter((x) => x !== g));
    } else {
      setSelectedGoals([...selectedGoals, g]);
    }
  };

  const handleFinishOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      name,
      email,
      role,
      battingStyle,
      bowlingStyle,
      level,
      team,
      primaryGoals: selectedGoals
    });
    setIsAuthenticated(true);
    setActiveView('dashboard');
    addNotification('Profile Created', `Welcome to StrydeX, ${name.split(' ')[0]}! Your cricket hub is ready.`);
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center z-10 space-y-3">
        <button
          onClick={() => setActiveView('landing')}
          className="inline-flex items-center justify-center transition-transform hover:scale-[1.02] cursor-pointer"
        >
          <StrydeXLogo variant="horizontal" size="md" showTagline={false} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Create Your StrydeX Account
        </h2>
        <p className="text-xs text-slate-400">Step {step} of 3 — Tailoring your cricket telemetry models</p>

        {/* Multi-step progress bar */}
        <div className="flex items-center justify-center gap-2 pt-2 max-w-xs mx-auto">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-[#BEF264]' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl z-10 px-4 sm:px-0">
        <div className="bg-[#0E1526] py-8 px-6 sm:px-10 border border-white/10 rounded-2xl shadow-2xl">
          {/* STEP 1: ACCOUNT CREDENTIALS */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base font-bold text-white">Select Account Type</h3>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {(['Athlete', 'Coach', 'Academy'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAccountType(type)}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        accountType === type
                          ? 'border-[#BEF264] bg-[#BEF264]/10 text-[#BEF264]'
                          : 'border-white/10 bg-[#161F33] text-slate-300 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Athlete Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Create Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue to Cricket Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CRICKET ROLE SPECIFICS */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base font-bold text-white">Your Cricket Profile</h3>
                <p className="text-xs text-slate-400 mt-0.5">This configures your biomechanical analysis baselines.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Primary Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as CricketRole)}
                    className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                  >
                    <option value="Batsman">Batsman</option>
                    <option value="Fast Bowler">Fast Bowler</option>
                    <option value="Spin Bowler">Spin Bowler</option>
                    <option value="All-rounder">All-rounder</option>
                    <option value="Wicketkeeper">Wicketkeeper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Playing Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as PlayingLevel)}
                    className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                  >
                    <option value="Club Cricketer">Club Cricketer</option>
                    <option value="Academy Prospect">Academy Prospect</option>
                    <option value="Premier League">Premier League</option>
                    <option value="First-Class Aspirant">First-Class Aspirant</option>
                    <option value="Recreational">Recreational</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Batting Style
                  </label>
                  <select
                    value={battingStyle}
                    onChange={(e) => setBattingStyle(e.target.value as BattingStyle)}
                    className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                  >
                    <option value="Right-hand bat">Right-hand bat</option>
                    <option value="Left-hand bat">Left-hand bat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Bowling Style
                  </label>
                  <select
                    value={bowlingStyle}
                    onChange={(e) => setBowlingStyle(e.target.value as BowlingStyle)}
                    className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                  >
                    <option value="Right-arm fast">Right-arm fast</option>
                    <option value="Right-arm medium">Right-arm medium</option>
                    <option value="Left-arm fast">Left-arm fast</option>
                    <option value="Right-arm offbreak">Right-arm offbreak</option>
                    <option value="Right-arm legbreak">Right-arm legbreak</option>
                    <option value="Left-arm orthodox">Left-arm orthodox</option>
                    <option value="None">None (Pure Batsman)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Club or Academy Name
                </label>
                <input
                  type="text"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  placeholder="e.g. Kensington Wanderers CC"
                  className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl bg-[#161F33] hover:bg-[#1E2942] text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Select Primary Goals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PRIMARY GOALS SELECTION */}
          {step === 3 && (
            <form onSubmit={handleFinishOnboarding} className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base font-bold text-white">Primary Development Targets</h3>
                <p className="text-xs text-slate-400 mt-0.5">Select 2 to 4 areas you want to concentrate on this season.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableGoals.map((goal) => {
                  const selected = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                        selected
                          ? 'border-[#BEF264] bg-[#BEF264]/10 text-white font-medium'
                          : 'border-white/10 bg-[#161F33] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          selected ? 'bg-[#BEF264] border-[#BEF264] text-black' : 'border-white/20'
                        }`}
                      >
                        {selected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="leading-snug">{goal}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-3 rounded-xl bg-[#161F33] hover:bg-[#1E2942] text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-black uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Complete Setup & Open Hub</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <button
              onClick={() => setActiveView('login')}
              className="text-[#BEF264] hover:underline font-semibold"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
