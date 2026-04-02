'use client';
import { useStore } from '@/context/store';
import { filterByPeriod, getMonthlyData, getCategoryBreakdown, fmtINR } from '@/lib/utils';
import InsightCards from './InsightCards';
import ComparisonChart from './ComparisonChart';
import CategoryChart from './CategoryChart';
import { CAT_COLORS } from '@/lib/data';
import { Category } from '@/types';

export default function InsightsPage() {
  const { transactions, activePeriod, setPeriod } = useStore();
  const months = activePeriod === '1M' ? 1 : activePeriod === '3M' ? 3 : 6;
  const current = filterByPeriod(transactions, months);
  const prev = filterByPeriod(transactions, months * 2).filter(t => !current.find(c => c.id === t.id));
  const monthly = getMonthlyData(transactions, Math.max(months, 3));
  const catData = getCategoryBreakdown(current);
  const total = catData.reduce((a,d) => a + d.value, 0);

  return (
    <div>
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:'-0.025em', color:'var(--text)' }}>Insights</h2>
          <p style={{ fontSize:13, color:'var(--text4)', marginTop:2 }}>Patterns and observations from your data</p>
        </div>
        <div style={{ display:'flex', gap:4, background:'var(--bg3)', borderRadius:8, padding:4, border:'1px solid var(--border)' }}>
          {(['1M','3M','6M'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding:'4px 12px', fontSize:12, borderRadius:6, fontWeight:500, fontFamily:'inherit',
              background: activePeriod===p ? 'var(--bg4)' : 'transparent',
              color: activePeriod===p ? 'var(--text)' : 'var(--text4)',
              border:'none', cursor:'pointer', transition:'all 0.15s',
            }}>{p}</button>
          ))}
        </div>
      </div>

      <InsightCards currentTxs={current} prevTxs={prev} />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }} className="responsive-charts">
        <div className="panel">
          <h3 style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:4 }}>Monthly Comparison</h3>
          <p style={{ fontSize:12, color:'var(--text4)', marginBottom:16 }}>Income vs expenses per month</p>
          <ComparisonChart data={monthly} />
          <div style={{ display:'flex', gap:16, marginTop:10, fontSize:12, color:'var(--text4)' }}>
            <span style={{ display:'flex', alignItems:'center', gap:6 }}><span style={{ width:8, height:8, borderRadius:2, background:'#4d8fff', display:'inline-block' }} />Income</span>
            <span style={{ display:'flex', alignItems:'center', gap:6 }}><span style={{ width:8, height:8, borderRadius:2, background:'#ff4d6a', display:'inline-block' }} />Expenses</span>
          </div>
        </div>
        <div className="panel">
          <h3 style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:4 }}>Spending by Category</h3>
          <p style={{ fontSize:12, color:'var(--text4)', marginBottom:16 }}>Breakdown of expenses this period</p>
          <CategoryChart data={catData} />
        </div>
      </div>

      {catData.length > 0 && (
        <div className="panel">
          <h3 style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:16 }}>Category Breakdown</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {catData.map((d, i) => {
              const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
              const color = CAT_COLORS[d.name as Category] || '#888';
              return (
                <div key={d.name}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12, marginBottom:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ width:8, height:8, borderRadius:2, background:color, flexShrink:0, display:'inline-block' }} />
                      <span style={{ color:'var(--text2)', fontWeight:500 }}>{d.name}</span>
                      {i === 0 && <span style={{ fontSize:10, padding:'2px 8px', borderRadius:999, background:'var(--amber-bg)', color:'var(--amber)', fontWeight:500 }}>top</span>}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <span style={{ color:'var(--text4)' }}>{pct}%</span>
                      <span style={{ fontFamily:'var(--font-dm-mono),monospace', fontWeight:500, color:'var(--text)' }}>{fmtINR(d.value)}</span>
                    </div>
                  </div>
                  <div style={{ height:6, background:'var(--bg3)', borderRadius:3, overflow:'hidden' }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:3, transition:'width 0.7s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
