export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    type: TransactionType;
}

export interface Totals {
    balance: number;
    income: number;
    expenses: number;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => { success: boolean; message?: string };
    signup: (name: string, email: string, password: string) => { success: boolean; message?: string };
    logout: () => void;
    isAuthenticated: boolean;
}

export interface FinanceContextType {
    transactions: Transaction[];
    totals: Totals;
    budget: number;
    setBudget: (budget: number) => void;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    deleteTransaction: (id: string) => void;
    updateTransaction: (id: string, updatedData: Partial<Transaction>) => void;
    seedTransactions: () => void;
    loading: boolean;
}
