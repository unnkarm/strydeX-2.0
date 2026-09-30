import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../layout/AppLayout';
import {
  User,
  Shield,
  Bell,
  Lock,
  Globe,
  Users,
  LogOut,
  Save,
  CheckCircle2,
  Mail,
  Plus,
  Camera
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, setUser, setIsAuthenticated, setActiveView, addNotification } = useApp();

  const [activeSection, setActiveSection] = useState<'profile' | 'cricket' | 'privacy' | 'coaches' | 'security'>('profile');

  // Form states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [team, setTeam] = useState(user.team);
  const [location, setLocation] = useState(user.location);
  const [bio, setBio] = useState(user.bio);
  const [publicProfile, setPublicProfile] = useState(user.publicProfile);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [videoProcessedAlerts, setVideoProcessedAlerts] = useState(true);
  const [coachNotesAlerts, setCoachNotesAlerts] = useState(true);

  // Invite coach state
  const [coachEmail, setCoachEmail] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      name,
      email,
      team,
      location,
      bio,
      publicProfile,
      avatarUrl
    });
    addNotification('Settings Saved', 'Your athlete preferences have been updated.');
  };

  const handleInviteCoach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachEmail.trim()) return;
    addNotification('Coach Invitation Dispatched', `Invited ${coachEmail} to link with your telemetry.`);
    setCoachEmail('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('landing');
    addNotification('Signed Out', 'You have been signed out.', 'info');
  };

  return (
    <AppLayout
      title="Platform Settings & Preferences"
      subtitle="Manage your cricket credentials, security baselines, and coach access permissions"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Side Navigation Menu (Span 4) */}
        <div className="md:col-span-4 space-y-1.5">
          {[
            { id: 'profile', label: 'Personal Information', icon: User },
            { id: 'cricket', label: 'Cricket Specifications', icon: Shield },
            { id: 'privacy', label: 'Portfolio Visibility & Privacy', icon: Globe },
            { id: 'coaches', label: 'Connected Coaches & Academies', icon: Users },
            { id: 'security', label: 'Account Security & Notifications', icon: Bell },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#182238] text-white border-l-2 border-[#BEF264]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#BEF264]' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/[0.06]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of StrydeX</span>
            </button>
          </div>
        </div>

        {/* Right Section Content (Span 8) */}
        <div className="md:col-span-8">
          {/* PROFILE SECTION */}
          {activeSection === 'profile' && (
            <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-6">
              <div className="pb-3 border-b border-white/[0.06]">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tightest uppercase font-display">Personal Information</h3>
                <p className="text-xs text-neutral-400 font-sans">Manage identity details displayed on your digital card</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                {/* Athlete Profile Photo Upload & Preview */}
                <div className="p-4 rounded-xl bg-[#12192C] border border-white/10 flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative shrink-0">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={name}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#BEF264] shadow-md"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-[#161F33] border-2 border-[#BEF264] flex items-center justify-center text-xl font-bold text-[#BEF264]">
                        {name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2 text-center sm:text-left">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Athlete Profile Picture</h4>
                      <p className="text-[11px] text-neutral-400">Displayed on your dashboard, public portfolio, match reports, and scout dossier</p>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                      <label className="px-3 py-1.5 rounded-lg bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
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
                        className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-medium transition-colors cursor-pointer"
                      >
                        Default Pro
                      </button>

                      <button
                        type="button"
                        onClick={() => setAvatarUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80')}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-medium transition-colors cursor-pointer"
                      >
                        Seamer
                      </button>

                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={() => setAvatarUrl('')}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Club / Team
                    </label>
                    <input
                      type="text"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Location / Region
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Athlete Bio
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-[#161F33] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                  />
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CRICKET SPECIFICATIONS */}
          {activeSection === 'cricket' && (
            <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-6">
              <div className="pb-3 border-b border-white/[0.06]">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tightest uppercase font-display">Cricket Specifications</h3>
                <p className="text-xs text-neutral-400 font-sans">Biomechanics baselines and role parameters</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-[#141B2D] border border-white/5 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Current Playing Role</p>
                    <p className="text-sm font-bold text-white">{user.role}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#141B2D] border border-white/5 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Playing Level</p>
                    <p className="text-sm font-bold text-[#BEF264]">{user.level}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-[#141B2D] border border-white/5 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Batting Style</p>
                    <p className="text-sm font-bold text-white">{user.battingStyle}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#141B2D] border border-white/5 space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Bowling Style</p>
                    <p className="text-sm font-bold text-white">{user.bowlingStyle}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveView('athlete-profile')}
                    className="px-4 py-2 bg-[#161F33] text-white border border-white/10 hover:bg-[#1E2942] rounded-lg text-xs font-semibold"
                  >
                    Edit Specifications via Profile Modal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRIVACY SECTION */}
          {activeSection === 'privacy' && (
            <div className="p-6 rounded-2xl bg-[#09090C] border border-white/[0.08] space-y-6">
              <div className="pb-3 border-b border-white/[0.06]">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tightest uppercase font-display">Portfolio Visibility & Privacy</h3>
                <p className="text-xs text-neutral-400 font-sans">Control who can view your verified stats and video reels</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#141B2D] border border-white/10">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white">Public Digital Portfolio</p>
                    <p className="text-[11px] text-slate-400">Allow coaches, scouts, and trials selectors to view your stats</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = !publicProfile;
                      setPublicProfile(updated);
                      setUser({ ...user, publicProfile: updated });
                      addNotification('Privacy Updated', `Public portfolio ${updated ? 'enabled' : 'disabled'}`);
                    }}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      publicProfile ? 'bg-[#BEF264]' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`bg-black w-4 h-4 rounded-full transition-transform ${
                        publicProfile ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#141B2D] border border-white/10">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white">Show Biomechanical Video Replays</p>
                    <p className="text-[11px] text-slate-400">Display analyzed motion captures publicly</p>
                  </div>
                  <span className="text-xs text-[#BEF264] font-mono font-semibold">Enabled</span>
                </div>
              </div>
            </div>
          )}

          {/* CONNECTED COACHES */}
          {activeSection === 'coaches' && (
            <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-6">
              <div className="pb-3 border-b border-white/[0.06]">
                <h3 className="text-base font-bold text-white">Connected Coaches & Academies</h3>
                <p className="text-xs text-slate-400">Grant coaches direct access to your drill compliance and video frames</p>
              </div>

              <div className="space-y-3">
                {user.connectedCoaches.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-[#141B2D] border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{c.name}</p>
                      <p className="text-[11px] text-slate-400">{c.role} · {c.academy}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      ACTIVE ACCESS
                    </span>
                  </div>
                ))}
              </div>

              {/* Invite Coach Form */}
              <form onSubmit={handleInviteCoach} className="pt-4 border-t border-white/[0.06] space-y-3">
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">Invite New Coach</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="coach.email@cricketacademy.org"
                    value={coachEmail}
                    onChange={(e) => setCoachEmail(e.target.value)}
                    className="flex-1 bg-[#161F33] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#BEF264]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#BEF264] text-black text-xs font-bold rounded-lg hover:bg-[#aee750] transition-colors"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECURITY & NOTIFICATIONS */}
          {activeSection === 'security' && (
            <div className="p-6 rounded-2xl bg-[#0D1322] border border-white/[0.08] space-y-6">
              <div className="pb-3 border-b border-white/[0.06]">
                <h3 className="text-base font-bold text-white">Security & Notifications</h3>
                <p className="text-xs text-slate-400">Password management and real-time telemetry dispatch alerts</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141B2D] border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-white">Email Match Performance Summaries</p>
                    <p className="text-[11px] text-slate-400">Receive post-match reports automatically</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="rounded bg-slate-800 text-[#BEF264]"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141B2D] border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-white">Video Analysis Completion Notifications</p>
                    <p className="text-[11px] text-slate-400">Alert when 120fps joint tracking model finishes computation</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={videoProcessedAlerts}
                    onChange={(e) => setVideoProcessedAlerts(e.target.checked)}
                    className="rounded bg-slate-800 text-[#BEF264]"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141B2D] border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-white">Coach Feedback Alerts</p>
                    <p className="text-[11px] text-slate-400">Immediate notice when your coach attaches notes to frames</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={coachNotesAlerts}
                    onChange={(e) => setCoachNotesAlerts(e.target.checked)}
                    className="rounded bg-slate-800 text-[#BEF264]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};
