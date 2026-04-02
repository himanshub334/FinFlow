'use client';
import { Transaction } from '@/types';
import { CAT_COLORS, CAT_BG } from '@/lib/data';
import { fmtINR, fmtDate } from '@/lib/utils';

export default function RecentTransactions({ txs }: { txs: Transaction[] }) {
  const recent = [...txs].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
  return (
    <div className="panel">
      <h3 style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:16 }}>Recent Transactions</h3>
      {recent.length === 0
        ? <p style={{ color:'var(--text4)', fontSize:13, textAlign:'center', padding:'2rem 0' }}>No transactions yet</p>
        : <div>
            {recent.map((t) => (
              <div key={t.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 8px', borderRadius:8, cursor:'default', transition:'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <div style={{ display:'flex', alignItems:'center', gap:12, minWidth:0 }}>
                  <div style={{ width:32, height:32, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:12, fontWeight:700, background: CAT_BG[t.category], color: CAT_COLORS[t.category] }}>
                    {t.category[0]}
                  </div>
                  <div style={{ minWidth:0 }}>
                    <p style={{ fontSize:13, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.description}</p>
                    <p style={{ fontSize:11, color:'var(--text4)' }}>{fmtDate(t.date, { day:'2-digit', month:'short' })}</p>
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0, marginLeft:16 }}>
                  <p style={{ fontFamily:'var(--font-dm-mono),monospace', fontSize:13, fontWeight:500, color: t.type==='income' ? 'var(--green)' : 'var(--red)' }}>
                    {t.type==='income' ? '+' : '-'}{fmtINR(t.amount)}
                  </p>
                  <span style={{ fontSize:10, padding:'2px 8px', borderRadius:999, background: CAT_BG[t.category], color: CAT_COLORS[t.category], fontWeight:500 }}>
                    {t.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}
