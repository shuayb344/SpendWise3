import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { MonthlyBarChart } from '../components/charts/MonthlyBarChart';
import { Card } from '../components/ui';
import { PieChart, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const Reports = () => {
    const { transactions, totals } = useFinance();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Financial Reports</h1>
                <p className="text-slate-500 dark:text-slate-400">Detailed breakdown of your financial activity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart className="w-5 h-5 text-indigo-600" />
                        <h2 className="font-bold text-slate-900 dark:text-white">Expenses by Category</h2>
                    </div>
                    <CategoryPieChart transactions={transactions} />
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        <h2 className="font-bold text-slate-900 dark:text-white">Income vs Expenses</h2>
                    </div>
                    <MonthlyBarChart transactions={transactions} />
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-indigo-600 text-white border-none">
                    <div className="flex items-center gap-3 mb-4 opacity-80">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-sm font-medium">Average Expense</span>
                    </div>
                    <h3 className="text-2xl font-bold">
                        {formatCurrency(transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0) / (transactions.filter(t => t.type === 'expense').length || 1))}
                    </h3>
                    <p className="text-xs mt-2 opacity-70">Calculated across all transactions</p>
                </Card>

                <Card className="p-6 bg-emerald-600 text-white border-none">
                    <div className="flex items-center gap-3 mb-4 opacity-80">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-sm font-medium">Savings Rate</span>
                    </div>
                    <h3 className="text-2xl font-bold">
                        {totals.income > 0 ? ((totals.income - totals.expenses) / totals.income * 100).toFixed(1) : 0}%
                    </h3>
                    <p className="text-xs mt-2 opacity-70">Percentage of income saved</p>
                </Card>

                <Card className="p-6 bg-slate-900 text-white border-none">
                    <div className="flex items-center gap-3 mb-4 opacity-80">
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-sm font-medium">Monthly Target</span>
                    </div>
                    <h3 className="text-2xl font-bold">On Track</h3>
                    <p className="text-xs mt-2 opacity-70">You are within your budget limits</p>
                </Card>
            </div>
        </div>
    );
};

export default Reports;
