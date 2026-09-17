import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EnergyCoreOrb } from './EnergyShader';
import { HologramVisorMaterial } from './HologramShader';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * ThrusterFlame — Compact plasma exhaust for the sentinel's propulsion.
 */
function ThrusterFlame({ position = [0, 0, 0], scale = [1, 1, 1], color = '#00F0FF', active = false }) {
  const flameRef = useRef();

  useFrame(() => {
    if (flameRef.current) {
      const pulse = 0.8 + Math.random() * 0.3 + (active ? 0.5 : 0);
      flameRef.current.scale.set(scale[0] * (0.9 + Math.random() * 0.15), scale[1] * pulse, scale[2] * (0.9 + Math.random() * 0.15));
    }
  });

  return (
    <group position={position}>
      <mesh ref={flameRef} position={[0, -scale[1] * 0.5, 0]}>
        <coneGeometry args={[0.08, scale[1], 14, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.65} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, -scale[1] * 0.3, 0]}>
        <coneGeometry args={[0.04, scale[1] * 0.5, 10, 1, true]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight position={[0, -scale[1] * 0.35, 0]} intensity={active ? 1.5 : 0.6} color={color} distance={1.2} />
    </group>
  );
}

/**
 * BBH AI SENTINEL — Compact Floating Drone Entity
 * 
 * A completely different design from a humanoid robot:
 * - Central spherical armored body with menacing visor
 * - Side hover pods with stabilizer fins
 * - Bottom propulsion thruster
 * - Orbiting data nodes
 * - Compact — stays strictly within the right column
 */
export function AIEngineerRobot({
  tier = 'high',
  isMobile = false,
  robotState = 'IDLE',
  isSpeaking = false,
  speechAmplitudeRef = null,
  onPointerDown = null,
}) {
  const robotGroupRef = useRef();
  const headRef = useRef();
  const chestCoreRef = useRef();
  const floatingDataCoreRef = useRef();
  const platformRef = useRef();
  const spineSignalsRef = useRef([]);
  const rightHandGroupRef = useRef();
  const antennaRef = useRef();

  const scrollProgress = useScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, proximity: 0 });
  const timeRef = useRef(0);
  const analysisMode = robotState === 'INITIALIZING' || robotState === 'THINKING' || isSpeaking;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (onPointerDown) onPointerDown();
  };

  const materials = useMemo(() => ({
    // Core armor
    darkShell: new THREE.MeshStandardMaterial({
      color: '#0E1218',
      metalness: 0.93,
      roughness: 0.15,
    }),
    midArmor: new THREE.MeshStandardMaterial({
      color: '#1A2030',
      metalness: 0.90,
      roughness: 0.20,
    }),
    lightArmor: new THREE.MeshStandardMaterial({
      color: '#2A3548',
      metalness: 0.92,
      roughness: 0.18,
    }),
    chrome: new THREE.MeshStandardMaterial({
      color: '#8090A8',
      metalness: 0.97,
      roughness: 0.06,
    }),
    crimsonPlate: new THREE.MeshStandardMaterial({
      color: '#DC143C',
      metalness: 0.82,
      roughness: 0.18,
      emissive: '#6A0015',
      emissiveIntensity: 0.5,
    }),
    // Glow materials
    crimsonGlow: new THREE.MeshBasicMaterial({ color: '#FF1E27' }),
    cyanGlow: new THREE.MeshBasicMaterial({ color: '#00F0FF' }),
    whiteGlow: new THREE.MeshBasicMaterial({ color: '#FFFFFF' }),
    // Transparent ring material
    holoRing: new THREE.MeshBasicMaterial({
      color: '#DC143C',
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    }),
  }), []);

  const spineSignalCount = tier === 'high' ? 5 : 3;
  const spineSignals = useMemo(() => {
    return Array.from({ length: spineSignalCount }, (_, i) => ({
      offset: (i / spineSignalCount) * Math.PI * 2,
      speed: 1.5 + i * 0.3,
      size: 0.03 - i * 0.003,
    }));
  }, [spineSignalCount]);

  const floatingCorePos = useRef([0.03, 1.05, 0.65]);

  useFrame((state, delta) => {
    if (!robotGroupRef.current) return;

    timeRef.current += delta;
    const time = timeRef.current;

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

      const dist = Math.hypot(pointer.x - 0.5, pointer.y);
      mouseRef.current.proximity = Math.max(0, 1 - dist * 0.8);
    }

    const hoverSwayY = Math.sin(time * 1.8) * 0.08;
    const flightPitchX = Math.sin(time * 1.2) * 0.03 - mouseRef.current.y * 0.12;
    const flightRollZ = Math.cos(time * 1.5) * 0.02 - mouseRef.current.vx * 0.3;

    // Positioned further right to avoid text overlap
    let targetX = 3.2;
    let targetY = 0.1 + hoverSwayY;
    let targetZ = 0.0;
    let targetRotY = -0.2;

    const camera = state.camera;
    let camTargetX = 0;
    let camTargetY = 0;
    let camTargetZ = 6.0;
    let camLookAtX = 0;
    let camLookAtY = 0;
    let camLookAtZ = 0;

    if (isMobile) {
      targetX = 0;
      targetY = -1.8 + hoverSwayY;
      targetZ = -0.3;
      targetRotY = 0;
      camTargetZ = 5.5;
    } else {
      if (scrollProgress < 0.2) {
        const t = scrollProgress / 0.2;
        targetX = THREE.MathUtils.lerp(3.2, -2.2, t);
        targetY = THREE.MathUtils.lerp(0.1, 0.4, t) + hoverSwayY;
        targetZ = THREE.MathUtils.lerp(0.0, -0.3, t);
        targetRotY = THREE.MathUtils.lerp(-0.2, 0.3, t);

        camTargetX = THREE.MathUtils.lerp(0.0, -0.5, t);
        camTargetY = THREE.MathUtils.lerp(0.0, 0.2, t);
        camTargetZ = THREE.MathUtils.lerp(6.0, 5.2, t);
        camLookAtX = THREE.MathUtils.lerp(0.4, -0.6, t);
        camLookAtY = THREE.MathUtils.lerp(0.0, 0.2, t);
      } else if (scrollProgress < 0.45) {
        const t = (scrollProgress - 0.2) / 0.25;
        targetX = THREE.MathUtils.lerp(-2.2, 2.2, t);
        targetY = THREE.MathUtils.lerp(0.4, 0.7, t) + hoverSwayY;
        targetZ = THREE.MathUtils.lerp(-0.3, -0.8, t);
        targetRotY = THREE.MathUtils.lerp(0.3, -0.3, t);

        camTargetX = THREE.MathUtils.lerp(-0.5, 0.6, t);
        camTargetY = THREE.MathUtils.lerp(0.2, 0.5, t);
        camTargetZ = THREE.MathUtils.lerp(5.2, 5.5, t);
        camLookAtX = THREE.MathUtils.lerp(-0.6, 1.0, t);
        camLookAtY = THREE.MathUtils.lerp(0.2, 0.4, t);
      } else if (scrollProgress < 0.75) {
        const t = (scrollProgress - 0.45) / 0.3;
        targetX = THREE.MathUtils.lerp(2.2, -2.0, t);
        targetY = THREE.MathUtils.lerp(0.7, 0.0, t) + hoverSwayY;
        targetZ = THREE.MathUtils.lerp(-0.8, -0.4, t);
        targetRotY = THREE.MathUtils.lerp(-0.3, 0.2, t);

        camTargetX = THREE.MathUtils.lerp(0.6, -0.4, t);
        camTargetY = THREE.MathUtils.lerp(0.5, -0.3, t);
        camTargetZ = THREE.MathUtils.lerp(5.5, 4.8, t);
        camLookAtX = THREE.MathUtils.lerp(1.0, -0.8, t);
        camLookAtY = THREE.MathUtils.lerp(0.4, 0.1, t);
      } else {
        const t = (scrollProgress - 0.75) / 0.25;
        targetX = THREE.MathUtils.lerp(-2.0, 2.0, t);
        targetY = THREE.MathUtils.lerp(0.0, 0.1, t) + hoverSwayY;
        targetZ = THREE.MathUtils.lerp(-0.4, 0.0, t);
        targetRotY = THREE.MathUtils.lerp(0.2, -0.2, t);

        camTargetX = THREE.MathUtils.lerp(-0.4, 0.0, t);
        camTargetY = THREE.MathUtils.lerp(-0.3, 0.1, t);
        camTargetZ = THREE.MathUtils.lerp(4.8, 5.2, t);
        camLookAtX = THREE.MathUtils.lerp(-0.8, 0.0, t);
        camLookAtY = THREE.MathUtils.lerp(0.1, 0.0, t);
      }
    }

    camera.position.x += (camTargetX + mouseRef.current.x * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (camTargetY + mouseRef.current.y * 0.3 - camera.position.y) * 0.05;
    camera.position.z += (camTargetZ - camera.position.z) * 0.05;
    camera.lookAt(camLookAtX, camLookAtY, camLookAtZ);

    robotGroupRef.current.position.x += (targetX - robotGroupRef.current.position.x) * 0.06;
    robotGroupRef.current.position.y += (targetY - robotGroupRef.current.position.y) * 0.06;
    robotGroupRef.current.position.z += (targetZ - robotGroupRef.current.position.z) * 0.06;

    const awarenessBoost = analysisMode ? 0.4 : mouseRef.current.proximity * 0.15;
    const bodyRotY = targetRotY + mouseRef.current.x * 0.25;
    robotGroupRef.current.rotation.y += (bodyRotY - robotGroupRef.current.rotation.y) * 0.05;
    robotGroupRef.current.rotation.x = flightPitchX;
    robotGroupRef.current.rotation.z = flightRollZ;

    // Head (main body) tracks mouse
    if (headRef.current) {
      const talkPulse = (isSpeaking && speechAmplitudeRef?.current) ? speechAmplitudeRef.current * 0.06 : 0;
      headRef.current.rotation.y = mouseRef.current.x * 0.3;
      headRef.current.rotation.x = -mouseRef.current.y * 0.18 + Math.sin(time * 15) * talkPulse;
    }

    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(time * 3.0) * 0.06;
    }

    if (floatingDataCoreRef.current) {
      const floatY = 1.15 + Math.sin(time * 2.2) * 0.04;
      floatingDataCoreRef.current.position.y = floatY;
      floatingDataCoreRef.current.rotation.y = time * 1.4;
      floatingDataCoreRef.current.rotation.x = time * 0.8;
      floatingCorePos.current = [
        floatingDataCoreRef.current.position.x,
        floatY,
        floatingDataCoreRef.current.position.z,
      ];
    }

    if (chestCoreRef.current) {
      const speed = analysisMode ? 4.0 : 1.0 + awarenessBoost * 2.0;
      chestCoreRef.current.rotation.z += delta * 0.8 * speed;
      const pulse = 1 + Math.sin(time * 3 + awarenessBoost * 4) * (0.06 + awarenessBoost * 0.1);
      chestCoreRef.current.scale.setScalar(pulse);
    }

    if (platformRef.current) {
      platformRef.current.rotation.z = time * 0.08;
    }

    // Orbiting data nodes
    spineSignalsRef.current.forEach((signalMesh, idx) => {
      if (!signalMesh) return;
      const sd = spineSignals[idx];
      const speed = analysisMode ? sd.speed * 2.0 : sd.speed * (1 + awarenessBoost);
      const t = time * speed + sd.offset;
      const orbitRadius = 1.2 + Math.sin(t * 0.5) * 0.15;
      signalMesh.position.x = Math.cos(t) * orbitRadius;
      signalMesh.position.y = Math.sin(t * 0.7) * 0.4;
      signalMesh.position.z = Math.sin(t) * orbitRadius;
      const pulse = 1 + Math.sin(t * 4) * 0.3;
      signalMesh.scale.setScalar(pulse);
    });
  });

  return (
    <group
      ref={robotGroupRef}
      position={isMobile ? [0, -1.8, -0.3] : [3.0, 0.1, 0.0]}
      onPointerDown={handlePointerDown}
    >
      {/* ═══ LIGHTING ═══ */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={2.0} color="#FFFFFF" />
      <directionalLight position={[-2, 2, -1]} intensity={0.8} color="#DC143C" />
      <pointLight position={[0, 0, 2.5]} intensity={0.9} color="#DC143C" distance={4} />
      <pointLight position={[-1.5, 1, 0.5]} intensity={0.5} color="#4466AA" distance={4} />
      <pointLight position={[1, 2, -2]} intensity={0.6} color="#00F0FF" distance={4} />
      <directionalLight position={[0, -1, -3]} intensity={0.4} color="#334466" />

      {/* ═══ AI SENTINEL DRONE ═══ */}
      <group scale={[0.9, 0.9, 0.9]}>

        {/* ══ MAIN BODY — Central Sphere with Visor ══ */}
        <group ref={headRef} position={[0, 0, 0]}>

          {/* Outer Shell — Armored sphere */}
          <mesh material={materials.darkShell}>
            <sphereGeometry args={[0.65, 36, 28]} />
          </mesh>

          {/* Upper Dome — Slightly brighter cap */}
          <mesh position={[0, 0.1, 0]} material={materials.midArmor}>
            <sphereGeometry args={[0.62, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
          </mesh>

          {/* Face Plate — Darker front panel */}
          <mesh position={[0, 0, 0.42]} material={materials.midArmor}>
            <boxGeometry args={[0.7, 0.5, 0.08]} />
          </mesh>

          {/* Angular Cheek Armor */}
          <mesh position={[-0.38, -0.05, 0.35]} rotation={[0, 0.4, 0]} material={materials.lightArmor}>
            <boxGeometry args={[0.15, 0.28, 0.06]} />
          </mesh>
          <mesh position={[0.38, -0.05, 0.35]} rotation={[0, -0.4, 0]} material={materials.lightArmor}>
            <boxGeometry args={[0.15, 0.28, 0.06]} />
          </mesh>

          {/* Crown Ridge */}
          <mesh position={[0, 0.52, -0.05]} material={materials.crimsonPlate}>
            <boxGeometry args={[0.06, 0.04, 0.5]} />
          </mesh>
          {/* Side crown lines */}
          <mesh position={[-0.18, 0.48, -0.02]} rotation={[0, 0, 0.35]} material={materials.chrome}>
            <boxGeometry args={[0.1, 0.018, 0.4]} />
          </mesh>
          <mesh position={[0.18, 0.48, -0.02]} rotation={[0, 0, -0.35]} material={materials.chrome}>
            <boxGeometry args={[0.1, 0.018, 0.4]} />
          </mesh>

          {/* ── MENACING VISOR — Wide crimson eye band ── */}
          <group position={[0, 0.06, 0.48]}>
            {/* Visor housing */}
            <mesh material={materials.darkShell}>
              <boxGeometry args={[0.56, 0.09, 0.02]} />
            </mesh>
            {/* Crimson eye line */}
            <mesh position={[0, 0, 0.005]} material={materials.crimsonGlow}>
              <boxGeometry args={[0.48, 0.04, 0.008]} />
            </mesh>
            {/* Central intense pupil */}
            <mesh position={[0, 0, 0.008]} material={materials.whiteGlow}>
              <boxGeometry args={[0.16, 0.018, 0.006]} />
            </mesh>
            {/* Left eye glow */}
            <mesh position={[-0.14, 0, 0.008]} material={materials.crimsonGlow}>
              <boxGeometry args={[0.1, 0.025, 0.005]} />
            </mesh>
            {/* Right eye glow */}
            <mesh position={[0.14, 0, 0.008]} material={materials.crimsonGlow}>
              <boxGeometry args={[0.1, 0.025, 0.005]} />
            </mesh>
            <pointLight position={[0, 0, 0.08]} intensity={1.0} color="#FF1E27" distance={1.2} />
          </group>

          {/* Hologram visor overlay */}
          <mesh position={[0, 0.06, 0.5]}>
            <boxGeometry args={[0.5, 0.06, 0.003]} />
            <HologramVisorMaterial color="#DC143C" intensity={1.0} analysisMode={analysisMode} />
          </mesh>

          {/* Lower Jaw / Chin Section */}
          <mesh position={[0, -0.2, 0.38]} material={materials.lightArmor}>
            <boxGeometry args={[0.4, 0.12, 0.08]} />
          </mesh>
          <mesh position={[0, -0.14, 0.42]} material={materials.crimsonGlow}>
            <boxGeometry args={[0.18, 0.008, 0.005]} />
          </mesh>

          {/* Side Sensor Pods */}
          <mesh position={[-0.56, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.chrome}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 24]} />
          </mesh>
          <mesh position={[-0.58, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.crimsonGlow}>
            <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
          </mesh>
          <mesh position={[0.56, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.chrome}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 24]} />
          </mesh>
          <mesh position={[0.58, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.crimsonGlow}>
            <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
          </mesh>

          {/* Top Antenna */}
          <group ref={antennaRef} position={[0, 0.6, -0.08]}>
            <mesh material={materials.chrome}>
              <cylinderGeometry args={[0.008, 0.005, 0.18, 8]} />
            </mesh>
            <mesh position={[0, 0.1, 0]} material={materials.cyanGlow}>
              <sphereGeometry args={[0.018, 12, 12]} />
            </mesh>
          </group>

          {/* Armor Panel Lines — Details */}
          <mesh position={[-0.3, 0.3, 0.3]} rotation={[0.2, 0.3, 0.1]} material={materials.crimsonPlate}>
            <boxGeometry args={[0.16, 0.015, 0.02]} />
          </mesh>
          <mesh position={[0.3, 0.3, 0.3]} rotation={[0.2, -0.3, -0.1]} material={materials.crimsonPlate}>
            <boxGeometry args={[0.16, 0.015, 0.02]} />
          </mesh>
        </group>

        {/* ══ NECK COLLAR ══ */}
        <group position={[0, -0.6, 0]}>
          <mesh material={materials.lightArmor}>
            <cylinderGeometry args={[0.25, 0.35, 0.2, 28]} />
          </mesh>
          <mesh position={[0, 0.08, 0]} material={materials.chrome}>
            <torusGeometry args={[0.28, 0.012, 8, 28]} />
          </mesh>
          <mesh position={[0, -0.05, 0]} material={materials.crimsonPlate}>
            <torusGeometry args={[0.33, 0.008, 8, 28]} />
          </mesh>
        </group>

        {/* ══ CENTRAL ENERGY CORE ══ */}
        <group ref={chestCoreRef} position={[0, -0.88, 0]}>
          {/* Core housing */}
          <mesh material={materials.midArmor}>
            <cylinderGeometry args={[0.32, 0.25, 0.35, 28]} />
          </mesh>
          {/* Reactor ring */}
          <mesh material={materials.chrome}>
            <torusGeometry args={[0.28, 0.018, 20, 40]} />
          </mesh>
          {/* Inner ring */}
          <mesh material={materials.darkShell}>
            <torusGeometry args={[0.2, 0.008, 12, 32]} />
          </mesh>
          {/* Energy orb */}
          <EnergyCoreOrb
            radius={0.08}
            detail={3}
            color="#DC143C"
            secondaryColor="#FF6B35"
            intensity={0.9}
            analysisMode={analysisMode}
          />
          {/* Wireframe indicator */}
          <mesh>
            <circleGeometry args={[0.14, 6]} />
            <meshBasicMaterial color="#FF1E27" wireframe />
          </mesh>
          <pointLight intensity={analysisMode ? 1.4 : 0.5} color="#DC143C" distance={2.0} />
        </group>

        {/* ══ SIDE HOVER PODS — Wing Engines ══ */}
        {/* Left Pod */}
        <group position={[-0.85, -0.35, -0.05]}>
          {/* Connecting arm */}
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.lightArmor}>
            <cylinderGeometry args={[0.04, 0.04, 0.3, 12]} />
          </mesh>
          {/* Pod body */}
          <mesh material={materials.darkShell}>
            <cylinderGeometry args={[0.12, 0.14, 0.3, 20]} />
          </mesh>
          {/* Pod ring */}
          <mesh position={[0, 0.1, 0]} material={materials.crimsonPlate}>
            <torusGeometry args={[0.13, 0.008, 8, 20]} />
          </mesh>
          {/* Stabilizer fin */}
          <mesh position={[-0.08, 0.05, 0]} rotation={[0, 0, -0.3]} material={materials.lightArmor}>
            <boxGeometry args={[0.14, 0.18, 0.015]} />
          </mesh>
          {/* Pod thruster */}
          <ThrusterFlame position={[0, -0.16, 0]} scale={[0.6, 0.7, 0.6]} color="#00F0FF" active={analysisMode} />
        </group>

        {/* Right Pod */}
        <group ref={rightHandGroupRef} position={[0.85, -0.35, -0.05]}>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.lightArmor}>
            <cylinderGeometry args={[0.04, 0.04, 0.3, 12]} />
          </mesh>
          <mesh material={materials.darkShell}>
            <cylinderGeometry args={[0.12, 0.14, 0.3, 20]} />
          </mesh>
          <mesh position={[0, 0.1, 0]} material={materials.crimsonPlate}>
            <torusGeometry args={[0.13, 0.008, 8, 20]} />
          </mesh>
          <mesh position={[0.08, 0.05, 0]} rotation={[0, 0, 0.3]} material={materials.lightArmor}>
            <boxGeometry args={[0.14, 0.18, 0.015]} />
          </mesh>
          <ThrusterFlame position={[0, -0.16, 0]} scale={[0.6, 0.7, 0.6]} color="#00F0FF" active={analysisMode} />
        </group>

        {/* ══ BOTTOM MAIN THRUSTER ══ */}
        <group position={[0, -1.15, 0]}>
          <mesh material={materials.chrome}>
            <cylinderGeometry args={[0.15, 0.2, 0.15, 24]} />
          </mesh>
          <mesh position={[0, -0.06, 0]} material={materials.darkShell}>
            <cylinderGeometry args={[0.12, 0.15, 0.06, 20]} />
          </mesh>
          <ThrusterFlame position={[0, -0.1, 0]} scale={[1.0, 1.4, 1.0]} color="#00F0FF" active={analysisMode} />
        </group>

        {/* ══ REAR STABILIZER FINS ══ */}
        <mesh position={[0, 0.15, -0.55]} rotation={[0.15, 0, 0]} material={materials.midArmor}>
          <boxGeometry args={[0.04, 0.4, 0.2]} />
        </mesh>
        <mesh position={[0, 0.15, -0.55]} rotation={[0.15, 0, 0]} material={materials.crimsonPlate}>
          <boxGeometry args={[0.05, 0.015, 0.22]} />
        </mesh>

        {/* ══ FLOATING DATA CRYSTAL ══ */}
        <group ref={floatingDataCoreRef} position={[0.6, 0.9, 0.4]}>
          <EnergyCoreOrb
            radius={0.045}
            detail={3}
            color="#DC143C"
            secondaryColor="#00F0FF"
            intensity={0.6}
            analysisMode={analysisMode}
          />
          <mesh material={materials.whiteGlow}>
            <octahedronGeometry args={[0.045, 0]} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial
              color="#DC143C"
              wireframe
              transparent
              opacity={0.4}
              emissive="#DC143C"
              emissiveIntensity={0.4}
            />
          </mesh>
          <pointLight intensity={analysisMode ? 0.7 : 0.3} color="#DC143C" distance={0.6} />
        </group>

        {/* ══ ORBITING DATA NODES ══ */}
        {spineSignals.map((sd, idx) => (
          <mesh
            key={idx}
            ref={(el) => { spineSignalsRef.current[idx] = el; }}
            position={[0, 0, 0]}
            material={materials.crimsonGlow}
          >
            <sphereGeometry args={[sd.size, 14, 14]} />
          </mesh>
        ))}

        {/* ══ HOLOGRAPHIC ORBIT RINGS ══ */}
        <group ref={platformRef} position={[0, 0, 0]}>
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[1.3, 0.008, 8, 64]} />
            <meshBasicMaterial color="#DC143C" transparent opacity={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0.3, 0]}>
            <torusGeometry args={[1.6, 0.006, 8, 64]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.1} />
          </mesh>
        </group>

      </group>
    </group>
  );
}
