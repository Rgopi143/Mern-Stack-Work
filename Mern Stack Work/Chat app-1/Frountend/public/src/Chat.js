import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function Chat({ username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    const msgData = {
      author: username,
      content: message,
    };
    setMessages((prev) => [...prev, msgData]);
    socket.emit('send_message', msgData);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <h3>Live Chat</h3>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.author}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
