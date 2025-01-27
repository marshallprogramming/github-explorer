import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders with default placeholder", () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const input = screen.getByLabelText("Search");
    expect(input).toHaveAttribute("placeholder", "Search Pokémon...");
  });

  it("renders with custom placeholder", () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        placeholder="Custom placeholder"
      />
    );

    const input = screen.getByLabelText("Search");
    expect(input).toHaveAttribute("placeholder", "Custom placeholder");
  });

  it("calls onChange with input value", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByLabelText("Search");
    fireEvent.change(input, { target: { value: "Pikachu" } });

    expect(handleChange).toHaveBeenCalledWith("Pikachu");
  });

  it("displays the provided value", () => {
    render(<SearchBar value="Charizard" onChange={() => {}} />);

    const input = screen.getByLabelText("Search") as HTMLInputElement;
    expect(input.value).toBe("Charizard");
  });
});
