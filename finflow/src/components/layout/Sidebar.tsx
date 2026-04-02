'use client';
import { useStore } from '@/context/store';
import { Page } from './AppShell';
import { LayoutDashboard, ListOrdered, Lightbulb, Moon, Sun, RotateCcw } from 'lucide-react';

const NAV = [
  { id: 'dashboard'    as Page, icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'transactions' as Page, icon: ListOrdered,     label: 'Transactions' },
  { id: 'insights'     as Page, icon: Lightbulb,       label: 'Insights' },
];

export default function Sidebar({ activePage, setActivePage }: {
  activePage: Page;
  setActivePage: (p: Page) => void;
}) {
  const { role, setRole, darkMode, toggleDarkMode, resetData } = useStore();

  return (
    <div className="h-full flex flex-col py-5"
      style={{ background: 'var(--bg2)', borderRight: '1px solid var(--border)', transition: 'background 0.25s ease' }}>

      {/* Logo */}
      <div className="px-5 mb-6">
        <h1 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text)' }}>
          fin<span style={{ color: 'var(--green)' }}>.</span>flow
        </h1>
        <p style={{ fontSize: 11, color: 'var(--text4)', marginTop: 2 }}>Finance Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <p className="label px-3 mb-2">Navigation</p>
        {NAV.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setActivePage(id)} className={`nav-item ${activePage === id ? 'active' : ''}`}>
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4" style={{ paddingTop: 16, marginTop: 16, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <p className="label" style={{ marginBottom: 6 }}>Role</p>
          <select value={role} onChange={(e) => setRole(e.target.value as any)} className="select" style={{ width: '100%' }}>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div style={{
          fontSize: 11, padding: '6px 12px', borderRadius: 8, fontWeight: 500, textAlign: 'center',
          background: role === 'admin' ? 'var(--green-bg)' : 'var(--blue-bg)',
          color:      role === 'admin' ? 'var(--green)'   : 'var(--blue)',
          border:     `1px solid ${role === 'admin' ? 'var(--green)' : 'var(--blue)'}`,
        }}>
          {role === 'admin' ? '✦ Admin — Full access' : '◎ Viewer — Read only'}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={toggleDarkMode} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button onClick={() => { if (confirm('Reset all data to defaults?')) resetData(); }}
            className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} title="Reset data">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
