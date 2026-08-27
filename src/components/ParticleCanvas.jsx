import React, { useRef, useEffect } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w, h, pts = [];
    let animationFrameId;

    function size() {
      w = canvas.width = window.innerWidth * window.devicePixelRatio;
      h = canvas.height = window.innerHeight * window.devicePixelRatio;
      pts = Array.from({ length: Math.min(90, window.innerWidth / 14) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        v: (0.08 + Math.random() * 0.18) * window.devicePixelRatio,
      }));
    }

    size();
    window.addEventListener('resize', size);

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(77, 124, 255, 0.14)';
      ctx.lineWidth = window.devicePixelRatio;

      pts.forEach((p, i) => {
        p.y -= p.v;
        if (p.y < 0) p.y = h;

        for (let j = i + 1; j < pts.length; j++) {
          let q = pts[j];
          let dx = p.x - q.x;
          let dy = p.y - q.y;
          let ds = dx * dx + dy * dy;
          if (ds < (150 * window.devicePixelRatio) ** 2) {
            ctx.globalAlpha = 1 - Math.sqrt(ds) / (150 * window.devicePixelRatio);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        ctx.globalAlpha = 1;
        ctx.fillStyle = '#4d7cff';
        ctx.fillRect(p.x, p.y, 1.5 * window.devicePixelRatio, 1.5 * window.devicePixelRatio);
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', size);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="field" ref={canvasRef} />;
}
