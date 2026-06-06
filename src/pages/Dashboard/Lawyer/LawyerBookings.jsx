import { motion } from 'framer-motion'
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'
import { useOutletContext } from 'react-router-dom'

export default function LawyerBookings() {
    const { myBookings, handleBookingStatusChange } = useOutletContext()

    const statusColors = {
        Pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
        Confirmed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        Completed: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    }

    return (
        <div className="space-y-4">
            {myBookings.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <FiCalendar className="text-4xl text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                    <h3 className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-2">No Bookings Yet</h3>
                    <p className="text-sm text-surface-500">Consultation bookings will appear here when users book with you.</p>
                </div>
            ) : (
                myBookings.map((booking, i) => (
                    <motion.div key={booking.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                        <FiUser className="text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-semibold text-surface-900 dark:text-white">{booking.userName}</h3>
                                        <p className="text-xs text-surface-400">{booking.userEmail} {booking.userRole ? `· ${booking.userRole}` : ''}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-surface-600 dark:text-surface-300 mb-2">{booking.query}</p>
                                <div className="flex items-center gap-4 text-xs text-surface-400">
                                    <span className="flex items-center gap-1"><FiCalendar className="text-[10px]" />{booking.date}</span>
                                    <span className="flex items-center gap-1"><FiClock className="text-[10px]" />{booking.timeSlot}</span>
                                    {booking.id && <span className="font-mono text-primary-500">#{booking.id}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`badge ${statusColors[booking.status] || statusColors.Pending}`}>{booking.status}</span>
                                {booking.status === 'Pending' && (
                                    <button onClick={() => handleBookingStatusChange(booking.id, 'Confirmed')} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors">Confirm</button>
                                )}
                                {booking.status === 'Confirmed' && (
                                    <button onClick={() => handleBookingStatusChange(booking.id, 'Completed')} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">Complete</button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    )
}
