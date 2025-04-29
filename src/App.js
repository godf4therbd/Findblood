import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SearchDonor from './pages/SearchDonor';
import RequestBlood from './pages/RequestBlood';
import ThankYou from './pages/ThankYou';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/search" style={{ marginRight: "10px" }}>Search Donor</Link>
        <Link to="/request" style={{ marginRight: "10px" }}>Request Blood</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchDonor />} />
        <Route path="/request" element={<RequestBlood />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
