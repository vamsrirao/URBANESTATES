import { FiStar } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'

export default function TestimonialCard({ testimonial }) {
    return (
        <div className="glass-card p-8 flex flex-col h-full">
            <FaQuoteLeft className="text-2xl text-primary-300 dark:text-primary-600 mb-4" />
            <p className="text-surface-600 dark:text-surface-300 leading-relaxed flex-1 mb-6">
                "{testimonial.text}"
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-surface-100 dark:border-surface-700">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900"
                />
                <div>
                    <h4 className="font-semibold text-surface-900 dark:text-white text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{testimonial.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <FiStar key={i} className="text-accent-500 fill-current text-xs" />
                    ))}
                </div>
            </div>
        </div>
    )
}
