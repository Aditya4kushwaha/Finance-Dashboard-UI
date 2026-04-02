import React from 'react';
import { motion } from 'framer-motion';

const BudgetsView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Budgets
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Set and track your monthly spending limits.
        </p>
      </header>

      {/* Content */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-10 text-center flex flex-col items-center gap-4 hover:shadow-md transition">
          
          <div className="text-5xl">📊</div>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Coming Soon
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            We're crafting the perfect budgeting experience for you.
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default BudgetsView;