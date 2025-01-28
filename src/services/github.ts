import { GitHubSearchResponse, GitHubUserDetails } from "@/types/github";

const BASE_URL = "https://api.github.com";

export class GitHubError extends Error {
  constructor(
    message: string,
    public status?: number,
    public isRateLimit?: boolean
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

export const githubService = {
  async searchUsers(
    query: string,
    limit = 20,
    page = 1
  ): Promise<GitHubSearchResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/search/users?q=${query}&per_page=${limit}&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          const rateLimitReset = response.headers.get("x-ratelimit-reset");
          const resetDate = rateLimitReset
            ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
            : "soon";

          throw new GitHubError(
            `Rate limit exceeded. Limit resets at ${resetDate}`,
            403,
            true
          );
        }

        if (response.status === 404) {
          throw new GitHubError("Search endpoint not found", 404);
        }

        if (response.status === 422) {
          throw new GitHubError("Invalid search query", 422);
        }

        throw new GitHubError(
          `GitHub API error: ${response.status}`,
          response.status
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof GitHubError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new GitHubError(`Failed to search users: ${error.message}`);
      }

      throw new GitHubError(
        "An unexpected error occurred while searching users"
      );
    }
  },

  async getUserDetails(username: string): Promise<GitHubUserDetails> {
    try {
      const response = await fetch(`${BASE_URL}/users/${username}`);

      if (!response.ok) {
        if (response.status === 403) {
          const rateLimitReset = response.headers.get("x-ratelimit-reset");
          const resetDate = rateLimitReset
            ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
            : "soon";

          throw new GitHubError(
            `Rate limit exceeded. Limit resets at ${resetDate}`,
            403,
            true
          );
        }

        if (response.status === 404) {
          throw new GitHubError("User not found", 404);
        }

        throw new GitHubError(
          `GitHub API error: ${response.status}`,
          response.status
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof GitHubError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new GitHubError(`Failed to fetch user details: ${error.message}`);
      }

      throw new GitHubError(
        "An unexpected error occurred while fetching user details"
      );
    }
  },
};
