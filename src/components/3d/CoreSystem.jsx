import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * LAYER 03 & 05 — CENTRAL INTELLIGENCE CORE SYSTEM
 * Multi-layer geometric computational core with smoked dark glass and crimson emissive nucleus.
 */
export function CoreSystem({ isAnalysisMode = false }) {
  const coreRef = useRef();
  const glassRef = useRef();

  useFrame((_, delta) => {
    const speed = isAnalysisMode ? 3.5 : 1.0;

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.25 * speed;
      coreRef.current.rotation.z += delta * 0.2 * speed;
    }

    if (glassRef.current) {
      glassRef.current.rotation.y -= delta * 0.15 * speed;
    }
  });

  return (
    <group>
      {/* Central Computational Nucleus (Emissive Crimson) */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#DC143C"
          emissive="#DC143C"
          emissiveIntensity={isAnalysisMode ? 2.5 : 1.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Smoked Dark Glass Panel Shell */}
      <mesh ref={glassRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshPhysicalMaterial
          color="#0F172A"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.8}
          transmission={0.4}
          thickness={0.5}
        />
      </mesh>

      {/* Inner Structural Wireframe Cage */}
      <mesh>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#DC143C"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}
