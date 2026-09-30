import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroCricketBall3DProps {
  size?: number;
  interactive?: boolean;
  className?: string;
}

export const HeroCricketBall3D: React.FC<HeroCricketBall3DProps> = ({
  size = 190,
  interactive = true,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = size;
    const height = size;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.z = 4.8;

    // 2. WebGL Renderer with antialiasing and transparent canvas
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    // 3. Realistic Cricket Ball Canvas Texture Generator
    const createCricketBallTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Premium four-piece cricket ball leather red-crimson gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#780B1A');
      grad.addColorStop(0.3, '#941122');
      grad.addColorStop(0.7, '#820D1D');
      grad.addColorStop(1, '#5B0813');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Subtle fine leather grain noise
      for (let i = 0; i < 14000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const alpha = Math.random() * 0.04 + 0.01;
        ctx.fillStyle = Math.random() > 0.5 ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha * 1.5})`;
        ctx.fillRect(x, y, 1.2, 1.2);
      }

      // Quarter seams (four-piece ball construction)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(256, 0);
      ctx.lineTo(256, 512);
      ctx.moveTo(768, 0);
      ctx.lineTo(768, 512);
      ctx.stroke();

      // Main primary stitched seam along the meridian (x = 512)
      ctx.strokeStyle = 'rgba(30, 4, 8, 0.6)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(512, 0);
      ctx.lineTo(512, 512);
      ctx.stroke();

      // Alternating fine white waxed-linen cricket stitches
      ctx.fillStyle = '#FFFFFF';
      for (let y = 4; y < 512; y += 8) {
        // Left chevron stitch
        ctx.fillRect(507, y, 3, 2);
        // Right chevron stitch
        ctx.fillRect(514, y + 4, 3, 2);
      }

      // Elegant gold foil maker crest
      ctx.save();
      ctx.translate(256, 256);
      ctx.fillStyle = '#E2C26C';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('STRYDEX', 0, -8);
      ctx.font = '11px monospace';
      ctx.fillStyle = '#BEF264';
      ctx.fillText('156G · KINETIC', 0, 12);
      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    // 4. Smooth Ball Mesh
    const ballGeometry = new THREE.SphereGeometry(1.4, 64, 64);
    const ballMaterial = new THREE.MeshPhysicalMaterial({
      map: createCricketBallTexture(),
      roughness: 0.28,
      metalness: 0.05,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15,
      reflectivity: 0.5
    });

    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

    // 5. Subtle Raised Seam Ridge Torus (smooth, flush with ball)
    const torusGeom = new THREE.TorusGeometry(1.401, 0.012, 16, 96);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xefefef,
      roughness: 0.5,
      metalness: 0.1
    });
    const torusMesh = new THREE.Mesh(torusGeom, torusMat);

    // Group ball + seam together
    const ballCompound = new THREE.Group();
    ballCompound.add(ballMesh);
    ballCompound.add(torusMesh);
    scene.add(ballCompound);

    // Angled seam tilt for natural seam orientation
    ballCompound.rotation.x = 0.35;
    ballCompound.rotation.z = 0.25;

    // 6. Clean Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    // Soft cool fill light
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.6);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Subtle natural rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(-2, -3, -3);
    scene.add(rimLight);

    // 7. Smooth Mouse tracking & interaction
    let targetRotX = 0.35;
    let targetRotY = 0.5;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      if (!mount) return;
      const rect = mount.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;
        ballCompound.rotation.y += deltaX * 0.015;
        ballCompound.rotation.x += deltaY * 0.015;
      } else if (interactive) {
        const normX = (clientX / width) * 2 - 1;
        const normY = -(clientY / height) * 2 + 1;
        targetRotY = normX * 0.5;
        targetRotX = 0.35 - normY * 0.4;
      }
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      const rect = mount.getBoundingClientRect();
      previousMousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    mount.addEventListener('mousemove', handlePointerMove);
    mount.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gyroscopic seam spin
      if (!isDragging) {
        ballCompound.rotation.y += 0.01;
        ballCompound.rotation.x += (targetRotX - ballCompound.rotation.x) * 0.05;
      }

      // Subtle float
      ballCompound.position.y = Math.sin(elapsedTime * 1.5) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      mount.removeEventListener('mousemove', handlePointerMove);
      mount.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      ballGeometry.dispose();
      ballMaterial.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, [size, interactive]);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={mountRef}
        style={{ width: size, height: size }}
        className="cursor-grab active:cursor-grabbing relative z-10"
      />
    </div>
  );
};
