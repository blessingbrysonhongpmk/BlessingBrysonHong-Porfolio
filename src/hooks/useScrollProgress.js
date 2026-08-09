import { useState, useEffect } from 'react';

/**
 * Returns normalised scroll progress (0 → 1) for the entire page.
 * Used to scale interaction intensity as the visitor explores.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
