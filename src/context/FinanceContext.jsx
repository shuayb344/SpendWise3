import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storageService } from '../services/storageService';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => storageService.getTransactions());
    const [budget, setBudget] = useState(() => storageService.getBudget());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial load for skeletons
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        storageService.saveTransactions(transactions);
    }, [transactions]);

    useEffect(() => {
        storageService.saveBudget(budget);
    }, [budget]);

    const totals = useMemo(() => {
        return transactions.reduce(
            (acc, curr) => {
                if (curr.type === 'income') {
                    acc.income += curr.amount;
                    acc.balance += curr.amount;
                } else {
                    acc.expenses += curr.amount;
                    acc.balance -= curr.amount;
                }
                return acc;
            },
            { balance: 0, income: 0, expenses: 0 }
        );
    }, [transactions]);

    const addTransaction = (transaction) => {
        const newTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
            date: transaction.date || new Date().toISOString()
        };
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    const updateTransaction = (id, updatedData) => {
        setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
        );
    };

    const value = {
        transactions,
        totals,
        budget,
        setBudget,
        addTransaction,
        deleteTransaction,
        updateTransaction,
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
