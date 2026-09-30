import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config.js';
import { authRouter } from './routes/auth.js';
import { profileRouter } from './routes/profile.js';
import { matchesRouter } from './routes/matches.js';
import { videosRouter } from './routes/videos.js';
import { trainingRouter } from './routes/training.js';
import { analyticsRouter } from './routes/analytics.js';
import { aiCoachRouter } from './routes/aiCoach.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: config.corsOrigin === '*' ? true : [config.corsOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health Checks
const healthHandler = (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    service: 'StrydeX-Cricket-API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/videos', videosRouter);
app.use('/api/training', trainingRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/ai', aiCoachRouter);

// 404 Route Catch-All
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Unhandled Server Error]:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred on the StrydeX API server'
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`===============================================`);
    console.log(`🚀 StrydeX 2.0 Backend Server Running`);
    console.log(`📡 URL: http://localhost:${config.port}`);
    console.log(`🩺 Health: http://localhost:${config.port}/api/health`);
    console.log(`🌐 CORS Allowed Origin: ${config.corsOrigin}`);
    console.log(`🏏 AI Coach Status: ${config.geminiApiKey ? 'Gemini 2.5 Flash Connected' : 'Heuristic Engine Active'}`);
    console.log(`===============================================`);
  });
}

export default app;
