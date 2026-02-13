import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { BudgetManager } from '../components/dashboard/BudgetManager';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { Card } from '../components/ui';

const Dashboard = () => {
    const { transactions, totals, loading } = useFinance();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Keep your finances under control with ease.</p>
                </div>
            </div>

            <SummaryCards totals={totals} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <RecentTransactions transactions={transactions} loading={loading} />
                </div>

                <div className="space-y-8">
                    <BudgetManager />

                    <Card className="p-6 border-indigo-100 dark:border-indigo-900/30">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-center text-sm uppercase tracking-wider">Expense Breakdown</h3>
                        <CategoryPieChart transactions={transactions} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
