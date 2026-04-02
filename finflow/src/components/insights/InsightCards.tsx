'use client';
import { Transaction } from '@/types';
import { CAT_COLORS } from '@/lib/data';
import { Category } from '@/types';
import { fmtINR, getSummary, getCategoryBreakdown } from '@/lib/utils';
import { Trophy, TrendingUp, Zap, PiggyBank } from 'lucide-react';

export default function InsightCards({ currentTxs, prevTxs }: { currentTxs: Transaction[]; prevTxs: Transaction[] }) {
  const curr = getSummary(currentTxs);
  const prev = getSummary(prevTxs);
  const catBreakdown = getCategoryBreakdown(currentTxs);
  const topCat = catBreakdown[0];
  const expChange = prev.expense > 0 ? Math.round(((curr.expense - prev.expense) / prev.expense) * 100) : 0;
  const avgTx = currentTxs.filter(t => t.type==='expense').length > 0
    ? Math.round(currentTxs.filter(t => t.type==='expense').reduce((a,t) => a+t.amount, 0) / currentTxs.filter(t => t.type==='expense').length)
    : 0;
  const savingMsg = curr.savingRate >= 30 ? 'Excellent! Well above the 20% target.' : curr.savingRate >= 20 ? "Good — hitting the 20% saving target." : curr.savingRate >= 10 ? 'Decent. Try to trim discretionary spend.' : curr.savingRate > 0 ? 'Below target. Review your largest expenses.' : 'Spending exceeds income this period.';

  const cards = [
    { icon: Trophy,    bg:'var(--amber-bg)', color:'var(--amber)', label:'Top Spending Category', value: topCat?.name ?? '—', valueColor: topCat ? CAT_COLORS[topCat.name as Category] : 'var(--text)', desc: topCat ? `${fmtINR(topCat.value)} · ${curr.expense>0?Math.round((topCat.value/curr.expense)*100):0}% of expenses` : 'No expenses this period' },
    { icon: PiggyBank, bg: curr.savingRate>=20?'var(--green-bg)':curr.savingRate>=10?'var(--amber-bg)':'var(--red-bg)', color: curr.savingRate>=20?'var(--green)':curr.savingRate>=10?'var(--amber)':'var(--red)', label:'Saving Rate', value:`${curr.savingRate}%`, valueColor: curr.savingRate>=20?'var(--green)':curr.savingRate>=10?'var(--amber)':'var(--red)', desc: savingMsg },
    { icon: TrendingUp, bg: expChange<0?'var(--green-bg)':expChange>0?'var(--red-bg)':'var(--bg3)', color: expChange<0?'var(--green)':expChange>0?'var(--red)':'var(--text4)', label:'Expense Change', value: expChange!==0?`${expChange>0?'+':''}${expChange}%`:'—', valueColor: expChange<0?'var(--green)':expChange>0?'var(--red)':'var(--text4)', desc: expChange<0?'Spending down vs prior period — great!':expChange>0?'Spending up vs prior period.':'Not enough prior data.' },
    { icon: Zap,       bg:'var(--blue-bg)', color:'var(--blue)', label:'Avg Transaction', value: avgTx>0?fmtINR(avgTx):'—', valueColor:'var(--blue)', desc:`Across ${currentTxs.filter(t=>t.type==='expense').length} expense transactions` },
  ];

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12, marginBottom:24 }} className="lg-4col">
      {cards.map(({ icon: Icon, bg, color, label, value, valueColor, desc }) => (
        <div key={label} className="panel animate-slide-up">
          <div style={{ width:36, height:36, borderRadius:10, background:bg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
            <Icon size={16} style={{ color }} />
          </div>
          <p className="label" style={{ marginBottom:4 }}>{label}</p>
          <p style={{ fontSize:20, fontWeight:700, fontFamily:'var(--font-dm-mono),monospace', color:valueColor, marginBottom:4 }}>{value}</p>
          <p style={{ fontSize:12, color:'var(--text4)', lineHeight:1.5 }}>{desc}</p>
        </div>
      ))}
    </div>
  );
}
