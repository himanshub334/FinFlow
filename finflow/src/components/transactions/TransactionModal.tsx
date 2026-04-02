'use client';
import { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '@/types';
import { CATEGORIES } from '@/lib/data';
import { useStore } from '@/context/store';
import { X } from 'lucide-react';

export default function TransactionModal({ tx, onClose }: { tx?: Transaction | null; onClose: () => void }) {
  const { addTransaction, updateTransaction } = useStore();
  const [form, setForm] = useState({ date:'2025-03-23', description:'', category:'Food' as Category, type:'expense' as TransactionType, amount:'' as any });

  useEffect(() => {
    if (tx) setForm({ ...tx, amount: tx.amount });
    else setForm({ date:'2025-03-23', description:'', category:'Food', type:'expense', amount:'' });
  }, [tx]);

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSave = () => {
    const amount = parseFloat(String(form.amount));
    if (!amount || !form.description.trim() || !form.date) return;
    const payload = { date: form.date, description: form.description.trim(), category: form.category, type: form.type, amount };
    if (tx) updateTransaction(tx.id, payload);
    else addTransaction(payload);
    onClose();
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.65)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border2)', borderRadius:16, padding:24, width:'100%', maxWidth:420 }} className="animate-slide-up">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)' }}>{tx ? 'Edit Transaction' : 'Add Transaction'}</h3>
          <button onClick={onClose} style={{ color:'var(--text4)', background:'none', border:'none', cursor:'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <label className="label" style={{ display:'block', marginBottom:6 }}>Date</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className="input" />
            </div>
            <div>
              <label className="label" style={{ display:'block', marginBottom:6 }}>Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="0" min="0" className="input" />
            </div>
          </div>
          <div>
            <label className="label" style={{ display:'block', marginBottom:6 }}>Description</label>
            <input type="text" value={form.description} onChange={e => set('description', e.target.value)} placeholder="e.g. Grocery shopping" className="input" />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <label className="label" style={{ display:'block', marginBottom:6 }}>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="select" style={{ width:'100%' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label" style={{ display:'block', marginBottom:6 }}>Type</label>
              <select value={form.type} onChange={e => set('type', e.target.value)} className="select" style={{ width:'100%' }}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:10, marginTop:20, justifyContent:'flex-end' }}>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} className="btn-primary">{tx ? 'Save Changes' : 'Add Transaction'}</button>
        </div>
      </div>
    </div>
  );
}
