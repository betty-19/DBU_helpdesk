import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
//mport Chat from './components/chat'

const ViewTicket = () => {
  const [tickets, setTickets] = useState([]);
  const empId = useSelector((state) => state.user.empId);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`/api/tickets?createdBy=${empId}`);
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isChatDisabled = (assignedTo, status) => {
    return assignedTo === 'Not Assigned' || status === 'Close';
  };

  const chat = (ticketId) => {
    // Perform chat-related operation
    console.log(`Chat initiated for ticket ID: ${ticketId}`);
  };

  const view = (ticketId) => {
    // Perform view-related operation
    console.log(`View ticket ID: ${ticketId}`);
  };

  return (
    <div>
        <h3>created Tickets</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Category</th>
            <th>Assigned to</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>{ticket.category}</td>
              <td>{ticket.assignedTo}</td>
              <td>{ticket.date}</td>
              <td>
              <button
                  onClick={() => chat(ticket.id, ticket.assignedTo, ticket.empId)}
                  disabled={isChatDisabled(ticket.assignedTo, ticket.status)}
                >
                  Chat
                </button>
                <button onClick={() => view(ticket.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTicket;
