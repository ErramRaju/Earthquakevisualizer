import { useState, useMemo } from 'react';
import { EarthquakeFeature, FilterState } from '../types/earthquake';
import {
  getMagnitudeColor,
  formatTime,
  getRelativeTime,
  formatDepth,
} from '../utils/earthquakeUtils';
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
  Clock,
} from 'lucide-react';

interface SidebarProps {
  earthquakes: EarthquakeFeature[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onRefresh: () => void;
  onEarthquakeSelect: (id: string) => void;
  loading: boolean;
  lastUpdated: Date | null;
  autoRefresh: boolean;
  onAutoRefreshToggle: () => void;
}

export const Sidebar = ({
  earthquakes,
  filters,
  onFiltersChange,
  onRefresh,
  onEarthquakeSelect,
  loading,
  lastUpdated,
  autoRefresh,
  onAutoRefreshToggle,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<'time' | 'magnitude'>('time');

  const sortedEarthquakes = useMemo(() => {
    return [...earthquakes].sort((a, b) => {
      if (sortBy === 'time') {
        return b.properties.time - a.properties.time;
      }
      return b.properties.mag - a.properties.mag;
    });
  }, [earthquakes, sortBy]);

  if (isCollapsed) {
    return (
      <div className="absolute top-4 left-4 z-[1000]">
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          aria-label="Open sidebar"
        >
          <ChevronRight size={24} className="text-gray-700" />
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full sm:w-80 md:w-96 bg-white shadow-xl z-[1000] flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Earthquakes
          </h2>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 hover:bg-white/50 rounded transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
        </div>
        {lastUpdated && (
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <Clock size={12} />
            Last updated: {getRelativeTime(lastUpdated.getTime())}
          </p>
        )}
      </div>

      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by location..."
            value={filters.searchTerm}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchTerm: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} />
            Min Magnitude: {filters.minMagnitude.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="8"
            step="0.1"
            value={filters.minMagnitude}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                minMagnitude: parseFloat(e.target.value),
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={onAutoRefreshToggle}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              autoRefresh
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('time')}
            className={`flex-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              sortBy === 'time'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sort by Time
          </button>
          <button
            onClick={() => setSortBy('magnitude')}
            className={`flex-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              sortBy === 'magnitude'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sort by Magnitude
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && earthquakes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500 text-center">
              <RefreshCw size={32} className="animate-spin mx-auto mb-2" />
              <p>Loading earthquakes...</p>
            </div>
          </div>
        ) : earthquakes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center px-4">
              No earthquakes found matching your filters.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedEarthquakes.map((eq) => {
              const color = getMagnitudeColor(eq.properties.mag);
              const depth = Math.abs(eq.geometry.coordinates[2]);

              return (
                <button
                  key={eq.id}
                  onClick={() => onEarthquakeSelect(eq.id)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors focus:bg-blue-50 focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span
                          className="font-bold text-lg"
                          style={{ color }}
                        >
                          M {eq.properties.mag.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getRelativeTime(eq.properties.time)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 mb-1 truncate">
                        {eq.properties.place}
                      </p>
                      <p className="text-xs text-gray-600">
                        Depth: {formatDepth(depth)}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
