import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

export default function HeatmapLayer({ points, options }) {
    const map = useMap();

    useEffect(() => {
        if (!points || !points.length) return;

        // Convert [{lat, lng, intensity}] to array format [lat, lng, intensity] for leaflet.heat
        const heatPoints = points.map(p => [p.lat, p.lng, p.intensity]);
        
        console.log(`[HeatmapLayer Rendering] Array sample:`, heatPoints[0], `Total points:`, heatPoints.length);

        // Ensure options fallbacks
        const heatOptions = {
            radius: 25,
            blur: 15,
            maxZoom: 15,
            ...options
        };

        const heatLayer = L.heatLayer(heatPoints, heatOptions).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, points, options]);

    return null;
}
