import Image from "next/image";

import { SITE_INFO } from "@/config/site";

function Education() {
  return (
    <section
      id="education"
      className="page-section scroll-mt-navigation-scroll-margin"
    >
      <p className="page-section-title">Education</p>
      <div className="page-section-body">
        <div className="flex items-center gap-6 sm:gap-8">
          <div className="shrink-0 overflow-hidden rounded-sm self-center bg-white">
            <Image
              src="/logo-ute.jpg"
              width={92}
              height={92}
              alt="UTE logo"
              className="size-[72px] object-contain sm:size-[92px]"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-1.5 font-mono">
            <p className="text-base leading-snug font-medium text-foreground">
              {SITE_INFO.education.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {SITE_INFO.education.department}
            </p>
            <p className="text-sm text-muted-foreground">
              Student, {SITE_INFO.education.program}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Education };
