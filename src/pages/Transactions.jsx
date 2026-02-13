import React, { useState } from 'react';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { TransactionList } from '../components/transactions/TransactionList';
import { CSVExport } from '../components/transactions/CSVExport';
import { Button, Card } from '../components/ui';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Transactions = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage and track your historical spending.</p>
                </div>
                <div className="flex gap-3">
                    <CSVExport />
                    <Button onClick={() => setIsFormOpen(true)}>
                        <Plus className="w-4 h-4" /> Add New
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <Card className="p-6 relative">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold mb-6 dark:text-white">Add New Transaction</h2>
                            <div className="max-w-2xl mx-auto">
                                <TransactionForm onSuccess={() => setIsFormOpen(false)} />
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <TransactionList />
        </div>
    );
};

export default Transactions;
