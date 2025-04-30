import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const donors = [
  { name: 'Arafat Rahman', bloodGroup: 'A+', location: 'Dhaka', lat: 23.8103, lon: 90.4125 },
  { name: 'Sabbir Khan', bloodGroup: 'B+', location: 'Dhaka', lat: 23.8143, lon: 90.4135 },
  { name: 'Nusrat Jahan', bloodGroup: 'O-', location: 'Sylhet', lat: 24.8949, lon: 91.8687 },
];

function EmergencyDonors() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        alert("Location access denied. Map will be centered to Dhaka.");
        setPosition([23.8103, 90.4125]); // Default to Dhaka
      }
    );
  }, []);

  return (
    <div className="container">
      <h2>Nearby Blood Donors</h2>
      {position && (
        <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>

          {donors.map((donor, idx) => (
            <Marker key={idx} position={[donor.lat, donor.lon]}>
              <Popup>
                {donor.name}<br />
                Blood: {donor.bloodGroup}<br />
                Location: {donor.location}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default EmergencyDonors;
