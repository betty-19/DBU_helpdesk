import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Chat from './chat.jsx';

const AssignedTickets = () => {
  const empId = useSelector((state) => state.empId);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchAssignedTickets();
  }, []);

  const fetchAssignedTickets = async () => {
    try {
      const response = await axios.get(`/api/tickets/assigned/${empId}`);
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const viewTicket = (ticketId) => {
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    setSelectedTicket(selectedTicket);
  };

  const closeTicketDetails = async () => {
    try {
      await axios.put(`/api/tickets/${selectedTicket.id}`, {
        status: 'Fixed',
      });
      setSelectedTicket(null);
      // Optionally, you can also refresh the assigned tickets by calling fetchAssignedTickets()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Assigned Tickets</h1>
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
              <td>{ticket.createdBy}</td>
              <td>{ticket.priority}</td>
              <td>
                <button onClick={() => viewTicket(ticket.id)}>View</button>
                <button
                  onClick={() =>
                    setSelectedTicket({
                      ...ticket,
                      user: ticket.createdBy,
                    })
                  }
                >
                  Chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTicket && (
        <div>
          <h2>Ticket Details</h2>
          <p>Created By: {selectedTicket.createdBy}</p>
          <p>Title: {selectedTicket.title}</p>
          <p>Description: {selectedTicket.description}</p>
          <p>Office Block: {selectedTicket.officeBlock}</p>
          <p>Office Number: {selectedTicket.officeNumber}</p>
          <button onClick={closeTicketDetails}>Close</button>

          <Chat
            ticketId={selectedTicket.id}
            user={selectedTicket.user}
            agent={empId}
          />
        </div>
      )}
    </div>
  );
};

export default AssignedTickets;
