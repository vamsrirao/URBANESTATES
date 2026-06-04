import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMapPin, FiArrowUpRight } from 'react-icons/fi'
import { IoBedOutline } from 'react-icons/io5'
import { LuBath, LuRuler } from 'react-icons/lu'
import { HiOutlineShieldCheck } from 'react-icons/hi'

export default function AIPropertyCard({ property, index = 0 }) {
    // Handle both structured AI data and local property data
    const title = property.title || property.name || 'Property'
    const price = property.price || 'Contact for price'
    const image = property.image || property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    const location = property.location || `${property.area || ''}, ${property.city || 'Hyderabad'}`
    const beds = property.beds || property.bhk || '–'
    const baths = property.baths || '–'
    const sqft = property.sqft || property.area_sqft || null
    const tags = property.tags || []
    const id = property.id || null

    const formattedPrice = typeof price === 'number'
        ? (price >= 10000000
            ? `₹${(price / 10000000).toFixed(1)} Cr`
            : price >= 100000
                ? `₹${(price / 100000).toFixed(0)} L`
                : `₹${price.toLocaleString('en-IN')}`)
        : price

    const CardContent = () => (
        <>
            {/* Image */}
            <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-600/90 to-accent-500/90 backdrop-blur-sm text-white font-display font-bold text-lg shadow-lg">
                        {formattedPrice}
                    </span>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-1.5">
                        {tags.map((tag, i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-[10px] font-semibold text-white uppercase tracking-wider">
                                {tag === 'Verified' && <HiOutlineShieldCheck className="w-3 h-3" />}
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Arrow Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/20">
                    <FiArrowUpRight className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
                <h3 className="font-display font-semibold text-white text-base sm:text-lg mb-1.5 group-hover:text-primary-300 transition-colors line-clamp-1">
                    {title}
                </h3>
                <div className="flex items-center gap-1.5 text-surface-400 text-sm mb-4">
                    <FiMapPin className="w-3.5 h-3.5 flex-shrink-0 text-primary-400" />
                    <span className="truncate">{location}</span>
                </div>

                {/* Property Stats */}
                <div className="flex items-center gap-3 sm:gap-4 pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-sm text-surface-400">
                        <IoBedOutline className="w-4 h-4 text-primary-400" />
                        <span>{beds} Beds</span>
                    </div>
                    {baths !== '–' && (
                        <div className="flex items-center gap-1.5 text-sm text-surface-400">
                            <LuBath className="w-4 h-4 text-primary-400" />
                            <span>{baths} Baths</span>
                        </div>
                    )}
                    {sqft && (
                        <div className="flex items-center gap-1.5 text-sm text-surface-400">
                            <LuRuler className="w-4 h-4 text-primary-400" />
                            <span>{Number(sqft).toLocaleString()} sqft</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

    const cardClasses = "group relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.08] hover:border-primary-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary-500/10"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
        >
            {id ? (
                <Link to={`/properties/${id}`} className={`block ${cardClasses}`}>
                    <CardContent />
                </Link>
            ) : (
                <div className={cardClasses}>
                    <CardContent />
                </div>
            )}
        </motion.div>
    )
}
