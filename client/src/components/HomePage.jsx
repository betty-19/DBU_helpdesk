import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import img1 from "../images/img3.jpg";
import img2 from "../images/img2.jpg";
import './HomePage.css'; // Create a separate CSS file for HomePage styles

const HomePage = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginOptions(!showLoginOptions);
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="bg-dark">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div>
            <h1 className="text-light">Help Desk for DBU</h1>
          </div>
          <div className="header-links">
            <div className="d-flex">
              <Link to="/" className="text-light mx-2">Home</Link>
              {/* <div className={`dropdown ${showLoginOptions ? 'show' : ''}`}>
                <span
                  className="text-light mx-2 dropdown-toggle"
                  onClick={handleLoginClick}
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={showLoginOptions ? "true" : "false"}
                >
                  Login
                </span>
                <div className={`dropdown-menu ${showLoginOptions ? 'show' : ''}`}>
                  <Link to={{ pathname: "/login", state: { role: "admin" } }} className="dropdown-item">Admin</Link>
                  <Link to={{ pathname: "/login", state: { role: "manager" } }} className="dropdown-item">Manager</Link>
                  <Link to={{ pathname: "/login", state: { role: "user" } }} className="dropdown-item">User</Link>
                  <Link to={{ pathname: "/login", state: { role: "pending" } }} className="dropdown-item">Pending</Link>
                </div>
              </div> */}
              <Link to="/login" className="text-light mx-2">Login</Link>
              <Link to="/signup" className="text-light mx-2">Signup</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        <div className="container mt-5">
          {/* Content of the home page */}
          <img src={img1} alt="Example Image" className="img-fluid rounded" />
          {/* <img src={img2} alt="Example Image" className="img-fluid rounded" /> */}

          {/* Footer */}
          <footer className="bg-dark text-light text-center py-3 footer">
            <div className="container">
              <p className="text-center">&copy; 2023 Help Desk for DBU. All rights reserved.</p>
              <ul className="footer-links list-unstyled">
                <li><Link to="/manager">About</Link></li>
                <li><Link to="/user">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
