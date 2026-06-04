import React, { useMemo } from 'react';
import { Marker, Popup, Tooltip, LayerGroup } from 'react-leaflet';
import { createFutureDevMarker, inferDevSubtype } from './markerIcons';

/**
 * FutureDevelopmentsLayer — Renders future development markers in an isolated LayerGroup.
 * 
 * Features:
 *   - Amber diamond-shaped markers (distinct from circular amenity markers)
 *   - Subtype inference from title
 *   - Hover tooltip with quick label
 *   - Detailed popup with project name, description, and expected completion
 *   - Memoized icons to prevent re-creation on re-render
 */
export default function FutureDevelopmentsLayer({ data }) {
    // Memoize marker data to prevent unnecessary re-renders
    const markers = useMemo(() => {
        if (!data || !data.length) return [];
        return data.map((item, idx) => {
            const subtype = item.subtype || inferDevSubtype(item.title);
            return {
                ...item,
                subtype,
                icon: createFutureDevMarker(subtype),
                key: `dev-${idx}-${item.lat}-${item.lng}`
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
                        className="custom-tooltip-dev"
                    >
                        <span style={{ fontWeight: 600, color: '#d97706' }}>🏗️ {marker.title}</span>
                    </Tooltip>

                    <Popup>
                        <div style={{ minWidth: '220px', padding: '4px 0' }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                marginBottom: '8px' 
                            }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                                    border: '2px solid #d97706',
                                    borderRadius: '6px',
                                    transform: 'rotate(45deg)',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <span style={{ transform: 'rotate(-45deg)', fontSize: '14px' }}>🏗️</span>
                                </div>
                                <div>
                                    <h4 style={{ 
                                        margin: 0, 
                                        fontWeight: 700, 
                                        fontSize: '14px', 
                                        color: '#1e293b' 
                                    }}>{marker.title}</h4>
                                    <span style={{
                                        display: 'inline-block',
                                        background: '#fef3c7',
                                        color: '#b45309',
                                        fontSize: '10px',
                                        fontWeight: 600,
                                        padding: '2px 8px',
                                        borderRadius: '9999px',
                                        textTransform: 'capitalize',
                                        marginTop: '2px'
                                    }}>
                                        {marker.subtype === 'default' ? 'Development' : marker.subtype} Project
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
                                flexDirection: 'column',
                                gap: '4px',
                                marginTop: '6px',
                                padding: '6px 8px',
                                background: '#fffbeb',
                                borderRadius: '6px',
                                border: '1px solid #fde68a',
                                fontSize: '11px',
                                color: '#92400e'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span>📋</span>
                                    <span style={{ fontWeight: 600 }}>Future Development</span>
                                </div>
                                {marker.expectedCompletion && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span>📅</span>
                                        <span>Expected: <strong>{marker.expectedCompletion}</strong></span>
                                    </div>
                                )}
                                {marker.severity && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span>⚡</span>
                                        <span>Impact: <strong style={{ textTransform: 'capitalize' }}>{marker.severity}</strong></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </LayerGroup>
    );
}
