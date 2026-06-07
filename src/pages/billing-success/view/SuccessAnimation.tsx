import React, { useEffect, useRef } from "react";

// Pure canvas confetti — no external library needed
const SuccessAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#6750A4", "#7965AF", "#B0A0DA", "#4CAF50", "#FFD700", "#FF6B6B"];
    const pieces: {
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
      rot: number;
      speed: number;
      drift: number;
    }[] = [];

    // Create 150 confetti pieces
    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI * 2,
        speed: Math.random() * 3 + 2,
        drift: Math.random() * 2 - 1,
      });
    }

    let animFrame: number;
    let stopped = false;

    const draw = () => {
      if (stopped) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((p) => {
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        p.y += p.speed;
        p.x += p.drift;
        p.rot += 0.05;

        // Reset to top when out of view
        if (p.y > canvas.height) {
          p.y = -p.h;
          p.x = Math.random() * canvas.width;
        }
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    // Stop after 4 seconds
    const stopTimer = setTimeout(() => {
      stopped = true;
      cancelAnimationFrame(animFrame);
    }, 4000);

    return () => {
      stopped = true;
      cancelAnimationFrame(animFrame);
      clearTimeout(stopTimer);
    };
  }, []);

  return <canvas ref={canvasRef} className='fixed inset-0 pointer-events-none z-50' />;
};

export default SuccessAnimation;
