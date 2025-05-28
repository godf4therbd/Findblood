import React, { useState } from 'react';
import BottomTabs from './components/BottomTabs';  // Adjust path if needed
import Home from './pages/Home';
import Reserve from './pages/Reserve';
import GiveBlood from './pages/GiveBlood';
import EmergencyDonors from './pages/EmergencyDonors';
import UITSDonors from './pages/UITSDonors';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState('home');  // Track which tab is active

  // Render the page/component based on activeTab state
  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'reserve': return <Reserve />;
      case 'give': return <GiveBlood />;
      case 'emergency': return <EmergencyDonors />;
      case 'uits': return <UITSDonors />;
      default: return <Home />;
    }
  };

  return (
    <div style={{ paddingBottom: 60 /* To avoid overlap with bottom tabs */ }}>
      {renderContent()}
      <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
