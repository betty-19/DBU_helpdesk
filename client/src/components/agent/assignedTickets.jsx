import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Chat from '../chat';

const AssignedTickets = () => {
  const empId = useSelector((state) => state.user.employeeId);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showAllTickets, setShowAllTickets] = useState(true);
  const [displayChat, setDisplayChat] = useState(false);

  useEffect(() => {
    fetchAssignedTickets();
  }, []);

  const fetchAssignedTickets = async () => {
    try {
      console.log(empId);
      const response = await axios.get(`http://localhost:8000/agent/viewAssignedTickets?assignedId=${empId}`);
      setTickets(response.data);
      console.log(tickets);
    } catch (error) {
      console.error(error);
    }
  };

  const viewTicket = (ticketId) => {
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    setSelectedTicket(selectedTicket);
    setShowAllTickets(false)


  };

  const closeTicketDetails = async () => {
    try {
      console.log(selectedTicket.id);
      await axios.post(`http://localhost:8000/agent/completeTicket?selectedTicket=${selectedTicket.id}`, {
      });
      setSelectedTicket(null);
      // Optionally, you can also refresh the assigned tickets by calling fetchAssignedTickets()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {showAllTickets  ? (
      <><h1>Assigned Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Created By</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.firstName}</td>
              <td>{ticket.priority}</td>
              <td>
                <button onClick={() => viewTicket(ticket.id)}>View</button>
                <button
                  onClick={() =>
                    setSelectedTicket({
                      ...ticket,
                      user: ticket.id,
                      
                    } , setDisplayChat(false))
                  }
                >
                  Chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></>):(<></>)}
      

      {selectedTicket && (
        <div>
          <h2>Ticket Details</h2>
          <p>Created By: {selectedTicket.firstName}</p>
          <p>Title: {selectedTicket.title}</p>
          <p>Description: <span dangerouslySetInnerHTML={{ __html: selectedTicket.description }} /></p>
          <p>Office Block: {selectedTicket.officeBlock}</p>
          <button onClick={closeTicketDetails}>Complete</button>

       
        </div>
      )} 
      {/* {setDisplayChat &&    <Chat
        ticketId={selectedTicket.id}
        user={selectedTicket.user}
        agent={empId}
      />} */}
    </div>
  );
};

export default AssignedTickets;
