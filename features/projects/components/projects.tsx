"use client";

import { motion } from "motion/react";

import { ShimmeringText } from "@/components/shimmering-text";

function Projects() {
  return (
    <section
      id="projects"
      className="page-section scroll-mt-navigation-scroll-margin"
    >
      <p className="page-section-title">Projects</p>
      <div className="page-section-body">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-border/70 bg-muted/20 px-6 py-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(255_143_209_/_0.12),transparent_48%)]" />
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/50 to-transparent"
            animate={{ x: ["-20%", "120%"] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.8,
            }}
          />
          <motion.div
            className="pointer-events-none absolute top-6 left-8 size-2 rounded-full bg-[#ff8fd1]"
            animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.4, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute right-10 bottom-8 size-1.5 rounded-full bg-[#8b708a]"
            animate={{ opacity: [0.2, 0.75, 0.2], scale: [1, 1.8, 1] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
          <div className="relative z-10 flex min-h-44 flex-col items-center justify-center gap-4 text-center">
            <ShimmeringText
              text="COMING SOON..."
              duration={1.2}
              repeatDelay={1.5}
              className="text-3xl tracking-[0.32em] [--color:var(--muted-foreground)] [--shimmering-color:var(--foreground)] sm:text-4xl"
            />
            <motion.p
              className="max-w-xl text-sm text-muted-foreground"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              New work is being assembled here. Motion studies, shipped
              products, and experiments will land in this section next.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { Projects };
