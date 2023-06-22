import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ClosedTickets = () => {

  const empId = useSelector((state) => state.user.employeeId);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showAllTickets, setShowAllTickets] = useState(true);


  useEffect(() => {
    fetchClosedTickets();
  }, []);

  const fetchClosedTickets = async () => {
    try {
      console.log(empId);
      const response = await axios.get(`http://localhost:8000/agent/viewClosedTickets?assignedId=${empId}`);
      setTickets(response.data);
      console.log(tickets);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <>
      <h1>Closed Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Created By</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.firstName}</td>
              <td>{ticket.createdDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    </div>
  );
};

export default ClosedTickets;
