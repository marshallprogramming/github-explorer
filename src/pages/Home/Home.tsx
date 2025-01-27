import { FC, useState } from "react";
import { SearchBar } from "@/components";

const Home: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Pokemon Explorer</h1>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        className="mb-8"
      />
      {/* SearchResults will go here */}
    </div>
  );
};

export default Home;
