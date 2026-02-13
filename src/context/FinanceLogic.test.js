import { describe, it, expect } from 'vitest';

const calculateTotals = (transactions) => {
    return transactions.reduce(
        (acc, curr) => {
            if (curr.type === 'income') {
                acc.income += curr.amount;
                acc.balance += curr.amount;
            } else {
                acc.expenses += curr.amount;
                acc.balance -= curr.amount;
            }
            return acc;
        },
        { balance: 0, income: 0, expenses: 0 }
    );
};

describe('Finance Logic', () => {
    it('should correctly calculate totals for income and expenses', () => {
        const transactions = [
            { type: 'income', amount: 5000 },
            { type: 'expense', amount: 1000 },
            { type: 'expense', amount: 500 },
        ];

        const result = calculateTotals(transactions);
        expect(result.income).toBe(5000);
        expect(result.expenses).toBe(1500);
        expect(result.balance).toBe(3500);
    });

    it('should handle empty transaction list', () => {
        const result = calculateTotals([]);
        expect(result.income).toBe(0);
        expect(result.expenses).toBe(0);
        expect(result.balance).toBe(0);
    });
});
