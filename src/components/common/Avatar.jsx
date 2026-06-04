import { useState } from 'react'
import { FiUser } from 'react-icons/fi'

/**
 * Avatar - Reusable circular image component with intelligent fallbacks
 * @param {string} src - Image URL
 * @param {string} alt - Alt text (used for initials if image fails)
 * @param {string} className - Additional CSS classes (size, border, etc.)
 */
export default function Avatar({ src, alt, className = "w-16 h-16", fallbackIconSize = "text-2xl" }) {
    const [error, setError] = useState(!src)

    // Extract initials from name, stripping prefixes like "Adv."
    const getInitials = (name) => {
        if (!name) return ""
        const parts = name.replace(/^(Adv\.|Dr\.|Mr\.|Ms\.)\s*/i, '').split(' ').filter(Boolean)
        if (parts.length === 0) return ""
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
    }

    if (error) {
        return (
            <div className={`rounded-full bg-surface-200 dark:bg-surface-800 flex items-center justify-center text-surface-500 dark:text-surface-400 border border-surface-300 dark:border-surface-700 ${className}`}>
                {alt ? (
                    <span className="font-bold tracking-wider uppercase">{getInitials(alt)}</span>
                ) : (
                    <FiUser className={fallbackIconSize} />
                )}
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={alt || "Avatar"}
            onError={() => setError(true)}
            className={`rounded-full object-cover object-center ${className}`}
        />
    )
}
