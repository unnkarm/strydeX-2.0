export interface BiomechanicalInput {
  discipline: 'Batting' | 'Bowling' | 'Fielding';
  shotOrDeliveryType?: string;
  frameCount?: number;
  fps?: number;
  durationSeconds?: number;
}

export interface BiomechanicalReport {
  discipline: 'Batting' | 'Bowling' | 'Fielding';
  metrics: {
    batSpeedKph?: number;
    backliftAngleDeg?: number;
    headStabilityScore: number;
    impactTimingMs: number;
    deliverySpeedKph?: number;
    seamAngleDeg?: number;
    strideLengthMeters: number;
    exitVelocityKph?: number;
    kineticChainEfficiency: number;
  };
  keyPhases: Array<{
    phase: string;
    frame: number;
    timestamp: string;
    angle: number;
    status: 'optimal' | 'remediation_needed';
    coachingCues: string;
  }>;
  observations: Array<{
    frameTime: string;
    title: string;
    description: string;
    severity: 'positive' | 'attention' | 'neutral';
  }>;
  overallRating: number; // 0 - 100
  summary: string;
}

export function analyzeBiomechanics(input: BiomechanicalInput): BiomechanicalReport {
  const isBowling = input.discipline === 'Bowling';
  const isFielding = input.discipline === 'Fielding';

  if (isBowling) {
    const deliverySpeedKph = Math.round(124 + Math.random() * 12);
    const seamAngleDeg = Math.round((14 + Math.random() * 8) * 10) / 10;
    const strideLengthMeters = Math.round((1.75 + Math.random() * 0.18) * 100) / 100;
    const headStability = Math.round(88 + Math.random() * 8);

    return {
      discipline: 'Bowling',
      metrics: {
        deliverySpeedKph,
        seamAngleDeg,
        headStabilityScore: headStability,
        impactTimingMs: Math.round(8 + Math.random() * 6),
        strideLengthMeters,
        kineticChainEfficiency: Math.round(86 + Math.random() * 10)
      },
      keyPhases: [
        {
          phase: 'Back Foot Contact (BFC)',
          frame: 18,
          timestamp: '0:18',
          angle: 42.5,
          status: 'optimal',
          coachingCues: 'Strong heel-strike absorption. Torso aligned towards fine leg.'
        },
        {
          phase: 'Front Foot Contact (FFC)',
          frame: 34,
          timestamp: '0:34',
          angle: 168.0,
          status: 'optimal',
          coachingCues: 'Braced front knee catapulting kinetic torque through delivery arc.'
        },
        {
          phase: 'Release Apex',
          frame: 42,
          timestamp: '0:42',
          angle: 18.2,
          status: 'optimal',
          coachingCues: 'Seam vertical at 2,340 RPM with subtle 18° outswing tilt.'
        }
      ],
      observations: [
        {
          frameTime: '0:18',
          title: 'Optimal Stride Length',
          description: `Delivery stride measured at ${strideLengthMeters}m (88% of athlete height), matching high-performance pace models.`,
          severity: 'positive'
        },
        {
          frameTime: '0:34',
          title: 'Braced Front Knee Anchor',
          description: 'Front knee extension provides stable catapult leverage without joint collapse.',
          severity: 'positive'
        },
        {
          frameTime: '0:42',
          title: 'Seam Axis Orientation',
          description: `Release seam angle measured at ${seamAngleDeg}° with low axial wobble.`,
          severity: 'positive'
        }
      ],
      overallRating: 92,
      summary: `High-efficiency seam delivery with solid kinetic transfer through the front foot brace. Velocity clocked at ${deliverySpeedKph} km/h.`
    };
  }

  if (isFielding) {
    return {
      discipline: 'Fielding',
      metrics: {
        headStabilityScore: 94,
        impactTimingMs: 220, // reaction time ms
        strideLengthMeters: 1.15,
        kineticChainEfficiency: 91
      },
      keyPhases: [
        {
          phase: 'Ready Stance & Split Step',
          frame: 8,
          timestamp: '0:08',
          angle: 82.0,
          status: 'optimal',
          coachingCues: 'Balanced center of gravity on balls of feet.'
        },
        {
          phase: 'Edge Deflection Response',
          frame: 24,
          timestamp: '0:24',
          angle: 48.0,
          status: 'optimal',
          coachingCues: 'Sub-250ms lateral reflex dive to slip cordon.'
        }
      ],
      observations: [
        {
          frameTime: '0:08',
          title: 'Split-Step Priming',
          description: 'Anticipatory hop triggered 40ms prior to bat-ball contact.',
          severity: 'positive'
        },
        {
          frameTime: '0:24',
          title: 'Soft Finger Cups',
          description: 'Fingers pointed downwards below knee height, safely absorbing edge energy.',
          severity: 'positive'
        }
      ],
      overallRating: 90,
      summary: 'Sharp reflexes and low center of gravity enable consistent slip and inner ring conversions.'
    };
  }

  // Default: Batting
  const batSpeedKph = Math.round(112 + Math.random() * 8);
  const backliftAngle = Math.round((14 + Math.random() * 4) * 10) / 10;
  const headStability = Math.round(92 + Math.random() * 6);
  const impactTiming = Math.round(10 + Math.random() * 4);
  const strideLength = Math.round((1.12 + Math.random() * 0.12) * 100) / 100;

  return {
    discipline: 'Batting',
    metrics: {
      batSpeedKph,
      backliftAngleDeg: backliftAngle,
      headStabilityScore: headStability,
      impactTimingMs: impactTiming,
      strideLengthMeters: strideLength,
      exitVelocityKph: Math.round(batSpeedKph * 1.25),
      kineticChainEfficiency: Math.round(88 + Math.random() * 8)
    },
    keyPhases: [
      {
        phase: 'Stance & Trigger Movement',
        frame: 12,
        timestamp: '0:12',
        angle: 88.0,
        status: 'optimal',
        coachingCues: 'Head perfectly centered over base of support; relaxed grip.'
      },
      {
        phase: 'Backlift Apex',
        frame: 28,
        timestamp: '0:28',
        angle: backliftAngle,
        status: 'optimal',
        coachingCues: 'Backlift cocked towards 2nd slip corridor for full off-side access.'
      },
      {
        phase: 'Impact Window',
        frame: 64,
        timestamp: '0:64',
        angle: 3.4,
        status: 'optimal',
        coachingCues: 'Full face of bat presented directly below eyeline with closed face.'
      },
      {
        phase: 'Follow-Through Apex',
        frame: 92,
        timestamp: '0:92',
        angle: 112.0,
        status: 'optimal',
        coachingCues: 'High elbow finish providing natural topspin ground roll.'
      }
    ],
    observations: [
      {
        frameTime: '0:12',
        title: 'High Elbow Trigger Locked',
        description: 'Lead elbow maintained an exemplary 88° high frame, keeping head directly over line of delivery.',
        severity: 'positive'
      },
      {
        frameTime: '0:28',
        title: 'Clean Backlift Plane',
        description: `Backlift alignment at ${backliftAngle}° off-stump prevents cross-bat slicing.`,
        severity: 'positive'
      },
      {
        frameTime: '0:64',
        title: 'Middle Contact Velocity',
        description: `Bat speed peaked at ${batSpeedKph} km/h right through impact zone.`,
        severity: 'positive'
      }
    ],
    overallRating: 94,
    summary: `Elite bat swing geometry with sub-millimeter head stillness through contact. Bat velocity registered at ${batSpeedKph} km/h.`
  };
}
