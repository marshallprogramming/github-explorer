import { FC } from "react";
import { useSearchStore } from "@/store/searchStore";
import { useInfiniteScroll } from "@/hooks";
import clsx from "clsx";

const SearchResults: FC = () => {
  const { results, isLoading, error, hasMore, loadMore } = useSearchStore();
  const { lastElementRef } = useInfiniteScroll({
    isLoading,
    hasMore,
    onLoadMore: loadMore,
  });

  if (error) {
    return (
      <div className="text-center py-8 text-red-500" role="alert">
        {error}
      </div>
    );
  }

  if (!results?.items.length && !isLoading) {
    return <div className="text-center py-8 text-gray-500">No Results</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results?.items.map((user, index) => (
          <div
            key={`${user.login}-${index}`}
            ref={index === results.items.length - 1 ? lastElementRef : null}
            className={clsx(
              "p-4 rounded-lg",
              "bg-white dark:bg-gray-800",
              "border border-gray-200 dark:border-gray-700",
              "hover:shadow-lg transition-shadow"
            )}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <h3 className="text-lg font-medium text-center">{user.login}</h3>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline block text-center mt-1"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {isLoading && (
        <div
          className="text-center py-8"
          role="status"
          aria-label="Loading more users"
        >
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
