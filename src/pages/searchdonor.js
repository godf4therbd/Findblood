import { useState } from 'react';

// Dummy data (static for now)
const donors = [
  { name: 'Rahim Uddin', bloodGroup: 'A+', location: 'Dhaka', phone: '01711-123456' },
  { name: 'Sumaiya Hossain', bloodGroup: 'B+', location: 'Chittagong', phone: '01822-654321' },
  { name: 'Hasan Mahmud', bloodGroup: 'O-', location: 'Khulna', phone: '01933-987654' },
  { name: 'Mitu Akter', bloodGroup: 'AB+', location: 'Sylhet', phone: '01644-112233' },
  { name: 'Farhan Kabir', bloodGroup: 'A-', location: 'Barisal', phone: '01555-443322' }
];

function SearchDonor() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');

  const filteredDonors = donors.filter(donor => {
    return (
      (bloodGroup === '' || donor.bloodGroup === bloodGroup) &&
      (location === '' || donor.location.toLowerCase().includes(location.toLowerCase()))
    );
  });

  return (
    <div>
      <h1>Search Blood Donor</h1>
      <form style={{ marginBottom: '20px' }}>
        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="A-">A-</option>
        </select>

        <input 
          type="text" 
          placeholder="Enter Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          style={{ marginLeft: '10px' }}
        />
      </form>

      <h2>Available Donors:</h2>
      <ul>
        {filteredDonors.map((donor, index) => (
          <li key={index}>
            {donor.name} - {donor.bloodGroup} - {donor.location} - {donor.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchDonor;
