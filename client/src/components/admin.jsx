import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap-icons/font/bootstrap'
import NewUser from './newUser.jsx'

import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import './admin.css'
import NewUsers from "./newUser.jsx";

function Admin(){
  const [showNewUsers, setShowNewUsers] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleNewClick = () => {
    setShowNewUsers(true);
  };
  const handleLinkClick = () => {
    setShowNewUsers(false);
  };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  // const handleSubmit = (formData) => {
  //   // Handle the submitted form data here
  //   console.log(formData);
  //   // Close the modal
  //   closeModal();
  // };

  // const handleNewClick = () => {
  //   setShowNewUsers(true);
  // };
    return(

             <div className='container-fluid'>
                <div className='row'>
                    <div className='col-auto col-sm-2 bg-dark d-flex flex-column justify-content-between min-vh-100'>
        <div className="mt-2">
                        <a className='text-decoration-none ms-4 d-flex align-item-center text-white d-none d-sm-inline' role='button'>
                          <span className='f5-4'>Side Menu</span>
                        </a>
                        <hr className='text-white d-none d-sm-block'></hr>
                        <ul class='nav nav-pills flex-column mt-2 mt-sm-0' id='parentM'>
                          <li class='nav-item my-1 py-2 py-sm-0'>
                            <a href="#" class="nav-link text-white text-center text-sm-start" aria-current="page" onClick={handleLinkClick}>
                              <i className='bi bi-speedometer2'></i>
                              <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                              </a>
                                </li>
                                <li class='nav-item my-1 py-2 py-sm-0'>
                                 <a href="#submenu" class="nav-link text-white" data-bs-toggle="collapse" aria-current="page" onClick={handleLinkClick}>
                                       <i className='bi bi-grid'></i>
                                      <span className='ms-2 d-none d-sm-inline'>Approve Account</span>
                                      <i className='bi bi-arrow-down-short ms-0 ms-sm-3'></i>
                              </a>
                              
                              <ul class="nav collapse ms-2 flex-column" id='submenu' data-bs-parent = "#parentM">
                                  <li class="nav-item ">
                                      <a class="nav-link text-white" aria-current="page" onClick={handleNewClick}> 
                                         <span className="d-none d-sm-inline">new</span> 1</a>
                                  </li>
                                  <li class="nav-item ">
                                      <a class="nav-link text-white " href="#" onClick={handleLinkClick}>
                                             <span className="d-none d-sm-inline">approved</span> 2</a>
                                  </li>
                              </ul>
                              </li>
                              <li class='nav-item my-1 py-2 py-sm-0'>
                            <a href="#" class="nav-link text-white" aria-current="page" onClick={handleLinkClick}>
                              <i className='bi bi-house'></i>
                              <span className='ms-2 d-none d-sm-inline'> employee</span>
                              </a>
                                  
                              <ul class="nav collapse ms-2 flex-column" id='submenu' data-bs-parent = "#parentM">
                                  <li class="nav-item ">
                                      <a class="nav-link text-white" aria-current="page" onClick={handleNewClick}> 
                                         <span className="d-none d-sm-inline">User</span> 1</a>
                                  </li>
                                  <li class="nav-item ">
                                      <a class="nav-link text-white " href="#" onClick={handleLinkClick}>
                                             <span className="d-none d-sm-inline">manager</span> 2</a>
                                  </li>
                              </ul>
                              </li>
                              <li class='nav-item my-1 py-2 py-sm-0'>
                            <a href="#" class="nav-link text-white" aria-current="page" onClick={handleLinkClick}>
                              <i className='bi bi-people'></i>
                              <span className='ms-2 d-none d-sm-inline'>logout</span>
                              </a>
                              </li>
                        </ul>
                    </div>
                    <div class="dropdown open">
                      <a class="btn border-none  dropdown-toggle text-white" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                          aria-expanded="false">
                            <i className="bi bi-person f5-4"></i><span className="fs-5 ms-3 d-none d-sm-inline">Bety</span>
                          </a>
                      <div class="dropdown-menu" aria-labelledby="triggerId">
                        <a class="dropdown-item" href="#">Profile</a>
                        <a class="dropdown-item" href="#">Setting action</a>
                      </div>
                    </div>
                    </div> 
                    <div className='col-sm-10'>
          {/* Conditional rendering of NewUsers component */}
        
          {showNewUsers && <NewUsers/>}
          
        </div>
           {/* Display the Modal component when showModal state is true */}
      
                </div>
             </div>
    )
}
export default Admin
