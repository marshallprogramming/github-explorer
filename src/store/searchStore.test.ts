// src/store/searchStore.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearchStore } from "./searchStore";
import { pokemonService } from "@/services/pokemon";

// Mock the Pokemon service
vi.mock("@/services/pokemon", () => ({
  pokemonService: {
    searchPokemon: vi.fn(),
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
      offset: 0,
    });
  });

  it("updates query and resets state when setQuery is called", () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setQuery("pikachu");
    });

    expect(result.current.query).toBe("pikachu");
    expect(result.current.results).toBeNull();
    expect(result.current.offset).toBe(0);
    expect(result.current.hasMore).toBe(true);
  });

  it("handles search with specific error message", async () => {
    const { result } = renderHook(() => useSearchStore());
    const error = new Error("Network error");

    vi.mocked(pokemonService.searchPokemon).mockRejectedValueOnce(error);

    await act(async () => {
      await result.current.search("pikachu");
    });

    expect(result.current.error).toBe(
      "Error: Network error: Failed to search Pokemon"
    );
    expect(result.current.isLoading).toBe(false);
  });

  it("loads more results and appends them to existing results", async () => {
    const { result } = renderHook(() => useSearchStore());

    const initialResults = {
      count: 40,
      next: "next-url",
      previous: null,
      results: [{ name: "bulbasaur", url: "pokemon/1" }],
    };

    const moreResults = {
      count: 40,
      next: null,
      previous: "prev-url",
      results: [{ name: "ivysaur", url: "pokemon/2" }],
    };

    // Set initial state
    act(() => {
      useSearchStore.setState({
        results: initialResults,
        offset: 20,
        hasMore: true,
        query: "test",
      });
    });

    vi.mocked(pokemonService.searchPokemon).mockResolvedValueOnce(moreResults);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.results?.results).toHaveLength(2);
    expect(result.current.offset).toBe(40);
    expect(result.current.hasMore).toBe(false);
  });

  it("prevents loadMore when conditions are not met", async () => {
    const { result } = renderHook(() => useSearchStore());

    // Test when loading
    act(() => {
      useSearchStore.setState({ isLoading: true });
    });
    await act(async () => {
      await result.current.loadMore();
    });
    expect(pokemonService.searchPokemon).not.toHaveBeenCalled();

    // Test when no more results
    act(() => {
      useSearchStore.setState({ isLoading: false, hasMore: false });
    });
    await act(async () => {
      await result.current.loadMore();
    });
    expect(pokemonService.searchPokemon).not.toHaveBeenCalled();

    // Test when no results yet
    act(() => {
      useSearchStore.setState({ hasMore: true, results: null });
    });
    await act(async () => {
      await result.current.loadMore();
    });
    expect(pokemonService.searchPokemon).not.toHaveBeenCalled();
  });

  it("handles loadMore errors with specific error message", async () => {
    const { result } = renderHook(() => useSearchStore());
    const error = new Error("Network error");

    act(() => {
      useSearchStore.setState({
        results: {
          count: 40,
          next: "next-url",
          previous: null,
          results: [],
        },
        hasMore: true,
      });
    });

    vi.mocked(pokemonService.searchPokemon).mockRejectedValueOnce(error);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.error).toBe(
      "Error: Network error: Failed to load more Pokemon"
    );
    expect(result.current.isLoading).toBe(false);
  });
});
