import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { EarthquakeData, EarthquakeFeature } from '../types/earthquake';

const USGS_ENDPOINT = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export const useEarthquakes = (autoRefreshInterval?: number) => {
  const [earthquakes, setEarthquakes] = useState<EarthquakeFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchEarthquakes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<EarthquakeData>(USGS_ENDPOINT);
      setEarthquakes(response.data.features);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch earthquake data');
      console.error('Error fetching earthquakes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  useEffect(() => {
    if (autoRefreshInterval && autoRefreshInterval > 0) {
      const interval = setInterval(fetchEarthquakes, autoRefreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefreshInterval, fetchEarthquakes]);

  return {
    earthquakes,
    loading,
    error,
    lastUpdated,
    refresh: fetchEarthquakes,
  };
};
