import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useInfiniteScroll } from "./";

describe("useInfiniteScroll", () => {
  const mockIntersectionObserver = vi.fn();
  const mockDisconnect = vi.fn();
  const mockObserve = vi.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockReset();
    mockDisconnect.mockReset();
    mockObserve.mockReset();

    mockIntersectionObserver.mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: vi.fn(),
    }));

    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("sets up the observer with provided callback", () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        isLoading: false,
        hasMore: true,
        onLoadMore,
      })
    );

    const element = document.createElement("div");
    result.current.lastElementRef(element);

    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it("doesn't observe when loading", () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        isLoading: true,
        hasMore: true,
        onLoadMore,
      })
    );

    const element = document.createElement("div");
    result.current.lastElementRef(element);

    expect(mockObserve).not.toHaveBeenCalled();
  });

  it("disconnects previous observer before creating new one", () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        isLoading: false,
        hasMore: true,
        onLoadMore,
      })
    );

    // Set up first observer
    const element1 = document.createElement("div");
    result.current.lastElementRef(element1);

    // Set up second observer
    const element2 = document.createElement("div");
    result.current.lastElementRef(element2);

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("calls onLoadMore when intersection occurs and hasMore is true", () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        isLoading: false,
        hasMore: true,
        onLoadMore,
      })
    );

    const element = document.createElement("div");
    result.current.lastElementRef(element);

    // Get the callback passed to IntersectionObserver
    const [[callback]] = mockIntersectionObserver.mock.calls;

    // Simulate intersection
    callback([{ isIntersecting: true }]);

    expect(onLoadMore).toHaveBeenCalled();
  });

  it("doesn't call onLoadMore when hasMore is false", () => {
    const onLoadMore = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        isLoading: false,
        hasMore: false,
        onLoadMore,
      })
    );

    const element = document.createElement("div");
    result.current.lastElementRef(element);

    const [[callback]] = mockIntersectionObserver.mock.calls;
    callback([{ isIntersecting: true }]);

    expect(onLoadMore).not.toHaveBeenCalled();
  });
});
