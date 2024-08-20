import React from 'react';
import ClarityLogo from '../assets/images/clarity-logo.png';

function CompanyHeader() {
  return (
    <header>
      <div className="bottom-header border-bottom">
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img 
                src={ClarityLogo}
                alt="Bootstrap" 
                style={{ height: '45px' }} // Use inline styles for height
              />
            </a>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent"
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* Add your nav links or content here */}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default CompanyHeader;
