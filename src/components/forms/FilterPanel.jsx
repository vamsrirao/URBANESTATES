import { areas, propertyTypes } from '../../data/properties'
import { formatPrice } from '../../hooks/formatPrice'

export default function FilterPanel({ filters, setFilters }) {
    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div className="glass-card p-6 space-y-6">
            <h3 className="font-display font-semibold text-surface-900 dark:text-white">Filters</h3>

            {/* Price Range */}
            <div>
                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-2">
                    Budget: <span className="text-primary-600 dark:text-primary-400 font-semibold">{formatPrice(filters.priceRange[0])} — {formatPrice(filters.priceRange[1])}</span>
                </label>
                <input
                    type="range"
                    min={0}
                    max={150000000}
                    step={500000}
                    value={filters.priceRange[1]}
                    onChange={e => handleChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary-600"
                />
            </div>

            {/* Property Type */}
            <div>
                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-2">Property Type</label>
                <select
                    value={filters.type}
                    onChange={e => handleChange('type', e.target.value)}
                    className="input-field text-sm"
                >
                    {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            {/* Area */}
            <div>
                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-2">Area</label>
                <select
                    value={filters.area}
                    onChange={e => handleChange('area', e.target.value)}
                    className="input-field text-sm"
                >
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </div>

            {/* Bedrooms */}
            <div>
                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-2">Bedrooms</label>
                <div className="flex gap-2">
                    {['Any', 1, 2, 3, 4, 5, '6+'].map(bed => (
                        <button
                            key={bed}
                            onClick={() => handleChange('beds', bed)}
                            className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all ${filters.beds === bed
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                                }`}
                        >
                            {bed}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bathrooms */}
            <div>
                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-2">Bathrooms</label>
                <div className="flex gap-2">
                    {['Any', 1, 2, 3, 4, '5+'].map(bath => (
                        <button
                            key={bath}
                            onClick={() => handleChange('baths', bath)}
                            className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all ${filters.baths === bath
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                                }`}
                        >
                            {bath}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reset */}
            <button
                onClick={() => setFilters({
                    priceRange: [0, 150000000],
                    type: 'All Types',
                    area: 'All Areas',
                    beds: 'Any',
                    baths: 'Any'
                })}
                className="btn-secondary w-full text-sm"
            >
                Reset Filters
            </button>
        </div>
    )
}
