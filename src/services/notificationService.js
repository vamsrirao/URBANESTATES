/**
 * Notification Service
 * API service layer for in-app notifications.
 */

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/notifications`;

/**
 * Fetch current user's notifications
 */
export async function fetchNotifications(token) {
    try {
        const res = await fetch(`${API_BASE}/my`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to fetch notifications')
        return await res.json()
    } catch (error) {
        console.error('fetchNotifications error:', error)
        return { notifications: [], unreadCount: 0 }
    }
}

/**
 * Create a consultation booking notification for a lawyer
 */
export async function createConsultationNotification(data, token) {
    try {
        const res = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) {
            const err = await res.json()
            // 409 = duplicate, which is fine — don't throw
            if (res.status === 409) return { duplicate: true }
            throw new Error(err.message || 'Failed to create notification')
        }
        return await res.json()
    } catch (error) {
        console.error('createConsultationNotification error:', error)
        return null
    }
}

/**
 * Mark a single notification as read
 */
export async function markNotificationRead(id, token) {
    try {
        const res = await fetch(`${API_BASE}/${id}/read`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to mark notification as read')
        return await res.json()
    } catch (error) {
        console.error('markNotificationRead error:', error)
        return null
    }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsRead(token) {
    try {
        const res = await fetch(`${API_BASE}/read-all`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to mark all as read')
        return await res.json()
    } catch (error) {
        console.error('markAllNotificationsRead error:', error)
        return null
    }
}
