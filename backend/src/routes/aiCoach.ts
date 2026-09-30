import { Router, Request, Response } from 'express';
import { askAiCoach } from '../services/geminiService.js';
import { analyzeBiomechanics } from '../services/biomechanicsEngine.js';

export const aiCoachRouter = Router();

// POST /api/ai/coach (or /api/ai/chat)
aiCoachRouter.post(['/coach', '/chat'], async (req: Request, res: Response) => {
  try {
    const query = req.body.query || req.body.prompt;
    const context = req.body.context || {};

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'A text query or prompt is required' });
      return;
    }

    const answer = await askAiCoach(query, context);

    // Heuristically select drill recommendations based on topic
    const lower = query.toLowerCase();
    const recommendedDrills: string[] = [];

    if (lower.includes('bouncer') || lower.includes('short') || lower.includes('pull')) {
      recommendedDrills.push('135kph Side-Arm Bouncer Evade Drill', 'Rotational Core Conditioning & 20m Shuttles');
    } else if (lower.includes('spin') || lower.includes('sweep')) {
      recommendedDrills.push('Spin Footwork & Crease Agility', 'Controlled Sweep & Paddle Placement vs Spin');
    } else if (lower.includes('drive') || lower.includes('elbow') || lower.includes('edge')) {
      recommendedDrills.push('High Elbow Hanging Ball Repetitions', 'Front-Foot Drop Ball Alignment');
    } else {
      recommendedDrills.push('High Elbow Hanging Ball Repetitions', '135kph Side-Arm Bouncer Evade Drill');
    }

    res.json({
      answer,
      recommendedDrills
    });
  } catch (err: any) {
    res.status(500).json({ error: 'AI Coach service error', message: err.message });
  }
});

// POST /api/ai/biomechanics
aiCoachRouter.post('/biomechanics', (req: Request, res: Response) => {
  try {
    const { discipline = 'Batting', shotOrDelivery, metrics } = req.body;

    const validatedDiscipline =
      discipline === 'Bowling' || discipline === 'Fielding' ? discipline : 'Batting';

    const report = analyzeBiomechanics({
      discipline: validatedDiscipline,
      shotOrDeliveryType: shotOrDelivery
    });

    const corrections = report.observations
      .filter((obs) => obs.severity === 'attention')
      .map((obs) => `${obs.title}: ${obs.description}`);

    if (corrections.length === 0) {
      corrections.push(
        'Maintain head stillness 20ms post-impact before tracking ball down the ground.'
      );
    }

    const drillRecommendations = [
      'High Elbow Hanging Ball Repetitions',
      'Rotational Core Conditioning & 20m Shuttles'
    ];

    res.json({
      assessment: report.summary,
      corrections,
      drillRecommendations,
      overallRating: report.overallRating,
      metrics: {
        ...report.metrics,
        ...metrics
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Biomechanics evaluation error', message: err.message });
  }
});
