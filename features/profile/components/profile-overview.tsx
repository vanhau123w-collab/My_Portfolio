"use client";

import { LinkIcon, Mail, MapPin, Mars, Phone, Clock3 } from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";

import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";

import { SITE_INFO } from "@/config/site";

const profileItems = [
  {
    icon: MapPin,
    label: SITE_INFO.location,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_INFO.location)}`,
  },
  {
    icon: Phone,
    label: SITE_INFO.phone,
    href: `tel:${SITE_INFO.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: LinkIcon,
    label: SITE_INFO.name,
    href: SITE_INFO.url,
  },
];

const secondaryItems = [
  {
    icon: Clock3,
    label: "localTime",
  },
  {
    icon: Mail,
    label: SITE_INFO.email,
    href: `mailto:${SITE_INFO.email}`,
  },
  {
    icon: Mars,
    label: "he/him",
  },
];

const socialLinks = [
  {
    label: "X",
    href: SITE_INFO.x,
    icon: XIcon,
  },
  {
    label: "GitHub",
    href: SITE_INFO.github,
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: SITE_INFO.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: SITE_INFO.instagram,
    icon: InstagramIcon,
  },
];

function ProfileOverview() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();

    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const rightItems = useMemo(
    () =>
      secondaryItems.map((item) => ({
        ...item,
        label:
          item.label === "localTime"
            ? `${time || "--:--"} // same time`
            : item.label,
      })),
    [time],
  );

  return (
    <section className="font-mono text-sm [font-feature-settings:'ss11'_1,'zero'_1,'tnum'_1]">
      <h2 className="sr-only">Overview</h2>
      <div className="relative grid gap-x-8 gap-y-2.5 py-5 sm:grid-cols-2 sm:py-6">
        <div className="space-y-2.5">
          {profileItems.map((item) => (
            <OverviewItem key={item.label} {...item} />
          ))}
        </div>
        <div className="space-y-2.5 sm:pl-8">
          {rightItems.map((item) => (
            <OverviewItem key={item.label} {...item} />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 py-5">
        {socialLinks.map((link) => (
          <SocialLink key={link.label} {...link} />
        ))}
      </div>
    </section>
  );
}

type OverviewItemProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href?: string;
};

function OverviewItem({ icon: Icon, label, href }: OverviewItemProps) {
  const isExternal = href?.startsWith("http");

  const icon = (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-border/60 ring-offset-1 ring-offset-background transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
      <Icon className="size-4" />
    </span>
  );

  if (href) {
    return (
      <div className="group flex items-center gap-4">
        {icon}
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="min-w-0 text-sm font-normal leading-6 tracking-normal text-foreground decoration-current/30 decoration-1 underline-offset-3 hover:underline hover:decoration-current"
        >
          {label || "\u00a0"}
        </a>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-4">
      {icon}
      <span className="min-w-0 text-sm font-normal leading-6 tracking-normal text-foreground">
        {label || "\u00a0"}
      </span>
    </div>
  );
}

type SocialLinkProps = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

function SocialLink({ label, href, icon: Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cn(
        "flex size-12 items-center justify-center rounded-xl border border-border bg-muted/45 text-foreground transition-all",
        "hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted dark:bg-muted/35",
      )}
    >
      <Icon className="size-5" />
    </a>
  );
}

export { ProfileOverview };
