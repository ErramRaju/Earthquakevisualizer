🌍 Earthquake Visualizer

A real-time, interactive web application that visualizes global seismic activity from the last 24 hours using data from the USGS Earthquake API.
Built with React, TypeScript, Vite, Leaflet, and Tailwind CSS.

🚀 Live Demo

🔗 View Live Application
 (Add your deployed URL after hosting on Vercel/Netlify)

🧠 Overview

Earthquake Visualizer provides an intuitive, map-based interface for exploring real-time global earthquake data. It fetches live data from the USGS GeoJSON API, plots events on an interactive Leaflet map, and provides smart filtering, clustering, and detailed analytics.

✨ Features
🌐 Core Functionality

Interactive Map – Full-screen Leaflet map with OpenStreetMap tiles

Real-time Data – Fetches updated earthquake data every minute

Smart Markers – Size and color scale based on magnitude:

🟢 < 1.0

🟡 1.0 – 2.9

🟠 3.0 – 4.9

🔴 5.0+

Marker Clustering – Automatic grouping for dense regions

Detailed Popups – View magnitude, depth, time, and USGS link

🧭 Sidebar Controls

🔍 Search by Location

🎚️ Magnitude Filter (0.0 – 8.0)

🕒 Sort by Time or Magnitude

♻️ Auto-Refresh Toggle (every 5 minutes)

🔄 Manual Refresh Button

🧩 Collapsible Sidebar for Full Map View

📊 Analytics Dashboard

Total earthquakes (24h)

Count of significant events (≥4.0 magnitude)

Strongest quake magnitude

🧾 Legend

Explains color codes and marker radius scaling

🧍 Accessibility & UX

Fully responsive design

Keyboard-accessible navigation

WCAG-compliant color contrast

Smooth transitions and loading animations

🛠️ Tech Stack
Category	Technology
Frontend	React 18.3, TypeScript, Vite
Mapping	Leaflet, React-Leaflet, React-Leaflet-Cluster
Styling	Tailwind CSS, Lucide React (Icons)
Data Fetching	Axios
API	USGS Earthquake Feed (GeoJSON)
⚙️ Installation & Setup
Prerequisites

Node.js 16+

npm or yarn

Steps
# Clone the repo
git clone https://github.com/<your-username>/earthquake-visualizer.git
cd earthquake-visualizer

# Install dependencies
npm install

# Run locally
npm run dev


Now visit ➜ http://localhost:5173

🧩 Project Structure
src/
├── components/
│   ├── MapView.tsx
│   ├── EarthquakeMarkers.tsx
│   ├── Sidebar.tsx
│   ├── Analytics.tsx
│   └── Legend.tsx
├── hooks/
│   ├── useEarthquakes.ts
│   └── useFilteredEarthquakes.ts
├── types/
│   └── earthquake.ts
├── utils/
│   └── earthquakeUtils.ts
└── App.tsx

🌍 Data Source

USGS Earthquake API
🔗 https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

Updated every minute

No authentication required

Global coverage

Returns GeoJSON format

📦 Build & Deployment
Local Build
npm run build


Build output in /dist for production.

Deploy Options

🌐 CodeSandbox / StackBlitz – Instant preview

🚀 Netlify / Vercel – One-command deploy

vercel --prod
# or
netlify deploy --prod

🧱 Design & Architecture
Mapping Design

Color Coding: Follows seismic severity gradient (Green → Red)

Marker Radius: Scales proportionally to magnitude

Clustering: Efficiently renders high-density data zones

Data Flow

useEarthquakes → Fetches & caches data

useFilteredEarthquakes → Applies search & filter logic

Components subscribe to hooks for live updates

Performance

useMemo for optimized filtering

Lazy rendering of markers

Clustered DOM management for 1000+ data points

🧪 Development Scripts
Command	Description
npm run dev	Start local dev server
npm run build	Build for production
npm run preview	Preview build locally
npm run lint	Run ESLint checks
npm run typecheck	Run TypeScript compiler
📚 Take-Home Deliverables
Level 1 – AI-Assisted Development

ChatGPT-assisted architecture planning & boilerplate

Tailwind & Leaflet integration suggestions

Custom hooks + TypeScript interface design

Level 2 – Live Demo

Fully deployed React + Vite app

Interactive real-time map

Sidebar filtering & analytics

Level 3 – Code & Documentation

Modular structure with reusable hooks

Type-safe, documented components

Comprehensive README (this file)

🚧 Future Enhancements

🔥 Heatmap visualization toggle

🧮 Depth-based filtering

📆 Custom date range selection

🌓 Dark mode

🌐 Multi-language support

📤 Data export (CSV/GeoJSON)

📈 Historical data comparison

📜 License

MIT License — Free for educational and commercial use

🙌 Acknowledgments

USGS – Real-time earthquake data

OpenStreetMap – Map tiles

Leaflet + React-Leaflet – Interactive map rendering

Tailwind CSS – Modern, responsive UI

💡 Author

Erram Raju
📍 Warangal, Telangana, India
💼 Aspiring Full Stack Developer
📧 rajuerram03@gmail.com
