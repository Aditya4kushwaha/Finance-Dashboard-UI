import React from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../components/Dashboard';

const TransactionsView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <Dashboard />
    </motion.div>
  );
};


export default TransactionsView;