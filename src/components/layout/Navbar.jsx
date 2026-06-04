import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { MdApartment } from 'react-icons/md'
import { useAuth } from '../../hooks/AuthContext'
import UserProfileMenu from './UserProfileMenu'

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
    { path: '/lawyers', label: 'Lawyers' },
    { path: '/map', label: 'Map' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
]

export default function Navbar({ darkMode, setDarkMode }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [location.pathname])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl shadow-lg shadow-surface-900/5 dark:shadow-black/30'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow">
                            <MdApartment className="text-white text-xl" />
                        </div>
                        <span className="text-xl font-display font-bold text-surface-900 dark:text-white">
                            Urban<span className="text-gradient">Estates</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Auth Section: Profile Menu or Sign In/Up */}
                        <div className="flex items-center ml-2 pl-4 border-l border-surface-200 dark:border-surface-700">
                            {isLoggedIn() ? (
                                <UserProfileMenu variant="desktop" />
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="ml-2 btn-primary text-sm !px-5 !py-2.5 bg-gradient-to-r from-primary-500 to-accent-600"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FiSun className="text-lg text-amber-400" /> : <FiMoon className="text-lg" />}
                        </button>
                        <Link to="/properties" className="hidden sm:inline-flex btn-primary text-sm !px-5 !py-2.5">
                            Explore Homes
                        </Link>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white/95 dark:bg-surface-950/95 backdrop-blur-xl border-t border-surface-200 dark:border-surface-700 overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.path
                                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                        : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="border-t border-surface-200 dark:border-surface-700 pt-2 mt-2">
                                {isLoggedIn() ? (
                                    <UserProfileMenu variant="mobile" />
                                ) : (
                                    <div className="flex flex-col gap-2 mt-2">
                                        <Link
                                            to="/login"
                                            className="block px-4 py-3 rounded-xl text-center text-sm font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="block px-4 py-3 rounded-xl text-center text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-accent-600 shadow-lg shadow-primary-500/25 transition-colors"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
