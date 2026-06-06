import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { FiUploadCloud, FiArrowLeft } from 'react-icons/fi'

export default function SellerAddProperty() {
    const { user, addProperty } = useOutletContext()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '', price: '', area: '', beds: '', baths: '', sqft: '', fileName: ''
    })

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
        navigate('/dashboard/seller/properties')
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 glass text-surface-500 hover:text-surface-900 dark:hover:text-white rounded-xl transition-colors">
                    <FiArrowLeft />
                </button>
                <div>
                    <h2 className="heading-md text-surface-900 dark:text-white">List New Property</h2>
                    <p className="text-sm text-surface-500">Provide details for your new listing.</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
            >
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

                    <div className="pt-4 flex justify-end gap-3 border-t border-surface-200 dark:border-surface-700 mt-6">
                        <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700">Cancel</button>
                        <button type="submit" className="btn-primary py-2 px-6 rounded-xl text-sm shadow-emerald-500/30">Submit Listing</button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
