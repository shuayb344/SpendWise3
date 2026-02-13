export const storageService = {
    saveTransactions: (transactions) => {
        localStorage.setItem('spendwise_transactions', JSON.stringify(transactions));
    },
    getTransactions: () => {
        const data = localStorage.getItem('spendwise_transactions');
        return data ? JSON.parse(data) : [];
    },
    saveBudget: (budget) => {
        localStorage.setItem('spendwise_budget', JSON.stringify(budget));
    },
    getBudget: () => {
        const data = localStorage.getItem('spendwise_budget');
        return data ? JSON.parse(data) : 0;
    },
    saveTheme: (theme) => {
        localStorage.setItem('spendwise_theme', theme);
    },
    getTheme: () => {
        return localStorage.getItem('spendwise_theme') || 'light';
    }
};
