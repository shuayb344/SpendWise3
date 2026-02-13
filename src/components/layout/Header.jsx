import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = ({ toggleSidebar }) => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = storageService.getTheme();
        return savedTheme === 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
            storageService.saveTheme('dark');
        } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
            storageService.saveTheme('light');
        }
    }, [isDark]);

    const handleToggle = () => {
        setIsDark(prev => !prev);
    };

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 lg:px-8 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-500 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    aria-label="Toggle Sidebar"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleToggle}
                    className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-95 shadow-sm transition-all duration-300"
                    aria-label="Toggle Theme"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isDark ? 'sun' : 'moon'}
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: 90, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="flex items-center justify-center"
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5 text-amber-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-indigo-600" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </button>
            </div>
        </header>
    );
};
