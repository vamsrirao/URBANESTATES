import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiDollarSign, FiCheckCircle, FiMapPin, FiPlus } from 'react-icons/fi'
import DashboardHeader from '../../../components/dashboard/DashboardHeader'
import ActivityFeed from '../../../components/dashboard/ActivityFeed'
import SectionContainer from '../../../components/dashboard/SectionContainer'
import { formatPrice } from '../../../hooks/formatPrice'

export default function BuyerPurchases() {
    const { userPurchases, getProperty, openBuyModal } = useOutletContext()

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <DashboardHeader 
                title="Purchases" 
                subtitle="Properties you have initiated a purchase for."
            >
                <button onClick={openBuyModal} className="btn-primary text-sm flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 shadow-purple-500/30 border-none px-4 py-2 rounded-xl">
                    <FiDollarSign /> Buy Property
                </button>
            </DashboardHeader>

            <SectionContainer>
                <ActivityFeed 
                    items={userPurchases}
                    emptyIcon={FiDollarSign}
                    emptyTitle="No purchases yet"
                    emptyMessage="When you buy a property, it will appear here."
                    renderItem={(purchase) => {
                        const prop = getProperty(purchase.propertyId)
                        
                        return (
                            <div className="glass-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border-l-4 border-purple-500">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-100 dark:bg-purple-900/30">
                                    <FiCheckCircle className="text-xl text-purple-600 dark:text-purple-400" />
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
                                        <p className="text-lg font-bold text-surface-900 dark:text-white">
                                            {formatPrice(purchase.price)}
                                        </p>
                                        <p className="text-xs text-surface-500 mt-0.5 sm:justify-end">
                                            {purchase.paymentMethod}
                                        </p>
                                    </div>
                                    <span className="sm:mt-2 badge bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                        {purchase.status}
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
