import { motion } from 'framer-motion'
import { Link, useOutletContext } from 'react-router-dom'
import { FiHome, FiTrash2, FiMapPin, FiPlus } from 'react-icons/fi'
import { formatPrice } from '../../../hooks/formatPrice'

export default function SellerProperties() {
    const { myProperties, deleteProperty } = useOutletContext()

    return (
        <div className="max-w-7xl mx-auto">
            {/* Properties Section Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="heading-md text-surface-900 dark:text-white flex items-center gap-2">
                    <FiHome className="text-emerald-500" /> My Properties
                </h2>
                <Link to="/dashboard/seller/add-property" className="btn-primary text-sm flex items-center gap-2">
                    <FiPlus /> Add New Property
                </Link>
            </div>

            {/* My Properties */}
            {myProperties.length === 0 ? (
                <div className="glass-card p-12 text-center mb-12">
                    <p className="text-surface-500 dark:text-surface-400">You haven't listed any properties yet.</p>
                    <Link to="/dashboard/seller/add-property" className="btn-primary mt-4 inline-block text-sm">List a Property</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {myProperties.map((property, i) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card overflow-hidden group relative"
                        >
                            <div className="absolute top-2 left-2 z-10">
                                <span className={`badge ${property.status === 'Approved' ? 'bg-emerald-500' : property.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'} text-white shadow-lg`}>
                                    {property.status || 'Pending'}
                                </span>
                            </div>
                            <div className="relative h-48">
                                <img src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'} alt={property.title} className="w-full h-full object-cover" />
                                <button
                                    onClick={(e) => { e.preventDefault(); deleteProperty(property.id); }}
                                    className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                    <FiTrash2 className="text-sm" />
                                </button>
                            </div>
                            <Link to={`/properties/${property.id}`} className="block p-4">
                                <h3 className="font-semibold text-surface-900 dark:text-white text-sm truncate">{property.title}</h3>
                                <p className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-1"><FiMapPin className="text-[10px]" />{property.area}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="font-display font-bold text-emerald-600 dark:text-emerald-400">{formatPrice(property.price)}</span>
                                    <span className="text-xs text-surface-400">{property.beds}bd • {property.baths}ba</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
