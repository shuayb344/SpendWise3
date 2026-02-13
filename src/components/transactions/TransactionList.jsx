import React, { useState, useMemo } from 'react';
import { Card, Input, Button } from '../ui';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatDate, cn } from '../../utils/helpers';
import { Trash2, Search, Filter, Receipt, ChevronDown } from 'lucide-react';

export const TransactionList = () => {
    const { transactions, deleteTransaction } = useFinance();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === 'All' || t.category === filter || t.type === filter.toLowerCase();
            return matchesSearch && matchesFilter;
        });
    }, [transactions, search, filter]);

    const categories = ['All', 'Expense', 'Income', 'Food', 'Rent', 'Transport', 'Salary', 'Shopping', 'Entertainment', 'Other'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                        placeholder="Search transactions..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {categories.slice(0, 5).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                                filter === cat
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                    : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                    <div className="relative group">
                        <Button variant="secondary" className="rounded-full h-9">
                            More <ChevronDown className="w-4 h-4" />
                        </Button>
                        {/* Simple dropdown mock */}
                    </div>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-bold">Date</th>
                                <th className="px-6 py-4 font-bold">Description</th>
                                <th className="px-6 py-4 font-bold">Category</th>
                                <th className="px-6 py-4 font-bold text-right">Amount</th>
                                <th className="px-6 py-4 font-bold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((t) => (
                                    <tr key={t.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                            {formatDate(t.date)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {t.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                                {t.category}
                                            </span>
                                        </td>
                                        <td className={cn(
                                            "px-6 py-4 text-right font-bold",
                                            t.type === 'expense' ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
                                        )}>
                                            {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteTransaction(t.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                title="Delete transaction"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic">
                                        No transactions found matching your search.
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
