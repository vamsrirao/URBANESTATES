import { FiHome, FiShield, FiCheckCircle, FiCalendar, FiBell, FiUser, FiSettings } from 'react-icons/fi'

export const lawyerNavigation = [
    { name: 'Dashboard', href: '/dashboard/lawyer', icon: FiHome },
    { name: 'Verify Properties', href: '/dashboard/lawyer/verify', icon: FiShield },
    { name: 'Verification History', href: '/dashboard/lawyer/history', icon: FiCheckCircle },
    { name: 'My Bookings', href: '/dashboard/lawyer/bookings', icon: FiCalendar },
    { name: 'Notifications', href: '/dashboard/lawyer/notifications', icon: FiBell },
    { name: 'Profile Settings', href: '/dashboard/settings', icon: FiSettings },
]
