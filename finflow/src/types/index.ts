export type TransactionType = 'income' | 'expense';
export type Role = 'admin' | 'viewer';
export type Category =
  | 'Food' | 'Transport' | 'Housing' | 'Entertainment'
  | 'Utilities' | 'Healthcare' | 'Shopping' | 'Salary'
  | 'Freelance' | 'Investment' | 'Other';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: Category;
  type: TransactionType;
  amount: number;
}

export interface FilterState {
  search: string;
  type: TransactionType | '';
  category: Category | '';
  sortBy: 'date' | 'amount';
  sortDir: 'asc' | 'desc';
}
