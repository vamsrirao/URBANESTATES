import { motion } from 'framer-motion'
import EmptyState from './EmptyState'

export default function ActivityFeed({ items, renderItem, emptyIcon, emptyTitle, emptyMessage }) {
    if (!items || items.length === 0) {
        return (
            <EmptyState 
                icon={emptyIcon} 
                title={emptyTitle} 
                message={emptyMessage} 
            />
        )
    }

    return (
        <div className="space-y-4">
            {items.map((item, i) => (
                <motion.div
                    key={item.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                    {renderItem(item)}
                </motion.div>
            ))}
        </div>
    )
}
