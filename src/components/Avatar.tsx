import { User } from "@phosphor-icons/react";

interface AvatarProps {
  image?: string;
  size: "sm" | "md" | "lg" | "xl";
  circle?: boolean;
}

const sizes = {
  xl: "w-48",
  lg: "w-32",
  md: "w-16",
  sm: "w-8",
};

export function Avatar({ image, size = "md", circle = false }: AvatarProps) {
  const sizeClass = sizes[size];
  const borderClass = circle ? "rounded-full" : "";

  return image ? (
    <div className="avatar h-fit w-fit">
      <div className={`items-center rounded bg-slate-200 ${sizeClass} ${borderClass}`}>
        <img src={image} />
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
