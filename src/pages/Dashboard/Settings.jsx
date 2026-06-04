import { useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { FiUser, FiMail, FiPhone, FiSave, FiLock, FiBell } from 'react-icons/fi'

export default function Settings() {
    const { user } = useAuth()
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    
    const [isSaving, setIsSaving] = useState(false)
    const [activeTab, setActiveTab] = useState('profile')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false)
            alert('Settings saved successfully!')
        }, 1000)
    }

    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-2">Profile Settings</h1>
                <p className="text-surface-600 dark:text-surface-400">Manage your account details and preferences.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="md:w-64 shrink-0">
                    <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                                activeTab === 'profile'
                                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800/50'
                            }`}
                        >
                            <FiUser size={18} />
                            Personal Info
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                                activeTab === 'security'
                                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800/50'
                            }`}
                        >
                            <FiLock size={18} />
                            Security
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                                activeTab === 'notifications'
                                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800/50'
                            }`}
                        >
                            <FiBell size={18} />
                            Notifications
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-2xl p-6">
                        
                        {activeTab === 'profile' && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className="text-lg font-semibold text-surface-900 dark:text-white border-b border-surface-100 dark:border-surface-700 pb-4 mb-6">
                                    Personal Information
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Full Name</label>
                                        <div className="relative">
                                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                                            <input 
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Email Address</label>
                                        <div className="relative">
                                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                                            <input 
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Phone Number</label>
                                        <div className="relative">
                                            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                                            <input 
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2 bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button 
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <FiSave />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'security' && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className="text-lg font-semibold text-surface-900 dark:text-white border-b border-surface-100 dark:border-surface-700 pb-4 mb-6">
                                    Change Password
                                </h2>

                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Current Password</label>
                                        <input 
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">New Password</label>
                                        <input 
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Confirm New Password</label>
                                        <input 
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-start">
                                    <button 
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-surface-900 dark:text-white border-b border-surface-100 dark:border-surface-700 pb-4 mb-6">
                                    Notification Preferences
                                </h2>
                                <p className="text-surface-600 dark:text-surface-400">Settings for email and push notifications will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
