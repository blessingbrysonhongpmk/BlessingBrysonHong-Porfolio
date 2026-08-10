import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EnergyCoreOrb } from './EnergyShader';
import { HologramVisorMaterial } from './HologramShader';
import { EnergyTendrils } from './EnergyTendrils';
import { ParticleAura } from './ParticleAura';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * ThrusterFlame — Animated plasma thruster exhaust cone for flying flight dynamics.
 */
function ThrusterFlame({ position = [0, 0, 0], scale = [1, 1, 1], color = '#00F0FF', active = false }) {
  const flameRef = useRef();

  useFrame(() => {
    if (flameRef.current) {
      const pulse = 0.85 + Math.random() * 0.3 + (active ? 0.6 : 0);
      flameRef.current.scale.set(scale[0] * (0.9 + Math.random() * 0.2), scale[1] * pulse, scale[2] * (0.9 + Math.random() * 0.2));
    }
  });

  return (
    <group position={position}>
      <mesh ref={flameRef} position={[0, -scale[1] * 0.5, 0]}>
        <coneGeometry args={[0.12, scale[1], 16, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, -scale[1] * 0.3, 0]}>
        <coneGeometry args={[0.06, scale[1] * 0.6, 12, 1, true]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight position={[0, -scale[1] * 0.4, 0]} intensity={active ? 2.5 : 1.2} color={color} distance={1.8} />
    </group>
  );
}

/**
 * HumanoidHand — Detailed 5-fingered hand assembly (Thumb, Index, Middle, Ring, Pinky).
 */
function HumanoidHand({ isRight = false, materials }) {
  const fingerConfigs = [
    { name: 'thumb', x: isRight ? -0.065 : 0.065, y: -0.01, z: 0.04, rotZ: isRight ? 0.6 : -0.6, len: 0.045 },
    { name: 'index', x: isRight ? -0.04 : 0.04, y: 0.02, z: 0.09, rotZ: 0, len: 0.055 },
    { name: 'middle', x: isRight ? -0.015 : 0.015, y: 0.02, z: 0.1, rotZ: 0, len: 0.06 },
    { name: 'ring', x: isRight ? 0.015 : -0.015, y: 0.02, z: 0.095, rotZ: 0, len: 0.055 },
    { name: 'pinky', x: isRight ? 0.04 : -0.04, y: 0.02, z: 0.08, rotZ: 0, len: 0.045 },
  ];

  return (
    <group>
      {/* Palm Base Chassis */}
      <mesh material={materials.graphite}>
        <boxGeometry args={[0.13, 0.04, 0.13]} />
      </mesh>
      {/* Backhand Armor Plate */}
      <mesh position={[0, -0.025, 0]} material={materials.crimsonAccent}>
        <boxGeometry args={[0.14, 0.012, 0.14]} />
      </mesh>
      {/* Palm Central Repulsor / Sensor Core */}
      <mesh position={[0, 0.022, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.cyanGlow}>
        <cylinderGeometry args={[0.04, 0.04, 0.008, 24]} />
      </mesh>

      {/* 5 Articulated Humanoid Fingers */}
      {fingerConfigs.map((f) => (
        <group key={f.name} position={[f.x, f.y, f.z]} rotation={[0, 0, f.rotZ]}>
          {/* Knuckle Joint Sphere */}
          <mesh material={materials.silverChrome}>
            <sphereGeometry args={[0.014, 12, 12]} />
          </mesh>
          {/* Proximal Phalance */}
          <mesh position={[0, 0, f.len * 0.3]} material={materials.brushedTitanium}>
            <boxGeometry args={[0.016, 0.014, f.len * 0.55]} />
          </mesh>
          {/* Middle Joint Pin */}
          <mesh position={[0, 0, f.len * 0.6]} material={materials.silverChrome}>
            <sphereGeometry args={[0.011, 10, 10]} />
          </mesh>

          {/* Distal Phalange / Fingertip */}
          <mesh position={[0, 0, f.len * 0.85]} material={materials.crimsonAccent}>
            <boxGeometry args={[0.014, 0.012, f.len * 0.4]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * "BBH ORIGINAL AI ENGINEERING ROBOT — HUMANOID FLYING EDITION"
 * 
 * Fully featured humanoid anatomy:
 * - Head with Faceplate, Eye Visor, Nose Bridge, Mouth Slit & Jawline.
 * - Humanoid Neck, Clavicles, Pectorals, 6-Pack Abs, Spine.
 * - Humanoid Arms & 5-Fingered Articulated Hands (Thumb, Index, Middle, Ring, Pinky).
 * - Humanoid Thighs, Knees, Calves, Ankles, Feet.
 * - Flying Hover Physics with Plasma Foot/Back Thrusters.
 * - Cleaned up background (Zero Saturn-like rings).
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
    if (onPointerDown) {
      onPointerDown();
    }
  };

  const materials = useMemo(() => {
    return {
      graphite: new THREE.MeshStandardMaterial({
        color: '#1A1E24',
        metalness: 0.85,
        roughness: 0.35,
      }),
      blackMetal: new THREE.MeshStandardMaterial({
        color: '#0A0D12',
        metalness: 0.92,
        roughness: 0.22,
      }),
      brushedTitanium: new THREE.MeshStandardMaterial({
        color: '#2F3642',
        metalness: 0.94,
        roughness: 0.18,
      }),
      darkSteel: new THREE.MeshStandardMaterial({
        color: '#12161E',
        metalness: 0.88,
        roughness: 0.3,
      }),
      silverChrome: new THREE.MeshStandardMaterial({
        color: '#8291A0',
        metalness: 0.96,
        roughness: 0.12,
      }),
      crimsonAccent: new THREE.MeshStandardMaterial({
        color: '#DC143C',
        metalness: 0.75,
        roughness: 0.25,
        emissive: '#5A000E',
        emissiveIntensity: 0.45,
      }),
      crimsonGlow: new THREE.MeshBasicMaterial({
        color: '#FF1E27',
      }),
      cyanGlow: new THREE.MeshBasicMaterial({
        color: '#00F0FF',
      }),
      whiteGlow: new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
    };
  }, []);

  const spineSignalCount = tier === 'high' ? 5 : 3;
  const spineSignals = useMemo(() => {
    return Array.from({ length: spineSignalCount }, (_, i) => ({
      offset: (i / spineSignalCount) * Math.PI * 2,
      speed: 1.2 + i * 0.4,
      size: 0.035 - i * 0.004,
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

    const hoverSwayY = Math.sin(time * 2.0) * 0.06;
    const flightPitchX = Math.sin(time * 1.5) * 0.035 - mouseRef.current.y * 0.15;
    const flightRollZ = Math.cos(time * 1.8) * 0.025 - mouseRef.current.vx * 0.4;

    let targetX = 2.75;
    let targetY = -0.15 + hoverSwayY;
    let targetZ = -0.15;
    let targetRotY = 0.25;

    if (isMobile) {
      targetX = 0;
      targetY = -2.55 + hoverSwayY;
      targetZ = -0.6;
      targetRotY = 0;
    } else {
      if (scrollProgress < 0.2) {
        const t = scrollProgress / 0.2;
        targetX = THREE.MathUtils.lerp(2.75, -1.8, t);
        targetY = THREE.MathUtils.lerp(-0.15, 0.25, t) + hoverSwayY;
        targetZ = THREE.MathUtils.lerp(-0.15, -0.5, t);
        targetRotY = THREE.MathUtils.lerp(0.25, -0.3, t);
      } else if (scrollProgress < 0.45) {
        const t = (scrollProgress - 0.2) / 0.25;
        targetX = THREE.MathUtils.lerp(-1.8, 1.8, t);
        targetY = THREE.MathUtils.lerp(0.25, 0.65, t) + hoverSwayY;
        targetZ = THREE.MathUtils.lerp(-0.5, -1.2, t);
        targetRotY = THREE.MathUtils.lerp(-0.3, 0.4, t);
      } else if (scrollProgress < 0.75) {
        const t = (scrollProgress - 0.45) / 0.3;
        targetX = THREE.MathUtils.lerp(1.8, -1.6, t);
        targetY = THREE.MathUtils.lerp(0.65, -0.15, t) + hoverSwayY;
        targetZ = THREE.MathUtils.lerp(-1.2, -0.8, t);
        targetRotY = THREE.MathUtils.lerp(0.4, -0.2, t);
      } else {
        const t = (scrollProgress - 0.75) / 0.25;
        targetX = THREE.MathUtils.lerp(-1.6, 1.6, t);
        targetY = THREE.MathUtils.lerp(-0.15, -0.05, t) + hoverSwayY;
        targetZ = THREE.MathUtils.lerp(-0.8, 0.0, t);
        targetRotY = THREE.MathUtils.lerp(-0.2, 0.3, t);
      }
    }

    robotGroupRef.current.position.x += (targetX - robotGroupRef.current.position.x) * 0.06;
    robotGroupRef.current.position.y += (targetY - robotGroupRef.current.position.y) * 0.06;
    robotGroupRef.current.position.z += (targetZ - robotGroupRef.current.position.z) * 0.06;

    const awarenessBoost = analysisMode ? 0.4 : mouseRef.current.proximity * 0.15;
    const bodyRotY = targetRotY + mouseRef.current.x * 0.2;
    robotGroupRef.current.rotation.y += (bodyRotY - robotGroupRef.current.rotation.y) * 0.05;
    robotGroupRef.current.rotation.x = flightPitchX;
    robotGroupRef.current.rotation.z = flightRollZ;

    if (headRef.current) {
      const talkPulse = (isSpeaking && speechAmplitudeRef?.current) ? speechAmplitudeRef.current * 0.08 : 0;
      headRef.current.rotation.y = mouseRef.current.x * 0.35;
      headRef.current.rotation.x = -mouseRef.current.y * 0.22 + Math.sin(time * 15) * talkPulse;
    }

    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(time * 2.5) * 0.05;
    }

    if (floatingDataCoreRef.current) {
      const floatY = 1.15 + Math.sin(time * 2.2) * 0.04;
      floatingDataCoreRef.current.position.y = floatY;
      floatingDataCoreRef.current.rotation.y = time * 1.2;
      floatingDataCoreRef.current.rotation.x = time * 0.7;
      floatingCorePos.current = [
        floatingDataCoreRef.current.position.x,
        floatY,
        floatingDataCoreRef.current.position.z,
      ];
    }

    if (chestCoreRef.current) {
      const speed = analysisMode ? 4.5 : 1.0 + awarenessBoost * 2.0;
      chestCoreRef.current.rotation.z += delta * 0.8 * speed;
      const pulse = 1 + Math.sin(time * 3 + awarenessBoost * 4) * (0.05 + awarenessBoost * 0.08);
      chestCoreRef.current.scale.setScalar(pulse);
    }

    if (platformRef.current) {
      platformRef.current.rotation.z = time * 0.06;
    }

    spineSignalsRef.current.forEach((signalMesh, idx) => {
      if (!signalMesh) return;
      const sd = spineSignals[idx];
      const speed = analysisMode ? sd.speed * 2.5 : sd.speed * (1 + awarenessBoost);
      const t = time * speed + sd.offset;
      const spineY = 0.65 - (Math.sin(t * 1.5) * 0.5 + 0.5) * 1.3;
      signalMesh.position.y = spineY;
      signalMesh.position.z = -0.36 + Math.cos(t * 3) * 0.03;
      const pulse = 1 + Math.sin(t * 4) * 0.3;
      signalMesh.scale.setScalar(pulse);
    });
  });

  const palmPos = [-0.55, 1.05, 0.65];
  const nexusPos = [0.03, 1.15, 0.65];

  return (
    <group
      ref={robotGroupRef}
      position={isMobile ? [0, -2.55, -0.6] : [2.05, -0.15, -0.15]}
      onPointerDown={handlePointerDown}
    >
      {/* ═══ LIGHTING ═══ */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={2.6} color="#FFFFFF" />
      <directionalLight position={[-4, 2, -2]} intensity={1.4} color="#DC143C" />
      <pointLight position={[0, 0.4, 2.0]} intensity={1.5} color="#DC143C" distance={5} />
      <pointLight position={[-2, 1, 1]} intensity={1.0} color="#2F3642" distance={5} />
      <pointLight position={[1, 2, -3]} intensity={1.2} color="#00F0FF" distance={5} />

      {/* ═══ BULKY HUMANOID FLYING MECH ASSEMBLY ═══ */}
      <group scale={[1.05, 1.05, 1.05]}>

        {/* ── 1. HUMANOID HEAD (FACE, EYES, NOSE BRIDGE & MOUTH) ── */}
        <group ref={headRef} position={[0, 1.75, 0]}>
          {/* Main Skull Cranium */}
          <mesh position={[0, 0.14, -0.02]} material={materials.graphite}>
            <boxGeometry args={[0.38, 0.3, 0.34]} />
          </mesh>
          {/* Crown Ridge */}
          <mesh position={[0, 0.28, 0.0]} material={materials.brushedTitanium}>
            <boxGeometry args={[0.12, 0.04, 0.34]} />
          </mesh>

          {/* Sculpted Humanoid Cheekbones */}
          <mesh position={[-0.14, 0.04, 0.14]} material={materials.blackMetal}>
            <boxGeometry args={[0.08, 0.12, 0.06]} />
          </mesh>
          <mesh position={[0.14, 0.04, 0.14]} material={materials.blackMetal}>
            <boxGeometry args={[0.08, 0.12, 0.06]} />
          </mesh>

          {/* Sculpted Nose Bridge */}
          <mesh position={[0, 0.06, 0.18]} material={materials.brushedTitanium}>
            <boxGeometry args={[0.04, 0.08, 0.03]} />
          </mesh>

          {/* ── EXPLICIT HUMANOID MOUTH & JAWLINE ── */}
          {/* Articulated Mechanical Jaw Plate */}
          <mesh position={[0, -0.06, 0.15]} material={materials.darkSteel}>
            <boxGeometry args={[0.22, 0.08, 0.08]} />
          </mesh>

          {/* Illuminated Speaker Slit / Mouth Opening */}
          <mesh position={[0, -0.035, 0.185]} material={materials.crimsonGlow}>
            <boxGeometry args={[0.12, 0.012, 0.008]} />
          </mesh>
          {/* Upper & Lower Mechanical Lip Contours */}
          <mesh position={[0, -0.025, 0.182]} material={materials.blackMetal}>
            <boxGeometry args={[0.14, 0.008, 0.01]} />
          </mesh>
          <mesh position={[0, -0.048, 0.182]} material={materials.blackMetal}>
            <boxGeometry args={[0.13, 0.008, 0.01]} />
          </mesh>

          {/* Crimson Side Jaw Accent Plates */}
          <mesh position={[-0.18, 0.08, 0.02]} material={materials.crimsonAccent}>
            <boxGeometry args={[0.04, 0.22, 0.3]} />
          </mesh>
          <mesh position={[0.18, 0.08, 0.02]} material={materials.crimsonAccent}>
            <boxGeometry args={[0.04, 0.22, 0.3]} />
          </mesh>

          {/* ── EYE SLIT VISOR ── */}
          <group position={[0, 0.11, 0.18]}>
            <mesh position={[0, 0, 0]} material={materials.crimsonGlow}>
              <boxGeometry args={[0.24, 0.028, 0.015]} />
            </mesh>
            <mesh position={[0, 0, 0.002]} material={materials.whiteGlow}>
              <boxGeometry args={[0.09, 0.016, 0.012]} />
            </mesh>
            <pointLight position={[0, 0, 0.04]} intensity={0.8} color="#FF1E27" distance={0.6} />
          </group>

          <mesh position={[0, 0.11, 0.185]}>
            <boxGeometry args={[0.26, 0.035, 0.005]} />
            <HologramVisorMaterial
              color="#DC143C"
              intensity={1.0}
              analysisMode={analysisMode}
            />
          </mesh>

          {/* Humanoid Ear Structures */}
          <mesh position={[-0.2, 0.08, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.brushedTitanium}>
            <cylinderGeometry args={[0.065, 0.065, 0.035, 24]} />
          </mesh>
          <mesh position={[0.2, 0.08, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.brushedTitanium}>
            <cylinderGeometry args={[0.065, 0.065, 0.035, 24]} />
          </mesh>

          <group ref={antennaRef} position={[0.11, 0.27, -0.05]}>
            <mesh material={materials.silverChrome}>
              <cylinderGeometry args={[0.006, 0.004, 0.15, 8]} />
            </mesh>
            <mesh position={[0, 0.08, 0]} material={materials.cyanGlow}>
              <sphereGeometry args={[0.013, 12, 12]} />
            </mesh>
          </group>
        </group>

        {/* ── 2. HUMANOID NECK & THROAT HYDRAULICS ── */}
        <group position={[0, 1.48, 0]}>
          <mesh material={materials.darkSteel}>
            <cylinderGeometry args={[0.09, 0.12, 0.16, 24]} />
          </mesh>
          {/* Throat / Adam's Apple Cylinder */}
          <mesh position={[0, 0.02, 0.08]} material={materials.silverChrome}>
            <cylinderGeometry args={[0.02, 0.02, 0.08, 12]} />
          </mesh>
          <mesh position={[0, 0.05, 0.07]} material={materials.crimsonAccent}>
            <boxGeometry args={[0.16, 0.03, 0.03]} />
          </mesh>
          <mesh position={[-0.09, 0, 0]} material={materials.silverChrome}>
            <cylinderGeometry args={[0.016, 0.016, 0.14, 12]} />
          </mesh>
          <mesh position={[0.09, 0, 0]} material={materials.silverChrome}>
            <cylinderGeometry args={[0.016, 0.016, 0.14, 12]} />
          </mesh>
        </group>

        {/* ── 3. HUMANOID TORSO (CLAVICLES, PECTORALS, 6-PACK ABS) ── */}
        <group position={[0, 0.75, 0]}>
          {/* Main Upper Torso Chassis */}
          <mesh position={[0, 0.24, 0]} material={materials.graphite}>
            <boxGeometry args={[0.92, 0.7, 0.54]} />
          </mesh>

          {/* Sculpted Clavicles (Collarbones) */}
          <mesh position={[-0.24, 0.58, 0.16]} rotation={[0, 0, -0.1]} material={materials.silverChrome}>
            <cylinderGeometry args={[0.018, 0.018, 0.38, 12]} />
          </mesh>
          <mesh position={[0.24, 0.58, 0.16]} rotation={[0, 0, 0.1]} material={materials.silverChrome}>
            <cylinderGeometry args={[0.018, 0.018, 0.38, 12]} />
          </mesh>

          {/* Left & Right Pectoral Muscle Plates */}
          <mesh position={[-0.23, 0.38, 0.23]} material={materials.blackMetal}>
            <boxGeometry args={[0.36, 0.24, 0.11]} />
          </mesh>
          <mesh position={[0.23, 0.38, 0.23]} material={materials.blackMetal}>
            <boxGeometry args={[0.36, 0.24, 0.11]} />
          </mesh>

          {/* Crimson Center Sternum Strip */}
          <mesh position={[0, 0.44, 0.24]} material={materials.crimsonAccent}>
            <boxGeometry args={[0.08, 0.3, 0.02]} />
          </mesh>

          {/* AI Computational Core Reactor */}
          <group ref={chestCoreRef} position={[0, 0.28, 0.29]}>
            <mesh material={materials.brushedTitanium}>
              <torusGeometry args={[0.19, 0.024, 24, 48]} />
            </mesh>
            <mesh material={materials.blackMetal}>
              <torusGeometry args={[0.14, 0.011, 16, 36]} />
            </mesh>

            <EnergyCoreOrb
              radius={0.065}
              detail={3}
              color="#DC143C"
              secondaryColor="#FF6B35"
              intensity={0.9}
              analysisMode={analysisMode}
            />

            <mesh>
              <circleGeometry args={[0.11, 6]} />
              <meshBasicMaterial color="#FF1E27" wireframe />
            </mesh>

            <pointLight intensity={analysisMode ? 1.8 : 0.7} color="#DC143C" distance={2.2} />
          </group>

          {/* ── 6-PACK ABDOMINAL PLATES ── */}
          {[-0.04, -0.15, -0.26].map((yPos, i) => (
            <group key={i} position={[0, yPos, 0.04]}>
              {/* Left Ab Segment */}
              <mesh position={[-0.14, 0, 0.23]} material={materials.brushedTitanium}>
                <boxGeometry args={[0.22 - i * 0.02, 0.07, 0.04]} />
              </mesh>
              {/* Right Ab Segment */}
              <mesh position={[0.14, 0, 0.23]} material={materials.brushedTitanium}>
                <boxGeometry args={[0.22 - i * 0.02, 0.07, 0.04]} />
              </mesh>
              {/* Abdominal Line Seams */}
              <mesh position={[0, 0, 0.235]} material={materials.blackMetal}>
                <boxGeometry args={[0.02, 0.07, 0.03]} />
              </mesh>
            </group>
          ))}

          {/* Back Flight Pack */}
          <group position={[0, 0.15, -0.3]}>
            <mesh material={materials.darkSteel}>
              <boxGeometry args={[0.52, 0.58, 0.18]} />
            </mesh>
            <mesh position={[-0.19, -0.26, 0]} material={materials.brushedTitanium}>
              <cylinderGeometry args={[0.095, 0.11, 0.2, 20]} />
            </mesh>
            <ThrusterFlame position={[-0.19, -0.36, 0]} scale={[1, 1.4, 1]} color="#00F0FF" active={analysisMode} />

            <mesh position={[0.19, -0.26, 0]} material={materials.brushedTitanium}>
              <cylinderGeometry args={[0.095, 0.11, 0.2, 20]} />
            </mesh>
            <ThrusterFlame position={[0.19, -0.36, 0]} scale={[1, 1.4, 1]} color="#00F0FF" active={analysisMode} />

            {spineSignals.map((sd, idx) => (
              <mesh
                key={idx}
                ref={(el) => { spineSignalsRef.current[idx] = el; }}
                position={[0, 0.2, 0]}
                material={materials.crimsonGlow}
              >
                <sphereGeometry args={[sd.size, 16, 16]} />
              </mesh>
            ))}
          </group>
        </group>

        {/* ── 4. HUMANOID ARMS & 5-FINGERED HANDS ── */}
        {/* Left Arm */}
        <group position={[-0.54, 1.1, 0]}>
          {/* Shoulder Pauldron */}
          <group position={[-0.09, 0.02, 0]} rotation={[0, 0, 0.2]}>
            <mesh material={materials.graphite}>
              <boxGeometry args={[0.36, 0.22, 0.42]} />
            </mesh>
            <mesh position={[0, 0.11, 0]} material={materials.crimsonAccent}>
              <boxGeometry args={[0.38, 0.025, 0.44]} />
            </mesh>
          </group>

          {/* Bicep */}
          <mesh position={[-0.11, -0.32, 0]} material={materials.blackMetal}>
            <cylinderGeometry args={[0.11, 0.095, 0.42, 20]} />
          </mesh>
          {/* Elbow Joint */}
          <mesh position={[-0.11, -0.56, 0]} material={materials.silverChrome}>
            <sphereGeometry args={[0.075, 20, 20]} />
          </mesh>

          {/* Forearm */}
          <mesh position={[-0.11, -0.8, 0]} material={materials.graphite}>
            <boxGeometry args={[0.2, 0.4, 0.2]} />
          </mesh>

          {/* 5-Fingered Left Humanoid Hand */}
          <group position={[-0.11, -1.04, 0]} rotation={[0, 0, 0.2]}>
            <HumanoidHand isRight={false} materials={materials} />
          </group>
        </group>

        {/* Right Arm (Raised Stabilizer Palm) */}
        <group ref={rightHandGroupRef} position={[0.54, 1.1, 0]}>
          {/* Shoulder Pauldron */}
          <group position={[0.09, 0.02, 0]} rotation={[0, 0, -0.2]}>
            <mesh material={materials.graphite}>
              <boxGeometry args={[0.36, 0.22, 0.42]} />
            </mesh>
            <mesh position={[0, 0.11, 0]} material={materials.crimsonAccent}>
              <boxGeometry args={[0.38, 0.025, 0.44]} />
            </mesh>
          </group>

          {/* Bicep */}
          <mesh position={[-0.22, -0.2, 0.33]} rotation={[0.9, -0.4, -0.5]} material={materials.blackMetal}>
            <cylinderGeometry args={[0.11, 0.09, 0.44, 20]} />
          </mesh>
          {/* Elbow */}
          <mesh position={[-0.08, -0.12, 0.14]} material={materials.silverChrome}>
            <sphereGeometry args={[0.075, 20, 20]} />
          </mesh>

          {/* 5-Fingered Right Humanoid Hand */}
          <group position={[-0.52, -0.1, 0.62]} rotation={[0.4, 0.2, 0.8]}>
            <HumanoidHand isRight={true} materials={materials} />
            <pointLight position={[0, 0.08, 0]} intensity={1.2} color="#00F0FF" distance={1.2} />
          </group>
        </group>

        {/* Floating Data Core */}
        <group ref={floatingDataCoreRef} position={[0.03, 1.15, 0.65]}>
          <EnergyCoreOrb
            radius={0.06}
            detail={3}
            color="#DC143C"
            secondaryColor="#00F0FF"
            intensity={0.6}
            analysisMode={analysisMode}
          />
          <mesh material={materials.whiteGlow}>
            <octahedronGeometry args={[0.06, 0]} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
              color="#DC143C"
              wireframe
              transparent
              opacity={0.6}
              emissive="#DC143C"
              emissiveIntensity={0.6}
            />
          </mesh>
          {tier !== 'low' && (
            <>
              <mesh position={[0.22, 0, 0]} material={materials.cyanGlow}>
                <sphereGeometry args={[0.015, 8, 8]} />
              </mesh>
              <mesh position={[-0.18, 0.12, 0]} material={materials.crimsonGlow}>
                <sphereGeometry args={[0.012, 8, 8]} />
              </mesh>
            </>
          )}
          <pointLight intensity={analysisMode ? 1.0 : 0.5} color="#DC143C" distance={0.8} />
        </group>

        {/* Energy Tendrils */}
        {tier !== 'low' && (
          <EnergyTendrils
            start={palmPos}
            end={nexusPos}
            count={tier === 'high' ? 6 : 4}
            color="#DC143C"
            analysisMode={analysisMode}
          />
        )}

        {/* ── 5. HUMANOID LEGS & BOOTS ── */}
        <group position={[0, 0.28, 0]}>
          <mesh material={materials.brushedTitanium}>
            <cylinderGeometry args={[0.3, 0.32, 0.18, 32]} />
          </mesh>
          <mesh position={[0, 0.06, 0]} material={materials.crimsonAccent}>
            <torusGeometry args={[0.32, 0.009, 8, 32]} />
          </mesh>
        </group>

        {/* Left Humanoid Leg */}
        <group position={[-0.24, 0.05, 0]}>
          {/* Thigh (Quadriceps) */}
          <mesh position={[0, -0.42, 0]} material={materials.graphite}>
            <cylinderGeometry args={[0.15, 0.12, 0.6, 20]} />
          </mesh>
          <mesh position={[-0.07, -0.42, 0]} material={materials.crimsonAccent}>
            <boxGeometry args={[0.035, 0.52, 0.16]} />
          </mesh>
          {/* Knee Cap (Patella) */}
          <mesh position={[0, -0.74, 0.04]} material={materials.silverChrome}>
            <sphereGeometry args={[0.1, 20, 20]} />
          </mesh>
          {/* Shin & Calf */}
          <mesh position={[0, -1.12, 0]} material={materials.graphite}>
            <boxGeometry args={[0.2, 0.56, 0.2]} />
          </mesh>

          {/* Heavy Boot & Thruster Flame */}
          <group position={[0, -1.46, 0.08]}>
            <mesh material={materials.blackMetal}>
              <boxGeometry args={[0.18, 0.12, 0.34]} />
            </mesh>
            <mesh position={[0, 0.04, 0.08]} material={materials.crimsonAccent}>
              <boxGeometry args={[0.15, 0.01, 0.15]} />
            </mesh>
            <ThrusterFlame position={[0, -0.06, 0]} scale={[1.2, 1.8, 1.2]} color="#00F0FF" active={analysisMode} />
          </group>
        </group>

        {/* Right Humanoid Leg */}
        <group position={[0.24, 0.05, 0.12]}>
          {/* Thigh */}
          <mesh position={[0, -0.42, 0]} material={materials.graphite}>
            <cylinderGeometry args={[0.15, 0.12, 0.6, 20]} />
          </mesh>
          <mesh position={[0.07, -0.42, 0]} material={materials.crimsonAccent}>
            <boxGeometry args={[0.035, 0.52, 0.16]} />
          </mesh>
          {/* Knee Cap */}
          <mesh position={[0, -0.74, 0.04]} material={materials.silverChrome}>
            <sphereGeometry args={[0.1, 20, 20]} />
          </mesh>
          {/* Shin */}
          <mesh position={[0, -1.12, 0]} material={materials.graphite}>
            <boxGeometry args={[0.2, 0.56, 0.2]} />
          </mesh>

          {/* Boot & Thruster Flame */}
          <group position={[0, -1.46, 0.08]}>
            <mesh material={materials.blackMetal}>
              <boxGeometry args={[0.18, 0.12, 0.34]} />
            </mesh>
            <mesh position={[0, 0.04, 0.08]} material={materials.crimsonAccent}>
              <boxGeometry args={[0.15, 0.01, 0.15]} />
            </mesh>
            <ThrusterFlame position={[0, -0.06, 0]} scale={[1.2, 1.8, 1.2]} color="#00F0FF" active={analysisMode} />
          </group>
        </group>

        {/* Ground Energy Field */}
        <group ref={platformRef} position={[0, -1.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <ringGeometry args={[0.6, 0.66, 64]} />
            <meshBasicMaterial color="#DC143C" side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
          <mesh>
            <ringGeometry args={[1.1, 1.15, 64]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[4.5, 4.5]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.6} depthWrite={false} />
          </mesh>
        </group>

      </group>

      {/* Particle Aura */}
      <ParticleAura
        tier={tier}
        isMobile={isMobile}
        analysisMode={analysisMode}
      />
    </group>
  );
}
