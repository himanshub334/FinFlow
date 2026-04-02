'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fmtINRShort, fmtINR } from '@/lib/utils';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'var(--tooltip-bg)', border:'1px solid var(--tooltip-border)', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
      <p style={{ color:'var(--text3)', marginBottom:6, fontWeight:500 }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
          <span style={{ width:8, height:8, borderRadius:2, background:p.fill, display:'inline-block' }} />
          <span style={{ color:'var(--text2)' }}>{p.name}:</span>
          <span style={{ fontFamily:'var(--font-dm-mono),monospace', fontWeight:500, color:p.fill }}>{fmtINR(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function ComparisonChart({ data }: { data: any[] }) {
  if (!data.length) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:200, color:'var(--text4)', fontSize:14 }}>No data available</div>;
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top:5, right:5, bottom:0, left:0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="label" tick={{ fill:'var(--text3)', fontSize:11 }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmtINRShort} tick={{ fill:'var(--text3)', fontSize:11 }} axisLine={false} tickLine={false} width={52} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income"  name="Income"   fill="#4d8fff" radius={[4,4,0,0]} maxBarSize={32} />
        <Bar dataKey="expense" name="Expenses" fill="#ff4d6a" radius={[4,4,0,0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}
