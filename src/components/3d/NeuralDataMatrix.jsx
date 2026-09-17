import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * NeuralDataMatrix — Award-Winning 3D Generative Matrix.
 * Creates an intelligent synaptic lattice with wave harmonics,
 * pointer responsiveness, and glowing pulse nodes.
 */
export function NeuralDataMatrix({ particleCount = 180 }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const groupRef = useRef();

  // Generate random 3D points bounded in an elegant volume
  const { positions, originalPositions, colors, linesGeometry, phases } = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    const origCoords = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const phaseArray = new Float32Array(particleCount);

    const colorCrimson = new THREE.Color('#E11D48');
    const colorSlate = new THREE.Color('#94A3B8');
    const colorWhite = new THREE.Color('#E2E8F0');

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8 - 1.5;

      coords[i * 3] = x;
      coords[i * 3 + 1] = y;
      coords[i * 3 + 2] = z;

      origCoords[i * 3] = x;
      origCoords[i * 3 + 1] = y;
      origCoords[i * 3 + 2] = z;

      phaseArray[i] = Math.random() * Math.PI * 2;

      // Color distribution: 80% soft neutral slate/white, 20% crimson accent
      const rand = Math.random();
      let chosenColor;
      if (rand < 0.20) {
        chosenColor = colorCrimson;
      } else if (rand < 0.70) {
        chosenColor = colorSlate;
      } else {
        chosenColor = colorWhite;
      }

      colorArray[i * 3] = chosenColor.r;
      colorArray[i * 3 + 1] = chosenColor.g;
      colorArray[i * 3 + 2] = chosenColor.b;
    }

    // Connect only very close nodes with subtle lines
    const lineIndices = [];
    const maxDistance = 1.6;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = coords[i * 3] - coords[j * 3];
        const dy = coords[i * 3 + 1] - coords[j * 3 + 1];
        const dz = coords[i * 3 + 2] - coords[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          lineIndices.push(coords[i * 3], coords[i * 3 + 1], coords[i * 3 + 2]);
          lineIndices.push(coords[j * 3], coords[j * 3 + 1], coords[j * 3 + 2]);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineIndices, 3));

    return {
      positions: coords,
      originalPositions: origCoords,
      colors: colorArray,
      linesGeometry: lineGeo,
      phases: phaseArray,
    };
  }, [particleCount]);

  // Gentle wave harmonics & fluid mouse parallax
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouse = state.pointer;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.015 + mouse.x * 0.08, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(t * 0.02) * 0.03 - mouse.y * 0.05, 0.04);
    }

    if (pointsRef.current) {
      const positionAttr = pointsRef.current.geometry.attributes.position;
      const arr = positionAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const phase = phases[i];
        arr[idx + 1] = originalPositions[idx + 1] + Math.sin(t * 0.6 + phase) * 0.12;
        arr[idx] = originalPositions[idx] + Math.cos(t * 0.5 + phase) * 0.08;
      }
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Subtle Node Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Subtle Hairline Connections */}
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial
          color="#94A3B8"
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
