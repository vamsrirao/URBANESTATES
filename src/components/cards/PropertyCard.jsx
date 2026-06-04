import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiMaximize2, FiMapPin } from 'react-icons/fi'
import { IoBedOutline } from 'react-icons/io5'
import { LuBath, LuRuler } from 'react-icons/lu'
import { formatPrice } from '../../hooks/formatPrice'
import VerificationBadge from '../common/VerificationBadge'

export default function PropertyCard({ property, onQuickView, index = 0 }) {
    const [liked, setLiked] = useState(false)
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group glass-card-hover overflow-hidden"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                {!imgLoaded && (
                    <div className="absolute inset-0 bg-surface-200 dark:bg-surface-700 animate-pulse" />
                )}
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImgLoaded(true)}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="badge bg-primary-600 text-white shadow-lg">{property.status}</span>
                    {property.featured && (
                        <span className="badge bg-accent-500 text-white shadow-lg">Featured</span>
                    )}
                    <VerificationBadge propertyId={property.id} compact={true} />
                </div>

                {/* Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <button
                        onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-lg ${liked
                                ? 'bg-red-500 text-white'
                                : 'bg-white/90 dark:bg-surface-800/90 text-surface-600 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700'
                            }`}
                    >
                        <FiHeart className={`text-sm ${liked ? 'fill-current' : ''}`} />
                    </button>
                    {onQuickView && (
                        <button
                            onClick={(e) => { e.preventDefault(); onQuickView(property) }}
                            className="w-9 h-9 rounded-xl bg-white/90 dark:bg-surface-800/90 flex items-center justify-center text-surface-600 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700 transition-all shadow-lg"
                        >
                            <FiMaximize2 className="text-sm" />
                        </button>
                    )}
                </div>

                {/* Price */}
                <div className="absolute bottom-3 left-3">
                    <span className="text-2xl font-display font-bold text-white drop-shadow-lg">
                        {formatPrice(property.price)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <Link to={`/properties/${property.id}`} className="block p-5">
                <h3 className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {property.title}
                </h3>
                <div className="flex items-center gap-1 text-surface-500 dark:text-surface-400 text-sm mb-4">
                    <FiMapPin className="text-xs flex-shrink-0" />
                    <span className="truncate">{property.area}, {property.city}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400 pt-4 border-t border-surface-100 dark:border-surface-700/50">
                    <div className="flex items-center gap-1.5">
                        <IoBedOutline className="text-primary-500" />
                        <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <LuBath className="text-primary-500" />
                        <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <LuRuler className="text-primary-500" />
                        <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
