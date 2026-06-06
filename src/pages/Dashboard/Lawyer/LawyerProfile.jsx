import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import StarRating from '../../../components/common/StarRating'

export default function LawyerProfile() {
    const { user, lawyerProfile } = useOutletContext()

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <img src={lawyerProfile?.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'} alt={lawyerProfile?.name} className="w-24 h-24 rounded-2xl object-cover shadow-lg" />
                <div>
                    <h2 className="text-xl font-display font-bold text-surface-900 dark:text-white">{user?.name}</h2>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{lawyerProfile?.specialization || 'Legal Advisor'}</p>
                    <div className="mt-2"><StarRating rating={lawyerProfile?.rating || 0} /></div>
                    <p className="text-xs text-surface-400 mt-1">{lawyerProfile?.reviewCount || 0} reviews · {lawyerProfile?.experience || 0} years experience</p>
                </div>
            </div>
            <div className="space-y-4">
                <div><h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 mb-1">Bio</h3><p className="text-sm text-surface-600 dark:text-surface-300">{lawyerProfile?.bio || 'No bio provided.'}</p></div>
                <div><h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 mb-1">Bar Council ID</h3><p className="text-sm text-surface-600 dark:text-surface-300">{lawyerProfile?.barCouncilId || 'N/A'}</p></div>
                <div><h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 mb-1">Email</h3><p className="text-sm text-surface-600 dark:text-surface-300">{user?.email}</p></div>
                <div><h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 mb-1">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                        {lawyerProfile?.languages?.map(lang => (
                            <span key={lang} className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">{lang}</span>
                        )) || <span className="text-sm text-surface-500">Not specified</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
