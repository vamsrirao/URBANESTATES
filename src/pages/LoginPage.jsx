import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi'
import { MdApartment } from 'react-icons/md'
import { useAuth } from '../hooks/AuthContext'
import OTPVerification from '../components/OTPVerification'

export default function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, isLoggedIn, user } = useAuth()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showVerification, setShowVerification] = useState(false)
    const [verificationEmail, setVerificationEmail] = useState('')

    // Redirect if already logged in
    if (isLoggedIn()) {
        const properRole = user?.role?.toLowerCase() || 'buyer'
        navigate(`/dashboard/${properRole}`, { replace: true })
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!form.email || !form.password) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)
        const trimmedEmail = form.email.trim()
        const trimmedPassword = form.password.trim()
        const result = await login(trimmedEmail, trimmedPassword)

        if (result.success) {
            // Navigate to requested page or role dashboard
            const from = location.state?.from?.pathname || `/dashboard/${result.role}`
            navigate(from, { replace: true })
        } else {
            if (result.verificationPending) {
                setVerificationEmail(trimmedEmail)
                setShowVerification(true)
                setError(result.message)
            } else {
                setError(result.message)
            }
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-surface-900/95 via-surface-900/85 to-surface-900/95" />
            </div>

            {/* Decorative orbs */}
            <div className={`absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-primary-500 to-accent-600 opacity-10 blur-3xl`} />
            <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 opacity-10 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Card */}
                <div className="glass-card p-8 sm:p-10">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 justify-center mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <MdApartment className="text-white text-xl" />
                        </div>
                        <span className="text-xl font-display font-bold text-surface-900 dark:text-white">
                            Urban<span className="text-gradient">Estates</span>
                        </span>
                    </Link>

                    {showVerification ? (
                        <OTPVerification
                            email={verificationEmail}
                            onSuccess={(role) => {
                                const from = location.state?.from?.pathname || `/dashboard/${role}`
                                navigate(from, { replace: true })
                            }}
                            onCancel={() => {
                                setShowVerification(false)
                                setError('')
                            }}
                        />
                    ) : (
                        <>
                            <h1 className="text-2xl font-display font-bold text-center text-surface-900 dark:text-white mb-1">
                                Welcome Back
                            </h1>
                            <p className="text-sm text-center text-surface-500 dark:text-surface-400 mb-8">
                                Sign in to access your dashboard
                            </p>

                            {/* Error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            placeholder="you@example.com"
                                            className="input-field !pl-11"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={form.password}
                                            onChange={e => setForm({ ...form, password: e.target.value })}
                                            placeholder="••••••••"
                                            className="input-field !pl-11 !pr-11"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-300 transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2`}
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Sign In <FiArrowRight />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center text-sm text-surface-500 dark:text-surface-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                                    Sign Up
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
