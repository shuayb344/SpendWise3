import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const { user } = useAuth();
    const userId = user?.id;

    const [transactions, setTransactions] = useState([]);
    const [budget, setBudget] = useState(0);
    const [loading, setLoading] = useState(true);

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

    const totals = useMemo(() => {
        return transactions.reduce(
            (acc, curr) => {
                const amount = parseFloat(curr.amount) || 0;
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
