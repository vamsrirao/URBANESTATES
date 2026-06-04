import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiUser, FiLogOut, FiSettings, FiGrid,
    FiChevronDown, FiBell, FiHelpCircle, FiShield
} from 'react-icons/fi'
import { useAuth } from '../../hooks/AuthContext'
import { fetchNotifications } from '../../services/notificationService'

// Role config — maps role to accent color + label
const roleConfig = {
    seller: { color: 'from-emerald-400 to-emerald-600', label: 'Seller', icon: '🏠' },
    buyer: { color: 'from-blue-400 to-blue-600', label: 'Buyer', icon: '🔑' },
    lawyer: { color: 'from-amber-400 to-amber-600', label: 'Lawyer', icon: '⚖️' },
    agent: { color: 'from-purple-400 to-purple-600', label: 'Agent', icon: '📋' },
}

export default function UserProfileMenu({ variant = 'desktop' }) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const { user, token, logout } = useAuth()

    const role = user?.role?.toLowerCase() || 'buyer'
    const config = roleConfig[role] || roleConfig.buyer
    const dashboardPath = `/dashboard/${role}`
    const initials = getInitials(user?.name)
    const [unreadCount, setUnreadCount] = useState(0)

    // Fetch unread notification count for lawyers
    useEffect(() => {
        if (role === 'lawyer' && token) {
            fetchNotifications(token).then(data => {
                setUnreadCount(data.unreadCount || 0)
            })
        }
    }, [role, token, location.pathname])

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close on route change
    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    const handleLogout = () => {
        setOpen(false)
        logout()
        navigate('/')
    }

    const menuItems = [
        { icon: FiUser, label: 'My Profile', path: dashboardPath, id: 'profile' },
        { icon: FiGrid, label: 'Dashboard', path: dashboardPath, id: 'dashboard' },
        { icon: FiBell, label: 'Notifications', path: dashboardPath, id: 'notifications' },
        { icon: FiSettings, label: 'Settings', path: dashboardPath, id: 'settings' },
        { icon: FiHelpCircle, label: 'Help & Support', path: '/contact', id: 'help' },
    ]

    // ─── MOBILE VARIANT ───
    if (variant === 'mobile') {
        return (
            <div className="space-y-1">
                {/* User info header */}
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-white text-sm font-bold shadow-lg shrink-0`}>
                        {user?.profileImage ? (
                            <img src={user.profileImage} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                            {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
                            {user?.email}
                        </p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
                        {config.icon} {config.label}
                    </span>
                </div>

                {/* Menu items */}
                {menuItems.map(item => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                            location.pathname === item.path && item.id === 'dashboard'
                                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                        }`}
                    >
                        <item.icon className="text-base" /> {item.label}
                    </Link>
                ))}

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    <FiLogOut className="text-base" /> Logout
                </button>
            </div>
        )
    }

    // ─── DESKTOP VARIANT ───
    return (
        <div ref={menuRef} className="relative flex items-center gap-1.5">
            {/* Notification bell for lawyers */}
            {role === 'lawyer' && (
                <Link
                    to="/dashboard/lawyer"
                    className="relative w-9 h-9 rounded-xl flex items-center justify-center text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                    title="Notifications"
                >
                    <FiBell className="text-base" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] px-1 flex items-center justify-center rounded-full text-[9px] font-bold bg-red-500 text-white shadow-sm">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Link>
            )}

            {/* Trigger button */}
            <button
                onClick={() => setOpen(prev => !prev)}
                className={`flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all duration-200 group ${
                    open
                        ? 'bg-surface-100 dark:bg-surface-800'
                        : 'hover:bg-surface-100 dark:hover:bg-surface-800/60'
                }`}
                aria-expanded={open}
                aria-haspopup="true"
                id="user-profile-menu-trigger"
            >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-white text-xs font-bold shadow-md shadow-black/10 ring-2 ring-white/20 dark:ring-surface-700/50 transition-shadow group-hover:shadow-lg`}>
                    {user?.profileImage ? (
                        <img src={user.profileImage} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : initials}
                </div>

                {/* Name */}
                <span className="text-sm font-medium text-surface-700 dark:text-surface-200 max-w-[120px] truncate hidden xl:block">
                    {user?.name || 'User'}
                </span>

                {/* Chevron */}
                <FiChevronDown className={`text-xs text-surface-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700/60 shadow-xl shadow-surface-900/10 dark:shadow-black/40 overflow-hidden z-50"
                        id="user-profile-dropdown"
                    >
                        {/* User header card */}
                        <div className="p-4 border-b border-surface-100 dark:border-surface-800">
                            <div className="flex items-center gap-3">
                                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-white text-sm font-bold shadow-lg shrink-0`}>
                                    {user?.profileImage ? (
                                        <img src={user.profileImage} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                    ) : initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-surface-500 dark:text-surface-400 truncate mt-0.5">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                            {/* Role badge */}
                            <div className="mt-3 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800/40">
                                    <FiShield className="text-[10px]" /> {config.icon} {config.label} Account
                                </span>
                            </div>
                        </div>

                        {/* Menu items */}
                        <div className="py-1.5 px-1.5">
                            {menuItems.map(item => (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group/item ${
                                        location.pathname === item.path && item.id === 'dashboard'
                                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                            : 'text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-white'
                                    }`}
                                    id={`user-menu-${item.id}`}
                                >
                                    <span className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center group-hover/item:bg-primary-100 dark:group-hover/item:bg-primary-900/30 transition-colors">
                                        <item.icon className="text-sm text-surface-500 dark:text-surface-400 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-300 transition-colors" />
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-surface-100 dark:border-surface-800 p-1.5">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/15 transition-all duration-150 group/logout"
                                id="user-menu-logout"
                            >
                                <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center group-hover/logout:bg-red-100 dark:group-hover/logout:bg-red-900/30 transition-colors">
                                    <FiLogOut className="text-sm" />
                                </span>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Helpers ───
function getInitials(name) {
    if (!name) return '?'
    const parts = name.replace(/^(Adv\.|Dr\.|Mr\.|Ms\.)\s*/i, '').split(' ').filter(Boolean)
    if (parts.length === 0) return '?'
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}
