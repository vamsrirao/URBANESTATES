import { useState } from 'react'
import { propertyTypes } from '../../data/properties'
import { areas } from '../../data/properties'
import { useData } from '../../hooks/DataContext'
import { useAuth } from '../../hooks/AuthContext'

export default function AddPropertyForm() {
    const { addProperty } = useData()
    const { auth } = useAuth()
    const user = auth.agent || { email: 'agent@test.com' }
    
    const [form, setForm] = useState({
        title: '', price: '', type: 'Flat', beds: '2', baths: '2',
        sqft: '', area: 'Hitech City', address: '', description: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        addProperty({
            ...form,
            price: Number(form.price),
            beds: Number(form.beds),
            baths: Number(form.baths),
            sqft: Number(form.sqft),
            ownerEmail: user.email,
            agentEmail: user.email,
            images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
            status: 'Approved' // Agents can self-approve theoretically for this mock
        })
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setForm({
                title: '', price: '', type: 'Flat', beds: '2', baths: '2',
                sqft: '', area: 'Hitech City', address: '', description: ''
            })
        }, 2500)
    }

    const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

    if (submitted) {
        return (
            <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-surface-900 dark:text-white mb-2">Property Listed!</h3>
                <p className="text-surface-500 dark:text-surface-400">Your property has been added successfully.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
            <h3 className="font-display font-semibold text-surface-900 dark:text-white text-lg">Add New Property</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Property Title</label>
                    <input type="text" value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="e.g. Luxury 3BHK Flat" className="input-field" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Price (₹)</label>
                    <input type="number" value={form.price} onChange={e => handleChange('price', e.target.value)} placeholder="15000000" className="input-field" required />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Type</label>
                    <select value={form.type} onChange={e => handleChange('type', e.target.value)} className="input-field">
                        {propertyTypes.filter(t => t !== 'All Types').map(t => <option key={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Bedrooms</label>
                    <input type="number" value={form.beds} onChange={e => handleChange('beds', e.target.value)} min="1" max="10" className="input-field" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Bathrooms</label>
                    <input type="number" value={form.baths} onChange={e => handleChange('baths', e.target.value)} min="1" max="10" className="input-field" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Sq Ft</label>
                    <input type="number" value={form.sqft} onChange={e => handleChange('sqft', e.target.value)} placeholder="1800" className="input-field" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Area</label>
                    <select value={form.area} onChange={e => handleChange('area', e.target.value)} className="input-field">
                        {areas.filter(a => a !== 'All Areas').map(a => <option key={a}>{a}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Address</label>
                    <input type="text" value={form.address} onChange={e => handleChange('address', e.target.value)} placeholder="Plot 42, Madhapur" className="input-field" required />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-surface-600 dark:text-surface-300 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => handleChange('description', e.target.value)} rows={4} placeholder="Describe the property..." className="input-field resize-none" required />
            </div>

            <button type="submit" className="btn-primary w-full">
                List Property
            </button>
        </form>
    )
}
