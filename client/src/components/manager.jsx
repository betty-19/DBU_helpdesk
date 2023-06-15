import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import './admin.css';
import OpenTickets from "./openTickets.jsx";


function Manager() {
  const [showOpenTicket, setShowOpenTicket] = useState(false);
  
  const handleOpenTicket = () => {
    console.log("New Ticket clicked");
    setShowOpenTicket(true);
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar code */}
        <div className="col-auto col-sm-2 bg-dark d-flex flex-column justify-content-between min-vh-100">
          {/* Sidebar content */}
          <div className="mt-2">
            <a className="text-decoration-none ms-4 d-flex align-item-center text-white d-none d-sm-inline" role="button">
              <span className="f5-4">Side Menu</span>
            </a>
            <hr className="text-white d-none d-sm-block" />
            <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">
              <li className="nav-item my-1 py-2 py-sm-0">
                <a href="#" className="nav-link text-white text-center text-sm-start" aria-current="page">
                  <i className="bi bi-speedometer2" />
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </a>
              </li>
              <li className="nav-item my-1 py-2 py-sm-0">
                <a href="#submenu" className="nav-link text-white" data-bs-toggle="collapse" aria-current="page">
                  <i className="bi bi-grid" />
                  <span className="ms-2 d-none d-sm-inline">Tickets</span>
                  <i className="bi bi-arrow-down-short ms-0 ms-sm-3" />
                </a>
                <ul className="nav collapse ms-2 flex-column" id="submenu" data-bs-parent="#parentM">
                  <li className="nav-item">
                    <a className="nav-link text-white" aria-current="page" onClick={handleOpenTicket}>
                      <span className="d-none d-sm-inline">Open Ticket</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">
                      <span className="d-none d-sm-inline">Assigned Ticket</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item my-1 py-2 py-sm-0">
                <a href="#" className="nav-link text-white" aria-current="page">
                  <i className="bi bi-house" />
                  <span className="ms-2 d-none d-sm-inline">FAQ</span>
                </a>
              </li>
              <li className="nav-item my-1 py-2 py-sm-0">
                <a href="#" className="nav-link text-white" aria-current="page">
                  <i className="bi bi-people" />
                  <span className="ms-2 d-none d-sm-inline">logout</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown open">
            <a className="btn border-none  dropdown-toggle text-white" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="bi bi-person f5-4" /><span className="fs-5 ms-3 d-none d-sm-inline">Bety</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <a className="dropdown-item" href="#">Profile</a>
              <a className="dropdown-item" href="#">Setting action</a>
            </div>
          </div>
        </div>
        {/* Display AssignTicket component */}
        {showOpenTicket && <OpenTickets />}
      </div>
    </div>
  );
}

export default Manager;
