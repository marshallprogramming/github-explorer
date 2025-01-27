import { FC, ChangeEvent } from "react";
import clsx from "clsx";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search Pokémon...",
  className,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={clsx("relative", className)}>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={clsx(
          "w-full px-4 py-2 rounded-lg",
          "bg-white dark:bg-gray-800",
          "border border-gray-300 dark:border-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          "placeholder-gray-500 dark:placeholder-gray-400"
        )}
        aria-label="Search"
      />
    </div>
  );
};

export default SearchBar;
