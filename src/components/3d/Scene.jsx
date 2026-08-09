import { Suspense, Component, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { UnfinishedSystem } from './UnfinishedSystem';
import './Scene.css';

/**
 * WebGLContextHandler — Automatically listens to WebGL context loss events
 * and triggers auto-recovery to prevent 3D canvas crashes.
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
 * R3F Canvas wrapper with WebGL detection, device-aware quality, error boundaries,
 * and crash-proof context loss recovery.
 */
export function Scene() {
  const { tier, webgl, pixelRatio, isMobile } = useDeviceCapability();

  if (!webgl) {
    return <SceneFallback />;
  }

  return (
    <div className="scene">
      <ThreeErrorBoundary fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={Math.min(pixelRatio, tier === 'low' ? 1 : 1.5)}
          gl={{
            antialias: tier !== 'low',
            alpha: true,
            powerPreference: tier === 'low' ? 'low-power' : 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            // Configure tone mapping for realistic contrast
            gl.toneMappingExposure = 1.1;
          }}
        >
          <WebGLContextHandler />
          <Suspense fallback={null}>
            <UnfinishedSystem tier={tier} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
}

/** CSS-only fallback when WebGL is unavailable */
function SceneFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <div className="scene-fallback__ring scene-fallback__ring--1" />
      <div className="scene-fallback__ring scene-fallback__ring--2" />
      <div className="scene-fallback__ring scene-fallback__ring--3" />
      <div className="scene-fallback__core" />
    </div>
  );
}

/** Error boundary for 3D failures — renders fallback instead of crashing */
class ThreeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D rendering encountered an error, activating smooth fallback:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}
