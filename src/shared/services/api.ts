import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { Transaction, TransactionType } from "../../@types";

const STORAGE_KEY = "granawise_transactions";

const initialData: Transaction[] = [
  {
    id: "1",
    amount: 5.0,
    type: TransactionType.EXPENSE,
    category: "food",
    description: "Almoço restaurante",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    amount: 1800.0,
    type: TransactionType.INCOME,
    category: "salary",
    description: "Salário Outubro",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    amount: 22.9,
    type: TransactionType.EXPENSE,
    category: "shopping",
    description: "Compras presentes",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    amount: 22.9,
    type: TransactionType.EXPENSE,
    category: "entertainment",
    description: "Cinema",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    amount: 22.9,
    type: TransactionType.EXPENSE,
    category: "transport",
    description: "Uber",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    amount: 22.9,
    type: TransactionType.EXPENSE,
    category: "home",
    description: "Conta de Água",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    amount: 22.9,
    type: TransactionType.EXPENSE,
    category: "health",
    description: "Dentista",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "8",
    amount: 22.9,
    type: TransactionType.EXPENSE,
    category: "shopping",
    description: "Supermarket",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "9",
    amount: 22.9,
    type: TransactionType.EXPENSE,
    category: "shopping",
    description: "Supermarket",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const getTransactionsFromStorage = async (): Promise<Transaction[]> => {
  try {
    // const stored = await AsyncStorage.getItem(STORAGE_KEY);
    // if (stored) {
    //   return JSON.parse(stored);
    // } else {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
    // }
  } catch (error) {
    console.error("Failed to parse transactions from AsyncStorage", error);
    return initialData;
  }
};

const saveTransactionsToStorage = (transactions: Transaction[]) => {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const api = {
  getTransactions: async (): Promise<Transaction[]> => {
    await new Promise((res) => setTimeout(res, 300));
    const transactions = await getTransactionsFromStorage();
    return transactions;
  },
  addTransaction: async (
    transaction: Omit<Transaction, "id">
  ): Promise<Transaction> => {
    await new Promise((res) => setTimeout(res, 300));
    const transactions = await getTransactionsFromStorage();
    const newTransaction = { ...transaction, id: uuidv4() };
    const updatedTransactions = [newTransaction, ...transactions];
    await saveTransactionsToStorage(updatedTransactions);
    return newTransaction;
  },
  updateTransaction: async (
    updatedTransaction: Transaction
  ): Promise<Transaction> => {
    await new Promise((res) => setTimeout(res, 300));
    let transactions = await getTransactionsFromStorage();
    transactions = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    await saveTransactionsToStorage(transactions);
    return updatedTransaction;
  },
  deleteTransaction: async (id: string): Promise<void> => {
    await new Promise((res) => setTimeout(res, 300));
    let transactions = await getTransactionsFromStorage();
    transactions = transactions.filter((t) => t.id !== id);
    await saveTransactionsToStorage(transactions);
  },
};
