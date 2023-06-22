import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chat = ({ ticketId, agent,user  }) => {
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

export default Chat;
