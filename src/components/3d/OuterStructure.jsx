import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * LAYER 01 — OUTER STRUCTURE
 * 3-4 asymmetric, irregular engineered structural rings with metallic joints and precision seams.
 */
export function OuterStructure({ isAnalysisMode = false }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((_, delta) => {
    const speed = isAnalysisMode ? 2.5 : 1.0;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.08 * speed;
      ring1Ref.current.rotation.x = Math.sin(ring1Ref.current.rotation.z * 0.5) * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.06 * speed;
      ring2Ref.current.rotation.y = Math.cos(ring2Ref.current.rotation.z * 0.5) * 0.2;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.05 * speed;
      ring3Ref.current.rotation.z += delta * 0.04 * speed;
    }
  });

  return (
    <group>
      {/* Structural Ring 01 — Primary Crimson Segment Ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.2, 0.035, 16, 64, Math.PI * 1.6]} />
          <meshStandardMaterial
            color="#DC143C"
            metalness={0.9}
            roughness={0.2}
            emissive="#DC143C"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Precision Metallic Joints */}
        <mesh position={[2.2, 0, 0]}>
          <boxGeometry args={[0.12, 0.12, 0.18]} />
          <meshStandardMaterial color="#334155" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[-2.2, 0, 0]}>
          <boxGeometry args={[0.12, 0.12, 0.18]} />
          <meshStandardMaterial color="#334155" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Structural Ring 02 — Secondary Graphite Engineered Ring */}
      <group ref={ring2Ref} rotation={[0.4, 0.3, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.028, 16, 64, Math.PI * 1.75]} />
          <meshStandardMaterial
            color="#1E293B"
            metalness={0.95}
            roughness={0.3}
          />
        </mesh>
        {/* Mechanical Connectors */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Structural Ring 03 — Outer Protective Lattice Ring */}
      <group ref={ring3Ref} rotation={[-0.5, -0.2, 0.6]}>
        <mesh>
          <torusGeometry args={[2.8, 0.02, 16, 64, Math.PI * 1.8]} />
          <meshStandardMaterial
            color="#64748B"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
    </group>
  );
}
