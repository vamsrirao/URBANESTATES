import { FiStar } from 'react-icons/fi'

/**
 * StarRating — Reusable star rating display component.
 * Supports full and half stars. Configurable size.
 */
export default function StarRating({ rating = 0, maxStars = 5, size = 'text-sm', showValue = true, className = '' }) {
    const stars = []
    for (let i = 1; i <= maxStars; i++) {
        if (i <= Math.floor(rating)) {
            // Full star
            stars.push(
                <FiStar
                    key={i}
                    className={`${size} text-amber-400 fill-amber-400 flex-shrink-0`}
                />
            )
        } else if (i - rating < 1 && i - rating > 0) {
            // Half star — approximate with a styled full star at reduced opacity
            stars.push(
                <span key={i} className="relative flex-shrink-0">
                    <FiStar className={`${size} text-surface-300 dark:text-surface-600`} />
                    <span className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                        <FiStar className={`${size} text-amber-400 fill-amber-400`} />
                    </span>
                </span>
            )
        } else {
            // Empty star
            stars.push(
                <FiStar
                    key={i}
                    className={`${size} text-surface-300 dark:text-surface-600 flex-shrink-0`}
                />
            )
        }
    }

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <div className="flex items-center gap-0.5">{stars}</div>
            {showValue && (
                <span className="text-xs font-medium text-surface-500 dark:text-surface-400 ml-1">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    )
}
