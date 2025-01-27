import { describe, it, expect, vi, beforeEach } from "vitest";
import { pokemonService } from "./pokemon";

describe("pokemonService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("filters pokemon by search query", async () => {
    const mockData = {
      count: 3,
      next: null,
      previous: null,
      results: [
        { name: "bulbasaur", url: "url1" },
        { name: "ivysaur", url: "url2" },
        { name: "venusaur", url: "url3" },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await pokemonService.searchPokemon("saur");
    expect(result.results).toHaveLength(3);
    expect(result.results.every((p) => p.name.includes("saur"))).toBe(true);
  });

  it("handles pokemon detail requests", async () => {
    const mockPokemon = {
      id: 1,
      name: "bulbasaur",
      types: [{ slot: 1, type: { name: "grass", url: "url" } }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPokemon),
    });

    const result = await pokemonService.getPokemonDetails("bulbasaur");
    expect(result.name).toBe("bulbasaur");
  });

  it("throws error when pokemon is not found", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(
      pokemonService.getPokemonDetails("not-exists")
    ).rejects.toThrow("Pokemon not found");
  });
});
