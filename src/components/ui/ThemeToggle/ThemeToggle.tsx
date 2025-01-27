import { FC } from "react";
import { useTheme } from "../../../context/theme";
import clsx from "clsx";

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-20 h-10 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 ease-in-out"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      <div className="absolute inset-0 flex justify-between items-center px-3">
        <span
          className={clsx(
            "text-yellow-500 transition-opacity ease-in-out duration-300",
            !isLight && "opacity-80"
          )}
        >
          ☀️
        </span>
        <span
          className={clsx(
            "text-blue-300 transition-opacity ease-in-out duration-300",
            !isLight && "opacity-80"
          )}
        >
          🌙
        </span>
      </div>

      <div
        className={clsx(
          "absolute top-1 w-8 h-8 rounded-full border border-white shadow-md",
          "transition-transform duration-300 ease-in-out",
          isLight ? "left-1" : "translate-x-[2.75rem]"
        )}
      />
    </button>
  );
};

export default ThemeToggle;
