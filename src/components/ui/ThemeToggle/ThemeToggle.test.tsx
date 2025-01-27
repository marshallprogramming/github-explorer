import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../../context/theme";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    // Clear any localStorage and remove dark class between tests
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders toggle button with correct initial state", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("toggles theme when clicked", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");

    // Initial state
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Click to toggle
    fireEvent.click(button);

    // Verify toggle
    expect(button).toHaveAttribute("aria-label", "Switch to light mode");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("persists theme preference in localStorage", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(localStorage.getItem("theme-preference")).toBe("dark");
  });
});
