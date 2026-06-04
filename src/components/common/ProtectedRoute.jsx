import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext'

export default function ProtectedRoute({ role, children }) {
    const { isLoggedIn, user, isLoading } = useAuth()
    const location = useLocation()

    // Show loading spinner while auth state is being verified
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-950">
                <div className="w-8 h-8 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
            </div>
        )
    }

    // 1. Not logged in at all
    if (!isLoggedIn()) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // 2. Logged in, but wrong role
    if (role && !isLoggedIn(role)) {
        const properRole = user?.role?.toLowerCase() || 'buyer'
        return <Navigate to={`/dashboard/${properRole}`} replace />
    }

    // 3. Logged in and correct role
    return children
}
