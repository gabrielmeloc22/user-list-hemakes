import { User } from "@phosphor-icons/react";
import Image from "next/image";

interface AvatarProps {
  image?: string;
  size: "sm" | "md" | "lg" | "xl";
  circle?: boolean;
  alt: string;
}

const sizes = {
  xl: "w-48",
  lg: "w-32",
  md: "w-16",
  sm: "w-8",
};

export function Avatar({ image, size = "md", circle = false, alt }: AvatarProps) {
  const sizeClass = sizes[size];
  const borderClass = circle ? "rounded-full" : "rounded";

  return image ? (
    <div className="avatar h-fit w-fit">
      <div className={`relative items-center bg-slate-200 ${sizeClass}`}>
        <Image className={`${borderClass}`} src={image} alt={alt} fill />
      </div>
    </div>
  ) : (
    <div
      className={`h-fit aspect-square flex items-center justify-center bg-slate-300 rounded p-4 ${sizeClass} ${borderClass}`}
    >
      <User size="80%" />
    </div>
  );
}
