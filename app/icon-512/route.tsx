import { ImageResponse } from "next/og";

import { AppIconImage } from "@/components/metadata-images";

const size = {
  width: 512,
  height: 512,
};

export function GET() {
  return new ImageResponse(
    <AppIconImage
      size={size.width}
      borderRadius={96}
      logoWidth={320}
      logoHeight={267}
    />,
    size,
  );
}
