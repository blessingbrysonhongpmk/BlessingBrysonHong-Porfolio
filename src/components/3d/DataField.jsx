import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * LAYER 04 — DATA FIELD
 * Ambient data node constellation surrounding the machine.
 */
export function DataField({ tier = 'high', isMobile = false }) {
  const nodeCount = tier === 'high' ? 420 : tier === 'medium' ? 220 : 100;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);

    const crimson = new THREE.Color('#DC143C');
    const slate = new THREE.Color('#CBD5E1');
    const white = new THREE.Color('#FFFFFF');

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const band = i % 3;
      const radius = 2.0 + band * 0.7 + (Math.random() * 0.4 - 0.2);

      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const color = band === 0 ? crimson : band === 1 ? slate : white;
      color.multiplyScalar(band === 2 ? 0.8 : 0.95);

      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, [nodeCount]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={nodeCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={nodeCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.05 : 0.045}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
