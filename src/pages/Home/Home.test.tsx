import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
  it("renders search bar and updates on input", () => {
    render(<Home />);

    const searchInput = screen.getByLabelText("Search");
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "marshall" } });
    expect(searchInput).toHaveValue("marshall");
  });
});
