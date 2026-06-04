/**
 * Visit Service
 * Manages property visit scheduling via LocalStorage.
 * Replace localStorage calls with API calls when backend is ready.
 */

const STORAGE_KEY = 'ue_property_visits'

function readVisits() {
    try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}

function writeVisits(visits) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visits))
}

export function getVisits() {
    return readVisits()
}

export function getVisitById(id) {
    return readVisits().find(v => v.id === id) || null
}

export function getVisitsByProperty(propertyId) {
    return readVisits().filter(v => v.propertyId === Number(propertyId))
}

export function getVisitsByUser(userEmail) {
    return readVisits().filter(v => v.userEmail === userEmail)
}

export function scheduleVisit({ propertyId, propertyTitle, userName, userEmail, date, time, agent }) {
    const visits = readVisits()
    const newVisit = {
        id: `vs_${Date.now()}`,
        propertyId: Number(propertyId),
        propertyTitle,
        userName,
        userEmail,
        date,
        time,
        assignedAgent: agent, // { name, phone, email, image }
        status: 'Scheduled',
        createdAt: new Date().toISOString(),
    }
    visits.push(newVisit)
    writeVisits(visits)
    return newVisit
}

export function cancelVisit(id) {
    const visits = readVisits()
    const index = visits.findIndex(v => v.id === id)
    if (index === -1) return
    visits[index] = { ...visits[index], status: 'Cancelled' }
    writeVisits(visits)
    return visits[index]
}

export function completeVisit(id) {
    const visits = readVisits()
    const index = visits.findIndex(v => v.id === id)
    if (index === -1) return
    visits[index] = { ...visits[index], status: 'Completed' }
    writeVisits(visits)
    return visits[index]
}
