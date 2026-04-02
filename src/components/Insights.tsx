import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Lightbulb, TrendingDown, CheckCircle2 } from 'lucide-react';

const Insights: React.FC = () => {
  const { transactions, stats } = useFinance();

  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const highestCategory = Object.entries(expensesByCategory).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const savingsRate =
    stats.totalIncome > 0
      ? ((stats.totalIncome - stats.totalExpenses) / stats.totalIncome * 100).toFixed(1)
      : '0';

  const insights = [
    {
      title: 'Highest Spending',
      description: highestCategory
        ? `You spent the most on ${highestCategory[0]} (₹${highestCategory[1].toLocaleString()}).`
        : 'No expense data available.',
      icon: <TrendingDown size={20} className="text-red-500" />,
      bg: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      title: 'Savings Rate',
      description: `Your savings rate is ${savingsRate}%. ${
        parseFloat(savingsRate) > 20 ? 'Excellent work!' : 'Try to aim for 20%.'
      }`,
      icon: <CheckCircle2 size={20} className="text-green-500" />,
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Smart Advisor',
      description:
        stats.totalExpenses > stats.totalIncome * 0.8
          ? 'Warning: Your expenses are exceeding 80% of your income.'
          : 'Your budget is healthy. Keep it up!',
      icon: <Lightbulb size={20} className="text-yellow-500" />,
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
  ];

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Financial Insights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="flex gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${insight.bg}`}
            >
              {insight.icon}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {insight.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Insights;