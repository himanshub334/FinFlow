'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CAT_COLORS } from '@/lib/data';
import { Category } from '@/types';
import { fmtINRShort, fmtINR } from '@/lib/utils';

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{ background:'var(--tooltip-bg)', border:'1px solid var(--tooltip-border)', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
      <p style={{ fontWeight:500, marginBottom:4, color:d.payload.fill }}>{d.payload.name}</p>
      <p style={{ fontFamily:'var(--font-dm-mono),monospace', color:'var(--text)' }}>{fmtINR(d.value)}</p>
    </div>
  );
};

export default function CategoryChart({ data }: { data: { name: string; value: number }[] }) {
  if (!data.length) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:200, color:'var(--text4)', fontSize:14 }}>No expense data</div>;
  const top8 = data.slice(0,8).map(d => ({ ...d, fill: CAT_COLORS[d.name as Category] || '#888' }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={top8} layout="vertical" margin={{ top:0, right:5, bottom:0, left:60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" tickFormatter={fmtINRShort} tick={{ fill:'var(--text3)', fontSize:10 }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fill:'var(--text2)', fontSize:11 }} axisLine={false} tickLine={false} width={60} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[0,4,4,0]} maxBarSize={20}>
          {top8.map(entry => <Cell key={entry.name} fill={entry.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
