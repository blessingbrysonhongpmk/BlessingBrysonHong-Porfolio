import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * "BBH MASTER 3D AI ENGINEER ROBOT CHAMBER" —
 * Recreating the exact visual direction from the reference UI:
 * Full-body humanoid robot, raised palm observing an orbiting micro-data core,
 * glowing chest AI processor, concentric crimson computational platform,
 * open computational spine, and ambient data node field.
 */
export function AIEngineerRobot({ tier = 'high', isMobile = false }) {
  const robotGroupRef = useRef();
  const headRef = useRef();
  const visorRef = useRef();
  const chestCoreRef = useRef();
  const floatingDataCoreRef = useRef();
  const platformRef = useRef();
  const spineSignalRef = useRef();
  const rightHandGroupRef = useRef();

  const scrollProgress = useScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });
  const timeRef = useRef(0);
  const signalProgressRef = useRef(0);

  // Click Interaction: SYSTEM ANALYSIS (1.5s sequence)
  const [analysisMode, setAnalysisMode] = useState(false);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (!analysisMode) {
      setAnalysisMode(true);
      setTimeout(() => setAnalysisMode(false), 1500); // 1.5s System Analysis pulse
    }
  };

  // Node particle constellation count
  const nodeCount = tier === 'high' ? 360 : tier === 'medium' ? 180 : 80;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);
    const crimson = new THREE.Color('#DC143C');
    const slate = new THREE.Color('#94A3B8');
    const white = new THREE.Color('#FFFFFF');

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const radius = 1.8 + Math.random() * 1.2;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const color = i % 3 === 0 ? crimson : i % 3 === 1 ? slate : white;
      color.multiplyScalar(i % 3 === 0 ? 0.9 : 0.7);

      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, [nodeCount]);

  useFrame((state, delta) => {
    if (!robotGroupRef.current) return;

    timeRef.current += delta;
    const time = timeRef.current;

    // Mouse parallax tracking
    if (!isMobile) {
      const pointer = state.pointer;
      mouseRef.current.targetX = pointer.x;
      mouseRef.current.targetY = pointer.y;

      const dx = mouseRef.current.targetX - mouseRef.current.x;
      const dy = mouseRef.current.targetY - mouseRef.current.y;

      mouseRef.current.vx += dx * 0.05;
      mouseRef.current.vy += dy * 0.05;
      mouseRef.current.vx *= 0.85;
      mouseRef.current.vy *= 0.85;

      mouseRef.current.x += mouseRef.current.vx;
      mouseRef.current.y += mouseRef.current.vy;
    }

    // Target position interpolation: x = 2.1 (right 58% viewport)
    const targetX = isMobile ? 0 : THREE.MathUtils.lerp(2.1, -1.8, scrollProgress * 2.2);
    const targetY = THREE.MathUtils.lerp(-0.25, 0.3, scrollProgress);
    const targetZ = THREE.MathUtils.lerp(0, -2.0, scrollProgress);

    robotGroupRef.current.position.x += (targetX - robotGroupRef.current.position.x) * 0.05;
    robotGroupRef.current.position.y += (targetY - robotGroupRef.current.position.y) * 0.05;
    robotGroupRef.current.position.z += (targetZ - robotGroupRef.current.position.z) * 0.05;

    // Robot body 3/4 turn angle + mouse tracking
    const bodyRotY = 0.28 + mouseRef.current.x * 0.22;
    robotGroupRef.current.rotation.y += (bodyRotY - robotGroupRef.current.rotation.y) * 0.05;
    robotGroupRef.current.rotation.x = Math.sin(time * 0.03) * 0.03 - mouseRef.current.y * 0.15;

    // Head tracking pointer coordinates
    if (headRef.current) {
      headRef.current.rotation.y = mouseRef.current.x * 0.35;
      headRef.current.rotation.x = -mouseRef.current.y * 0.25;
    }

    // Floating Micro-Data Core above raised palm
    if (floatingDataCoreRef.current) {
      const floatY = 1.05 + Math.sin(time * 2.5) * 0.06;
      floatingDataCoreRef.current.position.y = floatY;
      floatingDataCoreRef.current.rotation.y = time * 1.2;
      floatingDataCoreRef.current.rotation.x = time * 0.8;
    }

    // Breathing chest core rotation & pulse
    if (chestCoreRef.current) {
      const speed = analysisMode ? 4.5 : 1.0;
      chestCoreRef.current.rotation.y += delta * 1.0 * speed;
      chestCoreRef.current.rotation.z += delta * 0.6 * speed;
    }

    // Concentric Platform pulse
    if (platformRef.current) {
      platformRef.current.rotation.z = time * 0.08;
    }

    // Open Computational Spine Traveling Crimson Signal
    if (spineSignalRef.current) {
      signalProgressRef.current += delta * (analysisMode ? 3.5 : 1.4);
      const t = signalProgressRef.current;
      const spineY = 0.65 - (Math.sin(t * 1.5) * 0.5 + 0.5) * 1.3;
      spineSignalRef.current.position.y = spineY;
      spineSignalRef.current.position.z = -0.32 + Math.cos(t * 3) * 0.03;
    }
  });

  return (
    <group
      ref={robotGroupRef}
      position={isMobile ? [0, -0.3, -1] : [2.1, -0.25, 0]}
      onPointerDown={handlePointerDown}
    >
      {/* Studio Lighting Setup matching reference */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={3.5} color="#FFFFFF" />
      <pointLight position={[0, 0.4, 0.4]} intensity={analysisMode ? 9.0 : 6.0} color="#DC143C" distance={6} />
      <pointLight position={[-3, -2, 2]} intensity={2.5} color="#3B82F6" distance={7} />

      {/* ── FULL-BODY ROBOTIC CHARACTER ASSEMBLY ── */}
      <group scale={[0.92, 0.92, 0.92]}>

        {/* 1. HEAD & OPTICS */}
        <group ref={headRef} position={[0, 1.65, 0]}>
          {/* Helmet Skull Plate */}
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.34, 0.3, 0.34]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Dark Glass Visor Faceplate */}
          <mesh ref={visorRef} position={[0, 0.12, 0.175]}>
            <boxGeometry args={[0.3, 0.14, 0.02]} />
            <meshPhysicalMaterial
              color="#0F172A"
              transparent
              opacity={0.85}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>

          {/* Twin Crimson Optical Sensors */}
          <group position={[0, 0.12, 0.18]}>
            <mesh position={[-0.075, 0, 0]}>
              <sphereGeometry args={[0.025, 16, 16]} />
              <meshBasicMaterial color="#DC143C" />
            </mesh>
            <mesh position={[0.075, 0, 0]}>
              <sphereGeometry args={[0.025, 16, 16]} />
              <meshBasicMaterial color="#DC143C" />
            </mesh>
          </group>

          {/* Side Mechanical Ear Pods */}
          <mesh position={[-0.18, 0.12, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0.18, 0.12, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* 2. ARTICULATED NECK */}
        <group position={[0, 1.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.075, 0.095, 0.18, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Hydraulic Struts */}
          <mesh position={[-0.08, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.16, 12]} />
            <meshStandardMaterial color="#64748B" metalness={0.95} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.16, 12]} />
            <meshStandardMaterial color="#64748B" metalness={0.95} />
          </mesh>
        </group>

        {/* 3. TORSO & CHEST AI PROCESSOR */}
        <group position={[0, 0.72, 0]}>
          {/* Main Graphite Chest Armor Plates */}
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[0.66, 0.68, 0.44]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Concentric Chest AI Computational Processor Grid */}
          <group position={[0, 0.28, 0.23]}>
            {/* Core Nucleus */}
            <mesh ref={chestCoreRef}>
              <octahedronGeometry args={[0.18, 0]} />
              <meshStandardMaterial
                color="#DC143C"
                emissive="#DC143C"
                emissiveIntensity={analysisMode ? 2.5 : 1.5}
                metalness={0.9}
              />
            </mesh>

            {/* Concentric Polygonal Wireframe Grid */}
            <mesh>
              <icosahedronGeometry args={[0.26, 0]} />
              <meshStandardMaterial
                color="#DC143C"
                wireframe
                transparent
                opacity={0.85}
              />
            </mesh>

            <mesh>
              <boxGeometry args={[0.42, 0.42, 0.03]} />
              <meshPhysicalMaterial
                color="#0F172A"
                transparent
                opacity={0.5}
                roughness={0.1}
                metalness={0.8}
              />
            </mesh>
          </group>

          {/* 4. SIGNATURE FEATURE — OPEN COMPUTATIONAL SPINE */}
          <group position={[0, 0, -0.23]}>
            {[-0.3, -0.1, 0.1, 0.3, 0.5].map((yPos, idx) => (
              <mesh key={idx} position={[0, yPos, 0]}>
                <boxGeometry args={[0.15, 0.08, 0.15]} />
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
              </mesh>
            ))}
            {/* Traveling Crimson Signal Node */}
            <mesh ref={spineSignalRef} position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#DC143C" />
            </mesh>
          </group>
        </group>

        {/* 5. ASYMMETRIC ARMS & RAISED PALM WITH FLOATING DATA CORE */}
        {/* Left Arm (Relaxed at side) */}
        <group position={[-0.42, 1.05, 0]}>
          <mesh position={[-0.08, 0, 0]}>
            <sphereGeometry args={[0.17, 16, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-0.1, -0.34, 0]}>
            <cylinderGeometry args={[0.075, 0.065, 0.45, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Left Hand */}
          <group position={[-0.1, -0.62, 0]}>
            <mesh>
              <boxGeometry args={[0.08, 0.11, 0.04]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* Right Arm (Raised Palm Observing Floating Micro-Data Core) */}
        <group ref={rightHandGroupRef} position={[0.42, 1.05, 0]}>
          <mesh position={[0.08, 0, 0]}>
            <sphereGeometry args={[0.17, 16, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Forearm bent forward & upward */}
          <mesh position={[-0.22, -0.2, 0.35]} rotation={[0.9, -0.4, -0.5]}>
            <cylinderGeometry args={[0.075, 0.065, 0.45, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Raised Palm-Up Hand */}
          <group position={[-0.45, -0.1, 0.65]} rotation={[0.4, 0.2, 0.8]}>
            <mesh>
              <boxGeometry args={[0.12, 0.04, 0.12]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* FLOATING MICRO-DATA CORE (Hovering right above raised palm) */}
        <group ref={floatingDataCoreRef} position={[-0.42, 1.05, 0.65]}>
          <mesh>
            <icosahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial
              color="#DC143C"
              wireframe
              emissive="#DC143C"
              emissiveIntensity={1.8}
            />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.07, 0]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* 6. WAIST, LEGS & FEET */}
        <group position={[0, 0.28, 0]}>
          <mesh>
            <cylinderGeometry args={[0.23, 0.25, 0.16, 24]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Left Leg */}
        <group position={[-0.2, 0.1, 0]}>
          <mesh position={[0, -0.42, 0]}>
            <cylinderGeometry args={[0.115, 0.095, 0.58, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.74, 0.03]}>
            <sphereGeometry args={[0.085, 16, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
          <mesh position={[0, -1.1, 0]}>
            <cylinderGeometry args={[0.085, 0.07, 0.58, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, -1.42, 0.08]}>
            <boxGeometry args={[0.13, 0.085, 0.28]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Right Leg (Slightly Forward Stance) */}
        <group position={[0.2, 0.1, 0.12]}>
          <mesh position={[0, -0.42, 0]}>
            <cylinderGeometry args={[0.115, 0.095, 0.58, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.74, 0.03]}>
            <sphereGeometry args={[0.085, 16, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
          <mesh position={[0, -1.1, 0]}>
            <cylinderGeometry args={[0.085, 0.07, 0.58, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, -1.42, 0.08]}>
            <boxGeometry args={[0.13, 0.085, 0.28]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* 7. CIRCULAR COMPUTATIONAL SUSPENSION PLATFORM WITH CONCENTRIC GLOWING CRIMSON RINGS */}
        <group ref={platformRef} position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Inner Glowing Ring */}
          <mesh>
            <ringGeometry args={[0.5, 0.54, 64]} />
            <meshBasicMaterial color="#DC143C" side={THREE.DoubleSide} />
          </mesh>
          {/* Middle Ring */}
          <mesh>
            <ringGeometry args={[0.9, 0.93, 64]} />
            <meshBasicMaterial color="#DC143C" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          {/* Outer Segment Ring */}
          <mesh>
            <ringGeometry args={[1.3, 1.34, 64]} />
            <meshBasicMaterial color="#DC143C" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
          {/* Floor Shadow Plane */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[3.2, 3.2]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.65} depthWrite={false} />
          </mesh>
        </group>

      </group>

      {/* Background Ambient Data Node Constellation */}
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
          size={isMobile ? 0.048 : 0.042}
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
