import { useState, useMemo, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiClock, FiCheckCircle, FiCalendar, FiBell } from 'react-icons/fi'
import { useAuth } from '../../../hooks/AuthContext'
import { useData } from '../../../hooks/DataContext'
import { getBookings } from '../../../services/bookingService'
import { fetchNotifications, markNotificationRead, markAllNotificationsRead } from '../../../services/notificationService'
import lawyers from '../../../data/lawyers'

export default function LawyerLayout() {
    const { user, token } = useAuth()
    const { properties, updatePropertyStatus } = useData()

    const lawyerProfile = lawyers[0] // Mocking for now

    // Real bookings from localStorage
    const allBookings = getBookings()
    const myBookings = allBookings.filter(b =>
        b.lawyerEmail === user?.email ||
        b.lawyerName === user?.name ||
        b.lawyerId === lawyerProfile?.id
    )

    // Notifications state
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [notifLoading, setNotifLoading] = useState(false)

    const loadNotifications = async () => {
        if (!token) return
        setNotifLoading(true)
        const data = await fetchNotifications(token)
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount || 0)
        setNotifLoading(false)
    }

    useEffect(() => {
        loadNotifications()
    }, [token])

    const handleMarkRead = async (id) => {
        await markNotificationRead(id, token)
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
        setUnreadCount(prev => Math.max(0, prev - 1))
    }

    const handleMarkAllRead = async () => {
        await markAllNotificationsRead(token)
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
        setUnreadCount(0)
    }

    const pendingProperties = useMemo(() => properties.filter(p => p.status === 'Pending'), [properties])
    const verifiedProperties = useMemo(() => properties.filter(p => p.status === 'Approved' || p.status === 'Rejected'), [properties])

    const handleBookingStatusChange = (bookingId, newStatus) => {
        const { updateBookingStatus } = require('../../../services/bookingService')
        updateBookingStatus(bookingId, newStatus)
        // A real app would update state or re-fetch here
    }

    const handleVerify = (propertyId, newStatus) => {
        updatePropertyStatus(propertyId, newStatus)
    }

    const contextValue = {
        user,
        token,
        lawyerProfile,
        myBookings,
        notifications,
        unreadCount,
        notifLoading,
        pendingProperties,
        verifiedProperties,
        handleMarkRead,
        handleMarkAllRead,
        handleBookingStatusChange,
        handleVerify
    }

    return (
        <div className="pt-8 pb-16">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="heading-lg text-surface-900 dark:text-white">Lawyer Dashboard</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Welcome, {user?.name}</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
                    {[
                        { icon: FiClock, label: 'Pending Verification', value: pendingProperties.length, color: 'amber' },
                        { icon: FiCheckCircle, label: 'Properties Verified', value: verifiedProperties.length, color: 'emerald' },
                        { icon: FiCalendar, label: 'Appointments', value: myBookings.length, color: 'indigo' },
                        { icon: FiBell, label: 'Unread Notifications', value: unreadCount, color: 'purple' },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 flex items-center gap-4 transition-colors"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-${card.color}-100 dark:bg-${card.color}-900/30 flex items-center justify-center`}>
                                <card.icon className={`text-xl text-${card.color}-600 dark:text-${card.color}-400`} />
                            </div>
                            <div>
                                <div className="text-2xl font-display font-bold text-surface-900 dark:text-white">{card.value}</div>
                                <div className="text-sm text-surface-500 dark:text-surface-400">{card.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <Outlet context={contextValue} />
            </div>
        </div>
    )
}
