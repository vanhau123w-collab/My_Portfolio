export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "My Portfolio",
    description: "A premium developer portfolio built with Next.js 16, TypeScript, Tailwind CSS, and Motion.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    githubUrl: "https://github.com/vanhau123w-collab/My_Portfolio",
    liveUrl: "https://my-portfolio-ruddy-one-47.vercel.app/",
  },
  {
    title: "E-Commerce Platform",
    description: "A modern, responsive e-commerce web application featuring real-time checkout and product filtering.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/vanhau123w-collab",
    liveUrl: "https://github.com/vanhau123w-collab",
  },
];
