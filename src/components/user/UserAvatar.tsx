import clsx from "clsx";
import { FC } from "react";

interface UserAvatarProps {
  url: string;
  username: string;
  size?: "sm" | "lg";
}

export const UserAvatar: FC<UserAvatarProps> = ({
  url,
  username,
  size = "sm",
}) => (
  <img
    src={url}
    alt={username}
    className={clsx("rounded-full", size === "sm" ? "w-16 h-16" : "w-32 h-32")}
  />
);
