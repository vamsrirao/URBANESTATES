import { FiMessageSquare } from 'react-icons/fi'

const recentInquiries = [
    { id: 1, initials: 'AR', name: 'Aarav Reddy', detail: 'Interested in 3BHK in Kondapur', time: '10:30 AM', status: 'New', statusColor: '#6D5DFC', statusBg: 'rgba(109, 93, 252, 0.2)' },
    { id: 2, initials: 'PS', name: 'Priya Sharma', detail: 'Looking for 4BHK in Gachibowli', time: '09:15 AM', status: 'Contacted', statusColor: '#3b82f6', statusBg: 'rgba(59, 130, 246, 0.2)' },
    { id: 3, initials: 'VK', name: 'Vikram Kumar', detail: 'Budget: ₹2Cr - ₹3Cr', time: 'Yesterday', status: 'New', statusColor: '#6D5DFC', statusBg: 'rgba(109, 93, 252, 0.2)' },
    { id: 4, initials: 'SR', name: 'Sneha Reddy', detail: 'Investment property inquiry', time: 'Yesterday', status: 'Qualified', statusColor: '#10b981', statusBg: 'rgba(16, 185, 129, 0.2)' },
]

export default function AgentInquiries() {
    return (
        <div className="w-full space-y-4 pb-8 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="heading-lg text-surface-900 dark:text-white flex items-center gap-2"><FiMessageSquare className="text-primary-500" /> Inquiries</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Manage client inquiries and follow-ups.</p>
                </div>
            </div>

            <div className="bg-[#0F172A] rounded-2xl border border-surface-700/30 flex flex-col min-h-[400px]">
                <div className="p-4 flex justify-between items-center border-b border-surface-700/30 shrink-0">
                    <h3 className="text-white font-semibold text-sm">Recent Inquiries</h3>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                    {recentInquiries.map(inq => (
                        <div key={inq.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/20 border border-surface-700/30 hover:bg-surface-800/50 cursor-pointer transition-colors">
                            <div className="w-12 h-12 rounded-full bg-surface-800 flex items-center justify-center text-surface-300 text-sm font-medium shrink-0">
                                {inq.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-base font-medium text-white truncate leading-tight">{inq.name}</h4>
                                <p className="text-xs text-surface-400 truncate mt-1">{inq.detail}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <span className="text-xs text-surface-500">{inq.time}</span>
                                <span className="px-3 py-1 rounded text-[10px] font-medium" style={{ backgroundColor: inq.statusBg, color: inq.statusColor }}>
                                    {inq.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
