import React, { useEffect, useState } from "react";
import axios from "axios";

function AssignTicket() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/openTickets"); // Replace the URL with your API endpoint to fetch ticket data
      setTickets(response.data.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  return (
    <div>
      <h2>Open Tickets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="text-auto">{ticket.title}</td>
              <td className="text-end">{ticket.status}</td>
              <td>
                {/* Add action buttons or functionality here */}
                <button>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignTicket;
