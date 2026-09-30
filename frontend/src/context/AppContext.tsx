import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import { api } from '../services/api';

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
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  matches: MatchPerformance[];
  addMatch: (match: Omit<MatchPerformance, 'id'>) => Promise<void>;
  deleteMatch: (id: string) => Promise<void>;
  videoSessions: VideoAnalysisItem[];
  currentVideoId: string;
  setCurrentVideoId: (id: string) => void;
  addVideoSession: (session: Omit<VideoAnalysisItem, 'id'>) => Promise<void>;
  drills: TrainingDrill[];
  toggleDrillComplete: (id: string) => Promise<void>;
  goals: DevelopmentGoal[];
  addGoal: (goal: Omit<DevelopmentGoal, 'id' | 'progressPercent' | 'completed'>) => Promise<void>;
  toggleGoalComplete: (id: string) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  notifications: NotificationToast[];
  addNotification: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissNotification: (id: string) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  timeFilter: TimeRange;
  setTimeFilter: (val: TimeRange) => void;
  formatFilter: MatchFormat;
  setFormatFilter: (val: MatchFormat) => void;
  isBackendConnected: boolean;
  isSyncing: boolean;
  refreshBackendData: () => Promise<void>;
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
      return stored ? JSON.parse(stored) : true;
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

  const [currentVideoId, setCurrentVideoId] = useState<string>(() => {
    return videoSessions[0]?.id || 'vid_01';
  });

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
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const addNotification = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setNotifications((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissNotification(id);
    }, 4500);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Fetch all initial data from backend if available
  const refreshBackendData = useCallback(async () => {
    setIsSyncing(true);
    try {
      await api.checkHealth();
      setIsBackendConnected(true);

      const [profileData, matchesData, videosData, drillsData, goalsData] = await Promise.all([
        api.profile.getProfile().catch(() => null),
        api.matches.getAll().catch(() => null),
        api.videos.getAll().catch(() => null),
        api.training.getDrills().catch(() => null),
        api.training.getGoals().catch(() => null),
      ]);

      if (profileData) setUser(profileData);
      if (matchesData && matchesData.length > 0) setMatches(matchesData);
      if (videosData && videosData.length > 0) {
        setVideoSessions(videosData);
        setCurrentVideoId(videosData[0].id);
      }
      if (drillsData && drillsData.length > 0) setDrills(drillsData);
      if (goalsData && goalsData.length > 0) setGoals(goalsData);
    } catch {
      setIsBackendConnected(false);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    refreshBackendData();
    // Poll backend health periodically
    const interval = setInterval(async () => {
      try {
        await api.checkHealth();
        setIsBackendConnected(true);
      } catch {
        setIsBackendConnected(false);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [refreshBackendData]);

  // Local storage caching side effects
  useEffect(() => {
    try { localStorage.setItem('strydex_user', JSON.stringify(user)); } catch { /* ignore */ }
  }, [user]);

  useEffect(() => {
    try { localStorage.setItem('strydex_auth', JSON.stringify(isAuthenticated)); } catch { /* ignore */ }
  }, [isAuthenticated]);

  useEffect(() => {
    try { localStorage.setItem('strydex_view', activeView); } catch { /* ignore */ }
  }, [activeView]);

  useEffect(() => {
    try { localStorage.setItem('strydex_matches', JSON.stringify(matches)); } catch { /* ignore */ }
  }, [matches]);

  useEffect(() => {
    try { localStorage.setItem('strydex_drills', JSON.stringify(drills)); } catch { /* ignore */ }
  }, [drills]);

  useEffect(() => {
    try { localStorage.setItem('strydex_goals', JSON.stringify(goals)); } catch { /* ignore */ }
  }, [goals]);

  useEffect(() => {
    try { localStorage.setItem('strydex_videos', JSON.stringify(videoSessions)); } catch { /* ignore */ }
  }, [videoSessions]);

  // Actions integrated with API
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    if (isBackendConnected) {
      try {
        const saved = await api.profile.updateProfile(updates);
        setUser(saved);
        addNotification('Profile Saved', 'Backend synchronized successfully.');
      } catch {
        addNotification('Offline Save', 'Profile saved locally.', 'info');
      }
    } else {
      addNotification('Profile Saved', 'Profile saved locally (Offline).', 'info');
    }
  };

  const addMatch = async (matchData: Omit<MatchPerformance, 'id'>) => {
    const tempId = `m_${Date.now()}`;
    const newMatch: MatchPerformance = { ...matchData, id: tempId };
    setMatches((prev) => [newMatch, ...prev]);

    if (isBackendConnected) {
      try {
        const savedMatch = await api.matches.create(matchData);
        setMatches((prev) => prev.map((m) => (m.id === tempId ? savedMatch : m)));
        addNotification('Match Performance Logged', `Recorded ${savedMatch.runs} runs vs ${savedMatch.opponent} (Synced with API)`);
        return;
      } catch {
        addNotification('Match Performance Logged', `Recorded ${newMatch.runs} runs vs ${newMatch.opponent} (Saved locally)`);
        return;
      }
    }
    addNotification('Match Performance Logged', `Recorded ${newMatch.runs} runs vs ${newMatch.opponent}`);
  };

  const deleteMatch = async (id: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
    if (isBackendConnected) {
      try {
        await api.matches.delete(id);
      } catch { /* ignore */ }
    }
    addNotification('Match Record Removed', 'Match log deleted.');
  };

  const addVideoSession = async (sessionData: Omit<VideoAnalysisItem, 'id'>) => {
    const tempId = `vid_${Date.now()}`;
    const newSession: VideoAnalysisItem = { ...sessionData, id: tempId };
    setVideoSessions((prev) => [newSession, ...prev]);
    setCurrentVideoId(tempId);

    if (isBackendConnected) {
      try {
        const analyzed = await api.videos.analyze({
          title: sessionData.title,
          discipline: sessionData.discipline,
          shotType: sessionData.shotType
        });
        setVideoSessions((prev) => prev.map((s) => (s.id === tempId ? analyzed : s)));
        setCurrentVideoId(analyzed.id);
        addNotification('Biomechanics Telemetry Ready', `AI analysis generated for "${analyzed.title}"`);
        return;
      } catch {
        addNotification('Session Logged', `Saved video session "${newSession.title}"`);
        return;
      }
    }
    addNotification('Biomechanics Telemetry Ready', `Analysis computed for "${newSession.title}"`);
  };

  const toggleDrillComplete = async (id: string) => {
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

    if (isBackendConnected) {
      try {
        await api.training.toggleDrill(id);
      } catch { /* ignore */ }
    }
  };

  const addGoal = async (goalData: Omit<DevelopmentGoal, 'id' | 'progressPercent' | 'completed'>) => {
    const tempId = `g_${Date.now()}`;
    const newGoal: DevelopmentGoal = {
      ...goalData,
      id: tempId,
      progressPercent: 0,
      completed: false
    };
    setGoals((prev) => [newGoal, ...prev]);

    if (isBackendConnected) {
      try {
        const savedGoal = await api.training.createGoal(goalData);
        setGoals((prev) => prev.map((g) => (g.id === tempId ? savedGoal : g)));
        addNotification('Development Goal Added', `Track: "${savedGoal.title}" (API Synced)`);
        return;
      } catch { /* ignore */ }
    }
    addNotification('Development Goal Added', `Track: "${newGoal.title}"`);
  };

  const toggleGoalComplete = async (id: string) => {
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

    if (isBackendConnected) {
      try {
        await api.training.toggleGoal(id);
      } catch { /* ignore */ }
    }
  };

  const deleteGoal = async (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    if (isBackendConnected) {
      try {
        await api.training.deleteGoal(id);
      } catch { /* ignore */ }
    }
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
        updateUserProfile,
        isAuthenticated,
        setIsAuthenticated,
        activeView,
        setActiveView,
        matches,
        addMatch,
        deleteMatch,
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
        isBackendConnected,
        isSyncing,
        refreshBackendData,
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
