import { useOutletContext, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMessageSquare, FiCalendar, FiHeart, FiFileText, FiPlus } from 'react-icons/fi'
import DashboardHeader from '../../../components/dashboard/DashboardHeader'
import StatCard from '../../../components/dashboard/StatCard'
import SectionContainer from '../../../components/dashboard/SectionContainer'
import PropertyCard from '../../../components/dashboard/PropertyCard'

export default function BuyerOverview() {
    const { user, userInquiries, userVisits, favoriteProperties, userPurchases, availableProperties, openScheduleModal, toggleFavorite } = useOutletContext()

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pb-10"
        >
            <DashboardHeader 
                title={<>Welcome back, {user?.name?.split(' ')[0] || 'Alice'}! <span className="text-2xl">👋</span></>} 
                subtitle="Here's what's happening with your real estate journey."
            >
                <button onClick={openScheduleModal} className="bg-primary-600 hover:bg-primary-500 text-white font-medium text-sm flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-primary-500/20">
                    <FiPlus /> New Inquiry
                </button>
            </DashboardHeader>

            <SectionContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatCard 
                        title="Inquiries" 
                        subtitle="Total inquiries sent"
                        value={userInquiries.length} 
                        icon={FiMessageSquare} 
                        color="primary"
                        href="/dashboard/buyer/inquiries"
                        delay={0.1}
                    />
                    <StatCard 
                        title="Scheduled Visits" 
                        subtitle="Upcoming property visits"
                        value={userVisits.filter(v => v.status === 'Upcoming').length} 
                        icon={FiCalendar} 
                        color="teal"
                        href="/dashboard/buyer/visits"
                        delay={0.2}
                    />
                    <StatCard 
                        title="Favorites" 
                        subtitle="Saved properties"
                        value={favoriteProperties.length} 
                        icon={FiHeart} 
                        color="pink"
                        href="/dashboard/buyer/favorites"
                        delay={0.3}
                    />
                    <StatCard 
                        title="Offers" 
                        subtitle="Offers made"
                        value={userPurchases.length} 
                        icon={FiFileText} 
                        color="blue"
                        href="/dashboard/buyer/purchases"
                        delay={0.4}
                    />
                </div>
            </SectionContainer>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {/* Recent Activity */}
                <div className="bg-white dark:bg-[#131722] border border-surface-200 dark:border-[#1D2231] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                            <FiCalendar className="text-surface-400" /> Recent Activity
                        </h3>
                        <Link to="/dashboard/buyer/activity" className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-6">
                        {[
                            { icon: FiMessageSquare, color: 'text-primary-500 bg-primary-500/10', title: 'Welcome to UrbanEstates!', sub: 'Start exploring properties', time: '2 min ago' },
                            { icon: FiFileText, color: 'text-teal-500 bg-teal-500/10', title: 'Complete your profile', sub: 'Add more details to get better recommendations', time: '1 day ago' },
                            { icon: FiHeart, color: 'text-pink-500 bg-pink-500/10', title: 'Save properties', sub: 'Save properties you like to view later', time: '2 days ago' },
                            { icon: FiCalendar, color: 'text-blue-500 bg-blue-500/10', title: 'Schedule a visit', sub: 'Book visits to your favorite properties', time: '3 days ago' },
                        ].map((act, i) => {
                            const Icon = act.icon;
                            return (
                            <div key={i} className="flex gap-4 items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.color}`}>
                                    <Icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{act.title}</p>
                                    <p className="text-xs text-surface-500 truncate">{act.sub}</p>
                                </div>
                                <span className="text-xs text-surface-400 shrink-0">{act.time}</span>
                            </div>
                            )
                        })}
                    </div>
                </div>

                {/* Saved Properties */}
                <div className="bg-white dark:bg-[#131722] border border-surface-200 dark:border-[#1D2231] rounded-2xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                            <FiHeart className="text-pink-500" /> Saved Properties
                        </h3>
                        <Link to="/dashboard/buyer/favorites" className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                            View All
                        </Link>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-primary-500/10 text-primary-500 rounded-full flex items-center justify-center mb-4">
                            <FiHeart size={28} />
                        </div>
                        <h4 className="font-medium text-surface-900 dark:text-white mb-1">No saved properties yet</h4>
                        <p className="text-sm text-surface-500 mb-6">Start exploring and save properties you love</p>
                        <Link to="/properties" className="bg-gradient-to-r from-primary-600 to-accent-500 text-white font-medium text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-primary-500/20">
                            Browse Properties
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recommended */}
            <SectionContainer>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                        <span className="text-yellow-500">⭐</span> Recommended for You
                    </h3>
                    <Link to="/properties" className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                        View All
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableProperties.slice(0, 3).map((property, i) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <PropertyCard 
                                property={property} 
                                isFavorite={favoriteProperties.some(p => p.id === property.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        </motion.div>
                    ))}
                </div>
            </SectionContainer>
        </motion.div>
    )
}
