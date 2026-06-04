import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiCheck, FiMapPin, FiUser } from 'react-icons/fi'
import { scheduleVisit, getVisits } from '../../services/visitService'
import properties from '../../data/properties'

/**
 * VisitScheduler — Compact scheduling widget for property visits.
 * Can be embedded in PropertyDetails or used standalone.
 */
export default function VisitScheduler({ propertyId = null, showPropertySelect = false, className = '' }) {
    const [form, setForm] = useState({
        propertyId: propertyId || '',
        date: '',
        time: '',
        name: '',
        email: '',
    })
    const [scheduled, setScheduled] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')

    const today = new Date().toISOString().split('T')[0]

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ]

    const selectedProperty = properties.find(p => p.id === Number(form.propertyId))

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (!form.propertyId || !form.date || !form.time || !form.name.trim() || !form.email.trim()) {
            setError('Please fill in all fields')
            return
        }

        const selectedDate = new Date(form.date)
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        if (selectedDate < now) {
            setError('Please select a future date')
            return
        }

        const property = properties.find(p => p.id === Number(form.propertyId))
        if (!property) {
            setError('Invalid property selected')
            return
        }

        const visit = scheduleVisit({
            propertyId: property.id,
            propertyTitle: property.title,
            userName: form.name,
            userEmail: form.email,
            date: form.date,
            time: form.time,
            agent: property.agent,
        })

        setResult(visit)
        setScheduled(true)
    }

    const handleReset = () => {
        setForm({ propertyId: propertyId || '', date: '', time: '', name: '', email: '' })
        setScheduled(false)
        setResult(null)
        setError('')
    }

    if (scheduled && result) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`glass-card p-6 ${className}`}
            >
                <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3">
                        <FiCheck className="text-2xl text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-surface-900 dark:text-white mb-1">
                        Visit Scheduled!
                    </h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
                        {result.propertyTitle}
                    </p>

                    <div className="glass rounded-xl p-4 mb-4 text-left space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <FiCalendar className="text-primary-500 flex-shrink-0" />
                            <span className="text-surface-600 dark:text-surface-300">
                                {new Date(result.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <FiClock className="text-primary-500 flex-shrink-0" />
                            <span className="text-surface-600 dark:text-surface-300">{result.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <FiUser className="text-primary-500 flex-shrink-0" />
                            <span className="text-surface-600 dark:text-surface-300">
                                Agent: {result.assignedAgent.name} ({result.assignedAgent.phone})
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="px-5 py-2 rounded-xl text-sm font-medium glass text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    >
                        Schedule Another Visit
                    </button>
                </div>
            </motion.div>
        )
    }

    return (
        <div className={`glass-card p-6 ${className}`}>
            <h3 className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                <FiCalendar className="text-primary-500" />
                Schedule a Visit
            </h3>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm text-center"
                >
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Property selector (when standalone) */}
                {showPropertySelect && (
                    <div>
                        <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">
                            <FiMapPin className="inline mr-1 text-xs" />
                            Select Property
                        </label>
                        <select
                            value={form.propertyId}
                            onChange={e => setForm({ ...form, propertyId: e.target.value })}
                            className="input-field"
                            required
                        >
                            <option value="">Choose a property...</option>
                            {properties.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.title} — {p.area}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* User details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        />
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">
                        <FiCalendar className="inline mr-1 text-xs" />
                        Select Date
                    </label>
                    <input
                        type="date"
                        value={form.date}
                        onChange={e => setForm({ ...form, date: e.target.value })}
                        min={today}
                        className="input-field"
                        required
                    />
                </div>

                {/* Time slots */}
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-2">
                        <FiClock className="inline mr-1 text-xs" />
                        Select Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(slot => (
                            <button
                                key={slot}
                                type="button"
                                onClick={() => setForm({ ...form, time: slot })}
                                className={`py-2 rounded-xl text-xs font-medium transition-all duration-200 ${form.time === slot
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                                    : 'glass text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                                    }`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Agent preview */}
                {selectedProperty && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700/50">
                        <img
                            src={selectedProperty.agent.image}
                            alt={selectedProperty.agent.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-xs text-surface-400">Assigned Agent</p>
                            <p className="text-sm font-medium text-surface-900 dark:text-white">{selectedProperty.agent.name}</p>
                        </div>
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold text-white btn-primary"
                >
                    Schedule Visit
                </button>
            </form>
        </div>
    )
}
