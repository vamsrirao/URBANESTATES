import { Link } from 'react-router-dom'
import { FiHeart, FiMapPin } from 'react-icons/fi'
import { formatPrice } from '../../hooks/formatPrice'

export default function PropertyCard({ property, onToggleFavorite, isFavorite }) {
    if (!property) return null

    // Determine badge type based on price or status (simulated for UI)
    const isPremium = property.price > 20000000
    const badgeText = isPremium ? 'Premium' : 'New'
    const badgeColor = isPremium ? 'bg-yellow-500/90 text-yellow-950' : 'bg-teal-500/90 text-teal-950'

    return (
        <Link to={`/properties/${property.id}`} className="bg-white dark:bg-[#131722] border border-surface-200 dark:border-[#1D2231] rounded-2xl overflow-hidden block group h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-48 shrink-0 overflow-hidden bg-surface-100 dark:bg-surface-800 p-2">
                <img 
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'} 
                    alt={property.title} 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                />
                <div className={`absolute top-4 left-4 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${badgeColor}`}>
                    {badgeText}
                </div>
                {onToggleFavorite && (
                    <button 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation();
                            onToggleFavorite(property.id);
                        }}
                        className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isFavorite 
                                ? 'bg-white text-pink-500 shadow-lg' 
                                : 'bg-surface-900/60 backdrop-blur-md text-white hover:bg-white hover:text-pink-500'
                        }`}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <FiHeart className={isFavorite ? 'fill-current' : ''} size={14} />
                    </button>
                )}
            </div>
            <div className="p-5 flex flex-col flex-1">
                <span className="font-display font-bold text-surface-900 dark:text-white text-xl mb-1 block">
                    {formatPrice(property.price)}
                </span>
                <h3 className="font-semibold text-surface-900 dark:text-white line-clamp-1 text-sm" title={property.title}>
                    {property.title}
                </h3>
                <p className="text-xs text-surface-500 flex items-center mt-1 mb-4 line-clamp-1">
                    {property.area}
                </p>
                <div className="mt-auto pt-4 border-t border-surface-200 dark:border-[#1D2231] flex items-center gap-4 text-xs font-medium text-surface-600 dark:text-surface-400">
                    <span className="flex items-center gap-1">🛏️ {property.beds}</span>
                    <span className="flex items-center gap-1">🚿 {property.baths}</span>
                    <span className="flex items-center gap-1">📐 {property.sqft} sqft</span>
                </div>
            </div>
        </Link>
    )
}
