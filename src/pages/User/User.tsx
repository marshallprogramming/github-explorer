import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProfile } from "@/components";
import ErrorMessage from "@/components/ui/common/ErrorMessage";
import LoadingSpinner from "@/components/ui/common/LoadingSpinner";
import { GitHubUserDetails } from "@/types/github";
import { githubService } from "@/services/github";

const User: FC = () => {
  const { username } = useParams();
  const [user, setUser] = useState<GitHubUserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const data = await githubService.getUserDetails(username!);
        setUser(data);
      } catch (e) {
        setError(`Failed to load user details: ${e}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <UserProfile user={user} />
    </div>
  );
};

export default User;
