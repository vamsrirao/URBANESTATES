import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiShield } from 'react-icons/fi'
import LawyerCard from '../components/cards/LawyerCard'
import BookingModal from '../components/common/BookingModal'
import { getLawyers, getLawyersBySpecialization, searchLawyers } from '../services/lawyerService'
import { specializations } from '../data/lawyers'

/**
 * LawyersPage — Grid listing of all lawyers with search & filter.
 */
export default function LawyersPage() {
    const [search, setSearch] = useState('')
    const [specFilter, setSpecFilter] = useState('All Specializations')
    const [bookingLawyer, setBookingLawyer] = useState(null)

    // Filter logic
    let lawyers = specFilter !== 'All Specializations'
        ? getLawyersBySpecialization(specFilter)
        : getLawyers()

    if (search.trim()) {
        const searchResults = searchLawyers(search)
        const searchIds = new Set(searchResults.map(l => l.id))
        lawyers = lawyers.filter(l => searchIds.has(l.id))
    }

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-4">
                        <FiShield className="text-sm" />
                        Legal Services
                    </div>
                    <h1 className="heading-lg text-surface-900 dark:text-white mb-3">
                        Our <span className="text-gradient">Legal Experts</span>
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
                        Connect with verified real estate lawyers for property verification, title search,
                        RERA compliance, and legal documentation services.
                    </p>
                </motion.div>

                {/* Search & Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-4 mb-8"
                >
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search lawyers by name or expertise..."
                                className="input-field !pl-11"
                            />
                        </div>

                        {/* Specialization Filter */}
                        <div className="relative sm:w-64">
                            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none" />
                            <select
                                value={specFilter}
                                onChange={e => setSpecFilter(e.target.value)}
                                className="input-field !pl-11 appearance-none cursor-pointer"
                            >
                                {specializations.map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                        Showing <span className="font-semibold text-surface-900 dark:text-white">{lawyers.length}</span> lawyer{lawyers.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Lawyer Grid */}
                {lawyers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lawyers.map((lawyer, i) => (
                            <LawyerCard
                                key={lawyer.id}
                                lawyer={lawyer}
                                index={i}
                                onBook={setBookingLawyer}
                            />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <FiSearch className="text-4xl text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                        <h3 className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-2">
                            No lawyers found
                        </h3>
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                            Try adjusting your search or filter criteria.
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={!!bookingLawyer}
                onClose={() => setBookingLawyer(null)}
                lawyer={bookingLawyer}
            />
        </div>
    )
}
