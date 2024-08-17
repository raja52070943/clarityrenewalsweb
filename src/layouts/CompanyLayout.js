// src/components/Layout.js
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/app.css';
import '../assets/css/icons.min.css';
import '../assets/css/style.css';
import Sidebar from './Sidebar';
import ProgressBar from './ProgressBar';
import CompanyHeader from './CompanyHeader';

const DashboardLayout = ({ children }) => {
  useEffect(() => {

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
    <div class="main ">
      <CompanyHeader/>
      <div id="layout-wrapper">
        <div id="wrapper" className="toggled">
          <Sidebar />
          <ProgressBar/>
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <div className="row startingrow">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
