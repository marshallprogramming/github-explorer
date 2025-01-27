import { FC } from "react";

interface UserHeaderProps {
  name: string;
  login: string;
  bio?: string | null;
}

const UserHeader: FC<UserHeaderProps> = ({ name, login, bio }) => (
  <div>
    <h1 className="text-2xl font-bold mb-2">{name || login}</h1>
    {bio && <p className="text-gray-600 dark:text-gray-300 mb-4">{bio}</p>}
  </div>
);

export default UserHeader;
