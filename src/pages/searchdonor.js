import React, { useState, useEffect } from 'react';

const donorData = [
  {
    name: 'Rahim Uddin',
    bloodGroup: 'A+',
    phone: '01711223344',
    division: 'Dhaka',
    district: 'Dhaka',
    policeStation: 'Dhanmondi',
  },
  {
    name: 'Sumi Akter',
    bloodGroup: 'O+',
    phone: '01899887766',
    division: 'Dhaka',
    district: 'Gazipur',
    policeStation: 'Tongi',
  },
];

const locationData = {
  Dhaka: {
    Dhaka: ['Dhanmondi', 'Mirpur', 'Uttara', 'Gulshan'],
    Gazipur: ['Tongi', 'Sreepur', 'Kaliakair'],
    Narayanganj: ['Fatullah', 'Siddhirganj', 'Sonargaon']
  },
  Chattogram: {
    Chattogram: ['Pahartali', 'Kotwali', 'Halishahar'],
    "Cox's Bazar": ['Teknaf', 'Ukhiya'],
    Rangamati: ['Baghaichari', 'Kaptai']
  },
  Rajshahi: {
    Rajshahi: ['Boalia', 'Motihar'],
    Natore: ['Baraigram', 'Gurudaspur'],
    Pabna: ['Ishwardi', 'Santhia']
  },
  Khulna: {
    Khulna: ['Sonadanga', 'Khalishpur'],
    Bagerhat: ['Mollahat', 'Rampal'],
    Satkhira: ['Debhata', 'Kaliganj']
  },
  Barisal: {
    Barisal: ['Band Road', 'Nathullabad'],
    Patuakhali: ['Galachipa', 'Dashmina'],
    Bhola: ['Borhanuddin', 'Lalmohan']
  },
  Sylhet: {
    Sylhet: ['Zindabazar', 'Ambarkhana'],
    Moulvibazar: ['Srimangal', 'Kulaura'],
    Habiganj: ['Chunarughat', 'Madhabpur']
  },
  Rangpur: {
    Rangpur: ['Jadurchar', 'Keranipara'],
    Dinajpur: ['Phulbari', 'Birampur'],
    Thakurgaon: ['Pirganj', 'Ranisankail']
  },
  Mymensingh: {
    Mymensingh: ['Town Hall', 'Ganginarpar'],
    Netrokona: ['Purbadhala', 'Kendua'],
    Jamalpur: ['Melandaha', 'Sarishabari']
  }
};

function SearchDonor() {
  const [filters, setFilters] = useState({
    bloodGroup: '',
    division: '',
    district: '',
    policeStation: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('donorFilters');
    if (saved) setFilters(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('donorFilters', JSON.stringify(filters));
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'division') updated.district = updated.policeStation = '';
      if (name === 'district') updated.policeStation = '';
      return updated;
    });
  };

  const filteredDonors = donorData.filter((donor) => {
    return (
      (!filters.bloodGroup || donor.bloodGroup === filters.bloodGroup) &&
      (!filters.division || donor.division === filters.division) &&
      (!filters.district || donor.district === filters.district) &&
      (!filters.policeStation || donor.policeStation === filters.policeStation)
    );
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔍 Search Donor</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(200px, 1fr))', gap: '15px' }}>
        <select name="bloodGroup" value={filters.bloodGroup} onChange={handleChange}>
          <option value="">All Blood Groups</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        <select name="division" value={filters.division} onChange={handleChange}>
          <option value="">Select Division</option>
          {Object.keys(locationData).map((div) => (
            <option key={div} value={div}>{div}</option>
          ))}
        </select>

        {filters.division && (
          <select name="district" value={filters.district} onChange={handleChange}>
            <option value="">Select District</option>
            {Object.keys(locationData[filters.division]).map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        )}

        {filters.district && (
          <select name="policeStation" value={filters.policeStation} onChange={handleChange}>
            <option value="">Select Police Station</option>
            {locationData[filters.division][filters.district].map((ps) => (
              <option key={ps} value={ps}>{ps}</option>
            ))}
          </select>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        {filteredDonors.length > 0 ? (
          <table border="1" cellPadding="10" style={{ width: '100%' }}>
            <thead style={{ background: '#f2f2f2' }}>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Blood Group</th>
                <th>Division</th>
                <th>District</th>
                <th>Police Station</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map((donor, idx) => (
                <tr key={idx}>
                  <td>{donor.name}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.division}</td>
                  <td>{donor.district}</td>
                  <td>{donor.policeStation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: '15px' }}>No matching donors found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchDonor;
