import React, { useEffect, useState, useRef } from 'react';

/**
 * Pixelated Retro-Athletic Cursor
 * Renders an authentic 8-bit pixel arrow / pointer that responds to clicks and hover states.
 * Replaces default OS cursor on desktops with an instantaneous, crisp pixel-art pointer.
 */
export const InteractiveCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only activate on mouse/fine pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add('custom-pixel-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, .group, [tabindex="0"]')
        );
        setHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-pixel-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[999999] transition-opacity duration-150 will-change-transform ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        imageRendering: 'pixelated',
      }}
    >
      {hovered ? (
        /* Pixelated Pointer Hand (8-bit style) */
        <div
          className={`relative -top-1 -left-2 transition-transform duration-75 ${
            clicked ? 'scale-90 translate-y-0.5' : 'scale-100'
          }`}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ shapeRendering: 'crispEdges' }}
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            {/* Black Pixel Border Outline */}
            <path
              d="
                M 6 2 H 10 V 10 H 12 V 6 H 14 V 10 H 16 V 8 H 18 V 14 H 16 V 16 H 14 V 20 H 6 V 16 H 4 V 12 H 2 V 8 H 6 V 2 Z
              "
              fill="#000000"
            />
            {/* White Body Fill */}
            <path
              d="
                M 7 3 H 9 V 11 H 11 V 7 H 13 V 11 H 15 V 9 H 17 V 13 H 15 V 15 H 13 V 19 H 7 V 15 H 5 V 11 H 3 V 9 H 5 V 7 H 7 V 3 Z
              "
              fill="#FFFFFF"
            />
            {/* StrydeX Lime Accent Tip on Pointer Finger */}
            <rect x="7" y="3" width="2" height="3" fill="#BEF264" />
            <rect x="7" y="6" width="2" height="1" fill="#A3E635" />
            {/* Subtle palm shadow pixel */}
            <rect x="7" y="14" width="6" height="4" fill="#E2E8F0" />
          </svg>
        </div>
      ) : (
        /* Classic Pixelated Arrow (8-bit style) */
        <div
          className={`relative -top-0.5 -left-0.5 transition-transform duration-75 ${
            clicked ? 'scale-95 translate-x-0.5 translate-y-0.5' : 'scale-100'
          }`}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ shapeRendering: 'crispEdges' }}
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            {/* Black Outer Pixel Border */}
            <path
              d="
                M 1 1 H 3 V 3 H 5 V 5 H 7 V 7 H 9 V 9 H 11 V 11 H 13 V 13 H 15 V 15 H 9 V 17 H 11 V 19 H 13 V 21 H 11 V 23 H 9 V 21 H 7 V 19 H 5 V 17 H 3 V 15 H 1 V 1 Z
                M 1 1 V 17 H 3 V 19 H 5 V 21 H 7 V 17 H 9 V 15 H 17 V 13 H 15 V 11 H 13 V 9 H 11 V 7 H 9 V 5 H 7 V 3 H 5 V 1 H 1 Z
              "
              fill="#000000"
            />
            {/* Crisp Pure Fill */}
            <path
              d="
                M 2 2 H 4 V 4 H 6 V 6 H 8 V 8 H 10 V 10 H 12 V 12 H 14 V 14 H 8 V 16 H 6 V 18 H 4 V 16 H 2 V 2 Z
              "
              fill="#FFFFFF"
            />
            {/* StrydeX Electric Lime Pixel Core & Bevel */}
            <rect x="2" y="2" width="2" height="2" fill="#BEF264" />
            <rect x="4" y="4" width="2" height="2" fill="#BEF264" />
            <rect x="6" y="6" width="2" height="2" fill="#BEF264" />
            <rect x="8" y="8" width="2" height="2" fill="#BEF264" />
            <rect x="10" y="10" width="2" height="2" fill="#BEF264" />
            {/* Pixel Highlight on tail */}
            <rect x="4" y="12" width="2" height="3" fill="#E2E8F0" />
            <rect x="6" y="14" width="2" height="2" fill="#CBD5E1" />
          </svg>
        </div>
      )}
    </div>
  );
};
