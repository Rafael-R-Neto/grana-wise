import { SvgProps } from "react-native-svg";

export type Theme = 'light' | 'dark';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export type CategoryName =
  | 'food'
  | 'shopping'
  | 'transport'
  | 'home'
  | 'health'
  | 'entertainment'
  | 'salary'
  | 'other';

export interface Category {
  id: CategoryName;
  name: string;
  icon: React.ComponentType<SvgProps & { className?: string }>;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: CategoryName;
  description: string;
  date: string;
}
