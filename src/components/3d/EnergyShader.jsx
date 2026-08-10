import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ENERGY SHADER — Custom GLSL plasma/energy material.
 * Creates a pulsating, distorted energy field with radial glow,
 * animated noise patterns, and reactive intensity.
 */

const energyVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;

  // Simplex-style noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 perm(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float noise(vec3 p) {
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);
    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);
    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));
    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    return o4.y * d.y + o4.x * (1.0 - d.y);
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // Displacement based on noise
    float n = noise(position * 2.5 + uTime * 0.8);
    float displacement = n * 0.12 * uIntensity;
    vDisplacement = displacement;

    vec3 newPos = position + normal * displacement;
    vPosition = newPos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const energyFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColor;
  uniform vec3 uSecondaryColor;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;

  void main() {
    // Fresnel rim glow
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);

    // Pulsating energy pattern
    float pulse = sin(uTime * 3.0) * 0.5 + 0.5;
    float energyWave = sin(vPosition.y * 8.0 + uTime * 4.0) * 0.5 + 0.5;
    float energySpiral = sin(atan(vPosition.z, vPosition.x) * 5.0 + uTime * 2.5) * 0.5 + 0.5;

    // Mix primary and secondary colors with energy patterns
    vec3 color = mix(uColor, uSecondaryColor, energyWave * 0.6);
    color += fresnel * uColor * 2.0 * uIntensity;
    color += energySpiral * uSecondaryColor * 0.3;

    // Core glow intensity
    float coreGlow = smoothstep(0.0, 0.5, vDisplacement * 8.0 + pulse * 0.3) * uIntensity;
    color += coreGlow * uColor * 1.5;

    // Alpha with fresnel edge
    float alpha = 0.7 + fresnel * 0.3 + pulse * 0.1;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

export function EnergyCoreMaterial({ color = '#DC143C', secondaryColor = '#FF6B35', intensity = 1.0, analysisMode = false }) {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: intensity },
    uColor: { value: new THREE.Color(color) },
    uSecondaryColor: { value: new THREE.Color(secondaryColor) },
  }), [color, secondaryColor, intensity]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      const targetIntensity = analysisMode ? 2.5 : intensity;
      materialRef.current.uniforms.uIntensity.value +=
        (targetIntensity - materialRef.current.uniforms.uIntensity.value) * 0.1;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={energyVertexShader}
      fragmentShader={energyFragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.DoubleSide}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
}

/**
 * Ready-to-use Energy Core mesh with the custom shader applied.
 */
export function EnergyCoreOrb({ radius = 0.18, detail = 4, color, secondaryColor, intensity, analysisMode, ...props }) {
  return (
    <mesh {...props}>
      <icosahedronGeometry args={[radius, detail]} />
      <EnergyCoreMaterial
        color={color}
        secondaryColor={secondaryColor}
        intensity={intensity}
        analysisMode={analysisMode}
      />
    </mesh>
  );
}
