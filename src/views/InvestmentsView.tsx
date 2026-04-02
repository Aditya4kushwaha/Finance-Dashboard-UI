import React from 'react';
import { motion } from 'framer-motion';

const InvestmentsView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Investments
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track your portfolio performance and growth.
        </p>
      </header>

      {/* Content */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-10 text-center flex flex-col items-center gap-4 hover:shadow-md transition">
          
          <div className="text-5xl">📈</div>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Portfolio Tracker
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Portfolio data is coming soon. Stay tuned!
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default InvestmentsView;