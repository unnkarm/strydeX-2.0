import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Play, Pause, Compass, Zap, Shield, Sparkles, Sliders } from 'lucide-react';

export type DeliveryType = 'outswing' | 'inswing' | 'reverse' | 'scramble' | 'legspin' | 'offspin';

interface DeliveryPreset {
  id: DeliveryType;
  name: string;
  category: 'Pace' | 'Spin';
  seamAngle: number;
  rotationSpeed: number;
  rotationAxis: [number, number, number];
  deviation: string;
  rpm: number;
  explanation: string;
}

const PRESETS: Record<DeliveryType, DeliveryPreset> = {
  outswing: {
    id: 'outswing',
    name: 'Conventional Outswing',
    category: 'Pace',
    seamAngle: 20,
    rotationSpeed: 0.05,
    rotationAxis: [0.35, 1, 0],
    deviation: '+14.6 cm late swing',
    rpm: 2280,
    explanation: 'Upright seam tilted 20° towards 1st slip. Turbulent boundary layer on rough side creates late lateral swing through the air.'
  },
  inswing: {
    id: 'inswing',
    name: 'Hooping Inswing',
    category: 'Pace',
    seamAngle: -20,
    rotationSpeed: 0.05,
    rotationAxis: [-0.35, 1, 0],
    deviation: '-12.8 cm inward arc',
    rpm: 2190,
    explanation: 'Seam angled towards leg slip with shiny side on off side, pushing the ball into the batsman’s pads.'
  },
  reverse: {
    id: 'reverse',
    name: 'Reverse Swing',
    category: 'Pace',
    seamAngle: 18,
    rotationSpeed: 0.065,
    rotationAxis: [0.3, 1, 0],
    deviation: '+18.2 cm vicious late dip',
    rpm: 2420,
    explanation: 'With heavy wear on one hemisphere, laminar boundary layer separates early, producing violent late reverse direction.'
  },
  scramble: {
    id: 'scramble',
    name: 'Scrambled Seam',
    category: 'Pace',
    seamAngle: 45,
    rotationSpeed: 0.04,
    rotationAxis: [0.8, 0.6, 0.4],
    deviation: '±8.5 cm unpredictable nip',
    rpm: 1950,
    explanation: 'Tumbling seam hitting turf at random orientations, generating unpredictable bounce and seam deviation off the deck.'
  },
  legspin: {
    id: 'legspin',
    name: 'Leg Break (Wrist Spin)',
    category: 'Spin',
    seamAngle: 45,
    rotationSpeed: 0.07,
    rotationAxis: [0.6, 0.3, 0.8],
    deviation: '+22.4 cm sharp turn',
    rpm: 2650,
    explanation: 'Third finger revolutions impart clockwise torque at 45°, generating strong Magnus dip and sharp turn away from the right-hander.'
  },
  offspin: {
    id: 'offspin',
    name: 'Off Break (Finger Spin)',
    category: 'Spin',
    seamAngle: -35,
    rotationSpeed: 0.06,
    rotationAxis: [-0.5, 0.2, -0.8],
    deviation: '-19.1 cm drift & bite',
    rpm: 2480,
    explanation: 'Index finger snap generates anti-clockwise rotation with right-to-left Magnus drift followed by aggressive off-pitch grip.'
  }
};

export const ThreeCricketBall: React.FC<{ className?: string; interactive?: boolean }> = ({
  className = '',
  interactive = true
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activePreset, setActivePreset] = useState<DeliveryType>('outswing');
  const [isPlaying, setIsPlaying] = useState(true);
  const [rpmDisplay, setRpmDisplay] = useState(PRESETS.outswing.rpm);
  const [currentAngle, setCurrentAngle] = useState(PRESETS.outswing.seamAngle);

  // Three.js instances ref
  const sceneRef = useRef<THREE.Scene | null>(null);
  const ballGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const presetRef = useRef<DeliveryPreset>(PRESETS.outswing);
  const isPlayingRef = useRef(true);

  // Keep refs in sync
  useEffect(() => {
    presetRef.current = PRESETS[activePreset];
    setRpmDisplay(PRESETS[activePreset].rpm);
    setCurrentAngle(PRESETS[activePreset].seamAngle);
  }, [activePreset]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ball Group
    const ballGroup = new THREE.Group();
    scene.add(ballGroup);
    ballGroupRef.current = ballGroup;

    // 1. Cricket Ball Sphere Mesh
    const sphereGeo = new THREE.SphereGeometry(1.2, 64, 64);
    
    // Create dual-hemisphere leather texture procedural canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Base deep cricket leather red
      ctx.fillStyle = '#831818';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle leather grain noise
      for (let i = 0; i < 20000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const opacity = Math.random() * 0.08;
        ctx.fillStyle = `rgba(0,0,0,${opacity})`;
        ctx.fillRect(x, y, 1.5, 1.5);
      }

      // Slightly lighter shine on one hemisphere for swing demonstration
      ctx.fillStyle = 'rgba(255, 120, 120, 0.08)';
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

      // StrydeX Gold Crest Stamp on the ball
      ctx.fillStyle = '#E5C158';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('STRYDEX 4-PIECE', 256, 240);
      ctx.font = '16px monospace';
      ctx.fillText('SPECIAL SEAM · 156g', 256, 275);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const ballMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.32,
      metalness: 0.12,
      color: 0x991818
    });

    const ballMesh = new THREE.Mesh(sphereGeo, ballMaterial);
    ballGroup.add(ballMesh);

    // 2. Raised Prominent Cricket Seam (Torus with stitch pattern)
    const seamRadius = 1.205;
    const seamTube = 0.038;
    const seamGeo = new THREE.TorusGeometry(seamRadius, seamTube, 24, 128);
    const seamMat = new THREE.MeshStandardMaterial({
      color: 0xE8E0D2, // Creamy wax seam thread
      roughness: 0.45,
      metalness: 0.05
    });
    const seamMesh = new THREE.Mesh(seamGeo, seamMat);
    // Rotate seam so it lies along vertical plane
    seamMesh.rotation.y = Math.PI / 2;
    ballGroup.add(seamMesh);

    // 3. Stitches details along the seam
    const stitchCount = 68;
    const stitchGroup = new THREE.Group();
    for (let i = 0; i < stitchCount; i++) {
      const angle = (i / stitchCount) * Math.PI * 2;
      const stitchGeo = new THREE.BoxGeometry(0.016, 0.07, 0.024);
      const stitchMat = new THREE.MeshBasicMaterial({ color: 0xFDFBF7 });
      const stitch = new THREE.Mesh(stitchGeo, stitchMat);

      const r = seamRadius + 0.012;
      stitch.position.set(0, Math.cos(angle) * r, Math.sin(angle) * r);
      stitch.rotation.x = -angle;
      stitch.rotation.z = (i % 2 === 0 ? 0.3 : -0.3); // Alternating cross-stitch
      stitchGroup.add(stitch);
    }
    ballGroup.add(stitchGroup);

    // 4. Subtle Seam Velocity Indicator Ring (Electric Lime)
    const indicatorGeo = new THREE.RingGeometry(1.42, 1.45, 64);
    const indicatorMat = new THREE.MeshBasicMaterial({
      color: 0xBEF264,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    });
    const indicatorMesh = new THREE.Mesh(indicatorGeo, indicatorMat);
    indicatorMesh.rotation.y = Math.PI / 2;
    ballGroup.add(indicatorMesh);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xBEF264, 0.9); // Electric lime rim
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.0, 10);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // Initial orientation for outswing
    const initPreset = PRESETS[activePreset];
    const initialEuler = new THREE.Euler(0, 0, (initPreset.seamAngle * Math.PI) / 180);
    ballGroup.setRotationFromEuler(initialEuler);

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (ballGroupRef.current && isPlayingRef.current && !isDraggingRef.current) {
        const curPreset = presetRef.current;
        const axis = new THREE.Vector3(...curPreset.rotationAxis).normalize();
        ballGroupRef.current.rotateOnAxis(axis, curPreset.rotationSpeed);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sphereGeo.dispose();
      ballMaterial.dispose();
      texture.dispose();
      seamGeo.dispose();
      seamMat.dispose();
    };
  }, []);

  // Preset switch transition
  const handleSelectPreset = (key: DeliveryType) => {
    setActivePreset(key);
    const p = PRESETS[key];
    if (ballGroupRef.current) {
      // Smoothly orient to the canonical seam angle
      const targetZ = (p.seamAngle * Math.PI) / 180;
      ballGroupRef.current.rotation.set(0, 0, targetZ);
    }
  };

  // Mouse drag handlers for manual 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !isDraggingRef.current || !ballGroupRef.current) return;
    const deltaX = e.clientX - prevMousePos.current.x;
    const deltaY = e.clientY - prevMousePos.current.y;

    ballGroupRef.current.rotation.y += deltaX * 0.012;
    ballGroupRef.current.rotation.x += deltaY * 0.012;

    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!interactive || e.touches.length === 0) return;
    isDraggingRef.current = true;
    prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!interactive || !isDraggingRef.current || !ballGroupRef.current || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - prevMousePos.current.x;
    const deltaY = e.touches[0].clientY - prevMousePos.current.y;

    ballGroupRef.current.rotation.y += deltaX * 0.012;
    ballGroupRef.current.rotation.x += deltaY * 0.012;

    prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleResetOrientation = () => {
    if (ballGroupRef.current) {
      const p = PRESETS[activePreset];
      ballGroupRef.current.rotation.set(0, 0, (p.seamAngle * Math.PI) / 180);
    }
  };

  const currentPresetData = PRESETS[activePreset];

  return (
    <div className={`relative rounded-3xl bg-[#09090C] border border-white/[0.08] overflow-hidden flex flex-col ${className}`}>
      {/* Top Header telemetry bar */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.08] bg-[#0C0C10]/80 backdrop-blur-md z-10 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#BEF264] animate-ping" />
          <span className="text-white font-extrabold tracking-tightest uppercase">
            3D SEAM KINEMATICS & AERODYNAMICS
          </span>
          <span className="text-neutral-500 hidden sm:inline">| 156g LEATHER</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Rotation' : 'Resume Rotation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#BEF264]" />}
          </button>
          <button
            onClick={handleResetOrientation}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Reset Seam Angle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div
        className="relative flex-1 min-h-[340px] sm:min-h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Subtle background radar circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-72 h-72 rounded-full border border-dashed border-[#BEF264]/40 animate-[spin_60s_linear_infinite]" />
          <div className="w-96 h-96 rounded-full border border-white/10" />
        </div>

        {/* 3D WebGL Canvas container */}
        <div ref={mountRef} className="w-full h-full absolute inset-0" />

        {/* Floating Telemetry HUD Badges */}
        <div className="absolute top-4 left-4 pointer-events-none space-y-1.5 font-mono text-left">
          <div className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 inline-block">
            <span className="text-[10px] text-neutral-400 block uppercase">SEAM ANGLE</span>
            <span className="text-white font-bold text-sm tracking-tightest tabular-nums">
              {currentAngle > 0 ? `+${currentAngle}°` : `${currentAngle}°`} SLIP
            </span>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 block">
            <span className="text-[10px] text-neutral-400 block uppercase">ROTATIONAL VELOCITY</span>
            <span className="text-[#BEF264] font-bold text-sm tabular-nums">
              {rpmDisplay.toLocaleString()} RPM
            </span>
          </div>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none font-mono text-right">
          <div className="px-3 py-1.5 rounded-md bg-black/70 backdrop-blur-md border border-[#BEF264]/30 inline-block text-right">
            <span className="text-[9px] text-[#BEF264] block font-semibold uppercase">AERO PREDICTION</span>
            <span className="text-white font-bold text-xs tabular-nums">
              {currentPresetData.deviation}
            </span>
          </div>
        </div>

        {/* Hint text bottom of canvas */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] font-mono text-neutral-400 bg-black/50 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
          DRAG TO ROTATE 360° · REAL-TIME SEAM ORIENTATION
        </div>
      </div>

      {/* Preset Selector Pill Strip */}
      <div className="p-4 bg-[#0A0A0E] border-t border-white/[0.08] space-y-3 z-10">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="text-[11px] uppercase tracking-wider text-neutral-400">SELECT DELIVERY PROFILE:</span>
          <span className="text-[#BEF264] text-[11px] font-semibold">{currentPresetData.category.toUpperCase()} ARTILLERY</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {(Object.keys(PRESETS) as DeliveryType[]).map((key) => {
            const p = PRESETS[key];
            const isSelected = activePreset === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectPreset(key)}
                className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#181820] text-white border-[#BEF264] shadow-sm font-bold'
                    : 'bg-[#111116] text-neutral-400 border-white/[0.06] hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">{p.category}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />}
                </div>
                <div className="truncate text-[11px] text-white font-sans font-semibold">{p.name}</div>
                <div className="text-[10px] text-neutral-400 tabular-nums">{p.rpm} RPM</div>
              </button>
            );
          })}
        </div>

        {/* Biomechanics Breakdown Explanation */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-left flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-[#BEF264]/10 text-[#BEF264] flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs">
            <span className="font-semibold text-white">{currentPresetData.name}: </span>
            <span className="text-neutral-400 font-sans leading-relaxed">{currentPresetData.explanation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
