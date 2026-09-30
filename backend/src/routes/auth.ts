import { Router, Request, Response } from 'express';
import { dataStore } from '../services/dataStore.js';

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = dataStore.getUser();

  // For developer convenience and pairing, credentials match or accept mock
  res.json({
    success: true,
    message: 'Authentication successful',
    token: `strydex_token_${Date.now()}`,
    user
  });
});

// POST /api/auth/register
authRouter.post('/register', (req: Request, res: Response) => {
  const { name, email, role, level } = req.body;
  const updatedUser = dataStore.updateUser({
    name: name || 'Arjun Sharma',
    email: email || 'athlete@strydex.cricket',
    role: role || 'Batsman',
    level: level || 'Club'
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token: `strydex_token_${Date.now()}`,
    user: updatedUser
  });
});

// GET /api/auth/me
authRouter.get('/me', (_req: Request, res: Response) => {
  const user = dataStore.getUser();
  res.json({
    success: true,
    user
  });
});

// POST /api/auth/logout
authRouter.post('/logout', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Signed out successfully'
  });
});
