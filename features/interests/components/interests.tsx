"use client";

import {
  TypeScript,
  JavaScript,
  ReactDark,
  Java,
  SpringBoot,
  BaseUI,
  MongoDB,
  ChatGPT,
  Docker,
  Git,
  Redis,
  Motion,
} from "@/components/icons/interests-icons";
import {
  Avatar,
  AvatarGroup,
  AvatarImage,
  avatarImageVariants,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VariantProps } from "class-variance-authority";
import { ReactElement } from "react";
import { RequireAtLeastOne, cn } from "@/lib/utils";

type BaseInterest = {
  name: string;
  src?: string;
  fallback?: string;
  className?: string;
  imageClassName?: string;
  Icon?: ReactElement;
  variant?: VariantProps<typeof avatarImageVariants>["variant"];
};

type Interest = RequireAtLeastOne<BaseInterest, "src" | "Icon">;

const INTERESTS: Interest[] = [
  // Languages
  {
    name: "TypeScript",
    Icon: <TypeScript />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  {
    name: "JavaScript",
    Icon: <JavaScript />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  {
    name: "Java",
    Icon: <Java className="text-[#F89820]" />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  // Frontend
  {
    name: "React",
    src: "https://react.dev/apple-touch-icon.png",
    Icon: <ReactDark />,
  },
  {
    name: "Next.js",
    src: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
  },
  {
    name: "TanStack",
    src: "https://github.com/TanStack.png",
  },
  {
    name: "Base UI",
    Icon: <BaseUI className="text-white" />,
    className: "rounded-md overflow-hidden after:rounded-md bg-black p-1",
  },
  {
    name: "shadcn",
    src: "https://github.com/shadcn.png",
    className: "after:hidden bg-transparent",
  },
  {
    name: "Tailwind CSS",
    src: "https://github.com/tailwindlabs.png",
  },
  {
    name: "Motion",
    Icon: <Motion className="text-[#FFF312]" />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  // Runtimes & Frameworks
  {
    name: "Node.js",
    src: "https://github.com/nodejs.png",
  },
  {
    name: "Spring Boot",
    Icon: <SpringBoot className="text-[#6DB33F]" />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  {
    name: "Bun",
    src: "https://bun.sh/logo-square.png",
  },
  // Databases
  {
    name: "PostgreSQL",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    imageClassName: "object-contain p-0.5",
    variant: "square",
  },
  {
    name: "MySQL",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    imageClassName: "object-contain p-0.5",
    variant: "square",
  },
  {
    name: "MongoDB",
    Icon: <MongoDB className="text-[#47A248]" />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  {
    name: "Redis",
    Icon: <Redis className="text-[#D82C20]" />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  // DevOps & Tools
  {
    name: "Docker",
    Icon: <Docker className="text-[#2496ED]" />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  {
    name: "Git",
    Icon: <Git className="text-[#F05032]" />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  {
    name: "ChatGPT",
    Icon: <ChatGPT className="text-white" />,
    className: "rounded-md overflow-hidden after:rounded-md",
  },
  {
    name: "Linear",
    src: "https://github.com/linear.png",
    className: "bg-black",
  },
  // Platform
  {
    name: "Vercel",
    src: "https://github.com/vercel.png",
  },
  {
    name: "Render",
    src: "https://github.com/render-oss.png",
    className: "bg-black",
  },
];

function Interests() {
  return (
    <section className="page-section scroll-mt-28 sm:scroll-mt-32">
      <p className="page-section-title">Interests</p>
      <div className="page-section-body">
        <AvatarGroup className="flex-wrap gap-4 sm:gap-6">
          {INTERESTS.map(
            ({ name, className, imageClassName, src, Icon, variant }) => (
              <Tooltip key={name}>
                <TooltipTrigger>
                  <Avatar
                    size="lg"
                    variant={variant === "square" ? "square" : "ghost"}
                    className={className}
                  >
                    {!Icon ? (
                      <AvatarImage
                        src={src}
                        alt={name}
                        variant={variant}
                        className={imageClassName}
                      />
                    ) : (
                      <div
                        className={cn(
                          "size-full",
                          "[&>svg]:block",
                          "[&>svg]:size-full",
                          variant === "square" && "p-1",
                        )}
                      >
                        {Icon}
                      </div>
                    )}
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{name}</TooltipContent>
              </Tooltip>
            ),
          )}
        </AvatarGroup>
      </div>
    </section>
  );
}

export { Interests };
