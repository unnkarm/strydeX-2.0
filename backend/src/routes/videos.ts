import { Router, Request, Response } from 'express';
import { dataStore } from '../services/dataStore.js';
import { analyzeBiomechanics } from '../services/biomechanicsEngine.js';
import { VideoSession } from '../types/index.js';

export const videosRouter = Router();

// GET /api/videos
videosRouter.get('/', (req: Request, res: Response) => {
  try {
    const videos = dataStore.getVideoSessions();
    res.json(videos);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch video sessions', message: err.message });
  }
});

// GET /api/videos/:id
videosRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = dataStore.getVideoById(id);
    if (!session) {
      res.status(404).json({ error: 'Video session not found', id });
      return;
    }
    res.json(session);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch video session', message: err.message });
  }
});

// POST /api/videos/analyze
videosRouter.post('/analyze', (req: Request, res: Response) => {
  try {
    const { title, discipline = 'Batting', shotType, notes } = req.body;

    const validatedDiscipline =
      discipline === 'Bowling' || discipline === 'Fielding' ? discipline : 'Batting';

    // Run biomechanics computer-vision kinematic simulation
    const report = analyzeBiomechanics({
      discipline: validatedDiscipline,
      shotOrDeliveryType: shotType
    });

    const newSession: Omit<VideoSession, 'id'> = {
      title: title || `${shotType || validatedDiscipline} Kinematic Calibration`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      duration: '0:45',
      discipline: validatedDiscipline,
      status: 'ready',
      metrics: {
        batSpeedKph: report.metrics.batSpeedKph,
        backliftAngleDeg: report.metrics.backliftAngleDeg,
        headStabilityScore: report.metrics.headStabilityScore,
        impactTimingMs: report.metrics.impactTimingMs,
        deliverySpeedKph: report.metrics.deliverySpeedKph,
        seamAngleDeg: report.metrics.seamAngleDeg,
        strideLengthMeters: report.metrics.strideLengthMeters
      },
      observations: report.observations,
      coachFeedback: {
        coachName: 'StrydeX AI Biomechanist',
        comment: report.summary + (notes ? ` Note: "${notes}"` : ''),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      }
    };

    const saved = dataStore.addVideoSession(newSession);
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to analyze video', message: err.message });
  }
});

// POST /api/videos
videosRouter.post('/', (req: Request, res: Response) => {
  try {
    const sessionData = req.body;
    if (!sessionData || !sessionData.title) {
      res.status(400).json({ error: 'Title is required for video session' });
      return;
    }
    const created = dataStore.addVideoSession({
      ...sessionData,
      date: sessionData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      discipline: sessionData.discipline || 'Batting',
      status: sessionData.status || 'ready',
      metrics: sessionData.metrics || {},
      observations: sessionData.observations || []
    });
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create video session', message: err.message });
  }
});
