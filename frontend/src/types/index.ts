export type CricketRole =
  | 'Batsman'
  | 'Bowler'
  | 'All-rounder'
  | 'Wicketkeeper'
  | 'Fast Bowler'
  | 'Spin Bowler';

export type BattingHand = 'Right' | 'Left';
export type BattingStyle = 'Right-hand bat' | 'Left-hand bat';

export type BowlingStyle =
  | 'Right-arm fast'
  | 'Left-arm fast'
  | 'Right-arm off-spin'
  | 'Right-arm leg-spin'
  | 'Left-arm orthodox'
  | 'Left-arm wrist spin'
  | "Don't bowl"
  | 'Right-arm medium'
  | 'Right-arm offbreak'
  | 'Right-arm legbreak'
  | 'None';

export type PlayingLevel =
  | 'Beginner'
  | 'Amateur'
  | 'Club'
  | 'District'
  | 'State'
  | 'Professional'
  | 'Club Cricketer'
  | 'Academy Prospect'
  | 'Premier League'
  | 'First-Class Aspirant'
  | 'Recreational';

export type PrimaryFormat = 'T20' | 'ODI' | 'Test' | 'All formats';

export type MatchFormat = 'All' | 'T20' | 'One Day (50-over)' | 'Multi-Day (Red Ball)' | 'Net Practice';
export type TimeRange = '7D' | '30D' | '90D' | 'All Time';

export interface BaselinePerformance {
  battingAvg?: number | string;
  strikeRate?: number | string;
  highScore?: number | string;
  totalMatches?: number | string;
  bowlingEconomy?: number | string;
  bowlingAvg?: number | string;
  bestBowling?: string;
  preferredPosition?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  playerId?: string;
  avatarUrl: string;
  email: string;
  dob?: string;
  gender?: string;
  cityState?: string;
  preferredLanguage?: string;
  role: CricketRole;
  battingHand?: BattingHand;
  battingStyle: BattingStyle;
  bowlingStyle: BowlingStyle;
  level: PlayingLevel;
  primaryFormat?: PrimaryFormat;
  baselineStats?: BaselinePerformance;
  preferredPosition?: string;
  team: string;
  location: string;
  bio: string;
  jerseyNumber: number;
  heightCm: number;
  primaryGoals: string[];
  publicProfile: boolean;
  connectedCoaches: Array<{
    id: string;
    name: string;
    role: string;
    academy: string;
    verified: boolean;
  }>;
}

export interface MatchPerformance {
  id: string;
  date: string;
  opponent: string;
  format: 'T20' | 'One Day (50-over)' | 'Multi-Day (Red Ball)' | 'Net Practice';
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  dismissal: string;
  strikeRate: number;
  oversBowled?: number;
  runsConceded?: number;
  wickets?: number;
  catches: number;
  runOuts: number;
  result: 'Won' | 'Lost' | 'Draw' | 'Training';
  notes?: string;
}

export interface VideoAnalysisItem {
  id: string;
  title: string;
  discipline: 'Batting' | 'Fast bowling' | 'Spin bowling' | 'Fielding';
  date: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  status: 'Complete' | 'Processing' | 'Failed';
  shotType?: string;
  metrics: {
    batSpeedKph?: number;
    backliftAngleDeg?: number;
    headStabilityScore?: number; // 0-100
    strideLengthMeters?: number;
    impactTimingMs?: number;
    deliverySpeedKph?: number;
    releaseHeightMeters?: number;
    frontFootLandingAngleDeg?: number;
    reactionTimeMs?: number;
  };
  observations: Array<{
    frameTime: string;
    phase: string;
    status: 'optimal' | 'attention' | 'neutral';
    title: string;
    description: string;
  }>;
  coachFeedback?: {
    coachName: string;
    date: string;
    comment: string;
  };
}

export interface TrainingDrill {
  id: string;
  title: string;
  category: 'Batting' | 'Bowling' | 'Fielding' | 'Fitness' | 'Mental';
  durationMin: number;
  repsOrOvers?: string;
  focusArea: string;
  completed: boolean;
  difficulty: 'Foundation' | 'Intermediate' | 'Elite';
  description: string;
  goalId?: string;
}

export interface DevelopmentGoal {
  id: string;
  title: string;
  category: 'Technique' | 'Power' | 'Tactical' | 'Fitness';
  targetMetric: string;
  currentValue: string;
  targetValue: string;
  deadline: string;
  progressPercent: number;
  completed: boolean;
}

export interface TrainingProgram {
  id: string;
  title: string;
  discipline: string;
  durationWeeks: number;
  intensity: 'High' | 'Moderate' | 'Technical Focus';
  description: string;
  modulesCount: number;
  activeAthletesCount: number;
}

export interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}
