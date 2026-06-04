import { FiHome, FiSearch, FiHeart, FiCalendar, FiMessageSquare, FiTag, FiBookmark, FiFolder, FiSettings } from 'react-icons/fi'

export const buyerNavigation = [
    { name: 'Dashboard', href: '/dashboard/buyer', icon: FiHome },
    { name: 'Search Properties', href: '/properties', icon: FiSearch },
    { name: 'Favorites', href: '/dashboard/buyer/favorites', icon: FiHeart },
    { name: 'Scheduled Visits', href: '/dashboard/buyer/visits', icon: FiCalendar },
    { name: 'Messages', href: '/dashboard/buyer/inquiries', icon: FiMessageSquare },
    { name: 'Offers', href: '/dashboard/buyer/purchases', icon: FiTag },
    { name: 'Saved Searches', href: '/dashboard/buyer/saved-searches', icon: FiBookmark },
    { name: 'Documents', href: '/dashboard/buyer/documents', icon: FiFolder },
    { name: 'Profile Settings', href: '/dashboard/settings', icon: FiSettings },
]
