import { FC } from "react";
import ThemeToggle from "../../ui/ThemeToggle";

const Header: FC = () => {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h2>Header</h2>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
