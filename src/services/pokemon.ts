import { PokemonListResponse, Pokemon, PokemonListItem } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonService = {
  async searchPokemon(
    query: string,
    limit = 20,
    offset = 0
  ): Promise<PokemonListResponse> {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    const data: PokemonListResponse = await response.json();

    // Filter results client-side if there's a query
    if (query) {
      return {
        ...data,
        results: data.results.filter((pokemon: PokemonListItem) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        ),
      };
    }

    return data;
  },

  async getPokemonDetails(nameOrId: string | number): Promise<Pokemon> {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }
    return response.json();
  },
};
