// src/components/Layout.js
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../assets/css/app.css';
import '../assets/css/icons.min.css';
import '../assets/css/dashboard.css';
import Header from '../components/Header';

const DashboardLayout = ({ children }) => {
  useEffect(() => {
    // Add Bootstrap JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js';
    script.integrity = 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="layout-wrapper">
      <Header />
      <div id="content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
