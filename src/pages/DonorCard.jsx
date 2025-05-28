import React from 'react';

function DonorCard({ donor, showPhone, onConnect, onIgnore, fadingOut }) {
  return (
    <div
      className={fadingOut ? 'fade-out' : ''}
      style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        marginBottom: 20,
        padding: 15,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.5s ease',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <img
          src={donor.photo || 'default-avatar.png'}
          alt={donor.name}
          style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 15 }}
        />
        <div>
          <strong>{donor.name}</strong>{' '}
          <small style={{ color: '#666' }}>{donor.status}</small>
          <div style={{ fontSize: 12, color: '#666' }}>
            {donor.location} • {donor.lastUpdated}
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: donor.emergency ? '#e74c3c' : '#2ecc71',
          color: 'white',
          padding: 10,
          borderRadius: 4,
          fontWeight: 'bold',
          marginBottom: 10,
        }}
      >
        {donor.emergency ? 'Emergency' : 'Available'} - {donor.bags} bags - {donor.bloodGroup}
      </div>

      <p>{donor.notes}</p>

      <div>
        {showPhone ? (
          <div style={{ marginBottom: 10, fontWeight: 'bold' }}>📞 {donor.phone}</div>
        ) : (
          <button
            onClick={onConnect}
            style={{
              marginRight: 10,
              padding: '8px 16px',
              background: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Connect
          </button>
        )}
        <button
          onClick={onIgnore}
          style={{
            padding: '8px 16px',
            background: '#ccc',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Ignore
        </button>
      </div>
    </div>
  );
}

export default DonorCard;
