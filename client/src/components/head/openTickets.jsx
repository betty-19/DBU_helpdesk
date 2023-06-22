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
  const [isOpenTickets, setIsOpenTickets] = useState(false);
  const [selecteAgentName, setSelectedAgentName] = useState('');
  const [selectedAgentId , setSelectedTicketId] = useState('');
  const [category, setCategory] = useState(''); 
  const user = useSelector(state => state.user);
  const managerDepartment = useSelector(state => state.user.department);

  useEffect(() => {
    fetchAgents();
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/head/getTickets?department=${managerDepartment}`);
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/head/fetchAgents?department=${managerDepartment}`);
      setAgents(response.data);
      console.log(agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const [employeeId, firstName] = selectedValue.split('|'); // Deserialize the array
    // Use the employeeId and firstName as needed
    setSelectedAgent([employeeId, firstName]);
  };
  
  useEffect(() => {
    console.log('Selected ticket:', selectedTicket);
  }, [selectedTicket]);
  const handleViewTicket = async (ticket) => {
    try {
      const response = await axios.get(`http://localhost:8000/head/tickets?ticketId=${ticket.id}`);
      console.log('Response data:', response.data); // Check the response data in the console
      const ticketDetails = response.data[0]; // Assuming the ticket details are returned in the response data
      console.log('Ticket details:', ticketDetails); // Log the ticket details
      setSelectedTicket(ticketDetails);
      console.log('Selected ticket:', selectedTicket); // Log the selected ticket
    } catch (error) {
      console.error("Error fetching ticket details:", error);
    }
  };
  
  const handleAssignTicket = async () => {
    if (selectedTicket && selectedAgent) {
      const data = {
        ticketId: selectedTicket.id,
        agentName:selectedAgent.firstName,
        agentId:selectedAgent.employeeId,
      };

      try {
        const response = await axios.post("http://localhost:8000/head/assignTickets", data);
        if(response.data.success){
          console.log("Assigned successfully");

        }
        console.log("Ticket assigned successfully:", response.data);
        setSelectedTicket(null);
        setSelectedAgent('');
      } catch (error) {
        console.error("Error assigning ticket:", error);
      }
    }
  };

  return (
    <div className="m-5">
      

      {selectedTicket ? (
        <div>
          <h3>Ticket Details</h3>
          <p>Title: {selectedTicket.title}</p>
          <p>Description: {selectedTicket.description}</p>
          <p>Priority: {selectedTicket.priority}</p>

          <h3>Creator Details</h3>
          <p>Name: {selectedTicket.firstName}</p>
          {/* <p>Department: {selectedTicket.department}</p> */}
          <p>Block: {selectedTicket.officeBlock}</p>

          {/* <select id="agentSelect" value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
            <option value="">Select Agent</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.firstName} {agent.employeeId}
              </option>
            ))}
          </select> */}

<select id="agentSelect" value={selectedAgent} onChange={(e) => {
  const [employeeId, firstName] = e.target.value.split('|'); // Split the value by the separator character
  setSelectedAgent({ employeeId, firstName }); // Store the values in separate variables
}}>
  <option value="">Select Agent</option>
  {agents.map((agent) => {
    const value = [agent.employeeId, agent.firstName].join('|'); // Serialize the array
    return (
      <option key={agent.id} value={value}>
        {agent.firstName} {agent.employeeId}
      </option>
    );
  })}
</select>


        <button onClick={handleAssignTicket}>Assign</button>
        </div>
      ):(<>
      <h1>Welcome, {user.username}!</h1>
      <h2>Open Tickets</h2>
      <table className="table">
        <thead>
       
            <th>Name</th>
            <th>Status</th>
            <th className="text-end">Action</th>
         
        </thead>
        <tbody>
        {tickets.length >0 ? (    
          tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td className="text-end">
                <button onClick={() => handleViewTicket(ticket)}>View</button>
              </td>
            </tr>

          ))):(
            <tr>
                  <td colSpan="2" className="text-center text-danger">
                    There is no Open Tickets
                  </td>
                </tr>
          )}
        </tbody>
      </table>
      </>)
    }
    </div>
  );
}

export default OpenTickets;


