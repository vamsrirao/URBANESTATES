import { motion } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { useOutletContext } from 'react-router-dom'

export default function LawyerVerify() {
    const { pendingProperties, handleVerify } = useOutletContext()

    return (
        <div className="space-y-4">
            {pendingProperties.length === 0 && <p className="p-8 text-center glass-card text-surface-500">No properties pending verification.</p>}
            {pendingProperties.map((property, i) => (
                <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="glass-card p-6 flex flex-col sm:flex-row gap-4 border-l-4 border-amber-500">
                    <img src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'} alt={property.title} className="w-full sm:w-40 h-28 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="font-display font-semibold text-surface-900 dark:text-white">{property.title}</h3>
                                <p className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-0.5">
                                    <FiAlertCircle className="text-[10px]" /> {property.area} (Listed by: {property.ownerEmail || 'Unknown'})
                                </p>
                            </div>
                            <span className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Pending Verification</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button onClick={() => handleVerify(property.id, 'Approved')} className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all flex-1 sm:flex-none flex items-center justify-center gap-2">
                                <FiCheckCircle /> Approve Document
                            </button>
                            <button onClick={() => handleVerify(property.id, 'Rejected')} className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25 transition-all flex-1 sm:flex-none flex items-center justify-center gap-2">
                                <FiXCircle /> Reject Document
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
