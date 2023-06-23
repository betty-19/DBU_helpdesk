import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import '../../assets/css/admin.css';
import OpenTickets from "./openTickets";
import Dashboard from "./headDashboard";
//import CreateTicket from './createTicket'
import { useSelector } from 'react-redux';
import ManageFaq from './manageFaq'
import ViewAssignedTickets from "./viewAssignedTickets";

function Manager() {
  const [showOpenTicket, setShowOpenTicket] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const user = useSelector(state => state.user);
  const [viewAssignedTicket, setViewAssignedTicket] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const textRef = useRef(null);
  const [message, setMessage] = useState('');
  
  const handleLinkClick = () => {
    setShowDashboard(true)
    setViewAssignedTicket(false)
    setShowOpenTicket(false);
    setShowFAQ(false);
  };
  const handleOpenTicket = () => {
    setShowDashboard(false)
    setViewAssignedTicket(false)
    console.log("New Ticket clicked");
    setShowOpenTicket(true);
    setShowFAQ(false); // Hide the FAQ page
  };

  const viewAssignedTickets = () => {
    console.log("New Ticket clicked");
    setShowDashboard(false)
    setViewAssignedTicket(true)
    setShowOpenTicket(false);
    setShowFAQ(false); // Hide the FAQ page
  };


  const handleFAQ = () => {
    setShowDashboard(false)
    setShowOpenTicket(false);
    setViewAssignedTicket(false)
    console.log("FAQ clicked");
    setShowFAQ(true);
    //setShowOpenTicket(false); // Hide the open ticket page
  };

  // const handleSubmitFAQ = (event) => {
  //   event.preventDefault();
  //   // Handle form submission logic here
  // };

//   const handleFormatting = (command, value) => {
//     // Check if there is selected text
//     const selectedText = window.getSelection().toString();
//     if (selectedText.length > 0) {
//       // Execute the specified command with the value
//       document.execCommand(command, false, value);
//     }
//   };

//   const handleIncreaseFontSize = () => {
//     const selection = window.getSelection();
//     if (selection.rangeCount > 0) {
//       for (let i = 0; i < selection.rangeCount; i++) {
//         const range = selection.getRangeAt(i);
//         const span = document.createElement('span');
//         span.style.fontSize = 'larger';
//         range.surroundContents(span);
//       }
//     }
//   };
  

//   const handleDecreaseFontSize = () => {
//     const selection = window.getSelection();
//     if (selection.rangeCount > 0) {
//       const range = selection.getRangeAt(0);
//       const span = document.createElement('span');
//       span.style.fontSize = 'smaller';
//       range.surroundContents(span);
//     }
//     // ...Existing code...

// // ...Existing code...

//   };
  // const handleSubmitFAQ = () => {
  //   const question = document.getElementById('question').value;
  //   const answer = textRef.current.innerHTML;
  //   // const category = document.getElementById('category').value;
  //   const category = user.department;
  
  //   const faqData = {
  //     question,
  //     answer,
  //     category,
  //   };
  
  //   fetch('http://localhost:4000/api/faq', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(faqData),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('FAQ stored successfully:', data);
  //       // Reset the form values
  //       document.getElementById('question').value = '';
  //       textRef.current.innerHTML = '';
  //       setCategory('');
  //     })
  //     .catch(error => {
  //       console.error('Error storing FAQ:', error);
  //     });
  // };
  
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar code */}
        <div className="col-auto col-sm-2 bg-dark d-flex flex-column justify-content-between min-vh-100">
          {/* Sidebar content */}
          <div className="mt-2">
            <a className="text-decoration-none ms-4 d-flex align-item-center text-white d-none d-sm-inline" role="button">
              <h3 className="f5-4">Manager Page</h3>
              <h6>Welcome, {user.username}!</h6>
            </a>
            <hr className="text-white d-none d-sm-block" />
            <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">
              <li className="nav-item my-1 py-2 py-sm-0">
                <a href="#" className="nav-link text-white text-center text-sm-start" aria-current="page" onClick={handleLinkClick}>
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
                    <a className="nav-link text-white"  onClick={viewAssignedTickets}>
                      <span className="d-none d-sm-inline">Assigned Ticket</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item my-1 py-2 py-sm-0">
                <a href="#" className="nav-link text-white" aria-current="page" onClick={handleFAQ}>
                  <i className="bi bi-house" />
                  <span className="ms-2 d-none d-sm-inline">Manage FAQ</span>
                </a>
              </li>
              {/* <li className="nav-item my-1 py-2 py-sm-0">
                <a href="#" className="nav-link text-white" aria-current="page">
                  <i className="bi bi-people" />
                  <span className="ms-2 d-none d-sm-inline">logout</span>
                </a>
              </li> */}
            </ul>
          </div>
          <div className="dropdown open">
            <a className="btn border-none  dropdown-toggle text-white" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="bi bi-person f5-4" /><span className="fs-5 ms-3 d-none d-sm-inline">{user.employeeId}</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <a className="dropdown-item" href="#">Profile</a>
              <a className="dropdown-item" href="#">Logout</a>
            </div>
          </div>
        </div>
        <div className='col-sm-10'>
             {console.log(showOpenTicket)}
        {showOpenTicket && <OpenTickets />}
        {showFAQ && <ManageFaq/>}
        {viewAssignedTicket && <ViewAssignedTickets/>}
        {showDashboard && <Dashboard />}
        </div>
     


        {/* {showFAQ && (
          <div className="col">
            <h1>Create FAQ</h1>
            <form onSubmit={handleSubmitFAQ}>
              <div className="mb-3">
                <label htmlFor="question" className="form-label">Question</label>
                <textarea className="form-control" id="question" rows="3" required></textarea>
              </div> */}
              {/* <div className="mb-3">
                <label htmlFor="answer" className="form-label">Answer</label>
                <textarea className="form-control" id="answer" rows="3" required></textarea>
              </div> */}
              {/* <div className="mb-3">
                <label htmlFor="message" className="form-label">Answer</label>
                <div
                  className="form-control message-input"
                  contentEditable="true"
                  ref={textRef}
                  onInput={(e) => setMessage(e.target.innerHTML)}
                ></div>
                <div className="formatting-buttons">
                  <button onClick={() => handleFormatting('bold')}><strong>B</strong></button>
                  <button onClick={() => handleFormatting('italic')}><em>I</em></button>
                  <button onClick={() => handleFormatting('underline')}><u>U</u></button>
                  <button onClick={handleIncreaseFontSize}>font-inc</button>
                  <button onClick={handleDecreaseFontSize}>font-dec</button>
                  <select onChange={(e) => handleFormatting('foreColor', e.target.value)}>
                    <option value="">Choose a color</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="black">Black</option>
                  </select>
                </div>
              </div> */}
              {/* <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div> */}
             
              {/* <button type="button" className="btn btn-primary" onClick={handleSubmitFAQ}>Add</button>

            </form>
          </div> */}
        {/* )} */}
      </div>
    </div>
  );
}

export default Manager;
