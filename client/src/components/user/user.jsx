import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import '../../assets/css/admin.css'
import Ticket from "./createTicket.jsx";
import FixedTickets from "./fixedTickets"
import DisplayFaq from "./displayFaq";
import ViewTickets from "./viewTickets"
import { useSelector } from 'react-redux';
function User() {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showFixedTickets, setShowFixedTickets] = useState(false);
  const [displayFaq, setDisplayFaq] = useState(false);
  const [showViewTickets , setShowViewTickets] = useState(false);
  const user = useSelector(state => state.user);

  const handleCreateTicket = () => {
    setShowCreateTicket(true);
    setDisplayFaq(false)
    setShowViewTickets(false)
    setShowFixedTickets(false)

  };

  const handleLinkClick = () => {
    setShowCreateTicket(false);
  };
  const handleFaqClick = () =>{
    setDisplayFaq(true);
    setShowCreateTicket(false);
    setShowViewTickets(false)
    setShowFixedTickets(false)

  }

  // const handleEmployeeClick = () => {
  //   setShowEmployeeList(!showEmployeeList);
  //   setShowNewUsers(false);
  // };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-auto col-sm-2 bg-dark d-flex flex-column justify-content-between min-vh-100'>
          <div className="mt-2">
            <a className='text-decoration-none ms-4 d-flex align-item-center text-white d-none d-sm-inline' role='button'>
              <span className='f5-4'>Side Menu</span>
            </a>
            <hr className='text-white d-none d-sm-block'></hr>
            <ul class='nav nav-pills flex-column mt-2 mt-sm-0' id='parentM'>
              {/* <li class='nav-item my-1 py-2 py-sm-0'>
                <a href="#" class="nav-link text-white text-center text-sm-start" aria-current="page" onClick={handleLinkClick}>
                  <i className='bi bi-speedometer2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                </a>
              </li> */}
              <li class='nav-item my-1 py-2 py-sm-0'>
                <a href="#submenu" class="nav-link text-white" data-bs-toggle="collapse" aria-current="page" >
                  <i className='bi bi-grid'></i>
                  <span className='ms-2 d-none d-sm-inline'>Ticket</span>
                  <i className='bi bi-arrow-down-short ms-0 ms-sm-3'></i>
                </a>

                <ul class="nav collapse ms-2 flex-column" id='submenu' data-bs-parent="#parentM">
                  <li class="nav-item ">
                    <a class="nav-link text-white" aria-current="page" onClick={handleCreateTicket}>
                      <span className="d-none d-sm-inline">create Ticket</span>
                    </a>
                  </li>
                  <li class="nav-item ">
                    <a class="nav-link text-white " href="#" onClick={() => {
              setShowViewTickets(true);
              setDisplayFaq(false)
              setShowCreateTicket(false)
              setShowFixedTickets(false)
            }}>
                      <span className="d-none d-sm-inline">Created Tickets</span>
                    </a>
                  </li>
                  <li class="nav-item ">
                    <a class="nav-link text-white " href="#" onClick={() => {
              setShowFixedTickets(true);
              setDisplayFaq(false)
              setShowCreateTicket(false)
              setShowViewTickets(false)
            }}>
                      <span className="d-none d-sm-inline">Fixed Tickets</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li class='nav-item my-1 py-2 py-sm-0'>
                <a href="#" class="nav-link text-white" aria-current="page" onClick={handleFaqClick}>
                  <i className='bi bi-people'></i>
                  <span className='ms-2 d-none d-sm-inline'>FAQ</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown open">
            <a class="btn border-none  dropdown-toggle text-white" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <i className="bi bi-person f5-4"></i><span className="fs-5 ms-3 d-none d-sm-inline">{user.employeeId}</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="triggerId">
              <a class="dropdown-item" href="#">Profile</a>
              <a class="dropdown-item" href="#">Log out</a>
            </div>
          </div>
        </div>
        <div className='col-sm-10'>
          {/* Conditional rendering of NewUsers component */}
          {showCreateTicket && <Ticket />}
          {displayFaq && <DisplayFaq/>}
          {showViewTickets && <ViewTickets/>}
          {showFixedTickets && <FixedTickets/>}

          {/* Conditional rendering of UserList component
          {showEmployeeList && <UserList />} */}
        </div>
      </div>
    </div>
  );
}

export default User;
