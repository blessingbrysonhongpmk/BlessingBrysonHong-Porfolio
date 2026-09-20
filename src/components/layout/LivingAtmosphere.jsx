import { useEffect, useRef, memo } from 'react';
import './LivingAtmosphere.css';

/**
 * Digital Chess Table & Card Desk Atmosphere Engine
 *
 * Visual Layers:
 * - Layer 1: Base dark obsidian (#050608) / warm ivory table with subtle perspective board grid
 * - Layer 2: Overhead crimson studio spotlight (#F02D4F) with gentle breathing
 * - Layer 3: Large blurred playing card silhouettes drifting with scroll parallax
 * - Layer 4: Metallic coin/chip circular outlines with specular reflection
 * - Layer 5: Floating environmental chess pieces (♔, ♕, ♗, ♘, ♖, ♙) in safe peripheral zones
 * - Layer 6: Atmospheric micro-dust particles
 *
 * Strictly safe: Never covers hero text, project cards, or interactive forms.
 * Parallax: Subtle scroll-depth and pointer tilt for a physical camera feel.
 */
function CinematicAtmosphereComponent() {
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

    // Smooth parallax state
    let targetMouseX = 0, targetMouseY = 0;
    let currentMouseX = 0, currentMouseY = 0;
    let targetScrollY = window.scrollY || 0;
    let currentScrollY = targetScrollY;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildScene();
      if (prefersReducedMotion) renderOnce();
    };

    const handleMouseMove = (e) => {
      if (isMobile || prefersReducedMotion) return;
      targetMouseX = (e.clientX / width - 0.5) * 40;
      targetMouseY = (e.clientY / height - 0.5) * 40;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scene elements
    let dustParticles = [];
    let chessObjects = [];
    let cardSilhouettes = [];
    let coinRings = [];

    function buildScene() {
      // 1. Atmospheric micro-dust particles (like studio dust in spotlight)
      const count = isMobile ? 22 : 48;
      dustParticles = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: depth * 1.3 + 0.35,
          alpha: depth * 0.28 + 0.06,
          parallax: depth * 0.2,
          scrollParallax: depth * 0.12,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.015,
          driftY: (Math.random() - 0.5) * 0.01,
        };
      });

      if (!isMobile) {
        // 2. Large blurred playing card silhouettes (resting at desk depth)
        cardSilhouettes = [
          {
            xRatio: 0.88,
            yRatio: 0.32,
            width: 140,
            height: 200,
            angle: 0.14, // ~8 deg
            parallax: 0.16,
            scrollParallax: 0.08,
            alpha: 0.045,
            cornerPip: '♠',
          },
          {
            xRatio: 0.08,
            yRatio: 0.72,
            width: 120,
            height: 175,
            angle: -0.18, // ~-10 deg
            parallax: 0.14,
            scrollParallax: 0.07,
            alpha: 0.038,
            cornerPip: '♦',
          },
          {
            xRatio: 0.92,
            yRatio: 0.85,
            width: 110,
            height: 160,
            angle: 0.22,
            parallax: 0.18,
            scrollParallax: 0.09,
            alpha: 0.035,
            cornerPip: '♔',
          }
        ];

        // 3. Environmental Chess Pieces (Safe Zones: outer right flank & bottom corners)
        const CHESS_PIECES = [
          { glyph: '♔', size: 78, depth: 0.065, isAccent: true, xRatio: 0.90, yRatio: 0.16 },
          { glyph: '♕', size: 66, depth: 0.055, isAccent: false, xRatio: 0.76, yRatio: 0.38 },
          { glyph: '♗', size: 54, depth: 0.05, isAccent: false, xRatio: 0.92, yRatio: 0.62 },
          { glyph: '♘', size: 58, depth: 0.055, isAccent: false, xRatio: 0.06, yRatio: 0.86 },
          { glyph: '♙', size: 46, depth: 0.045, isAccent: true, xRatio: 0.18, yRatio: 0.92 },
          { glyph: '♖', size: 50, depth: 0.048, isAccent: false, xRatio: 0.82, yRatio: 0.88 },
        ];

        chessObjects = CHESS_PIECES.map((piece, i) => ({
          ...piece,
          x: piece.xRatio * width,
          y: piece.yRatio * height,
          driftX: (Math.random() - 0.5) * 0.015,
          driftY: (Math.random() - 0.5) * 0.012,
          rotation: (Math.random() - 0.5) * 0.2,
          rotSpeed: (Math.random() - 0.5) * 0.0002,
          parallax: piece.depth * 2.8,
          scrollParallax: piece.depth * 1.6,
          phase: (i / CHESS_PIECES.length) * Math.PI * 2,
        }));

        // 4. Metallic coin/chip circular outlines
        coinRings = [
          {
            cxRatio: 0.84,
            cyRatio: 0.24,
            r: Math.min(width, height) * 0.10,
            tilt: -0.25,
            alpha: 0.05,
            parallax: 0.14,
            scrollParallax: 0.06,
            speed: 0.00025,
            angle: 0,
          },
          {
            cxRatio: 0.22,
            cyRatio: 0.82,
            r: Math.min(width, height) * 0.08,
            tilt: 0.32,
            alpha: 0.04,
            parallax: 0.10,
            scrollParallax: 0.05,
            speed: 0.0002,
            angle: Math.PI * 0.4,
          },
        ];
      } else {
        cardSilhouettes = [];
        chessObjects = [];
        coinRings = [];
      }
    }

    buildScene();

    let time = 0;

    // Helper to draw a playing card silhouette with rounded corners & faint border
    function drawCardSilhouette(ctx, x, y, w, h, angle, alpha, pip, isDark) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const r = 10;
      ctx.beginPath();
      ctx.moveTo(-w / 2 + r, -h / 2);
      ctx.lineTo(w / 2 - r, -h / 2);
      ctx.arcTo(w / 2, -h / 2, w / 2, -h / 2 + r, r);
      ctx.lineTo(w / 2, h / 2 - r);
      ctx.arcTo(w / 2, h / 2, w / 2 - r, h / 2, r);
      ctx.lineTo(-w / 2 + r, h / 2);
      ctx.arcTo(-w / 2, h / 2, -w / 2, h / 2 - r, r);
      ctx.lineTo(-w / 2, -h / 2 + r);
      ctx.arcTo(-w / 2, -h / 2, -w / 2 + r, -h / 2, r);
      ctx.closePath();

      // Card face fill
      ctx.fillStyle = isDark
        ? `rgba(255, 255, 255, ${alpha * 0.28})`
        : `rgba(18, 21, 26, ${alpha * 0.18})`;
      ctx.fill();

      // Card border
      ctx.strokeStyle = isDark
        ? `rgba(244, 243, 239, ${alpha * 0.9})`
        : `rgba(18, 21, 26, ${alpha * 0.7})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner card frame inset
      const inset = 8;
      ctx.beginPath();
      ctx.rect(-w / 2 + inset, -h / 2 + inset, w - inset * 2, h - inset * 2);
      ctx.strokeStyle = isDark
        ? `rgba(240, 45, 79, ${alpha * 0.65})`
        : `rgba(229, 45, 79, ${alpha * 0.55})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Corner pip
      if (pip) {
        ctx.font = '14px serif';
        ctx.fillStyle = isDark
          ? `rgba(244, 243, 239, ${alpha * 1.4})`
          : `rgba(18, 21, 26, ${alpha * 1.1})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pip, -w / 2 + 16, -h / 2 + 16);
      }

      ctx.restore();
    }

    // Helper to draw subtle chess board grid geometry in background
    function drawChessBoardGrid(ctx, isDark, scrollOffset) {
      if (isMobile) return;
      ctx.save();
      const gridY = height * 0.65 - (scrollOffset * 0.04) % 80;
      const gridSize = 80;
      const cols = Math.ceil(width / gridSize) + 1;
      const rows = 6;

      ctx.lineWidth = 0.6;
      ctx.strokeStyle = isDark
        ? 'rgba(244, 243, 239, 0.022)'
        : 'rgba(18, 21, 26, 0.022)';

      for (let r = 0; r < rows; r++) {
        const y = gridY + r * gridSize;
        if (y > height + gridSize || y < -gridSize) continue;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        const x = c * gridSize;
        ctx.beginPath();
        ctx.moveTo(x, Math.max(0, gridY));
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      ctx.restore();
    }

    const renderOnce = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Upper-right crimson spotlight
      const spotX = width * 0.82;
      const spotY = height * 0.18;
      const spotR = Math.min(width, height) * 0.72;
      const spotGrad = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotR);
      const spotAlpha = isDark ? 0.16 : 0.06;
      spotGrad.addColorStop(0, `rgba(240, 45, 79, ${spotAlpha})`);
      spotGrad.addColorStop(0.35, `rgba(240, 45, 79, ${spotAlpha * 0.4})`);
      spotGrad.addColorStop(0.75, `rgba(240, 45, 79, ${spotAlpha * 0.07})`);
      spotGrad.addColorStop(1, 'rgba(240, 45, 79, 0)');
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, width, height);

      drawChessBoardGrid(ctx, isDark, 0);

      dustParticles.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(244, 243, 239, ${s.alpha})`
          : `rgba(133, 140, 152, ${s.alpha * 0.7})`;
        ctx.fill();
      });
    };

    const render = () => {
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;
      currentScrollY += (targetScrollY - currentScrollY) * 0.05;
      time += 0.003;

      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // ── 1. Overhead Crimson Studio Spotlight with Subtle Ambient Pulse ──
      {
        const spotPulse = Math.sin(time * 0.6) * 0.02;
        const spotX = width * 0.82 + currentMouseX * 0.35;
        const spotY = height * 0.18 + currentMouseY * 0.35 - (currentScrollY * 0.03);
        const spotR = Math.min(width, height) * 0.74;
        const spotGrad = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotR);
        const baseAlpha = isDark ? 0.16 : 0.06;
        const currentAlpha = Math.max(0, baseAlpha + spotPulse);

        spotGrad.addColorStop(0, `rgba(240, 45, 79, ${currentAlpha})`);
        spotGrad.addColorStop(0.35, `rgba(240, 45, 79, ${currentAlpha * 0.38})`);
        spotGrad.addColorStop(0.72, `rgba(240, 45, 79, ${currentAlpha * 0.06})`);
        spotGrad.addColorStop(1, 'rgba(240, 45, 79, 0)');
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // ── 2. Perspective Chess Board Grid Lines ──
      drawChessBoardGrid(ctx, isDark, currentScrollY);

      // ── 3. Blurred Playing Card Silhouettes ──
      if (!isMobile) {
        cardSilhouettes.forEach((card) => {
          const cx = card.xRatio * width + currentMouseX * card.parallax;
          const cy = card.yRatio * height + currentMouseY * card.parallax - (currentScrollY * card.scrollParallax);
          // Only draw if within vertical view
          if (cy > -card.height && cy < height + card.height) {
            drawCardSilhouette(ctx, cx, cy, card.width, card.height, card.angle, card.alpha, card.cornerPip, isDark);
          }
        });
      }

      // ── 4. Metallic Coin / Chip Circular Outlines ──
      coinRings.forEach((c) => {
        c.angle += c.speed;
        const cx = c.cxRatio * width + currentMouseX * c.parallax;
        const cy = c.cyRatio * height + currentMouseY * c.parallax - (currentScrollY * c.scrollParallax);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(c.tilt);

        // Outer rim
        ctx.beginPath();
        ctx.ellipse(0, 0, c.r, c.r * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(244, 243, 239, ${c.alpha})`
          : `rgba(133, 140, 152, ${c.alpha * 0.8})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Inner coin medallion ring
        ctx.beginPath();
        ctx.ellipse(0, 0, c.r * 0.74, c.r * 0.40, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(240, 45, 79, ${c.alpha * 0.75})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      });

      // ── 5. Atmospheric Micro-Dust Particles ──
      dustParticles.forEach((s) => {
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const twinkle = Math.sin(time * 40 * s.twinkleSpeed + s.twinklePhase);
        const a = s.alpha * (0.75 + 0.25 * twinkle);
        const sx = s.x + currentMouseX * s.parallax;
        const sy = s.y + currentMouseY * s.parallax - (currentScrollY * s.scrollParallax);

        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(244, 243, 239, ${a})`
          : `rgba(133, 140, 152, ${a * 0.65})`;
        ctx.fill();
      });

      // ── 6. Floating Environmental Chess Pieces ──
      if (!isMobile) {
        chessObjects.forEach((o) => {
          o.x += o.driftX;
          o.y += o.driftY;
          o.rotation += o.rotSpeed;

          const ox = o.x + currentMouseX * o.parallax;
          const oy = o.y + currentMouseY * o.parallax - (currentScrollY * o.scrollParallax);
          const breathe = 0.82 + 0.18 * Math.sin(time * 0.8 + o.phase);

          // Wrap around safely
          if (ox < -120) o.x = width + 100;
          if (ox > width + 120) o.x = -100;

          ctx.save();
          ctx.translate(ox, oy);
          ctx.rotate(o.rotation);
          ctx.font = `${o.size}px "Cinzel", "Times New Roman", serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          if (o.isAccent) {
            ctx.fillStyle = `rgba(240, 45, 79, ${o.depth * 1.5 * breathe})`;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(244, 243, 239, ${o.depth * 1.2 * breathe})`
              : `rgba(18, 21, 26, ${o.depth * 0.85 * breathe})`;
          }

          ctx.fillText(o.glyph, 0, 0);
          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (prefersReducedMotion) {
      renderOnce();
    } else {
      render();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <aside className="universe" aria-hidden="true">
      {/* Upper Right Crimson Cinematic Spotlight */}
      <div className="universe__glow universe__glow--crimson" />
      <div className="universe__glow universe__glow--graphite" />

      {/* Canvas Engine Layer: Chess grid, cards, coins, pieces, dust */}
      <canvas ref={canvasRef} className="universe__canvas" />

      {/* Tactile Micro-Texture Grain Overlay */}
      <div className="universe__grain" />

      {/* Spatial Vignette */}
      <div className="universe__vignette" />
    </aside>
  );
}

export const LivingAtmosphere = memo(CinematicAtmosphereComponent);

