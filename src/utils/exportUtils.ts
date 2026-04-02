import { Transaction } from '../context/FinanceContext';

// ✅ Utility for safe file download
const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url); // ✅ IMPORTANT: prevent memory leaks
};

// ✅ Format date for filename (local, cleaner)
const getFormattedDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
};

// ================= CSV =================
export const exportToCSV = (transactions: Transaction[]) => {
  if (!transactions.length) {
    alert('No transactions to export!');
    return;
  }

  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];

  const rows = transactions.map(t => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`, // escape quotes
    t.category,
    t.type,
    t.amount.toString(),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  // ✅ FIX: add BOM for Excel support
  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  downloadFile(blob, `transactions_${getFormattedDate()}.csv`);
};

// ================= JSON =================
export const exportToJSON = (transactions: Transaction[]) => {
  if (!transactions.length) {
    alert('No transactions to export!');
    return;
  }

  const dataStr = JSON.stringify(transactions, null, 2);

  const blob = new Blob([dataStr], {
    type: 'application/json',
  });

  downloadFile(blob, `transactions_${getFormattedDate()}.json`);
};