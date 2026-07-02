"use client";

import { ElectricBorder } from "@/components/electric-border";
import Image from "next/image";

function ProfileAvatar() {
  return (
    <ElectricBorder
      className="size-50 rounded-full object-cover"
      color="#f9a8d4"
      speed={0.75}
      chaos={0.08}
      borderRadius={100}
    >
      <div className="size-50 rounded-full bg-background p-1.5">
        <Image
          src="/profile.jpg"
          width={200}
          height={200}
          alt="Profile avatar"
          priority
          className="size-full rounded-full object-cover"
        />
      </div>
    </ElectricBorder>
  );
}

export { ProfileAvatar };
