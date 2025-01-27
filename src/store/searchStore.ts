import { create } from "zustand";
import { PokemonListResponse } from "@/types/pokemon";
import { pokemonService } from "@/services/pokemon";

interface SearchState {
  query: string;
  results: PokemonListResponse | null;
  isLoading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  results: null,
  isLoading: false,
  error: null,
  setQuery: (query) => set({ query }),
  search: async (query) => {
    try {
      set({ isLoading: true, error: null });
      const results = await pokemonService.searchPokemon(query);
      set({ results, isLoading: false });
    } catch (e) {
      set({ error: `${e}: Failed to search Pokemon`, isLoading: false });
    }
  },
}));
