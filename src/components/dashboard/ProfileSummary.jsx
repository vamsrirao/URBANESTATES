import { motion } from 'framer-motion'

export default function ProfileSummary({ user, children }) {
    if (!user) return null

    // Determine gradient based on role
    let gradient = 'from-primary-400 to-accent-600' // Default / Buyer
    if (user.role?.toLowerCase() === 'seller') gradient = 'from-amber-400 to-orange-600'
    if (user.role?.toLowerCase() === 'agent') gradient = 'from-emerald-400 to-teal-600'
    if (user.role?.toLowerCase() === 'lawyer') gradient = 'from-blue-400 to-indigo-600'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 sm:p-8 mb-8 border-primary-500/10 border relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradient} opacity-[0.03] dark:opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3`} />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                {/* Avatar */}
                <div className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-3xl sm:text-4xl font-display font-bold shadow-lg`}>
                    {user.name?.charAt(0) || 'U'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-xl sm:text-2xl font-display font-semibold text-surface-900 dark:text-white truncate">
                            {user.name}
                        </h2>
                        <span className="px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700">
                            {user.role}
                        </span>
                    </div>
                    <p className="text-surface-500 dark:text-surface-400 text-sm sm:text-base truncate">
                        {user.email}
                    </p>
                </div>

                {/* Actions (passed as children, typically QuickActions) */}
                {children && (
                    <div className="w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                        {children}
                    </div>
                )}
            </div>
        </motion.div>
    )
}
