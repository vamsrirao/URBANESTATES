import React from 'react';

/**
 * MapLegend — Dynamic map legend that reflects active insight layers.
 * 
 * Shows:
 *   - Gradient bars for heatmap layers (Traffic, AQI, Price Trends)
 *   - Blue circle icon for Amenities
 *   - Amber diamond icon for Future Developments
 *   - Blue polygon swatch for Flood Zones
 */
export default function MapLegend({ activeLayers }) {
    if (!activeLayers || activeLayers.length === 0) return null;

    const getLegendContent = (layerId) => {
        switch(layerId) {
            case 'traffic':
                return { title: 'Traffic Density', gradient: 'from-yellow-300 via-orange-500 to-orange-700', labels: ['Clear', 'Heavy'] };
            case 'aqi':
                return { title: 'Air Quality (AQI)', gradient: 'from-orange-400 via-fuchsia-500 to-purple-700', labels: ['Good', 'Poor'] };
            case 'price-trend':
                return { title: 'Price Trends', gradient: 'from-green-300 via-emerald-600 to-green-900', labels: ['Affordable', 'Expensive'] };
            case 'flood':
                return { title: 'Flood Risk Zones', type: 'polygon', color: 'bg-blue-500/50 border-blue-600' };
            case 'amenities':
                return { title: 'Amenities', type: 'amenity-marker' };
            case 'development':
                return { title: 'Future Developments', type: 'dev-marker' };
            default:
                return null;
        }
    };

    return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 min-w-[200px] pointer-events-auto">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 border-b pb-2">Map Legend</h4>
            <div className="space-y-4">
                {activeLayers.map(layerId => {
                    const content = getLegendContent(layerId);
                    if (!content) return null;

                    return (
                        <div key={layerId} className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-gray-600 flex items-center gap-2">
                                {/* Polygon swatch */}
                                {content.type === 'polygon' && <div className={`w-3 h-3 rounded-sm border ${content.color}`}></div>}
                                
                                {/* Amenity marker: Blue circle */}
                                {content.type === 'amenity-marker' && (
                                    <div 
                                        style={{
                                            width: '18px',
                                            height: '18px',
                                            borderRadius: '50%',
                                            background: '#dbeafe',
                                            border: '2px solid #2563eb',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            flexShrink: 0,
                                            boxShadow: '0 1px 3px rgba(37, 99, 235, 0.25)'
                                        }}
                                    >🏪</div>
                                )}

                                {/* Development marker: Amber diamond */}
                                {content.type === 'dev-marker' && (
                                    <div 
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            transform: 'rotate(45deg)',
                                            borderRadius: '3px',
                                            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                                            border: '2px solid #d97706',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            boxShadow: '0 1px 3px rgba(217, 119, 6, 0.25)'
                                        }}
                                    >
                                        <span style={{ transform: 'rotate(-45deg)', fontSize: '8px', lineHeight: 1 }}>🏗️</span>
                                    </div>
                                )}

                                {content.title}
                            </span>
                            
                            {/* Gradient bar for heatmap layers */}
                            {content.gradient && (
                                <div>
                                    <div className={`h-2 w-full rounded-full bg-gradient-to-r ${content.gradient}`}></div>
                                    <div className="flex justify-between mt-1 px-1">
                                        <span className="text-[10px] text-gray-500">{content.labels[0]}</span>
                                        <span className="text-[10px] text-gray-500">{content.labels[1]}</span>
                                    </div>
                                </div>
                            )}

                            {/* Description for marker-based layers */}
                            {content.type === 'amenity-marker' && (
                                <span className="text-[10px] text-blue-500 ml-5">
                                    Hospitals, Schools, Malls, Parks...
                                </span>
                            )}
                            {content.type === 'dev-marker' && (
                                <span className="text-[10px] text-amber-600 ml-5">
                                    Upcoming Projects & Construction
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
