import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    FiCalendar, FiClock, FiMapPin, FiUser, FiTrash2, FiHome
} from 'react-icons/fi'
import VisitScheduler from '../components/common/VisitScheduler'
import { getVisits, cancelVisit } from '../services/visitService'

/**
 * VisitSchedulerPage — Standalone page for scheduling and viewing property visits.
 */
export default function VisitSchedulerPage() {
    const [visits, setVisits] = useState(getVisits())
    const [refreshKey, setRefreshKey] = useState(0)

    const refreshVisits = () => {
        setVisits(getVisits())
        setRefreshKey(k => k + 1)
    }

    const handleCancel = (id) => {
        cancelVisit(id)
        refreshVisits()
    }

    const scheduledVisits = visits.filter(v => v.status === 'Scheduled')
    const pastVisits = visits.filter(v => v.status !== 'Scheduled')

    const statusColors = {
        Scheduled: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
        Completed: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
        Cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold mb-4">
                        <FiHome className="text-sm" />
                        Property Visits
                    </div>
                    <h1 className="heading-lg text-surface-900 dark:text-white mb-3">
                        Schedule a <span className="text-gradient">Property Visit</span>
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
                        Pick a property, choose a convenient date and time, and we'll assign a dedicated agent to guide your visit.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Scheduler Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <VisitScheduler
                            key={refreshKey}
                            showPropertySelect={true}
                            className="sticky top-28"
                        />
                        {/* Button to refresh list after scheduling */}
                        <button
                            onClick={refreshVisits}
                            className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium glass text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        >
                            Refresh Visit List
                        </button>
                    </motion.div>

                    {/* Visits List */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Upcoming Visits */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                                <FiCalendar className="text-primary-500" />
                                Upcoming Visits
                                {scheduledVisits.length > 0 && (
                                    <span className="badge-primary">{scheduledVisits.length}</span>
                                )}
                            </h2>

                            {scheduledVisits.length === 0 ? (
                                <div className="glass-card p-10 text-center">
                                    <FiCalendar className="text-3xl text-surface-300 dark:text-surface-600 mx-auto mb-3" />
                                    <p className="text-sm text-surface-500">No upcoming visits scheduled.</p>
                                    <p className="text-xs text-surface-400 mt-1">Use the scheduler to book a property visit.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {scheduledVisits.map((visit, i) => (
                                        <motion.div
                                            key={visit.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.25 + i * 0.05 }}
                                            className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                                                <FiHome className="text-xl text-primary-600 dark:text-primary-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-display font-semibold text-surface-900 dark:text-white text-sm">
                                                    {visit.propertyTitle}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-surface-400">
                                                    <span className="flex items-center gap-1">
                                                        <FiCalendar className="text-[10px]" />
                                                        {new Date(visit.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FiClock className="text-[10px]" />
                                                        {visit.time}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FiUser className="text-[10px]" />
                                                        Agent: {visit.assignedAgent?.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`badge ${statusColors[visit.status]}`}>
                                                    {visit.status}
                                                </span>
                                                <button
                                                    onClick={() => handleCancel(visit.id)}
                                                    className="p-2 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    title="Cancel visit"
                                                >
                                                    <FiTrash2 className="text-sm" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Past Visits */}
                        {pastVisits.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-lg font-display font-semibold text-surface-500 dark:text-surface-400 mb-4">
                                    Past Visits
                                </h2>
                                <div className="space-y-3 opacity-75">
                                    {pastVisits.map((visit, i) => (
                                        <div key={visit.id} className="glass-card p-4 flex items-center gap-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-surface-600 dark:text-surface-300">
                                                    {visit.propertyTitle}
                                                </p>
                                                <p className="text-xs text-surface-400 mt-0.5">
                                                    {new Date(visit.date).toLocaleDateString()} · {visit.time}
                                                </p>
                                            </div>
                                            <span className={`badge ${statusColors[visit.status]}`}>
                                                {visit.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
