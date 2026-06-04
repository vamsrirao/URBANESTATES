import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMessageSquare } from 'react-icons/fi'
import DashboardHeader from '../../../components/dashboard/DashboardHeader'
import ActivityFeed from '../../../components/dashboard/ActivityFeed'
import SectionContainer from '../../../components/dashboard/SectionContainer'

export default function BuyerInquiries() {
    const { userInquiries, getProperty } = useOutletContext()

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <DashboardHeader 
                title="Inquiries" 
                subtitle="Your messages to agents and property owners."
            />

            <SectionContainer>
                <ActivityFeed 
                    items={userInquiries}
                    emptyIcon={FiMessageSquare}
                    emptyTitle="No inquiries sent"
                    emptyMessage="When you contact an agent or seller, your messages will appear here."
                    renderItem={(inquiry) => {
                        const prop = getProperty(inquiry.propertyId)
                        const isReplied = inquiry.status === 'Replied'
                        
                        return (
                            <div className="glass-card p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                                {prop && (
                                    <div className="w-full sm:w-32 h-32 sm:h-24 shrink-0 overflow-hidden rounded-xl bg-surface-100 dark:bg-surface-800">
                                        <img 
                                            src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'} 
                                            alt={prop.title} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0 flex flex-col">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="font-display font-semibold text-surface-900 dark:text-white truncate">
                                                {prop?.title || 'Unknown Property'}
                                            </h3>
                                            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{inquiry.date}</p>
                                        </div>
                                        <span className={`badge self-start ${
                                            isReplied 
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                                                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                        }`}>
                                            {inquiry.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-surface-600 dark:text-surface-300 bg-surface-50 dark:bg-surface-800/50 p-3 sm:p-4 rounded-xl border border-surface-200 dark:border-surface-700 mt-auto">
                                        "{inquiry.message}"
                                    </p>
                                </div>
                            </div>
                        )
                    }}
                />
            </SectionContainer>
        </motion.div>
    )
}
