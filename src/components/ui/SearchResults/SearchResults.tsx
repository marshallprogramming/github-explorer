import { FC } from "react";
import { useSearchStore } from "@/store/searchStore";
import clsx from "clsx";

const SearchResults: FC = () => {
  const { results, isLoading, error } = useSearchStore();

  if (isLoading) {
    return (
      <div role="status" className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!results?.results.length) {
    return (
      <div className="text-center py-8 text-gray-500">No Pokemon found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {results.results.map((pokemon) => (
        <div
          key={pokemon.name}
          className={clsx(
            "p-4 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border border-gray-200 dark:border-gray-700",
            "hover:shadow-lg transition-shadow"
          )}
        >
          <h3 className="capitalize text-lg font-medium">{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
