import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Advanced Scroll-Interactive 3D Intelligence Core Matrix —
 * A multi-layered, interactive 3D centerpiece that dynamically morphs,
 * rotates, and shifts position in 3D space as the user scrolls across the portfolio.
 */
export function IntelligenceCore({ tier = 'high', isMobile = false }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const innerShellRef = useRef();
  const outerShellRef = useRef();
  const satellitesGroupRef = useRef();
  const pointsRef = useRef();

  const scrollProgress = useScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });
  const timeRef = useRef(0);

  // Particle constellation configuration based on device capabilities
  const nodeCount = tier === 'high' ? 500 : tier === 'medium' ? 250 : 100;

  // Generate constellation nodes with color spectrum
  const { positions, colors, initialPositions } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const initialPos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);

    const crimson = new THREE.Color('#DC143C');
    const blue = new THREE.Color('#3B82F6');
    const cyan = new THREE.Color('#00F0FF');
    const white = new THREE.Color('#F8FAFC');

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      
      const band = i % 4;
      const radius = 1.2 + band * 0.6 + (Math.random() * 0.4 - 0.2);
      
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

      initialPos[i3] = x;
      initialPos[i3 + 1] = y;
      initialPos[i3 + 2] = z;

      const color = band === 0 ? crimson : band === 1 ? blue : band === 2 ? cyan : white;
      color.multiplyScalar(band === 3 ? 0.7 : 0.95);
      
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, colors: col, initialPositions: initialPos };
  }, [nodeCount]);

  // Orbiting satellite micro-nodes
  const satellites = useMemo(() => {
    return [
      { radius: 1.55, speed: 0.9, color: '#DC143C', size: 0.05, tilt: [0.4, 0.2, 0] },
      { radius: 2.15, speed: -0.65, color: '#3B82F6', size: 0.04, tilt: [-0.3, 0.5, 0.2] },
      { radius: 2.75, speed: 0.45, color: '#00F0FF', size: 0.035, tilt: [0.6, -0.4, 0.3] },
      { radius: 1.85, speed: -0.95, color: '#DC143C', size: 0.045, tilt: [-0.5, -0.2, 0.4] },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta;
    const time = timeRef.current;

    // Smooth magnetic mouse tracking with spring physics (desktop only)
    if (!isMobile) {
      const pointer = state.pointer;
      mouseRef.current.targetX = pointer.x;
      mouseRef.current.targetY = pointer.y;

      const dx = mouseRef.current.targetX - mouseRef.current.x;
      const dy = mouseRef.current.targetY - mouseRef.current.y;

      mouseRef.current.vx += dx * 0.08;
      mouseRef.current.vy += dy * 0.08;
      mouseRef.current.vx *= 0.82;
      mouseRef.current.vy *= 0.82;

      mouseRef.current.x += mouseRef.current.vx;
      mouseRef.current.y += mouseRef.current.vy;
    }

    // ── Scroll-Linked 3D Morph & Position Interpolation ──
    const targetX = isMobile 
      ? 0 
      : THREE.MathUtils.lerp(1.4, -1.2, Math.sin(scrollProgress * Math.PI));
    const targetY = THREE.MathUtils.lerp(0, -0.4, scrollProgress);
    const targetZ = THREE.MathUtils.lerp(0, -1.5, scrollProgress);

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;

    // Main group rotation driven by time + scroll + mouse
    const rotSpeed = 0.08 + scrollProgress * 0.12;
    groupRef.current.rotation.y = time * rotSpeed + mouseRef.current.x * 0.3;
    groupRef.current.rotation.x = Math.sin(time * 0.04) * 0.12 - mouseRef.current.y * 0.3;

    // Core pulse
    if (innerCoreRef.current) {
      const pulse = 1 + Math.sin(time * 2.5 + scrollProgress * 5) * 0.1;
      innerCoreRef.current.scale.setScalar(pulse);
    }

    // Inner wireframe shell rotation
    if (innerShellRef.current) {
      innerShellRef.current.rotation.x = time * 0.22;
      innerShellRef.current.rotation.z = time * 0.18;
    }

    // Outer wireframe shell reverse rotation
    if (outerShellRef.current) {
      outerShellRef.current.rotation.y = -time * 0.14;
      outerShellRef.current.rotation.x = time * 0.09;
    }

    // Satellites rotation
    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.y = time * 0.35;
    }

    // Dynamic particle dispersal based on scroll depth
    if (pointsRef.current) {
      const geom = pointsRef.current.geometry;
      const posAttr = geom.attributes.position;
      const expandFactor = 1 + scrollProgress * 0.35;

      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        posAttr.array[i3] = initialPositions[i3] * expandFactor;
        posAttr.array[i3 + 1] = initialPositions[i3 + 1] * expandFactor;
        posAttr.array[i3 + 2] = initialPositions[i3 + 2] * expandFactor;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={isMobile ? [0, 0, -1] : [1.4, 0, 0]}>
      {/* Dynamic Multi-point Lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={2.8} color="#DC143C" distance={4.5} />
      <pointLight position={[-3, -3, 2]} intensity={1.8} color="#3B82F6" distance={5} />
      <pointLight position={[2, -2, -2]} intensity={1.2} color="#00F0FF" distance={4} />

      {/* ── Central Core Assembly ── */}
      <group>
        {/* Nucleus Energy Core */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial
            color="#DC143C"
            emissive="#DC143C"
            emissiveIntensity={0.7}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Wireframe Shell */}
        <mesh ref={innerShellRef}>
          <icosahedronGeometry args={[0.58, 1]} />
          <meshStandardMaterial
            color="#DC143C"
            wireframe
            transparent
            opacity={0.5}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Geometrical Lattice Shell */}
        <mesh ref={outerShellRef}>
          <dodecahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.2}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* ── Technical Orbital Rings ── */}
      {tier !== 'low' && (
        <>
          <TechRing radius={1.4} color="#DC143C" opacity={0.4} speed={0.14} tilt={[0.5, 0.2, 0]} />
          <TechRing radius={1.95} color="#3B82F6" opacity={0.3} speed={-0.09} tilt={[-0.4, 0.6, 0.3]} dash />
          {tier === 'high' && (
            <TechRing radius={2.65} color="#00F0FF" opacity={0.18} speed={0.06} tilt={[0.7, -0.3, -0.2]} />
          )}
        </>
      )}

      {/* ── Orbiting Satellites ── */}
      <group ref={satellitesGroupRef}>
        {satellites.map((sat, i) => (
          <group key={i} rotation={sat.tilt}>
            <mesh position={[sat.radius, 0, 0]}>
              <sphereGeometry args={[sat.size, 16, 16]} />
              <meshBasicMaterial color={sat.color} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── Constellation Particle Field ── */}
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
          size={isMobile ? 0.045 : 0.038}
          vertexColors
          transparent
          opacity={0.92}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** 
 * TechRing — Precision technical orbital path.
 */
function TechRing({ radius = 1, color = '#ffffff', opacity = 0.2, speed = 0.1, tilt = [0, 0, 0], dash = false }) {
  const ref = useRef();
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (ref.current) {
      timeRef.current += delta;
      ref.current.rotation.z = timeRef.current * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.0025, 4, dash ? 48 : 96]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        wireframe={dash}
      />
    </mesh>
  );
}
