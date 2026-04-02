import React from 'react';
import { Menu, PieChart } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <PieChart size={18} className="text-blue-600" />
        </div>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          FinVue
        </span>
      </div>

      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
        aria-label="Open Menu"
      >
        <Menu size={20} />
      </button>
    </header>
  );
};

export default Navbar;
