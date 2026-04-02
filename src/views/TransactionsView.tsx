import React from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../components/Dashboard';

const TransactionsView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Detailed Transactions
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View and manage your full transaction history.
        </p>
      </header>

      {/* Transactions Content */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-4">
        <Dashboard />
      </div>
    </motion.div>
  );
};

export default TransactionsView;