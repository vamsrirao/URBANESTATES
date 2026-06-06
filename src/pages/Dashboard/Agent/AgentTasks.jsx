import { FiGrid } from 'react-icons/fi'

export default function AgentTasks() {
    return (
        <div className="w-full space-y-4 pb-8 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="heading-lg text-surface-900 dark:text-white"></h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Manage your .</p>
                </div>
            </div>
            
            <div className="glass-card p-12 text-center">
                <FiGrid className="text-4xl text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-surface-900 dark:text-white mb-2"> Module</h3>
                <p className="text-sm text-surface-500">Full functionality for  goes here.</p>
            </div>
        </div>
    )
}
