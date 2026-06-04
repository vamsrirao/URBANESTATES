import { useState } from 'react'
import { FiImage } from 'react-icons/fi'

/**
 * CardImage - Reusable image container for grid cards
 * @param {string} src - Image source 
 * @param {string} alt - Alt text
 * @param {string} heightClass - Tailwind height class (e.g., h-48, h-52)
 * @param {ReactNode} children - Elements to absolutely position over the image (badges, titles)
 */
export default function CardImage({ src, alt, heightClass = "h-48", children }) {
    const [error, setError] = useState(!src)

    return (
        <div className={`relative w-full ${heightClass} overflow-hidden bg-surface-200 dark:bg-surface-800 flex items-center justify-center`}>
            {error ? (
                <div className="flex flex-col items-center justify-center text-surface-400 dark:text-surface-500">
                    <FiImage className="text-3xl mb-2 opacity-50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Image Unavailable</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt || "Card Image"}
                    onError={() => setError(true)}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
            )}
            
            {/* Dark gradient overlay for text readability overlaid on the bottom */}
            {children && (
                <>
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    {children}
                </>
            )}
        </div>
    )
}
