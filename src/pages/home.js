import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleEmergencyClick = () => {
    navigate('/emergency');
  };

  return (
    <div className="centered">
      <h1>Welcome to FindBlood!</h1>
      <p>Find and request blood donors easily and quickly.</p>

      <button
        onClick={handleEmergencyClick}
        title="Emergency Blood Request"
        style={{
          marginTop: '40px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#dc3545',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px',
          border: 'none',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: '1.2'
        }}
      >
        🚨<br />Emergency
      </button>
    </div>
  );
}

export default Home;
