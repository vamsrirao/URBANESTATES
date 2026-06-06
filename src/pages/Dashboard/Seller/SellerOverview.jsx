import { motion } from 'framer-motion'
import { FiHome, FiSettings } from 'react-icons/fi'
import { useOutletContext, useNavigate } from 'react-router-dom'

export default function SellerOverview() {
    const { user, myProperties } = useOutletContext()
    const navigate = useNavigate()

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <h1 className="heading-lg text-surface-900 dark:text-white">Seller Dashboard</h1>
                <p className="text-surface-500 dark:text-surface-400 mt-1">Manage your property listings</p>
            </div>

            {/* Profile Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 mb-10"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-white text-3xl font-display font-bold shadow-lg">
                        {user?.name?.charAt(0) || 'S'}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-display font-semibold text-surface-900 dark:text-white">{user?.name || 'Seller User'}</h2>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">{user?.email || 'seller@test.com'}  •  Member since Jan 2024</p>
                        <div className="flex flex-wrap gap-4 mt-3">
                            <span className="flex items-center gap-1.5 text-sm text-surface-600 dark:text-surface-300">
                                <FiHome className="text-emerald-500" /> {myProperties.length} Properties Listed
                            </span>
                        </div>
                    </div>
                    <button onClick={() => navigate('/dashboard/settings')} className="btn-secondary text-sm flex items-center gap-2">
                        <FiSettings /> Edit Profile
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
