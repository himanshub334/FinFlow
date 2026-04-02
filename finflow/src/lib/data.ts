import { Transaction, Category } from '@/types';

export const CATEGORIES: Category[] = [
  'Food', 'Transport', 'Housing', 'Entertainment',
  'Utilities', 'Healthcare', 'Shopping', 'Salary',
  'Freelance', 'Investment', 'Other'
];

export const CAT_COLORS: Record<Category, string> = {
  Food: '#ff4d6a',
  Transport: '#4d8fff',
  Housing: '#a78bfa',
  Entertainment: '#ffb347',
  Utilities: '#22d07a',
  Healthcare: '#00d4ff',
  Shopping: '#ff79c6',
  Salary: '#22d07a',
  Freelance: '#4dc9f6',
  Investment: '#b8ff57',
  Other: '#888888',
};

export const CAT_BG: Record<Category, string> = {
  Food: 'rgba(255,77,106,0.12)',
  Transport: 'rgba(77,143,255,0.12)',
  Housing: 'rgba(167,139,250,0.12)',
  Entertainment: 'rgba(255,179,71,0.12)',
  Utilities: 'rgba(34,208,122,0.12)',
  Healthcare: 'rgba(0,212,255,0.12)',
  Shopping: 'rgba(255,121,198,0.12)',
  Salary: 'rgba(34,208,122,0.12)',
  Freelance: 'rgba(77,201,246,0.12)',
  Investment: 'rgba(184,255,87,0.12)',
  Other: 'rgba(136,136,136,0.12)',
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1',  date: '2025-03-01', description: 'March Salary',         category: 'Salary',        type: 'income',  amount: 85000 },
  { id: '2',  date: '2025-03-03', description: 'Apartment Rent',       category: 'Housing',       type: 'expense', amount: 18000 },
  { id: '3',  date: '2025-03-05', description: 'BigBasket Groceries',  category: 'Food',          type: 'expense', amount: 3200  },
  { id: '4',  date: '2025-03-07', description: 'Ola Rides',            category: 'Transport',     type: 'expense', amount: 890   },
  { id: '5',  date: '2025-03-08', description: 'Netflix + Hotstar',    category: 'Entertainment', type: 'expense', amount: 1100  },
  { id: '6',  date: '2025-03-10', description: 'Electricity Bill',     category: 'Utilities',     type: 'expense', amount: 2400  },
  { id: '7',  date: '2025-03-12', description: 'Freelance UI Project', category: 'Freelance',     type: 'income',  amount: 22000 },
  { id: '8',  date: '2025-03-14', description: 'Restaurant Dinner',    category: 'Food',          type: 'expense', amount: 1850  },
  { id: '9',  date: '2025-03-16', description: 'Gym Membership',       category: 'Healthcare',    type: 'expense', amount: 2500  },
  { id: '10', date: '2025-03-18', description: 'Amazon Shopping',      category: 'Shopping',      type: 'expense', amount: 4300  },
  { id: '11', date: '2025-03-20', description: 'SIP Mutual Fund',      category: 'Investment',    type: 'expense', amount: 10000 },
  { id: '12', date: '2025-03-22', description: 'Zomato Orders',        category: 'Food',          type: 'expense', amount: 1620  },
  { id: '13', date: '2025-02-01', description: 'February Salary',      category: 'Salary',        type: 'income',  amount: 85000 },
  { id: '14', date: '2025-02-03', description: 'Apartment Rent',       category: 'Housing',       type: 'expense', amount: 18000 },
  { id: '15', date: '2025-02-05', description: 'Grocery Run',          category: 'Food',          type: 'expense', amount: 2900  },
  { id: '16', date: '2025-02-10', description: 'Bus Pass',             category: 'Transport',     type: 'expense', amount: 600   },
  { id: '17', date: '2025-02-14', description: 'Valentine Dinner',     category: 'Food',          type: 'expense', amount: 3200  },
  { id: '18', date: '2025-02-16', description: 'Water Bill',           category: 'Utilities',     type: 'expense', amount: 800   },
  { id: '19', date: '2025-02-20', description: 'Doctor Visit',         category: 'Healthcare',    type: 'expense', amount: 1500  },
  { id: '20', date: '2025-02-22', description: 'Freelance Logo Design',category: 'Freelance',     type: 'income',  amount: 8000  },
  { id: '21', date: '2025-02-25', description: 'SIP Mutual Fund',      category: 'Investment',    type: 'expense', amount: 10000 },
  { id: '22', date: '2025-01-01', description: 'January Salary',       category: 'Salary',        type: 'income',  amount: 85000 },
  { id: '23', date: '2025-01-03', description: 'Apartment Rent',       category: 'Housing',       type: 'expense', amount: 18000 },
  { id: '24', date: '2025-01-07', description: 'Groceries',            category: 'Food',          type: 'expense', amount: 3100  },
  { id: '25', date: '2025-01-09', description: 'Petrol',               category: 'Transport',     type: 'expense', amount: 1200  },
  { id: '26', date: '2025-01-12', description: 'Spotify + YouTube',    category: 'Entertainment', type: 'expense', amount: 400   },
  { id: '27', date: '2025-01-15', description: 'Electricity Bill',     category: 'Utilities',     type: 'expense', amount: 2100  },
  { id: '28', date: '2025-01-20', description: 'SIP Mutual Fund',      category: 'Investment',    type: 'expense', amount: 10000 },
  { id: '29', date: '2025-01-25', description: 'Swiggy Orders',        category: 'Food',          type: 'expense', amount: 2200  },
  { id: '30', date: '2025-01-28', description: 'Clothes Shopping',     category: 'Shopping',      type: 'expense', amount: 3500  },
];
