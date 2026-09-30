import { Router, Request, Response } from 'express';
import { dataStore } from '../services/dataStore.js';

export const analyticsRouter = Router();

const SCORING_ZONES = [
  { zone: 'Third Man', runs: 110, percentage: 9, color: '#38BDF8' },
  { zone: 'Point & Cover Point', runs: 184, percentage: 15, color: '#60A5FA' },
  { zone: 'Cover & Extra Cover', runs: 286, percentage: 23, color: '#BEF264' },
  { zone: 'Mid-Off', runs: 142, percentage: 11, color: '#A3E635' },
  { zone: 'Straight / Long-On', runs: 168, percentage: 14, color: '#4ADE80' },
  { zone: 'Mid-Wicket & Cow Corner', runs: 224, percentage: 18, color: '#FACC15' },
  { zone: 'Square Leg & Fine Leg', runs: 126, percentage: 10, color: '#FB923C' }
];

const DISMISSAL_BREAKDOWN = [
  { name: 'Caught (Infield)', count: 8, percentage: 26 },
  { name: 'Caught (Outfield)', count: 9, percentage: 29 },
  { name: 'Bowled', count: 5, percentage: 16 },
  { name: 'LBW', count: 4, percentage: 13 },
  { name: 'Caught Behind', count: 3, percentage: 10 },
  { name: 'Run Out', count: 2, percentage: 6 }
];

const BOWLING_LENGTHS = [
  { length: 'Full / Yorker', balls: 48, runs: 42, wickets: 2, economy: 5.25 },
  { length: 'Good Length (6-8m)', balls: 84, runs: 68, wickets: 3, economy: 4.86 },
  { length: 'Back of Length (8-10m)', balls: 54, runs: 52, wickets: 1, economy: 5.77 },
  { length: 'Short / Bouncer (>10m)', balls: 24, runs: 28, wickets: 0, economy: 7.00 }
];

const FIELDING_STATS = {
  totalCatches: 18,
  dropCatches: 2,
  catchEfficiency: '90.0%',
  directHits: 4,
  runOutAssists: 3,
  runsSavedInField: 84
};

const FITNESS_BENCHMARKS = [
  { test: '20m Sprint (Padded)', score: '2.98s', benchmark: '2.90s', percentile: '84th' },
  { test: 'Yo-Yo Intermittent Recovery', score: 'Level 19.4', benchmark: 'Level 20.1', percentile: '88th' },
  { test: 'Pro Agility 5-10-5 Shuttle', score: '4.42s', benchmark: '4.35s', percentile: '82nd' },
  { test: 'Broad Jump (Power)', score: '2.44m', benchmark: '2.50m', percentile: '80th' },
  { test: 'Pull-up Grip Endurance', score: '16 reps', benchmark: '15 reps', percentile: '92nd' }
];

const PERFORMANCE_TRENDS: Record<string, any[]> = {
  '7D': [
    { date: 'Sep 22', avg: 41.2, sr: 136.0, consistency: 82, runs: 38 },
    { date: 'Sep 23', avg: 41.8, sr: 137.2, consistency: 84, runs: 0 },
    { date: 'Sep 24', avg: 42.5, sr: 138.7, consistency: 88, runs: 68 },
    { date: 'Sep 25', avg: 42.5, sr: 138.7, consistency: 90, runs: 0 },
    { date: 'Sep 26', avg: 42.5, sr: 138.7, consistency: 91, runs: 0 },
    { date: 'Sep 27', avg: 42.5, sr: 138.7, consistency: 92, runs: 0 },
    { date: 'Sep 28', avg: 42.5, sr: 138.7, consistency: 94, runs: 0 }
  ],
  '30D': [
    { date: 'Aug 30', avg: 38.6, sr: 131.2, consistency: 78, runs: 28 },
    { date: 'Sep 03', avg: 40.4, sr: 132.8, consistency: 80, runs: 112 },
    { date: 'Sep 07', avg: 40.8, sr: 133.5, consistency: 82, runs: 45 },
    { date: 'Sep 10', avg: 41.1, sr: 134.8, consistency: 83, runs: 35 },
    { date: 'Sep 14', avg: 41.6, sr: 135.4, consistency: 85, runs: 0 },
    { date: 'Sep 17', avg: 42.1, sr: 136.9, consistency: 86, runs: 84 },
    { date: 'Sep 21', avg: 42.2, sr: 137.5, consistency: 88, runs: 0 },
    { date: 'Sep 24', avg: 42.5, sr: 138.7, consistency: 92, runs: 68 }
  ],
  '90D': [
    { date: 'Jul 05', avg: 34.2, sr: 124.0, consistency: 70, runs: 42 },
    { date: 'Jul 19', avg: 35.8, sr: 126.5, consistency: 73, runs: 58 },
    { date: 'Aug 02', avg: 37.1, sr: 129.0, consistency: 76, runs: 71 },
    { date: 'Aug 16', avg: 38.5, sr: 131.5, consistency: 79, runs: 46 },
    { date: 'Aug 30', avg: 39.8, sr: 134.0, consistency: 82, runs: 51 },
    { date: 'Sep 13', avg: 41.2, sr: 136.8, consistency: 87, runs: 64 },
    { date: 'Sep 28', avg: 42.5, sr: 138.7, consistency: 92, runs: 68 }
  ],
  'All Time': [
    { date: '2024', avg: 29.4, sr: 118.2, consistency: 64, runs: 540 },
    { date: '2025 H1', avg: 34.8, sr: 126.0, consistency: 72, runs: 780 },
    { date: '2025 H2', avg: 38.2, sr: 132.4, consistency: 80, runs: 950 },
    { date: '2026', avg: 42.5, sr: 138.7, consistency: 92, runs: 1240 }
  ]
};

// GET /api/analytics/summary
analyticsRouter.get('/summary', (req: Request, res: Response) => {
  try {
    const stats = dataStore.getStats();
    const matches = dataStore.getMatches();

    const totalFours = matches.reduce((acc, m) => acc + m.fours, 0);
    const totalSixes = matches.reduce((acc, m) => acc + m.sixes, 0);
    const boundaryRuns = totalFours * 4 + totalSixes * 6;
    const boundaryPercentage =
      stats.totalRuns > 0 ? Math.round((boundaryRuns / stats.totalRuns) * 100) : 0;

    const totalOvers = matches.reduce((acc, m) => acc + (m.oversBowled || 0), 0);
    const totalConceded = matches.reduce((acc, m) => acc + (m.runsConceded || 0), 0);
    const bowlingEconomy =
      totalOvers > 0 ? Number((totalConceded / totalOvers).toFixed(2)) : 5.14;

    res.json({
      batting: {
        ...stats,
        totalFours,
        totalSixes,
        boundaryPercentage,
        estimatedDotBallPct: 34.2,
        controlIndex: 84.6
      },
      bowling: {
        totalOvers,
        totalWickets: stats.totalWickets,
        totalConceded,
        bowlingEconomy,
        lengths: BOWLING_LENGTHS
      },
      fielding: FIELDING_STATS,
      fitness: FITNESS_BENCHMARKS,
      scoringZones: SCORING_ZONES,
      dismissalBreakdown: DISMISSAL_BREAKDOWN
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve analytics summary', message: err.message });
  }
});

// GET /api/analytics/trends
analyticsRouter.get('/trends', (req: Request, res: Response) => {
  try {
    const range = (req.query.range as string) || '30D';
    const series = PERFORMANCE_TRENDS[range] || PERFORMANCE_TRENDS['30D'];
    res.json({
      range,
      trends: series
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve trends', message: err.message });
  }
});

// GET /api/analytics/zones
analyticsRouter.get('/zones', (_req: Request, res: Response) => {
  res.json(SCORING_ZONES);
});

// GET /api/analytics/dismissals
analyticsRouter.get('/dismissals', (_req: Request, res: Response) => {
  res.json(DISMISSAL_BREAKDOWN);
});
