import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiUser, FiArrowRight, FiShield, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi'
import { MdApartment } from 'react-icons/md'
import { useAuth } from '../hooks/AuthContext'
import OTPVerification from '../components/OTPVerification'

// Password strength calculator
function getPasswordStrength(password) {
    if (!password) return { score: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    const levels = [
        { score: 0, label: '', color: '' },
        { score: 1, label: 'Very Weak', color: 'bg-red-500' },
        { score: 2, label: 'Weak', color: 'bg-orange-500' },
        { score: 3, label: 'Fair', color: 'bg-yellow-500' },
        { score: 4, label: 'Strong', color: 'bg-emerald-500' },
        { score: 5, label: 'Very Strong', color: 'bg-green-400' }
    ];
    return levels[score];
}

export default function SignupPage() {
    const navigate = useNavigate()
    const { register, isLoggedIn } = useAuth()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Buyer'
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showVerification, setShowVerification] = useState(false)
    const [verificationEmail, setVerificationEmail] = useState('')

    // Redirect if already logged in
    if (isLoggedIn()) {
        navigate('/')
        return null
    }

    // Password strength and requirement checks
    const strength = useMemo(() => getPasswordStrength(form.password), [form.password])
    const requirements = useMemo(() => ([
        { label: 'At least 8 characters', met: form.password.length >= 8 },
        { label: 'One uppercase letter', met: /[A-Z]/.test(form.password) },
        { label: 'One lowercase letter', met: /[a-z]/.test(form.password) },
        { label: 'One number', met: /[0-9]/.test(form.password) },
        { label: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(form.password) }
    ]), [form.password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            setError('Please fill in all fields')
            return
        }

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (form.password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }

        // Check all strength requirements
        const unmet = requirements.filter(r => !r.met)
        if (unmet.length > 0) {
            setError(`Password requirement not met: ${unmet[0].label}`)
            return
        }

        setLoading(true)
        const trimmedEmail = form.email.trim()
        const result = await register(form.name.trim(), trimmedEmail, form.password, form.role)

        if (result.success) {
            if (result.verificationPending) {
                setVerificationEmail(trimmedEmail)
                setShowVerification(true)
            } else {
                navigate(`/dashboard/${result.role}`, { replace: true })
            }
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
                            onSuccess={(role) => navigate(`/dashboard/${role}`, { replace: true })}
                            onCancel={() => {
                                setShowVerification(false)
                                setError('')
                            }}
                        />
                    ) : (
                        <>
                            <h1 className="text-2xl font-display font-bold text-center text-surface-900 dark:text-white mb-1">
                                Create an Account
                            </h1>
                            <p className="text-sm text-center text-surface-500 dark:text-surface-400 mb-8">
                                Join UrbanEstates and find your dream property
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
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="input-field !pl-11"
                                            required
                                        />
                                    </div>
                                </div>

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
                                        Account Type
                                    </label>
                                    <div className="relative">
                                        <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                                        <select
                                            value={form.role}
                                            onChange={e => setForm({ ...form, role: e.target.value })}
                                            className="input-field !pl-11 appearance-none bg-white dark:bg-surface-900"
                                        >
                                            <option value="Buyer">Buyer</option>
                                            <option value="Seller">Seller</option>
                                            <option value="Agent">Agent</option>
                                            <option value="Lawyer">Lawyer</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-300 transition-colors"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">
                                            Confirm
                                        </label>
                                        <div className="relative">
                                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                                            <input
                                                type={showConfirm ? 'text' : 'password'}
                                                value={form.confirmPassword}
                                                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                                                placeholder="••••••••"
                                                className="input-field !pl-11 !pr-11"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-300 transition-colors"
                                                tabIndex={-1}
                                            >
                                                {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Strength Indicator */}
                                {form.password && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-2"
                                    >
                                        {/* Strength Bar */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map(level => (
                                                    <div
                                                        key={level}
                                                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                                                            level <= strength.score ? strength.color : 'bg-transparent'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className={`text-xs font-medium min-w-[70px] text-right ${
                                                strength.score <= 2 ? 'text-red-400' :
                                                strength.score <= 3 ? 'text-yellow-400' : 'text-emerald-400'
                                            }`}>
                                                {strength.label}
                                            </span>
                                        </div>

                                        {/* Requirements Checklist */}
                                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                                            {requirements.map((req, i) => (
                                                <div key={i} className="flex items-center gap-1.5 text-xs">
                                                    {req.met ? (
                                                        <FiCheck className="text-emerald-400 flex-shrink-0" size={12} />
                                                    ) : (
                                                        <FiX className="text-surface-500 flex-shrink-0" size={12} />
                                                    )}
                                                    <span className={req.met ? 'text-emerald-400' : 'text-surface-500'}>
                                                        {req.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-4`}
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Create Account <FiArrowRight />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center text-sm text-surface-500 dark:text-surface-400">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                                    Sign In
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
