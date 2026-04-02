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
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role, setRole } = useFinance();
  const [isDark, setIsDark] = React.useState(
    document.documentElement.classList.contains('dark')
  );

  const navItems = [
    { icon: <BarChart3 size={18} />, label: 'Overview', path: '/' },
    { icon: <CreditCard size={18} />, label: 'Transactions', path: '/transactions' },
    { icon: <PieChart size={18} />, label: 'Budgets', path: '/budgets' },
    { icon: <TrendingUp size={18} />, label: 'Investments', path: '/investments' },
    { icon: <Zap size={18} />, label: 'Insights', path: '/insights' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-5 shadow-xl lg:shadow-none">
      
      {/* Logo & Close */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <PieChart size={18} className="text-blue-600" />
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            FinVue
          </span>
        </div>
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024 && onClose) onClose();
            }}
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
      <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        
        {/* Theme Toggle */}
        <button
          onClick={() => {
            setIsDark(!isDark);
            document.documentElement.classList.toggle('dark');
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </button>

        {/* Role Switch */}
        <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950/50">
          <div className="flex items-center gap-2 text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wider">
            {role === 'ADMIN' ? <Shield size={14} /> : <ShieldAlert size={14} />}
            Current Role: {role}
          </div>

          <button
            onClick={() =>
              setRole(role === 'ADMIN' ? 'VIEWER' : 'ADMIN')
            }
            className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            Switch to {role === 'ADMIN' ? 'Viewer' : 'Admin'}
          </button>
        </div>

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            {/* Sidebar Folder */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 h-full w-72 z-50 overflow-y-auto"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;