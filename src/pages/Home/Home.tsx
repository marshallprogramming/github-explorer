import { FC, useEffect } from "react";
import { SearchBar, SearchResults } from "@/components";
import { useSearchStore } from "@/store/searchStore";
import { useDebounce } from "@/hooks/useDebounce";

const Home: FC = () => {
  const { query, setQuery, search } = useSearchStore();
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      search(debouncedQuery);
    }
  }, [debouncedQuery, search]);

  return (
    <div className="flex flex-col">
      <div className="sticky top-[73px] z-10 bg-white dark:bg-gray-900 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Github Explorer</h1>
            <SearchBar
              value={query}
              onChange={setQuery}
              className="mb-4"
              onSubmit={() => {
                if (query.trim()) {
                  search(query);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <SearchResults />
      </div>
    </div>
  );
};

export default Home;
