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
      className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8"
    >
      {/* 🔹 HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Finance Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            Track your income and expenses easily.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex gap-2 flex-1 sm:flex-initial">
            <button
              onClick={() => exportToCSV(transactions)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Export CSV"
            >
              <FileSpreadsheet size={16} />
              <span className="sm:hidden">CSV</span>
            </button>

            <button
              onClick={() => exportToJSON(transactions)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Export JSON"
            >
              <FileJson size={16} />
              <span className="sm:hidden">JSON</span>
            </button>
          </div>

          {role === 'ADMIN' && (
            <button
              onClick={() => {
                setEditingTransaction(null);
                setIsModalOpen(true);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 font-medium whitespace-nowrap"
            >
              <Plus size={18} />
              Add Transaction
            </button>
          )}
        </div>
      </header>

      {/* 🔹 STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard label="Total Balance" value={stats.totalBalance} icon="💰" />
        <StatCard label="Monthly Income" value={stats.totalIncome} color="text-green-600 dark:text-green-400" icon="📈" />
        <StatCard label="Monthly Expenses" value={stats.totalExpenses} color="text-red-600 dark:text-red-400" icon="📉" />
      </section>

      {/* 🔹 CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area */}
        <div className="lg:col-span-2 p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
          <h3 className="mb-4 font-bold text-gray-800 dark:text-gray-200">Transaction Trend</h3>
          <div className="h-[200px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie */}
        <div className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
          <h3 className="mb-4 font-bold text-gray-800 dark:text-gray-200">Spending Breakdown</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={categoryData} 
                  dataKey="value" 
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 🔹 FILTERS */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative group flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <select
            className="flex-1 md:flex-initial px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
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
            className="flex-1 md:flex-initial px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
            onChange={(e) => setFilterType(e.target.value as any)}
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* 🔹 TABLE */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 font-medium">
              <tr>
                <th className="p-4 border-b border-gray-100 dark:border-gray-800">Date</th>
                <th className="p-4 border-b border-gray-100 dark:border-gray-800">Description</th>
                <th className="p-4 border-b border-gray-100 dark:border-gray-800">Category</th>
                <th className="p-4 border-b border-gray-100 dark:border-gray-800">Type</th>
                <th className="p-4 border-b border-gray-100 dark:border-gray-800">Amount</th>
                <th className="p-4 border-b border-gray-100 dark:border-gray-800"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                  <td className="p-4 text-gray-500 whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {t.description}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      {t.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      t.type === 'income' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`p-4 font-bold whitespace-nowrap ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount?.toLocaleString()}
                  </td>
                  <td className="p-4 text-right relative">
                    {role === 'ADMIN' && (
                      <button 
                        onClick={() => setActiveMenu(activeMenu === t.id ? null : t.id)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
                      >
                        <MoreVertical size={18} />
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
                            className="absolute right-0 top-12 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-20 overflow-hidden"
                          >
                            <button
                              onClick={() => handleEdit(t)}
                              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium border-b border-gray-100 dark:border-gray-700"
                            >
                              <Edit2 size={14} />
                              Edit Item
                            </button>
                            <button
                              onClick={() => handleDelete(t.id)}
                              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                            >
                              <Trash2 size={14} />
                              Delete Item
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

// 🔹 Improved Reusable Stat Card
const StatCard = ({ label, value, color = 'text-blue-600', icon }: any) => (
  <div className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <span className="text-4xl grayscale transform group-hover:scale-110 transition-transform block">
        {icon}
      </span>
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</p>
    <h2 className={`text-xl sm:text-2xl font-bold mt-1 ${color}`}>
      ₹{value.toLocaleString()}
    </h2>
    <div className="mt-3 flex items-center gap-2">
      <div className={`h-1 flex-1 rounded-full bg-gray-100 dark:bg-gray-800`}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '60%' }}
          className={`h-full rounded-full ${color.includes('green') ? 'bg-green-500' : color.includes('red') ? 'bg-red-500' : 'bg-blue-500'}`}
        />
      </div>
      <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Monthly Target</span>
    </div>
  </div>
);