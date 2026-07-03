"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/social-icons";
import { ShimmeringText } from "@/components/shimmering-text";
import { PROJECTS } from "@/config/projects";

function Projects() {
  const hasProjects = PROJECTS.length > 0;

  return (
    <section
      id="projects"
      className="page-section scroll-mt-navigation-scroll-margin"
    >
      <p className="page-section-title">Projects</p>
      <div className="page-section-body">
        {hasProjects ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-muted/15 p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:bg-muted/25 hover:shadow-md dark:bg-muted/10 dark:hover:bg-muted/15"
              >
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div>
                  <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-4 text-xs font-medium">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <GitHubIcon className="size-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink className="size-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}

export { Projects };
