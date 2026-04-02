'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Role, FilterState, Category, TransactionType } from '@/types';
import { INITIAL_TRANSACTIONS } from '@/lib/data';
import { generateId } from '@/lib/utils';

interface AppState {
  transactions: Transaction[];
  role: Role;
  filters: FilterState;
  activePeriod: '1M' | '3M' | '6M';
  darkMode: boolean;
  setRole: (role: Role) => void;
  setPeriod: (period: '1M' | '3M' | '6M') => void;
  toggleDarkMode: () => void;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  resetData: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  search: '', type: '', category: '', sortBy: 'date', sortDir: 'desc',
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      transactions: INITIAL_TRANSACTIONS,
      role: 'admin',
      filters: DEFAULT_FILTERS,
      activePeriod: '1M',
      darkMode: true,

      setRole: (role) => set({ role }),
      setPeriod: (activePeriod) => set({ activePeriod }),
      toggleDarkMode: () => set((s) => {
        const next = !s.darkMode;
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { darkMode: next };
      }),
      setFilter: (key, value) => set((s) => ({ filters: { ...s.filters, [key]: value } })),
      resetFilters: () => set({ filters: DEFAULT_FILTERS }),
      addTransaction: (tx) => set((s) => ({ transactions: [{ ...tx, id: generateId() }, ...s.transactions] })),
      updateTransaction: (id, tx) => set((s) => ({ transactions: s.transactions.map((t) => t.id === id ? { ...tx, id } : t) })),
      deleteTransaction: (id) => set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) })),
      resetData: () => set({ transactions: INITIAL_TRANSACTIONS }),
    }),
    {
      name: 'finflow-storage',
      partialize: (s) => ({
        transactions: s.transactions,
        role: s.role,
        activePeriod: s.activePeriod,
        darkMode: s.darkMode,
      }),
    }
  )
);

export function useFilteredTransactions() {
  const { transactions, filters, activePeriod } = useStore();
  const months = activePeriod === '1M' ? 1 : activePeriod === '3M' ? 3 : 6;
  const now = new Date(2025, 2, 31);
  const cutoff = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);

  return transactions
    .filter((t) => {
      if (new Date(t.date) < cutoff) return false;
      if (filters.type && t.type !== filters.type) return false;
      if (filters.category && t.category !== filters.category) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!t.description.toLowerCase().includes(q) && !t.category.toLowerCase().includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'date') {
        return filters.sortDir === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return filters.sortDir === 'desc' ? b.amount - a.amount : a.amount - b.amount;
    });
}
