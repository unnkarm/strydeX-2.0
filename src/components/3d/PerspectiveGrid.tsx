import React, { useEffect, useRef } from 'react';

interface PerspectiveGridProps {
  className?: string;
  glowColor?: string;
}

export const PerspectiveGrid: React.FC<PerspectiveGridProps> = ({
  className = '',
  glowColor = '#BEF264'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const render = () => {
      if (!canvas) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Horizon line
      const horizonY = height * 0.42 + (mouseY - 0.5) * 40;
      const vanishX = width * 0.5 + (mouseX - 0.5) * 80;

      // Subtle atmospheric horizon glow
      const horizonGrad = ctx.createLinearGradient(0, horizonY - 60, 0, horizonY + 80);
      horizonGrad.addColorStop(0, 'rgba(8, 12, 20, 0)');
      horizonGrad.addColorStop(0.45, 'rgba(190, 242, 100, 0.08)');
      horizonGrad.addColorStop(1, 'rgba(8, 12, 20, 0)');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - 60, width, 140);

      // Perspective Grid Lines
      offset = (offset + 0.35) % 40;

      // Perspective vertical / fan lines emanating from vanishing point
      const lineCount = 36;
      ctx.lineWidth = 1;

      for (let i = -lineCount; i <= lineCount; i++) {
        const bottomX = width * 0.5 + i * (width / 16);
        const grad = ctx.createLinearGradient(vanishX, horizonY, bottomX, height);
        grad.addColorStop(0, 'rgba(190, 242, 100, 0.01)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.04)');
        grad.addColorStop(1, 'rgba(190, 242, 100, 0.12)');

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // Horizontal depth lines with geometric exponential compression
      const depthSteps = 22;
      for (let j = 0; j < depthSteps; j++) {
        const t = (j + offset / 40) / depthSteps;
        const curveT = Math.pow(t, 2.6); // Exponential perspective
        const y = horizonY + curveT * (height - horizonY);

        const alpha = Math.min(1, curveT * 1.5) * 0.18;
        ctx.strokeStyle = `rgba(190, 242, 100, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};
