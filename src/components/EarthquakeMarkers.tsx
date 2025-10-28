import { CircleMarker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { EarthquakeFeature } from '../types/earthquake';
import {
  getMagnitudeColor,
  getMagnitudeRadius,
  formatTime,
  formatDepth,
} from '../utils/earthquakeUtils';
import { ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

interface EarthquakeMarkersProps {
  earthquakes: EarthquakeFeature[];
  selectedEarthquakeId?: string | null;
}

export const EarthquakeMarkers = ({
  earthquakes,
  selectedEarthquakeId,
}: EarthquakeMarkersProps) => {
  const map = useMap();

  useEffect(() => {
    if (selectedEarthquakeId) {
      const selected = earthquakes.find((eq) => eq.id === selectedEarthquakeId);
      if (selected) {
        const [lng, lat] = selected.geometry.coordinates;
        map.flyTo([lat, lng], 6, { duration: 1 });
      }
    }
  }, [selectedEarthquakeId, earthquakes, map]);

  return (
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={50}
      spiderfyOnMaxZoom={true}
      showCoverageOnHover={false}
    >
      {earthquakes.map((earthquake) => {
        const { properties, geometry, id } = earthquake;
        const [lng, lat, depth] = geometry.coordinates;
        const color = getMagnitudeColor(properties.mag);
        const radius = getMagnitudeRadius(properties.mag);

        return (
          <CircleMarker
            key={id}
            center={[lat, lng]}
            radius={radius}
            pathOptions={{
              fillColor: color,
              color: color,
              weight: 2,
              opacity: 0.8,
              fillOpacity: 0.6,
            }}
          >
            <Popup className="earthquake-popup" maxWidth={300}>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  Magnitude {properties.mag.toFixed(1)}
                </h3>
                <div className="space-y-1.5 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Location:</span>
                    <p className="text-gray-600 mt-0.5">{properties.place}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Depth:</span>
                    <span className="text-gray-600 ml-2">{formatDepth(depth)}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Time:</span>
                    <p className="text-gray-600 mt-0.5">{formatTime(properties.time)}</p>
                  </div>
                  <a
                    href={properties.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium mt-2"
                  >
                    View Details on USGS
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MarkerClusterGroup>
  );
};
