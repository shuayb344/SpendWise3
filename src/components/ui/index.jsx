import { cn } from "../../utils/helpers";

export const Button = ({ className, variant = 'primary', ...props }) => {
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm shadow-indigo-600/20',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
        danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
        ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400',
        outline: 'bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-400',
    };

    return (
        <button
            className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
                variants[variant],
                className
            )}
            {...props}
        />
    );
};

export const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                'bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const Input = ({ className, label, error, ...props }) => {
    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>}
            <input
                className={cn(
                    'w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all dark:text-white dark:placeholder:text-slate-600',
                    error && 'border-red-500 focus:ring-red-500/40 focus:border-red-500',
                    className
                )}
                {...props}
            />
            {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
        </div>
    );
};
