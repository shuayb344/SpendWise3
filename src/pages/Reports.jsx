import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { MonthlyBarChart } from '../components/charts/MonthlyBarChart';
import { DailySpendingChart } from '../components/charts/DailySpendingChart';
import { Card } from '../components/ui';
import { PieChart, BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const Reports = () => {
    const { transactions, totals } = useFinance();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Financial Reports</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">A deep dive into your financial habits and trends.</p>
            </div>

            <Card className="p-8 border-none shadow-2xl shadow-indigo-100 dark:shadow-none bg-white dark:bg-slate-900">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Daily Spending Trend</h2>
                </div>
                <DailySpendingChart transactions={transactions} />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart className="w-5 h-5 text-indigo-600" />
                        <h2 className="font-bold text-slate-900 dark:text-white">Expenses by Category</h2>
                    </div>
                    <CategoryPieChart transactions={transactions} />
                </Card>

                <Card className="p-6 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        <h2 className="font-bold text-slate-900 dark:text-white">Income vs Expenses</h2>
                    </div>
                    <MonthlyBarChart transactions={transactions} />
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-indigo-600 text-white border-none shadow-xl shadow-indigo-200 dark:shadow-none">
                    <div className="flex items-center gap-3 mb-4 opacity-80">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-sm font-medium">Average Expense</span>
                    </div>
                    <h3 className="text-3xl font-black tabular-nums">
                        {formatCurrency(transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0) / (transactions.filter(t => t.type === 'expense').length || 1))}
                    </h3>
                    <p className="text-xs mt-2 opacity-70 italic tracking-wide">Based on your activity</p>
                </Card>

                <Card className="p-6 bg-emerald-600 text-white border-none shadow-xl shadow-emerald-200 dark:shadow-none">
                    <div className="flex items-center gap-3 mb-4 opacity-80">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-sm font-medium">Savings Rate</span>
                    </div>
                    <h3 className="text-3xl font-black tabular-nums">
                        {totals.income > 0 ? ((totals.income - totals.expenses) / totals.income * 100).toFixed(1) : 0}%
                    </h3>
                    <p className="text-xs mt-2 opacity-70 italic tracking-wide">Efficiency of your budget</p>
                </Card>

                <Card className="p-6 bg-slate-900 text-white border-none shadow-xl shadow-slate-200 dark:shadow-none">
                    <div className="flex items-center gap-3 mb-4 opacity-80 border-b border-slate-700 pb-2">
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-sm font-medium">Financial Health</span>
                    </div>
                    <h3 className="text-2xl font-black">EXCELLENT</h3>
                    <div className="mt-3 flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-1.5 w-full rounded-full bg-indigo-500" />)}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Reports;
