import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function StatCard({ title, subtitle, value, icon: Icon, color = 'primary', href, delay = 0 }) {
    // Map colors to match screenshot exactly
    const colorClasses = {
        primary: 'text-primary-400 bg-primary-500/10', // Purple
        teal: 'text-teal-400 bg-teal-500/10', // Greenish
        pink: 'text-pink-400 bg-pink-500/10', // Pink
        blue: 'text-blue-400 bg-blue-500/10', // Blue
    }[color] || 'text-primary-400 bg-primary-500/10'

    const CardContent = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className={`bg-white dark:bg-[#131722] border border-surface-200 dark:border-[#1D2231] p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 ${
                href ? 'hover:bg-surface-50 dark:hover:bg-[#1A1F2E] hover:-translate-y-1 hover:shadow-xl' : ''
            }`}
        >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${colorClasses}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-2xl font-display font-bold text-surface-900 dark:text-white leading-none mb-1">
                    {value}
                </p>
                <p className="text-sm font-medium text-surface-900 dark:text-white">
                    {title}
                </p>
                {subtitle && (
                    <p className="text-xs text-surface-500 mt-0.5">
                        {subtitle}
                    </p>
                )}
            </div>
        </motion.div>
    )

    if (href) {
        return <Link to={href} className="block focus:outline-none">{CardContent}</Link>
    }

    return CardContent
}
