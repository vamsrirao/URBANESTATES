/**
 * Format price in Indian Rupees with Lakhs/Crores notation
 */
export function formatPrice(price) {
    if (price >= 10000000) {
        const crores = price / 10000000
        return `₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(1)} Cr`
    }
    if (price >= 100000) {
        const lakhs = price / 100000
        return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} L`
    }
    return `₹${price.toLocaleString('en-IN')}`
}

/**
 * Format price in full Indian Rupees (₹1,25,00,000)
 */
export function formatPriceFull(price) {
    return `₹${price.toLocaleString('en-IN')}`
}
