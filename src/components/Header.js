import React from 'react';
import ClarityLogo from '../assets/images/clarity-logo.png';




const Header = () => {
    return (
        <header id="page-topbar">
            <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={ClarityLogo} alt="Bootstrap" height="45" />
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
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <span
                                        className="d-xl-inline-block me-5" id="headerHome"
                                    >
                                        Home
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
