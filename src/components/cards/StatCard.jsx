import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function StatCard({ stat, index = 0 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return
        let start = 0
        const end = stat.value
        const duration = 2000
        const increment = end / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [isInView, stat.value])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
        >
            <div className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-2">
                {count.toLocaleString()}{stat.suffix}
            </div>
            <p className="text-surface-500 dark:text-surface-400 font-medium">{stat.label}</p>
        </motion.div>
    )
}
