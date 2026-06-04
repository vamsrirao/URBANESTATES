/**
 * Lawyer Service
 * Abstraction layer for lawyer data access.
 * Currently uses mock data — replace with API calls when backend is ready.
 */
import lawyers from '../data/lawyers'

export function getLawyers() {
    return lawyers
}

export function getLawyerById(id) {
    return lawyers.find(l => l.id === Number(id)) || null
}

export function getLawyersBySpecialization(specialization) {
    if (!specialization || specialization === 'All Specializations') {
        return lawyers
    }
    return lawyers.filter(l => l.specialization === specialization)
}

export function searchLawyers(query) {
    const q = query.toLowerCase().trim()
    if (!q) return lawyers
    return lawyers.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.specialization.toLowerCase().includes(q) ||
        l.bio.toLowerCase().includes(q)
    )
}
