import { FiBookmark, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function BuyerSavedSearches() {
    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-2">Saved Searches</h1>
                <p className="text-surface-600 dark:text-surface-400">Never miss a new property that matches your criteria.</p>
            </div>

            {/* Empty State */}
            <div className="bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-3xl p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-primary-50 dark:bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                    <FiBookmark className="text-primary-500 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">No saved searches</h3>
                <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto mb-8">
                    Save your property searches to get notified when new homes that match your criteria hit the market.
                </p>
                <Link to="/properties" className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/20">
                    <FiSearch size={18} />
                    Start Searching
                </Link>
            </div>
        </div>
    )
}
