import React, { useState, useMemo } from 'react';
import { Card, Input, Button } from '../ui';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatDate, cn } from '../../utils/helpers';
import { Trash2, Search, Receipt, ArrowUpDown, ChevronDown } from 'lucide-react';

export const TransactionList = () => {
    const { transactions, deleteTransaction } = useFinance();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    const categories = ['All', 'Expense', 'Income', 'Food', 'Rent', 'Transport', 'Salary', 'Shopping', 'Entertainment', 'Other'];

    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const filteredTransactions = useMemo(() => {
        let result = transactions.filter(t => {
            const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === 'All' || t.category === filter || t.type === filter.toLowerCase();
            return matchesSearch && matchesFilter;
        });

        return result.sort((a, b) => {
            let valA = a[sortConfig.key];
            let valB = b[sortConfig.key];

            if (sortConfig.key === 'amount') {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            }

            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [transactions, search, filter, sortConfig]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                        placeholder="Search transactions..."
                        className="pl-10 h-11"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
                    {categories.slice(0, 6).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border",
                                filter === cat
                                    ? "bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-600/20"
                                    : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:border-indigo-300"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em]">
                                <th className="px-6 py-5 font-black cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('date')}>
                                    <div className="flex items-center gap-2">Date <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-5 font-black cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('title')}>
                                    <div className="flex items-center gap-2">Description <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-5 font-black">Category</th>
                                <th className="px-6 py-5 font-black text-right cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('amount')}>
                                    <div className="flex items-center justify-end gap-2">Amount <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-5 font-black text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((t) => {
                                    const isExpense = t.type === 'expense';
                                    return (
                                        <tr key={t.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all duration-200">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                                                {formatDate(t.date)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{t.title}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                                                    "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                                                )}>
                                                    {t.category}
                                                </span>
                                            </td>
                                            <td className={cn(
                                                "px-6 py-4 text-right font-black tabular-nums",
                                                isExpense ? "text-rose-500" : "text-emerald-500"
                                            )}>
                                                {isExpense ? '-' : '+'}{formatCurrency(t.amount)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => deleteTransaction(t.id)}
                                                    className="p-2 text-slate-300 hover:text-rose-500 transition-all transform hover:scale-110"
                                                    title="Delete transaction"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <Receipt className="w-12 h-12 opacity-20" />
                                            <p className="text-sm font-medium italic">No matches found for "{search}"</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
