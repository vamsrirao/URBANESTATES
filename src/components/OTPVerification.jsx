import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiShield, FiArrowRight, FiRefreshCw, FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../hooks/AuthContext'

export default function OTPVerification({ email, onSuccess, onCancel }) {
    const { verifyEmail, resendOTP } = useAuth()
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [cooldown, setCooldown] = useState(30) // 30s cooldown as requested
    const inputRefs = useRef([])

    // Countdown Timer logic
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
        return () => clearTimeout(timer)
    }, [cooldown])

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (index, value) => {
        // Only accept numbers
        if (value && !/^[0-9]$/.test(value)) return;

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setError('')

        // Auto focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (index, e) => {
        // Handle backspace to focus previous input
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                const newOtp = [...otp]
                newOtp[index - 1] = ''
                setOtp(newOtp)
                inputRefs.current[index - 1].focus()
            } else if (otp[index]) {
                const newOtp = [...otp]
                newOtp[index] = ''
                setOtp(newOtp)
            }
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').trim()
        if (!/^\d{6}$/.test(pastedData)) {
            setError('Please paste a 6-digit verification code')
            return;
        }

        const otpDigits = pastedData.split('')
        setOtp(otpDigits)
        setError('')
        
        // Focus the last digit
        inputRefs.current[5].focus()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccessMsg('')

        const fullOtp = otp.join('')
        if (fullOtp.length !== 6) {
            setError('Please enter all 6 digits')
            return;
        }

        setLoading(true)
        const result = await verifyEmail(email, fullOtp)

        if (result.success) {
            setSuccessMsg('Email verified successfully! Logging you in...')
            setTimeout(() => {
                onSuccess(result.role)
            }, 1500)
        } else {
            setError(result.message)
            // Keep the digit values but reset focus
            inputRefs.current[0].focus()
        }
        setLoading(false)
    }

    const handleResend = async () => {
        if (cooldown > 0) return;
        setError('')
        setSuccessMsg('')
        setResendLoading(true)

        const result = await resendOTP(email)
        if (result.success) {
            setSuccessMsg(result.message)
            setCooldown(30) // Reset cooldown
            // Clear inputs for fresh typing
            setOtp(['', '', '', '', '', ''])
            setTimeout(() => {
                if (inputRefs.current[0]) inputRefs.current[0].focus()
            }, 100)
        } else {
            setError(result.message)
        }
        setResendLoading(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full"
        >
            <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center shadow-lg shadow-primary-500/20 mx-auto mb-4">
                    <FiShield className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-1.5">
                    Verify Your Email
                </h2>
                <p className="text-sm text-surface-500 dark:text-surface-400 max-w-[280px] mx-auto">
                    We sent a 6-digit verification code to <span className="font-semibold text-primary-500 dark:text-primary-400 break-all">{email}</span>
                </p>
            </div>

            {/* Error message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium text-center"
                >
                    {error}
                </motion.div>
            )}

            {/* Success message */}
            {successMsg && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium text-center"
                >
                    {successMsg}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* OTP Digit Input Boxes */}
                <div className="flex justify-between gap-2.5" onPaste={handlePaste}>
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={el => inputRefs.current[idx] = el}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleChange(idx, e.target.value)}
                            onKeyDown={e => handleKeyDown(idx, e)}
                            className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:border-primary-500 dark:focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all duration-200"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading || otp.join('').length !== 6}
                    className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Verify & Authenticate <FiArrowRight />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={cooldown > 0 || resendLoading}
                    className="flex items-center gap-1.5 font-semibold text-primary-600 dark:text-primary-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                >
                    {resendLoading ? (
                        <FiRefreshCw className="animate-spin" />
                    ) : null}
                    {cooldown > 0 ? `Resend Code in ${cooldown}s` : 'Resend Verification Code'}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-surface-300 transition-colors"
                    >
                        <FiArrowLeft size={14} /> Back to Sign In / Sign Up
                    </button>
                )}
            </div>
        </motion.div>
    )
}
