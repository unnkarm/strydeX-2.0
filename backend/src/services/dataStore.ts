import {
  UserProfile,
  MatchPerformance,
  VideoSession,
  TrainingDrill,
  DevelopmentGoal,
  AthleteStats
} from '../types/index.js';
import {
  initialUser,
  initialStats,
  initialMatches,
  initialVideoSessions,
  initialDrills,
  initialGoals
} from '../data/initialStore.js';

class DataStore {
  private user: UserProfile = { ...initialUser };
  private stats: AthleteStats = { ...initialStats };
  private matches: MatchPerformance[] = [...initialMatches];
  private videoSessions: VideoSession[] = [...initialVideoSessions];
  private drills: TrainingDrill[] = [...initialDrills];
  private goals: DevelopmentGoal[] = [...initialGoals];

  // User Profile
  public getUser(): UserProfile {
    return { ...this.user };
  }

  public updateUser(partial: Partial<UserProfile>): UserProfile {
    this.user = {
      ...this.user,
      ...partial
    };
    return { ...this.user };
  }

  // Stats
  public getStats(): AthleteStats {
    this.recalculateStats();
    return { ...this.stats };
  }

  private recalculateStats(): void {
    const totalRuns = this.matches.reduce((acc, m) => acc + m.runs, 0);
    const outs = this.matches.filter(
      (m) => !m.dismissal.toLowerCase().includes('not out')
    ).length;
    const battingAvg = outs > 0 ? Number((totalRuns / outs).toFixed(1)) : totalRuns;

    const totalBalls = this.matches.reduce((acc, m) => acc + m.ballsFaced, 0);
    const strikeRate =
      totalBalls > 0 ? Number(((totalRuns / totalBalls) * 100).toFixed(1)) : 0;

    const highScore = this.matches.reduce((max, m) => Math.max(max, m.runs), 0);
    const totalWickets = this.matches.reduce((acc, m) => acc + (m.wickets || 0), 0);

    this.stats = {
      ...this.stats,
      totalRuns,
      battingAvg,
      strikeRate,
      highScore,
      totalMatches: this.matches.length,
      totalWickets
    };
  }

  // Matches
  public getMatches(): MatchPerformance[] {
    return [...this.matches];
  }

  public addMatch(matchData: Omit<MatchPerformance, 'id'>): MatchPerformance {
    const newMatch: MatchPerformance = {
      ...matchData,
      id: `m_${Date.now()}`
    };
    this.matches.unshift(newMatch);
    this.recalculateStats();
    return newMatch;
  }

  public deleteMatch(id: string): boolean {
    const prevLen = this.matches.length;
    this.matches = this.matches.filter((m) => m.id !== id);
    if (this.matches.length !== prevLen) {
      this.recalculateStats();
      return true;
    }
    return false;
  }

  // Video Sessions
  public getVideoSessions(): VideoSession[] {
    return [...this.videoSessions];
  }

  public getVideoById(id: string): VideoSession | undefined {
    return this.videoSessions.find((v) => v.id === id);
  }

  public addVideoSession(sessionData: Omit<VideoSession, 'id'>): VideoSession {
    const newSession: VideoSession = {
      ...sessionData,
      id: `v_${Date.now()}`
    };
    this.videoSessions.unshift(newSession);
    return newSession;
  }

  // Drills
  public getDrills(): TrainingDrill[] {
    return [...this.drills];
  }

  public addDrill(drillData: Omit<TrainingDrill, 'id'>): TrainingDrill {
    const newDrill: TrainingDrill = {
      ...drillData,
      id: `d_${Date.now()}`
    };
    this.drills.push(newDrill);
    return newDrill;
  }

  public toggleDrill(id: string): TrainingDrill | undefined {
    const drill = this.drills.find((d) => d.id === id);
    if (drill) {
      drill.completed = !drill.completed;
      return { ...drill };
    }
    return undefined;
  }

  // Goals
  public getGoals(): DevelopmentGoal[] {
    return [...this.goals];
  }

  public addGoal(goalData: Omit<DevelopmentGoal, 'id'>): DevelopmentGoal {
    const newGoal: DevelopmentGoal = {
      ...goalData,
      id: `g_${Date.now()}`
    };
    this.goals.push(newGoal);
    return newGoal;
  }

  public toggleGoal(id: string): DevelopmentGoal | undefined {
    const goal = this.goals.find((g) => g.id === id);
    if (goal) {
      goal.completed = !goal.completed;
      if (goal.completed) {
        goal.progressPercent = 100;
      }
      return { ...goal };
    }
    return undefined;
  }

  public deleteGoal(id: string): boolean {
    const prevLen = this.goals.length;
    this.goals = this.goals.filter((g) => g.id !== id);
    return this.goals.length !== prevLen;
  }
}

export const dataStore = new DataStore();
