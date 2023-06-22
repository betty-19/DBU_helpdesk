import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Chat = ({ ticketId, agent, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/chats/${ticketId}`);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(`/api/chats/${ticketId}`, {
        user,
        agent,
        message: newMessage,
      });
      const newChat = response.data;
      setMessages([...messages, newChat]);
      setNewMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((chat) => (
          <div key={chat.id}>
            <p>
              <strong>{chat.user}:</strong> {chat.message}
            </p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

const ViewTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null); // Track the selected ticket ID
  const empId = useSelector((state) => state.user.employeeId);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user/getTicketByCreaterId?createdBy=${empId}`
      );
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isChatDisabled = (assignedTo, status) => {
    return assignedTo === 'Not Assigned' || status === 'Close';
  };

  const chat = (ticketId) => {
    // Set the selected ticket ID when chat button is clicked
    setSelectedTicketId(ticketId);
  };

  const view = (ticketId) => {
    // Perform view-related operation
    console.log(`View ticket ID: ${ticketId}`);
  };

  return (
    <div>
      <h3>Created Tickets</h3>
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
                {selectedTicketId === ticket.id ? (
                  <Chat
                    ticketId={ticket.id}
                    agent={ticket.assignedTo}
                    user={ticket.createdBy}
                  />
                ) : (
                  <>
                    <button
                      onClick={() => chat(ticket.id)}
                      disabled={isChatDisabled(ticket.assignedTo, ticket.status)}
                    >
                      Chat
                    </button>
                    <button onClick={() => view(ticket.id)}>View</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTicket;
