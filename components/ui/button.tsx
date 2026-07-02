import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "default";
};

function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-7 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-md border border-transparent px-2 text-xs/relaxed font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        variant === "default" &&
          "bg-primary text-primary-foreground hover:bg-primary/80",
        variant === "ghost" &&
          "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        className,
      )}
      {...props}
    />
  );
}

export { Button };
