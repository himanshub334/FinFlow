'use client';
import { useState } from 'react';
import { useStore, useFilteredTransactions } from '@/context/store';
import { CATEGORIES, CAT_COLORS, CAT_BG } from '@/lib/data';
import { fmtINR, fmtDate, exportCSV, exportJSON } from '@/lib/utils';
import { Transaction } from '@/types';
import TransactionModal from './TransactionModal';
import { Search, SlidersHorizontal, ArrowUpDown, Plus, Pencil, Trash2, Download, X, ChevronUp, ChevronDown } from 'lucide-react';

export default function TransactionsPage() {
  const { role, filters, setFilter, resetFilters, deleteTransaction } = useStore();
  const filtered = useFilteredTransactions();
  const [modal, setModal] = useState<{ open: boolean; tx: Transaction | null }>({ open: false, tx: null });
  const [showExport, setShowExport] = useState(false);
  const isAdmin = role === 'admin';
  const hasActiveFilters = filters.search || filters.type || filters.category;

  const toggleSort = (col: 'date' | 'amount') => {
    if (filters.sortBy === col) setFilter('sortDir', filters.sortDir === 'desc' ? 'asc' : 'desc');
    else { setFilter('sortBy', col); setFilter('sortDir', 'desc'); }
  };

  const SortIcon = ({ col }: { col: 'date' | 'amount' }) => {
    if (filters.sortBy !== col) return <ArrowUpDown size={12} style={{ color:'var(--text4)' }} />;
    return filters.sortDir === 'desc' ? <ChevronDown size={12} style={{ color:'var(--green)' }} /> : <ChevronUp size={12} style={{ color:'var(--green)' }} />;
  };

  return (
    <div>
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:'-0.025em', color:'var(--text)' }}>Transactions</h2>
          <p style={{ fontSize:13, color:'var(--text4)', marginTop:2 }}>{filtered.length} transaction{filtered.length !== 1 ? 's' : ''} shown</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <div style={{ position:'relative' }}>
            <button className="btn-secondary" onClick={() => setShowExport(s => !s)}>
              <Download size={14} />Export
            </button>
            {showExport && (
              <div style={{ position:'absolute', right:0, top:'calc(100% + 4px)', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden', zIndex:10, minWidth:160, boxShadow:'0 8px 24px rgba(0,0,0,0.2)' }}>
                <button style={{ width:'100%', padding:'10px 16px', fontSize:13, color:'var(--text2)', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontFamily:'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  onClick={() => { exportCSV(filtered); setShowExport(false); }}>Export as CSV</button>
                <button style={{ width:'100%', padding:'10px 16px', fontSize:13, color:'var(--text2)', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontFamily:'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  onClick={() => { exportJSON(filtered); setShowExport(false); }}>Export as JSON</button>
              </div>
            )}
          </div>
          {isAdmin && (
            <button className="btn-primary" onClick={() => setModal({ open:true, tx:null })}>
              <Plus size={14} />Add
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="panel" style={{ marginBottom:16 }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, alignItems:'center' }}>
          <div style={{ position:'relative', flex:'1', minWidth:160 }}>
            <Search size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text4)' }} />
            <input type="text" value={filters.search} onChange={e => setFilter('search', e.target.value)}
              placeholder="Search transactions..." className="input" style={{ paddingLeft:32 }} />
          </div>
          <select value={filters.type} onChange={e => setFilter('type', e.target.value)} className="select">
            <option value="">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filters.category} onChange={e => setFilter('category', e.target.value)} className="select">
            <option value="">All categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="btn-secondary" style={{ fontSize:12 }}>
              <X size={12} />Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="panel" style={{ padding:0, overflow:'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'4rem 2rem', textAlign:'center' }}>
            <div style={{ width:48, height:48, borderRadius:'50%', background:'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
              <SlidersHorizontal size={20} style={{ color:'var(--text4)' }} />
            </div>
            <p style={{ color:'var(--text2)', fontWeight:500, marginBottom:4 }}>No transactions found</p>
            <p style={{ color:'var(--text4)', fontSize:13 }}>Try adjusting your filters or adding a new transaction.</p>
          </div>
        ) : (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid var(--border)' }}>
                  <th style={{ textAlign:'left', padding:'10px 16px' }}>
                    <button onClick={() => toggleSort('date')} className="label" style={{ display:'inline-flex', alignItems:'center', gap:6, background:'none', border:'none', cursor:'pointer', color:'var(--text3)' }}>
                      Date <SortIcon col="date" />
                    </button>
                  </th>
                  <th style={{ textAlign:'left', padding:'10px 16px' }}><span className="label">Description</span></th>
                  <th style={{ textAlign:'left', padding:'10px 16px' }}><span className="label">Category</span></th>
                  <th style={{ textAlign:'left', padding:'10px 16px' }}><span className="label">Type</span></th>
                  <th style={{ textAlign:'right', padding:'10px 16px' }}>
                    <button onClick={() => toggleSort('amount')} className="label" style={{ display:'inline-flex', alignItems:'center', gap:6, background:'none', border:'none', cursor:'pointer', marginLeft:'auto', color:'var(--text3)' }}>
                      Amount <SortIcon col="amount" />
                    </button>
                  </th>
                  {isAdmin && <th style={{ textAlign:'center', padding:'10px 16px' }}><span className="label">Actions</span></th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} style={{ borderBottom:'1px solid var(--border)', transition:'background 0.1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding:'10px 16px', color:'var(--text3)', fontSize:12, whiteSpace:'nowrap', fontFamily:'var(--font-dm-mono),monospace' }}>
                      {fmtDate(t.date, { day:'2-digit', month:'short', year:'2-digit' })}
                    </td>
                    <td style={{ padding:'10px 16px', color:'var(--text)', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.description}</td>
                    <td style={{ padding:'10px 16px' }}>
                      <span className="cat-pill" style={{ background: CAT_BG[t.category], color: CAT_COLORS[t.category] }}>{t.category}</span>
                    </td>
                    <td style={{ padding:'10px 16px' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12 }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background: t.type==='income' ? 'var(--green)' : 'var(--red)', display:'inline-block' }} />
                        <span style={{ color: t.type==='income' ? 'var(--green)' : 'var(--red)' }}>{t.type}</span>
                      </span>
                    </td>
                    <td style={{ padding:'10px 16px', textAlign:'right', fontFamily:'var(--font-dm-mono),monospace', fontWeight:500, whiteSpace:'nowrap', color: t.type==='income' ? 'var(--green)' : 'var(--red)' }}>
                      {t.type==='income' ? '+' : '-'}{fmtINR(t.amount)}
                    </td>
                    {isAdmin && (
                      <td style={{ padding:'10px 16px', textAlign:'center' }}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
                          <button onClick={() => setModal({ open:true, tx:t })} title="Edit"
                            style={{ padding:'5px', borderRadius:6, background:'none', border:'none', cursor:'pointer', color:'var(--text4)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color='var(--blue)'; (e.currentTarget as HTMLButtonElement).style.background='var(--blue-bg)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color='var(--text4)'; (e.currentTarget as HTMLButtonElement).style.background='none'; }}>
                            <Pencil size={13} />
                          </button>
                          <button onClick={() => { if (confirm('Delete this transaction?')) deleteTransaction(t.id); }} title="Delete"
                            style={{ padding:'5px', borderRadius:6, background:'none', border:'none', cursor:'pointer', color:'var(--text4)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color='var(--red)'; (e.currentTarget as HTMLButtonElement).style.background='var(--red-bg)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color='var(--text4)'; (e.currentTarget as HTMLButtonElement).style.background='none'; }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal.open && <TransactionModal tx={modal.tx} onClose={() => setModal({ open:false, tx:null })} />}
    </div>
  );
}
