import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MdApartment } from 'react-icons/md'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { fetchNotifications } from '../../services/notificationService'

export default function Sidebar({ links, isOpen, setIsOpen, isCollapsed, setIsCollapsed }) {
    const location = useLocation()
    const { token, user } = useAuth()
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        if (token) {
            fetchNotifications(token).then(data => {
                setUnreadCount(data.unreadCount || 0)
            }).catch(err => console.error("Failed to fetch sidebar notifications:", err))
        }
    }, [token])

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-surface-900/60 backdrop-blur-sm lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Component */}
            <motion.aside
                initial={false}
                animate={{
                    width: isCollapsed ? 80 : 260,
                    x: isOpen ? 0 : 'max(0px, 0%)',
                }}
                className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:transform-none ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } ${user?.role?.toLowerCase() === 'agent' ? 'bg-[#050816] border-r border-[#1D2231]' : 'bg-white dark:bg-[#0A0D14] border-r border-surface-200 dark:border-[#1D2231]'}`}
            >
                {/* Header / Logo */}
                <div className="h-20 flex items-center justify-between px-6 shrink-0">
                    <Link to="/" className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-[#6D5DFC] flex items-center justify-center shrink-0">
                            <MdApartment className="text-white text-lg" />
                        </div>
                        <AnimatePresence mode="wait">
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className={`text-xl font-display font-bold whitespace-nowrap ${user?.role?.toLowerCase() === 'agent' ? 'text-white' : 'text-surface-900 dark:text-white'}`}
                                >
                                    Urban<span className="text-[#6D5DFC]">Estates</span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-surface-500 hover:text-white">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2 custom-scrollbar">
                    {links.map((link) => {
                        const isActive = link.href === '/dashboard/agent' || link.href === '/dashboard/buyer' 
                            ? location.pathname === link.href 
                            : location.pathname.startsWith(link.href)
                        
                        const displayBadge = link.name === 'Messages' && user?.role !== 'agent' ? unreadCount : link.badge

                        const agentActiveClasses = 'bg-[#6D5DFC] text-white font-medium'
                        const defaultActiveClasses = 'bg-primary-50 dark:bg-gradient-to-r dark:from-primary-600 dark:to-accent-500 text-primary-600 dark:text-white font-medium shadow-lg shadow-primary-500/20'
                        const agentInactiveClasses = 'text-surface-400 hover:bg-[#0F172A] hover:text-white'
                        const defaultInactiveClasses = 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-[#131722] hover:text-surface-900 dark:hover:text-white'

                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                                    isActive 
                                        ? (user?.role?.toLowerCase() === 'agent' ? agentActiveClasses : defaultActiveClasses)
                                        : (user?.role?.toLowerCase() === 'agent' ? agentInactiveClasses : defaultInactiveClasses)
                                }`}
                                title={isCollapsed ? link.name : undefined}
                            >
                                <div className="flex items-center gap-4">
                                    {link.icon && (() => {
                                        const Icon = link.icon;
                                        return <Icon className={`text-[1.1rem] shrink-0 transition-colors ${
                                            isActive 
                                                ? 'text-white' 
                                                : (user?.role?.toLowerCase() === 'agent' ? 'text-surface-400 group-hover:text-white' : 'text-surface-400 group-hover:text-surface-600 dark:group-hover:text-surface-300')
                                        }`} />;
                                    })()}
                                    <AnimatePresence mode="wait">
                                        {!isCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="whitespace-nowrap text-sm"
                                            >
                                                {link.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {!isCollapsed && displayBadge > 0 && (
                                    <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${
                                        user?.role?.toLowerCase() === 'agent' ? (isActive ? 'bg-white text-[#6D5DFC]' : 'bg-[#6D5DFC] text-white') : 'bg-primary-600 text-white'
                                    }`}>
                                        {displayBadge}
                                    </span>
                                )}

                                {/* Active Indicator line for collapsed mode */}
                                {isActive && isCollapsed && (
                                    <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full ${user?.role?.toLowerCase() === 'agent' ? 'bg-[#6D5DFC]' : 'bg-primary-500'}`} />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Promo Card & Collapse Toggle */}
                <div className="px-4 pb-6 mt-auto">
                    <AnimatePresence mode="wait">
                        {!isCollapsed && (
                            user?.role?.toLowerCase() === 'agent' ? (
                                /* Upgrade to Premium Widget (Agent Mockup) */
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-[#0F172A] border border-[#1D2231] rounded-2xl p-4 text-center mb-4 flex flex-col items-center"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center mb-1">
                                        <span className="text-2xl">👑</span>
                                    </div>
                                    <h4 className="text-white font-medium text-sm mb-1">Upgrade to Premium</h4>
                                    <p className="text-surface-400 text-[10px] mb-4">Get more leads, advanced analytics and more.</p>
                                    <button className="w-full bg-[#6D5DFC] text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-[#5b4ddb] transition-all flex items-center justify-center gap-2">
                                        <span>👑</span> Upgrade Now
                                    </button>
                                </motion.div>
                            ) : (
                                /* Find your perfect home Widget (Buyer/Default) */
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-[#131722] border border-[#1D2231] rounded-2xl p-4 text-center mb-4 flex flex-col items-center"
                                >
                                    <div className="w-12 h-12 bg-[#0A0D14] rounded-full flex items-center justify-center mb-3">
                                        <MdApartment className="text-primary-500 text-xl" />
                                    </div>
                                    <h4 className="text-white font-medium text-sm mb-1">Find your perfect home</h4>
                                    <p className="text-surface-400 text-xs mb-4">Explore premium properties handpicked for you.</p>
                                    <Link to="/properties" className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white text-xs font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-primary-500/20 transition-all">
                                        Explore Properties
                                    </Link>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`flex items-center w-full h-10 rounded-xl transition-colors ${
                            user?.role?.toLowerCase() === 'agent'
                                ? `text-surface-400 hover:text-white ${!isCollapsed ? 'px-4 justify-start' : 'justify-center'}`
                                : 'justify-center text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-[#131722]'
                        }`}
                    >
                        {user?.role?.toLowerCase() === 'agent' ? (
                            <>
                                {isCollapsed ? <FiChevronRight size={18} /> : <span className="text-sm flex items-center gap-2"><FiChevronLeft size={16} /><FiChevronLeft size={16} className="-ml-3" /> Collapse</span>}
                            </>
                        ) : (
                            isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />
                        )}
                    </button>
                </div>
            </motion.aside>
        </>
    )
}
