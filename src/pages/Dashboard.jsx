import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { Card } from '../components/ui';
import { BarChart3, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const { transactions, totals, loading } = useFinance();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-slate-500 dark:text-slate-400">Track your income and expenses at a glance.</p>
            </div>

            <SummaryCards totals={totals} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <RecentTransactions transactions={transactions} loading={loading} />
                </div>

                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-center">Expense Structure</h3>
                        <CategoryPieChart transactions={transactions} />
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Insights</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/20">
                                <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 mb-2 font-bold">
                                    <TrendingUp className="w-5 h-5" />
                                    <span>Budget Tip</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {transactions.length === 0
                                        ? "Add some transactions to start seeing insights!"
                                        : "You're doing great! Keep an eye on your recurring expenses to save more."}
                                </p>
                            </div>

                            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20">
                                <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 mb-2 font-bold">
                                    <BarChart3 className="w-5 h-5" />
                                    <span>Savings Target</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Set a monthly budget to help you reach your savings goals faster.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
