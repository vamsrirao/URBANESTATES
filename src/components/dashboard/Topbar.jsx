import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiSearch, FiBell, FiMoon, FiSun, FiSettings, FiLogOut, FiUser, FiChevronLeft } from 'react-icons/fi'
import { useAuth } from '../../hooks/AuthContext'
import NotificationCenter from './NotificationCenter'

export default function Topbar({ toggleSidebar }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'))
    const menuRef = useRef()
    const notifRef = useRef()

    // Handle clicks outside of dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) setShowUserMenu(false)
            if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleDarkMode = () => {
        const isDark = !darkMode
        setDarkMode(isDark)
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <header className={`h-20 backdrop-blur-md flex items-center justify-between px-6 z-30 sticky top-0 ${
            user?.role?.toLowerCase() === 'agent' ? 'bg-[#050816]/90 border-b border-[#1D2231]' : 'bg-white/80 dark:bg-[#0A0D14]/80 border-b border-surface-200 dark:border-[#1D2231]'
        }`}>
            {/* Left side: Mobile Toggle & Greeting */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors lg:hidden"
                >
                    <FiMenu size={20} />
                </button>

                {user?.role?.toLowerCase() === 'agent' && (
                    <div className="hidden lg:block">
                        <h2 className="text-white text-lg font-semibold">Good morning, {user?.name?.split(' ')[0] || 'Priya'}! 👋</h2>
                        <p className="text-surface-400 text-xs">Here's your overview and today's schedule.</p>
                    </div>
                )}
            </div>

            {/* Right side: Search & Actions */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
                {/* Search Bar */}
                <div className="hidden md:flex relative max-w-[280px] w-full">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search properties, clients, inquiries..."
                        className={`w-full border rounded-xl py-2 pl-9 pr-14 text-xs transition-all ${
                            user?.role?.toLowerCase() === 'agent' 
                                ? 'bg-[#0A0D14] border-[#1D2231] text-white focus:border-[#6D5DFC] placeholder:text-surface-500' 
                                : 'bg-surface-100 dark:bg-[#131722] border-transparent dark:border-[#1D2231] focus:border-primary-500 focus:bg-white dark:focus:bg-[#131722]'
                        }`}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <kbd className={`hidden lg:flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium rounded border ${
                            user?.role?.toLowerCase() === 'agent' ? 'bg-[#1D2231] text-surface-400 border-surface-700/50' : 'text-surface-400 bg-white dark:bg-[#1D2231] border-surface-200 dark:border-transparent'
                        }`}>⌘ K</kbd>
                    </div>
                </div>

                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>

                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => {
                            setShowNotifications(!showNotifications)
                            setShowUserMenu(false)
                        }}
                        className={`p-2 rounded-xl transition-colors relative ${
                            user?.role?.toLowerCase() === 'agent' ? 'text-surface-400 hover:text-white hover:bg-[#131722]' : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-[#131722]'
                        }`}
                    >
                        <FiBell size={20} />
                        <span className={`absolute top-1 right-1 w-3.5 h-3.5 text-[9px] font-bold flex items-center justify-center rounded-full border border-white dark:border-[#0A0D14] ${
                            user?.role?.toLowerCase() === 'agent' ? 'bg-red-500 text-white border-none' : 'bg-primary-600 text-white'
                        }`}>5</span>
                    </button>
                    
                    <AnimatePresence>
                        {showNotifications && (
                            <NotificationCenter onClose={() => setShowNotifications(false)} />
                        )}
                    </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => {
                            setShowUserMenu(!showUserMenu)
                            setShowNotifications(false)
                        }}
                        className={`flex items-center gap-3 pl-4 sm:pl-6 ml-2 sm:ml-4 border-l ${
                            user?.role === 'agent' ? 'border-[#1D2231]' : 'border-surface-200 dark:border-[#1D2231]'
                        }`}
                    >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ${
                            user?.role === 'agent' ? 'bg-[#6D5DFC]' : 'bg-primary-600'
                        }`}>
                            {user?.name?.charAt(0) || 'P'}
                            {user?.name?.split(' ')[1]?.charAt(0) || 'A'}
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className={`text-sm font-medium leading-none mb-1 ${user?.role === 'agent' ? 'text-white' : 'text-surface-900 dark:text-white'}`}>{user?.name || 'Priya Agent'}</p>
                            <p className={`text-[10px] leading-none capitalize ${user?.role === 'agent' ? 'text-surface-400' : 'text-surface-500 dark:text-surface-400'}`}>{user?.role || 'Agent'}</p>
                        </div>
                    </button>

                    <AnimatePresence>
                        {showUserMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#131722] rounded-2xl shadow-xl shadow-surface-500/10 dark:shadow-none border border-surface-100 dark:border-[#1D2231] py-2 origin-top-right"
                            >
                                <div className="px-4 py-3 border-b border-surface-100 dark:border-surface-700 sm:hidden">
                                    <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{user?.name}</p>
                                    <p className="text-xs text-surface-500 truncate">{user?.email}</p>
                                </div>
                                
                                <div className="p-2 space-y-1">
                                    <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-white transition-colors">
                                        <FiUser size={16} /> My Profile
                                    </Link>
                                    <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-white transition-colors">
                                        <FiSettings size={16} /> Settings
                                    </Link>
                                </div>
                                <div className="px-2 pt-2 pb-1 border-t border-surface-100 dark:border-surface-700">
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                    >
                                        <FiLogOut size={16} /> Sign out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}
