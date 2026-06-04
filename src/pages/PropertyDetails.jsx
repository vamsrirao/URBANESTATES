import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiHeart, FiShare2, FiCalendar, FiArrowLeft } from 'react-icons/fi'
import { IoBedOutline } from 'react-icons/io5'
import { LuBath, LuRuler } from 'react-icons/lu'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import AgentCard from '../components/cards/AgentCard'
import PropertyCard from '../components/cards/PropertyCard'
import StaticMap from '../components/maps/StaticMap'
import VerificationBadge from '../components/common/VerificationBadge'
import VisitScheduler from '../components/common/VisitScheduler'
import properties from '../data/properties'
import { formatPrice, formatPriceFull } from '../hooks/formatPrice'

export default function PropertyDetails() {
    const { id } = useParams()
    const property = properties.find(p => p.id === parseInt(id))
    const [currentImg, setCurrentImg] = useState(0)
    const [liked, setLiked] = useState(false)
    const [showSchedule, setShowSchedule] = useState(false)

    if (!property) {
        return (
            <div className="pt-32 pb-16 text-center">
                <h2 className="heading-lg text-surface-900 dark:text-white mb-4">Property Not Found</h2>
                <Link to="/properties" className="btn-primary">Browse Properties</Link>
            </div>
        )
    }

    const similarProperties = properties
        .filter(p => p.id !== property.id && (p.area === property.area || p.type === property.type))
        .slice(0, 4)

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back */}
                <Link to="/properties" className="inline-flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors">
                    <FiArrowLeft /> Back to Properties
                </Link>

                {/* Image Gallery */}
                <div className="relative rounded-2xl overflow-hidden mb-8 h-[500px]">
                    <motion.img
                        key={currentImg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        src={property.images[currentImg]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Image Navigation */}
                    <button
                        onClick={() => setCurrentImg(prev => (prev - 1 + property.images.length) % property.images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/80 dark:bg-surface-800/80 flex items-center justify-center text-surface-700 dark:text-surface-200 hover:bg-white dark:hover:bg-surface-700 transition-colors shadow-lg"
                    >
                        <FiChevronLeft className="text-xl" />
                    </button>
                    <button
                        onClick={() => setCurrentImg(prev => (prev + 1) % property.images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/80 dark:bg-surface-800/80 flex items-center justify-center text-surface-700 dark:text-surface-200 hover:bg-white dark:hover:bg-surface-700 transition-colors shadow-lg"
                    >
                        <FiChevronRight className="text-xl" />
                    </button>

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={() => setLiked(!liked)}
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white/80 dark:bg-surface-800/80 text-surface-700 dark:text-surface-200'
                                }`}
                        >
                            <FiHeart className={liked ? 'fill-current' : ''} />
                        </button>
                        <button className="w-11 h-11 rounded-xl bg-white/80 dark:bg-surface-800/80 flex items-center justify-center text-surface-700 dark:text-surface-200 shadow-lg">
                            <FiShare2 />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {property.images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentImg(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentImg ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
                    {property.images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentImg(i)}
                            className={`w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all ${i === currentImg ? 'ring-2 ring-primary-500 opacity-100' : 'opacity-60 hover:opacity-80'
                                }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title & Price */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="badge-primary">{property.type}</span>
                                <span className="badge-accent">{property.status}</span>
                            </div>
                            <h1 className="heading-lg text-surface-900 dark:text-white mb-2">{property.title}</h1>
                            <p className="text-surface-500 dark:text-surface-400 mb-4">{property.address}</p>
                            <div className="text-3xl font-display font-bold text-primary-600 dark:text-primary-400">
                                {formatPriceFull(property.price)}
                            </div>
                            <VerificationBadge propertyId={property.id} className="mt-3" />
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { icon: IoBedOutline, label: 'Bedrooms', value: property.beds },
                                { icon: LuBath, label: 'Bathrooms', value: property.baths },
                                { icon: LuRuler, label: 'Square Feet', value: property.sqft.toLocaleString() },
                                { icon: MdOutlineCalendarMonth, label: 'Year Built', value: property.yearBuilt },
                            ].map((stat, i) => (
                                <div key={i} className="glass-card p-4 text-center">
                                    <stat.icon className="text-2xl text-primary-500 mx-auto mb-2" />
                                    <div className="text-lg font-bold text-surface-900 dark:text-white">{stat.value}</div>
                                    <div className="text-xs text-surface-500 dark:text-surface-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="glass-card p-6">
                            <h3 className="font-display font-semibold text-surface-900 dark:text-white mb-4">Description</h3>
                            <p className="text-surface-600 dark:text-surface-300 leading-relaxed">{property.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="glass-card p-6">
                            <h3 className="font-display font-semibold text-surface-900 dark:text-white mb-4">Amenities</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {property.amenities.map((amenity, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-300">
                                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                                        {amenity}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="glass-card p-6">
                            <h3 className="font-display font-semibold text-surface-900 dark:text-white mb-4">Location</h3>
                            <StaticMap
                                properties={[property]}
                                singleProperty
                                className="h-[300px] rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Agent */}
                        <AgentCard agent={property.agent} />

                        {/* Schedule Visit */}
                        <VisitScheduler propertyId={property.id} />
                    </div>
                </div>

                {/* Similar Properties */}
                {similarProperties.length > 0 && (
                    <div className="mt-16">
                        <h2 className="heading-md text-surface-900 dark:text-white mb-8">Similar Properties</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarProperties.map((p, i) => (
                                <PropertyCard key={p.id} property={p} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
