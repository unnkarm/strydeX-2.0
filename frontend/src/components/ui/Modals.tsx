import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CricketRole, BattingStyle, BowlingStyle, PlayingLevel, MatchFormat } from '../../types';
import { X, Upload, Video, CheckCircle2, Copy, Check, QrCode, Sparkles, Camera } from 'lucide-react';

export const ModalsContainer: React.FC = () => {
  const { activeModal, setActiveModal } = useApp();

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#0F1626] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        {activeModal === 'log-match' && <LogMatchModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'log-training' && <LogTrainingModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'upload-video' && <UploadVideoModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'share-profile' && <ShareProfileModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'edit-profile' && <EditProfileModal onClose={() => setActiveModal(null)} />}
      </div>
    </div>
  );
};

// 1. LOG MATCH MODAL
const LogMatchModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addMatch, user } = useApp();
  const [formData, setFormData] = useState({
    opponent: '',
    date: new Date().toISOString().split('T')[0],
    format: 'T20' as 'T20' | 'One Day (50-over)' | 'Multi-Day (Red Ball)' | 'Net Practice',
    runs: 45,
    ballsFaced: 32,
    fours: 5,
    sixes: 1,
    dismissal: 'Caught at Mid-Off',
    oversBowled: 0,
    wickets: 0,
    runsConceded: 0,
    catches: 1,
    runOuts: 0,
    result: 'Won' as 'Won' | 'Lost' | 'Draw' | 'Training',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.opponent.trim()) return;

    const strikeRate = formData.ballsFaced > 0
      ? Number(((formData.runs / formData.ballsFaced) * 100).toFixed(1))
      : 0;

    addMatch({
      ...formData,
      runs: Number(formData.runs),
      ballsFaced: Number(formData.ballsFaced),
      fours: Number(formData.fours),
      sixes: Number(formData.sixes),
      oversBowled: Number(formData.oversBowled),
      wickets: Number(formData.wickets),
      runsConceded: Number(formData.runsConceded),
      catches: Number(formData.catches),
      runOuts: Number(formData.runOuts),
      strikeRate
    });
    onClose();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover border border-[#BEF264] shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-[#141B2D] border border-[#BEF264] flex items-center justify-center text-xs font-mono text-[#BEF264] font-bold shrink-0">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-white">Log Cricket Match Performance</h3>
            <p className="text-xs text-slate-400 font-mono">Athlete: {user.name} (#{user.jerseyNumber} · {user.role})</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Opponent / Team
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Richmond Strikers CC"
              value={formData.opponent}
              onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Match Format
            </label>
            <select
              value={formData.format}
              onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            >
              <option value="T20">T20 (20 Overs)</option>
              <option value="One Day (50-over)">One Day (50 Overs)</option>
              <option value="Multi-Day (Red Ball)">Multi-Day (Red Ball)</option>
              <option value="Net Practice">Net Practice Match</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Runs Scored
            </label>
            <input
              type="number"
              min="0"
              value={formData.runs}
              onChange={(e) => setFormData({ ...formData, runs: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264] font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Balls Faced
            </label>
            <input
              type="number"
              min="1"
              value={formData.ballsFaced}
              onChange={(e) => setFormData({ ...formData, ballsFaced: parseInt(e.target.value) || 1 })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264] font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Fours (4s)</label>
            <input
              type="number"
              min="0"
              value={formData.fours}
              onChange={(e) => setFormData({ ...formData, fours: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264] font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Sixes (6s)</label>
            <input
              type="number"
              min="0"
              value={formData.sixes}
              onChange={(e) => setFormData({ ...formData, sixes: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264] font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Dismissal Method
            </label>
            <select
              value={formData.dismissal}
              onChange={(e) => setFormData({ ...formData, dismissal: e.target.value })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            >
              <option value="Not Out">Not Out (*)</option>
              <option value="Bowled">Bowled</option>
              <option value="Caught at Point / Cover">Caught at Point / Cover</option>
              <option value="Caught at Mid-Off / Mid-On">Caught at Mid-Off / Mid-On</option>
              <option value="Caught Outfield (Deep)">Caught Outfield (Deep)</option>
              <option value="Caught Behind (Keeper)">Caught Behind (Keeper)</option>
              <option value="LBW">LBW (Leg Before Wicket)</option>
              <option value="Run Out">Run Out</option>
              <option value="Stumped">Stumped</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Match Result
            </label>
            <select
              value={formData.result}
              onChange={(e) => setFormData({ ...formData, result: e.target.value as any })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            >
              <option value="Won">Victory (Won)</option>
              <option value="Lost">Defeat (Lost)</option>
              <option value="Draw">Drawn Match</option>
              <option value="Training">Training / Intra-Club</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Catches</label>
            <input
              type="number"
              min="0"
              value={formData.catches}
              onChange={(e) => setFormData({ ...formData, catches: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264] font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Overs Bowled</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.oversBowled}
              onChange={(e) => setFormData({ ...formData, oversBowled: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264] font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Wickets</label>
            <input
              type="number"
              min="0"
              value={formData.wickets}
              onChange={(e) => setFormData({ ...formData, wickets: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264] font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Tactical Notes / Key Learnings
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Targeted left-arm spinner through extra cover. Kept soft hands against swinging new ball."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
          />
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-black bg-[#BEF264] hover:bg-[#aee750] rounded-lg transition-colors"
          >
            Save Match Performance
          </button>
        </div>
      </form>
    </div>
  );
};

// 2. LOG TRAINING MODAL
const LogTrainingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addNotification } = useApp();
  const [drillTitle, setDrillTitle] = useState('');
  const [category, setCategory] = useState<'Batting' | 'Bowling' | 'Fielding' | 'Fitness'>('Batting');
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState('High');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drillTitle.trim()) return;
    addNotification('Training Session Logged', `Recorded ${duration}m of ${drillTitle}`);
    onClose();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white">Record Training Session</h3>
          <p className="text-xs text-slate-400">Track practice drills, net sessions, and physical conditioning</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Drill or Routine Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Sidearm 135kph Short Ball Evade & Roll"
            value={drillTitle}
            onChange={(e) => setDrillTitle(e.target.value)}
            className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            >
              <option value="Batting">Batting</option>
              <option value="Bowling">Bowling</option>
              <option value="Fielding">Fielding</option>
              <option value="Fitness">Fitness & Agility</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Duration (Minutes)
            </label>
            <input
              type="number"
              min="5"
              step="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 15)}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264] font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Session Intensity
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Technical Focus', 'Moderate', 'High Intensity'].map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => setIntensity(level)}
                className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                  intensity === level
                    ? 'border-[#BEF264] bg-[#BEF264]/10 text-[#BEF264]'
                    : 'border-white/10 bg-[#161F33] text-slate-400 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-black bg-[#BEF264] hover:bg-[#aee750] rounded-lg transition-colors"
          >
            Log Training
          </button>
        </div>
      </form>
    </div>
  );
};

// 3. UPLOAD VIDEO MODAL
const UploadVideoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addVideoSession, setActiveView, user } = useApp();
  const [discipline, setDiscipline] = useState<'Batting' | 'Fast bowling' | 'Spin bowling' | 'Fielding'>('Batting');
  const [shotName, setShotName] = useState('Front-Foot Cover Drive High Frame');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStage, setProgressStage] = useState('');
  const [percent, setPercent] = useState(0);

  const handleStartAnalysis = () => {
    setIsProcessing(true);
    setProgressStage('Uploading 120fps video capture...');
    setPercent(25);

    setTimeout(() => {
      setProgressStage('Extracting 32 skeletal biomechanical joints...');
      setPercent(55);
    }, 900);

    setTimeout(() => {
      setProgressStage('Computing bat plane trajectory & head alignment...');
      setPercent(85);
    }, 1800);

    setTimeout(() => {
      setProgressStage('Finalizing observations and telemetry report...');
      setPercent(100);

      setTimeout(() => {
        addVideoSession({
          title: shotName || `${discipline} Biomechanical Sequence`,
          discipline,
          date: new Date().toISOString().split('T')[0],
          duration: '00:15',
          thumbnail: '',
          status: 'Complete',
          shotType: discipline === 'Batting' ? 'Cover Drive & Weight Shift' : 'Action Release',
          metrics: {
            batSpeedKph: discipline === 'Batting' ? 116.8 : undefined,
            backliftAngleDeg: discipline === 'Batting' ? 14.2 : undefined,
            headStabilityScore: 94,
            strideLengthMeters: 1.12,
            impactTimingMs: 178,
            deliverySpeedKph: discipline === 'Fast bowling' ? 128.4 : undefined
          },
          observations: [
            {
              frameTime: '00:01.4',
              phase: 'Initial Trigger & Cocking',
              status: 'optimal',
              title: 'Stable vertical posture',
              description: 'Eye line level with pitch corridor. Shoulder aligned towards mid-off.'
            },
            {
              frameTime: '00:02.8',
              phase: 'Stride Extension',
              status: 'optimal',
              title: 'Ideal 1.12m stride base',
              description: 'Front knee over toe without over-striding, allowing natural bat swing arc.'
            },
            {
              frameTime: '00:03.6',
              phase: 'Point of Contact',
              status: 'attention',
              title: 'Bottom hand dominance at follow-through',
              description: 'Slight wrist snap early in arc. Retain dominant top hand grip through the V.'
            }
          ]
        });
        setIsProcessing(false);
        onClose();
        setActiveView('video-analysis');
      }, 700);
    }, 2600);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover border border-[#BEF264] shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-[#141B2D] border border-[#BEF264] flex items-center justify-center text-xs font-mono text-[#BEF264] font-bold shrink-0">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-[#BEF264]" />
              Upload Cricket Video for AI Biomechanics
            </h3>
            <p className="text-xs text-slate-400 font-mono">Athlete: {user.name} (#{user.jerseyNumber} · {user.role})</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-5">
        {/* Discipline tabs */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Select Discipline
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['Batting', 'Fast bowling', 'Spin bowling', 'Fielding'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDiscipline(d)}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                  discipline === d
                    ? 'border-[#BEF264] bg-[#BEF264]/10 text-[#BEF264] shadow-sm'
                    : 'border-white/10 bg-[#161F33] text-slate-300 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Clip Title / Focus
          </label>
          <input
            type="text"
            value={shotName}
            onChange={(e) => setShotName(e.target.value)}
            className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            placeholder="e.g. Front-Foot Cover Drive High Frame"
          />
        </div>

        {/* Upload dropzone */}
        {!isProcessing ? (
          <div
            onClick={handleStartAnalysis}
            className="border-2 border-dashed border-white/20 hover:border-[#BEF264] rounded-xl p-8 text-center cursor-pointer bg-[#141B2D]/60 hover:bg-[#141B2D] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-white">Click or drag & drop cricket video clip</p>
            <p className="text-xs text-slate-400 mt-1">Supports MP4, MOV, WebM (up to 120fps recommended, max 200MB)</p>
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#BEF264]" />
              <span>Simulate instant AI posture extraction demo</span>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-[#141B2D] border border-[#BEF264]/30 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-[#BEF264] border-t-transparent rounded-full animate-spin mx-auto" />
            <div>
              <p className="text-sm font-semibold text-white">{progressStage}</p>
              <p className="text-xs text-slate-400 mt-1">Extracting 60 frames per second with biomechanical landmarking</p>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#BEF264] h-full transition-all duration-500 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
          <span>Camera recommendation: Side-on (2m height) or 45-degree angle</span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. SHARE PROFILE MODAL
const ShareProfileModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, setUser, addNotification } = useApp();
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/profile/${user.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    addNotification('Profile Link Copied', 'Share this portfolio link with coaches or scouts.');
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleVisibility = () => {
    const updated = !user.publicProfile;
    setUser({ ...user, publicProfile: updated });
    addNotification(
      'Profile Visibility Updated',
      updated ? 'Your portfolio is now visible to coaches.' : 'Your portfolio is now private.'
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white">Share Digital Athlete Portfolio</h3>
          <p className="text-xs text-slate-400">Provide direct access to verified batting, bowling, and video telemetry</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Athlete Snapshot in Share Profile Modal */}
        <div className="p-4 rounded-xl bg-[#141B2D] border border-white/10 flex items-center gap-4">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt={user.name}
            className="w-14 h-14 rounded-xl object-cover border-2 border-[#BEF264] shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white truncate">{user.name}</h4>
              <span className="text-xs text-[#BEF264] font-mono">@{user.username}</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {user.role} · #{user.jerseyNumber} · {user.level}
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Player ID: {user.playerId || 'STX-8492'} · {user.location}
            </p>
          </div>
        </div>

        {/* Visibility switch */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#141B2D] border border-white/10">
          <div>
            <h4 className="text-sm font-semibold text-white">Public Portfolio Visibility</h4>
            <p className="text-xs text-slate-400">Allow coaches, academies, and scouts to view verified match data</p>
          </div>
          <button
            type="button"
            onClick={toggleVisibility}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              user.publicProfile ? 'bg-[#BEF264]' : 'bg-slate-700'
            }`}
          >
            <div
              className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform ${
                user.publicProfile ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Link Box */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Direct Athlete URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-slate-300 font-mono focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-[#BEF264] text-black text-xs font-bold rounded-lg hover:bg-[#aee750] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* QR Code preview */}
        <div className="p-4 rounded-xl bg-[#141B2D] border border-white/10 flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
            <QrCode className="w-full h-full text-black" />
          </div>
          <div className="text-xs text-slate-300">
            <p className="font-semibold text-white">Fast Mobile QR Scan</p>
            <p className="text-slate-400 mt-0.5">Scouts and coaches at trials can scan your card to pull up real-time telemetry.</p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. EDIT PROFILE MODAL
const EditProfileModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, updateUserProfile } = useApp();
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [formData, setFormData] = useState({
    name: user.name,
    team: user.team,
    role: user.role,
    battingStyle: user.battingStyle,
    bowlingStyle: user.bowlingStyle,
    level: user.level,
    location: user.location,
    bio: user.bio,
    jerseyNumber: user.jerseyNumber
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      ...formData,
      avatarUrl,
      jerseyNumber: Number(formData.jerseyNumber)
    });
    onClose();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white">Edit Athlete Profile</h3>
          <p className="text-xs text-slate-400">Update playing credentials, club affiliation, and biological specs</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
        {/* Profile Picture Uploader & Preview */}
        <div className="p-3.5 rounded-xl bg-[#141B2D] border border-white/10 flex items-center gap-4">
          <div className="relative shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={formData.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-[#BEF264] shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-[#161F33] border-2 border-[#BEF264] flex items-center justify-center text-lg font-bold text-[#BEF264]">
                {formData.name.split(' ').map((n) => n[0]).join('')}
              </div>
            )}
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Profile Photo
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              <label className="px-2.5 py-1 rounded-lg bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-bold transition-colors cursor-pointer flex items-center gap-1">
                <Camera className="w-3 h-3" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setAvatarUrl(event.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <button
                type="button"
                onClick={() => setAvatarUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium cursor-pointer"
              >
                Pro
              </button>
              <button
                type="button"
                onClick={() => setAvatarUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium cursor-pointer"
              >
                Pacer
              </button>
              {avatarUrl && (
                <button
                  type="button"
                  onClick={() => setAvatarUrl('')}
                  className="px-2 py-1 rounded-lg text-xs text-neutral-400 hover:text-red-400 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Club / Team</label>
            <input
              type="text"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Playing Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as CricketRole })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            >
              <option value="Batsman">Batsman</option>
              <option value="Fast Bowler">Fast Bowler</option>
              <option value="Spin Bowler">Spin Bowler</option>
              <option value="All-rounder">All-rounder</option>
              <option value="Wicketkeeper">Wicketkeeper</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Batting Style</label>
            <select
              value={formData.battingStyle}
              onChange={(e) => setFormData({ ...formData, battingStyle: e.target.value as BattingStyle })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            >
              <option value="Right-hand bat">Right-hand bat</option>
              <option value="Left-hand bat">Left-hand bat</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Bowling Style</label>
            <select
              value={formData.bowlingStyle}
              onChange={(e) => setFormData({ ...formData, bowlingStyle: e.target.value as BowlingStyle })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            >
              <option value="Right-arm fast">Right-arm fast</option>
              <option value="Right-arm medium">Right-arm medium</option>
              <option value="Left-arm fast">Left-arm fast</option>
              <option value="Right-arm offbreak">Right-arm offbreak</option>
              <option value="Right-arm legbreak">Right-arm legbreak</option>
              <option value="Left-arm orthodox">Left-arm orthodox</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Playing Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value as PlayingLevel })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            >
              <option value="Club Cricketer">Club Cricketer</option>
              <option value="Academy Prospect">Academy Prospect</option>
              <option value="Premier League">Premier League</option>
              <option value="First-Class Aspirant">First-Class Aspirant</option>
              <option value="Recreational">Recreational</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Player Bio</label>
          <textarea
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#BEF264]"
          />
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-black bg-[#BEF264] hover:bg-[#aee750] rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
