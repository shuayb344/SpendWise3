import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Transaction, FinanceContextType, Totals } from '../types';
import { sampleTransactions } from '../utils/sampleData';

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const userId = user?.id;

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [budget, setBudget] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    // Load user data when userId changes
    useEffect(() => {
        if (userId) {
            const savedTransactions = localStorage.getItem(`spendwise_transactions_${userId}`);
            const savedBudget = localStorage.getItem(`spendwise_budget_${userId}`);

            setTransactions(savedTransactions ? JSON.parse(savedTransactions) : []);
            setBudget(savedBudget ? JSON.parse(savedBudget) : 0);

            setLoading(false);
        } else {
            setTransactions([]);
            setBudget(0);
            setLoading(true);
        }
    }, [userId]);

    // Save user data when it changes
    useEffect(() => {
        if (userId) {
            localStorage.setItem(`spendwise_transactions_${userId}`, JSON.stringify(transactions));
        }
    }, [transactions, userId]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem(`spendwise_budget_${userId}`, JSON.stringify(budget));
        }
    }, [budget, userId]);

    const totals = useMemo<Totals>(() => {
        return transactions.reduce(
            (acc, curr) => {
                const amount = curr.amount || 0;
                if (curr.type === 'income') {
                    acc.income += amount;
                    acc.balance += amount;
                } else {
                    acc.expenses += amount;
                    acc.balance -= amount;
                }
                return acc;
            },
            { balance: 0, income: 0, expenses: 0 }
        );
    }, [transactions]);

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: crypto.randomUUID(),
            date: transaction.date || new Date().toISOString()
        };
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    const updateTransaction = (id: string, updatedData: Partial<Transaction>) => {
        setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
        );
    };

    const seedTransactions = () => {
        setTransactions(sampleTransactions);
    };

    const value: FinanceContextType = {
        transactions,
        totals,
        budget,
        setBudget,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        seedTransactions,
        loading
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
};
