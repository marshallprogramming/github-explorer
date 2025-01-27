import { describe, it, expect, vi, beforeEach } from "vitest";
import { githubService } from "./github";

describe("githubService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("filters users by search query", async () => {
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

  it("handles user detail requests", async () => {
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
  });

  it("throws error when user is not found", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(githubService.getUserDetails("not-exists")).rejects.toThrow(
      "User not found"
    );
  });
});
