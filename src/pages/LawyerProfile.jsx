import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    FiArrowLeft, FiClock, FiBriefcase, FiMapPin,
    FiPhone, FiMail, FiMessageSquare, FiCheckCircle, FiGlobe
} from 'react-icons/fi'
import StarRating from '../components/common/StarRating'
import BookingModal from '../components/common/BookingModal'
import Avatar from '../components/common/Avatar'
import { getLawyerById } from '../services/lawyerService'

/**
 * LawyerProfile — Full profile page for a single lawyer.
 */
export default function LawyerProfile() {
    const { id } = useParams()
    const lawyer = getLawyerById(id)
    const [showBooking, setShowBooking] = useState(false)

    if (!lawyer) {
        return (
            <div className="pt-24 pb-16 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="heading-lg text-surface-900 dark:text-white mb-4">Lawyer Not Found</h1>
                    <Link to="/lawyers" className="btn-primary inline-flex">
                        <FiArrowLeft className="mr-2" /> Back to Lawyers
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    to="/lawyers"
                    className="inline-flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
                >
                    <FiArrowLeft /> Back to Lawyers
                </Link>

                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card overflow-hidden mb-8"
                >
                    {/* Cover gradient */}
                    <div className="h-40 sm:h-52 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 relative">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.06%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
                    </div>

                    <div className="px-6 sm:px-8 pb-8">
                        {/* Avatar */}
                        <div className="-mt-14 sm:-mt-16 mb-4 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                            <div className="relative z-10 shrink-0">
                                <Avatar 
                                    src={lawyer.image} 
                                    alt={lawyer.name} 
                                    className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white dark:border-surface-800 shadow-xl bg-surface-100 dark:bg-surface-800"
                                    fallbackIconSize="text-5xl sm:text-7xl"
                                />
                            </div>
                            <div className="flex-1 pb-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h1 className="text-2xl sm:text-3xl font-display font-bold text-surface-900 dark:text-white">
                                            {lawyer.name}
                                        </h1>
                                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                                            {lawyer.specialization}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowBooking(true)}
                                        className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                                    >
                                        <FiMessageSquare className="inline mr-2" />
                                        Book Consultation
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                            {[
                                { icon: FiClock, label: 'Experience', value: `${lawyer.experience} Years` },
                                { icon: FiBriefcase, label: 'Bar Council', value: lawyer.barCouncilId },
                                { icon: FiCheckCircle, label: 'Rating', value: `${lawyer.rating}/5` },
                                { icon: FiGlobe, label: 'Languages', value: lawyer.languages.length },
                            ].map((stat, i) => (
                                <div key={i} className="glass rounded-xl p-3 text-center">
                                    <stat.icon className="text-indigo-500 mx-auto mb-1" />
                                    <div className="text-sm font-bold text-surface-900 dark:text-white">{stat.value}</div>
                                    <div className="text-[10px] text-surface-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-6"
                        >
                            <h2 className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-3">
                                About
                            </h2>
                            <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                                {lawyer.bio}
                            </p>

                            {/* Languages */}
                            <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700/50">
                                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {lawyer.languages.map(lang => (
                                        <span key={lang} className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Reviews */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-display font-semibold text-surface-900 dark:text-white">
                                    Reviews
                                </h2>
                                <div className="flex items-center gap-2">
                                    <StarRating rating={lawyer.rating} size="text-base" />
                                    <span className="text-xs text-surface-400">({lawyer.reviewCount})</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {lawyer.reviews.map((review, i) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.05 }}
                                        className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-100 dark:border-surface-700/50"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-surface-900 dark:text-white">{review.name}</p>
                                                    <p className="text-[10px] text-surface-400">{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <StarRating rating={review.rating} showValue={false} size="text-xs" />
                                        </div>
                                        <p className="text-sm text-surface-600 dark:text-surface-300">{review.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="glass-card p-6"
                        >
                            <h3 className="text-sm font-display font-semibold text-surface-900 dark:text-white mb-4">
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                <a href={`tel:${lawyer.phone}`} className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                                        <FiPhone className="text-primary-600 dark:text-primary-400 text-sm" />
                                    </div>
                                    {lawyer.phone}
                                </a>
                                <a href={`mailto:${lawyer.email}`} className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                                        <FiMail className="text-primary-600 dark:text-primary-400 text-sm" />
                                    </div>
                                    {lawyer.email}
                                </a>
                            </div>
                        </motion.div>

                        {/* Availability */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6"
                        >
                            <h3 className="text-sm font-display font-semibold text-surface-900 dark:text-white mb-4">
                                Availability
                            </h3>
                            <div className="mb-3">
                                <p className="text-xs text-surface-400 mb-2">Available Days</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {lawyer.availability.days.map(day => (
                                        <span key={day} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                                            {day.slice(0, 3)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-surface-400 mb-2">Time Slots</p>
                                <div className="grid grid-cols-2 gap-1.5">
                                    {lawyer.availability.slots.map(slot => (
                                        <span key={slot} className="px-2.5 py-1 rounded-lg text-[10px] font-medium text-center bg-surface-50 dark:bg-surface-800/50 text-surface-600 dark:text-surface-300 border border-surface-100 dark:border-surface-700/50">
                                            {slot}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <button
                                onClick={() => setShowBooking(true)}
                                className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Book Consultation Now
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={showBooking}
                onClose={() => setShowBooking(false)}
                lawyer={lawyer}
            />
        </div>
    )
}
