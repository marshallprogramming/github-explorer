// src/pages/Home/Home.tsx
import { FC, useEffect } from "react";
import { SearchBar, SearchResults } from "@/components";
import { useSearchStore } from "@/store/searchStore";

const Home: FC = () => {
  const { query, setQuery, search } = useSearchStore();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        search(query);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, search]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Pokemon Explorer</h1>
      <SearchBar value={query} onChange={setQuery} className="mb-8" />
      <SearchResults />
    </div>
  );
};

export default Home;
