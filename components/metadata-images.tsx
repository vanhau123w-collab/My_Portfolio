import type { CSSProperties } from "react";

import { SITE_INFO } from "@/config/site";

/* eslint-disable @next/next/no-img-element */

type VHLogoProps = {
  width: number;
  height: number;
  color?: string;
  style?: CSSProperties;
};

function VHLogo({ width, height, color = "#f5f5f3", style }: VHLogoProps) {
  return (
    <svg
      viewBox="0 0 240 200"
      width={width}
      height={height}
      style={{ display: "block", ...style }}
    >
      <path
        d="M 25 40 L 70 160 L 115 40"
        fill="none"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 145 40 L 145 160 M 215 40 L 215 160 M 145 100 L 215 100"
        fill="none"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type AppIconImageProps = {
  size: number;
  borderRadius: number;
  logoWidth: number;
  logoHeight: number;
};

function AppIconImage({
  size,
  borderRadius,
  logoWidth,
  logoHeight,
}: AppIconImageProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a1c",
        borderRadius,
      }}
    >
      <VHLogo width={logoWidth} height={logoHeight} />
    </div>
  );
}

type PortfolioSocialImageProps = {
  profileImageSrc: string;
};

function PortfolioSocialImage({ profileImageSrc }: PortfolioSocialImageProps) {
  const domain = SITE_INFO.url.replace(/^https?:\/\//, "");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1f3a57",
        color: "#faf8f2",
        padding: 48,
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 32,
          background: "#151518",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 56,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <VHLogo width={72} height={60} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 62,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {SITE_INFO.name}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  color: "#f5f5f3",
                  lineHeight: 1.25,
                }}
              >
                Software Engineer
              </div>
              <div
                style={{
                  display: "flex",
                  maxWidth: 520,
                  fontSize: 24,
                  color: "#a8a29e",
                  lineHeight: 1.35,
                }}
              >
                Building polished web interfaces with React, Next.js,
                TypeScript, and thoughtful motion.
              </div>
            </div>
          </div>
          <img
            src={profileImageSrc}
            alt={SITE_INFO.name}
            width={360}
            height={360}
            style={{
              width: 360,
              height: 360,
              objectFit: "cover",
              borderRadius: 28,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#d6d3d1",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#7c8cff",
              }}
            />
            <span style={{ display: "flex" }}>{domain}</span>
          </div>
          <div style={{ display: "flex", color: "#78a9ff" }}>
            @{SITE_INFO.username}
          </div>
        </div>
      </div>
    </div>
  );
}

export { AppIconImage, VHLogo, PortfolioSocialImage };
