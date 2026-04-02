import { Transaction } from '@/types';

export function fmtINR(amount: number): string {
  return '₹' + Math.abs(amount).toLocaleString('en-IN');
}

export function fmtINRShort(amount: number): string {
  if (amount >= 100000) return '₹' + (amount / 100000).toFixed(1) + 'L';
  if (amount >= 1000)   return '₹' + (amount / 1000).toFixed(0) + 'K';
  return '₹' + amount;
}

export function fmtDate(dateStr: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(dateStr).toLocaleDateString('en-IN', opts || { day: '2-digit', month: 'short', year: 'numeric' });
}

export function getMonthLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
}

export function filterByPeriod(txs: Transaction[], months: number): Transaction[] {
  // Use 2025-03-31 as "today" for demo data
  const now = new Date(2025, 2, 31);
  const cutoff = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
  return txs.filter(t => new Date(t.date) >= cutoff);
}

export function getMonthlyData(txs: Transaction[], numMonths: number) {
  const result = [];
  for (let i = numMonths - 1; i >= 0; i--) {
    const d = new Date(2025, 2 - i, 1);
    const month = txs.filter(t => {
      const td = new Date(t.date);
      return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear();
    });
    const income = month.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
    const expense = month.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
    result.push({
      label: d.toLocaleDateString('en-IN', { month: 'short' }),
      income,
      expense,
      balance: income - expense,
    });
  }
  // Running balance
  let running = 0;
  return result.map(r => {
    running += r.balance;
    return { ...r, runningBalance: running };
  });
}

export function getCategoryBreakdown(txs: Transaction[]) {
  const map: Record<string, number> = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
}

export function getSummary(txs: Transaction[]) {
  const income = txs.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
  const expense = txs.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
  const balance = income - expense;
  const savingRate = income > 0 ? Math.round((balance / income) * 100) : 0;
  return { income, expense, balance, savingRate };
}

export function exportCSV(txs: Transaction[]) {
  const header = 'Date,Description,Category,Type,Amount\n';
  const rows = txs.map(t =>
    `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'finflow-transactions.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function exportJSON(txs: Transaction[]) {
  const blob = new Blob([JSON.stringify(txs, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'finflow-transactions.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
