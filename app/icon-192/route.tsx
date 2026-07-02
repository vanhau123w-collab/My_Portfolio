import { ImageResponse } from "next/og";

import { AppIconImage } from "@/components/metadata-images";

const size = {
  width: 192,
  height: 192,
};

export function GET() {
  return new ImageResponse(
    <AppIconImage
      size={size.width}
      borderRadius={36}
      logoWidth={120}
      logoHeight={100}
    />,
    size,
  );
}
