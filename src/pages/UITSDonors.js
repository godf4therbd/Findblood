import React, { useState } from 'react';

const initialDonors = [
  {
    bloodGroup: 'B+',
    name: 'Biswajit Roy',
    studentId: '0432410005101099',
    phone: '01867790305',
    batch: '52'
  },
  {
    bloodGroup: 'B+',
    name: 'MD Tanveer Mahmood Shanin',
    studentId: '0432220005101117',
    phone: '01628385867',
    batch: '52'
  },
  {
    bloodGroup: 'A+',
    name: 'Joydev Datta',
    studentId: '0432220005101132',
    phone: '01303787247',
    batch: '52'
  },
  {
    bloodGroup: 'A+',
    name: 'Osman Ali',
    studentId: '0432220005101137',
    phone: '01788483525',
    batch: '52'
  },
  {
    bloodGroup: 'O+',
    name: 'Imam Hossain Jawad',
    studentId: '0432220005101087',
    phone: '01572420048',
    batch: '52'
  },
  {
    bloodGroup: 'O+',
    name: 'Syed Jisan Ahmed',
    studentId: '0432220005101054',
    phone: '01883892011',
    batch: '52'
  },
  {
    bloodGroup: 'A+',
    name: 'Shariar Opu',
    studentId: '0432220005101079',
    phone: '01645970035',
    batch: '52'
  },
  {
    bloodGroup: 'B+',
    name: 'Mehedi Hasan Rubel',
    studentId: '0432220005201104',
    phone: '01987640859',
    batch: '52'
  }
];

function UITSDonors() {
  const [donors, setDonors] = useState(initialDonors);
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
    const newDonor = { ...formData, batch: '52' };
    setDonors([...donors, newDonor]);
    setFormData({ name: '', studentId: '', phone: '', batch: '', bloodGroup: '' });
    alert('Student enlisted successfully!');
  };

  const filteredDonors = donors.filter((donor) =>
    donor[searchField].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: 900, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>UITS Blood Donor Directory</h2>

      <div style={{ marginTop: '30px' }}>
        <h3>🔍 Search Donor</h3>
        <div style={{ marginBottom: '10px' }}>
          <select
            value={searchField}
            onChange={handleSearchFieldChange}
            style={{ padding: '6px', marginRight: '10px' }}
          >
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
            style={{ padding: '6px', width: '250px' }}
          />
        </div>

        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
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
                <tr key={donor.studentId || index}>
                  <td>{donor.name}</td>
                  <td>{donor.studentId}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.batch}</td>
                  <td>{donor.bloodGroup}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>
                  No matching donors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          {/* batch fixed to 52 */}
          <input
            type="text"
            name="batch"
            placeholder="Batch"
            value="52"
            disabled
            style={{ width: '100%', padding: '8px', marginBottom: '10px', backgroundColor: '#eee' }}
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
          <button
            type="submit"
            style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none' }}
          >
            Enlist
          </button>
        </form>
      </div>
    </div>
  );
}

export default UITSDonors;
