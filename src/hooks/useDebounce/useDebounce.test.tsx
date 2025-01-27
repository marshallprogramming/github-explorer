import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./";
import { describe, expect, vi, afterEach, beforeEach, it } from "vitest";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("delays update to new value", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "initial" },
      }
    );

    // Change the value
    rerender({ value: "updated" });
    expect(result.current).toBe("initial");

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("updated");
  });

  it("cancels timeout on new value", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "initial" },
      }
    );

    // Change value once
    rerender({ value: "updated1" });

    // Advance timer partially
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Change value again
    rerender({ value: "updated2" });

    // Advance to original timeout
    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("initial");

    // Advance to new timeout
    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("updated2");
  });
});
