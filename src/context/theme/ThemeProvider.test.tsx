import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import ThemeProvider from "./ThemeProvider";
import { useTheme } from "./useTheme";

const TestComponent = () => {
  const { theme } = useTheme();
  return <div data-testid="theme">{theme}</div>;
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("loads theme from localStorage if available", () => {
    localStorage.setItem("theme-preference", "dark");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(localStorage.getItem("theme-preference")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("respects system theme if no localStorage value", () => {
    // Override matchMedia to simulate dark mode preference
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
