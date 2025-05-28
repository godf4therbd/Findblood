import React, { useState } from 'react';

function GiveBlood() {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    location: '',
    lastDonationDate: '',
    contactNumber: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Donor submitted:", formData); // You can send this data to backend here
  };

  if (submitted) {
    return (
      <div className="centered">
        <h2>Thank you for registering as a donor! 🩸</h2>
        <p>We'll reach out when someone needs your help.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Get Enlisted to Donate Blood</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
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
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="City or Area"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="lastDonationDate"
          placeholder="Last Donation Date"
          value={formData.lastDonationDate}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GiveBlood;
