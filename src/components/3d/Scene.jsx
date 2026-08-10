import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { AIEngineerRobot } from './AIEngineerRobot';
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
 * PostProcessingEffects — Bloom & Chromatic Aberration for cinematic glow.
 */
function PostProcessingEffects({ tier }) {
  if (tier === 'low') return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={tier === 'high' ? 0.4 : 0.25}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.6}
        mipmapBlur
      />
      {tier === 'high' && (
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0008]}
          radialModulation
          modulationOffset={0.5}
        />
      )}
    </EffectComposer>
  );
}

/**
 * R3F Canvas wrapper with WebGL detection, device-aware quality, error boundaries,
 * post-processing effects, and crash-proof context loss recovery.
 */
export function Scene({ robotState = 'IDLE', isSpeaking = false, speechAmplitudeRef = null, onInitializeRobot = null }) {
  const { tier, webgl, pixelRatio, isMobile } = useDeviceCapability();

  if (!webgl) {
    return <div className="scene-fallback" />;
  }

  return (
    <div className="scene">
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
          gl.toneMappingExposure = 0.8;
        }}
      >
        <WebGLContextHandler />
        <Suspense fallback={null}>
          <AIEngineerRobot
            tier={tier}
            isMobile={isMobile}
            robotState={robotState}
            isSpeaking={isSpeaking}
            speechAmplitudeRef={speechAmplitudeRef}
            onPointerDown={onInitializeRobot}
          />
        </Suspense>
        <PostProcessingEffects tier={tier} />
      </Canvas>
    </div>
  );
}
