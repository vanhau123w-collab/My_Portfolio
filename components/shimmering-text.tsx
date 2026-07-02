"use client";

import * as React from "react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export type ShimmeringTextProps = Omit<
  React.ComponentProps<typeof motion.span>,
  "children"
> & {
  /** The text to render with the shimmering effect. */
  text: string;
  /**
   * Duration in seconds for one shimmer cycle.
   * @defaultValue 1 */
  duration?: number;
  /**
   * Whether the shimmer animation is paused.
   * @defaultValue false */
  isStopped?: boolean;
  /**
   * Delay in seconds before the shimmer starts another pass.
   * @defaultValue text.length * 0.05 */
  repeatDelay?: number;
};

export function ShimmeringText({
  text,
  duration = 1,
  isStopped = false,
  repeatDelay = text.length * 0.05,
  className,
  ...props
}: ShimmeringTextProps) {
  const { resolvedTheme } = useTheme();

  const createCharVariants = React.useCallback(
    (charIndex: number): Variants => ({
      running: {
        color: ["var(--color)", "var(--shimmering-color)", "var(--color)"],
        transition: {
          duration,
          repeat: Infinity,
          repeatType: "loop" as const,
          repeatDelay,
          delay: (charIndex * duration) / text.length,
          ease: "easeInOut",
        },
      },
      stopped: {
        color: "var(--color)",
        transition: {
          duration: duration * 0.5,
          ease: "easeOut",
        },
      },
    }),
    [duration, repeatDelay, text.length],
  );

  return (
    <motion.span
      className={cn(
        "inline-block select-none",
        "[--color:var(--muted-foreground)] [--shimmering-color:var(--foreground)]",
        className,
      )}
      {...props}
    >
      {text?.split("")?.map((char, i) => (
        <motion.span
          key={`${resolvedTheme}-${i}`}
          className="inline-block whitespace-pre"
          initial="stopped"
          animate={isStopped ? "stopped" : "running"}
          variants={createCharVariants(i)}
          aria-hidden
        >
          {char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}
