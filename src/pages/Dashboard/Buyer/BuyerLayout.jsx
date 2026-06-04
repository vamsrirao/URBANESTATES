import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/AuthContext'
import { useData } from '../../../hooks/DataContext'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiDollarSign } from 'react-icons/fi'
import { formatPrice } from '../../../hooks/formatPrice'

export default function BuyerLayout() {
    const { user } = useAuth()
    const { properties, inquiries, visits, favorites, purchases, addVisit, buyProperty, toggleFavorite } = useData()

    // Filter Data by user
    const availableProperties = properties.filter(p => p.status === 'Approved')
    const userInquiries = inquiries.filter(inq => inq.sender === user?.email || !inq.sender)
    const userVisits = visits.filter(v => v.user === user?.email || !v.user)
    const favoriteProperties = properties.filter(p => favorites.includes(p.id))
    const userPurchases = purchases.filter(p => p.userEmail === user?.email)

    const getProperty = (id) => properties.find(p => p.id === Number(id))

    // Modals state
    const [isScheduling, setIsScheduling] = useState(false)
    const [isBuying, setIsBuying] = useState(false)
    const [scheduleData, setScheduleData] = useState({ propertyId: availableProperties[0]?.id || '', date: '', time: '' })
    const [buyData, setBuyData] = useState({ propertyId: availableProperties[0]?.id || '', paymentMethod: 'Bank Transfer' })

    const handleScheduleSubmit = (e) => {
        e.preventDefault()
        addVisit({
            propertyId: Number(scheduleData.propertyId),
            date: scheduleData.date,
            time: scheduleData.time,
            user: user.email
        })
        setIsScheduling(false)
    }

    const handleBuySubmit = (e) => {
        e.preventDefault()
        const prop = getProperty(buyData.propertyId)
        if (!prop) return
        buyProperty({
            propertyId: Number(buyData.propertyId),
            userEmail: user.email,
            price: prop.price,
            paymentMethod: buyData.paymentMethod
        })
        setIsBuying(false)
    }

    // Context object to pass down to sub-pages
    const contextValue = {
        user,
        availableProperties,
        userInquiries,
        userVisits,
        favoriteProperties,
        userPurchases,
        getProperty,
        toggleFavorite,
        openScheduleModal: () => setIsScheduling(true),
        openBuyModal: () => setIsBuying(true)
    }

    return (
        <>
            {/* Render nested routes (the sub-pages) */}
            <Outlet context={contextValue} />

            {/* Schedule Visit Modal */}
            <AnimatePresence>
                {isScheduling && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-surface-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card w-full max-w-md overflow-hidden relative"
                        >
                            <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center bg-surface-50 dark:bg-surface-800/50">
                                <h2 className="text-lg font-display font-semibold text-surface-900 dark:text-white">Schedule Visit</h2>
                                <button onClick={() => setIsScheduling(false)} className="p-2 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg transition-colors">
                                    <FiX className="text-surface-500" />
                                </button>
                            </div>
                            <div className="p-6">
                                <form id="schedule-form" onSubmit={handleScheduleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Select Property</label>
                                        <select className="input-field" required value={scheduleData.propertyId} onChange={e => setScheduleData({...scheduleData, propertyId: e.target.value})}>
                                            {availableProperties.map(p => (
                                                <option key={p.id} value={p.id}>{p.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Date</label>
                                            <input type="date" required className="input-field" value={scheduleData.date} onChange={e => setScheduleData({...scheduleData, date: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Time</label>
                                            <input type="time" required className="input-field" value={scheduleData.time} onChange={e => setScheduleData({...scheduleData, time: e.target.value})} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="p-6 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 flex justify-end gap-3">
                                <button onClick={() => setIsScheduling(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700">Cancel</button>
                                <button type="submit" form="schedule-form" className="btn-primary py-2 px-6 rounded-xl text-sm shadow-teal-500/30 bg-gradient-to-r from-teal-500 to-cyan-600 border-none">Book</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Buy Property Modal */}
            <AnimatePresence>
                {isBuying && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-surface-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card w-full max-w-md overflow-hidden relative"
                        >
                            <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center bg-surface-50 dark:bg-surface-800/50">
                                <h2 className="text-lg font-display font-semibold text-surface-900 dark:text-white flex items-center gap-2"><FiDollarSign className="text-purple-500" /> Buy Property</h2>
                                <button onClick={() => setIsBuying(false)} className="p-2 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg transition-colors">
                                    <FiX className="text-surface-500" />
                                </button>
                            </div>
                            <div className="p-6">
                                <form id="buy-form" onSubmit={handleBuySubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Select Property to Purchase</label>
                                        <select className="input-field" required value={buyData.propertyId} onChange={e => setBuyData({...buyData, propertyId: e.target.value})}>
                                            {availableProperties.map(p => (
                                                <option key={p.id} value={p.id}>{p.title} - {formatPrice(p.price)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Payment Method</label>
                                        <select className="input-field" required value={buyData.paymentMethod} onChange={e => setBuyData({...buyData, paymentMethod: e.target.value})}>
                                            <option>Bank Transfer</option>
                                            <option>Mortgage / Home Loan</option>
                                            <option>Cash / Check</option>
                                        </select>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800 mt-4">
                                        <p className="text-xs text-purple-700 dark:text-purple-300">By submitting this form, you are initiating a purchase request. The seller and legal team will review the transaction.</p>
                                    </div>
                                </form>
                            </div>
                            <div className="p-6 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 flex justify-end gap-3">
                                <button onClick={() => setIsBuying(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700">Cancel</button>
                                <button type="submit" form="buy-form" className="btn-primary py-2 px-6 rounded-xl text-sm shadow-purple-500/30 bg-gradient-to-r from-purple-500 to-pink-600 border-none">Initiate Purchase</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
