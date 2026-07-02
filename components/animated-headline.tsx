"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";

export interface AnimatedHeadlineProps {
  prefix: string;
  words: string[];
  dwellMs?: number;
  staggerMs?: number;
  shimmerColors?: string[];
  className?: string;
}

const DEFAULT_SHIMMER = ["#6366f1", "#a855f7", "#ec4899", "#f97316", "#eab308"];

const FLIP_TRANSITION: Transition = {
  duration: 0.72,
  ease: [0.2, 0.72, 0.2, 1],
};

export function AnimatedHeadline({
  prefix,
  words,
  dwellMs = 2000,
  staggerMs = 110,
  shimmerColors = DEFAULT_SHIMMER,
  className = "",
}: AnimatedHeadlineProps) {
  const reduceMotion = useReducedMotion();
  const prefixWords = prefix.trim().split(/\s+/);
  const [index, setIndex] = useState(0);
  const word = words[index] ?? "";
  const measureRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth);
    }
  }, [word]);

  useEffect(() => {
    if (reduceMotion || words.length <= 1) {
      return;
    }

    const revealMs = (prefixWords.length + 1) * staggerMs + 900;
    let rotateId: ReturnType<typeof setInterval> | undefined;
    const start = window.setTimeout(() => {
      rotateId = setInterval(
        () => setIndex((i) => (i + 1) % words.length),
        dwellMs,
      );
    }, revealMs);

    return () => {
      window.clearTimeout(start);
      if (rotateId) {
        clearInterval(rotateId);
      }
    };
  }, [dwellMs, prefixWords.length, reduceMotion, staggerMs, words.length]);

  const grey = "color-mix(in oklch, currentColor 28%, transparent)";
  const rainbow = shimmerColors
    .map((color, i) => `${color} ${40 + i * 5}%`)
    .join(", ");
  const underlineGradient = `linear-gradient(90deg, ${grey} 0%, ${grey} 35%, ${rainbow}, ${grey} 65%, ${grey} 100%)`;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: staggerMs / 1000 } },
  };
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: "45%", rotateX: -40 },
    show: { opacity: 1, y: "0%", rotateX: 0, transition: FLIP_TRANSITION },
  };

  return (
    <motion.h2
      data-slot="animated-headline"
      className={`flex flex-wrap items-baseline gap-x-[0.28em] gap-y-2 font-medium leading-[1.18] tracking-tight ${className}`}
      style={{ perspective: 1200 }}
      variants={reduceMotion ? undefined : container}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? false : "show"}
    >
      {prefixWords.map((prefixWord, i) => (
        <motion.span
          key={`${prefixWord}-${i}`}
          className="inline-block"
          style={{ transformOrigin: "50% 100%" }}
          variants={reduceMotion ? undefined : wordVariants}
        >
          {prefixWord}
        </motion.span>
      ))}

      <motion.span
        className="relative inline-block align-baseline"
        style={{ transformOrigin: "50% 100%" }}
        variants={reduceMotion ? undefined : wordVariants}
      >
        <span
          className="relative inline-block align-baseline"
          style={{
            width,
            transition: reduceMotion
              ? undefined
              : "width 0.4s cubic-bezier(0.2, 0.72, 0.2, 1)",
          }}
        >
          <span
            ref={measureRef}
            aria-hidden
            className="invisible whitespace-nowrap"
          >
            {word}
          </span>

          <span className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={word}
                className="absolute inset-0 whitespace-nowrap"
                initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.7, 0, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </AnimatePresence>
          </span>

          <motion.span
            aria-hidden
            className="pointer-events-none absolute -bottom-[0.08em] left-0 right-0 h-[3px] origin-left overflow-hidden rounded-full"
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              delay: reduceMotion ? 0 : 0.5,
              duration: 0.36,
              ease: "easeOut",
            }}
          >
            <span
              key={index}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage: underlineGradient,
                backgroundSize: "400% 100%",
                backgroundPosition: "0% 50%",
                animation: reduceMotion
                  ? undefined
                  : "hero-underline-shimmer 1.5s linear",
              }}
            />
          </motion.span>
        </span>
      </motion.span>
    </motion.h2>
  );
}

export default AnimatedHeadline;
