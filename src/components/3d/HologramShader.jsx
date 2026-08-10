import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * HOLOGRAM SHADER — Animated scanline + chromatic aberration visor effect.
 * Creates a futuristic HUD-like appearance on the robot's visor faceplate.
 */

const hologramVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vWorldNormal;

  void main() {
    vUv = uv;
    vPosition = position;
    vWorldNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const hologramFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vWorldNormal;

  void main() {
    // Animated scanlines
    float scanline = sin(vUv.y * 120.0 + uTime * 8.0) * 0.5 + 0.5;
    scanline = smoothstep(0.3, 0.7, scanline);

    // Horizontal data streams
    float dataStream = sin(vUv.x * 40.0 - uTime * 12.0) * 0.5 + 0.5;
    dataStream = step(0.92, dataStream);

    // Fresnel rim glow for holographic edge
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vWorldNormal, viewDir), 0.0), 2.5);

    // Chromatic shift — slight color separation
    vec3 baseColor = uColor;
    vec3 shiftR = baseColor * vec3(1.2, 0.8, 0.8);
    vec3 shiftB = baseColor * vec3(0.8, 0.8, 1.3);
    vec3 chromatic = mix(shiftR, shiftB, vUv.x + sin(uTime * 2.0) * 0.1);

    // Combine effects
    vec3 color = chromatic * (0.4 + scanline * 0.4 + dataStream * 0.8);
    color += fresnel * uColor * 1.8 * uIntensity;

    // Flickering glitch effect (occasional)
    float glitch = step(0.97, sin(uTime * 15.0 + vUv.y * 50.0));
    color += glitch * vec3(1.0, 0.2, 0.3) * 0.6;

    // Alpha
    float alpha = 0.75 + fresnel * 0.25 + scanline * 0.05;
    alpha = clamp(alpha * uIntensity, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

export function HologramVisorMaterial({ color = '#DC143C', intensity = 1.0, analysisMode = false }) {
  const materialRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: intensity },
    uColor: { value: new THREE.Color(color) },
  }), [color, intensity]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      const target = analysisMode ? 2.0 : intensity;
      materialRef.current.uniforms.uIntensity.value +=
        (target - materialRef.current.uniforms.uIntensity.value) * 0.1;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={hologramVertexShader}
      fragmentShader={hologramFragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.FrontSide}
      depthWrite={false}
    />
  );
}
