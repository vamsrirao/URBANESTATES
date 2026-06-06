import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX, FiTarget } from 'react-icons/fi'

const initialVisitRequests = [
    { id: 1, name: 'Rohan Mehta', detail: 'Requested visit for Luxury Villa', time: 'Tomorrow, 11:00 AM', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Anita Verma', detail: 'Requested visit for 2BHK Flat', time: 'Tomorrow, 02:00 PM', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Karan Singh', detail: 'Requested visit for 3BHK Apartment', time: '05 Jun, 11:30 AM', avatar: 'https://randomuser.me/api/portraits/men/68.jpg' },
]

export default function AgentLeads() {
    const [requests, setRequests] = useState(initialVisitRequests)

    const handleAcceptRequest = (id, e) => {
        e.stopPropagation()
        setRequests(prev => prev.filter(req => req.id !== id))
    }

    const handleRejectRequest = (id, e) => {
        e.stopPropagation()
        setRequests(prev => prev.filter(req => req.id !== id))
    }

    return (
        <div className="w-full space-y-4 pb-8 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="heading-lg text-surface-900 dark:text-white flex items-center gap-2"><FiTarget className="text-primary-500" /> Leads & Requests</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Manage incoming leads and property visit requests.</p>
                </div>
            </div>

            <div className="bg-[#0F172A] rounded-2xl border border-surface-700/30 flex flex-col min-h-[400px]">
                <div className="p-4 flex justify-between items-center border-b border-surface-700/30 shrink-0">
                    <h3 className="text-white font-semibold text-sm">Visit Requests</h3>
                    <span className="text-[#6D5DFC] text-xs font-medium">{requests.length} pending</span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                    <AnimatePresence>
                        {requests.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-surface-500 text-sm py-10">
                                No pending requests
                            </motion.div>
                        )}
                        {requests.map((req, i) => (
                            <motion.div 
                                key={req.id} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/20 border border-surface-700/30 hover:bg-surface-800/50 transition-colors overflow-hidden"
                            >
                                <img src={req.avatar} alt={req.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-medium text-white truncate leading-tight">{req.name}</h4>
                                    <p className="text-xs text-surface-400 truncate mt-1">{req.detail}</p>
                                    <p className="text-xs text-surface-500 mt-1">{req.time}</p>
                                </div>
                                <div className="flex gap-3 shrink-0">
                                    <button 
                                        onClick={(e) => handleAcceptRequest(req.id, e)}
                                        className="px-4 py-2 rounded-lg border border-green-500/30 flex items-center justify-center gap-2 text-green-500 hover:bg-green-500/10 hover:text-green-400 transition-colors text-sm font-medium"
                                    >
                                        <FiCheck size={16} /> Accept
                                    </button>
                                    <button 
                                        onClick={(e) => handleRejectRequest(req.id, e)}
                                        className="px-4 py-2 rounded-lg border border-red-500/30 flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
                                    >
                                        <FiX size={16} /> Reject
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
