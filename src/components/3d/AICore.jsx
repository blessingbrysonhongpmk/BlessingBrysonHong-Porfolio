import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * "ROBOTIC INTELLIGENCE CORE" —
 * A compact, engineered physical prototype module:
 * Robotics × Artificial Intelligence × Experimental Research
 */
export function AICore({ tier = 'high', isMobile = false }) {
  const groupRef = useRef();
  const outerShellRef = useRef();
  const glassPanelRef = useRef();
  const innerCoreRef = useRef();
  const signalRef = useRef();
  const sensor1Ref = useRef();
  const sensor2Ref = useRef();

  const scrollProgress = useScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });
  const timeRef = useRef(0);
  const signalProgressRef = useRef(0);
  const [signalActive, setSignalActive] = useState(false);

  // Particle constellation node count based on device tier
  const nodeCount = tier === 'high' ? 380 : tier === 'medium' ? 200 : 90;

  // Generate node positions and color attributes
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);

    const crimson = new THREE.Color('#DC143C');
    const slate = new THREE.Color('#94A3B8');
    const white = new THREE.Color('#F8FAFC');

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const band = i % 3;
      const radius = 1.9 + band * 0.6 + (Math.random() * 0.35 - 0.17);

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
      color.multiplyScalar(band === 2 ? 0.75 : 0.9);

      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, [nodeCount]);

  // Construct structural wireframe line segments for mechanical seams
  const seamGeometry = useMemo(() => {
    const points = [];
    const radius = 1.85;
    const count = 16;

    for (let i = 0; i < count; i++) {
      const theta1 = (i / count) * Math.PI * 2;
      const theta2 = ((i + 1) / count) * Math.PI * 2;

      points.push(
        new THREE.Vector3(radius * Math.cos(theta1), radius * Math.sin(theta1), 0),
        new THREE.Vector3(radius * Math.cos(theta2), radius * Math.sin(theta2), 0)
      );

      if (i % 4 === 0) {
        points.push(
          new THREE.Vector3(radius * Math.cos(theta1), radius * Math.sin(theta1), 0),
          new THREE.Vector3(0, radius * Math.sin(theta1), (i % 2 === 0 ? 1.1 : -1.1))
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

    // Position & Depth interpolation: target X = 2.0 on desktop
    const targetX = isMobile ? 0 : THREE.MathUtils.lerp(2.0, -1.8, scrollProgress * 2.2);
    const targetY = THREE.MathUtils.lerp(0, 0.4, scrollProgress);
    const targetZ = THREE.MathUtils.lerp(0, -1.8, scrollProgress);

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;

    // Asymmetric robotic core rotations
    groupRef.current.rotation.y = time * 0.08 + mouseRef.current.x * 0.28;
    groupRef.current.rotation.x = Math.sin(time * 0.04) * 0.1 - mouseRef.current.y * 0.28;

    // Outer graphite shell rotation
    if (outerShellRef.current) {
      outerShellRef.current.rotation.y = time * 0.06;
      outerShellRef.current.rotation.z = Math.sin(time * 0.05) * 0.08;
    }

    // Dark glass panels rotation
    if (glassPanelRef.current) {
      glassPanelRef.current.rotation.x = -time * 0.09;
      glassPanelRef.current.rotation.y = time * 0.12;
    }

    // Central computational core differential rotation & pulse
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = time * 0.22;
      innerCoreRef.current.rotation.z = time * 0.18;
      const pulse = 1 + Math.sin(time * 2.2) * 0.08;
      innerCoreRef.current.scale.setScalar(pulse);
    }

    // Sensor lens subtle micro-tracking
    if (sensor1Ref.current && sensor2Ref.current) {
      sensor1Ref.current.rotation.z = time * 0.4;
      sensor2Ref.current.rotation.z = -time * 0.4;
    }

    // Traveling Crimson Signal Logic
    if (signalRef.current && signalActive) {
      signalProgressRef.current += delta * 1.8;
      const t = signalProgressRef.current;
      const r = 1.85;
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
      {/* Cinematic Studio Lighting Setup */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={2.8} color="#FFFFFF" />
      <pointLight position={[0, 0, 0]} intensity={4.8} color="#DC143C" distance={6} />
      <pointLight position={[-4, -3, 2]} intensity={2.2} color="#3B82F6" distance={7} />

      {/* ── 3D ROBOTIC INTELLIGENCE CORE ASSEMBLY ── */}
      <group>

        {/* 1. Central Computational Core (Emissive Crimson Nucleus) */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#DC143C"
            emissive="#DC143C"
            emissiveIntensity={1.3}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>

        {/* 2. Inner Mechanical Frame (Structural Icosahedron) */}
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#DC143C"
            wireframe
            transparent
            opacity={0.65}
            roughness={0.2}
          />
        </mesh>

        {/* 3. Dark Graphite Metallic Outer Shell (Asymmetric Dodecahedron Plates) */}
        <mesh ref={outerShellRef}>
          <dodecahedronGeometry args={[1.65, 0]} />
          <meshStandardMaterial
            color="#1E293B"
            wireframe
            roughness={0.25}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* 4. Layered Dark Transparent Glass Panels */}
        <mesh ref={glassPanelRef}>
          <icosahedronGeometry args={[1.85, 0]} />
          <meshPhysicalMaterial
            color="#0F172A"
            transparent
            opacity={0.45}
            roughness={0.1}
            metalness={0.8}
            transmission={0.4}
            thickness={0.5}
          />
        </mesh>

        {/* 5. Precision Mechanical Seams & Connecting Lines */}
        <lineSegments geometry={seamGeometry}>
          <lineBasicMaterial color="#DC143C" transparent opacity={0.5} />
        </lineSegments>

        {/* 6. Precision Sensor Element 01 (Upper Right Lens) */}
        <group position={[0.95, 0.95, 0.95]}>
          <mesh ref={sensor1Ref}>
            <cylinderGeometry args={[0.08, 0.08, 0.18, 16]} />
            <meshStandardMaterial color="#0F172A" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#DC143C" />
          </mesh>
        </group>

        {/* 7. Precision Sensor Element 02 (Lower Left Lens) */}
        <group position={[-0.95, -0.95, -0.95]}>
          <mesh ref={sensor2Ref}>
            <cylinderGeometry args={[0.08, 0.08, 0.18, 16]} />
            <meshStandardMaterial color="#0F172A" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, -0.1]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#DC143C" />
          </mesh>
        </group>

      </group>

      {/* ── Foreground: Traveling Crimson Signal Node ── */}
      <mesh ref={signalRef} position={[2.0, 0, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#DC143C" />
      </mesh>

      {/* ── Background: High-Visibility Data Node Constellation ── */}
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
    </group>
  );
}
