import { Transaction } from '../types';

export const storageService = {
    saveTransactions: (transactions: Transaction[]) => {
        localStorage.setItem('spendwise_transactions', JSON.stringify(transactions));
    },
    getTransactions: (): Transaction[] => {
        const data = localStorage.getItem('spendwise_transactions');
        return data ? JSON.parse(data) : [];
    },
    saveBudget: (budget: number) => {
        localStorage.setItem('spendwise_budget', JSON.stringify(budget));
    },
    getBudget: (): number => {
        const data = localStorage.getItem('spendwise_budget');
        return data ? JSON.parse(data) : 0;
    },
    saveTheme: (theme: 'light' | 'dark') => {
        localStorage.setItem('spendwise_theme', theme);
    },
    getTheme: (): 'light' | 'dark' => {
        return (localStorage.getItem('spendwise_theme') as 'light' | 'dark') || 'light';
    }
};
