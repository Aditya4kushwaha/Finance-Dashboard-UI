import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import AddTransactionModal from './AddTransactionModal';
import Insights from './Insights';
import {
  Plus,
  Search,
  Filter,
  FileJson,
  FileSpreadsheet,
  MoreVertical,
  Edit2,
  Trash2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';

const Dashboard: React.FC = () => {
  const { transactions, stats, role, isLoading } = useFinance();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState<'All' | 'income' | 'expense'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const { deleteTransaction } = useFinance();

  const handleEdit = (t: any) => {
    setEditingTransaction(t);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
    setActiveMenu(null);
  };

  // 📊 Chart Data
  const areaData = transactions.map((t) => ({
    name: new Date(t.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    }),
    amount: t.amount,
  }));

  const categoryData = Object.entries(
    transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#3b82f6', '#10b981', '#f43f5e', '#f59e0b', '#6366f1'];

  // 🔍 Filtering
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === 'All' || t.category === filterCategory;

    const matchesType =
      filterType === 'All' || t.type === filterType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // ⏳ Loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8"
    >
      {/* 🔹 HEADER */}
      <header className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Finance Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Track your income and expenses easily.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => exportToCSV(transactions)}
            className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FileSpreadsheet size={16} />
          </button>

          <button
            onClick={() => exportToJSON(transactions)}
            className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FileJson size={16} />
          </button>

          {role === 'ADMIN' && (
            <button
              onClick={() => {
                setEditingTransaction(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
            >
              <Plus size={16} />
              Add
            </button>
          )}
        </div>
      </header>

      {/* 🔹 STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Balance" value={stats.totalBalance} />
        <StatCard label="Income" value={stats.totalIncome} color="text-green-600" />
        <StatCard label="Expenses" value={stats.totalExpenses} color="text-red-600" />
      </section>

      {/* 🔹 CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area */}
        <div className="lg:col-span-2 p-5 bg-white dark:bg-gray-900 border rounded-2xl">
          <h3 className="mb-3 font-semibold">Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#3b82f6" fill="#3b82f633" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="p-5 bg-white dark:bg-gray-900 border rounded-2xl">
          <h3 className="mb-3 font-semibold">Spending</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value">
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 🔹 FILTERS */}
      <div className="flex flex-wrap gap-3">
        <div className="relative group flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Food</option>
          <option>Shopping</option>
          <option>Salary</option>
          <option>Entertainment</option>
          <option>Utilities</option>
          <option>Investment</option>
        </select>

        <select
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
          onChange={(e) => setFilterType(e.target.value as any)}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* 🔹 TABLE */}
      <div className="bg-white dark:bg-gray-900 border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                <td className="p-4 text-gray-500 dark:text-gray-400">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td className="p-4 font-medium">{t.description}</td>
                <td className="p-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {t.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    t.type === 'income' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {t.type}
                  </span>
                </td>
                <td className={`p-4 font-bold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount?.toLocaleString()}
                </td>
                <td className="p-4 text-right relative">
                  {role === 'ADMIN' && (
                    <button 
                      onClick={() => setActiveMenu(activeMenu === t.id ? null : t.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                  )}

                  <AnimatePresence>
                    {activeMenu === t.id && role === 'ADMIN' && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setActiveMenu(null)}
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute right-0 top-12 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden"
                        >
                          <button
                            onClick={() => handleEdit(t)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Insights />

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        transaction={editingTransaction}
      />
    </motion.div>
  );
};

export default Dashboard;

// 🔹 Reusable Card
const StatCard = ({ label, value, color = 'text-blue-600' }: any) => (
  <div className="p-5 bg-white dark:bg-gray-900 border rounded-2xl">
    <p className="text-sm text-gray-500">{label}</p>
    <h2 className={`text-xl font-bold ${color}`}>
      ₹{value.toLocaleString()}
    </h2>
  </div>
);