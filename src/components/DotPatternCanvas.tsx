import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const DotPatternCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    active: boolean;
  }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  });

  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Grid spacing & sizing
    const SPACING = 28;
    const MIN_RADIUS = 1.6;
    const MAX_RADIUS = 3.4;
    const SPEED_PX_PER_SEC = 20; // Smooth diagonal drift from left to right

    // High contrast theme palette (clearly visible, exactly like the user's screenshot)
    const BG_COLOR = isDark ? '#080d19' : '#f8f9ff';
    const COLOR_PRIMARY = isDark ? '0, 220, 190' : '0, 194, 168';
    const COLOR_ACCENT = isDark ? '101, 250, 222' : '0, 168, 150';
    const COLOR_HIGHLIGHT = isDark ? '255, 225, 110' : '0, 137, 123';

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 80);
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let isHidden = false;

    // Static fallback
    const renderStatic = () => {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      const cols = Math.ceil(w / SPACING) + 2;
      const rows = Math.ceil(h / SPACING) + 2;

      for (let c = -1; c < cols; c++) {
        const x = c * SPACING;
        for (let r = -1; r < rows; r++) {
          const y = r * SPACING;
          ctx.beginPath();
          ctx.arc(x, y, 2.0, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? 'rgba(0, 220, 190, 0.65)' : 'rgba(0, 194, 168, 0.65)';
          ctx.fill();
        }
      }
    };

    // ── Animated Diagonally Moving Grid with Wave Interference ──
    const draw = (now: number) => {
      if (isHidden) return;

      const t = now * 0.001; // Time in seconds

      // Continuous diagonal movement from left to right (top-left to bottom-right)
      const offsetX = (t * SPEED_PX_PER_SEC) % SPACING;
      const offsetY = (t * SPEED_PX_PER_SEC) % SPACING;

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.1;
        mouse.y += (-1000 - mouse.y) * 0.1;
      }

      // Fill canvas background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      // Two dynamic orbital wave centers creating rich interference ripples
      const src1X = w * 0.30 + Math.cos(t * 0.5) * (w * 0.22);
      const src1Y = h * 0.35 + Math.sin(t * 0.6) * (h * 0.20);

      const src2X = w * 0.70 + Math.sin(t * 0.55) * (w * 0.24);
      const src2Y = h * 0.65 + Math.cos(t * 0.45) * (h * 0.22);

      // Spatial wave constants
      const k1 = 0.024;
      const k2 = 0.022;
      const omega1 = t * 2.0;
      const omega2 = t * 1.7;

      const cols = Math.ceil(w / SPACING) + 2;
      const rows = Math.ceil(h / SPACING) + 2;

      for (let c = -1; c < cols; c++) {
        const x = c * SPACING + offsetX;
        for (let r = -1; r < rows; r++) {
          const y = r * SPACING + offsetY;

          // Distance from the two interference sources
          const d1 = Math.hypot(x - src1X, y - src1Y);
          const d2 = Math.hypot(x - src2X, y - src2Y);

          // Wave Superposition: Constructive & Destructive Interference
          const wave1 = Math.sin(d1 * k1 - omega1);
          const wave2 = Math.sin(d2 * k2 - omega2);

          // Diagonal harmonic plane wave aligned with the motion
          const diagonalWave = Math.sin((x + y) * 0.012 - t * 1.2) * 0.4;

          let interference = (wave1 + wave2 + diagonalWave) / 2.4; // -1 to 1

          // Mouse ripple emitter interaction
          if (mouse.active && mouse.x > 0 && mouse.y > 0) {
            const mDist = Math.hypot(x - mouse.x, y - mouse.y);
            if (mDist < 280) {
              const mWave = Math.sin(mDist * 0.06 - t * 4.0);
              const mDecay = 1 - mDist / 280;
              interference = interference * (1 - mDecay * 0.7) + (mWave * mDecay * 0.85);
            }
          }

          // Normalize interference value (0 = destructive, 1 = constructive)
          const norm = Math.max(0, Math.min(1, (interference + 1) * 0.5));

          // Radius ranges from MIN_RADIUS (1.6px) to MAX_RADIUS (3.4px)
          const radius = MIN_RADIUS + norm * (MAX_RADIUS - MIN_RADIUS);

          // High visibility alpha: 0.42 (minimum) to 0.85 (maximum at peaks)
          const minAlpha = isDark ? 0.38 : 0.42;
          const maxAlpha = isDark ? 0.90 : 0.85;
          const alpha = minAlpha + Math.pow(norm, 1.4) * (maxAlpha - minAlpha);

          // Color selection based on interference peak
          let rgbColor = COLOR_PRIMARY;
          if (norm > 0.75) {
            rgbColor = COLOR_HIGHLIGHT;
          } else if (norm > 0.45) {
            rgbColor = COLOR_ACCENT;
          }

          // Draw the crisp dot
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgbColor}, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      isHidden = document.hidden;
      if (!isHidden && !prefersReducedMotion) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (prefersReducedMotion) {
      renderStatic();
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimer);
    };
  }, [isDark]);

  return (
    <canvas
      id="shader-canvas"
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};
