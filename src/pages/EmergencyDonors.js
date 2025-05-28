import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default icon URLs (optional)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: markerShadow,
});

// Red circle icon for donors with white text (blood group)
function createRedCircleIcon(text) {
  return L.divIcon({
    html: `<div style="
      background-color: red;
      color: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
      border: 2px solid white;
      box-shadow: 0 0 2px rgba(0,0,0,0.5);
      ">
      ${text}
      </div>`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
}

// Blue circle icon for user's location
const userLocationIcon = L.divIcon({
  html: `<div style="
    background-color: #007bff;
    border: 3px solid white;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    box-shadow: 0 0 5px rgba(0,123,255,0.7);
  "></div>`,
  className: '',
  iconSize: [25, 25],
  iconAnchor: [12.5, 25],
  popupAnchor: [0, -25],
});

const donors = [
  { name: 'Arafat Rahman', bloodGroup: 'A+', location: 'Dhaka', lat: 23.8103, lon: 90.4125, phone: '01710000000' },
  { name: 'Sabbir Khan', bloodGroup: 'B+', location: 'Dhaka', lat: 23.8143, lon: 90.4135, phone: '01710000001' },
  { name: 'Nusrat Jahan', bloodGroup: 'O-', location: 'Sylhet', lat: 24.8949, lon: 91.8687, phone: '01710000002' },
];

function EmergencyDonors() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      () => {
        alert('Location access denied. Centering map to Dhaka.');
        setPosition([23.8103, 90.4125]); // Default to Dhaka
      }
    );
  }, []);

  if (!position) return <div>Loading map...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Nearby Blood Donors</h2>
      <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* User Location Marker with blue circle */}
        <Marker position={position} icon={userLocationIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Donor Markers with red circle and blood group */}
        {donors.map((donor, idx) => (
          <Marker
            key={idx}
            position={[donor.lat, donor.lon]}
            icon={createRedCircleIcon(donor.bloodGroup)}
          >
            <Popup>
              <strong>{donor.name}</strong><br />
              Blood Group: {donor.bloodGroup}<br />
              Location: {donor.location}<br />
              Phone: <a href={`tel:${donor.phone}`}>{donor.phone}</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default EmergencyDonors;
