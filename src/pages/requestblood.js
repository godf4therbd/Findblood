import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RequestBlood() {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    location: '',
    contact: '',
    message: ''
  });

  const navigate = useNavigate(); // Correctly placed after useState

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Blood request submitted! ✅');
    navigate('/thankyou'); // Redirects after alert
    console.log(formData);

    setFormData({
      name: '',
      bloodGroup: '',
      location: '',
      contact: '',
      message: ''
    });
  };

  return (
    <div>
      <h1>Request Blood</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="A-">A-</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Additional Message (Optional)"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit" style={{ marginTop: '10px' }}>Submit Request</button>
      </form>
    </div>
  );
}

export default RequestBlood;
