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
    name: "Ahmad Rizal",
    company: "Penipuan Enterprise",
    phone: "+60 13-456 7890",
    account: "5678901234",
    lat: 3.1489,
    lng: 101.6941,
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    company: "Scammer Trading Sdn Bhd",
    phone: "+60 11-345 6782",
    account: "1234509876",
    lat: 3.1478,
    lng: 101.6944,
  },
  {
    id: 3,
    name: "Muhammad Haziq",
    company: "Tipu Ventures",
    phone: "+60 16-987 6543",
    account: "9087612345",
    lat: 3.1502,
    lng: 101.6928,
  },
  {
    id: 4,
    name: "Nur Amalina",
    company: "Fraud Enterprise",
    phone: "+60 18-765 4321",
    account: "1122334455",
    lat: 3.1465,
    lng: 101.6963,
  },
  {
    id: 5,
    name: "Ali Imran",
    company: "Keldai Money Group",
    phone: "+60 12-567 8901",
    account: "4455667788",
    lat: 3.1449,
    lng: 101.6930,
  },
  {
    id: 6,
    name: "Aisyah Zain",
    company: "Golden Scams Ltd.",
    phone: "+60 19-345 2345",
    account: "3344556677",
    lat: 3.1495,
    lng: 101.6912,
  },
  {
    id: 7,
    name: "Mohd Zulkifli",
    company: "Cash Grab Holdings",
    phone: "+60 14-456 1234",
    account: "6677889900",
    lat: 3.1521,
    lng: 101.6938,
  },
  {
    id: 8,
    name: "Farah Aida",
    company: "Blacklist Solutions",
    phone: "+60 17-654 9876",
    account: "2211332244",
    lat: 3.1510,
    lng: 101.6950,
  },
  {
    id: 9,
    name: "Rizwan Hakim",
    company: "Illicit Funds LLP",
    phone: "+60 12-876 5432",
    account: "9990001112",
    lat: 3.1470,
    lng: 101.6907,
  },
  {
    id: 10,
    name: "Sharifah Ain",
    company: "Con Artist Sdn Bhd",
    phone: "+60 15-678 9012",
    account: "1122557799",
    lat: 3.1468,
    lng: 101.6925,
  },
  {
    id: 11,
    name: "Hakim Razali",
    company: "Shadow Bankers Sdn Bhd",
    phone: "+60 13-543 7654",
    account: "3344225566",
    lat: 3.1493,
    lng: 101.6900,
  },
  {
    id: 12,
    name: "Nur Khadijah",
    company: "Deception Group",
    phone: "+60 16-765 4322",
    account: "8877665544",
    lat: 3.1445,
    lng: 101.6955,
  },
  {
    id: 13,
    name: "Zulkarnain Fauzi",
    company: "Fake Money Sdn Bhd",
    phone: "+60 18-321 4567",
    account: "2233445566",
    lat: 3.1518,
    lng: 101.6902,
  },
  {
    id: 14,
    name: "Nadia Rahim",
    company: "Money Mule Agency",
    phone: "+60 11-234 5678",
    account: "7788991122",
    lat: 3.1482,
    lng: 101.6918,
  },
  {
    id: 15,
    name: "Faizal Anuar",
    company: "Phantom Solutions",
    phone: "+60 14-876 5433",
    account: "5566778899",
    lat: 3.1500,
    lng: 101.6948,
  },
  {
    id: 16,
    name: "Ain Farhana",
    company: "False Promises Sdn Bhd",
    phone: "+60 10-987 6541",
    account: "2233114455",
    lat: 3.1497,
    lng: 101.6970,
  },
  {
    id: 17,
    name: "Zahirah Musa",
    company: "Get Rich Scheme",
    phone: "+60 13-789 0123",
    account: "1199223344",
    lat: 3.1453,
    lng: 101.6943,
  },
  {
    id: 18,
    name: "Hafiz Hamzah",
    company: "Dodgy Deals Sdn Bhd",
    phone: "+60 12-234 9876",
    account: "2211443355",
    lat: 3.1475,
    lng: 101.6909,
  },
  {
    id: 19,
    name: "Nurul Ain",
    company: "Fraud Squad Ltd.",
    phone: "+60 16-456 3212",
    account: "6677889911",
    lat: 3.1506,
    lng: 101.6915,
  },
  {
    id: 20,
    name: "Amirul Hakim",
    company: "Scam Syndicate",
    phone: "+60 19-654 3211",
    account: "9988776655",
    lat: 3.1448,
    lng: 101.6929,
  },
  // Add 18 more data points here...
];

const MapPage = () => {
  return (
    <div className="map-page">
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
