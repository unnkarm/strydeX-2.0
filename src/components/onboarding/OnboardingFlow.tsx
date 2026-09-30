import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  CricketRole,
  BattingHand,
  BattingStyle,
  BowlingStyle,
  PlayingLevel,
  PrimaryFormat,
  BaselinePerformance,
  UserProfile
} from '../../types';
import {
  Activity,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Camera,
  Upload,
  User,
  Sparkles,
  MapPin,
  Calendar,
  Languages,
  Shield,
  Award,
  Zap,
  Target,
  BarChart3,
  Flame,
  ChevronRight,
  X,
  RotateCcw,
  Sliders,
  Compass,
  Trophy,
  Dumbbell
} from 'lucide-react';
import { StrydeXLogo, StrydeXLogoIcon } from '../ui/StrydeXLogo';

const PRESET_AVATARS = [
  {
    id: 'avatar-1',
    label: 'Elite Pro',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'avatar-2',
    label: 'Seam Specialist',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'avatar-3',
    label: 'Power Striker',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'avatar-4',
    label: 'Keeper Ace',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  }
];

const AVAILABLE_GOALS = [
  {
    id: 'Improve batting technique',
    label: 'Improve batting technique',
    category: 'Batting',
    description: 'Refine elbow high trigger, head stillness & back-foot punch'
  },
  {
    id: 'Improve bowling accuracy',
    label: 'Improve bowling accuracy',
    category: 'Bowling',
    description: 'Dial in seam alignment, good-length consistency & release point'
  },
  {
    id: 'Increase batting consistency',
    label: 'Increase batting consistency',
    category: 'Batting',
    description: 'Eliminate false shots and build high-conversion innings'
  },
  {
    id: 'Improve power hitting',
    label: 'Improve power hitting',
    category: 'Batting',
    description: 'Amplify bat swing velocity and bottom-hand hip torque'
  },
  {
    id: 'Improve fielding',
    label: 'Improve fielding',
    category: 'Fielding',
    description: 'Sharpen reaction times, direct hit accuracy & boundary saves'
  },
  {
    id: 'Improve fitness',
    label: 'Improve fitness',
    category: 'Athleticism',
    description: 'Fast shuttle speed, rotational core strength & fast recovery'
  },
  {
    id: 'Track match performance',
    label: 'Track match performance',
    category: 'Analytics',
    description: 'Continuous wagon wheel, strike rate & bowling economy logs'
  },
  {
    id: 'Get noticed by coaches / academies',
    label: 'Get noticed by coaches / academies',
    category: 'Scouting',
    description: 'Generate verified biomechanical dossier for scout recruitment'
  }
];

const STEP_LABELS = [
  'Basic Info',
  'Cricket Identity',
  'Performance Info',
  'Goals & Interests',
  'Profile Preview'
];

interface OnboardingFlowProps {
  onComplete?: () => void;
  isModal?: boolean;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, isModal = false }) => {
  const { user, setUser, setIsAuthenticated, setActiveView, addNotification } = useApp();

  // Step 1 to 5, and Step 6 is Completion / Success Screen
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // STEP 1 STATE: Basic Info
  const [avatarUrl, setAvatarUrl] = useState<string>(
    user.avatarUrl || PRESET_AVATARS[0].url
  );
  const [fullName, setFullName] = useState<string>(user.name || 'Arjun Sharma');
  const [username, setUsername] = useState<string>(
    user.username || 'arjun_sharma'
  );
  const [playerId, setPlayerId] = useState<string>(
    user.playerId || `STX-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [dob, setDob] = useState<string>(user.dob || '2002-06-15');
  const [gender, setGender] = useState<string>(user.gender || 'Male');
  const [cityState, setCityState] = useState<string>(
    user.cityState || user.location || 'Mumbai, Maharashtra'
  );
  const [preferredLanguage, setPreferredLanguage] = useState<string>(
    user.preferredLanguage || 'English'
  );

  // STEP 2 STATE: Cricket Identity
  const [role, setRole] = useState<CricketRole>(
    (user.role === 'Fast Bowler' || user.role === 'Spin Bowler' ? 'Bowler' : user.role) || 'Batsman'
  );
  const [battingHand, setBattingHand] = useState<BattingHand>(
    user.battingHand || (user.battingStyle?.includes('Left') ? 'Left' : 'Right')
  );
  const [bowlingStyle, setBowlingStyle] = useState<BowlingStyle>(
    user.bowlingStyle || 'Right-arm fast'
  );
  const [level, setLevel] = useState<PlayingLevel>(user.level || 'Club');
  const [primaryFormat, setPrimaryFormat] = useState<PrimaryFormat>(
    user.primaryFormat || 'T20'
  );

  // STEP 3 STATE: Performance Info (Optional)
  const [battingAvg, setBattingAvg] = useState<string>(
    user.baselineStats?.battingAvg ? String(user.baselineStats.battingAvg) : '38.5'
  );
  const [strikeRate, setStrikeRate] = useState<string>(
    user.baselineStats?.strikeRate ? String(user.baselineStats.strikeRate) : '142.0'
  );
  const [highScore, setHighScore] = useState<string>(
    user.baselineStats?.highScore ? String(user.baselineStats.highScore) : '89*'
  );
  const [totalMatches, setTotalMatches] = useState<string>(
    user.baselineStats?.totalMatches ? String(user.baselineStats.totalMatches) : '36'
  );
  const [bowlingEconomy, setBowlingEconomy] = useState<string>(
    user.baselineStats?.bowlingEconomy ? String(user.baselineStats.bowlingEconomy) : '6.85'
  );
  const [bowlingAvg, setBowlingAvg] = useState<string>(
    user.baselineStats?.bowlingAvg ? String(user.baselineStats.bowlingAvg) : '22.4'
  );
  const [bestBowling, setBestBowling] = useState<string>(
    user.baselineStats?.bestBowling || '4/21'
  );
  const [preferredPosition, setPreferredPosition] = useState<string>(
    user.preferredPosition || 'Top Order (No. 3)'
  );
  const [skippedPerformance, setSkippedPerformance] = useState<boolean>(false);

  // STEP 4 STATE: Goals & Interests
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    user.primaryGoals && user.primaryGoals.length > 0
      ? user.primaryGoals
      : [
          'Improve batting technique',
          'Increase batting consistency',
          'Track match performance',
          'Get noticed by coaches / academies'
        ]
  );

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-load draft from localStorage if available
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('strydex_onboarding_draft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.fullName) setFullName(draft.fullName);
        if (draft.username) setUsername(draft.username);
        if (draft.playerId) setPlayerId(draft.playerId);
        if (draft.avatarUrl) setAvatarUrl(draft.avatarUrl);
        if (draft.dob) setDob(draft.dob);
        if (draft.gender) setGender(draft.gender);
        if (draft.cityState) setCityState(draft.cityState);
        if (draft.preferredLanguage) setPreferredLanguage(draft.preferredLanguage);
        if (draft.role) setRole(draft.role);
        if (draft.battingHand) setBattingHand(draft.battingHand);
        if (draft.bowlingStyle) setBowlingStyle(draft.bowlingStyle);
        if (draft.level) setLevel(draft.level);
        if (draft.primaryFormat) setPrimaryFormat(draft.primaryFormat);
        if (draft.battingAvg) setBattingAvg(draft.battingAvg);
        if (draft.strikeRate) setStrikeRate(draft.strikeRate);
        if (draft.highScore) setHighScore(draft.highScore);
        if (draft.totalMatches) setTotalMatches(draft.totalMatches);
        if (draft.bowlingEconomy) setBowlingEconomy(draft.bowlingEconomy);
        if (draft.bowlingAvg) setBowlingAvg(draft.bowlingAvg);
        if (draft.bestBowling) setBestBowling(draft.bestBowling);
        if (draft.preferredPosition) setPreferredPosition(draft.preferredPosition);
        if (draft.selectedGoals) setSelectedGoals(draft.selectedGoals);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save draft on every change
  useEffect(() => {
    try {
      const draft = {
        fullName,
        username,
        playerId,
        avatarUrl,
        dob,
        gender,
        cityState,
        preferredLanguage,
        role,
        battingHand,
        bowlingStyle,
        level,
        primaryFormat,
        battingAvg,
        strikeRate,
        highScore,
        totalMatches,
        bowlingEconomy,
        bowlingAvg,
        bestBowling,
        preferredPosition,
        selectedGoals
      };
      localStorage.setItem('strydex_onboarding_draft', JSON.stringify(draft));
    } catch {
      // ignore
    }
  }, [
    fullName,
    username,
    playerId,
    avatarUrl,
    dob,
    gender,
    cityState,
    preferredLanguage,
    role,
    battingHand,
    bowlingStyle,
    level,
    primaryFormat,
    battingAvg,
    strikeRate,
    highScore,
    totalMatches,
    bowlingEconomy,
    bowlingAvg,
    bestBowling,
    preferredPosition,
    selectedGoals
  ]);

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addNotification('File too large', 'Please upload a photo under 5MB.', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setAvatarUrl(uploadEvent.target.result as string);
          addNotification('Photo Updated', 'Your profile portrait preview has been updated.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto-generate username from Full Name if untouched
  const handleNameChange = (val: string) => {
    setFullName(val);
    if (!username || username === 'arjun_sharma') {
      const clean = val.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 16);
      if (clean) {
        setUsername(`${clean}_cricket`);
      }
    }
    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: '' }));
    }
  };

  // Toggle Goal selection
  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      if (selectedGoals.length === 1) {
        addNotification('At least one goal', 'Please keep at least one primary target.', 'info');
        return;
      }
      setSelectedGoals(selectedGoals.filter((g) => g !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  // Navigation & Validation
  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!fullName.trim() || fullName.trim().length < 2) {
        newErrors.fullName = 'Please enter your full name (minimum 2 characters)';
      }
      if (!username.trim()) {
        newErrors.username = 'Please choose a player username / handle';
      }
      if (!dob) {
        newErrors.dob = 'Please provide your date of birth';
      }
      if (!cityState.trim()) {
        newErrors.cityState = 'Please provide your city and state / region';
      }
    } else if (stepNumber === 2) {
      if (!role) {
        newErrors.role = 'Please select your primary cricket role';
      }
      if (!level) {
        newErrors.level = 'Please select your playing level';
      }
    } else if (stepNumber === 4) {
      if (selectedGoals.length === 0) {
        newErrors.goals = 'Please select at least 1 primary focus area';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const jumpToStep = (targetStep: number) => {
    setDirection(targetStep > currentStep ? 1 : -1);
    setCurrentStep(targetStep);
  };

  // Final Submission
  const handleCompleteProfile = () => {
    // Compile final profile object
    const battingStyleText: BattingStyle = battingHand === 'Left' ? 'Left-hand bat' : 'Right-hand bat';
    const computedBaseline: BaselinePerformance = {
      battingAvg: role === 'Bowler' ? 0 : Number(battingAvg) || 0,
      strikeRate: role === 'Bowler' ? 0 : Number(strikeRate) || 0,
      highScore: role === 'Bowler' ? '0' : highScore,
      totalMatches: Number(totalMatches) || 0,
      bowlingEconomy: role === 'Batsman' || role === 'Wicketkeeper' ? 0 : Number(bowlingEconomy) || 0,
      bowlingAvg: role === 'Batsman' || role === 'Wicketkeeper' ? 0 : Number(bowlingAvg) || 0,
      bestBowling: role === 'Batsman' || role === 'Wicketkeeper' ? '-' : bestBowling,
      preferredPosition
    };

    const updatedProfile: UserProfile = {
      ...user,
      name: fullName.trim(),
      username: username.trim().replace(/^@/, ''),
      playerId: playerId.trim(),
      avatarUrl,
      dob,
      gender,
      cityState: cityState.trim(),
      preferredLanguage,
      role,
      battingHand,
      battingStyle: battingStyleText,
      bowlingStyle,
      level,
      primaryFormat,
      baselineStats: computedBaseline,
      preferredPosition,
      location: cityState.trim(),
      primaryGoals: selectedGoals,
      team: user.team || `${cityState.split(',')[0]} Cricket Club`
    };

    // Update global state & persistent storage
    setUser(updatedProfile);
    setIsAuthenticated(true);
    localStorage.removeItem('strydex_onboarding_draft');
    localStorage.setItem('strydex_user', JSON.stringify(updatedProfile));
    localStorage.setItem('strydex_auth', 'true');

    // Show completion screen
    setIsCompleted(true);
    addNotification('Profile Created!', `Welcome to StrydeX, ${fullName.split(' ')[0]}!`, 'success');
  };

  const handleFinishToDashboard = () => {
    if (onComplete) {
      onComplete();
    } else {
      setActiveView('dashboard');
    }
  };

  // Progress percentage
  const progressPercent = Math.round((currentStep / 5) * 100);

  // Dynamic role info helper
  const isBattingFocused = role === 'Batsman' || role === 'Wicketkeeper' || role === 'All-rounder';
  const isBowlingFocused = role === 'Bowler' || role === 'All-rounder';

  return (
    <div className={`w-full ${isModal ? 'p-4 sm:p-6' : 'min-h-screen bg-[#000000] text-neutral-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8'} flex flex-col items-center justify-center relative selection:bg-[#BEF264] selection:text-black`}>
      {/* Container Card */}
      <div className="w-full max-w-3xl mx-auto flex flex-col">
        {/* Top Header & Brand Bar */}
        <header className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveView('landing')}
              className="cursor-pointer"
            >
              <StrydeXLogo variant="horizontal" size="sm" showTagline={false} />
            </button>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/20 uppercase">
              Athlete Onboarding
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isModal && (
              <button
                type="button"
                onClick={() => setActiveView('landing')}
                className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Exit</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </header>

        {/* SUCCESS / COMPLETION SCREEN */}
        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#09090C] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#BEF264] flex items-center justify-center text-black shadow-lg relative z-10 animate-bounce">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>

            <div className="space-y-2 relative z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#BEF264]">
                PLAYER VERIFIED · ID: {playerId}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                "Your cricket journey starts here."
              </h1>
              <p className="text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
                Welcome to StrydeX, <span className="text-white font-semibold">{fullName}</span>.
                Your certified athlete profile and biomechanical performance baselines are officially initialized.
              </p>
            </div>

            {/* Quick Player Credential Snapshot */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-4 text-left relative z-10">
              <img
                src={avatarUrl}
                alt={fullName}
                className="w-14 h-14 rounded-xl object-cover border-2 border-[#BEF264]/50 shadow-md shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white truncate">{fullName}</h4>
                  <span className="text-xs text-[#BEF264] font-mono">@{username}</span>
                </div>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  {role} · {level} · {primaryFormat}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                  <MapPin className="w-3 h-3 text-[#BEF264]" />
                  <span>{cityState}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
              <button
                type="button"
                onClick={handleFinishToDashboard}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-extrabold uppercase font-mono tracking-wider transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Go to My Dashboard</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveView('athlete-profile');
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
              >
                View Full Player Portfolio
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full bg-[#09090C] border border-white/[0.08] rounded-3xl p-5 sm:p-8 shadow-2xl relative">
            {/* Progress Stepper Bar */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-neutral-400">STEP {currentStep} OF 5</span>
                  <span className="text-neutral-600">/</span>
                  <span className="font-bold text-white tracking-tight">
                    {STEP_LABELS[currentStep - 1]}
                  </span>
                </div>
                <span className="font-mono font-bold text-[#BEF264]">{progressPercent}%</span>
              </div>

              {/* Visual Progress Bar */}
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-[#BEF264] rounded-full"
                  initial={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>

              {/* Step Pills for quick navigation if previous */}
              <div className="hidden sm:grid grid-cols-5 gap-2 pt-1">
                {STEP_LABELS.map((label, idx) => {
                  const stepNum = idx + 1;
                  const isCurrent = stepNum === currentStep;
                  const isDone = stepNum < currentStep;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        if (isDone) jumpToStep(stepNum);
                      }}
                      disabled={!isDone && !isCurrent}
                      className={`text-left py-1.5 px-2 rounded-lg text-[10px] font-mono transition-all flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/30 font-bold'
                          : isDone
                          ? 'text-neutral-400 hover:text-white cursor-pointer'
                          : 'text-neutral-600 cursor-not-allowed'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                          isDone
                            ? 'bg-[#BEF264] text-black font-bold'
                            : isCurrent
                            ? 'border border-[#BEF264] text-[#BEF264]'
                            : 'border border-neutral-700 text-neutral-600'
                        }`}
                      >
                        {isDone ? '✓' : stepNum}
                      </span>
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP CONTAINER WITH MOTION TRANSITIONS */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="space-y-6"
              >
                {/* ========================================================
                    STEP 1: BASIC INFORMATION
                   ======================================================== */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        Tell us about yourself
                      </h2>
                      <p className="text-xs text-neutral-400 mt-1">
                        Basic profile information to create your unique StrydeX player card.
                      </p>
                    </div>

                    {/* Profile Photo Uploader */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                        Profile Photo Upload & Avatar
                      </label>

                      <div className="flex flex-col sm:flex-row items-center gap-5">
                        {/* Current Photo Preview */}
                        <div className="relative group shrink-0">
                          <img
                            src={avatarUrl}
                            alt="Profile Avatar"
                            className="w-20 h-20 rounded-2xl object-cover border-2 border-[#BEF264] shadow-lg shadow-black/60"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-semibold transition-opacity cursor-pointer backdrop-blur-xs"
                          >
                            <Camera className="w-4 h-4 mb-0.5 text-[#BEF264]" />
                            <span>Change</span>
                          </button>
                        </div>

                        {/* File Upload Controls & Preset Avatars */}
                        <div className="flex-1 space-y-2.5 text-center sm:text-left">
                          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handlePhotoUpload}
                              accept="image/*"
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-3.5 py-1.5 rounded-lg bg-[#14141A] hover:bg-[#1A1A22] text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5 text-[#BEF264]" />
                              <span>Upload Photo</span>
                            </button>
                            <span className="text-[11px] text-neutral-500 font-mono">PNG, JPG or WebP up to 5MB</span>
                          </div>

                          {/* Quick presets */}
                          <div>
                            <span className="text-[10px] text-neutral-400 font-mono block mb-1.5">
                              Or choose athlete preset:
                            </span>
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                              {PRESET_AVATARS.map((preset) => (
                                <button
                                  key={preset.id}
                                  type="button"
                                  onClick={() => setAvatarUrl(preset.url)}
                                  className={`relative w-8 h-8 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                                    avatarUrl === preset.url
                                      ? 'border-[#BEF264] ring-2 ring-[#BEF264]/40 scale-105'
                                      : 'border-white/10 opacity-70 hover:opacity-100'
                                  }`}
                                  title={preset.label}
                                >
                                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Full Name & Username / Player ID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-1.5">
                          Full Name <span className="text-[#BEF264]">*</span>
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => handleNameChange(e.target.value)}
                          placeholder="e.g. Arjun Sharma"
                          className={`w-full bg-[#121216] border ${
                            errors.fullName ? 'border-red-500' : 'border-white/10'
                          } rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#BEF264] transition-colors`}
                        />
                        {errors.fullName && (
                          <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                            Username / Player ID <span className="text-[#BEF264]">*</span>
                          </label>
                          <span className="text-[10px] text-neutral-500 font-mono">ID: {playerId}</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-mono">
                            @
                          </span>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                              setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''));
                              if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
                            }}
                            placeholder="arjun_sharma"
                            className={`w-full bg-[#121216] border ${
                              errors.username ? 'border-red-500' : 'border-white/10'
                            } rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#BEF264] transition-colors font-mono`}
                          />
                        </div>
                        {errors.username && (
                          <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.username}</p>
                        )}
                      </div>
                    </div>

                    {/* Date of Birth & Gender (Optional) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-1.5">
                          Date of Birth <span className="text-[#BEF264]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={dob}
                            onChange={(e) => {
                              setDob(e.target.value);
                              if (errors.dob) setErrors((prev) => ({ ...prev, dob: '' }));
                            }}
                            className={`w-full bg-[#121216] border ${
                              errors.dob ? 'border-red-500' : 'border-white/10'
                            } rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264] transition-colors font-mono`}
                          />
                        </div>
                        {errors.dob && (
                          <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.dob}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-1.5">
                          Gender <span className="text-neutral-500 text-[10px]">(Optional)</span>
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full bg-[#121216] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264] transition-colors"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-Binary">Non-Binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    {/* City and State & Preferred Language */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-1.5">
                          City and State <span className="text-[#BEF264]">*</span>
                        </label>
                        <input
                          type="text"
                          value={cityState}
                          onChange={(e) => {
                            setCityState(e.target.value);
                            if (errors.cityState) setErrors((prev) => ({ ...prev, cityState: '' }));
                          }}
                          placeholder="e.g. Mumbai, Maharashtra"
                          className={`w-full bg-[#121216] border ${
                            errors.cityState ? 'border-red-500' : 'border-white/10'
                          } rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#BEF264] transition-colors`}
                        />
                        {errors.cityState && (
                          <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.cityState}</p>
                        )}
                        {/* Quick location chips */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {['Mumbai, MH', 'Delhi, NCR', 'Bengaluru, KA', 'London, UK', 'Melbourne, VIC'].map(
                            (loc) => (
                              <button
                                key={loc}
                                type="button"
                                onClick={() => setCityState(loc)}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                              >
                                {loc}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-1.5">
                          Preferred Language
                        </label>
                        <select
                          value={preferredLanguage}
                          onChange={(e) => setPreferredLanguage(e.target.value)}
                          className="w-full bg-[#121216] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264] transition-colors"
                        >
                          <option value="English">English</option>
                          <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                          <option value="Bengali (বাংলা)">Bengali (বাংলা)</option>
                          <option value="Tamil (தமிழ்)">Tamil (தமிழ்)</option>
                          <option value="Telugu (తెలుగు)">Telugu (తెలుగు)</option>
                          <option value="Marathi (मराठी)">Marathi (मराठी)</option>
                          <option value="Gujarati (ગુજરાતી)">Gujarati (ગુજરાતી)</option>
                          <option value="Urdu (اردو)">Urdu (اردو)</option>
                          <option value="Kannada (ಕನ್ನಡ)">Kannada (ಕನ್ನಡ)</option>
                          <option value="Spanish (Español)">Spanish (Español)</option>
                        </select>
                        <p className="text-[11px] text-neutral-500 mt-1 font-mono">
                          Used for AI coaching voice synthesis and telemetry notes.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    STEP 2: CRICKET IDENTITY
                   ======================================================== */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        Your Cricket Identity
                      </h2>
                      <p className="text-xs text-neutral-400 mt-1">
                        Select your playing role and technical orientation. Role selection customizes your telemetry models.
                      </p>
                    </div>

                    {/* Primary Role (Visual Cards) */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-2.5">
                        Primary Role <span className="text-[#BEF264]">*</span>
                      </label>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          {
                            id: 'Batsman',
                            title: 'Batsman',
                            desc: 'Stroke maker & powerplay striker',
                            icon: Zap,
                            metrics: 'Bat speed · Head stability · Wagon wheel'
                          },
                          {
                            id: 'Bowler',
                            title: 'Bowler',
                            desc: 'Pace attack or spin tactician',
                            icon: Flame,
                            metrics: 'Seam angle · Release stride · Velocity'
                          },
                          {
                            id: 'All-rounder',
                            title: 'All-rounder',
                            desc: 'Complete dual-threat cricketer',
                            icon: Shield,
                            metrics: 'Bat & ball versatility · Match impact'
                          },
                          {
                            id: 'Wicketkeeper',
                            title: 'Wicketkeeper',
                            desc: 'Gloveman anchor & alert keeper',
                            icon: Target,
                            metrics: 'Catch radius · Reaction time · Stumpings'
                          }
                        ].map((item) => {
                          const Icon = item.icon;
                          const isSelected = role === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setRole(item.id as CricketRole);
                                // Default bowling style if batsman or keeper
                                if ((item.id === 'Batsman' || item.id === 'Wicketkeeper') && bowlingStyle !== "Don't bowl") {
                                  // keep or allow option
                                }
                              }}
                              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden group ${
                                isSelected
                                  ? 'border-[#BEF264] bg-[#BEF264]/10'
                                  : 'border-white/10 bg-[#121216] hover:border-white/20'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#BEF264] flex items-center justify-center text-black">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}

                              <div>
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                                    isSelected
                                      ? 'bg-[#BEF264] text-black shadow-sm'
                                      : 'bg-white/[0.05] text-neutral-300 group-hover:text-white'
                                  }`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <h4
                                  className={`text-sm font-bold tracking-tight ${
                                    isSelected ? 'text-white' : 'text-neutral-200'
                                  }`}
                                >
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                                  {item.desc}
                                </p>
                              </div>

                              <div className="mt-4 pt-2 border-t border-white/[0.06] text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                                {item.metrics}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Batting Hand & Bowling Style */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Batting Hand */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-2">
                          Batting Hand <span className="text-[#BEF264]">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {(['Right', 'Left'] as BattingHand[]).map((hand) => {
                            const isSelected = battingHand === hand;
                            return (
                              <button
                                key={hand}
                                type="button"
                                onClick={() => setBattingHand(hand)}
                                className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                  isSelected
                                    ? 'border-[#BEF264] bg-[#BEF264]/10 text-[#BEF264]'
                                    : 'border-white/10 bg-[#121216] text-neutral-300 hover:text-white'
                                }`}
                              >
                                <span>{hand}-Hand Bat</span>
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bowling Style */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-2">
                          Bowling Style
                        </label>
                        <select
                          value={bowlingStyle}
                          onChange={(e) => setBowlingStyle(e.target.value as BowlingStyle)}
                          className="w-full bg-[#121216] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#BEF264] transition-colors"
                        >
                          <option value="Right-arm fast">Right-arm fast (130kph+)</option>
                          <option value="Left-arm fast">Left-arm fast (Angle & Swing)</option>
                          <option value="Right-arm off-spin">Right-arm off-spin (Finger spin)</option>
                          <option value="Right-arm leg-spin">Right-arm leg-spin (Wrist spin / Googly)</option>
                          <option value="Left-arm orthodox">Left-arm orthodox (Flight & turn)</option>
                          <option value="Left-arm wrist spin">Left-arm wrist spin (Chinaman)</option>
                          <option value="Don't bowl">Don't bowl (Pure Batsman / Keeper)</option>
                        </select>
                      </div>
                    </div>

                    {/* Playing Level */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-2">
                        Playing Level <span className="text-[#BEF264]">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'Beginner', label: 'Beginner', desc: 'Learning basics' },
                          { id: 'Amateur', label: 'Amateur', desc: 'Weekend & social cricket' },
                          { id: 'Club', label: 'Club', desc: 'Competitive division league' },
                          { id: 'District', label: 'District', desc: 'Zonal & representative' },
                          { id: 'State', label: 'State', desc: 'First-Class / Domestic' },
                          { id: 'Professional', label: 'Professional', desc: 'National / Franchise' }
                        ].map((lvl) => {
                          const isSelected = level === lvl.id;
                          return (
                            <button
                              key={lvl.id}
                              type="button"
                              onClick={() => setLevel(lvl.id as PlayingLevel)}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#BEF264] bg-[#BEF264]/10 text-white'
                                  : 'border-white/10 bg-[#121216] text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-bold ${isSelected ? 'text-[#BEF264]' : 'text-white'}`}>
                                  {lvl.label}
                                </span>
                                {isSelected && <Check className="w-3 h-3 text-[#BEF264]" />}
                              </div>
                              <span className="text-[10px] text-neutral-500 block mt-0.5">{lvl.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Primary Format */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono mb-2">
                        Primary Format
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {(['T20', 'ODI', 'Test', 'All formats'] as PrimaryFormat[]).map((fmt) => {
                          const isSelected = primaryFormat === fmt;
                          return (
                            <button
                              key={fmt}
                              type="button"
                              onClick={() => setPrimaryFormat(fmt)}
                              className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#BEF264] bg-[#BEF264]/15 text-[#BEF264]'
                                  : 'border-white/10 bg-[#121216] text-neutral-300 hover:text-white'
                              }`}
                            >
                              {fmt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    STEP 3: PERFORMANCE INFORMATION (CONDITIONAL & OPTIONAL)
                   ======================================================== */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                          Performance Baseline
                        </h2>
                        <p className="text-xs text-neutral-400 mt-1">
                          Optional career metrics to calibrate your AI benchmark model.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSkippedPerformance(true);
                          handleNext();
                        }}
                        className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white text-xs font-mono transition-colors border border-white/10 cursor-pointer"
                      >
                        Skip this step & fill later →
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs flex items-center gap-2 font-sans">
                      <BarChart3 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>
                        Showing metrics calibrated for your selected role:{' '}
                        <strong className="text-white font-mono">{role}</strong>. Leave any blank if unknown.
                      </span>
                    </div>

                    {/* CONDITIONAL: BATTING FIELDS (For Batsman, Wicketkeeper, All-rounder) */}
                    {isBattingFocused && (
                      <div className="p-5 rounded-2xl bg-[#121216] border border-white/[0.08] space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                          <Zap className="w-4 h-4 text-[#BEF264]" />
                          <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                            Batting Metrics
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                              Batting Avg
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={battingAvg}
                              onChange={(e) => setBattingAvg(e.target.value)}
                              placeholder="e.g. 38.5"
                              className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#BEF264]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                              Strike Rate
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={strikeRate}
                              onChange={(e) => setStrikeRate(e.target.value)}
                              placeholder="e.g. 142.0"
                              className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#BEF264]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                              Highest Score
                            </label>
                            <input
                              type="text"
                              value={highScore}
                              onChange={(e) => setHighScore(e.target.value)}
                              placeholder="e.g. 98*"
                              className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#BEF264]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                              Total Matches
                            </label>
                            <input
                              type="number"
                              value={totalMatches}
                              onChange={(e) => setTotalMatches(e.target.value)}
                              placeholder="e.g. 42"
                              className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#BEF264]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                            Preferred Batting Order Position
                          </label>
                          <select
                            value={preferredPosition}
                            onChange={(e) => setPreferredPosition(e.target.value)}
                            className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                          >
                            <option value="Opening (No. 1-2)">Opening (No. 1-2) — Powerplay pace attack</option>
                            <option value="Top Order (No. 3)">Top Order (No. 3) — Anchor & stroke play</option>
                            <option value="Middle Order (No. 4-5)">Middle Order (No. 4-5) — Spin management</option>
                            <option value="Finisher (No. 6-7)">Finisher (No. 6-7) — Death overs powerhitting</option>
                            <option value="Lower Order (No. 8-11)">Lower Order (No. 8-11)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* CONDITIONAL: BOWLING FIELDS (For Bowler, All-rounder) */}
                    {isBowlingFocused && (
                      <div className="p-5 rounded-2xl bg-[#121216] border border-white/[0.08] space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                          <Flame className="w-4 h-4 text-[#38BDF8]" />
                          <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                            Bowling Metrics
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                              Bowling Economy
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={bowlingEconomy}
                              onChange={(e) => setBowlingEconomy(e.target.value)}
                              placeholder="e.g. 6.85"
                              className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#BEF264]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                              Bowling Average
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={bowlingAvg}
                              onChange={(e) => setBowlingAvg(e.target.value)}
                              placeholder="e.g. 21.4"
                              className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#BEF264]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                              Best Bowling Figures
                            </label>
                            <input
                              type="text"
                              value={bestBowling}
                              onChange={(e) => setBestBowling(e.target.value)}
                              placeholder="e.g. 4/18"
                              className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#BEF264]"
                            />
                          </div>

                          {!isBattingFocused && (
                            <div>
                              <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                                Total Matches
                              </label>
                              <input
                                type="number"
                                value={totalMatches}
                                onChange={(e) => setTotalMatches(e.target.value)}
                                placeholder="e.g. 42"
                                className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#BEF264]"
                              />
                            </div>
                          )}
                        </div>

                        {!isBattingFocused && (
                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                              Preferred Bowling Phase
                            </label>
                            <select
                              value={preferredPosition}
                              onChange={(e) => setPreferredPosition(e.target.value)}
                              className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                            >
                              <option value="New Ball Opening Bowler">New Ball Opening Bowler (Overs 1-6)</option>
                              <option value="First Change Seamer">First Change Seamer (Overs 7-11)</option>
                              <option value="Middle Overs Control Spinner">Middle Overs Control Spinner (Overs 7-15)</option>
                              <option value="Death Overs Specialist">Death Overs Specialist (Overs 16-20 yorkers)</option>
                            </select>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ========================================================
                    STEP 4: GOALS & INTERESTS (MULTI-SELECTION)
                   ======================================================== */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                          Goals & Primary Focus
                        </h2>
                        <p className="text-xs text-neutral-400 mt-1">
                          Select the athletic and technical milestones you want StrydeX to prioritize.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/20">
                          {selectedGoals.length} selected
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedGoals.length === AVAILABLE_GOALS.length) {
                              setSelectedGoals([AVAILABLE_GOALS[0].id]);
                            } else {
                              setSelectedGoals(AVAILABLE_GOALS.map((g) => g.id));
                            }
                          }}
                          className="text-[11px] font-mono text-neutral-400 hover:text-white underline cursor-pointer"
                        >
                          {selectedGoals.length === AVAILABLE_GOALS.length ? 'Reset' : 'Select All'}
                        </button>
                      </div>
                    </div>

                    {errors.goals && (
                      <p className="text-red-400 text-xs font-mono">{errors.goals}</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {AVAILABLE_GOALS.map((goal) => {
                        const isSelected = selectedGoals.includes(goal.id);
                        return (
                          <button
                            key={goal.id}
                            type="button"
                            onClick={() => toggleGoal(goal.id)}
                            className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer relative group ${
                              isSelected
                                ? 'border-[#BEF264] bg-[#BEF264]/10'
                                : 'border-white/10 bg-[#121216] hover:border-white/20'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-lg mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                                isSelected
                                  ? 'bg-[#BEF264] border-[#BEF264] text-black'
                                  : 'border-white/20 bg-white/[0.02] group-hover:border-white/40'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4
                                  className={`text-xs font-bold leading-tight ${
                                    isSelected ? 'text-white' : 'text-neutral-200'
                                  }`}
                                >
                                  {goal.label}
                                </h4>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-neutral-400 ml-auto">
                                  {goal.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                                {goal.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ========================================================
                    STEP 5: PROFILE PREVIEW & EDIT PREVIOUS
                   ======================================================== */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        Review Your Player Profile
                      </h2>
                      <p className="text-xs text-neutral-400 mt-1">
                        Here is your official StrydeX Athlete Card. You can edit any section before finalizing.
                      </p>
                    </div>

                    {/* Master Athlete Preview Card */}
                    <div className="rounded-3xl bg-gradient-to-br from-[#121622] via-[#0C0F17] to-[#08090E] border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#BEF264] text-black uppercase shadow-sm">
                          PROSPECT CARD
                        </span>
                      </div>

                      {/* Header Section: Avatar + Name + Handles */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={avatarUrl}
                              alt={fullName}
                              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#BEF264] shadow-xl"
                            />
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#BEF264] border-2 border-black flex items-center justify-center text-black text-[10px]">
                              ✓
                            </span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                                {fullName}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono mt-0.5">
                              <span className="text-[#BEF264]">@{username}</span>
                              <span className="text-neutral-600">·</span>
                              <span className="text-neutral-400">ID: {playerId}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1">
                              <MapPin className="w-3.5 h-3.5 text-[#BEF264]" />
                              <span>{cityState}</span>
                              <span className="text-neutral-600">·</span>
                              <Languages className="w-3.5 h-3.5 text-sky-400" />
                              <span>{preferredLanguage}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => jumpToStep(1)}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-neutral-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <span>Edit Basic Info</span>
                          <Sliders className="w-3 h-3 text-[#BEF264]" />
                        </button>
                      </div>

                      {/* Cricket Identity Grid */}
                      <div className="space-y-2 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                            Cricket Identity & Technical Specs
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToStep(2)}
                            className="text-[11px] font-mono text-[#BEF264] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Edit Identity</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Role</span>
                            <span className="text-xs font-bold text-white mt-0.5 block">{role}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Batting</span>
                            <span className="text-xs font-bold text-white mt-0.5 block">{battingHand}-hand bat</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Bowling</span>
                            <span className="text-xs font-bold text-white mt-0.5 block truncate" title={bowlingStyle}>
                              {bowlingStyle}
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Tier & Format</span>
                            <span className="text-xs font-bold text-[#BEF264] mt-0.5 block">
                              {level} · {primaryFormat}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Performance Information Summary */}
                      <div className="space-y-2 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                            Baseline Performance
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToStep(3)}
                            className="text-[11px] font-mono text-[#BEF264] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Edit Stats</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-wrap items-center gap-4 text-xs font-mono">
                          {isBattingFocused && (
                            <>
                              <div>
                                <span className="text-neutral-500 text-[10px] block">BATTING AVG</span>
                                <span className="text-sm font-bold text-white">{battingAvg || '-'}</span>
                              </div>
                              <div className="h-6 w-px bg-white/10" />
                              <div>
                                <span className="text-neutral-500 text-[10px] block">STRIKE RATE</span>
                                <span className="text-sm font-bold text-white">{strikeRate || '-'}</span>
                              </div>
                              <div className="h-6 w-px bg-white/10" />
                              <div>
                                <span className="text-neutral-500 text-[10px] block">HIGH SCORE</span>
                                <span className="text-sm font-bold text-white">{highScore || '-'}</span>
                              </div>
                              <div className="h-6 w-px bg-white/10" />
                            </>
                          )}

                          {isBowlingFocused && (
                            <>
                              <div>
                                <span className="text-neutral-500 text-[10px] block">ECONOMY</span>
                                <span className="text-sm font-bold text-white">{bowlingEconomy || '-'}</span>
                              </div>
                              <div className="h-6 w-px bg-white/10" />
                              <div>
                                <span className="text-neutral-500 text-[10px] block">BOWLING AVG</span>
                                <span className="text-sm font-bold text-white">{bowlingAvg || '-'}</span>
                              </div>
                              <div className="h-6 w-px bg-white/10" />
                              <div>
                                <span className="text-neutral-500 text-[10px] block">BEST SPELL</span>
                                <span className="text-sm font-bold text-white">{bestBowling || '-'}</span>
                              </div>
                              <div className="h-6 w-px bg-white/10" />
                            </>
                          )}

                          <div>
                            <span className="text-neutral-500 text-[10px] block">POSITION</span>
                            <span className="text-xs font-sans text-neutral-300">{preferredPosition}</span>
                          </div>
                        </div>
                      </div>

                      {/* Goals Chips */}
                      <div className="space-y-2 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                            Development Targets ({selectedGoals.length})
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToStep(4)}
                            className="text-[11px] font-mono text-[#BEF264] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Edit Goals</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {selectedGoals.map((goal) => (
                            <span
                              key={goal}
                              className="px-3 py-1 rounded-lg bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/20 text-xs font-medium flex items-center gap-1.5"
                            >
                              <Check className="w-3 h-3" />
                              <span>{goal}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Actions Bar (Back & Continue) */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {currentStep === 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSkippedPerformance(true);
                      handleNext();
                    }}
                    className="px-3.5 py-2.5 text-xs text-neutral-400 hover:text-white font-mono transition-colors cursor-pointer"
                  >
                    Skip
                  </button>
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-bold transition-all flex items-center gap-2 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompleteProfile}
                    className="px-8 py-3 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-extrabold uppercase font-mono tracking-wider transition-all flex items-center gap-2 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Confirm & Create Profile</span>
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
