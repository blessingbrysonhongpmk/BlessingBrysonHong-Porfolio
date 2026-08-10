import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ENERGY TENDRILS — Animated lightning/energy arc lines
 * connecting the raised palm to the floating Neural Nexus core.
 * Creates a dynamic "force" connection visual.
 */
export function EnergyTendrils({ start = [0, 0, 0], end = [0, 1, 0], count = 5, color = '#DC143C', analysisMode = false }) {
  const groupRef = useRef();
  const timeRef = useRef(0);

  const tendrilData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      offset: (i / count) * Math.PI * 2,
      amplitude: 0.04 + Math.random() * 0.06,
      frequency: 2 + Math.random() * 3,
      speed: 3 + Math.random() * 4,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  // Pre-allocate curve points per tendril
  const segmentCount = 24;
  const curves = useMemo(() => {
    return tendrilData.map(() => {
      const points = new Float32Array((segmentCount + 1) * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
      return { geometry, points };
    });
  }, [tendrilData, segmentCount]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;

    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const direction = endVec.clone().sub(startVec);
    const length = direction.length();
    direction.normalize();

    // Perpendicular vectors for displacement
    const up = new THREE.Vector3(0, 1, 0);
    const perp1 = new THREE.Vector3().crossVectors(direction, up).normalize();
    const perp2 = new THREE.Vector3().crossVectors(direction, perp1).normalize();

    curves.forEach(({ geometry, points }, tendrilIdx) => {
      const td = tendrilData[tendrilIdx];
      const speed = analysisMode ? td.speed * 2.5 : td.speed;

      for (let j = 0; j <= segmentCount; j++) {
        const t = j / segmentCount;
        const j3 = j * 3;

        // Base position along the line
        const baseX = startVec.x + direction.x * length * t;
        const baseY = startVec.y + direction.y * length * t;
        const baseZ = startVec.z + direction.z * length * t;

        // Envelope: tendrils are thickest in the middle
        const envelope = Math.sin(t * Math.PI) * td.amplitude;

        // Noise displacement
        const n1 = Math.sin(t * td.frequency * Math.PI + time * speed + td.phase) * envelope;
        const n2 = Math.cos(t * td.frequency * Math.PI * 1.3 + time * speed * 0.7 + td.offset) * envelope;

        points[j3] = baseX + perp1.x * n1 + perp2.x * n2;
        points[j3 + 1] = baseY + perp1.y * n1 + perp2.y * n2;
        points[j3 + 2] = baseZ + perp1.z * n1 + perp2.z * n2;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeBoundingSphere();
    });
  });

  return (
    <group ref={groupRef}>
      {curves.map(({ geometry }, i) => (
        <line key={i} geometry={geometry}>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={analysisMode ? 0.9 : 0.55 + (i / count) * 0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  );
}
