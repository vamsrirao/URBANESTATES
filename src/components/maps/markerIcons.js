import L from 'leaflet';

/**
 * markerIcons.js — Reusable Leaflet DivIcon Marker Factory
 * 
 * Creates visually distinct SVG-based markers for each insight layer.
 * Uses shape + color + icon differentiation for accessibility (colorblind-safe).
 * 
 * Amenities:    Blue circle markers with category-specific icons
 * Future Devs:  Amber diamond markers with construction icons
 */

// ─── Amenity Category Icons (SVG paths for inline rendering) ────────────────
const AMENITY_ICONS = {
    hospital:  '🏥',
    school:    '🏫',
    mall:      '🛒',
    park:      '🌳',
    restaurant:'🍽️',
    bank:      '🏦',
    gym:       '💪',
    pharmacy:  '💊',
    default:   '🏪'
};

const DEVELOPMENT_ICONS = {
    tech:      '💻',
    residential:'🏗️',
    commercial: '🏢',
    transport:  '🚇',
    default:    '🔨'
};

// ─── Amenity Category Colors (for sub-type differentiation within blue family) ──
const AMENITY_CATEGORY_COLORS = {
    hospital:   { bg: '#dbeafe', border: '#2563eb', dot: '#1d4ed8' },   // Blue
    school:     { bg: '#e0e7ff', border: '#4f46e5', dot: '#4338ca' },   // Indigo
    mall:       { bg: '#cffafe', border: '#0891b2', dot: '#0e7490' },   // Cyan
    park:       { bg: '#d1fae5', border: '#059669', dot: '#047857' },   // Emerald tint
    restaurant: { bg: '#dbeafe', border: '#3b82f6', dot: '#2563eb' },   // Blue
    bank:       { bg: '#e0e7ff', border: '#6366f1', dot: '#4f46e5' },   // Indigo
    gym:        { bg: '#dbeafe', border: '#2563eb', dot: '#1e40af' },   // Blue
    pharmacy:   { bg: '#ede9fe', border: '#7c3aed', dot: '#6d28d9' },   // Violet
    default:    { bg: '#dbeafe', border: '#2563eb', dot: '#1d4ed8' }    // Blue fallback
};

/**
 * Creates a custom DivIcon for Amenity markers.
 * Shape: Rounded circle — distinct from development diamonds.
 * Color: Blue family with category-specific tints.
 */
export function createAmenityMarker(category = 'default') {
    const cat = category?.toLowerCase() || 'default';
    const icon = AMENITY_ICONS[cat] || AMENITY_ICONS.default;
    const colors = AMENITY_CATEGORY_COLORS[cat] || AMENITY_CATEGORY_COLORS.default;

    return L.divIcon({
        className: 'custom-amenity-marker',
        html: `
            <div style="
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: ${colors.bg};
                border: 2.5px solid ${colors.border};
                box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35), 0 0 0 2px rgba(37, 99, 235, 0.1);
                font-size: 16px;
                cursor: pointer;
                transition: transform 0.15s ease;
            ">
                <span style="line-height: 1;">${icon}</span>
            </div>
            <div style="
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0; height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 7px solid ${colors.border};
            "></div>
        `,
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -44]
    });
}

/**
 * Creates a custom DivIcon for Future Development markers.
 * Shape: Rotated diamond (45° square) — distinct from amenity circles.
 * Color: Amber/Orange family.
 */
export function createFutureDevMarker(subtype = 'default') {
    const sub = subtype?.toLowerCase() || 'default';
    const icon = DEVELOPMENT_ICONS[sub] || DEVELOPMENT_ICONS.default;

    return L.divIcon({
        className: 'custom-dev-marker',
        html: `
            <div style="
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                transform: rotate(45deg);
                border-radius: 6px;
                background: linear-gradient(135deg, #fef3c7, #fde68a);
                border: 2.5px solid #d97706;
                box-shadow: 0 2px 8px rgba(217, 119, 6, 0.35), 0 0 0 2px rgba(217, 119, 6, 0.1);
                cursor: pointer;
                transition: transform 0.15s ease;
            ">
                <span style="transform: rotate(-45deg); font-size: 16px; line-height: 1;">${icon}</span>
            </div>
            <div style="
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0; height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 7px solid #d97706;
            "></div>
        `,
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -44]
    });
}

/**
 * Infers amenity category from the title string.
 * Used when the backend doesn't provide explicit category data.
 */
export function inferAmenityCategory(title = '') {
    const t = title.toLowerCase();
    if (t.includes('hospital') || t.includes('clinic') || t.includes('medical')) return 'hospital';
    if (t.includes('school') || t.includes('university') || t.includes('college') || t.includes('education')) return 'school';
    if (t.includes('mall') || t.includes('shopping') || t.includes('retail')) return 'mall';
    if (t.includes('park') || t.includes('garden') || t.includes('green')) return 'park';
    if (t.includes('restaurant') || t.includes('food') || t.includes('cafe') || t.includes('dining')) return 'restaurant';
    if (t.includes('bank') || t.includes('atm') || t.includes('finance')) return 'bank';
    if (t.includes('gym') || t.includes('fitness') || t.includes('sports')) return 'gym';
    if (t.includes('pharmacy') || t.includes('drug') || t.includes('chemist')) return 'pharmacy';
    return 'default';
}

/**
 * Infers development subtype from the title string.
 */
export function inferDevSubtype(title = '') {
    const t = title.toLowerCase();
    if (t.includes('tech') || t.includes('it ') || t.includes('software') || t.includes('digital')) return 'tech';
    if (t.includes('residential') || t.includes('housing') || t.includes('villa') || t.includes('apartment')) return 'residential';
    if (t.includes('commercial') || t.includes('office') || t.includes('business')) return 'commercial';
    if (t.includes('metro') || t.includes('transport') || t.includes('railway') || t.includes('road')) return 'transport';
    return 'default';
}

// ─── Exports for Legend usage ───────────────────────────────────────────────
export const AMENITY_LEGEND_COLOR = { bg: '#dbeafe', border: '#2563eb' };
export const DEV_LEGEND_COLOR = { bg: '#fef3c7', border: '#d97706' };
