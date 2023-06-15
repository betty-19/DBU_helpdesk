import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
function OpenTickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [creatorDetails, setCreatorDetails] = useState(null);
  const [agents, setAgents] = useState([]);
  const user = useSelector(state => state.user);
  const managerDepartment = useSelector(state => state.user.department);

  useEffect(() => {
    fetchTickets();
    fetchAgents();
  }, [managerDepartment]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/api/openTickets?department=${managerDepartment}`);
      setTickets(response.data.tickets);
      fetchAgents(response.data.tickets.category); // Pass the category to fetchAgents
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchAgents = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/agents?category=${category}`); // Use the category in the API request
      setAgents(response.data.agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const handleViewTicket = async (ticket) => {
    try {
      // Fetch ticket details
      // const ticketResponse = await axios.get(`http://localhost:5002/api/tickets/${ticket.id}`); // Replace the URL with your API endpoint to fetch ticket details
      // setTicketDetails(ticketResponse.data);

      // Fetch creator details
      const creatorResponse = await axios.get(`http://localhost:5002/api/register/${ticket.createdBy}`); // Replace the URL with your API endpoint to fetch creator details
      setCreatorDetails(creatorResponse.data);
      
      setSelectedTicket(ticket);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
    }
  };

  return (
    <div>
      <h1>Welcome, {user.userName}!</h1>
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
              <td className="text-end">{ticket.priority}</td>
              <td>
                <button onClick={() => handleViewTicket(ticket)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTicket && (
        <div>
          <h3>Ticket Details</h3>
          {/* <p>Title: {ticketDetails?.title}</p>
          <p>Description: {ticketDetails?.description}</p>
          <p>Priority: {ticketDetails?.priority}</p> */}
          <p>Title: {tickets.title}</p>
          <p>Description: {tickets.description}</p>
          <p>Priority: {tickets.priority}</p>


          <h3>Creator Details</h3>
          <p>Name: {creatorDetails?.name}</p>
          <p>Department: {creatorDetails?.department}</p>
          <p>Block: {creatorDetails?.block}</p>

          <select>
            <option value="">Select Agent</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default OpenTickets;
