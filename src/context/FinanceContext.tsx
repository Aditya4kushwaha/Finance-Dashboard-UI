import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Role = 'ADMIN' | 'VIEWER';
export type TransactionType = 'income' | 'expense';
export type Category =
  | 'Food'
  | 'Entertainment'
  | 'Shopping'
  | 'Utilities'
  | 'Salary'
  | 'Investment'
  | 'Others';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  stats: {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
  };
  isLoading: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// ✅ Mock data
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-03-28', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2026-03-29', amount: 150, category: 'Food', type: 'expense', description: 'Dinner with friends' },
  { id: '3', date: '2026-03-30', amount: 50, category: 'Entertainment', type: 'expense', description: 'Movie night' },
  { id: '4', date: '2026-03-31', amount: 200, category: 'Shopping', type: 'expense', description: 'New sneakers' },
  { id: '5', date: '2026-04-01', amount: 120, category: 'Utilities', type: 'expense', description: 'Internet bill' },
  { id: '6', date: '2026-04-02', amount: 800, category: 'Investment', type: 'income', description: 'Dividend payout' },
  { id: '7', date: '2026-04-02', amount: 45, category: 'Food', type: 'expense', description: 'Lunch' },
];

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // ✅ FIX: safer role parsing
  const [role, setRole] = useState<Role>(() => {
    const savedRole = localStorage.getItem('user_role');
    return savedRole === 'ADMIN' || savedRole === 'VIEWER' ? savedRole : 'ADMIN';
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('finance_transactions');
        setTransactions(saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS);
      } catch (error) {
        console.error('Invalid localStorage data, resetting...');
        setTransactions(INITIAL_TRANSACTIONS);
      }
      setIsLoading(false);
    }, 800); // 🔥 faster load

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('finance_transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  useEffect(() => {
    localStorage.setItem('user_role', role);
  }, [role]);

  // ✅ FIX: better id generation
  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...t,
      id: crypto.randomUUID(), // 🔥 better than Math.random
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, updated: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  // ❌ OLD ISSUE: getter inside object can break reactivity in some cases
  // ✅ FIX: compute directly
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const stats = {
    totalIncome,
    totalExpenses,
    totalBalance: totalIncome - totalExpenses,
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        setRole,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        stats,
        isLoading,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};