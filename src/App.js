import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Reserve from './pages/Reserve';
import ThankYou from './pages/ThankYou';
import GiveBlood from './pages/GiveBlood';
import EmergencyDonors from './pages/EmergencyDonors';
import UITSDonors from './pages/UITSDonors';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        {/* Removed old Request Blood link */}
        <Link to="/reserve" style={{ marginRight: '10px' }}>Reserve</Link>
        <Link to="/give" style={{ marginRight: '10px' }}>Give Blood</Link>
        <Link to="/emergency" style={{ marginRight: '10px' }}>🚨 Emergency</Link>
        <Link to="/uits" style={{ marginRight: '10px' }}>UITS Donors</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/give" element={<GiveBlood />} />
        <Route path="/emergency" element={<EmergencyDonors />} />
        <Route path="/uits" element={<UITSDonors />} />
      </Routes>
    </Router>
  );
}

export default App;
