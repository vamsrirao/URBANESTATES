import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`relative ${maxWidth} w-full max-h-[90vh] overflow-y-auto glass-card p-0`}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
                                <h3 className="text-lg font-display font-semibold text-surface-900 dark:text-white">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                                >
                                    <HiX className="text-lg" />
                                </button>
                            </div>
                        )}
                        {!title && (
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center bg-white/80 dark:bg-surface-800/80 text-surface-600 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700 transition-colors z-10"
                            >
                                <HiX className="text-lg" />
                            </button>
                        )}

                        {/* Body */}
                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
