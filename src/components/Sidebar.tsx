import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  CreditCard,
  PieChart,
  Settings,
  Shield,
  ShieldAlert,
  TrendingUp,
  Zap,
  Moon,
  Sun,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { role, setRole } = useFinance();
  const [isDark, setIsDark] = React.useState(true);

  const navItems = [
    { icon: <BarChart3 size={18} />, label: 'Overview', path: '/' },
    { icon: <CreditCard size={18} />, label: 'Transactions', path: '/transactions' },
    { icon: <PieChart size={18} />, label: 'Budgets', path: '/budgets' },
    { icon: <TrendingUp size={18} />, label: 'Investments', path: '/investments' },
    { icon: <Zap size={18} />, label: 'Insights', path: '/insights' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-5">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <PieChart size={18} className="text-blue-600" />
        </div>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          FinVue
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-4">
        
        {/* Theme Toggle */}
        <button
          onClick={() => {
            setIsDark(!isDark);
            document.documentElement.classList.toggle('dark');
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </button>

        {/* Role Switch */}
        <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm mb-2 text-gray-600 dark:text-gray-300">
            {role === 'ADMIN' ? <Shield size={16} /> : <ShieldAlert size={16} />}
            Role: {role}
          </div>

          <button
            onClick={() =>
              setRole(role === 'ADMIN' ? 'VIEWER' : 'ADMIN')
            }
            className="w-full py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Switch to {role === 'ADMIN' ? 'Viewer' : 'Admin'}
          </button>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;