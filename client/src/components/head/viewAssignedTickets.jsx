import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const ViewAssignedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null); // Track the selected ticket ID
  const empId = useSelector((state) => state.user.employeeId);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/head/getAssignedTickets?department=${user.department}`
      );
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const view = (ticketId) => {
    // Perform view-related operation
    console.log(`View ticket ID: ${ticketId}`);
  };

  return (
    <div className='m-5'>
      <h3>Created Tickets</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Date</th>
            <th>Creater Name</th>
          </tr>
        </thead>
        <tbody>
          {
          tickets.length>0 ? (
      
            tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>{ticket.assignedTo}</td>
              <td>{ticket.createdDate}</td>
              <td>{ticket.firstName}</td>
            </tr>
          ))):(
            <tr>
                  <td colSpan="5" className='text-danger text-center'>
                    There is no Assigned Tickets
                  </td>
                </tr>
          )
        
          }
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssignedTickets;
