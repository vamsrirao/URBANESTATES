import React from 'react';
import { FiLoader } from 'react-icons/fi';

/**
 * InsightControls — Location Insights toggle panel.
 * 
 * Each layer has a color-coded indicator dot matching its visual representation on the map:
 *   - Flood Zones:    Blue polygon
 *   - Traffic:        Orange/Yellow heatmap  
 *   - Price Trends:   Green heatmap
 *   - Air Quality:    Purple heatmap
 *   - Amenities:      Blue circle markers
 *   - Future Devs:    Amber diamond markers
 */

const INDIVIDUAL_LAYERS = [
    { id: 'flood',       label: 'Flood Zones',     type: 'polygon',  color: '#3b82f6', icon: '🌊' },
    { id: 'traffic',     label: 'Traffic Density',  type: 'heatmap',  color: '#f97316', icon: '🚗' },
    { id: 'price-trend', label: 'Price Trends',     type: 'heatmap',  color: '#22c55e', icon: '📈' },
    { id: 'aqi',         label: 'Air Quality',      type: 'heatmap',  color: '#a855f7', icon: '🌬️' },
    { id: 'amenities',   label: 'Amenities',        type: 'marker',   color: '#2563eb', icon: '🏪' },
    { id: 'development', label: 'Future Devs',      type: 'marker',   color: '#d97706', icon: '🏗️' }
];

export default function InsightControls({ activeLayers, loadingLayers, onToggleLayer }) {
    return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 min-w-[220px] pointer-events-auto">
            <h3 className="font-semibold text-gray-800 mb-4 border-b pb-2">Location Insights</h3>
            
            <div className="space-y-4">
                {INDIVIDUAL_LAYERS.map((layer) => {
                    const isActive = activeLayers.includes(layer.id);
                    const isLoading = loadingLayers.includes(layer.id);
                    
                    return (
                        <div key={layer.id} className="flex items-center justify-between group">
                            <div 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => !isLoading && onToggleLayer(layer.id)}
                            >
                                {/* Color-coded indicator dot */}
                                <span 
                                    className="text-xs leading-none" 
                                    style={{ filter: isActive ? 'none' : 'grayscale(0.6) opacity(0.6)' }}
                                >
                                    {layer.icon}
                                </span>
                                <span className={`text-sm font-medium transition-colors ${
                                    isActive 
                                        ? 'text-gray-800' 
                                        : 'text-gray-600 group-hover:text-emerald-600'
                                }`}>
                                    {layer.label}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {isLoading && <FiLoader className="w-4 h-4 text-emerald-500 animate-spin" />}
                                <button
                                    disabled={isLoading}
                                    onClick={() => onToggleLayer(layer.id)}
                                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none`}
                                    style={{
                                        backgroundColor: isActive ? layer.color : '#d1d5db'
                                    }}
                                >
                                    <span 
                                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-5' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
