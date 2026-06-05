import React, { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { formatPrice } from '../../hooks/formatPrice'
import InsightControls from './InsightControls'
import MapLegend from './MapLegend'
import HeatmapLayer from './HeatmapLayer'
import AmenitiesLayer from './AmenitiesLayer'
import FutureDevelopmentsLayer from './FutureDevelopmentsLayer'

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Default fallback: Hyderabad center
const FALLBACK_LAT = 17.3850;
const FALLBACK_LNG = 78.4867;

/**
 * Safely extract [lat, lng] from various coordinate formats:
 *   - Array: [lat, lng]
 *   - Object with lat/lng: { lat, lng }
 *   - Object with location sub-object: { location: { lat, lng } }
 *   - GeoJSON coordinates: { coordinates: [lng, lat] }
 * Returns null if no valid numeric coordinates can be extracted.
 */
function extractCoords(property) {
    let lat, lng;

    // Format 1: Array [lat, lng]
    if (Array.isArray(property?.coordinates)) {
        lat = property.coordinates[0];
        lng = property.coordinates[1];
    }
    // Format 2: Object { lat, lng }
    else if (property?.coordinates && typeof property.coordinates === 'object') {
        lat = property.coordinates.lat;
        lng = property.coordinates.lng;
    }
    // Format 3: location sub-object { location: { lat, lng } }
    else if (property?.location && typeof property.location === 'object') {
        lat = property.location.lat;
        lng = property.location.lng;
    }

    // Handle GeoJSON coordinates: [lng, lat] (if stored as nested coordinates array in location)
    if ((lat === undefined || lng === undefined) && Array.isArray(property?.location?.coordinates)) {
        lng = property.location.coordinates[0];
        lat = property.location.coordinates[1];
    }

    // Validate: must be finite numbers within valid geographic range
    if (typeof lat === 'number' && typeof lng === 'number' && isFinite(lat) && isFinite(lng)
        && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return [lat, lng];
    }

    return null;
}

// ─── Heatmap gradient configurations ────────────────────────────────────────
const HEATMAP_GRADIENTS = {
    'traffic': { 0.4: '#facc15', 0.6: '#f97316', 1.0: '#ea580c' },        // Orange/Yellow
    'price-trend': { 0.4: '#86efac', 0.6: '#22c55e', 1.0: '#15803d' },    // Green Scale
    'aqi': { 0.4: '#f97316', 0.6: '#d946ef', 1.0: '#c026d3' }             // Purple/Orange
};

export default function StaticMap({ properties = [], center = [17.4400, 78.3900], zoom = 11, className = 'h-[400px]', singleProperty = false }) {
    // Insights State Management
    const [activeLayers, setActiveLayers] = useState([]);
    const [loadingLayers, setLoadingLayers] = useState([]);
    const [cachedData, setCachedData] = useState({});

    // Safely resolve map center for single-property view
    let mapCenter = center;
    if (singleProperty && properties.length === 1) {
        const coords = extractCoords(properties[0]);
        console.log('[StaticMap] Single property location data:', properties[0]?.coordinates, properties[0]?.location);
        if (coords) {
            mapCenter = coords;
            console.log('[StaticMap] Resolved center:', mapCenter);
        } else {
            console.warn('[StaticMap] Invalid coordinates for single property, using fallback:', [FALLBACK_LAT, FALLBACK_LNG]);
            mapCenter = [FALLBACK_LAT, FALLBACK_LNG];
        }
    }

    const mapZoom = singleProperty ? 14 : zoom

    // Final validation: ensure mapCenter is always valid before rendering
    if (!Array.isArray(mapCenter) || mapCenter.length < 2
        || typeof mapCenter[0] !== 'number' || typeof mapCenter[1] !== 'number'
        || !isFinite(mapCenter[0]) || !isFinite(mapCenter[1])) {
        console.error('[StaticMap] mapCenter is invalid, falling back to default:', mapCenter);
        mapCenter = [FALLBACK_LAT, FALLBACK_LNG];
    }

    const handleToggleLayer = async (layerId) => {
        // Turn Layer Off
        if (activeLayers.includes(layerId)) {
            setActiveLayers(prev => prev.filter(id => id !== layerId));
            return;
        }

        // Turn Layer On
        setActiveLayers(prev => [...prev, layerId]);

        // Fetch mechanism with Cache prevention of duplicate network requests
        if (!cachedData[layerId]) {
            setLoadingLayers(prev => [...prev, layerId]);
            try {
                // Determine API environment dynamically
                const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/insights/${layerId}`;
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('API fetching failed');
                const data = await response.json();
                
                console.log(`[Insight fetch complete for ${layerId}] ->`, data);

                setCachedData(prev => ({
                    ...prev,
                    [layerId]: data // Stashes format (heatmap/geojson/markers) and data[]
                }));
            } catch (error) {
                console.error(`Failed to load ${layerId}`, error);
                // Optionally turn toggle gracefully off if failed
                setActiveLayers(prev => prev.filter(id => id !== layerId));
            } finally {
                setLoadingLayers(prev => prev.filter(id => id !== layerId));
            }
        }
    };

    // Memoize layer rendering to prevent duplicate marker issues
    const amenitiesData = useMemo(() => {
        if (!activeLayers.includes('amenities') || !cachedData['amenities']) return null;
        return cachedData['amenities'].data;
    }, [activeLayers, cachedData]);

    const developmentData = useMemo(() => {
        if (!activeLayers.includes('development') || !cachedData['development']) return null;
        return cachedData['development'].data;
    }, [activeLayers, cachedData]);

    return (
        <div className={`relative rounded-2xl overflow-hidden ${className}`}>
            
            {/* Absolute Overlays for Toggles & Legends */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-4 max-h-full overflow-y-auto pr-2 pointer-events-none pb-4">
                <InsightControls 
                    activeLayers={activeLayers} 
                    loadingLayers={loadingLayers} 
                    onToggleLayer={handleToggleLayer} 
                />
                <MapLegend activeLayers={activeLayers} />
            </div>

            {/* Base Leaflet Frame */}
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* 1. Render Existing Base Property Markers — with safe coordinate extraction */}
                {properties.map(property => {
                    const coords = extractCoords(property);
                    if (!coords) {
                        console.warn('[StaticMap] Skipping marker for property with invalid coords:', property.id || property._id, property.coordinates, property.location);
                        return null;
                    }

                    return (
                        <Marker key={`prop-${property.id || property._id}`} position={coords}>
                            <Popup>
                                <div className="min-w-[200px]">
                                    <img
                                        src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'}
                                        alt={property.title}
                                        className="w-full h-24 object-cover rounded-lg mb-2"
                                    />
                                    <h4 className="font-semibold text-sm">{property.title}</h4>
                                    <p className="text-xs text-gray-500 mb-1">{property.area || property.location?.city || 'Hyderabad'}</p>
                                    <p className="font-bold text-emerald-600">{formatPrice(property.price)}</p>
                                    <Link
                                        to={`/properties/${property.id || property._id}`}
                                        className="text-xs text-emerald-600 hover:underline mt-1 inline-block"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* 2. Dynamically Render Active Heatmap & GeoJSON Layers */}
                {activeLayers.map(layerId => {
                    // Skip marker-based layers — they're handled by dedicated components below
                    if (layerId === 'amenities' || layerId === 'development') return null;

                    const layerData = cachedData[layerId];
                    if (!layerData) return null;

                    if (layerData.format === 'heatmap') {
                        const baseOptions = { radius: 35, blur: 20, maxZoom: 15 };
                        const options = { ...baseOptions, gradient: HEATMAP_GRADIENTS[layerId] || HEATMAP_GRADIENTS['traffic'] };
                        return <HeatmapLayer key={`heat-${layerId}`} points={layerData.data} options={options} />
                    }

                    if (layerData.format === 'geojson') {
                        return (
                            <GeoJSON 
                                key={`geo-${layerId}`} 
                                data={layerData.data} 
                                style={{
                                    color: '#2563eb',
                                    weight: 2,
                                    opacity: 0.6,
                                    fillColor: '#3b82f6',
                                    fillOpacity: 0.3
                                }}
                            />
                        )
                    }

                    return null;
                })}

                {/* 3. Amenities Layer — Blue circular markers with category icons */}
                {amenitiesData && <AmenitiesLayer data={amenitiesData} />}

                {/* 4. Future Developments Layer — Amber diamond markers with construction icons */}
                {developmentData && <FutureDevelopmentsLayer data={developmentData} />}

            </MapContainer>
        </div>
    )
}
