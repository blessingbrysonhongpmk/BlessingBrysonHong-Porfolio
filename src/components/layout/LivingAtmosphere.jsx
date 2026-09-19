import { useEffect, useRef, memo } from 'react';
import './LivingAtmosphere.css';

/**
 * Massive Living Atmosphere — Digital Universe Engine
 *
 * Immersive cosmic depth with:
 * - Fluid multi-zone radiant light sheets (crimson + deep celestial glow)
 * - Dynamic canvas with 220 depth-sorted stars + glowing core halos
 * - Orbital rings with revolving satellites
 * - Luminous cosmic dust particles drifting with gentle physics
 * - Subtle floating creative glyphs (chess, AI, code)
 * - 4-layer mouse parallax response
 */
function DigitalUniverseComponent() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    // Mouse parallax
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildScene();
    };

    const handleMouseMove = (e) => {
      if (isMobile || prefersReducedMotion) return;
      targetX = (e.clientX / width - 0.5) * 60;
      targetY = (e.clientY / height - 0.5) * 60;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scene elements
    let stars = [];
    let nebulae = [];
    let objects = [];
    let orbitals = [];

    function buildScene() {
      // 1. Stars: refined, minimal atmospheric depth
      const starCount = isMobile ? 50 : 110;
      stars = Array.from({ length: starCount }, () => {
        const depth = Math.random(); // 0 = far, 1 = near
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: depth * 1.5 + 0.3,
          alpha: depth * 0.4 + 0.1,
          parallax: depth * 0.35,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          drift: (Math.random() - 0.5) * 0.015,
          isGlow: depth > 0.85, // Only the very brightest stars get faint halos
        };
      });

      // 2. Cosmic Nebula Dust Orbs (Very Soft Ambient Light)
      const nebulaCount = isMobile ? 2 : 5;
      nebulae = Array.from({ length: nebulaCount }, (_, i) => ({
        x: (0.2 + (i / nebulaCount) * 0.65) * width,
        y: (0.15 + Math.random() * 0.7) * height,
        radius: (0.2 + Math.random() * 0.2) * Math.min(width, height),
        color: i % 2 === 0 ? 'rgba(225, 29, 72, ' : 'rgba(30, 41, 59, ',
        baseAlpha: 0.04 + Math.random() * 0.03,
        pulseSpeed: 0.001 + Math.random() * 0.0015,
        driftX: (Math.random() - 0.5) * 0.02,
        driftY: (Math.random() - 0.5) * 0.015,
        parallax: 0.15,
      }));

      // 3. Floating creative objects (Peripheral and subtle, never over the name)
      if (!isMobile) {
        const GLYPHS = [
          { glyph: '♟', size: 24, depth: 0.06 },
          { glyph: '♞', size: 30, depth: 0.07 },
          { glyph: '{ }', size: 20, depth: 0.05 },
          { glyph: '⬡', size: 18, depth: 0.05 },
          { glyph: '∑', size: 22, depth: 0.06 },
          { glyph: '</>', size: 16, depth: 0.05 },
          { glyph: '♛', size: 28, depth: 0.07 },
        ];

        // Safe placement: right side or lower viewport, never over the hero name area
        objects = GLYPHS.map((g, i) => {
          const isRight = i % 2 === 0;
          const x = isRight
            ? (0.62 + Math.random() * 0.32) * width
            : (0.05 + Math.random() * 0.35) * width;
          const y = isRight
            ? (0.12 + Math.random() * 0.75) * height
            : (0.68 + Math.random() * 0.26) * height; // if left, only in lower viewport

          return {
            ...g,
            x,
            y,
            driftX: (Math.random() - 0.5) * 0.02,
            driftY: (Math.random() - 0.5) * 0.015,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.0004,
            parallax: g.depth * 2.8,
            phase: (i / GLYPHS.length) * Math.PI * 2,
          };
        });
      }

      // 4. Orbital rings with satellites
      orbitals = isMobile ? [] : [
        {
          cx: width * 0.72,
          cy: height * 0.28,
          rx: width * 0.24,
          ry: height * 0.16,
          rotation: -0.15,
          speed: 0.0004,
          satAngle: 0,
          alpha: 0.05,
          parallax: 0.18,
        },
        {
          cx: width * 0.35,
          cy: height * 0.75,
          rx: width * 0.20,
          ry: height * 0.13,
          rotation: 0.2,
          speed: 0.0003,
          satAngle: Math.PI,
          alpha: 0.04,
          parallax: 0.12,
        },
      ];
    }

    buildScene();

    let time = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      time += 0.003;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // ── Atmospheric Deep Base ──
      {
        const bx = width * 0.5 + currentX * 0.2;
        const by = height * 0.35 + currentY * 0.2;
        const br = Math.max(width, height) * 0.85;
        const bg = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        if (isDark) {
          bg.addColorStop(0, 'rgba(18, 22, 34, 0.75)');
          bg.addColorStop(0.5, 'rgba(9, 11, 16, 0.45)');
          bg.addColorStop(1, 'rgba(6, 6, 8, 0)');
        } else {
          bg.addColorStop(0, 'rgba(235, 238, 245, 0.40)');
          bg.addColorStop(0.6, 'rgba(250, 250, 248, 0.15)');
          bg.addColorStop(1, 'rgba(251, 251, 250, 0)');
        }
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
      }

      // ── Massive Cosmic Crimson Pulse ──
      {
        const px = width * 0.78 + Math.sin(time * 0.35) * 50 + currentX * 0.5;
        const py = height * 0.24 + Math.cos(time * 0.28) * 40 + currentY * 0.5;
        const pr = Math.min(width, height) * 0.75;
        const pg = ctx.createRadialGradient(px, py, 0, px, py, pr);
        const intensity = isDark ? (0.16 + Math.sin(time * 0.5) * 0.03) : 0.07;
        pg.addColorStop(0, `rgba(225, 29, 72, ${intensity})`);
        pg.addColorStop(0.4, `rgba(225, 29, 72, ${intensity * 0.4})`);
        pg.addColorStop(0.75, `rgba(180, 18, 55, ${intensity * 0.08})`);
        pg.addColorStop(1, 'rgba(225, 29, 72, 0)');
        ctx.fillStyle = pg;
        ctx.fillRect(0, 0, width, height);
      }

      // ── Nebula Dust Clouds ──
      nebulae.forEach((n) => {
        n.x += n.driftX;
        n.y += n.driftY;
        if (n.x < -100) n.x = width + 100;
        if (n.x > width + 100) n.x = -100;
        if (n.y < -100) n.y = height + 100;
        if (n.y > height + 100) n.y = -100;

        const nx = n.x + currentX * n.parallax;
        const ny = n.y + currentY * n.parallax;
        const a = n.baseAlpha * (0.8 + 0.2 * Math.sin(time * 20 * n.pulseSpeed));

        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.radius);
        g.addColorStop(0, `${n.color}${a})`);
        g.addColorStop(1, `${n.color}0)`);
        ctx.fillStyle = g;
        ctx.fillRect(nx - n.radius, ny - n.radius, n.radius * 2, n.radius * 2);
      });

      // ── Orbital Paths & Satellites ──
      orbitals.forEach((o) => {
        o.satAngle += o.speed;
        const ox = o.cx + currentX * o.parallax;
        const oy = o.cy + currentY * o.parallax;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(o.rotation);

        // Path
        ctx.beginPath();
        ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(255, 255, 255, ${o.alpha})`
          : `rgba(60, 70, 90, ${o.alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Revolving Satellite
        const sx = Math.cos(o.satAngle) * o.rx;
        const sy = Math.sin(o.satAngle) * o.ry;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(225, 29, 72, 0.7)';
        ctx.shadowColor = 'rgba(225, 29, 72, 0.9)';
        ctx.shadowBlur = 6;
        ctx.fill();

        ctx.restore();
      });

      // ── Stars ──
      stars.forEach((s) => {
        s.x += s.drift;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        const twinkle = Math.sin(time * 60 * s.twinkleSpeed + s.twinklePhase);
        const a = s.alpha * (0.65 + 0.35 * twinkle);
        const sx = s.x + currentX * s.parallax;
        const sy = s.y + currentY * s.parallax;

        if (s.isGlow) {
          ctx.beginPath();
          ctx.arc(sx, sy, s.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(225, 29, 72, ${a * 0.25})` : `rgba(225, 29, 72, 0.12)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(230, 235, 245, ${a})`
          : `rgba(50, 60, 80, ${a * 0.55})`;
        ctx.fill();
      });

      // ── Floating Creative Objects ──
      if (!isMobile && !prefersReducedMotion) {
        objects.forEach((o) => {
          o.x += o.driftX;
          o.y += o.driftY;
          o.rotation += o.rotSpeed;

          if (o.x < -80) o.x = width + 80;
          if (o.x > width + 80) o.x = -80;
          if (o.y < -80) o.y = height + 80;
          if (o.y > height + 80) o.y = -80;

          const ox = o.x + currentX * o.parallax;
          const oy = o.y + currentY * o.parallax;
          const breathe = 0.75 + 0.25 * Math.sin(time * 12 * o.rotSpeed * 80 + o.phase);

          ctx.save();
          ctx.translate(ox, oy);
          ctx.rotate(o.rotation);
          ctx.font = `${o.size}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = isDark
            ? `rgba(215, 225, 245, ${o.depth * 0.85 * breathe})`
            : `rgba(60, 70, 90, ${o.depth * 0.45 * breathe})`;
          ctx.fillText(o.glyph, 0, 0);
          ctx.restore();
        });
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <aside className="universe" aria-hidden="true">
      {/* Massive Radiant Fluid Glow Sheets (CSS Layer) */}
      <div className="universe__glow universe__glow--crimson" />
      <div className="universe__glow universe__glow--indigo" />
      <div className="universe__glow universe__glow--warm" />

      {/* Canvas Layer: Depth gradients, 220 stars, nebulae, orbitals, glyphs */}
      <canvas ref={canvasRef} className="universe__canvas" />

      {/* Tactile Micro-Texture Grain */}
      <div className="universe__grain" />

      {/* Spatial Vignette */}
      <div className="universe__vignette" />
    </aside>
  );
}

export const LivingAtmosphere = memo(DigitalUniverseComponent);
