import { FiHome, FiGrid, FiPlusSquare, FiSettings } from 'react-icons/fi'

export const sellerNavigation = [
    { name: 'Dashboard', href: '/dashboard/seller', icon: FiHome },
    { name: 'My Properties', href: '/dashboard/seller/properties', icon: FiGrid },
    { name: 'Add Property', href: '/dashboard/seller/add-property', icon: FiPlusSquare },
    { name: 'Profile Settings', href: '/dashboard/settings', icon: FiSettings },
]
