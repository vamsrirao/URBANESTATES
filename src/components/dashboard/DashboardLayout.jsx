import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useAuth } from '../../hooks/AuthContext'
import { buyerNavigation } from '../../config/navigation/buyerNavigation'
import { agentNavigation } from '../../config/navigation/agentNavigation'
import { sellerNavigation } from '../../config/navigation/sellerNavigation'
import { lawyerNavigation } from '../../config/navigation/lawyerNavigation'

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const location = useLocation()
    const { user } = useAuth()

    // Close mobile sidebar on route change
    useEffect(() => {
        setSidebarOpen(false)
    }, [location.pathname])

    const getSidebarLinks = () => {
        const role = user?.role?.toLowerCase()
        if (role === 'agent') return agentNavigation
        if (role === 'seller') return sellerNavigation
        if (role === 'lawyer') return lawyerNavigation
        return buyerNavigation // fallback to buyer for now
    }

    return (
        <div className="h-screen w-full flex overflow-hidden bg-surface-50 dark:bg-[#0A0D14] text-surface-900 dark:text-surface-100">
            {/* Sidebar */}
            <Sidebar
                links={getSidebarLinks()}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                isCollapsed={sidebarCollapsed}
                setIsCollapsed={setSidebarCollapsed}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-0">
                {/* Topbar */}
                <Topbar
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
