// services/github.ts
import { GitHubSearchResponse, GitHubUserDetails } from "@/types/github";

const BASE_URL = "https://api.github.com";

export const githubService = {
  async searchUsers(
    query: string,
    limit = 20,
    page = 1
  ): Promise<GitHubSearchResponse> {
    const response = await fetch(
      `${BASE_URL}/search/users?q=${query}&per_page=${limit}&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return response.json();
  },

  async getUserDetails(username: string): Promise<GitHubUserDetails> {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    return response.json();
  },
};
