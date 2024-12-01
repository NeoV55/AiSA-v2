import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/_map.scss';

// Fix for missing marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const mockScamData = [
  {
    id: 1,
    name: "John Doe",
    company: "Scam Corp",
    phone: "+60 12-345 6789",
    account: "1234567890",
    lat: 3.1489,
    lng: 101.6941,
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "Fraudulent LLC",
    phone: "+60 19-876 5432",
    account: "9876543210",
    lat: 3.1478,
    lng: 101.6944,
  },
  // Add 18 more data points here...
];

const MapPage = () => {
  return (
    <div className="map-page">
      <h1 className="map-title">Welcome to AiSA</h1>
      <h1 className="map-title">Artificial Intelligence Scam Alert & Prevention Systems</h1>

      {/* Horizontal Moving List */}
      <div className="moving-list">
        <div className="ticker">
          {mockScamData.map((scam) => (
            <span key={scam.id} className="ticker-item">
              {scam.company}
            </span>
          ))}
        </div>
      </div>

      <MapContainer
        center={[3.1489, 101.6941]}
        zoom={15}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {mockScamData.map((scam) => (
          <Marker key={scam.id} position={[scam.lat, scam.lng]}>
            <Popup>
              <div className="popup-content">
                <h2>{scam.name}</h2>
                <p><strong>Company:</strong> {scam.company}</p>
                <p><strong>Phone:</strong> {scam.phone}</p>
                <p><strong>Account:</strong> {scam.account}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
