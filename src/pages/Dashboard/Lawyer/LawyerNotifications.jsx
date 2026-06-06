import { motion } from 'framer-motion'
import { FiBell, FiCheckSquare, FiCalendar, FiClock, FiEye } from 'react-icons/fi'
import { useOutletContext } from 'react-router-dom'

export default function LawyerNotifications() {
    const { notifications, unreadCount, notifLoading, handleMarkAllRead, handleMarkRead } = useOutletContext()

    return (
        <div className="space-y-4">
            {/* Header with mark all read */}
            {notifications.length > 0 && unreadCount > 0 && (
                <div className="flex justify-end">
                    <button onClick={handleMarkAllRead} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium glass text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                        <FiCheckSquare /> Mark all as read
                    </button>
                </div>
            )}

            {notifLoading ? (
                <div className="glass-card p-12 text-center">
                    <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-surface-500">Loading notifications...</p>
                </div>
            ) : notifications.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <FiBell className="text-4xl text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                    <h3 className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-2">No Notifications</h3>
                    <p className="text-sm text-surface-500">You'll be notified here when users book consultations with you.</p>
                </div>
            ) : (
                notifications.map((notif, i) => (
                    <motion.div
                        key={notif._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`glass-card p-5 border-l-4 transition-colors ${notif.isRead ? 'border-surface-300 dark:border-surface-700 opacity-75' : 'border-primary-500'}`}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.isRead ? 'bg-surface-100 dark:bg-surface-800' : 'bg-primary-100 dark:bg-primary-900/30'}`}>
                                        <FiBell className={`text-lg ${notif.isRead ? 'text-surface-400' : 'text-primary-600 dark:text-primary-400'}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-semibold ${notif.isRead ? 'text-surface-600 dark:text-surface-400' : 'text-surface-900 dark:text-white'}`}>
                                            {notif.title}
                                        </h4>
                                        <p className="text-xs text-surface-400 mt-0.5">
                                            {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(notif.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-surface-600 dark:text-surface-300 mb-3 ml-[52px]">{notif.message}</p>
                                <div className="flex flex-wrap items-center gap-3 ml-[52px] text-xs text-surface-400">
                                    {notif.consultationDate && (
                                        <span className="flex items-center gap-1"><FiCalendar className="text-[10px]" /> {new Date(notif.consultationDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    )}
                                    {notif.consultationTime && (
                                        <span className="flex items-center gap-1"><FiClock className="text-[10px]" /> {notif.consultationTime}</span>
                                    )}
                                    {notif.senderRole && (
                                        <span className="badge-primary text-[10px] py-0.5">{notif.senderRole}</span>
                                    )}
                                    {notif.bookingRef && (
                                        <span className="font-mono text-primary-500">#{notif.bookingRef}</span>
                                    )}
                                </div>
                            </div>
                            {!notif.isRead && (
                                <button onClick={() => handleMarkRead(notif._id)} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors" title="Mark as read">
                                    <FiEye className="text-xs" /> Mark read
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    )
}
