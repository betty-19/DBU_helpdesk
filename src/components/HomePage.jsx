	import React from 'react';
	import { Link } from 'react-router-dom';
	import 'bootstrap/dist/css/bootstrap.css';
	import img1 from "../images/dbuHome.jpg";
	import './HomePage.css'; // Create a separate CSS file for HomePage styles

	const HomePage = () => {
 return (
    <div className="home-page">
     {/* Header */}
      <header className="bg-dark">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div>
	            <h1 className="text-light">Help Desk for DBU</h1>
          </div>
	          <div>
            <Link to="/" className="text-light mx-2">Home</Link>
	            <Link to="/login" className="text-light mx-2">Login</Link>
	            <Link to="/signup" className="text-light mx-2">Signup</Link>
          </div>
	        </div>
	      </header>

      {/* Main content */}
      <main className="main-content">
        <div className="container mt-5">
	          {/* Content of the home page */}
          <img src={img1} alt="Example Image" className="img-fluid rounded" />
		   {/* Footer */}
		   <footer className="bg-dark text-light text-center py-3 footer">
	        <div className="container">
	          <p className="text-center">&copy; 2023 Help Desk for DBU. All rights reserved.</p>
	          <ul className="footer-links list-unstyled">
            <li><Link to="/about">About</Link></li>
	            <li><Link to="/contact">Contact</Link></li>
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
