import { useState, useEffect } from 'react';

/**
 * Detects device capabilities to adjust 3D quality and animation intensity.
 * Returns a tier: 'high' | 'medium' | 'low' and whether WebGL is available.
 */
export function useDeviceCapability() {
  const [capability, setCapability] = useState({
    tier: 'high',
    webgl: true,
    isMobile: false,
    pixelRatio: 1,
  });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    // Check WebGL support
    let webgl = false;
    try {
      const canvas = document.createElement('canvas');
      webgl = !!(
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      );
    } catch {
      webgl = false;
    }

    // Determine tier
    let tier = 'high';
    const memory = navigator.deviceMemory; // GB, if available
    const cores = navigator.hardwareConcurrency;
    const connection = navigator.connection;
    const saveData = connection?.saveData;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    if (!webgl || saveData) {
      tier = 'low';
    } else if (isMobile) {
      tier = (memory && memory <= 4) || (cores && cores <= 4) ? 'low' : 'medium';
    } else {
      tier = (memory && memory <= 4) ? 'medium' : 'high';
    }

    setCapability({ tier, webgl, isMobile, pixelRatio });
  }, []);

  return capability;
}
