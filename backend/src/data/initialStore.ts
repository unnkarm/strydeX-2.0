import {
  UserProfile,
  MatchPerformance,
  VideoSession,
  TrainingDrill,
  DevelopmentGoal,
  AthleteStats
} from '../types/index.js';

export const initialUser: UserProfile = {
  id: 'usr_arjun_sharma',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@strydex.cricket',
  username: 'arjun_sharma',
  playerId: 'STX-8492',
  role: 'Batsman',
  battingHand: 'Right',
  battingStyle: 'Right-hand bat',
  bowlingStyle: 'Right-arm medium',
  level: 'Club',
  primaryFormat: 'T20',
  team: 'Kensington Wanderers CC - 1st XI',
  location: 'Mumbai, Maharashtra',
  cityState: 'Mumbai, Maharashtra',
  dob: '2002-06-15',
  gender: 'Male',
  preferredLanguage: 'English',
  jerseyNumber: 18,
  bio: 'Top-order batsman specializing in building fast powerplay foundations with crisp off-side driving and accelerated boundary rates against spin. Calibrated using StrydeX biomechanics sensor suits.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  baselineStats: {
    battingAvg: 42.5,
    strikeRate: 138.7,
    highScore: '114*',
    totalMatches: 24,
    bowlingEconomy: 5.14,
    bowlingAvg: 22.4,
    bestBowling: '2/18',
    preferredPosition: 'Top Order (No. 3)'
  },
  preferredPosition: 'Top Order (No. 3)',
  primaryGoals: [
    'Improve batting technique vs express pace',
    'Increase batting consistency in middle overs',
    'Track match performance & wagon wheel splits',
    'Get scouted by representative franchise academies'
  ],
  connectedCoaches: [
    {
      id: 'c1',
      name: 'Michael Vaughan-Smith',
      role: 'Head Batting & Kinematics Coach',
      academy: 'Northern Cricket Academy (ECB Level 3)'
    },
    {
      id: 'c2',
      name: 'Rohan Deshmukh',
      role: 'Lead Biomechanist & Conditioning',
      academy: 'Apex High Performance Institute'
    }
  ],
  publicProfile: true,
  onboardingCompleted: true
};

export const initialStats: AthleteStats = {
  battingAvg: 42.5,
  strikeRate: 138.7,
  totalRuns: 680,
  highScore: 114,
  totalMatches: 24,
  totalCatches: 18,
  totalWickets: 6
};

export const initialMatches: MatchPerformance[] = [
  {
    id: 'm1',
    date: 'Sep 24, 2026',
    opponent: 'Richmond City CC',
    format: 'T20',
    runs: 68,
    ballsFaced: 42,
    fours: 8,
    sixes: 2,
    dismissal: 'ct Deep Cover b Smith',
    strikeRate: 161.9,
    wickets: 1,
    oversBowled: 2.0,
    runsConceded: 14,
    result: 'Won',
    notes: 'Aggressive stroke play in overs 4-10; controlled cover drives against off-spin.'
  },
  {
    id: 'm2',
    date: 'Sep 17, 2026',
    opponent: 'Surrey Guild CC',
    format: 'One Day (50-over)',
    runs: 84,
    ballsFaced: 92,
    fours: 9,
    sixes: 1,
    dismissal: 'lbw b Patel',
    strikeRate: 91.3,
    wickets: 0,
    oversBowled: 4.0,
    runsConceded: 22,
    result: 'Won',
    notes: 'Solid anchor role through the middle overs; good strike rotation.'
  },
  {
    id: 'm3',
    date: 'Sep 10, 2026',
    opponent: 'MCC Club XI',
    format: 'T20',
    runs: 45,
    ballsFaced: 31,
    fours: 5,
    sixes: 1,
    dismissal: 'Not Out',
    strikeRate: 145.2,
    wickets: 2,
    oversBowled: 3.0,
    runsConceded: 18,
    result: 'Won',
    notes: 'Finished chase under pressure in the 19th over.'
  },
  {
    id: 'm4',
    date: 'Sep 03, 2026',
    opponent: 'Hampshire Academics',
    format: 'Multi-Day (Red Ball)',
    runs: 114,
    ballsFaced: 168,
    fours: 16,
    sixes: 0,
    dismissal: 'b Anderson',
    strikeRate: 67.9,
    wickets: 0,
    oversBowled: 5.0,
    runsConceded: 26,
    result: 'Drawn',
    notes: 'First-innings ton on seam-friendly turf; left balls outside off stump exceptionally.'
  },
  {
    id: 'm5',
    date: 'Aug 27, 2026',
    opponent: 'Sussex Strollers',
    format: 'T20',
    runs: 22,
    ballsFaced: 16,
    fours: 3,
    sixes: 0,
    dismissal: 'b Rashid',
    strikeRate: 137.5,
    wickets: 1,
    oversBowled: 1.0,
    runsConceded: 9,
    result: 'Lost',
    notes: 'Chipped googly back to bowler in 8th over.'
  }
];

export const initialVideoSessions: VideoSession[] = [
  {
    id: 'v1',
    title: 'Cover Drive vs 135kph Seam',
    date: 'Sep 21, 2026',
    duration: '0:42',
    discipline: 'Batting',
    status: 'ready',
    metrics: {
      batSpeedKph: 114.2,
      backliftAngleDeg: 14.8,
      headStabilityScore: 94,
      impactTimingMs: 12,
      strideLengthMeters: 1.18
    },
    observations: [
      {
        frameTime: '0:14',
        title: 'High Elbow Trigger Locked',
        description: 'Lead elbow maintained an exemplary 88° high frame, keeping head directly over line of delivery.',
        severity: 'positive'
      },
      {
        frameTime: '0:26',
        title: 'Sub-Millimeter Impact Plane',
        description: 'Bat face presented 3.2° closed upon contact, suppressing edge risk through third slip.',
        severity: 'positive'
      },
      {
        frameTime: '0:34',
        title: 'Follow-Through Deceleration',
        description: 'Wrist extension decelerated 18ms before apex; retain fluid high swing path to generate greater top-spin ground speed.',
        severity: 'attention'
      }
    ],
    coachFeedback: {
      coachName: 'Michael Vaughan-Smith',
      comment: 'Top-tier balance. Head is firmly stationary at impact point—this eliminates the edge risk you had earlier in the season.',
      date: 'Sep 22, 2026'
    }
  },
  {
    id: 'v2',
    title: 'Short Ball Defense & Evade',
    date: 'Sep 14, 2026',
    duration: '0:38',
    discipline: 'Batting',
    status: 'ready',
    metrics: {
      batSpeedKph: 98.4,
      backliftAngleDeg: 28.2,
      headStabilityScore: 91,
      impactTimingMs: 16,
      strideLengthMeters: 0.94
    },
    observations: [
      {
        frameTime: '0:09',
        title: 'Early Sway Reaction',
        description: 'Quick torso pivot 110ms following release vector detection, ducking underneath bouncer path cleanly.',
        severity: 'positive'
      },
      {
        frameTime: '0:22',
        title: 'Gloves Lowered Below Eyeline',
        description: 'Handle dropped promptly below chin level to evade rising glove snicks.',
        severity: 'positive'
      }
    ],
    coachFeedback: {
      coachName: 'Rohan Deshmukh',
      comment: 'Excellent agility. Back-and-across foot movement is sharp and gives you full control against genuine bouncers.',
      date: 'Sep 15, 2026'
    }
  },
  {
    id: 'v3',
    title: 'Outswing Seam Release Kinematics',
    date: 'Sep 08, 2026',
    duration: '0:51',
    discipline: 'Bowling',
    status: 'ready',
    metrics: {
      deliverySpeedKph: 126.8,
      seamAngleDeg: 18.4,
      strideLengthMeters: 1.84,
      impactTimingMs: 8
    },
    observations: [
      {
        frameTime: '0:18',
        title: 'Seam Upright at 22° Tilt',
        description: 'Waxed linen seam alignment stable at 2,340 RPM toward 1st slip corridor.',
        severity: 'positive'
      },
      {
        frameTime: '0:32',
        title: 'Braced Front Knee Landing',
        description: 'Front knee flexion at 168° delivery stride, providing solid kinetic catapult.',
        severity: 'positive'
      }
    ]
  }
];

export const initialDrills: TrainingDrill[] = [
  {
    id: 'd1',
    title: 'High Elbow Hanging Ball Repetitions',
    category: 'Batting',
    durationMin: 20,
    difficulty: 'Foundation',
    repsOrOvers: '4 sets of 25 drives',
    description: 'Groove head position and top-hand dominance over half-volleys with restricted bottom-hand grip.',
    completed: true,
    goalId: 'g1'
  },
  {
    id: 'd2',
    title: '135kph Side-Arm Bouncer Evade Drill',
    category: 'Batting',
    durationMin: 25,
    difficulty: 'Elite',
    repsOrOvers: '36 balls',
    description: 'Sharp drop of hands below chin level when ball rises above sternum height on turf wickets.',
    completed: true,
    goalId: 'g1'
  },
  {
    id: 'd3',
    title: 'Spin Footwork & Crease Agility',
    category: 'Batting',
    durationMin: 30,
    difficulty: 'Intermediate',
    repsOrOvers: '6 overs live bowling',
    description: 'Fast dance down the wicket to pitch of off-breaks with soft hands to protect edges.',
    completed: false,
    goalId: 'g2'
  },
  {
    id: 'd4',
    title: 'Slip Cordon Reaction Catching',
    category: 'Fielding',
    durationMin: 15,
    difficulty: 'Elite',
    repsOrOvers: '50 deflections via nick-board',
    description: 'Reaction drill from 8 yards away focusing on soft finger cups below knee level.',
    completed: false,
    goalId: 'g3'
  },
  {
    id: 'd5',
    title: 'Rotational Core Conditioning & 20m Shuttles',
    category: 'Fitness',
    durationMin: 30,
    difficulty: 'Intermediate',
    repsOrOvers: '6 x 20m shuttle sprints with pads',
    description: 'High-intensity interval sprints replicating running hard 2s and 3s between wickets.',
    completed: true,
    goalId: 'g4'
  }
];

export const initialGoals: DevelopmentGoal[] = [
  {
    id: 'g1',
    title: 'Eliminate corridor dismissal vulnerabilities',
    category: 'Technique',
    targetMetric: 'False shot rate on 4th stump',
    currentValue: '12.4%',
    targetValue: '< 6.0%',
    deadline: 'Oct 30, 2026',
    progressPercent: 72,
    completed: false
  },
  {
    id: 'g2',
    title: 'Elevate strike rate against finger spin',
    category: 'Tactical',
    targetMetric: 'Strike rate vs Off/Left-arm orthodox',
    currentValue: '124.0',
    targetValue: '145.0+',
    deadline: 'Nov 15, 2026',
    progressPercent: 65,
    completed: false
  },
  {
    id: 'g3',
    title: 'Slip cordon catching efficiency index',
    category: 'Tactical',
    targetMetric: 'Catch conversion rate in 1st/2nd slip',
    currentValue: '88.0%',
    targetValue: '95.0%',
    deadline: 'Dec 01, 2026',
    progressPercent: 90,
    completed: false
  },
  {
    id: 'g4',
    title: 'Yo-Yo Intermittent Recovery Test (Level 1)',
    category: 'Fitness',
    targetMetric: 'Yo-Yo score standard',
    currentValue: '18.4',
    targetValue: '19.5 (Elite tier)',
    deadline: 'Nov 30, 2026',
    progressPercent: 82,
    completed: false
  }
];

export const trainingPrograms = [
  {
    id: 'prog1',
    title: 'Powerplay Acceleration Protocol',
    discipline: 'Batting',
    durationWeeks: 4,
    description: 'Master lofted drives, pickup pull shots over square leg, and rapid strike rotation in the first 6 overs.',
    modulesCount: 8
  },
  {
    id: 'prog2',
    title: 'Pace & Bouncer Mastery',
    discipline: 'Batting',
    durationWeeks: 6,
    description: 'Systematic desensitization to 135-145 kph bouncers. Back-foot defense, rolling wrists on the pull, and evasive ducks.',
    modulesCount: 12
  },
  {
    id: 'prog3',
    title: 'Death Bowling Yorker Precision',
    discipline: 'Bowling',
    durationWeeks: 4,
    description: 'Repeatable release mechanics under pressure. Calibrate wide yorkers, slower ball cutters, and block-hole consistency.',
    modulesCount: 8
  }
];
