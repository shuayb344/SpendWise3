import React from 'react';
import { Card, Button } from '../ui';
import { formatCurrency, formatDate, cn } from '../../utils/helpers';
import { Receipt, ArrowRight, ShoppingCart, Coffee, Home, Car, Utensils, Zap, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryIcons = {
    Food: Utensils,
    Rent: Home,
    Transport: Car,
    Salary: Zap,
    Shopping: ShoppingCart,
    Entertainment: Coffee,
    Other: Receipt,
};

export const RecentTransactions = ({ transactions, loading }) => {
    if (loading) {
        return (
            <Card className="divide-y divide-slate-100 dark:divide-slate-800">
                <div className="p-6 flex items-center justify-between">
                    <h3 className="font-bold dark:text-white">Recent Transactions</h3>
                    <div className="w-20 h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 flex items-center gap-4 animate-pulse">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div>
                            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/4"></div>
                        </div>
                        <div className="w-16 h-4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    </div>
                ))}
            </Card>
        );
    }

    if (transactions.length === 0) {
        return (
            <Card className="p-12 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                    <Receipt className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">No transactions yet</h3>
                    <p className="text-slate-500 text-sm mt-1">Start tracking your expenses by adding your first transaction.</p>
                </div>
                <Link to="/transactions">
                    <Button variant="outline" className="mt-2">
                        Add Transaction <PlusCircle className="w-4 h-4" />
                    </Button>
                </Link>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col">
            <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                <Link to="/transactions" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1 group">
                    View all
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.slice(0, 5).map((transaction) => {
                    const Icon = categoryIcons[transaction.category] || categoryIcons.Other;
                    const isExpense = transaction.type === 'expense';

                    return (
                        <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-default">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "p-2.5 rounded-xl",
                                    isExpense ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                                )}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">{transaction.title}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(transaction.date)} • {transaction.category}</p>
                                </div>
                            </div>
                            <p className={cn(
                                "font-bold",
                                isExpense ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
                            )}>
                                {isExpense ? '-' : '+'}{formatCurrency(transaction.amount)}
                            </p>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
