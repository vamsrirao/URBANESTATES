import { motion } from 'framer-motion'
import { HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineInformationCircle, HiOutlineLightBulb } from 'react-icons/hi'
import { FiExternalLink } from 'react-icons/fi'

const STEP_ICONS = [
    HiOutlineCheckCircle,
    HiOutlineLightBulb,
    HiOutlineInformationCircle,
    HiOutlineCheckCircle,
    HiOutlineLightBulb,
]

export default function AIInfoResponse({ data, index = 0 }) {
    // Handle both { title, points: [...] } and plain text
    const title = data?.title || 'AI Response'
    const points = data?.points || data?.steps || data?.items || []
    const content = data?.content || data?.text || ''

    // If it's plain text with no structured points
    if (!points.length && content) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card-premium p-6"
            >
                <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                        <HiOutlineSparkles className="w-4 h-4 text-primary-400" />
                    </div>
                    <div>
                        <h3 className="font-display font-semibold text-white text-lg">{title}</h3>
                    </div>
                </div>
                <div className="text-surface-300 text-sm leading-relaxed whitespace-pre-wrap pl-11">
                    {content}
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card-premium p-6"
        >
            {/* Title */}
            <div className="flex items-start gap-3 mb-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                    <HiOutlineSparkles className="w-4 h-4 text-primary-400" />
                </div>
                <div>
                    <h3 className="font-display font-semibold text-white text-lg">{title}</h3>
                </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3 pl-2">
                {points.map((point, i) => {
                    const Icon = STEP_ICONS[i % STEP_ICONS.length]
                    const text = typeof point === 'string' ? point : point.text || point.description || ''
                    const link = typeof point === 'object' ? point.link : null

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                            className="flex items-start gap-3 group"
                        >
                            <div className="flex-shrink-0 w-6 h-6 rounded-md bg-primary-500/10 flex items-center justify-center mt-0.5 group-hover:bg-primary-500/20 transition-colors">
                                <Icon className="w-3.5 h-3.5 text-primary-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-surface-300 text-sm leading-relaxed">{text}</p>
                                {link && (
                                    <a
                                        href={link}
                                        className="inline-flex items-center gap-1 mt-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                                    >
                                        Learn more <FiExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
