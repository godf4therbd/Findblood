import React from 'react';

const tabs = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'reserve', label: 'Reserve', icon: '🩸' },
  { id: 'give', label: 'Give', icon: '❤️' },
  { id: 'emergency', label: 'Emergency', icon: '🚨' },
  { id: 'uits', label: 'UITS', icon: '🎓' },
];

export default function BottomTabs({ activeTab, onTabChange }) {
  return (
    <nav style={styles.nav}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            ...styles.tab,
            color: activeTab === tab.id ? '#dc3545' : '#555',
            fontWeight: activeTab === tab.id ? '700' : '400',
          }}
          aria-label={tab.label}
        >
          <span style={styles.icon}>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    display: 'flex',
    justifyContent: 'space-around',
    borderTop: '1px solid #ddd',
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  tab: {
    background: 'none',
    border: 'none',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    cursor: 'pointer',
    padding: 0,
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
  },
};
