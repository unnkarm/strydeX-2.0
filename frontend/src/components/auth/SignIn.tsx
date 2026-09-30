import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { StrydeXLogo } from '../ui/StrydeXLogo';

export const SignIn: React.FC = () => {
  const { setIsAuthenticated, setActiveView, addNotification } = useApp();
  const [email, setEmail] = useState('arjun.sharma@crickettech.io');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setActiveView('dashboard');
    addNotification('Welcome Back, Arjun', 'Loaded your latest batting & video telemetry.');
  };

  const handleGoogleSignIn = () => {
    setIsAuthenticated(true);
    setActiveView('dashboard');
    addNotification('Google Sign-In Verified', 'Authenticated with cricket athlete credentials.');
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-3">
        <button
          onClick={() => setActiveView('landing')}
          className="inline-flex items-center justify-center transition-transform hover:scale-[1.02] cursor-pointer"
        >
          <StrydeXLogo variant="horizontal" size="md" showTagline={false} />
        </button>

        <h2 className="text-2xl font-extrabold text-white tracking-tight">Sign in to your athlete hub</h2>
        <p className="text-xs text-slate-400">Access your telemetry, video observations, and training schedule</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-[#0E1526] py-8 px-6 sm:px-10 border border-white/10 rounded-2xl shadow-2xl space-y-6">
          {/* Quick Demo Pre-fill Pill Banner */}
          <div className="p-3 rounded-lg bg-[#BEF264]/10 border border-[#BEF264]/20 text-xs text-slate-200 flex items-center justify-between">
            <span className="text-[#BEF264] font-semibold">Demo Credentials Ready</span>
            <span className="text-[11px] text-slate-400 font-mono">Arjun Sharma (Club XI)</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161F33] border border-white/10 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => addNotification('Password Reset', 'Password recovery instructions sent to email.', 'info')}
                  className="text-xs text-[#BEF264] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#161F33] border border-white/10 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-[#161F33] border-white/20 text-[#BEF264] focus:ring-0"
                />
                <span>Remember this device</span>
              </label>
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#BEF264]" /> 256-bit encrypted
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to StrydeX</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#0E1526] px-3 text-xs text-slate-500 font-mono">OR</span>
          </div>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 rounded-xl bg-[#161F33] hover:bg-[#1E2942] text-slate-200 border border-white/10 text-xs font-medium transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-xs text-slate-400">
            Don't have an athlete account?{' '}
            <button
              onClick={() => setActiveView('signup')}
              className="text-[#BEF264] hover:underline font-semibold"
            >
              Sign up free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
