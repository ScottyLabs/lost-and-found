import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

// Cohon University Center, CMU (5032 Forbes Ave, Pittsburgh, PA)
const CUC_CENTER: [number, number] = [40.4428, -79.9456];
const DEFAULT_ZOOM = 17;

type FoundMapProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function FoundMap({
  width = 384,
  height = 384,
  className = ''
}: FoundMapProps) {
  return (
    <div className={className} style={{ width, height }}>
      <MapContainer
        center={CUC_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
