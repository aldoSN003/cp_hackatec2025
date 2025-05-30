import React, { useEffect, useRef } from 'react';

const VoiceVisualizer = ({ isActive, color = 'rgba(59, 130, 246, 0.8)' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const barCount = 5;
    const barWidth = 4;
    const barSpacing = 6;
    const totalWidth = barCount * (barWidth + barSpacing) - barSpacing;
    const heights = Array(barCount).fill(0);
    const targetHeights = Array(barCount).fill(0);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const startX = (canvas.offsetWidth - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        if (isActive) {
          if (Math.random() > 0.7 || targetHeights[i] === 0) {
            targetHeights[i] = Math.random() * 20 + 5;
          }
        } else {
          targetHeights[i] = 3;
        }

        heights[i] += (targetHeights[i] - heights[i]) * 0.2;

        const x = startX + i * (barWidth + barSpacing);
        const y = (canvas.offsetHeight - heights[i]) / 2;

        ctx.fillStyle = color;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, heights[i], 2);
        } else {
          ctx.rect(x, y, barWidth, heights[i]);
        }
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, color]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default VoiceVisualizer;
