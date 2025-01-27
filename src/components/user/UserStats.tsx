import { FC } from "react";
import { StatCard } from "@/components";

interface UserStatsProps {
  publicRepos: number;
  followers: number;
  following: number;
}

const UserStats: FC<UserStatsProps> = ({
  publicRepos,
  followers,
  following,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
    <StatCard label="Repositories" value={publicRepos} />
    <StatCard label="Followers" value={followers} />
    <StatCard label="Following" value={following} />
  </div>
);

export default UserStats;
