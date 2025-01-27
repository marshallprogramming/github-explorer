import { GitHubUserDetails } from "@/types/github";
import { UserAvatar, UserHeader, UserStats, ProfileLink } from "@/components";

interface UserProfileProps {
  user: GitHubUserDetails;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <UserAvatar url={user.avatar_url} username={user.login} size="lg" />

      <div className="flex-1">
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
