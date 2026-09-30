import { UserProfile, MatchPerformance, VideoAnalysisItem, TrainingDrill, DevelopmentGoal, TrainingProgram } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_arjun_01',
  name: 'Arjun Sharma',
  username: 'arjun_sharma',
  playerId: 'STX-8492',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  email: 'arjun.sharma@crickettech.io',
  dob: '2001-05-18',
  gender: 'Male',
  cityState: 'Mumbai, Maharashtra',
  preferredLanguage: 'English',
  role: 'Batsman',
  battingHand: 'Right',
  battingStyle: 'Right-hand bat',
  bowlingStyle: "Don't bowl",
  level: 'Club',
  primaryFormat: 'T20',
  preferredPosition: 'Top Order (No. 3)',
  baselineStats: {
    battingAvg: 41.5,
    strikeRate: 142.8,
    highScore: 94,
    totalMatches: 48,
    bowlingEconomy: 0,
    bowlingAvg: 0,
    bestBowling: '-',
    preferredPosition: 'Top Order (No. 3)'
  },
  team: 'Kensington Wanderers CC',
  location: 'Mumbai, Maharashtra',
  bio: 'Top-order batsman specializing in aggressive powerplay pacing and middle-overs spin management. Currently developing back-foot scoring options against 135kph+ seamers.',
  jerseyNumber: 18,
  heightCm: 182,
  primaryGoals: [
    'Improve batting technique',
    'Improve power hitting',
    'Track match performance',
    'Get noticed by coaches / academies'
  ],
  publicProfile: true,
  connectedCoaches: [
    {
      id: 'cch_01',
      name: 'Michael Vaughan-Smith',
      role: 'Head Batting Consultant',
      academy: 'Surrey High Performance Center',
      verified: true
    },
    {
      id: 'cch_02',
      name: 'Rohan Mehra',
      role: 'Biomechanical & Strength Specialist',
      academy: 'Elite Cricket Labs',
      verified: true
    }
  ]
};

export const INITIAL_MATCH_LOGS: MatchPerformance[] = [
  {
    id: 'm_01',
    date: '2026-09-24',
    opponent: 'Richmond Strikers CC',
    format: 'T20',
    runs: 68,
    ballsFaced: 42,
    fours: 7,
    sixes: 3,
    dismissal: 'Caught at Long-off',
    strikeRate: 161.9,
    oversBowled: 2.0,
    runsConceded: 16,
    wickets: 1,
    catches: 2,
    runOuts: 0,
    result: 'Won',
    notes: 'Anchored 1st innings after early wickets. Targeted left-arm orthodox over mid-wicket.'
  },
  {
    id: 'm_02',
    date: '2026-09-17',
    opponent: 'Wimbledon CC 1st XI',
    format: 'One Day (50-over)',
    runs: 84,
    ballsFaced: 91,
    fours: 9,
    sixes: 1,
    dismissal: 'LBW (Reverse Swing)',
    strikeRate: 92.3,
    catches: 1,
    runOuts: 1,
    result: 'Won',
    notes: 'Disciplined leave outside off stump early on. Scored heavily through cover and mid-wicket.'
  },
  {
    id: 'm_03',
    date: '2026-09-10',
    opponent: 'Ealing Royals',
    format: 'T20',
    runs: 35,
    ballsFaced: 22,
    fours: 4,
    sixes: 1,
    dismissal: 'Bowled (Yorker)',
    strikeRate: 159.1,
    catches: 0,
    runOuts: 0,
    result: 'Lost',
    notes: 'Aggressive intent in powerplay. Needed better depth in crease against late yorker.'
  },
  {
    id: 'm_04',
    date: '2026-09-03',
    opponent: 'Hampstead Heat',
    format: 'Multi-Day (Red Ball)',
    runs: 112,
    ballsFaced: 174,
    fours: 14,
    sixes: 0,
    dismissal: 'Caught Behind',
    strikeRate: 64.4,
    oversBowled: 8.0,
    runsConceded: 32,
    wickets: 2,
    catches: 3,
    runOuts: 0,
    result: 'Won',
    notes: 'First red-ball century of the league campaign. Exceptional patience during swing session.'
  },
  {
    id: 'm_05',
    date: '2026-08-27',
    opponent: 'Blackheath CC',
    format: 'T20',
    runs: 51,
    ballsFaced: 34,
    fours: 5,
    sixes: 2,
    dismissal: 'Not Out',
    strikeRate: 150.0,
    catches: 1,
    runOuts: 0,
    result: 'Won',
    notes: 'Finished chase with 8 balls to spare. Calculated rotation against leg-spinner.'
  },
  {
    id: 'm_06',
    date: '2026-08-20',
    opponent: 'Middlesex Academy XI',
    format: 'One Day (50-over)',
    runs: 46,
    ballsFaced: 52,
    fours: 5,
    sixes: 0,
    dismissal: 'Caught at Point',
    strikeRate: 88.5,
    catches: 0,
    runOuts: 0,
    result: 'Lost',
    notes: 'Sliced upper cut against back-of-a-length bouncer directly to backward point.'
  },
  {
    id: 'm_07',
    date: '2026-08-14',
    opponent: 'Guildford Green CC',
    format: 'T20',
    runs: 41,
    ballsFaced: 28,
    fours: 4,
    sixes: 2,
    dismissal: 'Run Out',
    strikeRate: 146.4,
    catches: 2,
    runOuts: 1,
    result: 'Won',
    notes: 'Hesitation calling on a sharp drop-and-run into short cover.'
  },
  {
    id: 'm_08',
    date: '2026-08-07',
    opponent: 'Teddington Tigers',
    format: 'Net Practice',
    runs: 58,
    ballsFaced: 40,
    fours: 6,
    sixes: 2,
    dismissal: 'Retired Not Out',
    strikeRate: 145.0,
    catches: 0,
    runOuts: 0,
    result: 'Training',
    notes: 'Simulated death-overs chase against sidearm ball throwers.'
  }
];

export const INITIAL_VIDEO_SESSIONS: VideoAnalysisItem[] = [
  {
    id: 'vid_01',
    title: 'Cover Drive Biomechanics & Weight Transfer',
    discipline: 'Batting',
    date: '2026-09-27',
    duration: '00:14',
    thumbnail: '',
    status: 'Complete',
    shotType: 'Front Foot Cover Drive',
    metrics: {
      batSpeedKph: 114.2,
      backliftAngleDeg: 14.8,
      headStabilityScore: 92,
      strideLengthMeters: 1.08,
      impactTimingMs: 184
    },
    observations: [
      {
        frameTime: '00:01.2',
        phase: 'Initial Stance & Trigger',
        status: 'optimal',
        title: 'Balanced base & eye level alignment',
        description: 'Shoulder width stance with eyes strictly parallel to the horizon. Minimal head jitter on release.'
      },
      {
        frameTime: '00:02.4',
        phase: 'Stride Initiation',
        status: 'optimal',
        title: 'Front foot aligned with pitch of ball',
        description: 'Toe pointing through extra cover, creating clean hip clearance and fluid swing arc.'
      },
      {
        frameTime: '00:03.1',
        phase: 'Impact & Head Position',
        status: 'attention',
        title: 'Slight head tilt at point of contact',
        description: 'Head drifts 4cm outside the line of ball contact. Lock chin down over front knee for optimal roll.'
      },
      {
        frameTime: '00:04.0',
        phase: 'High Elbow Follow-through',
        status: 'optimal',
        title: 'Full extension through the V',
        description: 'Top hand commanding handle with high leading elbow, keeping the shot strictly along the turf.'
      }
    ],
    coachFeedback: {
      coachName: 'Michael Vaughan-Smith',
      date: '2026-09-28',
      comment: 'Superb weight transfer, Arjun. Just ensure your chin stays tucked over the knee rather than glancing up at boundary riders.'
    }
  },
  {
    id: 'vid_02',
    title: 'Back-Foot Punch vs 135kph Seam',
    discipline: 'Batting',
    date: '2026-09-22',
    duration: '00:11',
    thumbnail: '',
    status: 'Complete',
    shotType: 'Back Foot Punch',
    metrics: {
      batSpeedKph: 108.6,
      backliftAngleDeg: 12.2,
      headStabilityScore: 88,
      strideLengthMeters: 0.65,
      impactTimingMs: 142
    },
    observations: [
      {
        frameTime: '00:00.9',
        phase: 'Back & Across Movement',
        status: 'optimal',
        title: 'Crisp depth into crease',
        description: 'Back foot lands back and across towards middle stump, creating room to extend arms.'
      },
      {
        frameTime: '00:02.0',
        phase: 'Downswing Path',
        status: 'optimal',
        title: 'Vertical blade presentation',
        description: 'Bat drops smoothly from 2nd slip angle, meeting the ball directly under the eyes.'
      },
      {
        frameTime: '00:02.8',
        phase: 'Wrist Roll & Deceleration',
        status: 'attention',
        title: 'Early wrist rolling',
        description: 'Bottom hand over-rotates slightly early, restricting square-of-the-wicket placement.'
      }
    ]
  },
  {
    id: 'vid_03',
    title: 'Seam Release & Delivery Stride Mechanics',
    discipline: 'Fast bowling',
    date: '2026-09-15',
    duration: '00:18',
    thumbnail: '',
    status: 'Complete',
    metrics: {
      deliverySpeedKph: 124.5,
      releaseHeightMeters: 2.14,
      frontFootLandingAngleDeg: 84.0,
      strideLengthMeters: 1.72
    },
    observations: [
      {
        frameTime: '00:02.1',
        phase: 'Gather & Bound',
        status: 'optimal',
        title: 'Linear momentum maintenance',
        description: 'Smooth knee drive without horizontal energy loss on penultimate step.'
      },
      {
        frameTime: '00:03.5',
        phase: 'Front Foot Bracing',
        status: 'attention',
        title: 'Soft knee flex on plant',
        description: 'Front knee bends 14° on landing. Stiffening front leg brace will gain ~3kph in velocity.'
      },
      {
        frameTime: '00:04.2',
        phase: 'Seam Alignment & Release',
        status: 'optimal',
        title: 'Vertical seam presentation',
        description: 'Wrist cocked directly behind seam with clean index-middle finger balance.'
      }
    ]
  },
  {
    id: 'vid_04',
    title: 'Slip Cordon Catching & First Step Reaction',
    discipline: 'Fielding',
    date: '2026-09-08',
    duration: '00:09',
    thumbnail: '',
    status: 'Complete',
    metrics: {
      reactionTimeMs: 228
    },
    observations: [
      {
        frameTime: '00:01.0',
        phase: 'Ready Stance',
        status: 'optimal',
        title: 'Weight on balls of feet',
        description: 'Hips lowered, soft hands ready below waist level, broad peripheral focus.'
      },
      {
        frameTime: '00:01.8',
        phase: 'Take-off Lateral Dive',
        status: 'optimal',
        title: 'Clean low push-off',
        description: 'Direct step across the line of the edge with eye level maintained.'
      }
    ]
  }
];

export const INITIAL_TODAY_DRILLS: TrainingDrill[] = [
  {
    id: 'd_01',
    title: 'Front-Foot Drop Ball Alignment (Inside Out)',
    category: 'Batting',
    durationMin: 20,
    repsOrOvers: '40 balls',
    focusArea: 'Head position over the ball & high left elbow',
    completed: true,
    difficulty: 'Foundation',
    description: 'Tee drills focusing on hitting through extra cover without bottom hand dominance.',
    goalId: 'g_02'
  },
  {
    id: 'd_02',
    title: 'Short Ball Decisive Evade & Roll Protocol',
    category: 'Batting',
    durationMin: 25,
    repsOrOvers: '6 overs',
    focusArea: 'Duck or swivel pull with bat roll over top',
    completed: true,
    difficulty: 'Intermediate',
    description: 'Facing sidearm throwdowns at 130kph from 16 yards targeting shoulder height.',
    goalId: 'g_01'
  },
  {
    id: 'd_03',
    title: 'Powerplay Lofted Loft Over Extra Cover',
    category: 'Batting',
    durationMin: 20,
    repsOrOvers: '30 balls',
    focusArea: 'Base stability & clearing front leg for swing',
    completed: false,
    difficulty: 'Elite',
    description: 'Targeting 30-yard circle clearance against full pitched deliveries.',
    goalId: 'g_03'
  },
  {
    id: 'd_04',
    title: 'Single-Handed Boundary Relay Pick & Throw',
    category: 'Fielding',
    durationMin: 15,
    repsOrOvers: '24 repetitions',
    focusArea: 'Scoop pickup on the dead run & low flat throw',
    completed: false,
    difficulty: 'Intermediate',
    description: 'Under-arm and over-arm direct hits to keeper stumps from deep midwicket.',
    goalId: 'g_04'
  },
  {
    id: 'd_05',
    title: '20-Meter Shuttle Intervals & Turn Deceleration',
    category: 'Fitness',
    durationMin: 15,
    repsOrOvers: '8 sets',
    focusArea: 'Crease slide & explosive pushback to 2nd run',
    completed: false,
    difficulty: 'Elite',
    description: 'Simulating 2s and 3s between wickets wearing batting pads.',
    goalId: 'g_04'
  },
  {
    id: 'd_06',
    title: 'Controlled Sweep & Paddle Placement vs Spin',
    category: 'Batting',
    durationMin: 20,
    repsOrOvers: '36 balls',
    focusArea: 'Head position low, sweep contact point in front of pad',
    completed: false,
    difficulty: 'Intermediate',
    description: 'Rotational sweep drills targeting backward square and fine leg gaps.',
    goalId: 'g_01'
  }
];

export const INITIAL_GOALS: DevelopmentGoal[] = [
  {
    id: 'g_01',
    title: 'T20 Middle Overs Strike Rate vs Spin',
    category: 'Tactical',
    targetMetric: 'Strike Rate',
    currentValue: '138.7',
    targetValue: '150.0',
    deadline: 'Oct 31, 2026',
    progressPercent: 74,
    completed: false
  },
  {
    id: 'g_02',
    title: 'Cover Drive Head Stability Index',
    category: 'Technique',
    targetMetric: 'AI Video Score',
    currentValue: '92/100',
    targetValue: '95/100',
    deadline: 'Nov 15, 2026',
    progressPercent: 88,
    completed: false
  },
  {
    id: 'g_03',
    title: 'Dot Ball Percentage Reduction in Powerplays',
    category: 'Tactical',
    targetMetric: 'Dot Ball %',
    currentValue: '34.2%',
    targetValue: '25.0%',
    deadline: 'Dec 01, 2026',
    progressPercent: 62,
    completed: false
  },
  {
    id: 'g_04',
    title: '20-Meter Sprint Between Wickets (Padded)',
    category: 'Fitness',
    targetMetric: 'Sprint Time',
    currentValue: '2.98s',
    targetValue: '2.85s',
    deadline: 'Nov 20, 2026',
    progressPercent: 80,
    completed: false
  },
  {
    id: 'g_05',
    title: 'First-Class Red Ball Century',
    category: 'Tactical',
    targetMetric: 'Milestone',
    currentValue: '112 vs Hampstead',
    targetValue: '100+ Runs',
    deadline: 'Sep 2026',
    progressPercent: 100,
    completed: true
  }
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'prog_01',
    title: 'T20 Power Hitting & Boundary Elevation',
    discipline: 'Batting Power',
    durationWeeks: 6,
    intensity: 'High',
    description: 'Biomechanically sequenced routines to maximize bat speed through impact, hip coil, and 360-degree boundary range.',
    modulesCount: 18,
    activeAthletesCount: 342
  },
  {
    id: 'prog_02',
    title: 'Facing Fast Bowling & Short Ball Mastery',
    discipline: 'Batting Technique',
    durationWeeks: 8,
    intensity: 'Technical Focus',
    description: 'Back-and-across trigger development, head stabilization, evasive ducking, and controlled pull/hook shot execution.',
    modulesCount: 24,
    activeAthletesCount: 512
  },
  {
    id: 'prog_03',
    title: 'Mastery Against Mystery & Wrist Spin',
    discipline: 'Batting Tactical',
    durationWeeks: 5,
    intensity: 'Moderate',
    description: 'Reading variation out of the hand, soft-handed defensive drops, sweep & reverse sweep drills, and using your feet.',
    modulesCount: 15,
    activeAthletesCount: 420
  },
  {
    id: 'prog_04',
    title: 'Death Bowling Yorker & Slower Ball Accuracy',
    discipline: 'Fast Bowling',
    durationWeeks: 6,
    intensity: 'High',
    description: 'Repetitive target training for wide yorkers, knuckle balls, and back-of-the-hand slower deliveries under simulated pressure.',
    modulesCount: 18,
    activeAthletesCount: 290
  },
  {
    id: 'prog_05',
    title: 'Dynamic Ring Fielding & Direct Hit Accuracy',
    discipline: 'Fielding',
    durationWeeks: 4,
    intensity: 'High',
    description: 'Lateral ground speed, pick-up-and-throw in one fluid motion, slide recovery, and non-dominant hand throws.',
    modulesCount: 12,
    activeAthletesCount: 388
  }
];

// Historical trend data for 7D, 30D, 90D, and All Time
export const PERFORMANCE_TRENDS = {
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

// Dismissal breakdown
export const DISMISSAL_BREAKDOWN = [
  { name: 'Caught (Infield)', count: 8, percentage: 26 },
  { name: 'Caught (Outfield)', count: 9, percentage: 29 },
  { name: 'Bowled', count: 5, percentage: 16 },
  { name: 'LBW', count: 4, percentage: 13 },
  { name: 'Caught Behind', count: 3, percentage: 10 },
  { name: 'Run Out', count: 2, percentage: 6 }
];

// Scoring zones (wagon wheel areas)
export const SCORING_ZONES = [
  { zone: 'Third Man', runs: 110, percentage: 9, color: '#38BDF8' },
  { zone: 'Point & Cover Point', runs: 184, percentage: 15, color: '#60A5FA' },
  { zone: 'Cover & Extra Cover', runs: 286, percentage: 23, color: '#BEF264' }, // Highest zone
  { zone: 'Mid-Off', runs: 142, percentage: 11, color: '#A3E635' },
  { zone: 'Straight / Long-On', runs: 168, percentage: 14, color: '#4ADE80' },
  { zone: 'Mid-Wicket & Cow Corner', runs: 224, percentage: 18, color: '#FACC15' },
  { zone: 'Square Leg & Fine Leg', runs: 126, percentage: 10, color: '#FB923C' }
];

// Bowling distribution by length
export const BOWLING_LENGTH_DISTRIBUTION = [
  { length: 'Full / Yorker', balls: 48, runs: 42, wickets: 2, economy: 5.25 },
  { length: 'Good Length (6-8m)', balls: 84, runs: 68, wickets: 3, economy: 4.86 },
  { length: 'Back of Length (8-10m)', balls: 54, runs: 52, wickets: 1, economy: 5.77 },
  { length: 'Short / Bouncer (>10m)', balls: 24, runs: 28, wickets: 0, economy: 7.00 }
];

// Fielding stats
export const FIELDING_STATS = {
  totalCatches: 18,
  dropCatches: 2,
  catchEfficiency: '90.0%',
  directHits: 4,
  runOutAssists: 3,
  runsSavedInField: 84
};

// Fitness benchmarks
export const FITNESS_BENCHMARKS = [
  { test: '20m Sprint (Padded)', score: '2.98s', benchmark: '2.90s', percentile: '84th' },
  { test: 'Yo-Yo Intermittent Recovery', score: 'Level 19.4', benchmark: 'Level 20.1', percentile: '88th' },
  { test: 'Pro Agility 5-10-5 Shuttle', score: '4.42s', benchmark: '4.35s', percentile: '82nd' },
  { test: 'Broad Jump (Power)', score: '2.44m', benchmark: '2.50m', percentile: '80th' },
  { test: 'Pull-up Grip Endurance', score: '16 reps', benchmark: '15 reps', percentile: '92nd' }
];

// Pricing tiers
export const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free Athlete',
    tagline: 'Essential tracking for aspiring individual cricketers.',
    monthlyPrice: 0,
    annualPrice: 0,
    buttonText: 'Start Free',
    popular: false,
    features: [
      'Verified digital athlete profile',
      'Match and training logbook',
      'Basic batting & bowling KPI tracking',
      '3 AI video analysis sessions / month',
      'Access to standard drill library'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Athlete',
    tagline: 'Full biomechanical telemetry for serious club cricketers.',
    monthlyPrice: 19,
    annualPrice: 15,
    buttonText: 'Start Pro Trial',
    popular: true,
    features: [
      'Unlimited AI video biomechanics analysis',
      'Frame-by-frame joint & swing tracking',
      'Wagon wheel & dismissal pattern analytics',
      'Direct coach feedback & video annotation',
      'Personalized AI developmental insights',
      'Public athlete shareable portfolio link',
      'Priority video processing queue'
    ]
  },
  {
    id: 'academy',
    name: 'Academy & Coach',
    tagline: 'Complete squad intelligence for cricket clubs and schools.',
    monthlyPrice: 79,
    annualPrice: 65,
    buttonText: 'Contact Academy Sales',
    popular: false,
    features: [
      'Everything in Pro for up to 30 athletes',
      'Unified Coach command dashboard',
      'Squad comparison & selection depth charts',
      'Custom drill & training plan assignment',
      'Automated parent & scout report exports',
      'Video session side-by-side comparison',
      'Dedicated high-performance support manager'
    ]
  }
];
