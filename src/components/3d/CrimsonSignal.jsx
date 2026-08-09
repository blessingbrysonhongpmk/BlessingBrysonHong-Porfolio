import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * CRIMSON SIGNAL —
 * Traveling crimson energy/data point moving slowly from outer structure -> inner mechanism -> central core.
 */
export function CrimsonSignal({ isAnalysisMode = false }) {
  const signalRef = useRef();
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (!signalRef.current) return;

    const speed = isAnalysisMode ? 3.5 : 1.2;
    progressRef.current += delta * speed;
    const t = progressRef.current;

    const radius = 2.2 - (Math.sin(t * 0.5) * 0.5 + 0.5) * 1.5; // spiral inward
    signalRef.current.position.x = radius * Math.cos(t * 2);
    signalRef.current.position.y = radius * Math.sin(t * 2);
    signalRef.current.position.z = Math.sin(t * 4) * 0.6;
  });

  return (
    <mesh ref={signalRef} position={[2.2, 0, 0]}>
      <sphereGeometry args={[0.075, 16, 16]} />
      <meshBasicMaterial color="#DC143C" />
    </mesh>
  );
}
