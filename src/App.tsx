import { useState } from 'react';
import { MapView } from './components/MapView';
import { EarthquakeMarkers } from './components/EarthquakeMarkers';
import { Sidebar } from './components/Sidebar';
import { Analytics } from './components/Analytics';
import { Legend } from './components/Legend';
import { useEarthquakes } from './hooks/useEarthquakes';
import { useFilteredEarthquakes } from './hooks/useFilteredEarthquakes';
import { FilterState } from './types/earthquake';
import { AlertCircle } from 'lucide-react';

function App() {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedEarthquakeId, setSelectedEarthquakeId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    minMagnitude: 0,
    maxDepth: null,
    searchTerm: '',
  });

  const { earthquakes, loading, error, lastUpdated, refresh } = useEarthquakes(
    autoRefresh ? 5 * 60 * 1000 : undefined
  );

  const filteredEarthquakes = useFilteredEarthquakes(earthquakes, filters);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <AlertCircle size={24} />
            <h2 className="text-xl font-bold">Error Loading Data</h2>
          </div>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <MapView>
        <EarthquakeMarkers
          earthquakes={filteredEarthquakes}
          selectedEarthquakeId={selectedEarthquakeId}
        />
      </MapView>
      <Sidebar
        earthquakes={filteredEarthquakes}
        filters={filters}
        onFiltersChange={setFilters}
        onRefresh={refresh}
        onEarthquakeSelect={setSelectedEarthquakeId}
        loading={loading}
        lastUpdated={lastUpdated}
        autoRefresh={autoRefresh}
        onAutoRefreshToggle={() => setAutoRefresh(!autoRefresh)}
      />
      <Legend />
      <Analytics earthquakes={filteredEarthquakes} />
    </div>
  );
}

export default App;
