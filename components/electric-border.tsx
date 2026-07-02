"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";

function hexToRgba(hex: string, alpha = 1): string {
  if (!hex) return `rgba(0,0,0,${alpha})`;

  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type ElectricBorderProps = {
  children?: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
};

function ElectricBorder({
  children,
  color = "#f9a8d4",
  speed = 0.75,
  chaos = 0.08,
  borderRadius = 100,
  className,
  style,
}: ElectricBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  const random = useCallback(
    (x: number) => (Math.sin(x * 12.9898) * 43758.5453) % 1,
    [],
  );

  const noise2D = useCallback(
    (x: number, y: number) => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;
      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);
      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);

      return (
        a * (1 - ux) * (1 - uy) +
        b * ux * (1 - uy) +
        c * (1 - ux) * uy +
        d * ux * uy
      );
    },
    [random],
  );

  const octavedNoise = useCallback(
    (x: number, time: number, seed: number) => {
      let y = 0;
      let amplitude = chaos;
      let frequency = 10;

      for (let i = 0; i < 10; i += 1) {
        y +=
          amplitude *
          noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= 1.6;
        amplitude *= 0.7;
      }

      return y;
    },
    [chaos, noise2D],
  );

  const getCornerPoint = useCallback(
    (
      centerX: number,
      centerY: number,
      radius: number,
      startAngle: number,
      progress: number,
    ) => {
      const angle = startAngle + progress * (Math.PI / 2);
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    },
    [],
  );

  const getRoundedRectPoint = useCallback(
    (
      t: number,
      left: number,
      top: number,
      width: number,
      height: number,
      radius: number,
    ) => {
      const straightWidth = width - 2 * radius;
      const straightHeight = height - 2 * radius;
      const cornerArc = (Math.PI * radius) / 2;
      const totalPerimeter =
        2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;
      let accumulated = 0;

      if (distance <= accumulated + straightWidth) {
        return {
          x:
            left +
            radius +
            ((distance - accumulated) / straightWidth) * straightWidth,
          y: top,
        };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        return getCornerPoint(
          left + width - radius,
          top + radius,
          radius,
          -Math.PI / 2,
          (distance - accumulated) / cornerArc,
        );
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        return {
          x: left + width,
          y:
            top +
            radius +
            ((distance - accumulated) / straightHeight) * straightHeight,
        };
      }
      accumulated += straightHeight;

      if (distance <= accumulated + cornerArc) {
        return getCornerPoint(
          left + width - radius,
          top + height - radius,
          radius,
          0,
          (distance - accumulated) / cornerArc,
        );
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightWidth) {
        return {
          x:
            left +
            width -
            radius -
            ((distance - accumulated) / straightWidth) * straightWidth,
          y: top + height,
        };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        return getCornerPoint(
          left + radius,
          top + height - radius,
          radius,
          Math.PI / 2,
          (distance - accumulated) / cornerArc,
        );
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        return {
          x: left,
          y:
            top +
            height -
            radius -
            ((distance - accumulated) / straightHeight) * straightHeight,
        };
      }
      accumulated += straightHeight;

      return getCornerPoint(
        left + radius,
        top + radius,
        radius,
        Math.PI,
        (distance - accumulated) / cornerArc,
      );
    },
    [getCornerPoint],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const displacement = 60;
    const borderOffset = 60;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width + borderOffset * 2;
      const height = rect.height + borderOffset * 2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      return { width, height };
    };

    let { width, height } = updateSize();

    const drawElectricBorder = (currentTime: number) => {
      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
      lastFrameTimeRef.current = currentTime;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const left = borderOffset;
      const top = borderOffset;
      const borderWidth = width - 2 * borderOffset;
      const borderHeight = height - 2 * borderOffset;
      const radius = Math.min(
        borderRadius,
        Math.min(borderWidth, borderHeight) / 2,
      );
      const sampleCount = Math.floor(
        (2 * (borderWidth + borderHeight) + 2 * Math.PI * radius) / 2,
      );

      ctx.beginPath();

      for (let i = 0; i <= sampleCount; i += 1) {
        const progress = i / sampleCount;
        const point = getRoundedRectPoint(
          progress,
          left,
          top,
          borderWidth,
          borderHeight,
          radius,
        );
        const displacedX =
          point.x +
          octavedNoise(progress * 8, timeRef.current, 0) * displacement;
        const displacedY =
          point.y +
          octavedNoise(progress * 8, timeRef.current, 1) * displacement;

        if (i === 0) {
          ctx.moveTo(displacedX, displacedY);
        } else {
          ctx.lineTo(displacedX, displacedY);
        }
      }

      ctx.closePath();
      ctx.stroke();
      animationRef.current = requestAnimationFrame(drawElectricBorder);
    };

    const resizeObserver = new ResizeObserver(() => {
      const newSize = updateSize();
      width = newSize.width;
      height = newSize.height;
    });

    resizeObserver.observe(container);
    animationRef.current = requestAnimationFrame(drawElectricBorder);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [borderRadius, color, getRoundedRectPoint, octavedNoise, speed]);

  return (
    <div
      data-slot="electric-border"
      ref={containerRef}
      className={`relative isolate overflow-visible ${className ?? ""}`}
      style={
        {
          "--electric-border-color": color,
          borderRadius,
          ...style,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2">
        <canvas ref={canvasRef} className="block" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]">
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            border: `2px solid ${hexToRgba(color, 0.6)}`,
            filter: "blur(1px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ border: `2px solid ${color}`, filter: "blur(4px)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-[1] scale-110 rounded-[inherit] opacity-30"
          style={{
            filter: "blur(32px)",
            background: `linear-gradient(-30deg, ${color}, transparent, ${color})`,
          }}
        />
      </div>
      <div className="relative z-[1] rounded-[inherit]">{children}</div>
    </div>
  );
}

export { ElectricBorder };
