import React from 'react';
import './SplashScreen.css';

export default function SplashScreen() {
  return (
    <div className="splash-screen">
      <h1 className="splash-logo">
        Fin<b>o</b>blood
      </h1>
      <p className="splash-tagline">Find & Donate blood for your family</p>
      <p className="splash-footer">© All rights reserved by Findblood</p>
    </div>
  );
}
