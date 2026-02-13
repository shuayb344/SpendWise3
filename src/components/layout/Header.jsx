import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = ({ toggleSidebar }) => {
    const [isDark, setIsDark] = useState(() => storageService.getTheme() === 'dark');

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            storageService.saveTheme('dark');
        } else {
            document.documentElement.classList.remove('dark');
            storageService.saveTheme('light');
        }
    }, [isDark]);

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-500 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:scale-110 transition-all active:scale-95 shadow-sm overflow-hidden"
                    aria-label="Toggle Theme"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isDark ? 'dark' : 'light'}
                            initial={{ y: 20, opacity: 0, rotate: -45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                        </motion.div>
                    </AnimatePresence>
                </button>
            </div>
        </header>
    );
};
