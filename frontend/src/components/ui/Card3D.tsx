import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number;
  glowColor?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  onClick,
  intensity = 15,
  glowColor = 'rgba(255, 255, 255, 0.05)'
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -intensity;
    const rotY = ((x - centerX) / centerX) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="transition-transform duration-100 ease-out"
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-transform duration-150 ease-out ${className}`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Dynamic Specular Glare Reflection */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 180px at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 80%)`,
            zIndex: 10
          }}
        />

        {children}
      </div>
    </div>
  );
};
