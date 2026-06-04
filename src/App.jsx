import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'
import AIAssistant from './components/ai/AIAssistant'
import { useAuth } from './hooks/AuthContext'

export default function App() {
    const [darkMode, setDarkMode] = useState(true) // Dark mode ON by default
    const location = useLocation()
    const { isLoading } = useAuth()

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [location.pathname])

    // Apply dark mode class
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    // Show loading screen while verifying auth session on page refresh
    if (isLoading) {
        return (
            <div className="min-h-screen bg-surface-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                    <p className="text-surface-400 text-sm font-medium">Loading UrbanEstates...</p>
                </div>
            </div>
        )
    }

    // Hide navbar/footer on auth pages and dashboard routes
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
    const isMapPage = location.pathname === '/map'
    const isDashboard = location.pathname.startsWith('/dashboard')
    
    const hideGlobalNavAndFooter = isAuthPage || isDashboard

    return (
        <div className="min-h-screen bg-white dark:bg-surface-950 text-surface-900 dark:text-surface-100 transition-colors duration-300">
            {!hideGlobalNavAndFooter && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
            <main>
                <AppRoutes />
            </main>
            {!isMapPage && !hideGlobalNavAndFooter && <Footer />}
            {!hideGlobalNavAndFooter && <AIAssistant />}
        </div>
    )
}
