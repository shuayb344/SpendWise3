import React from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../ui';
import { formatCurrency, cn } from '../../utils/helpers';

const StatCard = ({ title, amount, icon: Icon, trend, type }) => {
    const isIncome = type === 'income';
    const isExpense = type === 'expense';
    const isBalance = type === 'balance';

    return (
        <Card className="p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                    <h3 className="text-2xl font-bold mt-1 dark:text-white">{formatCurrency(amount)}</h3>
                    {trend && (
                        <div className={cn(
                            "flex items-center gap-1 mt-2 text-xs font-medium",
                            trend > 0 ? "text-emerald-500" : "text-rose-500"
                        )}>
                            {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            <span>{Math.abs(trend)}% from last month</span>
                        </div>
                    )}
                </div>
                <div className={cn(
                    "p-3 rounded-xl",
                    isIncome && "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
                    isExpense && "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
                    isBalance && "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                )}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </Card>
    );
};

export const SummaryCards = ({ totals }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
                title="Total Balance"
                amount={totals.balance}
                icon={Wallet}
                type="balance"
            />
            <StatCard
                title="Total Income"
                amount={totals.income}
                icon={ArrowUpRight}
                type="income"
            />
            <StatCard
                title="Total Expenses"
                amount={totals.expenses}
                icon={ArrowDownRight}
                type="expense"
            />
        </div>
    );
};
