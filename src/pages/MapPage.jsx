import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StaticMap from '../components/maps/StaticMap'
import properties from '../data/properties'
import { IoBedOutline } from 'react-icons/io5'
import { LuBath, LuRuler } from 'react-icons/lu'
import { FiMapPin } from 'react-icons/fi'
import { formatPrice } from '../hooks/formatPrice'

export default function MapPage() {
    const [hoveredId, setHoveredId] = useState(null)
    const [selectedArea, setSelectedArea] = useState('All')

    const allAreas = ['All', ...new Set(properties.map(p => p.area))]
    const filtered = selectedArea === 'All' ? properties : properties.filter(p => p.area === selectedArea)

    return (
        <div className="pt-24 pb-0 h-screen flex flex-col">
            {/* Header */}
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4 flex-shrink-0">
                <h1 className="text-xl font-display font-bold text-surface-900 dark:text-white">Map View — Hyderabad</h1>
                <div className="flex gap-2 ml-auto overflow-x-auto">
                    {allAreas.map(area => (
                        <button
                            key={area}
                            onClick={() => setSelectedArea(area)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedArea === area
                                    ? 'bg-primary-600 text-white'
                                    : 'glass text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                                }`}
                        >
                            {area}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-96 flex-shrink-0 overflow-y-auto border-r border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
                    <div className="p-4 space-y-3">
                        <p className="text-sm text-surface-500 dark:text-surface-400 mb-2">{filtered.length} properties</p>
                        {filtered.map(property => (
                            <motion.div
                                key={property.id}
                                onMouseEnter={() => setHoveredId(property.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`rounded-xl overflow-hidden transition-all cursor-pointer ${hoveredId === property.id
                                        ? 'ring-2 ring-primary-500 shadow-lg'
                                        : 'glass-card'
                                    }`}
                            >
                                <Link to={`/properties/${property.id}`} className="flex">
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-28 h-28 object-cover flex-shrink-0"
                                    />
                                    <div className="p-3 flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm text-surface-900 dark:text-white truncate">{property.title}</h3>
                                        <p className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-0.5">
                                            <FiMapPin className="text-[10px]" /> {property.area}
                                        </p>
                                        <p className="text-lg font-display font-bold text-primary-600 dark:text-primary-400 mt-1">
                                            {formatPrice(property.price)}
                                        </p>
                                        <div className="flex gap-3 text-xs text-surface-400 mt-1">
                                            <span className="flex items-center gap-1"><IoBedOutline />{property.beds}</span>
                                            <span className="flex items-center gap-1"><LuBath />{property.baths}</span>
                                            <span className="flex items-center gap-1"><LuRuler />{property.sqft}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Map — centered on Hyderabad */}
                <div className="flex-1">
                    <StaticMap properties={filtered} center={[17.4400, 78.3900]} zoom={11} className="h-full" />
                </div>
            </div>
        </div>
    )
}
