# Earthquake Visualizer

A real-time earthquake visualization web application that displays recent seismic activity from the last 24 hours using data from the USGS Earthquake API. Built with React, react-leaflet, and Tailwind CSS.

![Earthquake Visualizer](https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Live Demo

**[View Live Application](#)** _(https://t5crqr-5173.csb.app/)_

## Features

### Core Functionality
- **Interactive Map**: Full-screen Leaflet map with OpenStreetMap tiles
- **Real-time Data**: Fetches earthquake data from USGS (updated every minute)
- **Smart Markers**: Color-coded and size-scaled based on magnitude
  - Green: <1.0 magnitude
  - Yellow: 1.0-2.9 magnitude
  - Orange: 3.0-4.9 magnitude
  - Red: 5.0+ magnitude
- **Marker Clustering**: Automatic clustering for overlapping markers
- **Detailed Popups**: Click markers to view:
  - Magnitude
  - Location
  - Depth
  - Timestamp (formatted in local timezone)
  - Direct link to USGS event page

### Sidebar Controls
- **Search**: Filter earthquakes by location name
- **Magnitude Filter**: Slider to set minimum magnitude (0.0-8.0)
- **Sortable List**: Sort by time or magnitude
- **Auto-refresh**: Toggle automatic data refresh every 5 minutes
- **Manual Refresh**: On-demand data updates
- **Collapsible**: Hide sidebar for full map view

### Analytics Dashboard
- Total earthquake count (last 24 hours)
- Count of significant events (magnitude 4.0+)
- Strongest earthquake magnitude

### Legend
- Visual guide to magnitude color coding
- Explains marker sizing logic

### UX & Accessibility
- Fully responsive design (mobile, tablet, desktop)
- Keyboard-accessible controls
- Loading states and error handling
- Smooth animations and transitions

## Tech Stack

- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **react-leaflet 4.x** - Map component library
- **Leaflet** - Interactive maps
- **react-leaflet-cluster** - Marker clustering
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library

## Installation & Local Development

### Prerequisites
- Node.js 16+ and npm

### Setup
```bash
# Clone or download the project
cd earthquake-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript compiler check

## Build & Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to CodeSandbox
1. Create a new sandbox at [codesandbox.io](https://codesandbox.io)
2. Import this repository or upload the project files
3. CodeSandbox will automatically detect Vite and run the dev server
4. Share the generated URL


## Design Decisions

### Mapping Approach
- **Color Scale**: Used a green-yellow-orange-red gradient to intuitively represent earthquake severity, following common seismic visualization conventions
- **Marker Sizing**: Radius scales proportionally with magnitude to provide immediate visual feedback about event strength
- **Clustering**: Implemented react-leaflet-cluster to handle high-density areas (e.g., Pacific Ring of Fire) and maintain performance with hundreds of markers

### Data Architecture
- **Custom Hooks**: Separated data fetching (`useEarthquakes`) and filtering (`useFilteredEarthquakes`) logic for reusability and testing
- **Debouncing**: Built-in React state updates are batched; search filter uses controlled inputs for immediate feedback
- **Auto-refresh**: Optional 5-minute interval balances data freshness with API courtesy

### Performance
- **Lazy Rendering**: Only visible markers are rendered by Leaflet
- **Memoization**: `useMemo` for filtered/sorted lists prevents unnecessary recalculations
- **Optimized Clustering**: Marker cluster configuration reduces DOM nodes

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive controls
- Keyboard navigation support for popups
- Color contrast meets WCAG AA standards
- Focus states on all interactive elements


**Code Organization**:
```
src/
├── components/        # UI components
│   ├── MapView.tsx
│   ├── EarthquakeMarkers.tsx
│   ├── Sidebar.tsx
│   ├── Analytics.tsx
│   └── Legend.tsx
├── hooks/            # Custom React hooks
│   ├── useEarthquakes.ts
│   └── useFilteredEarthquakes.ts
├── types/            # TypeScript definitions
│   └── earthquake.ts
├── utils/            # Helper functions
│   └── earthquakeUtils.ts
└── App.tsx           # Main application
```

## Data Source

**USGS Earthquake API**
Endpoint: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`

- No authentication required
- Updates every minute
- Returns GeoJSON format
- Covers all earthquakes in the last 24 hours globally

## Future Enhancements

- Heatmap toggle view
- Depth-based filtering
- Historical data comparison
- Export to CSV/GeoJSON
- Custom date range selection
- Multi-language support
- Dark mode

## License

MIT License - Free to use for educational and commercial purposes

## Acknowledgments

- **USGS** for providing free, real-time earthquake data
- **OpenStreetMap** contributors for map tiles
- **Leaflet** and **react-leaflet** communities

---

**Target Audience**: Geography students, researchers, and anyone interested in seismic activity visualization

**Project Goal**: Provide an intuitive, educational tool for understanding global earthquake patterns
