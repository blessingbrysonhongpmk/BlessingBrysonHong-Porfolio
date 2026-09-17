import { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on touch devices or fine pointer absence
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;

      // Project card / stage hover
      const projectCard = target.closest('.showcase-card, .stage-frame');
      if (projectCard) {
        setIsHovered(true);
        setCursorText('VIEW');
        return;
      }

      // Copy button
      const copyBtn = target.closest('.copy-trigger-btn');
      if (copyBtn) {
        setIsHovered(true);
        setCursorText('COPY');
        return;
      }

      // General interactive elements
      const isInteractive = target.closest('a, button, [role="button"], [role="tab"], input, textarea, .skill-interactive-node');
      if (isInteractive) {
        setIsHovered(true);
        setCursorText('');
        return;
      }

      setIsHovered(false);
      setCursorText('');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Smooth lerp loop for the cursor ring
    let animationFrameId;
    const render = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Center sharp dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovered ? 'cursor-dot--hovered' : ''}`}
        aria-hidden="true"
      />

      {/* Smooth trailing outline ring with contextual text */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovered ? 'cursor-ring--hovered' : ''} ${cursorText ? 'cursor-ring--has-text' : ''}`}
        aria-hidden="true"
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </>
  );
}
