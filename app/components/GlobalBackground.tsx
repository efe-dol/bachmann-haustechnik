"use client";

import { useEffect, useMemo, useState } from "react";

type Bubble = {
  top: number;
  left: number;
  size: number;
  duration: string;
  delay: string;
  rotate: string;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function GlobalBackground() {
  const bubbles = useMemo<Bubble[]>(
    () => [
      { top: 14, left: 10, size: 290, duration: "8s", delay: "0s", rotate: "22deg" },
      { top: 30, left: 78, size: 250, duration: "9s", delay: "1.2s", rotate: "112deg" },
      { top: 62, left: 16, size: 320, duration: "8.5s", delay: "2.4s", rotate: "201deg" },
      { top: 78, left: 72, size: 270, duration: "9.3s", delay: "3.6s", rotate: "304deg" },
    ],
    [],
  );

  const [positions, setPositions] = useState(
    bubbles.map((bubble) => ({ top: bubble.top, left: bubble.left })),
  );

  useEffect(() => {
    const timers: number[] = [];

    bubbles.forEach((_, index) => {
      const moveBubble = () => {
        setPositions((prev) =>
          prev.map((pos, i) => {
            if (i !== index) {
              return pos;
            }

            return {
              top: clamp(pos.top + randomBetween(-10, 10), 14, 86),
              left: clamp(pos.left + randomBetween(-12, 12), 12, 88),
            };
          }),
        );

        const nextDelay = 15000 + index * 800 + Math.random() * 2400;
        timers[index] = window.setTimeout(moveBubble, nextDelay);
      };

      timers[index] = window.setTimeout(moveBubble, 1800 + index * 900);
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [bubbles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "linear-gradient(to bottom, transparent, white 80%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[80vh] w-[80vh] rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />

      {bubbles.map((bubble, i) => (
        <div
          key={`${bubble.top}-${bubble.left}-${i}`}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${positions[i]?.top ?? bubble.top}%`,
            left: `${positions[i]?.left ?? bubble.left}%`,
            animationName: "ambientBubblePulse",
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            transitionProperty: "top, left",
            transitionDuration: `${12 + i * 1.7}s`,
            transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            willChange: "top, left",
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full bg-blue-500/12 blur-3xl"
            style={{ transform: `rotate(${bubble.rotate})` }}
          />
        </div>
      ))}
    </div>
  );
}
