import { create } from "zustand";
import { GitHubSearchResponse } from "@/types/github";
import { githubService } from "@/services/github";

interface SearchState {
  query: string;
  results: GitHubSearchResponse | null;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
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
  page: 1,

  setQuery: (query) => {
    set({
      query,
      results: null,
      page: 1,
      hasMore: true,
    });
  },

  search: async (query) => {
    try {
      set({ isLoading: true, error: null });
      const results = await githubService.searchUsers(query, 20, 1);
      set({
        results,
        isLoading: false,
        hasMore: results.items.length === 20,
        page: 1,
      });
    } catch (e) {
      set({ error: `${e}: Failed to search users`, isLoading: false });
    }
  },

  loadMore: async () => {
    const { query, page, isLoading, hasMore, results } = get();
    if (isLoading || !hasMore || !results) return;

    try {
      set({ isLoading: true });
      const newResults = await githubService.searchUsers(query, 20, page + 1);

      set({
        results: {
          ...newResults,
          items: [...results.items, ...newResults.items],
        },
        isLoading: false,
        hasMore: newResults.items.length === 20,
        page: page + 1,
      });
    } catch (e) {
      set({ error: `${e}: Failed to load more users`, isLoading: false });
    }
  },
}));
