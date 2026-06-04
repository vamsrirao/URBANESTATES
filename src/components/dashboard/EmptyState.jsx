export default function EmptyState({ icon: Icon, title, message }) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center glass-card border-dashed">
            {Icon && (
                <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800/50 flex items-center justify-center mb-4 text-surface-400 dark:text-surface-500">
                    <Icon size={28} />
                </div>
            )}
            <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">{title}</h3>
            {message && (
                <p className="text-sm text-surface-500 dark:text-surface-400 max-w-sm">
                    {message}
                </p>
            )}
        </div>
    )
}
