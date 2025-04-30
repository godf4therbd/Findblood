import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import SearchDonor from './pages/SearchDonor';
import RequestBlood from './pages/RequestBlood';
import ThankYou from './pages/ThankYou';
import GiveBlood from './pages/GiveBlood';
import EmergencyDonors from './pages/EmergencyDonors';
import UITSDonors from './pages/UITSDonors'; // ✅ New page import

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/search" style={{ marginRight: '10px' }}>Search Donor</Link>
        <Link to="/request" style={{ marginRight: '10px' }}>Request Blood</Link>
        <Link to="/give" style={{ marginRight: '10px' }}>Give Blood</Link>
        <Link to="/emergency" style={{ marginRight: '10px' }}>🚨 Emergency</Link>
        <Link to="/uits" style={{ marginRight: '10px' }}>UITS Donors</Link> {/* ✅ New link */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchDonor />} />
        <Route path="/request" element={<RequestBlood />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/give" element={<GiveBlood />} />
        <Route path="/emergency" element={<EmergencyDonors />} />
        <Route path="/uits" element={<UITSDonors />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
