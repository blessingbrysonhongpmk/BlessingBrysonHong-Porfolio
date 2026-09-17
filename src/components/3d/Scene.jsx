import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { NeuralDataMatrix } from './NeuralDataMatrix';
import './Scene.css';

/**
 * WebGLContextHandler — Listens to WebGL context loss events and triggers auto-recovery.
 */
function WebGLContextHandler() {
  useEffect(() => {
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('WebGL context lost — triggering automatic recovery...');
    };

    const handleContextRestored = () => {
      console.info('WebGL context successfully restored.');
    };

    window.addEventListener('webglcontextlost', handleContextLost, false);
    window.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  return null;
}

/**
 * Scene — Ambient, non-intrusive 3D background canvas.
 * Perfectly calibrated for editorial portfolios: stays in background, zero text collision.
 */
export function Scene() {
  const { tier, webgl, pixelRatio } = useDeviceCapability();

  if (!webgl) {
    return null;
  }

  const particleCount = tier === 'high' ? 60 : tier === 'medium' ? 36 : 18;

  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={Math.min(pixelRatio, tier === 'low' ? 1 : 1.5)}
        gl={{
          antialias: tier !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <WebGLContextHandler />
        <Suspense fallback={null}>
          <NeuralDataMatrix particleCount={particleCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}
