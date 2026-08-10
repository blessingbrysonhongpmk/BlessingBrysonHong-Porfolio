import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * HOLOGRAPHIC RINGS — Orbiting emissive rings around the robot.
 * Creates multiple thin torus rings at different tilts, speeds, and colors
 * that orbit and pulse with energy.
 */
export function HolographicRings({ analysisMode = false, tier = 'high' }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const ring4Ref = useRef();
  const ring5Ref = useRef();
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;
    const speed = analysisMode ? 2.8 : 1.0;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.12 * speed;
      ring1Ref.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.09 * speed;
      ring2Ref.current.rotation.y = Math.cos(time * 0.25) * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.07 * speed;
      ring3Ref.current.rotation.z += delta * 0.05 * speed;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.y += delta * 0.14 * speed;
      ring4Ref.current.rotation.x = Math.sin(time * 0.4) * 0.08;
    }
    if (ring5Ref.current) {
      ring5Ref.current.rotation.z -= delta * 0.06 * speed;
      ring5Ref.current.rotation.y += delta * 0.03 * speed;
    }
  });

  return (
    <group>
      {/* Ring 1 — Inner Crimson Power Ring */}
      <group ref={ring1Ref} rotation={[0.5, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[1.6, 0.012, 8, 128, Math.PI * 1.7]} />
          <meshStandardMaterial
            color="#DC143C"
            emissive="#DC143C"
            emissiveIntensity={analysisMode ? 2.0 : 0.8}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Ring joint node */}
        <mesh position={[1.6, 0, 0]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#DC143C" />
        </mesh>
      </group>

      {/* Ring 2 — Mid Blue Data Ring */}
      <group ref={ring2Ref} rotation={[-0.3, 0.6, 0.4]}>
        <mesh>
          <torusGeometry args={[2.0, 0.008, 8, 128, Math.PI * 1.85]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={analysisMode ? 1.5 : 0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[-2.0, 0, 0]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#3B82F6" />
        </mesh>
      </group>

      {/* Ring 3 — Outer Cyan Signal Ring */}
      <group ref={ring3Ref} rotation={[0.7, -0.4, -0.2]}>
        <mesh>
          <torusGeometry args={[2.4, 0.006, 8, 128, Math.PI * 1.5]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={analysisMode ? 1.2 : 0.4}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      {/* Ring 4 — Tight Hot Pink Inner Ring */}
      <group ref={ring4Ref} rotation={[-0.6, -0.3, 0.8]}>
        <mesh>
          <torusGeometry args={[1.2, 0.015, 8, 96, Math.PI * 1.4]} />
          <meshStandardMaterial
            color="#FF2D55"
            emissive="#FF2D55"
            emissiveIntensity={analysisMode ? 1.8 : 0.6}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshBasicMaterial color="#FF2D55" />
        </mesh>
      </group>

      {/* Ring 5 — Outermost Ghostly White Ring (high tier only) */}
      {tier === 'high' && (
        <group ref={ring5Ref} rotation={[0.4, 0.7, -0.5]}>
          <mesh>
            <torusGeometry args={[2.8, 0.004, 8, 128, Math.PI * 1.9]} />
            <meshStandardMaterial
              color="#E2E8F0"
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
