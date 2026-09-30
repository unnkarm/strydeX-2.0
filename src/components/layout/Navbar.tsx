import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity } from 'lucide-react';
import { StrydeXLogo } from '../ui/StrydeXLogo';

export const Navbar: React.FC = () => {
  const { setActiveView, isAuthenticated, user } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#000000]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: StrydeX Official Cricket Logo */}
          <button
            onClick={() => setActiveView('landing')}
            className="flex items-center transition-transform hover:scale-[1.02] cursor-pointer"
            aria-label="StrydeX Home"
          >
            <StrydeXLogo variant="horizontal" size="sm" showTagline={false} />
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-tight text-neutral-400">
            <button
              onClick={() => scrollToSection('platform')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Platform
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('athletes')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              For Athletes
            </button>
            <button
              onClick={() => scrollToSection('coaches')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              For Coaches
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('athlete-profile')}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  title="View Athlete Profile"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#BEF264]"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#181818] border border-[#BEF264] flex items-center justify-center text-[10px] font-mono text-[#BEF264] font-bold">
                      {user.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-white group-hover:text-[#BEF264] transition-colors hidden sm:inline">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                <button
                  onClick={() => setActiveView('dashboard')}
                  className="px-4 py-2 text-xs font-bold text-black bg-[#BEF264] hover:bg-[#aee750] rounded-lg transition-all whitespace-nowrap cursor-pointer"
                >
                  Dashboard
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setActiveView('login')}
                  className="hidden sm:inline-block px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors whitespace-nowrap"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveView('signup')}
                  className="px-4 py-2 text-xs font-bold text-black bg-[#BEF264] hover:bg-[#aee750] rounded-lg transition-all whitespace-nowrap shadow-sm cursor-pointer"
                >
                  Get Started
                </button>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-2 border-t border-white/[0.08] flex flex-col gap-2.5 text-xs text-neutral-300 bg-[#121212] rounded-xl p-4 shadow-2xl">
            <button onClick={() => scrollToSection('platform')} className="text-left py-1 hover:text-white">
              Platform
            </button>
            <button onClick={() => scrollToSection('features')} className="text-left py-1 hover:text-white">
              Features
            </button>
            <button onClick={() => scrollToSection('athletes')} className="text-left py-1 hover:text-white">
              For Athletes
            </button>
            <button onClick={() => scrollToSection('coaches')} className="text-left py-1 hover:text-white">
              For Coaches
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-left py-1 hover:text-white">
              Pricing
            </button>
            <button onClick={() => scrollToSection('about')} className="text-left py-1 hover:text-white">
              About
            </button>
            <div className="pt-2 border-t border-white/[0.08] flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('login');
                }}
                className="flex-1 py-2 text-xs font-medium text-center border border-white/10 rounded-lg text-neutral-200"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('signup');
                }}
                className="flex-1 py-2 text-xs font-bold text-center bg-[#BEF264] text-black rounded-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
