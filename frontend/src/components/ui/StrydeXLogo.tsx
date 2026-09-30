import React from 'react';

interface StrydeXLogoProps {
  variant?: 'full' | 'horizontal' | 'icon' | 'badge';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
  animated?: boolean;
}

export const StrydeXLogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-visible ${className}`}
      aria-label="StrydeX Cricket Logo Emblem"
    >
      <defs>
        {/* Electric-lime to neon green primary athletic gradient */}
        <linearGradient id="strydexGreenGrad" x1="20" y1="20" x2="220" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4F973" />
          <stop offset="35%" stopColor="#BEF264" />
          <stop offset="70%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>

        <linearGradient id="batGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#D4F973" />
          <stop offset="100%" stopColor="#BEF264" />
        </linearGradient>
      </defs>

      {/* Outer Stylized "S" Emblem - Top Arch & Curve */}
      <path
        d="M 148 24 
           L 54 24 
           C 34 24 20 40 22 62 
           C 24 82 40 98 62 104 
           L 128 120 
           C 142 124 150 134 148 148 
           C 146 162 134 172 118 172 
           L 44 172 
           L 32 196 
           L 122 196 
           C 152 196 174 174 176 144 
           C 178 120 162 102 138 94 
           L 76 78 
           C 62 74 54 66 56 54 
           C 58 42 70 34 84 34 
           L 142 34 
           Z"
        fill="url(#strydexGreenGrad)"
      />

      {/* Aerodynamic Sharp Bevel Wings of the "S" */}
      <path
        d="M 60 24 L 176 24 L 160 52 L 96 52 Z"
        fill="#BEF264"
      />
      <path
        d="M 22 62 C 22 56 24 50 28 44 L 64 24 L 54 62 Z"
        fill="#A3E635"
      />
      <path
        d="M 44 172 L 118 172 C 144 172 166 156 172 132 L 152 178 L 32 196 Z"
        fill="#22C55E"
      />
      <path
        d="M 122 196 L 204 196 L 152 216 L 82 216 Z"
        fill="url(#strydexGreenGrad)"
      />

      {/* Batsman Silhouette inside the Upper Arch of the "S" */}
      <g id="batsmanAction">
        {/* Batsman Helmet & Grille */}
        <circle cx="104" cy="54" r="16" fill="#0A0A0A" stroke="#BEF264" strokeWidth="2.5" />
        {/* Helmet Peak & Visor Grille */}
        <path d="M 104 46 Q 120 48 124 56 L 114 62 Z" fill="#0A0A0A" />
        <path d="M 112 56 L 122 58 M 112 60 L 120 62" stroke="#BEF264" strokeWidth="1.5" strokeLinecap="round" />

        {/* Torso & Batting Jersey in Athletic Cover Drive / Pull Motion */}
        <path
          d="M 94 70 
             L 106 66 
             L 126 72 
             L 138 92 
             L 128 106 
             L 102 100 
             L 90 84 
             Z"
          fill="#080808"
          stroke="#BEF264"
          strokeWidth="1.5"
        />

        {/* Batting Shoulder & Arm Extension */}
        {/* Back Arm */}
        <path
          d="M 124 72 L 152 54 L 160 62 L 134 82 Z"
          fill="#0A0A0A"
          stroke="#BEF264"
          strokeWidth="1"
        />
        {/* Front Lead Arm */}
        <path
          d="M 106 70 L 140 44 L 148 52 L 116 80 Z"
          fill="#080808"
          stroke="#BEF264"
          strokeWidth="1.5"
        />

        {/* Batting Gloves (White/Lime highlights) */}
        <circle cx="144" cy="46" r="5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
        <circle cx="154" cy="56" r="5" fill="#BEF264" stroke="#000000" strokeWidth="1" />

        {/* The Cricket Bat Blade - Dynamic Raised Power Swing */}
        <g transform="rotate(-38 150 48)">
          {/* Bat Handle */}
          <rect x="146" y="24" width="6" height="26" rx="3" fill="#E2E8F0" stroke="#0A0A0A" strokeWidth="1" />
          <line x1="146" y1="32" x2="152" y2="32" stroke="#BEF264" strokeWidth="1" />
          <line x1="146" y1="38" x2="152" y2="38" stroke="#BEF264" strokeWidth="1" />
          {/* Bat Shoulder / Spine */}
          <path
            d="M 144 50 
               L 154 50 
               L 156 122 
               L 142 122 
               Z"
            fill="url(#batGrad)"
            stroke="#0A0A0A"
            strokeWidth="1.5"
          />
          {/* Bat Spine Highlight */}
          <line x1="149" y1="52" x2="149" y2="120" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
        </g>
      </g>

      {/* Dynamic Sweeping Motion Trail from Bat to Cricket Ball */}
      <path
        d="M 88 126 
           Q 130 114 170 88 
           Q 192 74 206 58"
        fill="none"
        stroke="#BEF264"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 94 126 
           Q 134 116 172 90 
           Q 192 76 204 60"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* The Seamed Cricket Ball in Flight */}
      <g transform="translate(204, 56)">
        {/* Ball Body */}
        <circle cx="0" cy="0" r="14" fill="#D4F973" stroke="#16A34A" strokeWidth="1.5" />
        {/* Cricket Ball Curved Seam Stitches */}
        <path
          d="M -9 -9 Q 0 0 9 9"
          fill="none"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M -7 -11 L -5 -7 M -3 -7 L -1 -3 M 1 -3 L 3 1 M 5 1 L 7 5 M 9 5 L 11 9"
          stroke="#0A0A0A"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Shine highlight */}
        <circle cx="-4" cy="-4" r="3" fill="#FFFFFF" fillOpacity="0.7" />
      </g>
    </svg>
  );
};

export const StrydeXLogo: React.FC<StrydeXLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showTagline = true,
  animated = false
}) => {
  // Dimensions map
  const iconSizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 52,
    xl: 68
  };

  const currentIconSize = iconSizes[size];

  // Variant: Just the emblem icon
  if (variant === 'icon') {
    return <StrydeXLogoIcon size={currentIconSize} className={className} />;
  }

  // Variant: Badge layout (Icon centered on dark container)
  if (variant === 'badge') {
    return (
      <div className={`inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-[#09090C] border border-white/10 ${className}`}>
        <StrydeXLogoIcon size={currentIconSize} />
        <div className="mt-2 text-center">
          <div className="flex items-center justify-center tracking-tight font-black">
            <span className="text-white italic text-lg tracking-tighter">Stryde</span>
            <span className="text-[#BEF264] italic text-lg font-black ml-0.5">X</span>
          </div>
          {showTagline && (
            <p className="text-[9px] uppercase font-mono tracking-widest text-neutral-400 mt-0.5">
              Train Smarter. Play Better.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Variant: Full stacked (Emblem on top, Wordmark in middle, Tagline below)
  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center text-center group select-none ${className}`}>
        <div className="relative mb-2">
          <StrydeXLogoIcon size={currentIconSize * 1.5} className="transition-transform group-hover:scale-105 duration-300" />
        </div>
        <div className="flex items-center tracking-tight leading-none">
          <span className="text-white font-black italic tracking-tightest text-2xl sm:text-3xl font-display">
            Stryde
          </span>
          <span className="text-[#BEF264] font-black italic tracking-tightest text-2xl sm:text-3xl ml-0.5 font-display">
            X
          </span>
        </div>
        {showTagline && (
          <p className="text-[10px] sm:text-xs text-neutral-300 font-sans tracking-wider mt-1.5 font-medium opacity-90">
            Train Smarter. Play Better.
          </p>
        )}
      </div>
    );
  }

  // Variant: Horizontal (Emblem + Wordmark + Optional Tagline)
  return (
    <div className={`inline-flex items-center gap-2.5 group select-none text-left ${className}`}>
      <div className="relative flex items-center justify-center">
        <StrydeXLogoIcon size={currentIconSize} className="transition-transform group-hover:scale-105 duration-300" />
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-baseline tracking-tight leading-none">
          <span className={`font-black italic tracking-tightest text-white font-display ${
            size === 'xs' ? 'text-sm' : size === 'sm' ? 'text-base' : size === 'md' ? 'text-xl' : size === 'lg' ? 'text-2xl' : 'text-3xl'
          }`}>
            Stryde
          </span>
          <span className={`font-black italic tracking-tightest text-[#BEF264] ml-0.5 font-display ${
            size === 'xs' ? 'text-sm' : size === 'sm' ? 'text-base' : size === 'md' ? 'text-xl' : size === 'lg' ? 'text-2xl' : 'text-3xl'
          }`}>
            X
          </span>
        </div>

        {showTagline && (size === 'md' || size === 'lg' || size === 'xl') && (
          <span className="text-[9px] text-neutral-400 font-sans font-medium tracking-wide mt-0.5 whitespace-nowrap block">
            Train Smarter. Play Better.
          </span>
        )}
      </div>
    </div>
  );
};
