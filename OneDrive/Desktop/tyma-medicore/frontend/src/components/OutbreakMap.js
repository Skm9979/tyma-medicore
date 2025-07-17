import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultCenter = [35.8617, 104.1954]; // Center of China
const defaultZoom = 4;

// Animated pulsing marker icon
const createPulsingIcon = (color) => L.divIcon({
  className: 'pulsing-marker',
  html: `<span class="relative flex h-6 w-6"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75"></span><span class="relative inline-flex rounded-full h-6 w-6 bg-${color}-600"></span></span>`
});

// Geocode location names to lat/lng using OpenStreetMap Nominatim
const geocodeLocation = async (location) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  return defaultCenter;
};

const OutbreakMap = ({ healthData, predictions }) => {
  const [coordsMap, setCoordsMap] = useState({});

  // Geocode all unique locations
  useEffect(() => {
    const uniqueLocations = Array.from(new Set(healthData.map(e => e.location)));
    const fetchCoords = async () => {
      const newCoords = {};
      for (const loc of uniqueLocations) {
        if (!coordsMap[loc]) {
          newCoords[loc] = await geocodeLocation(loc);
        } else {
          newCoords[loc] = coordsMap[loc];
        }
      }
      setCoordsMap(newCoords);
    };
    if (uniqueLocations.length > 0) fetchCoords();
    // eslint-disable-next-line
  }, [healthData]);

  const getRisk = (disease, location) => {
    const found = predictions.find(p => p.disease === disease && p.location === location);
    return found ? found.risk : 'Low';
  };

  const riskColor = {
    'High': 'red',
    'Low': 'green',
  };

  return (
    <div className="w-full h-[340px] rounded-xl overflow-hidden">
      <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: 340, width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {healthData.map((entry, idx) => {
          const coords = coordsMap[entry.location] || defaultCenter;
          const risk = getRisk(entry.disease, entry.location);
          const color = risk === 'High' ? 'red' : 'green';
          return (
            <Marker
              key={idx}
              position={coords}
              icon={createPulsingIcon(color)}
            >
              <Popup>
                <div className="text-base font-bold mb-1">{entry.disease} in {entry.location}</div>
                <div>Cases: {entry.cases}</div>
                <div className={`font-semibold ${risk === 'High' ? 'text-red-600' : 'text-green-600'}`}>Risk: {risk}</div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default OutbreakMap; 