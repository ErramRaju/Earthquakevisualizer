import { Info } from 'lucide-react';

export const Legend = () => {
  const magnitudeRanges = [
    { range: '7.0+', color: '#b91c1c', label: 'Major' },
    { range: '6.0-6.9', color: '#dc2626', label: 'Strong' },
    { range: '5.0-5.9', color: '#ea580c', label: 'Moderate' },
    { range: '4.0-4.9', color: '#f97316', label: 'Light' },
    { range: '3.0-3.9', color: '#fb923c', label: 'Minor' },
    { range: '2.0-2.9', color: '#fbbf24', label: 'Very Minor' },
    { range: '1.0-1.9', color: '#a3e635', label: 'Micro' },
    { range: '<1.0', color: '#22c55e', label: 'Ultra Micro' },
  ];

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-xl p-4 max-w-xs">
      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <Info size={16} />
        Magnitude Scale
      </h3>
      <div className="space-y-2">
        {magnitudeRanges.map(({ range, color, label }) => (
          <div key={range} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-600 flex-1">{range}</span>
            <span className="text-xs text-gray-500 font-medium">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
        Circle size indicates magnitude strength. Click markers for details.
      </p>
    </div>
  );
};
