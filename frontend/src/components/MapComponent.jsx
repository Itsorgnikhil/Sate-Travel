import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Circle, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Center between Jaipur and Delhi (approximate map center)
const defaultCenter = {
  lat: 27.7,
  lng: 76.5
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#000000" }, { lightness: 13 }]
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }]
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#144b53" }, { lightness: 14 }, { weight: 1.4 }]
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#08304b" }]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#0c4152" }, { lightness: 5 }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#0b434f" }, { lightness: 25 }]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.stroke",
      stylers: [{ color: "#0b3d51" }, { lightness: 16 }]
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: "#000000" }]
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ color: "#146474" }]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#021019" }]
    }
  ]
};

const getZoneColor = (status) => {
  switch (status) {
    case 'GREEN': return '#4ade80';
    case 'ORANGE': return '#fb923c';
    case 'RED': return '#f87171';
    default: return '#9ca3af';
  }
};

export default function MapComponent({ apiKey, zones, onZoneClick }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [map, setMap] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) return <div className="flex h-full w-full items-center justify-center text-white">Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={8} // Zoom out to see the route
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {zones.map(zone => (
        <Circle
          key={zone.id}
          center={{ lat: zone.location.lat, lng: zone.location.lng }}
          radius={5000} // Increase radius so it's visible on low zoom (8) along the highway
          options={{
            fillColor: getZoneColor(zone.status),
            fillOpacity: 0.35,
            strokeColor: getZoneColor(zone.status),
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
          onClick={() => {
            setSelectedZone(zone);
            onZoneClick(zone);
          }}
        />
      ))}

      {selectedZone && (
        <InfoWindow
          position={{ lat: selectedZone.location.lat, lng: selectedZone.location.lng }}
          onCloseClick={() => setSelectedZone(null)}
        >
          <div className="text-gray-900 p-2 min-w-[150px]">
            <h3 className="font-bold text-lg mb-1">{selectedZone.location.name}</h3>
            <p className="text-sm font-semibold" style={{ color: getZoneColor(selectedZone.status) }}>
              Status: {selectedZone.status}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Type: {selectedZone.location.type}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Last Updated: {new Date(selectedZone.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
