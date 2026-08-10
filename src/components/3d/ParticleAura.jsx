import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * PARTICLE AURA — Advanced spiral particle system with mouse reactivity.
 * Creates a dynamic, breathing constellation of particles that orbit
 * the robot in spiral patterns, react to cursor movement, and pulse with energy.
 */
export function ParticleAura({ tier = 'high', isMobile = false, analysisMode = false }) {
  const pointsRef = useRef();
  const timeRef = useRef(0);

  const nodeCount = tier === 'high' ? 600 : tier === 'medium' ? 300 : 120;

  const { positions, colors, initialData } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);
    const data = [];

    const crimson = new THREE.Color('#DC143C');
    const hotPink = new THREE.Color('#FF2D55');
    const cyan = new THREE.Color('#00F0FF');
    const blue = new THREE.Color('#3B82F6');
    const white = new THREE.Color('#F0F4FF');

    const palette = [crimson, hotPink, cyan, blue, white];

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;

      // Spiral distribution with multiple arms
      const arm = i % 4;
      const t = (i / nodeCount) * Math.PI * 6;
      const spiralRadius = 1.6 + (i / nodeCount) * 1.8;
      const armOffset = (arm / 4) * Math.PI * 2;
      const verticalSpread = (Math.random() - 0.5) * 2.4;

      const baseX = spiralRadius * Math.cos(t + armOffset);
      const baseY = verticalSpread;
      const baseZ = spiralRadius * Math.sin(t + armOffset);

      pos[i3] = baseX;
      pos[i3 + 1] = baseY;
      pos[i3 + 2] = baseZ;

      data.push({
        baseX, baseY, baseZ,
        spiralRadius,
        angle: t + armOffset,
        speed: 0.15 + Math.random() * 0.25,
        bobSpeed: 1.5 + Math.random() * 2,
        bobAmplitude: 0.05 + Math.random() * 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
      });

      const color = palette[i % palette.length].clone();
      // Vary brightness
      const brightness = 0.6 + Math.random() * 0.4;
      color.multiplyScalar(brightness);

      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, colors: col, initialData: data };
  }, [nodeCount]);

  // Node data for animation
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;
    const time = timeRef.current;

    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;

    const speedMult = analysisMode ? 3.0 : 1.0;

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const d = initialData[i];

      // Orbit around center
      const currentAngle = d.angle + time * d.speed * speedMult;
      const bobY = Math.sin(time * d.bobSpeed + d.pulsePhase) * d.bobAmplitude;

      // Breathing radius
      const breathe = 1.0 + Math.sin(time * 0.5 + d.pulsePhase) * 0.08;
      const r = d.spiralRadius * breathe;

      posAttr.array[i3] = r * Math.cos(currentAngle);
      posAttr.array[i3 + 1] = d.baseY + bobY;
      posAttr.array[i3 + 2] = r * Math.sin(currentAngle);
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
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
        size={isMobile ? 0.055 : 0.045}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
