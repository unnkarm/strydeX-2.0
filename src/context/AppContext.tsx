import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  MatchPerformance,
  VideoAnalysisItem,
  TrainingDrill,
  DevelopmentGoal,
  NotificationToast,
  TimeRange,
  MatchFormat
} from '../types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_MATCH_LOGS,
  INITIAL_VIDEO_SESSIONS,
  INITIAL_TODAY_DRILLS,
  INITIAL_GOALS
} from '../lib/mock-data';

export type AppView =
  | 'landing'
  | 'login'
  | 'signup'
  | 'onboarding'
  | 'dashboard'
  | 'performance'
  | 'video-analysis'
  | 'training'
  | 'athlete-profile'
  | 'public-profile'
  | 'settings';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  matches: MatchPerformance[];
  addMatch: (match: Omit<MatchPerformance, 'id'>) => void;
  videoSessions: VideoAnalysisItem[];
  currentVideoId: string;
  setCurrentVideoId: (id: string) => void;
  addVideoSession: (session: Omit<VideoAnalysisItem, 'id'>) => void;
  drills: TrainingDrill[];
  toggleDrillComplete: (id: string) => void;
  goals: DevelopmentGoal[];
  addGoal: (goal: Omit<DevelopmentGoal, 'id' | 'progressPercent' | 'completed'>) => void;
  toggleGoalComplete: (id: string) => void;
  deleteGoal: (id: string) => void;
  notifications: NotificationToast[];
  addNotification: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissNotification: (id: string) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  timeFilter: TimeRange;
  setTimeFilter: (val: TimeRange) => void;
  formatFilter: MatchFormat;
  setFormatFilter: (val: MatchFormat) => void;
  stats: {
    battingAvg: number;
    strikeRate: number;
    totalRuns: number;
    totalMatches: number;
    totalCatches: number;
    totalWickets: number;
    highScore: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage if available
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('strydex_user');
      return stored ? JSON.parse(stored) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('strydex_auth');
      return stored ? JSON.parse(stored) : true; // Default logged in for smooth exploration
    } catch {
      return true;
    }
  });

  const [activeView, setActiveView] = useState<AppView>(() => {
    try {
      const stored = localStorage.getItem('strydex_view');
      return (stored as AppView) || 'landing';
    } catch {
      return 'landing';
    }
  });

  const [matches, setMatches] = useState<MatchPerformance[]>(() => {
    try {
      const stored = localStorage.getItem('strydex_matches');
      return stored ? JSON.parse(stored) : INITIAL_MATCH_LOGS;
    } catch {
      return INITIAL_MATCH_LOGS;
    }
  });

  const [videoSessions, setVideoSessions] = useState<VideoAnalysisItem[]>(() => {
    try {
      const stored = localStorage.getItem('strydex_videos');
      return stored ? JSON.parse(stored) : INITIAL_VIDEO_SESSIONS;
    } catch {
      return INITIAL_VIDEO_SESSIONS;
    }
  });

  const [currentVideoId, setCurrentVideoId] = useState<string>(INITIAL_VIDEO_SESSIONS[0].id);

  const [drills, setDrills] = useState<TrainingDrill[]>(() => {
    try {
      const stored = localStorage.getItem('strydex_drills');
      return stored ? JSON.parse(stored) : INITIAL_TODAY_DRILLS;
    } catch {
      return INITIAL_TODAY_DRILLS;
    }
  });

  const [goals, setGoals] = useState<DevelopmentGoal[]>(() => {
    try {
      const stored = localStorage.getItem('strydex_goals');
      return stored ? JSON.parse(stored) : INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationToast[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeRange>('30D');
  const [formatFilter, setFormatFilter] = useState<MatchFormat>('All');

  // Persistence side effects
  useEffect(() => {
    try {
      localStorage.setItem('strydex_user', JSON.stringify(user));
    } catch { /* ignore */ }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('strydex_auth', JSON.stringify(isAuthenticated));
    } catch { /* ignore */ }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem('strydex_view', activeView);
    } catch { /* ignore */ }
  }, [activeView]);

  useEffect(() => {
    try {
      localStorage.setItem('strydex_matches', JSON.stringify(matches));
    } catch { /* ignore */ }
  }, [matches]);

  useEffect(() => {
    try {
      localStorage.setItem('strydex_drills', JSON.stringify(drills));
    } catch { /* ignore */ }
  }, [drills]);

  useEffect(() => {
    try {
      localStorage.setItem('strydex_goals', JSON.stringify(goals));
    } catch { /* ignore */ }
  }, [goals]);

  const addNotification = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setNotifications((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissNotification(id);
    }, 4500);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addMatch = (matchData: Omit<MatchPerformance, 'id'>) => {
    const newMatch: MatchPerformance = {
      ...matchData,
      id: `m_${Date.now()}`
    };
    setMatches((prev) => [newMatch, ...prev]);
    addNotification('Match Performance Logged', `Recorded ${newMatch.runs} runs vs ${newMatch.opponent}`);
  };

  const addVideoSession = (sessionData: Omit<VideoAnalysisItem, 'id'>) => {
    const newSession: VideoAnalysisItem = {
      ...sessionData,
      id: `vid_${Date.now()}`
    };
    setVideoSessions((prev) => [newSession, ...prev]);
    setCurrentVideoId(newSession.id);
    addNotification('Biomechanics Telemetry Ready', `Analysis computed for "${newSession.title}"`);
  };

  const toggleDrillComplete = (id: string) => {
    setDrills((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const next = !d.completed;
          if (next) {
            addNotification('Drill Completed', `Completed "${d.title}" (${d.durationMin} min)`);
          }
          return { ...d, completed: next };
        }
        return d;
      })
    );
  };

  const addGoal = (goalData: Omit<DevelopmentGoal, 'id' | 'progressPercent' | 'completed'>) => {
    const newGoal: DevelopmentGoal = {
      ...goalData,
      id: `g_${Date.now()}`,
      progressPercent: 0,
      completed: false
    };
    setGoals((prev) => [newGoal, ...prev]);
    addNotification('Development Goal Added', `Track: "${newGoal.title}"`);
  };

  const toggleGoalComplete = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const next = !g.completed;
          if (next) {
            addNotification('Goal Achieved', `Congratulations! Marked "${g.title}" as completed.`);
          }
          return {
            ...g,
            completed: next,
            progressPercent: next ? 100 : g.progressPercent
          };
        }
        return g;
      })
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    addNotification('Goal Removed', 'Development target archived');
  };

  // Computed summary metrics
  const totalRuns = matches.reduce((acc, m) => acc + m.runs, 0);
  const totalBalls = matches.reduce((acc, m) => acc + m.ballsFaced, 0);
  const outsCount = matches.filter((m) => !m.dismissal.toLowerCase().includes('not out')).length;
  const battingAvg = outsCount > 0 ? Number((totalRuns / outsCount).toFixed(1)) : totalRuns;
  const strikeRate = totalBalls > 0 ? Number(((totalRuns / totalBalls) * 100).toFixed(1)) : 0;
  const totalCatches = matches.reduce((acc, m) => acc + m.catches, 0);
  const totalWickets = matches.reduce((acc, m) => acc + (m.wickets || 0), 0);
  const highScore = matches.reduce((max, m) => Math.max(max, m.runs), 0);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        activeView,
        setActiveView,
        matches,
        addMatch,
        videoSessions,
        currentVideoId,
        setCurrentVideoId,
        addVideoSession,
        drills,
        toggleDrillComplete,
        goals,
        addGoal,
        toggleGoalComplete,
        deleteGoal,
        notifications,
        addNotification,
        dismissNotification,
        activeModal,
        setActiveModal,
        timeFilter,
        setTimeFilter,
        formatFilter,
        setFormatFilter,
        stats: {
          battingAvg,
          strikeRate,
          totalRuns,
          totalMatches: matches.length,
          totalCatches,
          totalWickets,
          highScore
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
