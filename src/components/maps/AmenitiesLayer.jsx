import React, { useMemo } from 'react';
import { Marker, Popup, Tooltip, LayerGroup } from 'react-leaflet';
import { createAmenityMarker, inferAmenityCategory } from './markerIcons';

/**
 * AmenitiesLayer — Renders amenity markers in an isolated LayerGroup.
 * 
 * Features:
 *   - Blue circular markers with category-specific icons
 *   - Category inference from title when backend doesn't provide explicit category
 *   - Hover tooltip with quick label
 *   - Detailed popup with type badge
 *   - Memoized marker icons to prevent re-creation on re-render
 */
export default function AmenitiesLayer({ data }) {
    // Memoize marker data to prevent unnecessary re-renders
    const markers = useMemo(() => {
        if (!data || !data.length) return [];
        return data.map((item, idx) => {
            const category = item.category || inferAmenityCategory(item.title);
            return {
                ...item,
                category,
                icon: createAmenityMarker(category),
                key: `amenity-${idx}-${item.lat}-${item.lng}`
            };
        });
    }, [data]);

    if (!markers.length) return null;

    return (
        <LayerGroup>
            {markers.map(marker => (
                <Marker
                    key={marker.key}
                    position={[marker.lat, marker.lng]}
                    icon={marker.icon}
                >
                    <Tooltip 
                        direction="top" 
                        offset={[0, -44]} 
                        opacity={0.95}
                        className="custom-tooltip-amenity"
                    >
                        <span style={{ fontWeight: 600, color: '#2563eb' }}>🏪 {marker.title}</span>
                    </Tooltip>

                    <Popup>
                        <div style={{ minWidth: '200px', padding: '4px 0' }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                marginBottom: '8px' 
                            }}>
                                <div style={{
                                    background: '#dbeafe',
                                    border: '2px solid #2563eb',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '16px',
                                    flexShrink: 0
                                }}>🏪</div>
                                <div>
                                    <h4 style={{ 
                                        margin: 0, 
                                        fontWeight: 700, 
                                        fontSize: '14px', 
                                        color: '#1e293b' 
                                    }}>{marker.title}</h4>
                                    <span style={{
                                        display: 'inline-block',
                                        background: '#dbeafe',
                                        color: '#2563eb',
                                        fontSize: '10px',
                                        fontWeight: 600,
                                        padding: '2px 8px',
                                        borderRadius: '9999px',
                                        textTransform: 'capitalize',
                                        marginTop: '2px'
                                    }}>
                                        {marker.category === 'default' ? 'Amenity' : marker.category}
                                    </span>
                                </div>
                            </div>
                            
                            {marker.description && (
                                <p style={{ 
                                    margin: '0 0 6px', 
                                    fontSize: '12px', 
                                    color: '#64748b',
                                    lineHeight: '1.4'
                                }}>{marker.description}</p>
                            )}

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginTop: '6px',
                                padding: '4px 8px',
                                background: '#f1f5f9',
                                borderRadius: '6px',
                                fontSize: '11px',
                                color: '#475569'
                            }}>
                                <span>📍</span>
                                <span>Nearby Amenity</span>
                                {marker.severity && (
                                    <span style={{
                                        marginLeft: 'auto',
                                        background: marker.severity === 'high' ? '#dcfce7' : marker.severity === 'medium' ? '#fef9c3' : '#f1f5f9',
                                        color: marker.severity === 'high' ? '#16a34a' : marker.severity === 'medium' ? '#ca8a04' : '#64748b',
                                        padding: '1px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 600,
                                        textTransform: 'capitalize',
                                        fontSize: '10px'
                                    }}>
                                        {marker.severity} relevance
                                    </span>
                                )}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </LayerGroup>
    );
}
