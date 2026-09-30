import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  TrendingUp,
  Video,
  Dumbbell,
  User,
  Settings,
  LogOut,
  Plus,
  Bell,
  Globe,
  Menu,
  X,
  Activity,
  Calendar,
  Sparkles,
  Server,
  RefreshCw
} from 'lucide-react';
import { StrydeXLogo } from '../ui/StrydeXLogo';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, title, subtitle, actions }) => {
  const {
    user,
    activeView,
    setActiveView,
    setIsAuthenticated,
    setActiveModal,
    addNotification,
    isBackendConnected,
    isSyncing,
    refreshBackendData
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: Array<{ id: AppView; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'video-analysis', label: 'AI Video Analysis', icon: Video },
    { id: 'training', label: 'Training & Drills', icon: Dumbbell },
    { id: 'athlete-profile', label: 'Athlete Portfolio', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('landing');
    addNotification('Logged Out', 'You have been signed out of your athlete session.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 flex flex-col md:flex-row antialiased selection:bg-[#BEF264] selection:text-black">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#09090C] border-b border-white/[0.08] sticky top-0 z-30">
        <button
          onClick={() => setActiveView('landing')}
          className="flex items-center text-left cursor-pointer"
        >
          <StrydeXLogo variant="horizontal" size="xs" showTagline={false} />
        </button>

        <div className="flex items-center gap-2">
          {/* Backend Status indicator on mobile */}
          <div
            className={`w-2 h-2 rounded-full ${
              isBackendConnected ? 'bg-[#BEF264]' : 'bg-amber-400'
            }`}
            title={isBackendConnected ? 'API Connected' : 'Offline Mode'}
          />

          <button
            onClick={() => setActiveView('athlete-profile')}
            className="w-7 h-7 rounded-lg overflow-hidden border border-[#BEF264]/40 shrink-0"
            title="View Athlete Profile"
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#14141A] text-[10px] font-mono text-[#BEF264] flex items-center justify-center font-bold">
                {user.name[0]}
              </div>
            )}
          </button>
          <button
            onClick={() => setActiveModal('log-match')}
            className="p-1.5 rounded-lg bg-[#BEF264] text-black text-xs font-semibold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Match</span>
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-neutral-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay on Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-[#09090C] border-r border-white/[0.08] flex flex-col justify-between z-40 transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
            <button
              onClick={() => {
                setActiveView('landing');
                setSidebarOpen(false);
              }}
              className="flex items-center group text-left cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <StrydeXLogo variant="horizontal" size="sm" showTagline={true} />
            </button>
          </div>

          {/* Quick Action Button in Sidebar */}
          <div className="py-4">
            <button
              onClick={() => {
                setActiveModal('upload-video');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-extrabold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Video className="w-4 h-4 text-black" />
              <span>Analyze New Video</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1 overflow-y-auto py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all text-left cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarIndicator"
                      className="absolute inset-0 bg-[#16161E] border border-white/[0.12] rounded-xl -z-0 shadow-sm shadow-black"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <Icon
                    className={`w-4 h-4 shrink-0 relative z-10 transition-colors ${
                      isActive ? 'text-[#BEF264]' : 'text-neutral-400'
                    }`}
                  />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#BEF264] relative z-10" />
                  )}
                </button>
              );
            })}

            {/* Public Portfolio Link */}
            <div className="pt-4 mt-4 border-t border-white/[0.06]">
              <button
                onClick={() => {
                  setActiveView('public-profile');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all text-left cursor-pointer ${
                  activeView === 'public-profile'
                    ? 'bg-[#14141A] text-white border border-white/[0.12]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Globe className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <div className="flex-1 truncate">
                  <span>Public Portfolio</span>
                  <span className="block text-[9px] text-neutral-400 font-mono">SCOUT DOSSIER</span>
                </div>
              </button>
            </div>
          </nav>

          {/* Backend Connection Status Badge */}
          <div className="py-2">
            <button
              onClick={() => refreshBackendData()}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors text-[10px] font-mono text-neutral-400 cursor-pointer"
              title="Click to sync with backend"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isBackendConnected ? 'bg-[#BEF264] animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className={isBackendConnected ? 'text-[#BEF264]' : 'text-amber-400'}>
                  {isBackendConnected ? 'API Connected' : 'Local Storage'}
                </span>
              </div>
              <RefreshCw className={`w-3 h-3 text-neutral-400 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* User Profile Mini Footer with Profile Picture */}
          <div className="pt-3 border-t border-white/[0.08] mt-auto">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] border border-white/[0.04]">
              <button
                onClick={() => {
                  setActiveView('athlete-profile');
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2.5 flex-1 min-w-0 text-left group cursor-pointer"
                title="View Athlete Profile"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-xl object-cover border border-[#BEF264]/40 shrink-0 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-[#14141A] border border-[#BEF264]/40 flex items-center justify-center text-xs font-mono font-bold text-[#BEF264] shrink-0">
                    {user.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate group-hover:text-[#BEF264] transition-colors">{user.name}</p>
                  <p className="text-[10px] text-neutral-400 font-mono truncate">{user.role} · #{user.jerseyNumber}</p>
                </div>
              </button>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#000000]">
        {/* Top bar contract: Breadcrumbs / Page title / Header actions */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/[0.08] bg-[#000000]/80 backdrop-blur-md sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-0.5">
              <span>STRYDEX</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-300 uppercase tracking-wider">{activeView.replace('-', ' ')}</span>
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tightest">{title}</h1>
            {subtitle && <p className="text-xs text-neutral-400 mt-0.5 font-sans">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            {actions}

            {/* Backend Live Indicator in Desktop Header */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-mono cursor-pointer transition-colors ${
                isBackendConnected
                  ? 'bg-[#BEF264]/10 border-[#BEF264]/30 text-[#BEF264]'
                  : 'bg-white/[0.04] border-white/10 text-neutral-400'
              }`}
              onClick={() => refreshBackendData()}
              title="Click to check backend status & sync"
            >
              <Server className="w-3 h-3" />
              <span>{isBackendConnected ? 'Backend Live' : 'Local Mode'}</span>
            </div>

            <button
              onClick={() => setActiveModal('log-match')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#121216] hover:bg-[#181820] text-neutral-200 border border-white/10 rounded-xl transition-all cursor-pointer hover:border-white/20"
            >
              <Calendar className="w-3.5 h-3.5 text-[#BEF264]" />
              <span>Log Match</span>
            </button>

            <button
              onClick={() => setActiveModal('upload-video')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#BEF264] hover:bg-[#aee750] text-black rounded-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>New Analysis</span>
            </button>

            <button
              onClick={() => addNotification('System Telemetry', 'All AI motion tracking algorithms online & calibrated.', 'info')}
              className="p-2 text-neutral-400 hover:text-white bg-[#121216] border border-white/10 rounded-xl transition-colors relative cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#BEF264] rounded-full" />
            </button>

            {/* Profile Picture in Top Desktop Header */}
            <button
              onClick={() => setActiveView('athlete-profile')}
              className="w-9 h-9 rounded-xl border border-[#BEF264]/40 overflow-hidden hover:scale-105 transition-transform cursor-pointer flex items-center justify-center bg-[#14141A] text-xs font-mono font-bold text-[#BEF264]"
              title="View Athlete Profile"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name.split(' ').map((n) => n[0]).join('')
              )}
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};
