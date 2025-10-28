import { useMemo } from 'react';
import { EarthquakeFeature } from '../types/earthquake';
import { Activity, AlertTriangle, TrendingUp } from 'lucide-react';

interface AnalyticsProps {
  earthquakes: EarthquakeFeature[];
}

export const Analytics = ({ earthquakes }: AnalyticsProps) => {
  const stats = useMemo(() => {
    const total = earthquakes.length;
    const significant = earthquakes.filter((eq) => eq.properties.mag >= 4.0).length;
    const strongest = earthquakes.reduce(
      (max, eq) => (eq.properties.mag > max ? eq.properties.mag : max),
      0
    );

    return { total, significant, strongest };
  }, [earthquakes]);

  return (
    <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-lg shadow-xl p-4 max-w-xs">
      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <Activity size={16} />
        Statistics (Last 24h)
      </h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Events:</span>
          <span className="font-bold text-blue-600">{stats.total}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <AlertTriangle size={14} className="text-orange-500" />
            Magnitude 4.0+:
          </span>
          <span className="font-bold text-orange-600">{stats.significant}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <TrendingUp size={14} className="text-red-500" />
            Strongest:
          </span>
          <span className="font-bold text-red-600">
            M {stats.strongest.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
