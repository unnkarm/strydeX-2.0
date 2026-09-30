import { Router, Request, Response } from 'express';
import { dataStore } from '../services/dataStore.js';
import { trainingPrograms } from '../data/initialStore.js';
import { TrainingDrill, DevelopmentGoal } from '../types/index.js';

export const trainingRouter = Router();

// GET /api/training/drills
trainingRouter.get('/drills', (req: Request, res: Response) => {
  try {
    const drills = dataStore.getDrills();
    res.json(drills);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch drills', message: err.message });
  }
});

// POST /api/training/drills
trainingRouter.post('/drills', (req: Request, res: Response) => {
  try {
    const { title, category, durationMin, difficulty, repsOrOvers, description, goalId } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Title is required for training drill' });
      return;
    }

    const drill: Omit<TrainingDrill, 'id'> = {
      title,
      category: category || 'Batting',
      durationMin: Number(durationMin) || 20,
      difficulty: difficulty || 'Intermediate',
      repsOrOvers: repsOrOvers || '3 sets of 15',
      description: description || '',
      completed: false,
      goalId
    };

    const created = dataStore.addDrill(drill);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create drill', message: err.message });
  }
});

// PATCH /api/training/drills/:id/toggle
trainingRouter.patch('/drills/:id/toggle', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const drill = dataStore.toggleDrill(id);
    if (!drill) {
      res.status(404).json({ error: 'Drill not found', id });
      return;
    }
    res.json(drill);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to toggle drill', message: err.message });
  }
});

// GET /api/training/goals
trainingRouter.get('/goals', (req: Request, res: Response) => {
  try {
    const goals = dataStore.getGoals();
    res.json(goals);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch goals', message: err.message });
  }
});

// POST /api/training/goals
trainingRouter.post('/goals', (req: Request, res: Response) => {
  try {
    const { title, category, targetMetric, currentValue, targetValue, deadline } = req.body;
    if (!title || !targetMetric) {
      res.status(400).json({ error: 'Title and target metric are required' });
      return;
    }

    const goal: Omit<DevelopmentGoal, 'id'> = {
      title,
      category: category || 'Technique',
      targetMetric,
      currentValue: currentValue || 'Baseline',
      targetValue: targetValue || 'Target',
      deadline: deadline || 'Dec 31, 2026',
      progressPercent: 0,
      completed: false
    };

    const created = dataStore.addGoal(goal);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create goal', message: err.message });
  }
});

// PATCH /api/training/goals/:id/toggle
trainingRouter.patch('/goals/:id/toggle', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const goal = dataStore.toggleGoal(id);
    if (!goal) {
      res.status(404).json({ error: 'Goal not found', id });
      return;
    }
    res.json(goal);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to toggle goal', message: err.message });
  }
});

// DELETE /api/training/goals/:id
trainingRouter.delete('/goals/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = dataStore.deleteGoal(id);
    if (!success) {
      res.status(404).json({ error: 'Goal not found', id });
      return;
    }
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete goal', message: err.message });
  }
});

// GET /api/training/programs
trainingRouter.get('/programs', (req: Request, res: Response) => {
  try {
    res.json(trainingPrograms);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch training programs', message: err.message });
  }
});
