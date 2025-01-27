// types/github.ts
export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

export interface GitHubUserDetails extends GitHubUser {
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}
