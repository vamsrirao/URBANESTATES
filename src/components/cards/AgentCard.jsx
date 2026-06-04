import { FiPhone, FiMail, FiStar } from 'react-icons/fi'

export default function AgentCard({ agent }) {
    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-primary-100 dark:ring-primary-900"
                />
                <div>
                    <h4 className="font-display font-semibold text-surface-900 dark:text-white">{agent.name}</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Listing Agent</p>
                    <div className="flex items-center gap-1 mt-1">
                        <FiStar className="text-accent-500 fill-current text-xs" />
                        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{agent.rating}</span>
                        <span className="text-xs text-surface-400">• {agent.deals} deals</span>
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                        <FiPhone className="text-primary-600 dark:text-primary-400" />
                    </div>
                    {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-sm text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                        <FiMail className="text-primary-600 dark:text-primary-400" />
                    </div>
                    {agent.email}
                </a>
            </div>
            <button className="btn-primary w-full mt-5 text-sm">
                Schedule a Visit
            </button>
        </div>
    )
}
