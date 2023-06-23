import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ViewTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const empId = useSelector((state) => state.user.employeeId);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user/getFixedTicketByCreaterId?createdBy=${empId}`
      );
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const VerifyTicket = async (ticketId) => {
    try {
      await axios.post(`http://localhost:8000/user/verfiyTicket?selectedTicket=${ticketId}`, {
      });
      // Optionally, you can also refresh the assigned tickets by calling fetchAssignedTickets()
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h3>Fixed Tickets</h3>
      <table className="table">
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
              <td>{ticket.createdDate}</td>
              <td>
                <button
                  className='btn btn-primary'
                  onClick={() => VerifyTicket(ticket.id)}
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTicket;
