import { motion } from 'framer-motion'
import { FiX, FiCheckCircle, FiInfo, FiAlertCircle } from 'react-icons/fi'

// Dummy notifications for now
const notifications = [
    {
        id: 1,
        title: 'New message from Agent',
        desc: 'Sarah sent you a message about the Villa in Madhapur.',
        time: '5m ago',
        type: 'info',
        read: false
    },
    {
        id: 2,
        title: 'Visit Confirmed',
        desc: 'Your visit to Skyline Apartments is confirmed for tomorrow at 10 AM.',
        time: '2h ago',
        type: 'success',
        read: false
    },
    {
        id: 3,
        title: 'Price drop alert',
        desc: 'A property in your favorites just dropped its price by 5%.',
        time: '1d ago',
        type: 'alert',
        read: true
    }
]

export default function NotificationCenter({ onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-surface-800 rounded-2xl shadow-xl shadow-surface-500/10 dark:shadow-none border border-surface-100 dark:border-surface-700 overflow-hidden origin-top-right z-50"
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-100 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/50">
                <h3 className="font-semibold text-surface-900 dark:text-white">Notifications</h3>
                <button 
                    onClick={onClose}
                    className="p-1 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg text-surface-500 transition-colors sm:hidden"
                >
                    <FiX size={16} />
                </button>
                <span className="hidden sm:inline-block text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2 py-0.5 rounded-full">
                    2 New
                </span>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.map((notif) => (
                    <div 
                        key={notif.id}
                        className={`p-4 border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors flex gap-3 ${!notif.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}
                    >
                        <div className="mt-0.5 shrink-0">
                            {notif.type === 'success' && <FiCheckCircle className="text-green-500" size={18} />}
                            {notif.type === 'info' && <FiInfo className="text-primary-500" size={18} />}
                            {notif.type === 'alert' && <FiAlertCircle className="text-amber-500" size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${!notif.read ? 'text-surface-900 dark:text-white' : 'text-surface-700 dark:text-surface-300'}`}>
                                {notif.title}
                            </p>
                            <p className="text-xs text-surface-500 mt-1 line-clamp-2">
                                {notif.desc}
                            </p>
                            <p className="text-[10px] text-surface-400 mt-2">
                                {notif.time}
                            </p>
                        </div>
                        {!notif.read && (
                            <div className="w-2 h-2 bg-primary-500 rounded-full shrink-0 mt-1.5" />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-2 border-t border-surface-100 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/50">
                <button className="w-full py-2 text-sm text-center font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                    View all notifications
                </button>
            </div>
        </motion.div>
    )
}
