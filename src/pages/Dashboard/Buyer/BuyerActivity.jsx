import ActivityFeed from '../../../components/dashboard/ActivityFeed'
import { FiCalendar, FiClock } from 'react-icons/fi'

// Placeholder activity items to populate the view all page
const activityItems = [
    {
        id: 1,
        type: 'visit_scheduled',
        title: 'Visit Scheduled',
        description: 'You scheduled a visit for "Skyline Apartments"',
        timestamp: '2 hours ago',
        date: 'Today, 10:30 AM',
        icon: FiCalendar
    },
    {
        id: 2,
        type: 'property_saved',
        title: 'Property Saved',
        description: 'You saved "Modern Villa in Madhapur" to your favorites',
        timestamp: '1 day ago',
        date: 'Yesterday, 4:15 PM'
    },
    {
        id: 3,
        type: 'inquiry_sent',
        title: 'Inquiry Sent',
        description: 'You sent an inquiry to Agent Sarah for "Sunset Views Penthouse"',
        timestamp: '3 days ago',
        date: 'Oct 24, 2023, 11:20 AM'
    }
]

export default function BuyerActivity() {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-2">Recent Activity</h1>
                <p className="text-surface-600 dark:text-surface-400">View all your recent interactions and updates.</p>
            </div>

            <div className="bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-3xl p-6 md:p-8">
                <ActivityFeed 
                    items={activityItems} 
                    emptyIcon={FiClock} 
                    emptyTitle="No recent activity" 
                    emptyMessage="When you interact with properties, agents, or lawyers, your activity will appear here." 
                />
            </div>
        </div>
    )
}
