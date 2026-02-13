import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, PieChart, Wallet, LogOut, Menu, X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const SidebarLink = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            )
        }
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{children}</span>
    </NavLink>
);

export const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={cn(
                    'fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                                <Wallet className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">SpendWise</h1>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 lg:hidden text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-2 py-4">
                        <SidebarLink to="/" icon={LayoutDashboard}>Dashboard</SidebarLink>
                        <SidebarLink to="/transactions" icon={ReceiptText}>Transactions</SidebarLink>
                        <SidebarLink to="/reports" icon={PieChart}>Reports</SidebarLink>
                    </nav>

                    {/* User Section (Optional Mock) */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                                JS
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">John Spend</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Premium Plan</p>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
