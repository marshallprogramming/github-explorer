import { FC, ChangeEvent, KeyboardEvent } from "react";
import clsx from "clsx";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search Pokémon...",
  className,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={clsx("relative", className)}>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
