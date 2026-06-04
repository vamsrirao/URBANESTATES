import { FiHome, FiGrid, FiUsers, FiCalendar, FiClock, FiCheckSquare, FiMessageSquare, FiPieChart, FiSettings, FiTarget } from 'react-icons/fi'
import { MdOutlineRealEstateAgent } from 'react-icons/md'

export const agentNavigation = [
    { name: 'Overview', href: '/dashboard/agent', icon: FiHome },
    { name: 'Properties', href: '/dashboard/agent/properties', icon: FiGrid },
    { name: 'Leads', href: '/dashboard/agent/leads', icon: FiTarget, badge: 16 },
    { name: 'Inquiries', href: '/dashboard/agent/inquiries', icon: FiMessageSquare, badge: 8 },
    { name: 'Scheduled Visits', href: '/dashboard/agent/scheduled-visits', icon: FiCalendar, badge: 7 },
    { name: 'Buyers', href: '/dashboard/agent/buyers', icon: FiUsers },
    { name: 'Deals', href: '/dashboard/agent/deals', icon: MdOutlineRealEstateAgent },
    { name: 'Calendar', href: '/dashboard/agent/calendar', icon: FiCalendar },
    { name: 'Tasks', href: '/dashboard/agent/tasks', icon: FiCheckSquare },
    { name: 'Messages', href: '/dashboard/agent/messages', icon: FiMessageSquare, badge: 5 },
    { name: 'Reports', href: '/dashboard/agent/reports', icon: FiPieChart },
    { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
]
