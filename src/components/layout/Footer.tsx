import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';
import { StrydeXLogo } from '../ui/StrydeXLogo';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="border-t border-white/[0.08] bg-[#070A10] text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <button
              onClick={() => setActiveView('landing')}
              className="text-left cursor-pointer hover:opacity-95 transition-opacity"
            >
              <StrydeXLogo variant="horizontal" size="md" showTagline={false} />
            </button>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              AI-powered cricket performance and athlete development platform. Built for batsmen, bowlers, wicketkeepers, and forward-thinking academies.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#BEF264]" />
              <span>Biomechanical standards calibrated with accredited cricket coaches</span>
            </div>
          </div>

          {/* Product Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveView('performance')} className="hover:text-white transition-colors">
                  Telemetry Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('video-analysis')} className="hover:text-white transition-colors">
                  AI Video Workspace
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('training')} className="hover:text-white transition-colors">
                  Drill Library & Plans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('public-profile')} className="hover:text-white transition-colors">
                  Athlete Portfolios
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Methodology & Stride Math
                </a>
              </li>
              <li>
                <a href="#coaches" className="hover:text-white transition-colors">
                  Academy Integration Guide
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing & Subscriptions
                </a>
              </li>
              <li>
                <span className="text-slate-500 flex items-center gap-1">
                  Coaching API (Private Beta) <ArrowUpRight className="w-3 h-3" />
                </span>
              </li>
            </ul>
          </div>

          {/* Company & Support Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Contact & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>contact@strydex.cricket</span>
              </li>
              <li>
                <button onClick={() => setActiveView('settings')} className="hover:text-white transition-colors">
                  Privacy & Data Governance
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('settings')} className="hover:text-white transition-colors">
                  Terms of Athlete Service
                </button>
              </li>
              <li>
                <span className="text-slate-500">London · Melbourne · Mumbai</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 StrydeX Performance Technologies Ltd. Train Smarter. Play Better.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Security Baseline</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Athlete Privacy Charter</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Status: All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
