export default function DashboardHeader({ title, subtitle, children }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-surface-900 dark:text-white">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm sm:text-base text-surface-500 dark:text-surface-400 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-3 shrink-0">
                    {children}
                </div>
            )}
        </div>
    )
}
