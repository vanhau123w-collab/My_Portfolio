import type { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DownloadButtonProps {
  icon: ReactNode;
  tooltipText: string;
  pathToPdf: string;
  fileName?: string;
  className?: string;
}

function DownloadButton({
  icon,
  tooltipText,
  pathToPdf,
  fileName,
  className,
}: DownloadButtonProps) {
  const isDisabled = pathToPdf.trim().length === 0;

  return (
    <Tooltip>
      {isDisabled ? (
        <TooltipTrigger
          render={
            <button
              type="button"
              className={className}
              aria-label={tooltipText}
            >
              {icon}
            </button>
          }
        />
      ) : (
        <TooltipTrigger
          render={
            <a
              href={pathToPdf}
              download={fileName}
              className={className}
              aria-label={tooltipText}
            >
              {icon}
            </a>
          }
        />
      )}
      <TooltipContent side="bottom">{tooltipText}</TooltipContent>
    </Tooltip>
  );
}

export { DownloadButton };
