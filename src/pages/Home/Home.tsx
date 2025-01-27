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
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Github Explorer</h1>
      <SearchBar
        value={query}
        onChange={setQuery}
        className="mb-8"
        onSubmit={() => {
          if (query.trim()) {
            search(query);
          }
        }}
      />
      <SearchResults />
    </div>
  );
};

export default Home;
