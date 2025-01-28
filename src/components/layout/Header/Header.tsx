import { FC } from "react";
import { Home, ThemeToggle } from "@/components";
import { Link, useLocation } from "react-router-dom";

import clsx from "clsx";

const Header: FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {!isHome && (
          <Link
            className="cursor-pointer hover:opacity-100 opacity-80 transition-opacity ease-in-out"
            to={"/"}
            aria-label="Home"
          >
            <Home className="w-5 h-5" />
          </Link>
        )}
        <div className={clsx(isHome && "ml-auto")}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
