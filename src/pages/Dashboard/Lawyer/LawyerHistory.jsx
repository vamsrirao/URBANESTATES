import { motion } from 'framer-motion'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { useOutletContext } from 'react-router-dom'

export default function LawyerHistory() {
    const { verifiedProperties, user } = useOutletContext()

    return (
        <div className="space-y-4">
            {verifiedProperties.length === 0 && <p className="p-8 text-center glass-card text-surface-500">No verification history available.</p>}
            {verifiedProperties.map((property, i) => (
                <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className={`glass-card p-6 flex flex-col sm:flex-row gap-4 border-l-4 ${property.status === 'Approved' ? 'border-emerald-500' : 'border-red-500'}`}>
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="font-display font-semibold text-surface-900 dark:text-white">{property.title}</h3>
                                <p className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-0.5">{property.area}</p>
                            </div>
                            <span className={`badge ${property.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                                {property.status === 'Approved' ? <><FiCheckCircle className="mr-1 inline text-xs" /> Approved</> : <><FiXCircle className="mr-1 inline text-xs" /> Rejected</>}
                            </span>
                        </div>
                        <p className="text-xs text-surface-400 mt-2">Action taken by: {user?.name} ({user?.email})</p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
