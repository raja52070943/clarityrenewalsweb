import React from 'react';


function Sidebar() {
  return (
    <nav className="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
      <button type="button" className="hamburger animated fadeInLeft is-open" data-toggle="offcanvas">
        <i className="hamb-right-arrow fas fa-angle-right"></i>
        <span className="hamb-top"></span>
        <span className="hamb-middle"></span>
        <span className="hamb-bottom"></span>
        <i className="hamb-left-arrow fas fa-angle-left"></i>
      </button>
      <ul className="nav sidebar-nav">
        <li>
          <span id="overall-status" className="badge bg-warning rounded-0 progress-status">
            In Progress
          </span>
        </li>
        <li>
          <a href="index.html" className="sidebar-components ms-3 dashboard-link">Dashboard</a>
        </li>
        <li className="dropdown">
          <a className="sidebar-components employeeBenefitsProgress" id="plan-info-link" href="employeebenefits.html">
            <span className="ps-3" id="plan-item">Employee Benefits</span>
            <div className="form-check d-none pt-1" id="benefits-submit-status">
              <input
                role="checkbox"
                type="checkbox"
                value="true"
                className="form-check-input checkbox-input-submit-status"
                checked
                disabled
                style={{ backgroundColor: '#AAAFB4', borderColor: '#AAAFB4' }}
              />
            </div>
            <span className="badge bg-warning" id="employeeBenefitsProgress">15%</span>
          </a>
          <ul className="dropdown-menu-fixed" id="plan-info-dropdown">
            <li>
              <a className="plan-dropdown-item-sidebar dropdown-item-sidebar" plan-id="fsa" href="employeebenefits.html">
                <i className="d-inline-block text-muted me-5"></i>
                <i className="d-inline-block text-muted"></i>
                FSA
              </a>
            </li>
            <li>
              <a className="plan-dropdown-item-sidebar dropdown-item-sidebar" plan-id="hra" href="employeebenefits.html">
                <i className="d-inline-block text-muted me-5"></i>
                <i className="d-inline-block text-muted"></i>
                HRA
              </a>
            </li>
          </ul>
        </li>
        <li id="cobra-menu">
          <a href="cobra.html" className="sidebar-components ms-3" id="cobra-info-link">COBRA</a>
        </li>
        <li>
          <a href="fileuploads.html" className="sidebar-components ms-3" id="fileupload-info-link">File Uploads</a>
        </li>
        <li>
          <a href="#" id="summary-info-link" className="sidebar-components ms-3">Summary</a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
