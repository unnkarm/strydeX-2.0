import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { PRICING_TIERS } from '../../lib/mock-data';
import { Cylindrical3DCarousel } from '../3d/Cylindrical3DCarousel';
import { ThreeCricketBall } from '../3d/ThreeCricketBall';
import { RefractionLens } from '../3d/RefractionLens';
import { Card3D } from '../ui/Card3D';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { ScrollProgressBar } from '../ui/ScrollProgressBar';
import { MagneticButton } from '../ui/MagneticButton';
import { HeroCricketBall3D } from '../3d/HeroCricketBall3D';
import { StrydeXLogoIcon } from '../ui/StrydeXLogo';
import {
  Activity,
  Video,
  TrendingUp,
  Target,
  Share2,
  Users,
  CheckCircle,
  Play,
  ArrowRight,
  Shield,
  Zap,
  ChevronRight,
  Sparkles,
  Award,
  Eye,
  Maximize2,
  Compass,
  Layers
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, setIsAuthenticated } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [lensActive, setLensActive] = useState(false);
  const [mouseSpotlight, setMouseSpotlight] = useState({ x: 0, y: 0 });
  const [ballAnimationTrigger, setBallAnimationTrigger] = useState(0);

  const { scrollY } = useScroll();
  const parallaxBgY = useTransform(scrollY, [0, 800], [0, 140]);
  const parallaxPlayerY = useTransform(scrollY, [0, 800], [0, -70]);
  const parallaxGridY = useTransform(scrollY, [0, 800], [0, 90]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseSpotlight({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartApp = () => {
    setActiveView('onboarding');
  };

  const handleReplayBall = () => {
    setBallAnimationTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 selection:bg-[#BEF264] selection:text-black relative overflow-x-hidden">
      {/* Scroll Progress Bar along top */}
      <ScrollProgressBar />

      {/* Interactive 3D Refraction Lens Component */}
      <RefractionLens active={lensActive} onToggle={() => setLensActive(!lensActive)} />

      {/* Top Navigation */}
      <Navbar />

      {/* Hero Section with Parallax Cricket Background & Traveling Cricket Ball */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden border-b border-white/[0.08]">
        {/* Parallax Cricket Background Layer 1: Biomechanical Grid */}
        <motion.div
          style={{ y: parallaxGridY }}
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cricketParallaxGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#BEF264" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="24" cy="24" r="1" fill="#BEF264" fillOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cricketParallaxGrid)" />
          </svg>
        </motion.div>

        {/* Parallax Cricket Background Layer 2: Atmospheric Turf & Pitch Vector Lines */}
        <motion.div
          style={{ y: parallaxBgY }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {/* Cricket Crease Line Vectors in background */}
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BEF264]/20 to-transparent" />
          <div className="absolute top-2/3 left-1/4 w-32 h-16 border-t border-l border-r border-[#BEF264]/15" />
        </motion.div>

        {/* Parallax Cricket Background Layer 3: Stylized Cricket Bowler/Batsman Silhouette Watermark */}
        <motion.div
          style={{ y: parallaxPlayerY }}
          className="absolute -right-20 top-20 w-[500px] h-[550px] opacity-[0.04] pointer-events-none z-0 hidden lg:block"
        >
          <svg viewBox="0 0 400 450" className="w-full h-full fill-none stroke-[#BEF264]" strokeWidth="1.5">
            {/* Elegant silhouette outline of bowler delivery leap */}
            <circle cx="220" cy="70" r="30" />
            <path d="M 220 100 L 210 210 L 290 340 M 210 210 L 150 330" />
            <path d="M 215 125 L 305 75 L 340 30" strokeWidth="2.5" />
            <path d="M 215 125 L 140 160 L 120 220" />
            {/* Release trajectory arc */}
            <path d="M 340 30 Q 250 80 100 200" strokeDasharray="6 6" strokeOpacity="0.8" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Proposition & CTA */}
            <div className="lg:col-span-7 space-y-6 text-left relative">
              {/* Badge & Traveling Cricket Ball with Motion Trail */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-white/10 text-xs font-mono text-neutral-300 self-start shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-[#BEF264] animate-pulse" />
                  <span>Next-Gen Cricket Intelligence</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-[#BEF264] font-semibold">120 FPS CV + 3D Kinematics</span>
                </motion.div>

                {/* Interactive Trigger to Replay Ball Travel Trajectory */}
                <button
                  onClick={handleReplayBall}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-[#BEF264]/10 border border-white/10 hover:border-[#BEF264]/40 text-[11px] font-mono text-neutral-300 hover:text-[#BEF264] transition-all cursor-pointer self-start"
                  title="Watch the animated cricket ball streak across the hero with lime trail"
                >
                  <Sparkles className="w-3 h-3 text-[#BEF264]" />
                  <span>Watch 142.4 KPH Seam Delivery</span>
                </button>
              </div>

              {/* Cinematic Staggered Word-by-Word Reveal */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tightest text-white leading-[1.08] max-w-2xl text-balance">
                {['Your', 'Game.'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {['Measured.', 'Understood.', 'Elevated.'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-3 text-[#BEF264]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-neutral-400 max-w-xl font-normal leading-relaxed font-sans"
              >
                AI-powered cricket performance analysis that helps you understand your game, track your growth, and train with purpose.
              </motion.p>

              {/* Special Animated Cricket Ball Traveling Across the Hero with Lime Motion Trail */}
              <div className="relative w-full h-12 overflow-visible pointer-events-none select-none my-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ballAnimationTrigger}
                    initial={{ x: -40, y: -20, opacity: 0, scale: 0.6 }}
                    animate={{
                      x: [ -20, 180, 360, 480 ],
                      y: [ -15, 10, -5, 8 ],
                      opacity: [ 0, 1, 1, 0.95 ],
                      scale: [ 0.7, 1.1, 0.95, 1 ]
                    }}
                    transition={{
                      duration: 2.2,
                      ease: [0.16, 1, 0.3, 1],
                      times: [0, 0.4, 0.75, 1]
                    }}
                    className="absolute top-0 left-0 flex items-center gap-2.5 z-20"
                  >
                    {/* Electric Lime Trail */}
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#BEF264]/40 to-[#BEF264] rounded-full" />
                    
                    {/* The Seamed Red Ball */}
                    <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[#800C1B] via-[#9E1224] to-[#4A050D] border border-[#BEF264] flex items-center justify-center animate-spin" style={{ animationDuration: '0.8s' }}>
                      <div className="w-full h-0.5 bg-white/90 rotate-45" />
                      <div className="absolute inset-0 rounded-full border border-dashed border-white/40" />
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTAs with Magnetic Pull */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
              >
                <MagneticButton
                  onClick={handleStartApp}
                  className="px-7 py-3.5 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-extrabold tracking-tight transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </MagneticButton>

                <button
                  onClick={() => {
                    const el = document.getElementById('platform');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-[#121212] hover:bg-[#1A1A1A] text-neutral-200 border border-white/10 text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-white/20"
                >
                  <Play className="w-3.5 h-3.5 text-[#BEF264] fill-[#BEF264]" />
                  <span>3D Kinematic Showcase</span>
                </button>

                <button
                  onClick={() => setLensActive(!lensActive)}
                  className={`px-4 py-3.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                    lensActive
                      ? 'bg-[#BEF264]/20 text-[#BEF264] border-[#BEF264]'
                      : 'bg-[#121212] text-neutral-300 border-white/10 hover:text-white'
                  }`}
                  title="Toggle 3D Chromatic Refraction Lens"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Vision Lens</span>
                </button>
              </motion.div>

              {/* Quiet Micro Trust Signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-3 flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-sans"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#BEF264]" />
                  <span>Sub-millimeter stance kinematics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#BEF264]" />
                  <span>Calibrated with ECB & BCCI coaches</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sleek, Minimal Interactive 3D Seam Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-[300px] rounded-2xl bg-[#0B0B0E] border border-white/[0.08] p-4 transition-all">
                {/* Minimal Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#BEF264]" />
                    <span className="text-white font-medium">3D Seam Kinematics</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">156g · WebGL</span>
                </div>

                {/* Compact Interactive 3D Ball */}
                <div className="py-3 flex flex-col items-center justify-center">
                  <HeroCricketBall3D size={180} interactive={true} />
                </div>

                {/* Minimal Understated Footer */}
                <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Drag to inspect</span>
                  <span className="text-[#BEF264] font-semibold">2,380 RPM</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infinite Performance Marquee Strip */}
      <div className="py-4 border-b border-white/[0.08] bg-[#07090F] overflow-hidden whitespace-nowrap relative select-none">
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
          className="inline-flex items-center gap-8 font-mono text-xs text-neutral-400 font-semibold"
        >
          {[
            '142.4 KPH RELEASE VELOCITY',
            '3.8° IMPACT TILT',
            '89 MS REACTION TIME',
            '42.5 BATTING AVERAGE',
            'SUB-MM POSE RECONSTRUCTION',
            '2380 RPM SEAM STABILITY',
            'DYNAMIC WAGON WHEEL',
            'KINETIC CHAIN ISOLATION',
            '120 FPS HIGH SPEED TRACKING',
            '142.4 KPH RELEASE VELOCITY',
            '3.8° IMPACT TILT',
            '89 MS REACTION TIME',
            '42.5 BATTING AVERAGE',
            'SUB-MM POSE RECONSTRUCTION',
            '2380 RPM SEAM STABILITY',
            'DYNAMIC WAGON WHEEL',
            'KINETIC CHAIN ISOLATION',
            '120 FPS HIGH SPEED TRACKING'
          ].map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
              <span className="hover:text-white transition-colors tracking-wider">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Jesper Landberg-inspired 3D Cylindrical Carousel Section */}
      <section id="platform" className="border-b border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">Elements.</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tightest leading-tight">
            See the highlights of this platform.
          </h2>
        </div>
        <Cylindrical3DCarousel
          onSelectCard={(item) => {
            if (item.svgType === 'batting') setActiveView('video-analysis');
            else if (item.svgType === 'wagon') setActiveView('performance');
            else if (item.svgType === 'portfolio') setActiveView('public-profile');
            else setActiveView('dashboard');
          }}
        />
      </section>

      {/* Trust / Metrics Strip with Animated Counters */}
      <section className="py-12 bg-[#0A0A0A] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <p className="text-xs uppercase font-mono text-neutral-400 tracking-wider">Performance Tracking</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">Multi-Format Cricket Metrics.</p>
              <p className="text-xs text-neutral-500 mt-0.5 font-sans">T20, 50-Over, Red Ball & Nets</p>
            </div>
            <div className="p-3 border-l border-white/[0.08]">
              <p className="text-xs uppercase font-mono text-[#BEF264] tracking-wider">AI-Assisted Analysis</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">Frame-Level Biomechanics.</p>
              <p className="text-xs text-neutral-500 mt-0.5 font-sans">Stance, Release & Footwork</p>
            </div>
            <div className="p-3 border-l border-white/[0.08]">
              <p className="text-xs uppercase font-mono text-neutral-400 tracking-wider">Personalized Development</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">Targeted Drill Sequencing.</p>
              <p className="text-xs text-neutral-500 mt-0.5 font-sans">Individualized Remediation</p>
            </div>
            <div className="p-3 border-l border-white/[0.08]">
              <p className="text-xs uppercase font-mono text-neutral-400 tracking-wider">Athlete-First Platform</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">Verified Digital Portfolio.</p>
              <p className="text-xs text-neutral-500 mt-0.5 font-sans">Direct Coach & Academy Sharing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Bento Grid */}
      <section id="features" className="py-24 border-b border-white/[0.08] bg-[#070707]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">Architecture.</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tightest">
                Built specifically for modern cricket demands.
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md font-sans">
              Five integrated modules working synchronously to turn raw cricket practice into quantified athletic mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: AI Video Analysis */}
            <div className="md:col-span-2">
              <Card3D intensity={6}>
                <div className="p-8 rounded-3xl bg-[#121212] border border-white/[0.08] relative overflow-hidden h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center">
                        <Video className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md">
                        FRAME-BY-FRAME · 60-120FPS
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">AI Biomechanical Video Analysis</h3>
                    <p className="text-sm text-neutral-400 max-w-xl leading-relaxed mb-6 font-sans">
                      Upload batting drives, bouncer evades, pace bowling release strides, or slip catches. StrydeX isolates joint angles, bat face trajectory, and head stability across delivery phases.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#090909] border border-white/[0.08] grid grid-cols-3 gap-3 text-center font-mono">
                    <div className="p-2 rounded bg-white/[0.02]">
                      <p className="text-[10px] text-neutral-500 uppercase">Bat Speed</p>
                      <p className="text-base font-bold text-white tabular-nums">114.2 km/h</p>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <p className="text-[10px] text-neutral-500 uppercase">Backlift Plane</p>
                      <p className="text-base font-bold text-[#BEF264] tabular-nums">14.8° Off-Stump</p>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <p className="text-[10px] text-neutral-500 uppercase">Head Jitter</p>
                      <p className="text-base font-bold text-emerald-400 tabular-nums">&lt; 3.2 cm</p>
                    </div>
                  </div>
                </div>
              </Card3D>
            </div>

            {/* Card 2: Performance Intelligence */}
            <div>
              <Card3D intensity={6}>
                <div className="p-8 rounded-3xl bg-[#121212] border border-white/[0.08] flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Performance Intelligence</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4 font-sans">
                      Multi-format scorebook analytics tracking averages, boundary conversion, dot-ball compression, and wagon wheel sector splits.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span>Wagon Wheel Sectors</span>
                    <span className="text-[#BEF264]">7 Key Angles</span>
                  </div>
                </div>
              </Card3D>
            </div>

            {/* Card 3: Personalized Development */}
            <div>
              <Card3D intensity={6}>
                <div className="p-8 rounded-3xl bg-[#121212] border border-white/[0.08] flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Personalized Development</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4 font-sans">
                      Structured drill regimens designed around weaknesses identified in match play—from facing spin to death bowling yorkers under pressure.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span>Integrated Drill Catalog</span>
                    <span className="text-amber-400">5 Disciplines</span>
                  </div>
                </div>
              </Card3D>
            </div>

            {/* Card 4: Athlete Portfolio */}
            <div className="md:col-span-2">
              <Card3D intensity={6}>
                <div className="p-8 rounded-3xl bg-[#121212] border border-white/[0.08] relative overflow-hidden h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Share2 className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-[#BEF264] bg-[#BEF264]/10 px-2.5 py-1 rounded-md">
                        SHAREABLE PUBLIC LINK
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Verified Athlete Portfolio</h3>
                    <p className="text-sm text-neutral-400 max-w-xl leading-relaxed mb-6 font-sans">
                      Present your credentials to coaches, clubs, and selectors. A bespoke public link showcasing your verified match records, video biomechanics reels, and physical benchmarks.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#090909] border border-white/10 text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#BEF264]" />
                    <span className="text-neutral-300 font-mono">strydex.cricket/profile/arjun_sharma</span>
                    <span className="ml-auto text-neutral-400 font-medium">Scout-Ready Dossier</span>
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Seam Kinematics Interactive Studio (Jesper Landberg Spatial Experience) */}
      <section className="py-24 border-b border-white/[0.08] bg-[#000000] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121216] border border-white/10 text-xs font-mono text-[#BEF264]">
                <Compass className="w-3.5 h-3.5" />
                <span>03 // SPATIAL AERODYNAMICS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tightest">
                Interactive 3D Seam Kinematics.
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md font-sans">
              Rotate the regulation 156g four-piece cricket ball in 3D space to inspect boundary layer separation, release RPM, and Magnus trajectory deviation in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive 3D WebGL Ball Canvas */}
            <div className="lg:col-span-8">
              <ThreeCricketBall className="shadow-2xl shadow-black/80" />
            </div>

            {/* Aerodynamics Telemetry Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-3xl bg-[#09090C] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-white/[0.08]">
                  <span className="text-neutral-400 uppercase">PHYSICS SPECIFICATION</span>
                  <span className="text-[#BEF264] font-bold">CALIBRATED</span>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-neutral-400">Core Weight</span>
                    <span className="text-white font-bold tabular-nums">156.0g Regulation</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-neutral-400">Seam Stitches</span>
                    <span className="text-white font-bold tabular-nums">68 Waxed Linen</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-neutral-400">Boundary Layer</span>
                    <span className="text-[#BEF264] font-bold">Turbulent Tripwire</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-neutral-400">Magnus Coefficient</span>
                    <span className="text-white font-bold tabular-nums">0.32 Cl</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    StrydeX computer vision tracks subtle seam wobble and tilt across bowling delivery strides, comparing release vectors with elite international benchmarks.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAuthenticated(true);
                    setActiveView('video-analysis');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-[#BEF264] hover:text-black text-white text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10 hover:border-[#BEF264]"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Launch in AI Video Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Coach Testimonial Badge */}
              <div className="p-5 rounded-3xl bg-[#09090C] border border-white/[0.08] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed italic">
                    "Visualizing seam axis in 3D during net sessions transformed how our bowlers execute outswing into right-handers."
                  </p>
                  <p className="text-[10px] font-mono text-neutral-400 mt-2">
                    MICHAEL V. · HEAD BOWLING COACH, NORTHERN ACADEMY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-24 border-b border-white/[0.08] bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">Transparent Tiers.</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tightest">
              Invest in your cricket breakthrough.
            </h2>
            <p className="text-sm text-neutral-400 font-sans">
              Configurable plans for solo club cricketers, representative players, and multi-team academies.
            </p>

            {/* Monthly / Annual toggle */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-neutral-500'}`}>
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-12 h-6 flex items-center bg-neutral-800 rounded-full p-1 transition-colors border border-white/10 cursor-pointer"
              >
                <div
                  className={`bg-[#BEF264] w-4 h-4 rounded-full transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-neutral-500'}`}>
                Annual Billing <span className="text-[#BEF264] font-mono text-[11px]">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier) => {
              const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;
              return (
                <div
                  key={tier.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                    tier.popular
                      ? 'bg-[#121212] border-2 border-[#BEF264] shadow-2xl'
                      : 'bg-[#121212] border border-white/[0.08]'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#BEF264] text-black text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white tracking-tight">{tier.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1 min-h-[32px] font-sans">{tier.tagline}</p>
                    </div>

                    <div className="mb-6 flex items-baseline gap-1 font-mono">
                      <span className="text-4xl font-extrabold text-white">${price}</span>
                      <span className="text-xs text-neutral-400">/ athlete / mo</span>
                    </div>

                    <ul className="space-y-3 text-xs text-neutral-300 mb-8 border-t border-white/[0.08] pt-6 font-sans">
                      {tier.features.map((feat, idx) => (
                         <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#BEF264] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={handleStartApp}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tier.popular
                        ? 'bg-[#BEF264] text-black hover:bg-[#aee750] shadow-sm'
                        : 'bg-[#1C1C1C] text-white hover:bg-neutral-800 border border-white/10'
                    }`}
                  >
                    {tier.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden bg-[#000000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="w-14 h-14 mx-auto flex items-center justify-center">
            <StrydeXLogoIcon size={52} />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tightest leading-tight text-balance">
            Your next breakthrough starts with understanding your game.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans">
            Join amateur and aspiring cricketers using biomechanical precision to transform their batting, bowling, and athletic confidence.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartApp}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#BEF264] hover:bg-[#aee750] text-black text-xs font-extrabold tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveView('public-profile')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#121212] hover:bg-[#1A1A1A] text-neutral-200 border border-white/10 text-xs font-semibold tracking-tight transition-colors cursor-pointer"
            >
              View Sample Athlete Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
