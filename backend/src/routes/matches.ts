import { Router, Request, Response } from 'express';
import { dataStore } from '../services/dataStore.js';
import { MatchPerformance } from '../types/index.js';

export const matchesRouter = Router();

// GET /api/matches
matchesRouter.get('/', (req: Request, res: Response) => {
  try {
    const matches = dataStore.getMatches();
    res.json(matches);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch matches', message: err.message });
  }
});

// GET /api/matches/stats
matchesRouter.get('/stats', (req: Request, res: Response) => {
  try {
    const stats = dataStore.getStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch stats', message: err.message });
  }
});

// POST /api/matches
matchesRouter.post('/', (req: Request, res: Response) => {
  try {
    const {
      date,
      opponent,
      format,
      runs,
      ballsFaced,
      fours,
      sixes,
      dismissal,
      wickets,
      oversBowled,
      runsConceded,
      result,
      notes
    } = req.body;

    if (!opponent || runs === undefined || ballsFaced === undefined) {
      res.status(400).json({ error: 'Missing required match details (opponent, runs, ballsFaced)' });
      return;
    }

    const runsNum = Number(runs) || 0;
    const ballsNum = Number(ballsFaced) || 0;
    const calculatedStrikeRate =
      ballsNum > 0 ? Number(((runsNum / ballsNum) * 100).toFixed(1)) : 0;

    const matchPayload: Omit<MatchPerformance, 'id'> = {
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      opponent: String(opponent),
      format: format || 'T20',
      runs: runsNum,
      ballsFaced: ballsNum,
      fours: Number(fours) || 0,
      sixes: Number(sixes) || 0,
      dismissal: dismissal || 'Not Out',
      strikeRate: req.body.strikeRate !== undefined ? Number(req.body.strikeRate) : calculatedStrikeRate,
      wickets: wickets !== undefined ? Number(wickets) : undefined,
      oversBowled: oversBowled !== undefined ? Number(oversBowled) : undefined,
      runsConceded: runsConceded !== undefined ? Number(runsConceded) : undefined,
      result: result || 'Won',
      notes: notes || ''
    };

    const created = dataStore.addMatch(matchPayload);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create match', message: err.message });
  }
});

// DELETE /api/matches/:id
matchesRouter.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = dataStore.deleteMatch(id);
    if (!success) {
      res.status(404).json({ error: 'Match not found', id });
      return;
    }
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete match', message: err.message });
  }
});
