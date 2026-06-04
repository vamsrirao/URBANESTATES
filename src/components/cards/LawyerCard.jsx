import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBriefcase, FiClock, FiMessageSquare } from 'react-icons/fi'
import StarRating from '../common/StarRating'
import CardImage from '../common/CardImage'

/**
 * LawyerCard — Premium glass card for lawyer listings.
 * Shows photo, name, specialization, rating, experience, and action buttons.
 */
export default function LawyerCard({ lawyer, index = 0, onBook }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group glass-card-hover overflow-hidden flex flex-col h-full"
        >
            {/* Header with CardImage */}
            <CardImage src={lawyer.image} alt={lawyer.name} heightClass="h-52">
                {/* Specialization badge */}
                <div className="absolute top-3 left-3">
                    <span className="badge bg-indigo-600 text-white shadow-lg">
                        {lawyer.specialization}
                    </span>
                </div>

                {/* Experience badge */}
                <div className="absolute top-3 right-3">
                    <span className="badge bg-white/90 dark:bg-surface-800/90 text-surface-700 dark:text-surface-200 shadow-lg backdrop-blur-sm">
                        <FiClock className="mr-1 text-[10px]" />
                        {lawyer.experience} yrs
                    </span>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h3 className="text-lg font-display font-bold text-white drop-shadow-lg leading-tight">
                        {lawyer.name}
                    </h3>
                </div>
            </CardImage>

            {/* Content Body - flex-1 ensures it grows to fill height, tracking with grid rows */}
            <div className="p-5 flex-1 flex flex-col">
                {/* Rating */}
                <div className="flex items-center justify-between mb-3">
                    <StarRating rating={lawyer.rating} />
                    <span className="text-xs text-surface-400 dark:text-surface-500 font-medium">
                        {lawyer.reviewCount} reviews
                    </span>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {lawyer.languages.slice(0, 3).map(lang => (
                        <span
                            key={lang}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-surface-100 dark:bg-surface-800/80 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700/50"
                        >
                            {lang}
                        </span>
                    ))}
                </div>

                {/* Bio excerpt */}
                <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mb-5 leading-relaxed">
                    {lawyer.bio}
                </p>

                {/* Actions - mt-auto forces buttons to perfectly align at the bottom of the card */}
                <div className="mt-auto flex gap-2 pt-4 border-t border-surface-200 dark:border-surface-700/50">
                    <Link
                        to={`/lawyers/${lawyer.id}`}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center glass text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700 hover:shadow-sm transition-all duration-300"
                    >
                        <FiBriefcase className="inline mr-1.5 text-xs opacity-70" />
                        Profile
                    </Link>
                    <button
                        onClick={() => onBook?.(lawyer)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300"
                    >
                        <FiMessageSquare className="inline mr-1.5 text-xs opacity-90" />
                        Book Now
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
