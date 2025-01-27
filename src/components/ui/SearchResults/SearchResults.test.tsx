import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";
import { useSearchStore } from "@/store/searchStore";

// Mock the store
vi.mock("@/store/searchStore", () => ({
  useSearchStore: vi.fn(),
}));

describe("SearchResults", () => {
  beforeEach(() => {
    vi.mocked(useSearchStore).mockImplementation(() => ({
      results: null,
      isLoading: false,
      error: null,
      query: "",
      setQuery: vi.fn(),
      search: vi.fn(),
      hasMore: true,
      loadMore: vi.fn(),
    }));
  });

  it("shows loading state", () => {
    vi.mocked(useSearchStore).mockImplementation(() => ({
      results: null,
      isLoading: true,
      error: null,
      query: "",
      setQuery: vi.fn(),
      search: vi.fn(),
      hasMore: true,
      loadMore: vi.fn(),
    }));

    render(<SearchResults />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error message", () => {
    vi.mocked(useSearchStore).mockImplementation(() => ({
      results: null,
      isLoading: false,
      error: "Test error",
      query: "",
      setQuery: vi.fn(),
      search: vi.fn(),
      hasMore: true,
      loadMore: vi.fn(),
    }));

    render(<SearchResults />);
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("shows no results message", () => {
    vi.mocked(useSearchStore).mockImplementation(() => ({
      results: {
        total_count: 0,
        incomplete_results: false,
        items: [],
      },
      isLoading: false,
      error: null,
      query: "",
      setQuery: vi.fn(),
      search: vi.fn(),
      hasMore: true,
      loadMore: vi.fn(),
    }));

    render(<SearchResults />);
    expect(screen.getByText("No Results")).toBeInTheDocument();
  });
});
