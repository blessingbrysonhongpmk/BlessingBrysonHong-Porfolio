import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { OuterStructure } from './OuterStructure';
import { MechanicalModules } from './MechanicalModules';
import { CoreSystem } from './CoreSystem';
import { DataField } from './DataField';
import { CrimsonSignal } from './CrimsonSignal';

/**
 * "THE INTELLIGENCE ENGINE" —
 * Flagship bespoke 3D computational machine suspended in dark space.
 * Robotics × Artificial Intelligence × Data × Engineering × Experimentation
 */
export function IntelligenceEngine({ tier = 'high', isMobile = false }) {
  const groupRef = useRef();
  const scrollProgress = useScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 });
  const timeRef = useRef(0);

  // Click Discovery Mode: ANALYSIS MODE
  const [isAnalysisMode, setIsAnalysisMode] = useState(false);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (!isAnalysisMode) {
      setIsAnalysisMode(true);
      setTimeout(() => setIsAnalysisMode(false), 1400); // 1.4s temporary discovery pulse
    }
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta;
    const time = timeRef.current;

    // Mouse parallax with spring physics
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

    // Target position interpolation: x = 2.0 (right 60-70% viewport), y = 0, z = 0
    const targetX = isMobile ? 0 : THREE.MathUtils.lerp(2.0, -1.8, scrollProgress * 2.2);
    const targetY = THREE.MathUtils.lerp(0, 0.4, scrollProgress);
    const targetZ = THREE.MathUtils.lerp(0, -2.0, scrollProgress);

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;

    // Overall machine parallax & idle rotation
    groupRef.current.rotation.y = time * 0.07 + mouseRef.current.x * 0.28;
    groupRef.current.rotation.x = Math.sin(time * 0.04) * 0.1 - mouseRef.current.y * 0.28;
  });

  return (
    <group
      ref={groupRef}
      position={isMobile ? [0, 0, -1] : [2.0, 0, 0]}
      onPointerDown={handlePointerDown}
    >
      {/* High-Contrast Cinematic Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={3.0} color="#FFFFFF" />
      <pointLight position={[0, 0, 0]} intensity={isAnalysisMode ? 7.5 : 5.0} color="#DC143C" distance={7} />
      <pointLight position={[-4, -3, 2]} intensity={2.5} color="#3B82F6" distance={7} />

      {/* Layer 01 — Outer Structural Rings */}
      <OuterStructure isAnalysisMode={isAnalysisMode} />

      {/* Layer 02 — Mechanical Computational Modules */}
      <MechanicalModules isAnalysisMode={isAnalysisMode} />

      {/* Layer 03 & 05 — Central Intelligence Core */}
      <CoreSystem isAnalysisMode={isAnalysisMode} />

      {/* Layer 04 — Ambient Data Node Field */}
      <DataField tier={tier} isMobile={isMobile} />

      {/* Crimson Traveling Signal */}
      <CrimsonSignal isAnalysisMode={isAnalysisMode} />
    </group>
  );
}
