'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/context/store';
import Sidebar from './Sidebar';
import DashboardPage from '@/components/dashboard/DashboardPage';
import TransactionsPage from '@/components/transactions/TransactionsPage';
import InsightsPage from '@/components/insights/InsightsPage';
import { Menu } from 'lucide-react';

export type Page = 'dashboard' | 'transactions' | 'insights';

export default function AppShell() {
  const { darkMode } = useStore();
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode, mounted]);

  const pageMap: Record<Page, React.ReactNode> = {
    dashboard:    <DashboardPage />,
    transactions: <TransactionsPage />,
    insights:     <InsightsPage />,
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 lg:hidden" style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:relative inset-y-0 left-0 z-30 w-56 flex-shrink-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar activePage={activePage} setActivePage={(p) => { setActivePage(p); setSidebarOpen(false); }} />
      </aside>

      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 sticky top-0 z-10"
          style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', display: 'flex' }}>
            <Menu size={20} />
          </button>
          <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
            fin<span style={{ color: 'var(--green)' }}>.</span>flow
          </span>
        </div>

        <div className="p-4 md:p-6 lg:p-8 page-transition" key={activePage}>
          {pageMap[activePage]}
        </div>
      </main>
    </div>
  );
}
