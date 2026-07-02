import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLdScript } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import { Header } from "./header";
import { InteractiveGrid } from "@/components/interactive-grid";
import { ScrollProgressLine } from "@/components/scroll-progress-line";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  applicationName: SITE_INFO.name,
  title: {
    default: SITE_INFO.title,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
  keywords: [...SITE_INFO.keywords],
  authors: [{ name: SITE_INFO.name, url: SITE_INFO.url }],
  creator: SITE_INFO.name,
  publisher: SITE_INFO.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: SITE_INFO.locale,
    siteName: SITE_INFO.name,
    url: "/",
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    firstName: "Hau",
    lastName: "Pham",
    username: SITE_INFO.username,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.title,
    description: SITE_INFO.description,
    creator: "@pvhau1",
    images: [SITE_INFO.twitterImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_INFO.name,
  url: SITE_INFO.url,
  alternateName: [SITE_INFO.shortName, SITE_INFO.username],
  description: SITE_INFO.description,
};

const themeScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem("theme");
    const theme = storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "${META_THEME_COLORS.dark}" : "${META_THEME_COLORS.light}");
  } catch {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "${META_THEME_COLORS.dark}");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content={META_THEME_COLORS.dark} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Great+Vibes&family=Allura&family=Alex+Brush&family=Dancing+Script&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLdScript data={websiteJsonLd} />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <TooltipProvider>
            <ScrollProgressLine />
            <Header />
            <div className="page-grid-shell relative flex min-h-dvh flex-col pt-14 sm:pt-16">
              <InteractiveGrid
                gridSize={60}
                radius={300}
                repulsionStrength={-0.6}
                baseOpacity={0.09}
                dotSize={1.5}
                gridThickness={0.5}
                clickInteraction
                clickForce={0.5}
                motionSpeed={0.5}
                cursorTrail
                trailLength={0.25}
                trailColor="#0073FF"
                className="pointer-events-none fixed inset-0 z-0"
              />
              <div className="relative z-10 flex flex-col flex-1">
                {children}
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
