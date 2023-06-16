import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'

function OpenTickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [creatorDetails, setCreatorDetails] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const user = useSelector(state => state.user);
  const managerDepartment = useSelector(state => state.user.department);

  useEffect(() => {
    fetchTickets();
  }, [managerDepartment]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/api/openTickets?department=${managerDepartment}`);
      setTickets(response.data.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchAgents = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/agents?category=${category}`);
      setAgents(response.data.agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const handleViewTicket = async (ticket) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/tickets/${ticket.id}`);
      setTicketDetails(response.data);
      const creatorResponse = await axios.get(`http://localhost:5002/api/register/${ticket.createdBy}`);
      setCreatorDetails(creatorResponse.data);
      setSelectedTicket(ticket);
      fetchAgents(response.data.category);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
    }
  };

  const handleAssignTicket = async () => {
    if (selectedTicket && selectedAgent) {
      const data = {
        ticketId: selectedTicket.id,
        agentId: selectedAgent,
        creatorName: creatorDetails.name,
        creatorDepartment: creatorDetails.department,
        creatorBlock: creatorDetails.block,
        title: ticketDetails.title,
        description: ticketDetails.description,
        priority: ticketDetails.priority
      };

      try {
        const response = await axios.post("http://localhost:5002/api/openTickets", data);
        console.log("Ticket assigned successfully:", response.data);
        setSelectedTicket(null);
        setTicketDetails(null);
        setCreatorDetails(null);
        setSelectedAgent('');
      } catch (error) {
        console.error("Error assigning ticket:", error);
      }
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
          <p>Title: {ticketDetails?.title}</p>
          <p>Description: {ticketDetails?.description}</p>
          <p>Priority: {ticketDetails?.priority}</p>

          <h3>Creator Details</h3>
          <p>Name: {creatorDetails?.name}</p>
          <p>Department: {creatorDetails?.department}</p>
          <p>Block: {creatorDetails?.block}</p>

          <select id="agentSelect" value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
            <option value="">Select Agent</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
          <button onClick={handleAssignTicket}>Assign</button>
        </div>
      )}
    </div>
  );
}

export default OpenTickets;
