export const sampleTransactions = [
    { id: '1', title: 'Monthly Salary', amount: 5000, category: 'Salary', type: 'income', date: new Date().toISOString() },
    { id: '2', title: 'Apartment Rent', amount: 1200, category: 'Rent', type: 'expense', date: new Date().toISOString() },
    { id: '3', title: 'Whole Foods Grocery', amount: 156.32, category: 'Food', type: 'expense', date: new Date().toISOString() },
    { id: '4', title: 'Freelance Project', amount: 850, category: 'Other', type: 'income', date: new Date().toISOString() },
    { id: '5', title: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense', date: new Date().toISOString() },
    { id: '6', title: 'Gas Station', amount: 45, category: 'Transport', type: 'expense', date: new Date().toISOString() },
    { id: '7', title: 'Coffee Shop', amount: 4.50, category: 'Food', type: 'expense', date: new Date().toISOString() },
    { id: '8', title: 'Electricity Bill', amount: 85.50, category: 'Rent', type: 'expense', date: new Date().toISOString() },
];

export const seedData = (setTransactions) => {
    setTransactions(sampleTransactions);
};
