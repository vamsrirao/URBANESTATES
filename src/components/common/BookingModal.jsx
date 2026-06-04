import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiMessageSquare, FiCheck } from 'react-icons/fi'
import Modal from './Modal'
import { addBooking } from '../../services/bookingService'
import { createConsultationNotification } from '../../services/notificationService'
import { useAuth } from '../../hooks/AuthContext'

/**
 * BookingModal — Date & time picker modal for booking lawyer consultations.
 * Uses the existing Modal component as a base.
 * Sends a notification to the lawyer when a booking is confirmed.
 */
export default function BookingModal({ isOpen, onClose, lawyer }) {
    const { user, token, isLoggedIn } = useAuth()

    const [form, setForm] = useState({
        date: '',
        timeSlot: '',
        query: '',
        name: '',
        email: '',
    })
    const [booked, setBooked] = useState(false)
    const [bookingRef, setBookingRef] = useState('')
    const [error, setError] = useState('')

    // Pre-fill name/email from authenticated user
    useEffect(() => {
        if (isLoggedIn() && user) {
            setForm(prev => ({
                ...prev,
                name: prev.name || user.name || '',
                email: prev.email || user.email || ''
            }))
        }
    }, [user, isLoggedIn])

    if (!lawyer) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!form.date || !form.timeSlot || !form.query.trim() || !form.name.trim() || !form.email.trim()) {
            setError('Please fill in all fields')
            return
        }

        // Check date is not in the past
        const selectedDate = new Date(form.date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
            setError('Please select a future date')
            return
        }

        // 1. Save booking to localStorage
        const newBooking = addBooking({
            lawyerId: lawyer.id,
            lawyerName: lawyer.name,
            lawyerEmail: lawyer.email,
            userName: form.name,
            userEmail: form.email,
            userRole: user?.role || 'Guest',
            date: form.date,
            timeSlot: form.timeSlot,
            query: form.query,
        })

        setBookingRef(newBooking.id)

        // 2. Send notification to the lawyer (if user is authenticated)
        if (isLoggedIn() && token) {
            const formattedDate = new Date(form.date).toLocaleDateString('en-IN', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            })

            await createConsultationNotification({
                recipientEmail: lawyer.email,
                senderName: form.name,
                senderEmail: form.email,
                senderRole: user?.role || 'Guest',
                type: 'CONSULTATION_BOOKED',
                title: 'New Consultation Booking',
                message: `New consultation booked by ${form.name} (${user?.role || 'Guest'}) for ${formattedDate} at ${form.timeSlot}. Booking ID: #${newBooking.id}`,
                bookingRef: newBooking.id,
                consultationDate: form.date,
                consultationTime: form.timeSlot,
                consultationQuery: form.query
            }, token)
        }

        setBooked(true)
    }

    const handleClose = () => {
        setForm({ date: '', timeSlot: '', query: '', name: '', email: '' })
        setBooked(false)
        setBookingRef('')
        setError('')
        onClose()
    }

    // Get min date (today)
    const todayStr = new Date().toISOString().split('T')[0]

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={booked ? null : `Book Consultation — ${lawyer.name}`}>
            {booked ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                        <FiCheck className="text-3xl text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-2">
                        Consultation Booked!
                    </h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">
                        {lawyer.name} · {new Date(form.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mb-3">
                        Time: {form.timeSlot}
                    </p>
                    {bookingRef && (
                        <p className="text-xs text-surface-400 mb-2 font-mono">
                            Booking ID: <span className="text-primary-500 font-semibold">#{bookingRef}</span>
                        </p>
                    )}
                    <p className="text-xs text-surface-400 mb-6">
                        Status: <span className="text-amber-500 font-semibold">Pending Confirmation</span>
                    </p>
                    <p className="text-xs text-emerald-500 dark:text-emerald-400 mb-6">
                        ✓ {lawyer.name} has been notified about your booking
                    </p>
                    <button
                        onClick={handleClose}
                        className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                        Done
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* User details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                placeholder="Enter your name"
                                className="input-field"
                                required
                                readOnly={isLoggedIn() && !!user?.name}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                placeholder="you@example.com"
                                className="input-field"
                                required
                                readOnly={isLoggedIn() && !!user?.email}
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">
                            <FiCalendar className="inline mr-1.5 text-xs" />
                            Select Date
                        </label>
                        <input
                            type="date"
                            value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })}
                            min={todayStr}
                            className="input-field"
                            required
                        />
                        {form.date && (
                            <p className="text-xs text-surface-400 mt-1">
                                Available: {lawyer.availability.days.join(', ')}
                            </p>
                        )}
                    </div>

                    {/* Time slots */}
                    <div>
                        <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-2">
                            <FiClock className="inline mr-1.5 text-xs" />
                            Select Time Slot
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {lawyer.availability.slots.map(slot => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setForm({ ...form, timeSlot: slot })}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all duration-200 ${form.timeSlot === slot
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                                        : 'glass text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Query */}
                    <div>
                        <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">
                            <FiMessageSquare className="inline mr-1.5 text-xs" />
                            Your Query
                        </label>
                        <textarea
                            value={form.query}
                            onChange={e => setForm({ ...form, query: e.target.value })}
                            placeholder="Describe your legal query or the property details you need help with..."
                            rows={3}
                            className="input-field resize-none"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                    >
                        Confirm Booking
                    </button>
                </form>
            )}
        </Modal>
    )
}
