/**
 * Verification Service
 * Manages property verification status via LocalStorage.
 * Replace localStorage calls with API calls when backend is ready.
 */

const STORAGE_KEY = 'ue_verified_properties'

function readVerifications() {
    try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}

function writeVerifications(verifications) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(verifications))
}

export function getVerifiedProperties() {
    return readVerifications()
}

export function isPropertyVerified(propertyId) {
    return readVerifications().some(v => v.propertyId === Number(propertyId))
}

export function getVerificationDetails(propertyId) {
    return readVerifications().find(v => v.propertyId === Number(propertyId)) || null
}

export function verifyProperty(propertyId, lawyerId, lawyerName, notes = '') {
    const verifications = readVerifications()
    // Don't duplicate
    if (verifications.some(v => v.propertyId === Number(propertyId))) {
        return verifications.find(v => v.propertyId === Number(propertyId))
    }
    const record = {
        propertyId: Number(propertyId),
        lawyerId: Number(lawyerId),
        lawyerName,
        verifiedAt: new Date().toISOString(),
        notes,
    }
    verifications.push(record)
    writeVerifications(verifications)
    return record
}

export function revokeVerification(propertyId) {
    const verifications = readVerifications().filter(v => v.propertyId !== Number(propertyId))
    writeVerifications(verifications)
}
