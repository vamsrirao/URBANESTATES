import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin, FiClock, FiPlus } from 'react-icons/fi'
import DashboardHeader from '../../../components/dashboard/DashboardHeader'
import ActivityFeed from '../../../components/dashboard/ActivityFeed'
import SectionContainer from '../../../components/dashboard/SectionContainer'

export default function BuyerVisits() {
    const { userVisits, getProperty, openScheduleModal } = useOutletContext()

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <DashboardHeader 
                title="Scheduled Visits" 
                subtitle="Track your upcoming and past property visits."
            >
                <button onClick={openScheduleModal} className="btn-primary text-sm flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 shadow-teal-500/30 border-none px-4 py-2 rounded-xl">
                    <FiPlus /> New Visit
                </button>
            </DashboardHeader>

            <SectionContainer>
                <ActivityFeed 
                    items={userVisits}
                    emptyIcon={FiCalendar}
                    emptyTitle="No visits scheduled"
                    emptyMessage="You haven't scheduled any property visits yet."
                    renderItem={(visit) => {
                        const prop = getProperty(visit.propertyId)
                        const isUpcoming = visit.status === 'Upcoming'
                        
                        return (
                            <div className="glass-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                    isUpcoming ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'bg-surface-100 dark:bg-surface-800 text-surface-500'
                                }`}>
                                    <FiCalendar className="text-xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-display font-semibold text-surface-900 dark:text-white truncate">
                                        {prop?.title || 'Unknown Property'}
                                    </h3>
                                    <p className="text-sm text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-1 truncate">
                                        <FiMapPin className="text-xs shrink-0" /> {prop?.area || '-'}
                                    </p>
                                </div>
                                <div className="text-left sm:text-right mt-2 sm:mt-0 w-full sm:w-auto flex sm:block justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium text-surface-900 dark:text-white">{visit.date}</p>
                                        <p className="text-xs text-surface-500 flex items-center gap-1 sm:justify-end mt-0.5">
                                            <FiClock className="text-[10px]" /> {visit.time}
                                        </p>
                                    </div>
                                    <span className={`sm:mt-2 badge ${
                                        isUpcoming 
                                            ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' 
                                            : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                                    }`}>
                                        {visit.status}
                                    </span>
                                </div>
                            </div>
                        )
                    }}
                />
            </SectionContainer>
        </motion.div>
    )
}
