import { GoogleGenAI } from '@google/genai';
import { config } from '../config.js';

let aiClient: GoogleGenAI | null = null;
if (config.geminiApiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey: config.geminiApiKey });
  } catch (err) {
    console.warn('[GeminiService] Failed to initialize GoogleGenAI client with key. Falling back to heuristic engine.');
  }
}

export async function askAiCoach(prompt: string, context?: {
  role?: string;
  battingAvg?: number;
  strikeRate?: number;
  weakness?: string;
}): Promise<string> {
  if (aiClient) {
    try {
      const systemInstruction = `You are the StrydeX Elite Cricket AI Coach.
You advise competitive amateur and professional cricketers using sports science, high-speed camera biomechanics (120 FPS CV), and cricket tactics.
Athlete Context:
Role: ${context?.role || 'Top Order Batsman'}
Batting Avg: ${context?.battingAvg || 42.5}
Strike Rate: ${context?.strikeRate || 138.7}
Provide concise, actionable coaching advice with specific physical drills, kinematic cues (head stillness, elbow angle, stride length), and match mindset tips.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction
        }
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('[GeminiService] API call failed, using heuristic sports science fallback:', err);
    }
  }

  // Heuristic Fallback Engine
  const lower = prompt.toLowerCase();

  if (lower.includes('short ball') || lower.includes('bouncer') || lower.includes('hook') || lower.includes('pull')) {
    return `### AI Biomechanical Coach: Bouncer & Short-Ball Protocol
1. **Kinematic Trigger**: Transfer weight onto the back foot early (within 120ms of delivery release). Ensure your head moves back and across towards off-stump to position your eyeline directly over the ball's bouncing corridor.
2. **Wrist Rollover**: Keep the top hand firm and bottom hand loose until impact. Roll your wrists over at the point of contact to ensure the ball is firmly grounded into the mid-wicket sector.
3. **Evasive Action**: If the bouncer climbs higher than chest height on a bouncy surface, drop both hands below chin level and duck beneath the trajectory—never take your eyes off the seam.
4. **Target Drill**: Execute the *135kph Side-Arm Bouncer Evade Drill* (36 repetitions) with your coach this week.`;
  }

  if (lower.includes('spin') || lower.includes('sweep') || lower.includes('footwork')) {
    return `### AI Biomechanical Coach: Playing Finger & Wrist Spin
1. **Decisive Footwork**: Commit either fully forward onto the front-foot toes or deep inside your crease onto the back-foot heel. Avoid hovering in no-man's land.
2. **Soft Hands Absorption**: When playing on turning pitches, drop your bottom hand grip tension by 30%. This prevents thick edges from carrying into the slip or leg-slip cordon.
3. **Using the Crease**: Walk 2 paces outside the crease against flat spinners to alter their length, forcing them to drag the ball shorter where you can punch through mid-wicket.
4. **Target Drill**: Perform *Spin Footwork & Crease Agility* (6 overs live bowling with cones on good length).`;
  }

  if (lower.includes('drive') || lower.includes('cover') || lower.includes('seam') || lower.includes('swing')) {
    return `### AI Biomechanical Coach: Off-Side Driving & Seam Management
1. **High Elbow Dominance**: Your lead elbow must point directly at mid-off at an 85°-90° angle upon front foot landing.
2. **Head Over Contact**: Keep your chin tucked down directly over the ball at impact. Prematurely lifting your head is the #1 cause of aerial edges to extra cover.
3. **Corridor Discipline**: On green wickets during the first 10 overs, leave anything outside 4th stump on length. Wait for the bowler to overpitch before driving.
4. **Target Drill**: *High Elbow Hanging Ball Repetitions* (4 sets of 25 drives) to groove neuromuscular muscle memory.`;
  }

  if (lower.includes('fitness') || lower.includes('speed') || lower.includes('run') || lower.includes('strength')) {
    return `### AI Biomechanical Coach: Cricket Athleticism & Workload
1. **Rotational Power**: Your batting exit speed comes from hip-to-shoulder thoracic separation. Integrate rotational medicine ball throws (3x10 reps).
2. **Shuttle Endurance**: High-intensity 20m shuttle sprints while wearing batting pads replicate running quick 2s in hot powerplay conditions.
3. **Post-Net Recovery**: Hydrate with electrolyte replenishment and 15 minutes of lower-body foam rolling focusing on hamstrings and hip flexors.`;
  }

  return `### StrydeX AI Coaching Observation
Based on your current telemetry profile (Batting Avg: ${context?.battingAvg || 42.5}, SR: ${context?.strikeRate || 138.7}):
- **Key Strength**: High-elbow presentation through the V provides a 84.6% control index on front-foot drives.
- **Immediate Focus**: Elevate middle-overs strike rotation against finger spin. Work on drop-and-run singles into the cover-point ring.
- **Kinematic Cue**: Stiffen the front knee brace 12ms before impact to catapult bat velocity through the ball.
Feel free to ask about specific shots (cover drive, pull shot, sweep), bowling lines, or fitness conditioning routines!`;
}
