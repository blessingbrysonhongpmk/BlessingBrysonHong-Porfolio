import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * "BBH FULL-BODY 3D AI ENGINEER ROBOT" —
 * Complete procedural 3D humanoid robotic character designed as an original AI engineering prototype:
 * Head, Neck, Torso, Chest Processor, Open Computational Spine, Arms, 5-Finger Hands, Legs, Feet & Shadow.
 */
export function AIEngineerRobot({ tier = 'high', isMobile = false }) {
  const robotGroupRef = useRef();
  const headRef = useRef();
  const chestCoreRef = useRef();
  const spineSignalRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  const scrollProgress = useScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });
  const timeRef = useRef(0);
  const signalProgressRef = useRef(0);

  // Click Interaction: SYSTEM INITIALIZATION
  const [isInitMode, setIsInitMode] = useState(false);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (!isInitMode) {
      setIsInitMode(true);
      setTimeout(() => setIsInitMode(false), 1200); // 1.2s initialization pulse
    }
  };

  // Node particle constellation count
  const nodeCount = tier === 'high' ? 300 : tier === 'medium' ? 160 : 70;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);
    const crimson = new THREE.Color('#DC143C');
    const slate = new THREE.Color('#CBD5E1');

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const radius = 1.6 + Math.random() * 0.8;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const color = i % 3 === 0 ? crimson : slate;
      color.multiplyScalar(0.85);

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

    // Target position interpolation: x = 2.0 (right 50% viewport)
    const targetX = isMobile ? 0 : THREE.MathUtils.lerp(2.0, -1.8, scrollProgress * 2.2);
    const targetY = THREE.MathUtils.lerp(-0.4, 0.2, scrollProgress);
    const targetZ = THREE.MathUtils.lerp(0, -2.0, scrollProgress);

    robotGroupRef.current.position.x += (targetX - robotGroupRef.current.position.x) * 0.05;
    robotGroupRef.current.position.y += (targetY - robotGroupRef.current.position.y) * 0.05;
    robotGroupRef.current.position.z += (targetZ - robotGroupRef.current.position.z) * 0.05;

    // Robot body 3/4 turn angle + mouse tracking
    const bodyRotY = 0.25 + mouseRef.current.x * 0.22;
    robotGroupRef.current.rotation.y += (bodyRotY - robotGroupRef.current.rotation.y) * 0.05;
    robotGroupRef.current.rotation.x = Math.sin(time * 0.03) * 0.04 - mouseRef.current.y * 0.15;

    // Head tracking pointer coordinates
    if (headRef.current) {
      headRef.current.rotation.y = mouseRef.current.x * 0.35;
      headRef.current.rotation.x = -mouseRef.current.y * 0.25;
    }

    // Breathing chest core rotation
    if (chestCoreRef.current) {
      const speed = isInitMode ? 4.0 : 1.0;
      chestCoreRef.current.rotation.y += delta * 0.8 * speed;
      chestCoreRef.current.rotation.x += delta * 0.4 * speed;
    }

    // Open Computational Spine Traveling Crimson Signal
    if (spineSignalRef.current) {
      signalProgressRef.current += delta * (isInitMode ? 3.0 : 1.2);
      const t = signalProgressRef.current;
      const spineY = 0.6 - (Math.sin(t * 1.5) * 0.5 + 0.5) * 1.2;
      spineSignalRef.current.position.y = spineY;
      spineSignalRef.current.position.z = -0.32 + Math.cos(t * 3) * 0.03;
    }

    // Subtle arm micro-idle movement
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 0.05) * 0.03 - 0.15;
      rightArmRef.current.rotation.z = -Math.sin(time * 0.05) * 0.03 + 0.2;
    }
  });

  return (
    <group
      ref={robotGroupRef}
      position={isMobile ? [0, -0.4, -1] : [2.0, -0.4, 0]}
      onPointerDown={handlePointerDown}
    >
      {/* Studio Lighting Setup */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={3.2} color="#FFFFFF" />
      <pointLight position={[0, 0.4, 0.3]} intensity={isInitMode ? 8.0 : 5.0} color="#DC143C" distance={5} />
      <pointLight position={[-3, -2, 2]} intensity={2.2} color="#3B82F6" distance={6} />

      {/* ── FULL-BODY ROBOTIC CHARACTER ASSEMBLY ── */}
      <group scale={[0.85, 0.85, 0.85]}>

        {/* 1. HEAD & OPTICS */}
        <group ref={headRef} position={[0, 1.6, 0]}>
          {/* Head Skull Armor Plate */}
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.32, 0.28, 0.32]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Dark Glass Visor Faceplate */}
          <mesh position={[0, 0.12, 0.165]}>
            <boxGeometry args={[0.28, 0.12, 0.02]} />
            <meshPhysicalMaterial
              color="#0F172A"
              transparent
              opacity={0.8}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>

          {/* Twin Crimson Optical Sensors */}
          <group position={[0, 0.12, 0.17]}>
            <mesh position={[-0.07, 0, 0]}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial color="#DC143C" />
            </mesh>
            <mesh position={[0.07, 0, 0]}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial color="#DC143C" />
            </mesh>
          </group>

          {/* Side Ventilation Pods */}
          <mesh position={[-0.17, 0.12, 0]}>
            <boxGeometry args={[0.04, 0.14, 0.14]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0.17, 0.12, 0]}>
            <boxGeometry args={[0.04, 0.14, 0.14]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* 2. ARTICULATED NECK */}
        <group position={[0, 1.35, 0]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.09, 0.18, 16]} />
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
        <group position={[0, 0.7, 0]}>
          {/* Main Graphite Chest Armor Plates */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.62, 0.65, 0.42]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Compact Chest AI Computational Processor */}
          <group position={[0, 0.25, 0.22]}>
            <mesh ref={chestCoreRef}>
              <octahedronGeometry args={[0.16, 0]} />
              <meshStandardMaterial
                color="#DC143C"
                emissive="#DC143C"
                emissiveIntensity={isInitMode ? 2.2 : 1.3}
                metalness={0.9}
              />
            </mesh>
            <mesh>
              <boxGeometry args={[0.38, 0.38, 0.03]} />
              <meshPhysicalMaterial
                color="#0F172A"
                transparent
                opacity={0.45}
                roughness={0.1}
                metalness={0.8}
              />
            </mesh>
          </group>

          {/* 4. SIGNATURE FEATURE — OPEN COMPUTATIONAL SPINE */}
          <group position={[0, 0, -0.22]}>
            {/* Vertebrae Segment Modules */}
            {[-0.3, -0.1, 0.1, 0.3, 0.5].map((yPos, idx) => (
              <mesh key={idx} position={[0, yPos, 0]}>
                <boxGeometry args={[0.14, 0.08, 0.14]} />
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
              </mesh>
            ))}
            {/* Traveling Crimson Signal Node */}
            <mesh ref={spineSignalRef} position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial color="#DC143C" />
            </mesh>
          </group>
        </group>

        {/* 5. ASYMMETRIC SHOULDERS & ARMS */}
        {/* Left Arm (With Shoulder Sensor Module) */}
        <group ref={leftArmRef} position={[-0.38, 1.0, 0]}>
          {/* Shoulder Armor + Sensor Module */}
          <mesh position={[-0.08, 0, 0]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-0.18, 0.08, 0]}>
            <boxGeometry args={[0.06, 0.06, 0.08]} />
            <meshStandardMaterial color="#DC143C" emissive="#DC143C" emissiveIntensity={0.6} />
          </mesh>
          {/* Upper Arm & Forearm */}
          <mesh position={[-0.08, -0.32, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.42, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* 5-Finger Elegant Hand (Relaxed) */}
          <group position={[-0.08, -0.58, 0]}>
            <mesh>
              <boxGeometry args={[0.08, 0.1, 0.04]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* Right Arm (Sleek Observing Pose) */}
        <group ref={rightArmRef} position={[0.38, 1.0, 0]}>
          {/* Shoulder Armor */}
          <mesh position={[0.08, 0, 0]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Upper Arm & Forearm */}
          <mesh position={[0.08, -0.32, 0.08]} rotation={[0.4, 0, -0.2]}>
            <cylinderGeometry args={[0.07, 0.06, 0.42, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* 5-Finger Elegant Hand (Slightly Raised Near Core) */}
          <group position={[0.08, -0.54, 0.22]}>
            <mesh>
              <boxGeometry args={[0.08, 0.1, 0.04]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* 6. WAIST, LEGS & FEET */}
        {/* Waist Connector Ring */}
        <group position={[0, 0.28, 0]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.24, 0.16, 24]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Left Leg */}
        <group position={[-0.18, 0.1, 0]}>
          {/* Thigh Armor */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.11, 0.09, 0.55, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.25} />
          </mesh>
          {/* Knee Joint */}
          <mesh position={[0, -0.7, 0.03]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
          {/* Calf Component */}
          <mesh position={[0, -1.05, 0]}>
            <cylinderGeometry args={[0.08, 0.065, 0.55, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Engineered Foot */}
          <mesh position={[0, -1.35, 0.08]}>
            <boxGeometry args={[0.12, 0.08, 0.26]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Right Leg (Slightly Forward Pose) */}
        <group position={[0.18, 0.1, 0.1]}>
          {/* Thigh Armor */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.11, 0.09, 0.55, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.25} />
          </mesh>
          {/* Knee Joint */}
          <mesh position={[0, -0.7, 0.03]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
          {/* Calf Component */}
          <mesh position={[0, -1.05, 0]}>
            <cylinderGeometry args={[0.08, 0.065, 0.55, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Engineered Foot */}
          <mesh position={[0, -1.35, 0.08]}>
            <boxGeometry args={[0.12, 0.08, 0.26]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* 7. REALISTIC CONTACT FLOOR SHADOW PLANE */}
        <mesh position={[0, -1.39, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.6, 1.6]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={0.45}
            depthWrite={false}
          />
        </mesh>

      </group>

      {/* Background Node Constellation */}
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
          size={isMobile ? 0.045 : 0.04}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
