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
    liveUrl: "https://my-portfolio-hcmuter.vercel.app/",
  },
  {
    title: "HireHub - Recruitment & ATS Platform",
    description: "A production-ready, multi-tenant recruitment platform featuring dedicated Candidate, Recruiter, and Platform Admin portals. It includes a PostgreSQL/Prisma data model with tenant-scoped isolation, a drag-and-drop Kanban ATS board, and asynchronous resume processing using Redis/BullMQ.",
    tags: ["React", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker"],
    githubUrl: "https://github.com/vanhau123w-collab/HireHub",
    liveUrl: "https://hirehubweb-production.up.railway.app",
  },
];
