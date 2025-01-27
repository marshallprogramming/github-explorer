import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const useInfiniteScroll = ({
  isLoading,
  hasMore,
  onLoadMore,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore, onLoadMore]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { lastElementRef };
};

export default useInfiniteScroll;
