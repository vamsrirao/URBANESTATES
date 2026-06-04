import { motion } from 'framer-motion'

export default function SkeletonLoader({ className = '', count = 1 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    className={`rounded-2xl bg-surface-200 dark:bg-surface-700 overflow-hidden ${className}`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="h-48 bg-surface-300 dark:bg-surface-600" />
                    <div className="p-5 space-y-3">
                        <div className="h-4 bg-surface-300 dark:bg-surface-600 rounded w-3/4" />
                        <div className="h-3 bg-surface-300 dark:bg-surface-600 rounded w-1/2" />
                        <div className="h-3 bg-surface-300 dark:bg-surface-600 rounded w-full" />
                        <div className="flex gap-4 pt-2">
                            <div className="h-3 bg-surface-300 dark:bg-surface-600 rounded w-16" />
                            <div className="h-3 bg-surface-300 dark:bg-surface-600 rounded w-16" />
                            <div className="h-3 bg-surface-300 dark:bg-surface-600 rounded w-16" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </>
    )
}
