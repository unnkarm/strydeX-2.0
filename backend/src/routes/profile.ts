import { Router, Request, Response } from 'express';
import { dataStore } from '../services/dataStore.js';

export const profileRouter = Router();

// GET /api/profile
profileRouter.get('/', (req: Request, res: Response) => {
  try {
    const user = dataStore.getUser();
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve profile', message: err.message });
  }
});

// PUT /api/profile
profileRouter.put('/', (req: Request, res: Response) => {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
      res.status(400).json({ error: 'Invalid update payload' });
      return;
    }
    const updatedUser = dataStore.updateUser(updates);
    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update profile', message: err.message });
  }
});

// GET /api/profile/public/:username
profileRouter.get('/public/:username', (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const currentUser = dataStore.getUser();

    // In single-athlete local mode, return currentUser if username matches or as scout demo
    if (
      currentUser.username.toLowerCase() === username.toLowerCase() ||
      username === 'demo' ||
      username === currentUser.playerId?.toLowerCase()
    ) {
      res.json(currentUser);
      return;
    }

    // Default scout mock profile if custom username
    res.json({
      ...currentUser,
      username,
      name: username.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch public profile', message: err.message });
  }
});
