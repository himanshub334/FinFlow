'use client';
import { useStore } from '@/context/store';
import { getMonthlyData, getCategoryBreakdown, filterByPeriod } from '@/lib/utils';
import SummaryCards from './SummaryCards';
import TrendChart from './TrendChart';
import SpendingDonut from './SpendingDonut';
import RecentTransactions from './RecentTransactions';

export default function DashboardPage() {
  const { transactions, activePeriod, setPeriod } = useStore();
  const months = activePeriod === '1M' ? 1 : activePeriod === '3M' ? 3 : 6;
  const periodTxs = filterByPeriod(transactions, months);
  const prevTxs = filterByPeriod(transactions, months * 2).filter(t => !periodTxs.find(p => p.id === t.id));
  const monthlyData = getMonthlyData(transactions, months);
  const catData = getCategoryBreakdown(periodTxs);

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:'-0.025em', color:'var(--text)' }}>Dashboard</h2>
          <p style={{ fontSize:13, color:'var(--text4)', marginTop:2 }}>Welcome back, Himanshu</p>
        </div>
        <div style={{ display:'flex', gap:4, background:'var(--bg3)', borderRadius:8, padding:4, border:'1px solid var(--border)' }}>
          {(['1M','3M','6M'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding:'4px 12px', fontSize:12, borderRadius:6, fontWeight:500, fontFamily:'inherit', border:'none',
              background: activePeriod===p ? 'var(--bg4)' : 'transparent',
              color: activePeriod===p ? 'var(--text)' : 'var(--text4)',
              cursor:'pointer', transition:'all 0.15s',
            }}>{p}</button>
          ))}
        </div>
      </div>

      <SummaryCards txs={periodTxs} prevTxs={prevTxs} />

      {/* Charts */}
      <div className="panel" style={{ marginBottom:16 }}>
        <div className="chart-grid">
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:8 }}>
              <h3 style={{ fontSize:13, fontWeight:600, color:'var(--text2)' }}>Balance Trend</h3>
              <div style={{ display:'flex', gap:12, fontSize:11, color:'var(--text4)' }}>
                <span style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ width:14, height:2, background:'var(--green)', display:'inline-block', borderRadius:2 }} />Balance
                </span>
                <span style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ width:14, borderTop:'2px dashed #4d8fff', display:'inline-block' }} />Income
                </span>
                <span style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ width:14, borderTop:'2px dashed #ff4d6a', display:'inline-block' }} />Expenses
                </span>
              </div>
            </div>
            <TrendChart data={monthlyData} />
          </div>
          <div style={{ borderLeft:'1px solid var(--border)', paddingLeft:16 }}>
            <h3 style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:16 }}>Spending Breakdown</h3>
            <SpendingDonut data={catData} />
          </div>
        </div>
      </div>

      <RecentTransactions txs={transactions} />
    </div>
  );
}
