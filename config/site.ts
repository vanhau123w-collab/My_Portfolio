const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pvhau-portfolio.vercel.app"
).replace(/\/$/, "");

export const SITE_INFO = {
  name: "Phạm Văn Hậu",
  shortName: "PVH",
  username: "vanhau123w-collab",
  url: siteUrl,
  title: "Phạm Văn Hậu - Software Engineer",
  description:
    "Personal portfolio of Phạm Văn Hậu, a Software Engineer based in Ho Chi Minh City, Viet Nam.",
  keywords: [
    "Phạm Văn Hậu",
    "Van Hau",
    "pvhau1",
    "Software Engineering",
    "Software Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Ho Chi Minh City",
    "Viet Nam",
  ],
  email: "vanhau123w@gmail.com",
  phone: "+84 983 900 275",
  location: "Ho Chi Minh City, Viet Nam",
  locale: "en_US",
  ogImage: "/opengraph-image",
  twitterImage: "/twitter-image",
  github: "https://github.com/vanhau123w-collab",
  instagram: "https://www.instagram.com/",
  x: "https://x.com/",
  linkedin: "https://www.linkedin.com/",
  education: {
    name: "HCMC University of Technology and Education",
    department: "Faculty of Information Technology",
    program: "Software Engineering",
  },
} as const;

export const SOCIAL_LINKS = [
  SITE_INFO.github,
  SITE_INFO.instagram,
  SITE_INFO.x,
  SITE_INFO.linkedin,
] as const;

export const META_THEME_COLORS = {
  light: "#faf8f2",
  dark: "#0f0f10",
} as const;
