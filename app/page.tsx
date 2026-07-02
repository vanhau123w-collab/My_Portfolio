import type { Metadata } from "next";
import { FluidGradientText } from "@/components/fluid-gradient-text";
import { AnimatedHeadline } from "@/components/animated-headline";
import { JsonLdScript } from "@/components/json-ld";
import { ShimmeringText } from "@/components/shimmering-text";
import { SpinningCircularText } from "@/components/spinning-circular-text";
import { Twemoji } from "@/components/twemoji";
import { SITE_INFO, SOCIAL_LINKS } from "@/config/site";
import { Contributions } from "@/features/contributions/contributions";
import { Education } from "@/features/education/components/education";
import { ProfileAvatar } from "@/features/profile/components/profile-avatar";
import { ProfileOverview } from "@/features/profile/components/profile-overview";
import { Interests } from "@/features/interests/components/interests";
import { Projects } from "@/features/projects/components/projects";
import { Preference } from "@/features/preferences/components/preference";
import { SectionNav } from "@/components/section-nav";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

function getProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2026-06-10",
    dateModified: new Date().toISOString(),
    url: SITE_INFO.url,
    name: SITE_INFO.title,
    description: SITE_INFO.description,
    mainEntity: {
      "@type": "Person",
      name: SITE_INFO.name,
      alternateName: [SITE_INFO.shortName, SITE_INFO.username],
      identifier: SITE_INFO.username,
      url: SITE_INFO.url,
      image: `${SITE_INFO.url}/profile.jpg`,
      email: `mailto:${SITE_INFO.email}`,
      telephone: SITE_INFO.phone,
      gender: "Male",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ho Chi Minh City",
        addressCountry: "VN",
      },
      jobTitle: "Software Engineer",
      knowsAbout: [
        "Software Engineering",
        "Frontend Development",
        "React",
        "Next.js",
        "TypeScript",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: SITE_INFO.education.name,
        department: SITE_INFO.education.department,
      },
      sameAs: SOCIAL_LINKS,
    },
  };
}

export default async function Home() {
  const spinningText = "BUILT WITH CARE BY HAU • ";

  return (
    <>
      <JsonLdScript data={getProfilePageJsonLd()} />
      <main className="mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-5xl flex-col px-3 text-sm leading-loose sm:min-h-[calc(100dvh-4rem)] sm:px-6 lg:px-8">
        <SectionNav />
        <div className="page-reveal">
          <section className="w-full text-foreground">
            <div className="h-28 w-full sm:h-36 lg:h-44">
              <FluidGradientText
                text="Van Hau"
                svgViewBoxWidth={1400}
                svgViewBoxHeight={300}
              />
            </div>
          </section>
          <section id="about" className="scroll-mt-navigation-scroll-margin">
            <div className="grid gap-6 pt-6 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-8 sm:pt-8 px-3 sm:px-6 pb-2">
              <ProfileAvatar />
              <div className="flex flex-col gap-2 sm:py-1.5">
                <p className="text-xl font-medium tracking-normal">
                  <ShimmeringText
                    text="Pham Van Hau, 21"
                    duration={1.4}
                    repeatDelay={2}
                    className="[--color:var(--muted-foreground)] [--shimmering-color:var(--foreground)]"
                  />
                </p>
                <AnimatedHeadline
                  prefix="Software Engineer focused on"
                  words={["solving", "building", "shipping", "learning"]}
                  className="text-lg font-mono text-foreground"
                />
              </div>
            </div>
            <div className="pt-2 sm:pt-4">
              <ProfileOverview />
            </div>
            <Interests />
          </section>
          <Projects />
          <Contributions />
          <Preference />
          <Education />
        </div>
        <section className="page-reveal-bottom mt-auto pt-8 pb-3 sm:pt-10 sm:pb-4">
          <div className="flex justify-center pb-6">
            <SpinningCircularText
              text={spinningText}
              charSpacing={1.2}
              fontSize="0.65rem"
              spinClassName="text-muted-foreground duration-[10s] transition-colors"
              renderChar={(char, index) => (
                <span
                  className="spinning-text-shimmer"
                  style={{
                    animationDelay: `${(index / spinningText.length) * 2.2}s`,
                  }}
                >
                  {char}
                </span>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 text-center">
            <p className="text-lg">
              <Twemoji>👍 ❤️ 🤣 😲 😭 😡</Twemoji>
            </p>
            <p className="text-lg">
              <Twemoji>Hello from Viet Nam 🇻🇳</Twemoji>
            </p>
            <p className="text-base">
              <Twemoji>Built with 💛 and ☕️</Twemoji>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
