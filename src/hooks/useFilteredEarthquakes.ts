import { useMemo } from 'react';
import { EarthquakeFeature, FilterState } from '../types/earthquake';

export const useFilteredEarthquakes = (
  earthquakes: EarthquakeFeature[],
  filters: FilterState
) => {
  return useMemo(() => {
    return earthquakes.filter((eq) => {
      const mag = eq.properties.mag;
      const depth = Math.abs(eq.geometry.coordinates[2]);
      const place = eq.properties.place.toLowerCase();

      if (mag < filters.minMagnitude) return false;

      if (filters.maxDepth !== null && depth > filters.maxDepth) return false;

      if (filters.searchTerm && !place.includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [earthquakes, filters]);
};
