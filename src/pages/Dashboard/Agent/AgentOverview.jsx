import { useState } from 'react'
import { FiHome, FiUsers, FiMessageSquare, FiBriefcase, FiCalendar, FiClock, FiCheck, FiX, FiBell, FiStar, FiChevronRight, FiChevronLeft, FiMapPin, FiPhone } from 'react-icons/fi'
import { MdOutlineRealEstateAgent } from 'react-icons/md'
import { PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// --- Mock Data ---
const sparklineData = [
    { value: 10 }, { value: 25 }, { value: 15 }, { value: 40 }, { value: 30 }, { value: 50 }, { value: 45 }, { value: 60 }
]

const kpiData = [
    { label: 'Total Listings', value: '24', trend: '+12% vs last month', icon: FiHome, color: '#8b5cf6', data: sparklineData.map(d => ({ value: d.value + Math.random() * 10 })) },
    { label: 'Total Leads', value: '56', trend: '+18% vs last month', icon: FiUsers, color: '#10b981', data: sparklineData.map(d => ({ value: d.value + Math.random() * 20 })) },
    { label: 'Inquiries', value: '32', trend: '+8% vs last month', icon: FiMessageSquare, color: '#f59e0b', data: sparklineData.map(d => ({ value: d.value + Math.random() * 5 })) },
    { label: 'Deals Closed', value: '8', trend: '+14% vs last month', icon: MdOutlineRealEstateAgent, color: '#84cc16', data: sparklineData.map(d => ({ value: d.value + Math.random() * 10 })) },
    { label: 'Earnings', value: '₹18.6 Cr', trend: '+22% vs last month', icon: () => <span className="font-bold text-sm">₹</span>, color: '#eab308', data: sparklineData.map(d => ({ value: d.value + Math.random() * 30 })) },
]

const visitPieData = [
    { name: 'Upcoming', value: 7, color: '#3b82f6', percent: '47%' },
    { name: 'Today', value: 3, color: '#10b981', percent: '20%' },
    { name: 'Completed', value: 4, color: '#8b5cf6', percent: '27%' },
    { name: 'Cancelled', value: 1, color: '#ef4444', percent: '6%' },
]

const todaysVisits = [
    { id: 1, time: '11:00 AM', property: '3BHK Apartment', location: 'Urban Skyline, Kondapur', buyer: 'Aarav Reddy', phone: '+91 98765 43210', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', notes: 'Client is highly interested, wants to verify Vastu.' },
    { id: 2, time: '01:00 PM', property: '4BHK Villa', location: 'Green Meadows, Gachibowli', buyer: 'Priya Sharma', phone: '+91 91234 56780', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', notes: 'Second visit. Bringing family.' },
    { id: 3, time: '03:30 PM', property: '2BHK Flat', location: 'Lotus Residency, Miyapur', buyer: 'Vikram Kumar', phone: '+91 99887 76655', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', notes: 'First visit. Looking for investment options.' },
]

const recentInquiries = [
    { id: 1, initials: 'AR', name: 'Aarav Reddy', detail: 'Interested in 3BHK in Kondapur', time: '10:30 AM', status: 'New', statusColor: '#6D5DFC', statusBg: 'rgba(109, 93, 252, 0.2)' },
    { id: 2, initials: 'PS', name: 'Priya Sharma', detail: 'Looking for 4BHK in Gachibowli', time: '09:15 AM', status: 'Contacted', statusColor: '#3b82f6', statusBg: 'rgba(59, 130, 246, 0.2)' },
    { id: 3, initials: 'VK', name: 'Vikram Kumar', detail: 'Budget: ₹2Cr - ₹3Cr', time: 'Yesterday', status: 'New', statusColor: '#6D5DFC', statusBg: 'rgba(109, 93, 252, 0.2)' },
    { id: 4, initials: 'SR', name: 'Sneha Reddy', detail: 'Investment property inquiry', time: 'Yesterday', status: 'Qualified', statusColor: '#10b981', statusBg: 'rgba(16, 185, 129, 0.2)' },
]

const initialVisitRequests = [
    { id: 1, name: 'Rohan Mehta', detail: 'Requested visit for Luxury Villa', time: 'Tomorrow, 11:00 AM', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Anita Verma', detail: 'Requested visit for 2BHK Flat', time: 'Tomorrow, 02:00 PM', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Karan Singh', detail: 'Requested visit for 3BHK Apartment', time: '05 Jun, 11:30 AM', avatar: 'https://randomuser.me/api/portraits/men/68.jpg' },
]

const upcomingSchedule = [
    { id: 1, type: 'visit', title: 'Property Visit', subtitle: '3BHK - Kondapur', detail: 'Meeting with Aarav Reddy at site.', time: '11:00 AM', icon: FiCalendar, color: '#6D5DFC' },
    { id: 2, type: 'meeting', title: 'Client Meeting', subtitle: 'Aarav Reddy', detail: 'Discussing final price negotiation.', time: '01:00 PM', icon: FiUsers, color: '#eab308' },
    { id: 3, type: 'call', title: 'Follow Up Call', subtitle: 'Priya Sharma', detail: 'Checking on loan approval status.', time: '03:30 PM', icon: FiClock, color: '#10b981' },
    { id: 4, type: 'visit', title: 'Property Visit', subtitle: '4BHK - Gachibowli', detail: 'Showing villa to new leads.', time: '05:00 PM', icon: FiCalendar, color: '#6D5DFC' },
]

// --- UI Components ---
const KPICard = ({ label, value, trend, icon: Icon, color, data }) => (
    <div className="bg-[#0F172A] p-4 rounded-2xl border border-surface-700/30 flex flex-col justify-between relative overflow-hidden group hover:border-surface-600/50 transition-all h-[110px] cursor-default">
        <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: color }}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-xs text-surface-400 font-medium">{label}</p>
                <h3 className="text-xl font-bold text-white leading-tight mt-0.5">{value}</h3>
            </div>
        </div>
        <div className="flex items-center gap-1 mt-auto relative z-10">
            <span className="text-[10px] text-green-500 font-medium">↑</span>
            <span className="text-[10px] text-green-500">{trend.split(' ')[0]}</span>
            <span className="text-[10px] text-surface-500 ml-1">{trend.substring(trend.indexOf(' '))}</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 opacity-30 z-0">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
)

export default function AgentOverview() {
    // --- State ---
    const [selectedDate, setSelectedDate] = useState(3)
    const [requests, setRequests] = useState(initialVisitRequests)
    const [selectedVisit, setSelectedVisit] = useState(null)
    const [selectedSchedule, setSelectedSchedule] = useState(null)

    // --- Handlers ---
    const handleAcceptRequest = (id, e) => {
        e.stopPropagation()
        setRequests(prev => prev.filter(req => req.id !== id))
        // In reality, this would make an API call
    }

    const handleRejectRequest = (id, e) => {
        e.stopPropagation()
        setRequests(prev => prev.filter(req => req.id !== id))
    }

    return (
        <div className="w-full space-y-4 pb-8 max-w-[1600px] mx-auto relative">
            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {kpiData.map((kpi, i) => <KPICard key={i} {...kpi} />)}
            </div>

            {/* Middle Section (Donut, Today's Visits, Calendar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Visit Overview Donut */}
                <div className="lg:col-span-3 bg-[#0F172A] rounded-2xl border border-surface-700/30 flex flex-col relative h-[320px]">
                    <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-white font-semibold text-sm mb-2">Visit Overview</h3>
                        <div className="flex-1 flex items-center justify-between">
                            <div className="w-[120px] h-[120px] relative shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={visitPieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={55}
                                            paddingAngle={2}
                                            dataKey="value"
                                            stroke="none"
                                            isAnimationActive={false}
                                        >
                                            {visitPieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-white font-bold text-xl leading-none">15</span>
                                    <span className="text-[9px] text-surface-400 mt-0.5 text-center leading-tight">Total Visits</span>
                                </div>
                            </div>
                            <div className="flex-1 ml-4 space-y-3">
                                {visitPieData.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between cursor-pointer hover:bg-surface-800/30 p-1 -mx-1 rounded">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-xs text-surface-300">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-white">{item.value}</span>
                                            <span className="text-[10px] text-surface-500 w-[24px] text-right">({item.percent})</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 pt-0">
                        <Link to="/dashboard/agent/scheduled-visits" className="text-[#6D5DFC] text-xs font-medium hover:text-[#8b7dfa] transition-colors flex items-center gap-1 w-max">
                            View all visits <FiChevronRight size={12} />
                        </Link>
                    </div>
                </div>

                {/* Today's Visits */}
                <div className="lg:col-span-6 bg-[#0F172A] rounded-2xl border border-surface-700/30 flex flex-col h-[320px]">
                    <div className="p-4 border-b border-surface-700/30 flex justify-between items-center shrink-0">
                        <h3 className="text-white font-semibold text-sm">Today's Visits</h3>
                        <span className="text-xs text-[#6D5DFC] font-medium">3 scheduled</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                        {todaysVisits.map((visit, i) => (
                            <div 
                                key={visit.id} 
                                onClick={() => setSelectedVisit(visit)}
                                className={`flex items-center gap-4 p-3 rounded-xl hover:bg-surface-800/50 cursor-pointer transition-colors ${i !== todaysVisits.length - 1 ? 'border-b border-surface-700/30' : ''}`}
                            >
                                <span className="text-xs text-surface-400 font-medium w-16">{visit.time}</span>
                                <img src={visit.image} alt={visit.property} className="w-16 h-12 rounded object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-white truncate">{visit.property}</h4>
                                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-medium shrink-0">Upcoming</span>
                                    </div>
                                    <p className="text-[10px] text-surface-400 truncate mt-0.5">{visit.location}</p>
                                    <p className="text-[10px] text-surface-500 truncate mt-0.5">Buyer: <span className="text-surface-300">{visit.buyer}</span></p>
                                </div>
                                <div className="p-2 rounded-lg text-surface-500 hover:text-white hover:bg-[#6D5DFC] transition-colors shrink-0">
                                    <FiCalendar size={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-surface-700/30 shrink-0">
                        <Link to="/dashboard/agent/calendar" className="text-[#6D5DFC] text-xs font-medium hover:text-[#8b7dfa] transition-colors flex items-center gap-1 w-max">
                            View today's schedule <FiChevronRight size={12} />
                        </Link>
                    </div>
                </div>

                {/* Calendar Widget */}
                <div className="lg:col-span-3 bg-[#0F172A] rounded-2xl border border-surface-700/30 flex flex-col h-[320px]">
                    <div className="p-4 border-b border-surface-700/30 flex justify-between items-center shrink-0">
                        <h3 className="text-white font-semibold text-sm">June 2026</h3>
                        <div className="flex gap-1 text-surface-500">
                            <button className="p-1 hover:text-white transition-colors"><FiChevronLeft size={14} /></button>
                            <button className="p-1 hover:text-white transition-colors"><FiChevronRight size={14} /></button>
                        </div>
                    </div>
                    <div className="p-4 flex-1">
                        <div className="grid grid-cols-7 mb-2">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                <div key={day} className="text-[9px] text-surface-500 font-medium text-center">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-3">
                            {Array.from({ length: 30 }, (_, i) => i + 1).map(date => {
                                const isSelected = date === selectedDate;
                                return (
                                    <div key={date} className="flex justify-center">
                                        <button 
                                            onClick={() => setSelectedDate(date)}
                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                                            isSelected ? 'bg-[#6D5DFC] text-white font-bold' : 'text-surface-300 hover:bg-surface-800'
                                        }`}>
                                            {date}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="p-4 pt-0 shrink-0">
                        <Link to="/dashboard/agent/calendar" className="text-[#6D5DFC] text-xs font-medium hover:text-[#8b7dfa] transition-colors flex items-center gap-1 w-max">
                            View full calendar <FiChevronRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Section (Inquiries, Requests, Schedule) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Recent Inquiries */}
                <div className="lg:col-span-4 bg-[#0F172A] rounded-2xl border border-surface-700/30 flex flex-col h-[320px]">
                    <div className="p-4 flex justify-between items-center shrink-0">
                        <h3 className="text-white font-semibold text-sm">Recent Inquiries</h3>
                        <Link to="/dashboard/agent/inquiries" className="text-[#6D5DFC] text-xs font-medium hover:text-[#8b7dfa]">View all</Link>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4 space-y-1">
                        {recentInquiries.map(inq => (
                            <div key={inq.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-800/50 cursor-pointer transition-colors">
                                <div className="w-10 h-10 rounded-full bg-surface-800 flex items-center justify-center text-surface-300 text-xs font-medium shrink-0">
                                    {inq.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-white truncate leading-tight">{inq.name}</h4>
                                    <p className="text-[10px] text-surface-400 truncate mt-0.5">{inq.detail}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className="text-[9px] text-surface-500">{inq.time}</span>
                                    <span className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ backgroundColor: inq.statusBg, color: inq.statusColor }}>
                                        {inq.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visit Requests */}
                <div className="lg:col-span-4 bg-[#0F172A] rounded-2xl border border-surface-700/30 flex flex-col h-[320px]">
                    <div className="p-4 flex justify-between items-center shrink-0">
                        <h3 className="text-white font-semibold text-sm">Visit Requests</h3>
                        <Link to="/dashboard/agent/visit-requests" className="text-[#6D5DFC] text-xs font-medium hover:text-[#8b7dfa]">View all</Link>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4 space-y-1">
                        <AnimatePresence>
                            {requests.length === 0 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-surface-500 text-sm py-10">
                                    No pending requests
                                </motion.div>
                            )}
                            {requests.map(req => (
                                <motion.div 
                                    key={req.id} 
                                    initial={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-800/50 cursor-pointer transition-colors overflow-hidden"
                                >
                                    <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-white truncate leading-tight">{req.name}</h4>
                                        <p className="text-[10px] text-surface-400 truncate mt-0.5">{req.detail}</p>
                                        <p className="text-[9px] text-surface-500 mt-1">{req.time}</p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button 
                                            onClick={(e) => handleAcceptRequest(req.id, e)}
                                            className="w-7 h-7 rounded border border-green-500/30 flex items-center justify-center text-green-500 hover:bg-green-500/10 hover:text-green-400 transition-colors"
                                            title="Accept"
                                        >
                                            <FiCheck size={14} />
                                        </button>
                                        <button 
                                            onClick={(e) => handleRejectRequest(req.id, e)}
                                            className="w-7 h-7 rounded border border-red-500/30 flex items-center justify-center text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                            title="Reject"
                                        >
                                            <FiX size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Upcoming Schedule */}
                <div className="lg:col-span-4 bg-[#0F172A] rounded-2xl border border-surface-700/30 flex flex-col h-[320px]">
                    <div className="p-4 border-b border-surface-700/30 flex justify-between items-center shrink-0">
                        <h3 className="text-white font-semibold text-sm">Upcoming Schedule</h3>
                        <Link to="/dashboard/agent/calendar" className="text-[#6D5DFC] text-xs font-medium hover:text-[#8b7dfa]">View calendar</Link>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                        {upcomingSchedule.map((item, i) => (
                            <div 
                                key={item.id} 
                                onClick={() => setSelectedSchedule(item)}
                                className={`flex items-center gap-3 p-3 rounded-xl hover:bg-surface-800/50 cursor-pointer transition-colors ${i !== upcomingSchedule.length - 1 ? 'border-b border-surface-700/30' : ''}`}
                            >
                                <div className="w-8 h-8 rounded bg-surface-800 flex items-center justify-center shrink-0" style={{ color: item.color }}>
                                    <item.icon size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-white truncate leading-tight">{item.title}</h4>
                                    <p className="text-[10px] text-surface-400 truncate mt-0.5">{item.subtitle}</p>
                                </div>
                                <span className="text-[10px] text-surface-500 font-medium shrink-0">{item.time}</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-surface-700/30 shrink-0">
                        <Link to="/dashboard/agent/calendar" className="text-[#6D5DFC] text-xs font-medium hover:text-[#8b7dfa] transition-colors flex items-center gap-1 w-max">
                            View full schedule <FiChevronRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer Banner */}
            <div className="bg-[#0F172A] rounded-2xl border border-surface-700/30 p-5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#6D5DFC]/10 flex items-center justify-center text-[#6D5DFC] shrink-0 border border-[#6D5DFC]/20">
                        <FiCalendar size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm mb-1">Never miss a scheduled visit!</h3>
                        <p className="text-xs text-surface-400 mb-2">Get notified about upcoming visits and updates.</p>
                        <button className="text-[10px] text-[#6D5DFC] font-medium px-3 py-1.5 rounded-lg border border-[#6D5DFC]/30 hover:bg-[#6D5DFC]/20 transition-colors">
                            Enable Notifications
                        </button>
                    </div>
                </div>
                
                <div className="flex items-center gap-6 md:gap-8 border-t md:border-t-0 border-surface-700/50 pt-4 md:pt-0 w-full md:w-auto overflow-x-auto justify-between md:justify-end">
                    <div className="flex items-center gap-3">
                        <FiClock className="text-surface-400" size={24} />
                        <div>
                            <p className="text-[10px] text-surface-500 mb-0.5">Response Time</p>
                            <h4 className="text-white font-bold text-sm">1.2 hrs</h4>
                            <p className="text-[9px] text-surface-500">Avg response time</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-surface-700/50 hidden md:block"></div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <FiCheck className="text-surface-400" size={24} />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#0F172A]"></div>
                        </div>
                        <div>
                            <p className="text-[10px] text-surface-500 mb-0.5">Visit Conversion</p>
                            <h4 className="text-white font-bold text-sm">35%</h4>
                            <p className="text-[9px] text-surface-500">Leads to visits</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-surface-700/50 hidden md:block"></div>
                    <div className="flex items-center gap-3">
                        <FiStar className="text-surface-400" size={24} />
                        <div>
                            <p className="text-[10px] text-surface-500 mb-0.5">Client Satisfaction</p>
                            <h4 className="text-white font-bold text-sm">4.8/5</h4>
                            <p className="text-[9px] text-surface-500">Average rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Modals --- */}
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

            <AnimatePresence>
                {selectedSchedule && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedSchedule(null)}
                            className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-[#0F172A] border border-surface-700/50 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden z-10 p-6 text-center"
                        >
                            <button onClick={() => setSelectedSchedule(null)} className="absolute top-4 right-4 text-surface-500 hover:text-white transition-colors">
                                <FiX size={20} />
                            </button>
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${selectedSchedule.color}20`, color: selectedSchedule.color }}>
                                <selectedSchedule.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{selectedSchedule.title}</h3>
                            <p className="text-sm text-surface-400 mb-4">{selectedSchedule.subtitle}</p>
                            
                            <div className="bg-surface-800/50 rounded-xl p-4 mb-6 border border-surface-700/30 text-left">
                                <div className="flex items-center gap-2 mb-2 text-white font-medium">
                                    <FiClock className="text-[#6D5DFC]" size={16} /> {selectedSchedule.time}
                                </div>
                                <p className="text-sm text-surface-300">{selectedSchedule.detail}</p>
                            </div>

                            <button className="w-full bg-[#6D5DFC] hover:bg-[#5b4ddb] text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                                View Details
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    )
}
