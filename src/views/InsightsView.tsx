import React from 'react';
import { motion } from 'framer-motion';
import Insights from '../components/Insights';

const InsightsView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Detailed Insights
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          AI-powered analytics and spending patterns.
        </p>
      </header>

      {/* Content */}
      <section className="space-y-6">
        {/* Insights Component */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-4">
          <Insights />
        </div>

        {/* Extra Insights Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Monthly Spending Summary
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Your spending is concentrated in Food and Entertainment this month.
            Consider reducing weekend dining to save more.
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default InsightsView;