import { describe, it, expect, beforeEach, vi, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import ThemeProvider from "./ThemeProvider";
import { useTheme } from "./useTheme";

const TestComponent = () => {
  const { theme } = useTheme();
  return <div data-testid="theme">{theme}</div>;
};

describe("ThemeProvider", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    // Reset matchMedia to original value before each test
    window.matchMedia = originalMatchMedia;
  });

  afterAll(() => {
    // Restore original matchMedia after all tests
    window.matchMedia = originalMatchMedia;
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

  it("respects system theme if no localStorage value and matchMedia is available", () => {
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

  it("defaults to dark theme if matchMedia is not available", () => {
    // Remove matchMedia to simulate unsupported browser
    // @ts-expect-error - Intentionally removing matchMedia
    window.matchMedia = undefined;

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId("theme");
    expect(themeElement).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("gracefully handles matchMedia without event listener support", () => {
    // Mock matchMedia without addEventListener support
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      // Only include old event listener methods
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: undefined,
      removeEventListener: undefined,
      dispatchEvent: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId("theme");
    expect(themeElement).toHaveTextContent("light");
  });
});
