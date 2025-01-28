import { describe, it, expect, vi, beforeEach } from "vitest";
import { githubService, GitHubError } from "./github";

describe("githubService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("searchUsers", () => {
    it("successfully filters users by search query", async () => {
      const mockData = {
        total_count: 3,
        incomplete_results: false,
        items: [
          { id: 1, login: "john", avatar_url: "url1", html_url: "html1" },
          { id: 2, login: "johnny", avatar_url: "url2", html_url: "html2" },
          { id: 3, login: "johnson", avatar_url: "url3", html_url: "html3" },
        ],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await githubService.searchUsers("john");
      expect(result.items).toHaveLength(3);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.github.com/search/users?q=john&per_page=20&page=1",
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
    });

    it("handles rate limiting errors", async () => {
      const resetTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        headers: new Headers({
          "x-ratelimit-reset": resetTime.toString(),
        }),
      });

      await expect(githubService.searchUsers("john")).rejects.toThrow(
        GitHubError
      );
      await expect(githubService.searchUsers("john")).rejects.toMatchObject({
        status: 403,
        isRateLimit: true,
      });
    });

    it("handles invalid search queries", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
      });

      await expect(githubService.searchUsers("john")).rejects.toThrow(
        "Invalid search query"
      );
    });

    it("handles network errors", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      await expect(githubService.searchUsers("john")).rejects.toThrow(
        "Failed to search users: Network error"
      );
    });
  });

  describe("getUserDetails", () => {
    it("successfully retrieves user details", async () => {
      const mockUser = {
        id: 1,
        login: "john",
        avatar_url: "url1",
        html_url: "html1",
        name: "John Doe",
        bio: "Developer",
        public_repos: 10,
        followers: 20,
        following: 30,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUser),
      });

      const result = await githubService.getUserDetails("john");
      expect(result.login).toBe("john");
      expect(result).toEqual(mockUser);
    });

    it("handles user not found errors", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(githubService.getUserDetails("not-exists")).rejects.toThrow(
        "User not found"
      );
    });

    it("handles rate limiting errors", async () => {
      const resetTime = Math.floor(Date.now() / 1000) + 3600;

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        headers: new Headers({
          "x-ratelimit-reset": resetTime.toString(),
        }),
      });

      await expect(githubService.getUserDetails("john")).rejects.toThrow(
        GitHubError
      );
      await expect(githubService.getUserDetails("john")).rejects.toMatchObject({
        status: 403,
        isRateLimit: true,
      });
    });

    it("handles network errors", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      await expect(githubService.getUserDetails("john")).rejects.toThrow(
        "Failed to fetch user details: Network error"
      );
    });
  });
});
