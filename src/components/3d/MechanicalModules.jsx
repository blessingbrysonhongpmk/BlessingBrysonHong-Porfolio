import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * LAYER 02 — MECHANICAL MODULES
 * Rotating computational blocks, sensor plates, and differential gear modules.
 */
export function MechanicalModules({ isAnalysisMode = false }) {
  const moduleGroupRef = useRef();
  const discRef = useRef();

  useFrame((_, delta) => {
    const speed = isAnalysisMode ? 3.0 : 1.0;

    if (moduleGroupRef.current) {
      moduleGroupRef.current.rotation.y += delta * 0.12 * speed;
    }

    if (discRef.current) {
      discRef.current.rotation.z -= delta * 0.18 * speed;
    }
  });

  return (
    <group ref={moduleGroupRef}>
      {/* Rotating Computational Block 01 */}
      <mesh position={[1.4, 0.8, -0.4]}>
        <boxGeometry args={[0.35, 0.2, 0.35]} />
        <meshStandardMaterial
          color="#0F172A"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Rotating Computational Block 02 */}
      <mesh position={[-1.4, -0.8, 0.4]}>
        <boxGeometry args={[0.35, 0.2, 0.35]} />
        <meshStandardMaterial
          color="#0F172A"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Mechanical Data Disc Plate */}
      <group ref={discRef} position={[0, 0, 0.8]}>
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.04, 32]} />
          <meshStandardMaterial
            color="#1E293B"
            wireframe
            transparent
            opacity={0.6}
            metalness={0.9}
          />
        </mesh>
      </group>
    </group>
  );
}
