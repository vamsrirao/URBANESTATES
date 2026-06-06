import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Properties from '../pages/Properties'
import PropertyDetails from '../pages/PropertyDetails'
import MapPage from '../pages/MapPage'
import About from '../pages/About'
import Contact from '../pages/Contact'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import LawyersPage from '../pages/LawyersPage'
import LawyerProfile from '../pages/LawyerProfile'
import VisitSchedulerPage from '../pages/VisitSchedulerPage'
import ProtectedRoute from '../components/common/ProtectedRoute'
import { buyerNavigation } from '../config/navigation/buyerNavigation'

// --- Lazy loaded dashboard components ---
// Layout
const DashboardLayout = lazy(() => import('../components/dashboard/DashboardLayout'))

// Common Dashboard Pages
const Settings = lazy(() => import('../pages/Dashboard/Settings'))

// Buyer Pages
const BuyerLayout = lazy(() => import('../pages/Dashboard/Buyer/BuyerLayout'))
const BuyerOverview = lazy(() => import('../pages/Dashboard/Buyer/BuyerOverview'))
const BuyerFavorites = lazy(() => import('../pages/Dashboard/Buyer/BuyerFavorites'))
const BuyerVisits = lazy(() => import('../pages/Dashboard/Buyer/BuyerVisits'))
const BuyerInquiries = lazy(() => import('../pages/Dashboard/Buyer/BuyerInquiries'))
const BuyerPurchases = lazy(() => import('../pages/Dashboard/Buyer/BuyerPurchases'))
const BuyerDocuments = lazy(() => import('../pages/Dashboard/Buyer/BuyerDocuments'))
const BuyerSavedSearches = lazy(() => import('../pages/Dashboard/Buyer/BuyerSavedSearches'))
const BuyerActivity = lazy(() => import('../pages/Dashboard/Buyer/BuyerActivity'))

// Seller Routes
const SellerLayout = lazy(() => import('../pages/Dashboard/Seller/SellerLayout'))
const SellerOverview = lazy(() => import('../pages/Dashboard/Seller/SellerOverview'))
const SellerProperties = lazy(() => import('../pages/Dashboard/Seller/SellerProperties'))
const SellerAddProperty = lazy(() => import('../pages/Dashboard/Seller/SellerAddProperty'))

// Lawyer Routes
const LawyerLayout = lazy(() => import('../pages/Dashboard/Lawyer/LawyerLayout'))
const LawyerVerify = lazy(() => import('../pages/Dashboard/Lawyer/LawyerVerify'))
const LawyerHistory = lazy(() => import('../pages/Dashboard/Lawyer/LawyerHistory'))
const LawyerBookings = lazy(() => import('../pages/Dashboard/Lawyer/LawyerBookings'))
const LawyerNotifications = lazy(() => import('../pages/Dashboard/Lawyer/LawyerNotifications'))
const DashboardLawyerProfile = lazy(() => import('../pages/Dashboard/Lawyer/LawyerProfile'))

// Agent Routes
const AgentLayout = lazy(() => import('../pages/Dashboard/Agent/AgentLayout'))
const AgentOverview = lazy(() => import('../pages/Dashboard/Agent/AgentOverview'))
const AgentProperties = lazy(() => import('../pages/Dashboard/Agent/AgentProperties'))
const AgentLeads = lazy(() => import('../pages/Dashboard/Agent/AgentLeads'))
const AgentInquiries = lazy(() => import('../pages/Dashboard/Agent/AgentInquiries'))
const AgentScheduledVisits = lazy(() => import('../pages/Dashboard/Agent/AgentScheduledVisits'))
const AgentBuyers = lazy(() => import('../pages/Dashboard/Agent/AgentBuyers'))
const AgentDeals = lazy(() => import('../pages/Dashboard/Agent/AgentDeals'))
const AgentCalendar = lazy(() => import('../pages/Dashboard/Agent/AgentCalendar'))
const AgentTasks = lazy(() => import('../pages/Dashboard/Agent/AgentTasks'))
const AgentMessages = lazy(() => import('../pages/Dashboard/Agent/AgentMessages'))
const AgentReports = lazy(() => import('../pages/Dashboard/Agent/AgentReports'))

// Loading fallback for lazy routes
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-surface-950">
        <div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
    </div>
)

export default function AppRoutes() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Lawyers */}
                <Route path="/lawyers" element={<LawyersPage />} />
                <Route path="/lawyers/:id" element={<LawyerProfile />} />

                {/* Visit Scheduler */}
                <Route path="/schedule-visit" element={<VisitSchedulerPage />} />

                {/* Public Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Backwards compatibility for old role-specific login URLs */}
                <Route path="/login/:role" element={<Navigate to="/login" replace />} />

                {/* --- Dashboard Routes --- */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>

                    {/* Common Dashboard Routes */}
                    <Route path="settings" element={<Settings />} />

                    {/* Buyer Routes */}
                    <Route path="buyer" element={<ProtectedRoute role="buyer"><BuyerLayout /></ProtectedRoute>}>
                        <Route index element={<BuyerOverview />} />
                        <Route path="favorites" element={<BuyerFavorites />} />
                        <Route path="visits" element={<BuyerVisits />} />
                        <Route path="inquiries" element={<BuyerInquiries />} />
                        <Route path="purchases" element={<BuyerPurchases />} />
                        <Route path="documents" element={<BuyerDocuments />} />
                        <Route path="saved-searches" element={<BuyerSavedSearches />} />
                        <Route path="activity" element={<BuyerActivity />} />
                    </Route>

                    {/* Seller Routes */}
                    <Route path="seller" element={<ProtectedRoute role="seller"><SellerLayout /></ProtectedRoute>}>
                        <Route index element={<SellerOverview />} />
                        <Route path="properties" element={<SellerProperties />} />
                        <Route path="add-property" element={<SellerAddProperty />} />
                    </Route>

                    {/* Agent Routes */}
                    <Route path="agent" element={<ProtectedRoute role="agent"><AgentLayout /></ProtectedRoute>}>
                        <Route index element={<AgentOverview />} />
                        <Route path="properties" element={<AgentProperties />} />
                        <Route path="leads" element={<AgentLeads />} />
                        <Route path="inquiries" element={<AgentInquiries />} />
                        <Route path="scheduled-visits" element={<AgentScheduledVisits />} />
                        <Route path="buyers" element={<AgentBuyers />} />
                        <Route path="deals" element={<AgentDeals />} />
                        <Route path="calendar" element={<AgentCalendar />} />
                        <Route path="tasks" element={<AgentTasks />} />
                        <Route path="messages" element={<AgentMessages />} />
                        <Route path="reports" element={<AgentReports />} />
                    </Route>

                    {/* Lawyer Routes */}
                    <Route path="lawyer" element={<ProtectedRoute role="lawyer"><LawyerLayout /></ProtectedRoute>}>
                        <Route index element={<LawyerVerify />} />
                        <Route path="verify" element={<LawyerVerify />} />
                        <Route path="history" element={<LawyerHistory />} />
                        <Route path="bookings" element={<LawyerBookings />} />
                        <Route path="notifications" element={<LawyerNotifications />} />
                        <Route path="profile" element={<DashboardLawyerProfile />} />
                    </Route>

                    {/* Catch-all redirect to login or root if accessing /dashboard directly without a role route */}
                    <Route index element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </Suspense>
    )
}
