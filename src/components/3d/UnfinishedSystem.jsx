import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * "THE UNFINISHED SYSTEM" —
 * A bespoke, high-visibility 3D geometric structure occupying the right Hero area:
 * DATA → STRUCTURE → INTELLIGENCE
 */
export function UnfinishedSystem({ tier = 'high', isMobile = false }) {
  const groupRef = useRef();
  const innerFrameRef = useRef();
  const outerFrameRef = useRef();
  const signalRef = useRef();
  const pointsRef = useRef();

  const scrollProgress = useScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });
  const timeRef = useRef(0);
  const signalProgressRef = useRef(0);
  const [signalActive, setSignalActive] = useState(false);

  // Particle constellation node count based on device tier
  const nodeCount = tier === 'high' ? 400 : tier === 'medium' ? 220 : 100;

  // Generate node positions and color attributes
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);

    const crimson = new THREE.Color('#DC143C');
    const slate = new THREE.Color('#CBD5E1');
    const white = new THREE.Color('#FFFFFF');

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const band = i % 3;
      const radius = 1.8 + band * 0.6 + (Math.random() * 0.4 - 0.2);

      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      const color = band === 0 ? crimson : band === 1 ? slate : white;
      color.multiplyScalar(band === 2 ? 0.8 : 0.95);

      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, [nodeCount]);

  // Construct structural wireframe line segments
  const lineGeometry = useMemo(() => {
    const points = [];
    const radius = 2.0;
    const count = 18;

    for (let i = 0; i < count; i++) {
      const theta1 = (i / count) * Math.PI * 2;
      const theta2 = ((i + 1) / count) * Math.PI * 2;

      // Incomplete arcs & structural cross-connectors
      points.push(
        new THREE.Vector3(radius * Math.cos(theta1), radius * Math.sin(theta1), 0),
        new THREE.Vector3(radius * Math.cos(theta2), radius * Math.sin(theta2), 0)
      );

      if (i % 3 === 0) {
        points.push(
          new THREE.Vector3(radius * Math.cos(theta1), radius * Math.sin(theta1), 0),
          new THREE.Vector3(0, 0, (i % 2 === 0 ? 1.2 : -1.2))
        );
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta;
    const time = timeRef.current;

    // Smooth lerped mouse parallax with spring physics
    if (!isMobile) {
      const pointer = state.pointer;
      mouseRef.current.targetX = pointer.x;
      mouseRef.current.targetY = pointer.y;

      const dx = mouseRef.current.targetX - mouseRef.current.x;
      const dy = mouseRef.current.targetY - mouseRef.current.y;

      if (Math.abs(dx) > 0.008 || Math.abs(dy) > 0.008) {
        setSignalActive(true);
      }

      mouseRef.current.vx += dx * 0.05;
      mouseRef.current.vy += dy * 0.05;
      mouseRef.current.vx *= 0.85;
      mouseRef.current.vy *= 0.85;

      mouseRef.current.x += mouseRef.current.vx;
      mouseRef.current.y += mouseRef.current.vy;
    }

    // Position interpolation: Hero target position is x = 2.0 (right 50% screen visual)
    const targetX = isMobile ? 0 : THREE.MathUtils.lerp(2.0, -1.8, scrollProgress * 2.2);
    const targetY = THREE.MathUtils.lerp(0, 0.5, scrollProgress);
    const targetZ = THREE.MathUtils.lerp(0, -1.5, scrollProgress);

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;

    // Main structural rotations
    groupRef.current.rotation.y = time * 0.09 + mouseRef.current.x * 0.3;
    groupRef.current.rotation.x = Math.sin(time * 0.04) * 0.12 - mouseRef.current.y * 0.3;

    // Inner unfinished frame rotation
    if (innerFrameRef.current) {
      innerFrameRef.current.rotation.x = time * 0.18;
      innerFrameRef.current.rotation.z = time * 0.14;
      const scaleSep = 1 + scrollProgress * 0.5;
      innerFrameRef.current.scale.setScalar(scaleSep);
    }

    if (outerFrameRef.current) {
      outerFrameRef.current.rotation.y = -time * 0.12;
      outerFrameRef.current.rotation.x = time * 0.08;
    }

    // Traveling Crimson Signal Logic
    if (signalRef.current && signalActive) {
      signalProgressRef.current += delta * 1.8;
      const t = signalProgressRef.current;
      const r = 2.0;
      signalRef.current.position.x = r * Math.cos(t * 2);
      signalRef.current.position.y = r * Math.sin(t * 2);
      signalRef.current.position.z = Math.sin(t * 4) * 0.6;

      if (t > Math.PI * 2) {
        signalProgressRef.current = 0;
        setSignalActive(false);
      }
    }
  });

  return (
    <group ref={groupRef} position={isMobile ? [0, 0, -1] : [2.0, 0, 0]}>
      {/* High-Contrast Multi-point Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 4]} intensity={2.2} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={4.5} color="#DC143C" distance={6} />
      <pointLight position={[-3, -3, 2]} intensity={2.5} color="#3B82F6" distance={7} />

      {/* ── Midground: Central Unfinished Structural Geometry ── */}
      <group>
        {/* Core Nucleus Form */}
        <mesh>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#DC143C"
            emissive="#DC143C"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Unfinished Wireframe Shell (Primary Crimson) */}
        <mesh ref={innerFrameRef}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial
            color="#DC143C"
            wireframe
            transparent
            opacity={0.65}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Incomplete Structural Lattice (Slate/White Secondary) */}
        <mesh ref={outerFrameRef}>
          <dodecahedronGeometry args={[1.75, 0]} />
          <meshStandardMaterial
            color="#CBD5E1"
            wireframe
            transparent
            opacity={0.35}
            roughness={0.4}
          />
        </mesh>

        {/* Intersecting Technical Line Segments */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#DC143C" transparent opacity={0.55} />
        </lineSegments>
      </group>

      {/* ── Foreground: Traveling Crimson Signal Node ── */}
      <mesh ref={signalRef} position={[2.0, 0, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#DC143C" />
      </mesh>

      {/* ── Background: High-Visibility Node Constellation ── */}
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
          size={isMobile ? 0.05 : 0.045}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
