export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude >= 7) return '#b91c1c';
  if (magnitude >= 6) return '#dc2626';
  if (magnitude >= 5) return '#ea580c';
  if (magnitude >= 4) return '#f97316';
  if (magnitude >= 3) return '#fb923c';
  if (magnitude >= 2) return '#fbbf24';
  if (magnitude >= 1) return '#a3e635';
  return '#22c55e';
};

export const getMagnitudeRadius = (magnitude: number): number => {
  const baseRadius = 5;
  const scale = 3;
  return baseRadius + magnitude * scale;
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
};

export const formatDepth = (depth: number): string => {
  return `${Math.abs(depth).toFixed(1)} km`;
};

export const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};
