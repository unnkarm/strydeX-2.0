import {
  UserProfile,
  MatchPerformance,
  VideoAnalysisItem,
  TrainingDrill,
  DevelopmentGoal,
  TrainingProgram
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text();
    let message = `Request failed: ${res.status} ${res.statusText}`;
    try {
      const errorJson = JSON.parse(errorText);
      if (errorJson.message) message = errorJson.message;
    } catch {
      if (errorText) message = errorText;
    }
    throw new Error(message);
  }
  return res.json();
}

export const api = {
  // Health & connection status
  async checkHealth(): Promise<{ status: string; uptime: number; service: string }> {
    const res = await fetch(`${API_BASE_URL}/health`);
    return handleResponse(res);
  },

  // Auth API
  auth: {
    async login(email: string, password?: string): Promise<{ user: UserProfile; token: string }> {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return handleResponse(res);
    },

    async register(data: Partial<UserProfile>): Promise<{ user: UserProfile; token: string }> {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },

    async getMe(): Promise<{ user: UserProfile }> {
      const res = await fetch(`${API_BASE_URL}/auth/me`);
      return handleResponse(res);
    }
  },

  // Profile API
  profile: {
    async getProfile(): Promise<UserProfile> {
      const res = await fetch(`${API_BASE_URL}/profile`);
      return handleResponse(res);
    },

    async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      return handleResponse(res);
    },

    async getPublicProfile(username: string): Promise<UserProfile> {
      const res = await fetch(`${API_BASE_URL}/profile/public/${encodeURIComponent(username)}`);
      return handleResponse(res);
    }
  },

  // Matches API
  matches: {
    async getAll(): Promise<MatchPerformance[]> {
      const res = await fetch(`${API_BASE_URL}/matches`);
      return handleResponse(res);
    },

    async create(match: Omit<MatchPerformance, 'id'>): Promise<MatchPerformance> {
      const res = await fetch(`${API_BASE_URL}/matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(match)
      });
      return handleResponse(res);
    },

    async delete(id: string): Promise<{ success: boolean; id: string }> {
      const res = await fetch(`${API_BASE_URL}/matches/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  // Video Analysis API
  videos: {
    async getAll(): Promise<VideoAnalysisItem[]> {
      const res = await fetch(`${API_BASE_URL}/videos`);
      return handleResponse(res);
    },

    async getById(id: string): Promise<VideoAnalysisItem> {
      const res = await fetch(`${API_BASE_URL}/videos/${id}`);
      return handleResponse(res);
    },

    async analyze(data: {
      title: string;
      discipline: string;
      shotType?: string;
      notes?: string;
    }): Promise<VideoAnalysisItem> {
      const res = await fetch(`${API_BASE_URL}/videos/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    }
  },

  // Training & Goals API
  training: {
    async getDrills(): Promise<TrainingDrill[]> {
      const res = await fetch(`${API_BASE_URL}/training/drills`);
      return handleResponse(res);
    },

    async toggleDrill(id: string): Promise<TrainingDrill> {
      const res = await fetch(`${API_BASE_URL}/training/drills/${id}/toggle`, {
        method: 'PATCH'
      });
      return handleResponse(res);
    },

    async getGoals(): Promise<DevelopmentGoal[]> {
      const res = await fetch(`${API_BASE_URL}/training/goals`);
      return handleResponse(res);
    },

    async createGoal(goal: Omit<DevelopmentGoal, 'id' | 'progressPercent' | 'completed'>): Promise<DevelopmentGoal> {
      const res = await fetch(`${API_BASE_URL}/training/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal)
      });
      return handleResponse(res);
    },

    async toggleGoal(id: string): Promise<DevelopmentGoal> {
      const res = await fetch(`${API_BASE_URL}/training/goals/${id}/toggle`, {
        method: 'PATCH'
      });
      return handleResponse(res);
    },

    async deleteGoal(id: string): Promise<{ success: boolean; id: string }> {
      const res = await fetch(`${API_BASE_URL}/training/goals/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    },

    async getPrograms(): Promise<TrainingProgram[]> {
      const res = await fetch(`${API_BASE_URL}/training/programs`);
      return handleResponse(res);
    }
  },

  // Analytics API
  analytics: {
    async getSummary(): Promise<any> {
      const res = await fetch(`${API_BASE_URL}/analytics/summary`);
      return handleResponse(res);
    },

    async getTrends(range: string): Promise<any> {
      const res = await fetch(`${API_BASE_URL}/analytics/trends?range=${range}`);
      return handleResponse(res);
    }
  },

  // AI Coach API
  aiCoach: {
    async askCoach(query: string, context?: any): Promise<{ answer: string; recommendedDrills?: string[] }> {
      const res = await fetch(`${API_BASE_URL}/ai/coach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, context })
      });
      return handleResponse(res);
    },

    async analyzeTechnique(data: {
      discipline: string;
      shotOrDelivery: string;
      metrics?: Record<string, any>;
    }): Promise<{ assessment: string; corrections: string[]; drillRecommendations: string[] }> {
      const res = await fetch(`${API_BASE_URL}/ai/biomechanics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    }
  }
};
