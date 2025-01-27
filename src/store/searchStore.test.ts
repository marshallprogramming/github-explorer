// store/searchStore.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearchStore } from "./searchStore";
import { githubService } from "@/services/github";

vi.mock("@/services/github", () => ({
  githubService: {
    searchUsers: vi.fn(),
  },
}));

describe("searchStore", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useSearchStore.setState({
      query: "",
      results: null,
      isLoading: false,
      error: null,
      hasMore: true,
      page: 1,
    });
  });

  it("updates query and resets state when setQuery is called", () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setQuery("john");
    });

    expect(result.current.query).toBe("john");
    expect(result.current.results).toBeNull();
    expect(result.current.page).toBe(1);
    expect(result.current.hasMore).toBe(true);
  });

  it("handles search with specific error message", async () => {
    const { result } = renderHook(() => useSearchStore());
    const error = new Error("Network error");

    vi.mocked(githubService.searchUsers).mockRejectedValueOnce(error);

    await act(async () => {
      await result.current.search("john");
    });

    expect(result.current.error).toBe(
      "Error: Network error: Failed to search users"
    );
    expect(result.current.isLoading).toBe(false);
  });

  it("loads more results and appends them to existing results", async () => {
    const { result } = renderHook(() => useSearchStore());

    const initialResults = {
      total_count: 40,
      incomplete_results: false,
      items: [{ id: 1, login: "john", avatar_url: "url1", html_url: "html1" }],
    };

    const moreResults = {
      total_count: 40,
      incomplete_results: false,
      items: [
        { id: 2, login: "johnny", avatar_url: "url2", html_url: "html2" },
      ],
    };

    act(() => {
      useSearchStore.setState({
        results: initialResults,
        page: 1,
        hasMore: true,
        query: "test",
      });
    });

    vi.mocked(githubService.searchUsers).mockResolvedValueOnce(moreResults);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.results?.items).toHaveLength(2);
    expect(result.current.page).toBe(2);
    expect(result.current.hasMore).toBe(false);
  });

  it("prevents loadMore when conditions are not met", async () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      useSearchStore.setState({ isLoading: true });
    });
    await act(async () => {
      await result.current.loadMore();
    });
    expect(githubService.searchUsers).not.toHaveBeenCalled();

    act(() => {
      useSearchStore.setState({ isLoading: false, hasMore: false });
    });
    await act(async () => {
      await result.current.loadMore();
    });
    expect(githubService.searchUsers).not.toHaveBeenCalled();

    act(() => {
      useSearchStore.setState({ hasMore: true, results: null });
    });
    await act(async () => {
      await result.current.loadMore();
    });
    expect(githubService.searchUsers).not.toHaveBeenCalled();
  });

  it("handles loadMore errors with specific error message", async () => {
    const { result } = renderHook(() => useSearchStore());
    const error = new Error("Network error");

    act(() => {
      useSearchStore.setState({
        results: {
          total_count: 40,
          incomplete_results: false,
          items: [],
        },
        hasMore: true,
      });
    });

    vi.mocked(githubService.searchUsers).mockRejectedValueOnce(error);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.error).toBe(
      "Error: Network error: Failed to load more users"
    );
    expect(result.current.isLoading).toBe(false);
  });
});
