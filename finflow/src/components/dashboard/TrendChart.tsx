'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fmtINRShort, fmtINR } from '@/lib/utils';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'var(--tooltip-bg)', border:'1px solid var(--tooltip-border)', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
      <p style={{ color:'var(--text3)', marginBottom:6, fontWeight:500 }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:p.color, display:'inline-block' }} />
          <span style={{ color:'var(--text2)' }}>{p.name}:</span>
          <span style={{ fontFamily:'var(--font-dm-mono),monospace', fontWeight:500, color:p.color }}>{fmtINR(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function TrendChart({ data }: { data: any[] }) {
  if (!data.length) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:200, color:'var(--text4)', fontSize:14 }}>No data available</div>;
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top:5, right:5, bottom:0, left:0 }}>
        <defs>
          <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#22d07a" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22d07a" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#4d8fff" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#4d8fff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#ff4d6a" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#ff4d6a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="label" tick={{ fill:'var(--text3)', fontSize:11 }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmtINRShort} tick={{ fill:'var(--text3)', fontSize:11 }} axisLine={false} tickLine={false} width={52} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="runningBalance" name="Balance"  stroke="#22d07a" strokeWidth={2}   fill="url(#balGrad)" dot={{ fill:'#22d07a', r:3 }} />
        <Area type="monotone" dataKey="income"         name="Income"   stroke="#4d8fff" strokeWidth={1.5} fill="url(#incGrad)" strokeDasharray="4 3" dot={false} />
        <Area type="monotone" dataKey="expense"        name="Expenses" stroke="#ff4d6a" strokeWidth={1.5} fill="url(#expGrad)" strokeDasharray="4 3" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
