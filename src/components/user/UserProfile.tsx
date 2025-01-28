import { GitHubUserDetails } from "@/types/github";
import { UserAvatar, UserHeader, UserStats, ProfileLink } from "@/components";
import { FC } from "react";

interface UserProfileProps {
  user: GitHubUserDetails;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="shrink-0">
        <UserAvatar url={user.avatar_url} username={user.login} size="lg" />
      </div>

      <div className="flex-1 min-w-0">
        <UserHeader name={user.name} login={user.login} bio={user.bio} />
        <UserStats
          publicRepos={user.public_repos}
          followers={user.followers}
          following={user.following}
        />
        <ProfileLink url={user.html_url} />
      </div>
    </div>
  </div>
);

export default UserProfile;
