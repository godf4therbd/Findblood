import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DonorCard from './DonorCard'; // Adjust path if needed

const GOOGLE_SHEET_ID = '13DeoqEdxGB3eesBJPU2bVog75rTpFQ2Oje-QQZn2VNU';
const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Donors`;

function createBloodMarkerIcon(bloodGroup) {
  return L.divIcon({
    html: `<div style="background:#e74c3c;color:white;padding:4px 6px;border-radius:4px;font-size:12px;font-weight:bold;">${bloodGroup}</div>`,
    className: '',
    iconSize: [30, 20],
    iconAnchor: [15, 10],
  });
}

function Home() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    bloodGroup: '',
    division: '',
    district: '',
    policeStation: '',
  });

  const [patientRequest, setPatientRequest] = useState({
    name: '',
    bloodGroup: '',
    location: '',
    phone: '',
    notes: '',
  });

  const [showPhoneFor, setShowPhoneFor] = useState({});
  const [visibleDonors, setVisibleDonors] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(GOOGLE_SHEET_CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsed = results.data.map((d, i) => ({
              id: parseInt(d.id) || i,
              name: d.name,
              status: d.status,
              location: d.location,
              lastUpdated: d.lastUpdated,
              emergency: d.emergency.toLowerCase() === 'true',
              bags: Number(d.bags),
              bloodGroup: d.bloodGroup,
              notes: d.notes,
              photo: d.photo,
              division: d.division,
              district: d.district,
              policeStation: d.policeStation,
              lat: parseFloat(d.lat),
              lng: parseFloat(d.lng),
              phone: d.phone,
            }));
            setDonors(parsed);
            setLoading(false);
          },
          error: (err) => {
            console.error('CSV parse error:', err);
            setLoading(false);
          },
        });
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = donors.filter((donor) => {
      return (
        (!filters.bloodGroup || donor.bloodGroup === filters.bloodGroup) &&
        (!filters.division || donor.division === filters.division) &&
        (!filters.district || donor.district === filters.district) &&
        (!filters.policeStation || donor.policeStation === filters.policeStation)
      );
    });
    setVisibleDonors(filtered);
  }, [filters, donors]);

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

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    alert(`Patient Request Submitted:\n${JSON.stringify(patientRequest, null, 2)}`);
    setPatientRequest({ name: '', bloodGroup: '', location: '', phone: '', notes: '' });
  };

  const togglePhone = (id) => {
    setShowPhoneFor((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleIgnore = (id) => {
    setVisibleDonors((current) =>
      current.map((donor) => (donor.id === id ? { ...donor, fadingOut: true } : donor))
    );

    setTimeout(() => {
      setVisibleDonors((current) => current.filter((donor) => donor.id !== id));
      setShowPhoneFor((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }, 500);
  };

  const divisions = Array.from(new Set(donors.map((d) => d.division).filter(Boolean))).sort();
  const districts = filters.division
    ? Array.from(new Set(donors.filter((d) => d.division === filters.division).map((d) => d.district).filter(Boolean))).sort()
    : [];
  const policeStations =
    filters.division && filters.district
      ? Array.from(
          new Set(
            donors
              .filter((d) => d.division === filters.division && d.district === filters.district)
              .map((d) => d.policeStation)
              .filter(Boolean)
          )
        ).sort()
      : [];

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#c0392b', marginBottom: 20 }}>Find Blood. Save Lives.</h1>

      <section
        style={{
          background: '#f9f9f9',
          padding: 20,
          borderRadius: 8,
          marginBottom: 30,
        }}
      >
        <h2>Search Donors</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 15 }}>
          <select
            name="bloodGroup"
            value={filters.bloodGroup}
            onChange={handleChange}
            style={{ flex: '1 1 150px' }}
          >
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            name="division"
            value={filters.division}
            onChange={handleChange}
            style={{ flex: '1 1 150px' }}
          >
            <option value="">Select Division</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={filters.district}
            onChange={handleChange}
            disabled={!filters.division}
            style={{ flex: '1 1 150px' }}
          >
            <option value="">Select District</option>
            {districts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>

          <select
            name="policeStation"
            value={filters.policeStation}
            onChange={handleChange}
            disabled={!filters.district}
            style={{ flex: '1 1 150px' }}
          >
            <option value="">Select Police Station</option>
            {policeStations.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section style={{ height: 350, marginBottom: 30 }}>
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={7}
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {visibleDonors.map((donor) => (
            <Marker
              key={donor.id}
              position={[donor.lat, donor.lng]}
              icon={createBloodMarkerIcon(donor.bloodGroup)}
            >
              <Popup>
                <strong>{donor.name}</strong>
                <br />
                {donor.bloodGroup}
                <br />
                📞 {showPhoneFor[donor.id] ? donor.phone : 'Click Connect to view'}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>

      <section style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div
          style={{
            flex: '1 1 400px',
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 20,
            backgroundColor: '#fafafa',
          }}
        >
          <h2>Request Blood / Add Patient</h2>
          <form onSubmit={handlePatientSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label>
              Name:
              <input
                name="name"
                value={patientRequest.name}
                onChange={handlePatientChange}
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>

            <label>
              Blood Group:
              <select
                name="bloodGroup"
                value={patientRequest.bloodGroup}
                onChange={handlePatientChange}
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Location:
              <input
                name="location"
                value={patientRequest.location}
                onChange={handlePatientChange}
                placeholder="e.g. Motijhil, Dhaka"
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>

            <label>
              Phone Number:
              <input
                type="tel"
                name="phone"
                value={patientRequest.phone}
                onChange={handlePatientChange}
                placeholder="e.g. 017XXXXXXXX"
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>

            <label>
              Notes:
              <textarea
                name="notes"
                value={patientRequest.notes}
                onChange={handlePatientChange}
                rows={4}
                placeholder="Additional details"
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>

            <button
              type="submit"
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '12px',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                marginTop: 10,
              }}
            >
              Submit Request
            </button>
          </form>
        </div>

        <div style={{ flex: '1 1 600px' }}>
          <h2>Donor / Searcher</h2>
          {visibleDonors.length === 0 ? (
            <p>No donors found.</p>
          ) : (
            visibleDonors.map((donor) => (
              <DonorCard
                key={donor.id}
                donor={donor}
                showPhone={!!showPhoneFor[donor.id]}
                onConnect={() => togglePhone(donor.id)}
                onIgnore={() => handleIgnore(donor.id)}
                fadingOut={donor.fadingOut}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
