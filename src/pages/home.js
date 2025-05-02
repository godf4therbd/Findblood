import React, { useState } from 'react';
import dhaka from '../data/Dhaka.json';
import chattogram from '../data/Chattogram.json';
import rajshahi from '../data/Rajshahi.json';
import khulna from '../data/Khulna.json';
import barishal from '../data/Barishal.json';
import sylhet from '../data/Sylhet.json';
import rangpur from '../data/Rangpur.json';
import mymensingh from '../data/Mymensingh.json';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const locationData = {
  Dhaka: dhaka.Dhaka,
  Chattogram: chattogram.Chattogram,
  Rajshahi: rajshahi.Rajshahi,
  Khulna: khulna.Khulna,
  Barishal: barishal.Barishal,
  Sylhet: sylhet.Sylhet,
  Rangpur: rangpur.Rangpur,
  Mymensingh: mymensingh.Mymensingh
};

const dummyDonors = [
  { id: 1, name: 'Ali', bloodGroup: 'A+', phone: '01711...', lat: 23.8103, lng: 90.4125 },
  { id: 2, name: 'Sara', bloodGroup: 'B-', phone: '01822...', lat: 24.9045, lng: 91.8611 },
  { id: 3, name: 'Jamil', bloodGroup: 'O+', phone: '01933...', lat: 22.3569, lng: 91.7832 }
];

function createBloodMarkerIcon(bloodGroup) {
  return L.divIcon({
    html: `<div style="background:#e74c3c;color:white;padding:4px 6px;border-radius:4px;font-size:12px;font-weight:bold;">${bloodGroup}</div>`,
    className: '',
    iconSize: [30, 20],
    iconAnchor: [15, 10]
  });
}

function Home() {
  const [filters, setFilters] = useState({
    bloodGroup: '',
    division: '',
    district: '',
    policeStation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'division') {
      setFilters({ bloodGroup: filters.bloodGroup, division: value, district: '', policeStation: '' });
    } else if (name === 'district') {
      setFilters({ ...filters, district: value, policeStation: '' });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSearch = () => {
    alert(`Searching for ${filters.bloodGroup} donors in ${filters.policeStation}, ${filters.district}, ${filters.division}`);
  };

  const divisions = Object.keys(locationData);
  const districts = filters.division ? Object.keys(locationData[filters.division]) : [];
  const policeStations = filters.division && filters.district ? locationData[filters.division][filters.district] : [];

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#c0392b' }}>Find Blood. Save Lives.</h1>
        <p>Connect directly with blood donors in your area, instantly.</p>
        <button onClick={() => window.scrollTo(0, 400)} style={{ marginTop: '20px', padding: '10px 20px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px' }}>🔍 Request Blood</button>
      </section>

      <section style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h2>Search Donors</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
          <select name="bloodGroup" onChange={handleChange} value={filters.bloodGroup} style={{ flex: '1 1 150px' }}>
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>

          <select name="division" onChange={handleChange} value={filters.division} style={{ flex: '1 1 150px' }}>
            <option value="">Select Division</option>
            {divisions.map(div => <option key={div} value={div}>{div}</option>)}
          </select>

          <select name="district" onChange={handleChange} value={filters.district} style={{ flex: '1 1 150px' }}>
            <option value="">Select District</option>
            {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
          </select>

          <select name="policeStation" onChange={handleChange} value={filters.policeStation} style={{ flex: '1 1 150px' }}>
            <option value="">Select Police Station</option>
            {policeStations.map(station => <option key={station} value={station}>{station}</option>)}
          </select>

          <button onClick={handleSearch} style={{ padding: '10px 15px', background: '#3498db', color: '#fff', border: 'none' }}>Search</button>
        </div>
      </section>

      <section>
        <h3>Live Donor Map</h3>
        <div style={{ height: '350px', marginBottom: '40px' }}>
          <MapContainer center={[23.8103, 90.4125]} zoom={7} style={{ width: '100%', height: '100%', borderRadius: '8px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {dummyDonors.map(donor => (
              <Marker
                key={donor.id}
                position={[donor.lat, donor.lng]}
                icon={createBloodMarkerIcon(donor.bloodGroup)}
              >
                <Popup>
                  <strong>{donor.name}</strong><br />
                  {donor.bloodGroup}<br />
                  📞 {donor.phone}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section style={{ textAlign: 'center', marginTop: '60px' }}>
        <p>Want to help someone in need?</p>
        <button onClick={() => window.location.href = '/donor'} style={{ padding: '10px 20px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '5px' }}>Become a Donor</button>
      </section>
    </div>
  );
}

export default Home;
