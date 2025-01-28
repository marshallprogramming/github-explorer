import { FC } from "react";

interface UserHeaderProps {
  name: string;
  login: string;
  bio?: string | null;
}

export const UserHeader: FC<UserHeaderProps> = ({ name, login, bio }) => (
  <div className="mb-4">
    <h1 className="text-2xl font-bold mb-1 truncate">{name || login}</h1>
    <div className="text-gray-500 dark:text-gray-400 truncate">@{login}</div>
    {bio && (
      <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
        {bio}
      </p>
    )}
  </div>
);

export default UserHeader;
