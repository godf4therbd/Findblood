import React, { useState } from 'react';

function UITSDonors() {
  const [donors, setDonors] = useState([
    {
      name: 'Abrar Hossain',
      studentId: '0432410005101088',
      phone: '01712345678',
      batch: '45',
      bloodGroup: 'A+',
    },
    {
      name: 'Nusrat Islam',
      studentId: '0432410005101077',
      phone: '01887654321',
      batch: '44',
      bloodGroup: 'B+',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('name');

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    phone: '',
    batch: '',
    bloodGroup: '',
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnlist = (e) => {
    e.preventDefault();
    setDonors([...donors, formData]);
    setFormData({ name: '', studentId: '', phone: '', batch: '', bloodGroup: '' });
    alert('Student enlisted successfully!');
  };

  const filteredDonors = donors.filter((donor) =>
    donor[searchField].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>UITS Blood Donor Directory</h2>

      {/* 🔍 SEARCH SECTION */}
      <div style={{ marginTop: '30px' }}>
        <h3>🔍 Search Donor</h3>
        <div style={{ marginBottom: '10px' }}>
          <select value={searchField} onChange={handleSearchFieldChange} style={{ padding: '6px', marginRight: '10px' }}>
            <option value="name">Name</option>
            <option value="studentId">Student ID</option>
            <option value="batch">Batch</option>
            <option value="bloodGroup">Blood Group</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchField}`}
            value={searchTerm}
            onChange={handleSearch}
            style={{ padding: '6px', width: '200px' }}
          />
        </div>

        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px' }}>
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Phone</th>
              <th>Batch</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <tr key={index}>
                  <td>{donor.name}</td>
                  <td>{donor.studentId}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.batch}</td>
                  <td>{donor.bloodGroup}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No matching donors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📝 ENLIST SECTION */}
      <div style={{ marginTop: '40px' }}>
        <h3>📝 Get Enlisted to Donate</h3>
        <form onSubmit={handleEnlist} style={{ maxWidth: '400px' }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleFormChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleFormChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleFormChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <input
            type="text"
            name="batch"
            placeholder="Batch"
            value={formData.batch}
            onChange={handleFormChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleFormChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <button type="submit" style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none' }}>
            Enlist
          </button>
        </form>
      </div>
    </div>
  );
}

export default UITSDonors;
