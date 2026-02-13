import { useRef } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Button } from '../ui';
import { Download } from 'lucide-react';

export const CSVExport = () => {
    const { transactions } = useFinance();

    const exportToCSV = () => {
        if (transactions.length === 0) return;

        const headers = ['Date', 'Title', 'Category', 'Amount', 'Type'];
        const rows = transactions.map(t => [
            t.date,
            t.title,
            t.category,
            t.amount,
            t.type
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'spendwise_transactions.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button variant="outline" onClick={exportToCSV} disabled={transactions.length === 0}>
            <Download className="w-4 h-4" /> Export CSV
        </Button>
    );
};
