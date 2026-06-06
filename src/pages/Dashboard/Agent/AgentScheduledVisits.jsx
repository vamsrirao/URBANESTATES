import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar, FiClock, FiUsers, FiX, FiMapPin, FiPhone } from 'react-icons/fi'

const todaysVisits = [
    { id: 1, time: '11:00 AM', property: '3BHK Apartment', location: 'Urban Skyline, Kondapur', buyer: 'Aarav Reddy', phone: '+91 98765 43210', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', notes: 'Client is highly interested, wants to verify Vastu.' },
    { id: 2, time: '01:00 PM', property: '4BHK Villa', location: 'Green Meadows, Gachibowli', buyer: 'Priya Sharma', phone: '+91 91234 56780', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', notes: 'Second visit. Bringing family.' },
    { id: 3, time: '03:30 PM', property: '2BHK Flat', location: 'Lotus Residency, Miyapur', buyer: 'Vikram Kumar', phone: '+91 99887 76655', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', notes: 'First visit. Looking for investment options.' },
]

export default function AgentScheduledVisits() {
    const [selectedVisit, setSelectedVisit] = useState(null)

    return (
        <div className="w-full space-y-4 pb-8 max-w-[1600px] mx-auto relative">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="heading-lg text-surface-900 dark:text-white flex items-center gap-2"><FiCalendar className="text-primary-500" /> Scheduled Visits</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Manage your property visits and client meetings.</p>
                </div>
            </div>

            <div className="bg-[#0F172A] rounded-2xl border border-surface-700/30 flex flex-col min-h-[400px]">
                <div className="p-4 flex justify-between items-center border-b border-surface-700/30 shrink-0">
                    <h3 className="text-white font-semibold text-sm">Today's Visits</h3>
                    <span className="text-[#6D5DFC] text-xs font-medium">{todaysVisits.length} scheduled</span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                    {todaysVisits.map((visit) => (
                        <div 
                            key={visit.id} 
                            onClick={() => setSelectedVisit(visit)}
                            className="flex items-center gap-6 p-4 rounded-xl border border-surface-700/30 bg-surface-800/20 hover:bg-surface-800/50 cursor-pointer transition-colors"
                        >
                            <span className="text-sm text-surface-400 font-medium w-20 shrink-0">{visit.time}</span>
                            <img src={visit.image} alt={visit.property} className="w-24 h-16 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    <h4 className="text-base font-medium text-white truncate">{visit.property}</h4>
                                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-medium shrink-0">Upcoming</span>
                                </div>
                                <p className="text-xs text-surface-400 truncate mt-1 flex items-center gap-1"><FiMapPin /> {visit.location}</p>
                                <p className="text-xs text-surface-500 truncate mt-1 flex items-center gap-1"><FiUser /> Buyer: <span className="text-surface-300">{visit.buyer}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visit Details Modal */}
            <AnimatePresence>
                {selectedVisit && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedVisit(null)}
                            className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-[#0F172A] border border-surface-700/50 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden z-10"
                        >
                            <img src={selectedVisit.image} alt="Property" className="w-full h-48 object-cover" />
                            <button onClick={() => setSelectedVisit(null)} className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur transition-colors">
                                <FiX size={18} />
                            </button>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium border border-blue-500/20">Upcoming Visit</span>
                                    <div className="flex items-center gap-1 text-[#6D5DFC] font-medium text-sm">
                                        <FiClock size={14} /> {selectedVisit.time}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{selectedVisit.property}</h3>
                                <p className="text-sm text-surface-400 flex items-center gap-1 mb-6"><FiMapPin size={14} className="shrink-0" /> {selectedVisit.location}</p>
                                
                                <div className="bg-surface-800/30 rounded-xl p-4 mb-6 border border-surface-700/30">
                                    <p className="text-xs text-surface-500 mb-1">Buyer Details</p>
                                    <p className="text-white font-medium mb-1">{selectedVisit.buyer}</p>
                                    <p className="text-sm text-surface-400 flex items-center gap-1"><FiPhone size={14} /> {selectedVisit.phone}</p>
                                    {selectedVisit.notes && (
                                        <div className="mt-3 pt-3 border-t border-surface-700/50">
                                            <p className="text-xs text-surface-500 mb-1">Notes</p>
                                            <p className="text-sm text-surface-300 italic">"{selectedVisit.notes}"</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 bg-[#6D5DFC] hover:bg-[#5b4ddb] text-white py-2.5 rounded-xl text-sm font-medium transition-colors">Contact Buyer</button>
                                    <button className="flex-1 bg-surface-800 hover:bg-surface-700 text-white py-2.5 rounded-xl text-sm font-medium transition-colors border border-surface-700">Reschedule</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
