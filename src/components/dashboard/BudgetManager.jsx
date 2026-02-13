import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Button, Input, Card } from '../ui';
import { Target, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatCurrency, cn } from '../../utils/helpers';

export const BudgetManager = () => {
    const { budget, setBudget, totals } = useFinance();
    const [isEditing, setIsEditing] = useState(false);
    const [tempBudget, setTempBudget] = useState(budget);

    const handleSave = () => {
        setBudget(parseFloat(tempBudget) || 0);
        setIsEditing(false);
    };

    const percentSpent = budget > 0 ? (totals.expenses / budget) * 100 : 0;
    const isOverBudget = budget > 0 && totals.expenses > budget;

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-slate-900 dark:text-white">Monthly Budget</h3>
                </div>
                {!isEditing ? (
                    <Button variant="ghost" className="text-sm h-8" onClick={() => setIsEditing(true)}>
                        Edit Budget
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="ghost" className="text-sm h-8" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button className="text-sm h-8 px-3" onClick={handleSave}>Save</Button>
                    </div>
                )}
            </div>

            {!isEditing ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-2xl font-bold dark:text-white">{formatCurrency(budget)}</p>
                            <p className="text-xs text-slate-500">Monthly limit set by you</p>
                        </div>
                        <div className="text-right">
                            <p className={cn(
                                "text-sm font-bold",
                                isOverBudget ? "text-rose-600" : "text-emerald-600"
                            )}>
                                {Math.round(percentSpent)}% spent
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full transition-all duration-500 ease-out",
                                isOverBudget ? "bg-rose-500" : percentSpent > 80 ? "bg-amber-500" : "bg-indigo-600"
                            )}
                            style={{ width: `${Math.min(percentSpent, 100)}%` }}
                        />
                    </div>

                    {isOverBudget && (
                        <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-medium">
                            <AlertCircle className="w-4 h-4" />
                            <span>Warning: You have exceeded your monthly budget by {formatCurrency(totals.expenses - budget)}</span>
                        </div>
                    )}

                    {!isOverBudget && budget > 0 && (
                        <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>You are currently within your budget. Good job!</span>
                        </div>
                    )}
                </div>
            ) : (
                <Input
                    type="number"
                    label="Set Monthly Limit ($)"
                    value={tempBudget}
                    onChange={(e) => setTempBudget(e.target.value)}
                    placeholder="e.g. 2000"
                    autoFocus
                />
            )}
        </Card>
    );
};
