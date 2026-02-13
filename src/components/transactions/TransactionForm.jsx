import React, { useState } from 'react';
import { Card, Input, Button } from '../ui';
import { PlusCircle, Utensils, Home, Car, Zap, ShoppingCart, Coffee, Receipt, X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { cn } from '../../utils/helpers';

const categories = [
    { id: 'Food', icon: Utensils, label: 'Food & Dining' },
    { id: 'Rent', icon: Home, label: 'Rent & Utilities' },
    { id: 'Transport', icon: Car, label: 'Transport' },
    { id: 'Salary', icon: Zap, label: 'Salary & Fixed' },
    { id: 'Shopping', icon: ShoppingCart, label: 'Shopping' },
    { id: 'Entertainment', icon: Coffee, label: 'Entertainment' },
    { id: 'Other', icon: Receipt, label: 'Other' },
];

export const TransactionForm = ({ onSuccess }) => {
    const { addTransaction } = useFinance();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Other',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Description is required';
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        addTransaction({
            ...formData,
            amount: parseFloat(formData.amount)
        });

        setFormData({
            title: '',
            amount: '',
            category: 'Other',
            type: 'expense',
            date: new Date().toISOString().split('T')[0]
        });

        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                    className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                        formData.type === 'expense'
                            ? "bg-white dark:bg-slate-700 text-rose-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                >
                    Expense
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                    className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                        formData.type === 'income'
                            ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                >
                    Income
                </button>
            </div>

            <div className="space-y-4">
                <Input
                    label="What did you spend on?"
                    placeholder="e.g., Grocery shopping"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    error={errors.title}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Amount ($)"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        error={errors.amount}
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isSelected = formData.category === cat.id;

                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: cat.id })}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-1",
                                        isSelected
                                            ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:border-indigo-400 dark:text-indigo-400"
                                            : "border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 text-slate-500 hover:border-indigo-300"
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-[10px] font-medium leading-none">{cat.id}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg">
                {formData.type === 'expense' ? 'Add Expense' : 'Add Income'}
            </Button>
        </form>
    );
};
