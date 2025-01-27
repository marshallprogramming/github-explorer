import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearchStore } from "./searchStore";
import { pokemonService } from "@/services/pokemon";

vi.mock("@/services/pokemon", () => ({
  pokemonService: {
    searchPokemon: vi.fn(),
  },
}));

describe("searchStore", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Reset the store to initial state
    useSearchStore.setState({
      query: "",
      results: null,
      isLoading: false,
      error: null,
    });
  });

  it("updates query when setQuery is called", () => {
    const { result } = renderHook(() => useSearchStore());

    act(() => {
      result.current.setQuery("pikachu");
    });

    expect(result.current.query).toBe("pikachu");
  });

  it("sets loading state while searching", async () => {
    const { result } = renderHook(() => useSearchStore());

    vi.mocked(pokemonService.searchPokemon).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              count: 1,
              next: null,
              previous: null,
              results: [{ name: "pikachu", url: "pokemon/25" }],
            });
          }, 100)
        )
    );

    act(() => {
      result.current.search("pikachu");
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("updates results after successful search", async () => {
    const { result } = renderHook(() => useSearchStore());

    const mockResults = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: "pikachu", url: "pokemon/25" }],
    };

    vi.mocked(pokemonService.searchPokemon).mockResolvedValueOnce(mockResults);

    await act(async () => {
      await result.current.search("pikachu");
    });

    expect(result.current.results).toEqual(mockResults);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("handles search errors", async () => {
    const { result } = renderHook(() => useSearchStore());

    vi.mocked(pokemonService.searchPokemon).mockRejectedValueOnce(
      new Error("API Error")
    );

    await act(async () => {
      await result.current.search("pikachu");
    });

    expect(result.current.error).toBe(
      "Error: API Error: Failed to search Pokemon"
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.results).toBeNull();
  });

  it("maintains previous results until new search completes", async () => {
    const { result } = renderHook(() => useSearchStore());

    const initialResults = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: "bulbasaur", url: "pokemon/1" }],
    };

    act(() => {
      useSearchStore.setState({ results: initialResults });
    });

    vi.mocked(pokemonService.searchPokemon).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              count: 1,
              next: null,
              previous: null,
              results: [{ name: "pikachu", url: "pokemon/25" }],
            });
          }, 100)
        )
    );

    act(() => {
      result.current.search("pikachu");
    });

    expect(result.current.results).toEqual(initialResults);
    expect(result.current.isLoading).toBe(true);
  });
});
