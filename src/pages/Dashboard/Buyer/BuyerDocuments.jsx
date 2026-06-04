import { FiFolder, FiUploadCloud, FiFileText } from 'react-icons/fi'

export default function BuyerDocuments() {
    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-2">My Documents</h1>
                    <p className="text-surface-600 dark:text-surface-400">Manage your pre-approvals, offers, and legal paperwork.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shrink-0 shadow-lg shadow-primary-500/20">
                    <FiUploadCloud size={18} />
                    Upload Document
                </button>
            </div>

            {/* Empty State */}
            <div className="bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-3xl p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-primary-50 dark:bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                    <FiFolder className="text-primary-500 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">No documents yet</h3>
                <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto mb-8">
                    Securely store and share your important real estate documents here. Upload IDs, financial proofs, or pre-approval letters to get started.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex items-center justify-center gap-2 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 hover:border-primary-500 dark:hover:border-primary-500 text-surface-700 dark:text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                        <FiFileText size={18} />
                        View Templates
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/20">
                        <FiUploadCloud size={18} />
                        Upload Now
                    </button>
                </div>
            </div>
        </div>
    )
}
