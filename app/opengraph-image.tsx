import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { PortfolioSocialImage } from "@/components/metadata-images";
import { SITE_INFO } from "@/config/site";

export const alt = SITE_INFO.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const profileImageData = await readFile(
    join(process.cwd(), "public/profile.jpg"),
  );
  const profileImageSrc = `data:image/jpeg;base64,${profileImageData.toString("base64")}`;

  return new ImageResponse(
    <PortfolioSocialImage profileImageSrc={profileImageSrc} />,
    size,
  );
}
