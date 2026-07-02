import { AppleHelloEffectCongAnh } from "@/components/apple-hello-effect-cong-anh";
import { GitHubIcon } from "@/components/icons/social-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/ui/download-button";
import { LiquidGlass } from "@/components/ui/glasscn/liquid-glass";
import { SocialItemMotion } from "@/features/profile/components/social-item-motion";
import { FileDown } from "lucide-react";
import { SITE_INFO } from "@/config/site";
import Link from "next/link";

function Header() {
  return (
    <div className="fixed z-50 flex w-full justify-center">
      <div className="mt-2 w-[calc(100%-2rem)] sm:w-[calc(50%-10px)] rounded-4xl overflow-hidden">
        <LiquidGlass className="rounded-4xl text-foreground" shadow={false}>
          <div className="flex h-12 items-center justify-between px-5">
            <Link
              href="/"
              className="flex h-8 w-32 items-center overflow-hidden"
              aria-label="Home"
            >
              <AppleHelloEffectCongAnh
                className="h-7 w-28 translate-y-0.5 text-foreground"
                durationScale={0.45}
              />
            </Link>
            <ThemeToggle />
            <SocialItemMotion>
              <DownloadButton
                icon={<FileDown className="size-5 text-foreground" />}
                tooltipText="Download CV"
                pathToPdf=""
                className="flex size-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted dark:hover:bg-muted/50"
              />
            </SocialItemMotion>
            <Link href={SITE_INFO.github} target="_blank" rel="noreferrer">
              <SocialItemMotion>
                <Button
                  variant="ghost"
                  className="flex size-8 items-center justify-center p-0 text-foreground"
                >
                  <GitHubIcon className="size-6" />
                </Button>
              </SocialItemMotion>
            </Link>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
}

export { Header };
