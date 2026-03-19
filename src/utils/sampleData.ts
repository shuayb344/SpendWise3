import { Transaction } from '../types';

export const sampleTransactions: Transaction[] = [
    { id: '1', description: 'Monthly Salary', amount: 5000, category: 'Salary', type: 'income', date: new Date().toISOString() },
    { id: '2', description: 'Apartment Rent', amount: 1200, category: 'Rent', type: 'expense', date: new Date().toISOString() },
    { id: '3', description: 'Whole Foods Grocery', amount: 156.32, category: 'Food', type: 'expense', date: new Date().toISOString() },
    { id: '4', description: 'Freelance Project', amount: 850, category: 'Other', type: 'income', date: new Date().toISOString() },
    { id: '5', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense', date: new Date().toISOString() },
    { id: '6', description: 'Gas Station', amount: 45, category: 'Transport', type: 'expense', date: new Date().toISOString() },
    { id: '7', description: 'Coffee Shop', amount: 4.50, category: 'Food', type: 'expense', date: new Date().toISOString() },
    { id: '8', description: 'Electricity Bill', amount: 85.50, category: 'Rent', type: 'expense', date: new Date().toISOString() },
];

export const seedData = (setTransactions: (transactions: Transaction[]) => void) => {
    setTransactions(sampleTransactions);
};
