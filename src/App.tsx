/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Dashboard } from './components/dashboard/Dashboard';
import { PerformanceAnalytics } from './components/analytics/PerformanceAnalytics';
import { VideoAnalysis } from './components/video/VideoAnalysis';
import { TrainingDevelopment } from './components/training/TrainingDevelopment';
import { AthleteProfile } from './components/athlete/AthleteProfile';
import { PublicAthleteProfile } from './components/athlete/PublicAthleteProfile';
import { Settings } from './components/settings/Settings';
import { InteractiveCursor } from './components/ui/InteractiveCursor';
import { ModalsContainer } from './components/ui/Modals';
import { ToastContainer } from './components/ui/Toast';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 selection:bg-[#BEF264] selection:text-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="w-full min-h-screen"
        >
          {activeView === 'landing' && <LandingPage />}
          {activeView === 'login' && <SignIn />}
          {(activeView === 'signup' || activeView === 'onboarding') && <OnboardingFlow />}
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'performance' && <PerformanceAnalytics />}
          {activeView === 'video-analysis' && <VideoAnalysis />}
          {activeView === 'training' && <TrainingDevelopment />}
          {activeView === 'athlete-profile' && <AthleteProfile />}
          {activeView === 'public-profile' && <PublicAthleteProfile />}
          {activeView === 'settings' && <Settings />}
        </motion.div>
      </AnimatePresence>

      {/* Global Interactive Modals, Custom Magnetic Cursor and Toast Notifications */}
      <InteractiveCursor />
      <ModalsContainer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
