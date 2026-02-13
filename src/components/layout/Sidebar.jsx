import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PieChart, Wallet, LogOut, X, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { useFinance } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';

const SidebarLink = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
            )
        }
    >
        <Icon className={cn("w-5 h-5 transition-colors", "group-hover:scale-110 duration-200")} />
        <span className="font-medium">{children}</span>
    </NavLink>
);

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { budget, totals } = useFinance();
    const { user, logout } = useAuth();
    const isOverBudget = budget > 0 && totals.expenses > budget;

    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={cn(
                    'fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/50 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                                <Wallet className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">SpendWise</h1>
                                {isOverBudget && (
                                    <span className="flex items-center gap-1 text-[10px] text-rose-500 font-black mt-1 uppercase animate-pulse">
                                        <AlertCircle className="w-2 h-2" /> Over Budget
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 lg:hidden text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 space-y-1.5 py-4">
                        <SidebarLink to="/" icon={LayoutDashboard}>Dashboard</SidebarLink>
                        <SidebarLink to="/transactions" icon={ReceiptText}>Transactions</SidebarLink>
                        <SidebarLink to="/reports" icon={PieChart}>Reports</SidebarLink>
                    </nav>

                    <div className="p-4 border-t border-slate-100 dark:border-slate-800/50">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent dark:border-slate-700/30">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shadow-sm shadow-indigo-100/50 dark:shadow-none">
                                {initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email || 'N/A'}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/10"
                                aria-label="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export { Sidebar };
