import { create } from "zustand";
import { PokemonListResponse } from "@/types/pokemon";
import { pokemonService } from "@/services/pokemon";

interface SearchState {
  query: string;
  results: PokemonListResponse | null;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  offset: number;
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  results: null,
  isLoading: false,
  error: null,
  hasMore: true,
  offset: 0,

  setQuery: (query) => {
    set({
      query,
      results: null,
      offset: 0,
      hasMore: true,
    });
  },

  search: async (query) => {
    try {
      set({ isLoading: true, error: null });
      const results = await pokemonService.searchPokemon(query, 20, 0);
      set({
        results,
        isLoading: false,
        hasMore: !!results.next,
        offset: 20,
      });
    } catch (e) {
      set({ error: `${e}: Failed to search Pokemon`, isLoading: false });
    }
  },

  loadMore: async () => {
    const { query, offset, isLoading, hasMore, results } = get();
    if (isLoading || !hasMore || !results) return;

    try {
      set({ isLoading: true });
      const newResults = await pokemonService.searchPokemon(query, 20, offset);

      set({
        results: {
          ...newResults,
          results: [...results.results, ...newResults.results],
        },
        isLoading: false,
        hasMore: !!newResults.next,
        offset: offset + 20,
      });
    } catch (e) {
      set({ error: `${e}: Failed to load more Pokemon`, isLoading: false });
    }
  },
}));
