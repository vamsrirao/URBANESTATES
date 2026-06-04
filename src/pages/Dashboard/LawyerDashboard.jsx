import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    FiCalendar, FiCheckCircle, FiUser, FiLogOut,
    FiClock, FiMessageSquare, FiShield, FiAlertCircle, FiXCircle,
    FiBell, FiEye, FiCheckSquare
} from 'react-icons/fi'
import { useAuth } from '../../hooks/AuthContext'
import { useData } from '../../hooks/DataContext'
import { getBookings } from '../../services/bookingService'
import { fetchNotifications, markNotificationRead, markAllNotificationsRead } from '../../services/notificationService'
import lawyers from '../../data/lawyers'
import StarRating from '../../components/common/StarRating'

export default function LawyerDashboard() {
    const [activeTab, setActiveTab] = useState('verify')
    const { user, token, logout } = useAuth()
    const { properties, updatePropertyStatus } = useData()
    const navigate = useNavigate()

    const lawyerProfile = lawyers[0]

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

    const handleLogout = () => { logout(); navigate('/') }

    const handleBookingStatusChange = (bookingId, newStatus) => {
        // Update in localStorage
        const { updateBookingStatus } = require('../../services/bookingService')
        updateBookingStatus(bookingId, newStatus)
    }

    const handleVerify = (propertyId, newStatus) => {
        updatePropertyStatus(propertyId, newStatus)
    }

    const statusColors = {
        Pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
        Confirmed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
        Completed: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    }

    const tabs = [
        { key: 'verify', label: 'Verify Properties', icon: FiShield },
        { key: 'history', label: 'Verification History', icon: FiCheckCircle },
        { key: 'bookings', label: 'My Bookings', icon: FiCalendar, count: myBookings.length },
        { key: 'notifications', label: 'Notifications', icon: FiBell, count: unreadCount },
        { key: 'profile', label: 'Profile', icon: FiUser },
    ]

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="heading-lg text-surface-900 dark:text-white">Lawyer Dashboard</h1>
                        <p className="text-surface-500 dark:text-surface-400 mt-1">Welcome, {user.name}</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <FiLogOut /> Logout
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
                    {[
                        { icon: FiClock, label: 'Pending Verification', value: pendingProperties.length, color: 'amber', tab: 'verify' },
                        { icon: FiCheckCircle, label: 'Properties Verified', value: verifiedProperties.length, color: 'emerald', tab: 'history' },
                        { icon: FiCalendar, label: 'Appointments', value: myBookings.length, color: 'indigo', tab: 'bookings' },
                        { icon: FiBell, label: 'Unread Notifications', value: unreadCount, color: 'purple', tab: 'notifications' },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 flex items-center gap-4 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                            onClick={() => setActiveTab(card.tab)}
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

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.key
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                                : 'glass text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                                }`}
                        >
                            <tab.icon className="text-sm" />
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'}`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* ─── Verify Properties Tab ─── */}
                {activeTab === 'verify' && (
                    <div className="space-y-4">
                        {pendingProperties.length === 0 && <p className="p-8 text-center glass-card text-surface-500">No properties pending verification.</p>}
                        {pendingProperties.map((property, i) => (
                            <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                className="glass-card p-6 flex flex-col sm:flex-row gap-4 border-l-4 border-amber-500">
                                <img src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'} alt={property.title} className="w-full sm:w-40 h-28 object-cover rounded-xl flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-display font-semibold text-surface-900 dark:text-white">{property.title}</h3>
                                            <p className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-0.5">
                                                <FiAlertCircle className="text-[10px]" /> {property.area} (Listed by: {property.ownerEmail || 'Unknown'})
                                            </p>
                                        </div>
                                        <span className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Pending Verification</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                        <button onClick={() => handleVerify(property.id, 'Approved')} className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all flex-1 sm:flex-none flex items-center justify-center gap-2">
                                            <FiCheckCircle /> Approve Document
                                        </button>
                                        <button onClick={() => handleVerify(property.id, 'Rejected')} className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25 transition-all flex-1 sm:flex-none flex items-center justify-center gap-2">
                                            <FiXCircle /> Reject Document
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* ─── Verification History Tab ─── */}
                {activeTab === 'history' && (
                    <div className="space-y-4">
                        {verifiedProperties.length === 0 && <p className="p-8 text-center glass-card text-surface-500">No verification history available.</p>}
                        {verifiedProperties.map((property, i) => (
                            <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                className={`glass-card p-6 flex flex-col sm:flex-row gap-4 border-l-4 ${property.status === 'Approved' ? 'border-emerald-500' : 'border-red-500'}`}>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-display font-semibold text-surface-900 dark:text-white">{property.title}</h3>
                                            <p className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-0.5">{property.area}</p>
                                        </div>
                                        <span className={`badge ${property.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                                            {property.status === 'Approved' ? <><FiCheckCircle className="mr-1 inline text-xs" /> Approved</> : <><FiXCircle className="mr-1 inline text-xs" /> Rejected</>}
                                        </span>
                                    </div>
                                    <p className="text-xs text-surface-400 mt-2">Action taken by: {user.name} ({user.email})</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* ─── Bookings Tab ─── */}
                {activeTab === 'bookings' && (
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
                )}

                {/* ─── Notifications Tab ─── */}
                {activeTab === 'notifications' && (
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
                )}

                {/* ─── Profile Tab ─── */}
                {activeTab === 'profile' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
                        <div className="flex flex-col sm:flex-row gap-6 mb-6">
                            <img src={lawyerProfile.image} alt={lawyerProfile.name} className="w-24 h-24 rounded-2xl object-cover shadow-lg" />
                            <div>
                                <h2 className="text-xl font-display font-bold text-surface-900 dark:text-white">{user.name}</h2>
                                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{lawyerProfile.specialization}</p>
                                <div className="mt-2"><StarRating rating={lawyerProfile.rating} /></div>
                                <p className="text-xs text-surface-400 mt-1">{lawyerProfile.reviewCount} reviews · {lawyerProfile.experience} years experience</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div><h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 mb-1">Bio</h3><p className="text-sm text-surface-600 dark:text-surface-300">{lawyerProfile.bio}</p></div>
                            <div><h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 mb-1">Bar Council ID</h3><p className="text-sm text-surface-600 dark:text-surface-300">{lawyerProfile.barCouncilId}</p></div>
                            <div><h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 mb-1">Email</h3><p className="text-sm text-surface-600 dark:text-surface-300">{user.email}</p></div>
                            <div><h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 mb-1">Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {lawyerProfile.languages.map(lang => (
                                        <span key={lang} className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">{lang}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
