import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FiHome, FiPlus, FiSettings, FiMapPin, FiTrash2, FiLogOut, FiX, FiUploadCloud } from 'react-icons/fi'
import { useAuth } from '../../hooks/AuthContext'
import { useData } from '../../hooks/DataContext'
import { formatPrice } from '../../hooks/formatPrice'

export default function SellerDashboard() {
    const { user, logout } = useAuth()
    const { properties, addProperty, deleteProperty } = useData()
    const navigate = useNavigate()

    const myProperties = properties.filter(p => p.ownerEmail === user?.email || (!p.agent && p.id <= 2)) // Show some mock defaults if empty

    const [isAdding, setIsAdding] = useState(false)
    const [formData, setFormData] = useState({
        title: '', price: '', area: '', beds: '', baths: '', sqft: '', fileName: ''
    })

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addProperty({
            title: formData.title,
            price: Number(formData.price),
            area: formData.area,
            beds: Number(formData.beds),
            baths: Number(formData.baths),
            sqft: Number(formData.sqft),
            ownerEmail: user.email,
            images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'], // default mock image
            documents: formData.fileName ? [formData.fileName] : [],
            status: 'Pending'
        })
        setIsAdding(false)
        setFormData({ title: '', price: '', area: '', beds: '', baths: '', sqft: '', fileName: '' })
    }

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="heading-lg text-surface-900 dark:text-white">Seller Dashboard</h1>
                        <p className="text-surface-500 dark:text-surface-400 mt-1">Manage your property listings</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <FiLogOut /> Logout
                    </button>
                </div>

                {/* Profile Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 mb-10"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-white text-3xl font-display font-bold shadow-lg">
                            {user?.name?.charAt(0) || 'S'}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-display font-semibold text-surface-900 dark:text-white">{user?.name || 'Seller User'}</h2>
                            <p className="text-surface-500 dark:text-surface-400 text-sm">{user?.email || 'seller@test.com'}  •  Member since Jan 2024</p>
                            <div className="flex flex-wrap gap-4 mt-3">
                                <span className="flex items-center gap-1.5 text-sm text-surface-600 dark:text-surface-300">
                                    <FiHome className="text-emerald-500" /> {myProperties.length} Properties Listed
                                </span>
                            </div>
                        </div>
                        <button className="btn-secondary text-sm flex items-center gap-2">
                            <FiSettings /> Edit Profile
                        </button>
                    </div>
                </motion.div>

                {/* Properties Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="heading-md text-surface-900 dark:text-white flex items-center gap-2">
                        <FiHome className="text-emerald-500" /> My Properties
                    </h2>
                    <button onClick={() => setIsAdding(true)} className="btn-primary text-sm flex items-center gap-2">
                        <FiPlus /> Add New Property
                    </button>
                </div>

                {/* My Properties */}
                {myProperties.length === 0 ? (
                    <div className="glass-card p-12 text-center mb-12">
                        <p className="text-surface-500 dark:text-surface-400">You haven't listed any properties yet.</p>
                        <button onClick={() => setIsAdding(true)} className="btn-primary mt-4 inline-block text-sm">List a Property</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {myProperties.map((property, i) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="glass-card overflow-hidden group relative"
                            >
                                <div className="absolute top-2 left-2 z-10">
                                    <span className={`badge ${property.status === 'Approved' ? 'bg-emerald-500' : property.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'} text-white shadow-lg`}>
                                        {property.status || 'Pending'}
                                    </span>
                                </div>
                                <div className="relative h-48">
                                    <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                                    <button
                                        onClick={(e) => { e.preventDefault(); deleteProperty(property.id); }}
                                        className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <FiTrash2 className="text-sm" />
                                    </button>
                                </div>
                                <Link to={`/properties/${property.id}`} className="block p-4">
                                    <h3 className="font-semibold text-surface-900 dark:text-white text-sm truncate">{property.title}</h3>
                                    <p className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1 mt-1"><FiMapPin className="text-[10px]" />{property.area}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="font-display font-bold text-emerald-600 dark:text-emerald-400">{formatPrice(property.price)}</span>
                                        <span className="text-xs text-surface-400">{property.beds}bd • {property.baths}ba</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Add Property Modal */}
                <AnimatePresence>
                    {isAdding && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-surface-900/40 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
                            >
                                <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center bg-surface-50 dark:bg-surface-800/50">
                                    <h2 className="text-lg font-display font-semibold text-surface-900 dark:text-white">List New Property</h2>
                                    <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg transition-colors">
                                        <FiX className="text-surface-500" />
                                    </button>
                                </div>
                                <div className="p-6 overflow-y-auto">
                                    <form id="add-property-form" onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Title</label>
                                                <input required type="text" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Modern Villa" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Price (₹)</label>
                                                <input required type="number" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. 15000000" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Location / Area</label>
                                                <input required type="text" className="input-field" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} placeholder="e.g. Hitech City" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Beds</label>
                                                    <input required type="number" className="input-field" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Baths</label>
                                                    <input required type="number" className="input-field" value={formData.baths} onChange={e => setFormData({...formData, baths: e.target.value})} />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1">Sqft</label>
                                                    <input required type="number" className="input-field" value={formData.sqft} onChange={e => setFormData({...formData, sqft: e.target.value})} />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 border-t border-surface-200 dark:border-surface-700 pt-4">
                                            <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-2">Upload Ownership Documents (Simulated)</label>
                                            <div className="border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl p-6 flex flex-col items-center justify-center bg-surface-50 dark:bg-surface-800/20">
                                                <FiUploadCloud className="text-3xl text-surface-400 mb-2" />
                                                <input
                                                    type="file"
                                                    onChange={e => setFormData({...formData, fileName: e.target.files[0]?.name || ''})}
                                                    className="text-sm text-surface-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                                />
                                                {formData.fileName && <p className="text-xs text-emerald-500 mt-2">Selected: {formData.fileName}</p>}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="p-6 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 flex justify-end gap-3">
                                    <button onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700">Cancel</button>
                                    <button type="submit" form="add-property-form" className="btn-primary py-2 px-6 rounded-xl text-sm shadow-emerald-500/30">Submit Listing</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
