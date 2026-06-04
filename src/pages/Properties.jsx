import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiGrid, FiList, FiSliders } from 'react-icons/fi'
import PropertyCard from '../components/cards/PropertyCard'
import FilterPanel from '../components/forms/FilterPanel'
import Modal from '../components/common/Modal'
import properties from '../data/properties'
import { IoBedOutline } from 'react-icons/io5'
import { LuBath, LuRuler } from 'react-icons/lu'
import { FiMapPin } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { formatPrice } from '../hooks/formatPrice'

export default function Properties() {
    const [view, setView] = useState('grid')
    const [sortBy, setSortBy] = useState('default')
    const [showFilters, setShowFilters] = useState(true)
    const [quickViewProperty, setQuickViewProperty] = useState(null)
    const [filters, setFilters] = useState({
        priceRange: [0, 150000000],
        type: 'All Types',
        area: 'All Areas',
        beds: 'Any',
        baths: 'Any'
    })

    const filteredProperties = useMemo(() => {
        let result = properties.filter(p => {
            if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false
            if (filters.type !== 'All Types' && p.type !== filters.type) return false
            if (filters.area !== 'All Areas' && p.area !== filters.area) return false
            if (filters.beds !== 'Any') {
                const bedNum = typeof filters.beds === 'string' && filters.beds.includes('+')
                    ? parseInt(filters.beds)
                    : parseInt(filters.beds)
                if (filters.beds.toString().includes('+')) {
                    if (p.beds < bedNum) return false
                } else {
                    if (p.beds < bedNum) return false
                }
            }
            if (filters.baths !== 'Any') {
                const bathNum = typeof filters.baths === 'string' && filters.baths.includes('+')
                    ? parseInt(filters.baths)
                    : parseInt(filters.baths)
                if (filters.baths.toString().includes('+')) {
                    if (p.baths < bathNum) return false
                } else {
                    if (p.baths < bathNum) return false
                }
            }
            return true
        })

        switch (sortBy) {
            case 'price-asc': result.sort((a, b) => a.price - b.price); break
            case 'price-desc': result.sort((a, b) => b.price - a.price); break
            case 'newest': result.sort((a, b) => b.yearBuilt - a.yearBuilt); break
            case 'sqft': result.sort((a, b) => b.sqft - a.sqft); break
            default: break
        }

        return result
    }, [filters, sortBy])

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="heading-lg text-surface-900 dark:text-white mb-2">
                        Explore Properties
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400">
                        {filteredProperties.length} properties found in Hyderabad & Telangana
                    </p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${showFilters
                                ? 'bg-primary-600 text-white'
                                : 'glass text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                            }`}
                    >
                        <FiSliders /> Filters
                    </button>

                    <div className="flex items-center glass rounded-xl overflow-hidden">
                        <button
                            onClick={() => setView('grid')}
                            className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-primary-600 text-white' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-200'}`}
                        >
                            <FiGrid />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`p-2.5 transition-colors ${view === 'list' ? 'bg-primary-600 text-white' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-200'}`}
                        >
                            <FiList />
                        </button>
                    </div>

                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="ml-auto input-field !w-auto text-sm"
                    >
                        <option value="default">Default Sort</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                        <option value="sqft">Largest First</option>
                    </select>
                </div>

                {/* Content */}
                <div className="flex gap-8">
                    {/* Sidebar */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden lg:block w-80 flex-shrink-0"
                        >
                            <FilterPanel filters={filters} setFilters={setFilters} />
                        </motion.div>
                    )}

                    {/* Property Grid/List */}
                    <div className="flex-1">
                        {filteredProperties.length === 0 ? (
                            <div className="glass-card p-16 text-center">
                                <div className="text-5xl mb-4">🏠</div>
                                <h3 className="heading-md text-surface-900 dark:text-white mb-2">No Properties Found</h3>
                                <p className="text-surface-500 dark:text-surface-400">Try adjusting your filters to see more results.</p>
                            </div>
                        ) : view === 'grid' ? (
                            <div className={`grid gap-6 ${showFilters ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                                {filteredProperties.map((property, index) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                        index={index}
                                        onQuickView={setQuickViewProperty}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredProperties.map((property, index) => (
                                    <motion.div
                                        key={property.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link to={`/properties/${property.id}`} className="glass-card-hover flex flex-col sm:flex-row overflow-hidden">
                                            <div className="sm:w-72 h-48 sm:h-auto flex-shrink-0">
                                                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-6 flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-white">{property.title}</h3>
                                                        <p className="text-sm text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-1">
                                                            <FiMapPin className="text-xs" /> {property.area}, {property.city}
                                                        </p>
                                                    </div>
                                                    <span className="text-xl font-display font-bold text-primary-600 dark:text-primary-400">
                                                        {formatPrice(property.price)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-surface-500 dark:text-surface-400 mb-4 line-clamp-2">{property.description}</p>
                                                <div className="flex items-center gap-5 text-sm text-surface-500 dark:text-surface-400">
                                                    <span className="flex items-center gap-1.5"><IoBedOutline className="text-primary-500" />{property.beds} Beds</span>
                                                    <span className="flex items-center gap-1.5"><LuBath className="text-primary-500" />{property.baths} Baths</span>
                                                    <span className="flex items-center gap-1.5"><LuRuler className="text-primary-500" />{property.sqft.toLocaleString()} sqft</span>
                                                    <span className="badge-primary ml-auto">{property.type}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            <Modal
                isOpen={!!quickViewProperty}
                onClose={() => setQuickViewProperty(null)}
                title="Quick View"
                maxWidth="max-w-3xl"
            >
                {quickViewProperty && (
                    <div>
                        <img
                            src={quickViewProperty.images[0]}
                            alt={quickViewProperty.title}
                            className="w-full h-64 object-cover rounded-xl mb-5"
                        />
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-display font-semibold text-surface-900 dark:text-white">{quickViewProperty.title}</h3>
                                <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">{quickViewProperty.area}, {quickViewProperty.city}</p>
                            </div>
                            <span className="text-2xl font-display font-bold text-primary-600 dark:text-primary-400">
                                {formatPrice(quickViewProperty.price)}
                            </span>
                        </div>
                        <p className="text-surface-600 dark:text-surface-300 mb-5 leading-relaxed">{quickViewProperty.description}</p>
                        <div className="flex items-center gap-6 text-sm text-surface-500 dark:text-surface-400 mb-5">
                            <span className="flex items-center gap-1.5"><IoBedOutline className="text-primary-500" />{quickViewProperty.beds} Beds</span>
                            <span className="flex items-center gap-1.5"><LuBath className="text-primary-500" />{quickViewProperty.baths} Baths</span>
                            <span className="flex items-center gap-1.5"><LuRuler className="text-primary-500" />{quickViewProperty.sqft.toLocaleString()} sqft</span>
                        </div>
                        <Link
                            to={`/properties/${quickViewProperty.id}`}
                            className="btn-primary inline-flex items-center gap-2"
                            onClick={() => setQuickViewProperty(null)}
                        >
                            View Full Details
                        </Link>
                    </div>
                )}
            </Modal>
        </div>
    )
}
