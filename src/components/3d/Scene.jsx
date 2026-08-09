import { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { IntelligenceCore } from './IntelligenceCore';
import './Scene.css';

/**
 * R3F Canvas wrapper with WebGL detection, device-aware quality, and fallback.
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
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <IntelligenceCore tier={tier} isMobile={isMobile} />
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
    console.warn('3D rendering failed, showing fallback:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}
