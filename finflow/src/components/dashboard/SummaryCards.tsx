'use client';
import { Transaction } from '@/types';
import { fmtINR, getSummary } from '@/lib/utils';
import { TrendingUp, TrendingDown, Wallet, Percent } from 'lucide-react';

export default function SummaryCards({ txs, prevTxs }: { txs: Transaction[]; prevTxs: Transaction[] }) {
  const curr = getSummary(txs);
  const prev = getSummary(prevTxs);
  const expChange = prev.expense > 0 ? Math.round(((curr.expense - prev.expense) / prev.expense) * 100) : 0;
  const incChange = prev.income  > 0 ? Math.round(((curr.income  - prev.income)  / prev.income)  * 100) : 0;
  const cards = [
    { label: 'Total Balance',  value: fmtINR(curr.balance), sub: `${curr.savingRate}% saving rate`,  color: 'var(--green)', bg: 'var(--green-bg)', Icon: Wallet,       trend: null,      isIncome: false },
    { label: 'Total Income',   value: fmtINR(curr.income),  sub: incChange ? `${incChange>0?'+':''}${incChange}% vs prev` : 'Current period',   color: 'var(--blue)',  bg: 'var(--blue-bg)',  Icon: TrendingUp,   trend: incChange, isIncome: true  },
    { label: 'Total Expenses', value: fmtINR(curr.expense), sub: expChange ? `${expChange>0?'+':''}${expChange}% vs prev` : 'Current period',   color: 'var(--red)',   bg: 'var(--red-bg)',   Icon: TrendingDown, trend: expChange, isIncome: false },
    { label: 'Transactions',   value: String(txs.length),   sub: `${txs.filter(t=>t.type==='expense').length} expenses · ${txs.filter(t=>t.type==='income').length} income`, color: 'var(--amber)', bg: 'var(--amber-bg)', Icon: Percent,      trend: null,      isIncome: false },
  ];
  const trendColor = (trend: number | null, isIncome: boolean) => {
    if (!trend) return 'var(--text4)';
    if (isIncome) return trend > 0 ? 'var(--green)' : 'var(--red)';
    return trend > 0 ? 'var(--red)' : 'var(--green)';
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {cards.map(({ label, value, sub, color, bg, Icon, trend, isIncome }) => (
        <div key={label} className="metric-card animate-slide-up">
          <div className="flex items-start justify-between mb-3">
            <p className="label">{label}</p>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
              <Icon size={14} style={{ color }} />
            </div>
          </div>
          <p className="text-2xl font-bold tracking-tight mb-1" style={{ color, fontFamily: 'var(--font-dm-mono),monospace' }}>{value}</p>
          <p className="text-xs" style={{ color: trendColor(trend, isIncome) }}>{sub}</p>
        </div>
      ))}
    </div>
  );
}
