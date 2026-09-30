export type CricketRole = 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';
export type BattingHand = 'Right' | 'Left';
export type BattingStyle = 'Right-hand bat' | 'Left-hand bat';
export type BowlingStyle =
  | 'Right-arm fast'
  | 'Left-arm fast'
  | 'Right-arm medium'
  | 'Left-arm medium'
  | 'Right-arm off-spin'
  | 'Right-arm leg-spin'
  | 'Left-arm orthodox'
  | 'Left-arm wrist spin'
  | "Don't bowl";

export type PlayingLevel = 'Beginner' | 'Amateur' | 'Club' | 'District' | 'State' | 'Professional';
export type PrimaryFormat = 'T20' | 'ODI' | 'Test' | 'All formats';
export type MatchFormat = 'All' | 'T20' | 'One Day (50-over)' | 'Multi-Day (Red Ball)';

export interface BaselinePerformance {
  battingAvg: number;
  strikeRate: number;
  highScore: string;
  totalMatches: number;
  bowlingEconomy?: number;
  bowlingAvg?: number;
  bestBowling?: string;
  preferredPosition?: string;
}

export interface CoachInfo {
  id: string;
  name: string;
  role: string;
  academy: string;
  avatarUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  playerId?: string;
  role: CricketRole;
  battingHand?: BattingHand;
  battingStyle: BattingStyle;
  bowlingStyle: BowlingStyle;
  level: PlayingLevel;
  primaryFormat?: PrimaryFormat;
  team: string;
  location: string;
  cityState?: string;
  dob?: string;
  gender?: string;
  preferredLanguage?: string;
  jerseyNumber: number;
  bio: string;
  avatarUrl?: string;
  baselineStats?: BaselinePerformance;
  preferredPosition?: string;
  primaryGoals: string[];
  connectedCoaches: CoachInfo[];
  publicProfile: boolean;
  onboardingCompleted?: boolean;
}

export interface MatchPerformance {
  id: string;
  date: string;
  opponent: string;
  format: 'T20' | 'One Day (50-over)' | 'Multi-Day (Red Ball)';
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  dismissal: string;
  strikeRate: number;
  wickets?: number;
  oversBowled?: number;
  runsConceded?: number;
  result: 'Won' | 'Lost' | 'Drawn' | 'Tied';
  notes?: string;
}

export interface VideoSessionObservation {
  frameTime: string;
  title: string;
  description: string;
  severity: 'positive' | 'attention' | 'neutral';
}

export interface VideoSession {
  id: string;
  title: string;
  date: string;
  duration: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  discipline: 'Batting' | 'Bowling' | 'Fielding';
  status: 'ready' | 'processing' | 'failed';
  metrics: {
    batSpeedKph?: number;
    backliftAngleDeg?: number;
    headStabilityScore?: number;
    impactTimingMs?: number;
    deliverySpeedKph?: number;
    seamAngleDeg?: number;
    strideLengthMeters?: number;
  };
  observations: VideoSessionObservation[];
  coachFeedback?: {
    coachName: string;
    comment: string;
    date: string;
  };
}

export interface TrainingDrill {
  id: string;
  title: string;
  category: 'Batting' | 'Bowling' | 'Fielding' | 'Fitness';
  durationMin: number;
  difficulty: 'Foundation' | 'Intermediate' | 'Elite';
  repsOrOvers: string;
  description: string;
  completed: boolean;
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

export interface AthleteStats {
  battingAvg: number;
  strikeRate: number;
  totalRuns: number;
  highScore: number;
  totalMatches: number;
  totalCatches: number;
  totalWickets: number;
}
