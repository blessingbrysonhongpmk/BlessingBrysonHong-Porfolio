import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Powerful 3D Intelligence Core Matrix —
 * A multi-layered, interactive 3D centerpiece representing:
 * Data → Learning → AI → Creation
 */
export function IntelligenceCore({ tier = 'high', isMobile = false }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const innerShellRef = useRef();
  const outerShellRef = useRef();
  const satellitesGroupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const timeRef = useRef(0);

  // Particle constellation configuration based on device capabilities
  const nodeCount = tier === 'high' ? 450 : tier === 'medium' ? 220 : 80;

  // Generate constellation nodes
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);

    const crimson = new THREE.Color('#DC143C');
    const blue = new THREE.Color('#3B82F6');
    const white = new THREE.Color('#F8FAFC');

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      
      const band = i % 3;
      const radius = 1.2 + band * 0.7 + (Math.random() * 0.3 - 0.15);
      
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const color = band === 0 ? crimson : band === 1 ? blue : white;
      color.multiplyScalar(band === 2 ? 0.6 : 0.9);
      
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, [nodeCount]);

  // Orbiting satellite nodes data
  const satellites = useMemo(() => {
    return [
      { radius: 1.5, speed: 0.8, color: '#DC143C', size: 0.05, tilt: [0.4, 0.2, 0] },
      { radius: 2.1, speed: -0.6, color: '#3B82F6', size: 0.04, tilt: [-0.3, 0.5, 0.2] },
      { radius: 2.7, speed: 0.4, color: '#F8FAFC', size: 0.035, tilt: [0.6, -0.4, 0.3] },
      { radius: 1.8, speed: -0.9, color: '#DC143C', size: 0.045, tilt: [-0.5, -0.2, 0.4] },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta;
    const time = timeRef.current;

    // Smooth magnetic mouse tracking (desktop only)
    if (!isMobile) {
      const pointer = state.pointer;
      mouseRef.current.targetX = pointer.x;
      mouseRef.current.targetY = pointer.y;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
    }

    // Main group rotation & parallax tilt
    groupRef.current.rotation.y = time * 0.08 + mouseRef.current.x * 0.25;
    groupRef.current.rotation.x = Math.sin(time * 0.04) * 0.12 - mouseRef.current.y * 0.25;

    // Core pulsing scale
    if (innerCoreRef.current) {
      const pulse = 1 + Math.sin(time * 2.2) * 0.08;
      innerCoreRef.current.scale.setScalar(pulse);
    }

    // Inner wireframe shell rotation
    if (innerShellRef.current) {
      innerShellRef.current.rotation.x = time * 0.2;
      innerShellRef.current.rotation.z = time * 0.15;
    }

    // Outer wireframe shell reverse rotation
    if (outerShellRef.current) {
      outerShellRef.current.rotation.y = -time * 0.12;
      outerShellRef.current.rotation.x = time * 0.08;
    }

    // Satellites rotation
    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={isMobile ? [0, 0, -1] : [1.4, 0, 0]}>
      {/* Dynamic Multi-point Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#DC143C" distance={4} />
      <pointLight position={[-3, -3, 2]} intensity={1.5} color="#3B82F6" distance={5} />

      {/* ── Central Core Assembly ── */}
      <group>
        {/* Nucleus Energy Core */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial
            color="#DC143C"
            emissive="#DC143C"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Wireframe Shell */}
        <mesh ref={innerShellRef}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial
            color="#DC143C"
            wireframe
            transparent
            opacity={0.45}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Geometrical Lattice Shell */}
        <mesh ref={outerShellRef}>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.18}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* ── Technical Orbital Rings ── */}
      {tier !== 'low' && (
        <>
          <TechRing radius={1.35} color="#DC143C" opacity={0.35} speed={0.12} tilt={[0.5, 0.2, 0]} />
          <TechRing radius={1.9} color="#3B82F6" opacity={0.25} speed={-0.08} tilt={[-0.4, 0.6, 0.3]} dash />
          {tier === 'high' && (
            <TechRing radius={2.6} color="#F8FAFC" opacity={0.12} speed={0.05} tilt={[0.7, -0.3, -0.2]} />
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
          size={isMobile ? 0.045 : 0.035}
          vertexColors
          transparent
          opacity={0.9}
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
