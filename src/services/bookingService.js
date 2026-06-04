/**
 * Booking Service
 * Manages lawyer consultation bookings via LocalStorage.
 * Replace localStorage calls with API calls when backend is ready.
 */

const STORAGE_KEY = 'ue_lawyer_bookings'

function readBookings() {
    try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}

function writeBookings(bookings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

export function getBookings() {
    return readBookings()
}

export function getBookingById(id) {
    return readBookings().find(b => b.id === id) || null
}

export function getBookingsByLawyer(lawyerId) {
    return readBookings().filter(b => b.lawyerId === Number(lawyerId))
}

export function getBookingsByUser(userEmail) {
    return readBookings().filter(b => b.userEmail === userEmail)
}

export function addBooking(booking) {
    const bookings = readBookings()
    const newBooking = {
        ...booking,
        id: `bk_${Date.now()}`,
        status: 'Pending',
        createdAt: new Date().toISOString(),
    }
    bookings.unshift(newBooking) // newest first
    writeBookings(bookings)
    return newBooking
}

export function updateBookingStatus(id, status) {
    const bookings = readBookings()
    const index = bookings.findIndex(b => b.id === id)
    if (index === -1) return null
    bookings[index] = { ...bookings[index], status }
    writeBookings(bookings)
    return bookings[index]
}

export function deleteBooking(id) {
    const bookings = readBookings().filter(b => b.id !== id)
    writeBookings(bookings)
}
