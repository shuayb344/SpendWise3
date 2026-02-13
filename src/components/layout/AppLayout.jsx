import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Ensure responsive sidebar behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-7xl mx-auto w-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
