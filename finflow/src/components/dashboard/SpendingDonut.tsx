'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CAT_COLORS } from '@/lib/data';
import { fmtINR } from '@/lib/utils';
import { Category } from '@/types';

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{ background:'var(--tooltip-bg)', border:'1px solid var(--tooltip-border)', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
      <p style={{ fontWeight:500, marginBottom:4, color: d.payload.fill }}>{d.name}</p>
      <p style={{ fontFamily:'var(--font-dm-mono),monospace', color:'var(--text)' }}>{fmtINR(d.value)}</p>
    </div>
  );
};

export default function SpendingDonut({ data }: { data: { name: string; value: number }[] }) {
  if (!data.length) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:160, color:'var(--text4)', fontSize:14 }}>No expense data</div>;
  const total = data.reduce((a, d) => a + d.value, 0);
  const top6 = data.slice(0, 6);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', justifyContent:'center' }}>
        <div style={{ width:160, height:160, position:'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={top6} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={2} dataKey="value" strokeWidth={0}>
                {top6.map(entry => <Cell key={entry.name} fill={CAT_COLORS[entry.name as Category] || '#888'} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
            <p style={{ fontSize:10, color:'var(--text4)' }}>total</p>
            <p style={{ fontSize:13, fontWeight:700, fontFamily:'var(--font-dm-mono),monospace', color:'var(--text)' }}>
              {total >= 100000 ? `₹${(total/100000).toFixed(1)}L` : `₹${(total/1000).toFixed(0)}K`}
            </p>
          </div>
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        {top6.map(d => {
          const pct = Math.round((d.value / total) * 100);
          const color = CAT_COLORS[d.name as Category] || '#888';
          return (
            <div key={d.name} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12 }}>
              <span style={{ width:8, height:8, borderRadius:2, background:color, flexShrink:0 }} />
              <span style={{ color:'var(--text2)', flex:1 }}>{d.name}</span>
              <span style={{ fontFamily:'var(--font-dm-mono),monospace', color:'var(--text3)' }}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
